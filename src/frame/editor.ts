// Start code of the editor frame. It gives the vaporview webview the `acquireVsCodeApi`
// function that VS Code gives, connected to the Orca worker, and then loads the webview.

import { decodeMessages, toJson } from '../common/codec';

declare const orca: any;

const SEND_INTERVAL_MS = 200;      // one send for each interval keeps the frame below Orca's message limit
const SEND_MAX_CHARS = 40_000;     // a frame message must stay below 64 KiB
const instance = Math.random().toString(36).slice(2, 10);

function status(text: string, isError = false): void {
  let el = document.getElementById('vaporview-orca-status');
  if (!el) {
    el = document.createElement('div');
    el.id = 'vaporview-orca-status';
    document.body.append(el);
  }
  el.textContent = text;
  el.className = isError ? 'error' : '';
  el.style.display = text ? 'flex' : 'none';
}

async function request(name: string, input: unknown, timeoutMs = 30_000): Promise<any> {
  for (;;) {
    try {
      return await orca.plugin.request(name, toJson(input), { timeoutMs });
    } catch (err: any) {
      if (err?.code !== 'rate_limited') { throw err; }
      await new Promise((r) => setTimeout(r, err.retryAfterMs ?? 500));
    }
  }
}

async function main(): Promise<void> {
  status('Loading the waveform…');
  const doc = await orca.document.get();
  let session: any;
  try {
    session = JSON.parse(doc.content.kind === 'text' ? doc.content.text : '');
  } catch {
    return status('This file is not a vaporview session file.', true);
  }
  const workspace = await orca.host.call('workspace.readContext').catch(() => null);

  let hello: any;
  try {
    hello = await request('editor.hello', { instance, fileName: session?.fileName, session, workspace }, 120_000);
  } catch (err: any) {
    return status(`Cannot open the waveform: ${err?.message ?? err}`, true);
  }
  const docKey: string = hello.docKey;
  let state: unknown = hello.state ?? undefined;
  let stateChanged = false;
  let closed = false;

  // Messages from the webview to the worker, in batches.
  const outbox: unknown[] = [];
  let sendTimer: number | undefined;
  const flush = async (): Promise<void> => {
    sendTimer = undefined;
    if (closed) { return; }
    const messages: unknown[] = [];
    let size = 0;
    while (outbox.length) {
      const text = JSON.stringify(toJson(outbox[0]));
      if (messages.length && size + text.length > SEND_MAX_CHARS) { break; }
      messages.push(outbox.shift());
      size += text.length;
    }
    const body: any = { docKey, instance, messages };
    if (stateChanged) { body.state = state ?? null; stateChanged = false; }
    try {
      await request('editor.send', body);
    } catch (err: any) {
      console.error(`[vaporview] send failed: ${err?.code ?? err}`);
    }
    if (outbox.length || stateChanged) { schedule(); }
  };
  const schedule = (): void => { if (sendTimer === undefined) { sendTimer = window.setTimeout(flush, SEND_INTERVAL_MS); } };

  const api = {
    postMessage(message: unknown): void { outbox.push(message); schedule(); },
    getState(): unknown { return state; },
    setState<T>(next: T): T { state = next; stateChanged = true; schedule(); return next; },
  };
  (window as any).acquireVsCodeApi = () => api;

  // Messages from the worker to the webview. The frame pulls them.
  const poll = async (): Promise<void> => {
    while (!closed) {
      let answer: any;
      try {
        answer = await request('editor.poll', { docKey, instance }, 60_000);
      } catch (err: any) {
        console.error(`[vaporview] poll failed: ${err?.code ?? err}`);
        await new Promise((r) => setTimeout(r, 1000));
        continue;
      }
      if (answer.stale) { closed = true; return; }
      if (answer.closed) { closed = true; return status('This waveform is closed. Open it again from the Vaporview panel.'); }
      for (const message of decodeMessages(answer.messages) as any[]) {
        if (message?.command === 'orca-closed') { closed = true; status('This waveform is closed. Open it again from the Vaporview panel.'); return; }
        window.dispatchEvent(new MessageEvent('message', { data: message }));
      }
    }
  };

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'ext/dist/webview.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('cannot load the viewer code'));
    document.body.append(script);
  });
  status('');
  void poll();
}

main().catch((err) => status(`Vaporview failed to start: ${err?.message ?? err}`, true));
