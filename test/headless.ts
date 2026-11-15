// Runs the vaporview extension code on the adapter, with no VS Code and no Orca.
// It opens a waveform file, reads the netlist, attaches a fake webview, and adds one signal.
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setAdapterHost, registry, createExtensionContext, Uri, WebviewPanel, CancellationTokenSource } from '../src/adapter/vscode';
import { activate } from '../vaporview/src/extension_core/extension';

const here = path.dirname(fileURLToPath(import.meta.url));
const waveform = process.argv[2] ?? path.join(here, '..', 'testdata', 'tpu.vcd');
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const brief = (v: unknown) => JSON.stringify(v, (_k, x) => (x instanceof Uint8Array ? `<${x.length} bytes>` : x))?.slice(0, 260);

setAdapterHost({ extensionPath: path.join(here, 'plugin', 'ext'), log: (m) => console.log('  log:', m.slice(0, 200)) });

async function main() {
  await activate(createExtensionContext());
  console.log('activated. commands:', registry.commands.size, 'editors:', [...registry.customEditors.keys()], 'trees:', [...registry.treeViews.keys()]);

  const { provider } = registry.customEditors.get('vaporview.waveformViewer')!;
  const token = new CancellationTokenSource().token;
  const uri = Uri.file(waveform);
  const t0 = Date.now();
  const document = await provider.openCustomDocument(uri, {}, token);
  console.log(`opened ${uri.fsPath} in ${Date.now() - t0} ms. metadata:`, brief(document.metadata));

  const posted: any[] = [];
  const panel = new WebviewPanel('vaporview.waveformViewer', (m) => { posted.push(m); });
  await provider.resolveCustomEditor(document, panel, token);
  console.log('webview html chars:', panel.webview.html.length);

  panel.receiveEmitter.fire({ command: 'ready' });
  await sleep(300);
  console.log('messages after ready:', posted.map((m) => m.command));

  const tree = registry.treeViews.get('waveformViewerNetlistView')!;
  const data = tree.options.treeDataProvider;
  const top = await data.getChildren();
  console.log('top level items:', top.map((i: any) => `${i.label} (${i.contextValue})`));
  let scope = top[0];
  let children = await data.getChildren(scope);
  console.log(`children of ${scope.label}:`, children.length, children.slice(0, 8).map((i: any) => `${i.label}:${i.contextValue}`));
  let variable = children.find((i: any) => i.collapsibleState === 0);
  while (!variable && children.length) {
    scope = children[0];
    children = await data.getChildren(scope);
    variable = children.find((i: any) => i.collapsibleState === 0);
  }
  console.log('first variable:', brief({ label: variable?.label, contextValue: variable?.contextValue, command: variable?.command }));

  posted.length = 0;
  await registry.commands.get('vaporview.addVariable')?.(variable);
  await sleep(300);
  console.log('messages after add variable:', posted.map((m) => brief(m)));

  // The webview then asks for the data of the signals that it must draw.
  const add = posted.find((m) => m.command === 'add-variable');
  const signalIds = [...new Set((add?.signalList ?? []).map((s: any) => s.signalId).filter((id: any) => id !== undefined))];
  posted.length = 0;
  panel.receiveEmitter.fire({ command: 'fetchDataFromFile', requestList: signalIds.map((id) => ({ type: 'signal', signalId: id, id })) });
  await sleep(500);
  console.log('messages after fetch:', posted.map((m) => brief(m)));
  await document.dispose?.();
  process.exit(0);
}

main().catch((e) => { console.error('FAILED', e); process.exit(1); });
