// Tests of the "when" clause evaluator against the clauses that vaporview uses.
import * as esbuild from 'esbuild';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'build', 'when.mjs');
await esbuild.build({ entryPoints: [path.join(root, 'src', 'common', 'when.ts')], bundle: true, format: 'esm', outfile: out, logLevel: 'warning' });
const { evaluateWhen } = await import(pathToFileURL(out).href);
const cases = [
  ['', {}, true],
  ["webviewSection == 'signal'", { webviewSection: 'signal' }, true],
  ["webviewSection == 'signal'", { webviewSection: 'ruler' }, false],
  ["webviewSection != 'control-bar' && webviewSection != 'ruler' && !inputFocus", { webviewSection: 'signal', inputFocus: false }, true],
  ["webviewSection != 'control-bar' && !inputFocus", { webviewSection: 'signal', inputFocus: true }, false],
  ["rulerLines == false", { rulerLines: false }, true],
  ["rulerLines == false", {}, false],
  ["width > 1", { width: 8 }, true],
  ["width > '1'", { width: '1' }, false],
  ["width > 1 && width <= 32", { width: 64 }, false],
  ["(webviewSection == 'waveform-labels' || webviewSection == 'signal') && width > 1", { webviewSection: 'signal', width: 2 }, true],
  ["webviewSection == 'signal' && (width > '1' || type == 'Real')", { webviewSection: 'signal', width: 1, type: 'Real' }, true],
  ["isAnalog", { isAnalog: true }, true],
  ["isAnalog", {}, false],
  ["µs == true", { 'µs': true }, true],
  ["view == 'waveformViewerNetlistView' && vaporview.netlistSearchable && viewItem == 'netlistScope'", { view: 'waveformViewerNetlistView', 'vaporview.netlistSearchable': true, viewItem: 'netlistScope' }, true],
  ["activeCustomEditorId == 'vaporview.waveformViewer' && !inputFocus && !textInputFocus && vaporview.waveformViewerFocused", { activeCustomEditorId: 'vaporview.waveformViewer', 'vaporview.waveformViewerFocused': true }, true],
  ["enum == true", { enum: 'true' }, true],
];
let failed = 0;
for (const [clause, context, expected] of cases) {
  const actual = evaluateWhen(clause, context);
  if (actual !== expected) { failed++; console.log(`FAIL ${JSON.stringify(clause)} with ${JSON.stringify(context)}: ${actual}`); }
}
// Each clause of the vaporview package.json must parse with no error (a wrong parse gives false for all contexts).
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'vaporview', 'package.json'), 'utf8'));
const clauses = new Set();
for (const items of Object.values(pkg.contributes.menus)) { for (const i of items) { if (i.when) { clauses.add(i.when); } } }
for (const k of pkg.contributes.keybindings) { if (k.when) { clauses.add(k.when); } }
console.log(`${failed ? 'FAIL' : 'ok  '} when clauses: ${cases.length - failed} of ${cases.length} cases, ${clauses.size} clauses of vaporview read`);
process.exit(failed ? 1 : 0);
