// Start code of the editor frame. It gives the vaporview webview the `acquireVsCodeApi`
// function that VS Code gives, connected to the Orca worker, and then loads the webview.

import { decodeMessages, toJson } from '../common/codec';
import { evaluateWhen } from '../common/when';
import { showMenu, closeMenu, writeClipboard, lastClipboardResult } from './menu';

declare const orca: any;

const SEND_INTERVAL_MS = 200;      // one send for each interval keeps the frame below Orca's message limit
const SEND_MAX_CHARS = 40_000;     // a frame message must stay below 64 KiB
const instance = Math.random().toString(36).slice(2, 10);

// Errors of the page, for the snapshot below.
const pageErrors: string[] = [];
window.addEventListener('error', (e) => pageErrors.push(`${e.message} (${String(e.filename).split('/').pop()}:${e.lineno})`));
window.addEventListener('unhandledrejection', (e) => pageErrors.push(`unhandled: ${e.reason?.message ?? e.reason}`));

/** Development aid: what the page shows now, as text and as one image of all canvases. */
function snapshot(): { summary: object; image: string } {
  const text = (sel: string) => [...document.querySelectorAll(sel)].map((n) => (n.textContent ?? '').replace(/\s+/g, ' ').trim()).filter(Boolean);
  const canvases = [...document.querySelectorAll('canvas')];
  const out = document.createElement('canvas');
  out.width = window.innerWidth;
  out.height = window.innerHeight;
  const ctx = out.getContext('2d')!;
  ctx.fillStyle = getComputedStyle(document.body).backgroundColor || '#000';
  ctx.fillRect(0, 0, out.width, out.height);
  for (const c of canvases) {
    const r = c.getBoundingClientRect();
    if (c.width && c.height && r.width && r.height) { try { ctx.drawImage(c, r.left, r.top, r.width, r.height); } catch { /* skip */ } }
  }
  ctx.fillStyle = getComputedStyle(document.body).color || '#fff';
  ctx.font = '12px sans-serif';
  for (const n of document.querySelectorAll('.waveform-label, .value-display-item, #ruler text, .ruler-text')) {
    const r = n.getBoundingClientRect();
    if (r.width && r.height) { ctx.fillText((n.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 60), r.left + 2, r.top + r.height / 2 + 4); }
  }
  return {
    summary: {
      instance,
      size: [window.innerWidth, window.innerHeight],
      status: document.getElementById('vaporview-orca-status')?.textContent ?? '',
      labels: text('.waveform-label'),
      values: text('.value-display-item'),
      canvases: canvases.map((c) => [c.id || c.className, c.width, c.height]),
      menu: [...document.querySelectorAll('.vv-menu')].map((m) => [...m.children].map((n) => (n.className === 'vv-menu-sep' ? '---' : [(n as HTMLElement).dataset.title, n.querySelector('.vv-menu-shortcut')?.textContent, n.classList.contains('danger') ? '(red)' : ''].filter(Boolean).join(' ')))),
      clipboard: lastClipboardResult,
      errors: pageErrors.slice(-10),
    },
    image: out.toDataURL('image/jpeg', 0.7).split(',')[1] ?? '',
  };
}

function status(text: string, isError = false, action?: { label: string; run: () => void }): void {
  let el = document.getElementById('vaporview-orca-status');
  if (!el) {
    el = document.createElement('div');
    el.id = 'vaporview-orca-status';
    document.body.append(el);
  }
  el.replaceChildren(document.createTextNode(text));
  if (action) {
    const button = document.createElement('button');
    button.textContent = action.label;
    button.addEventListener('click', action.run);
    el.append(button);
  }
  el.className = isError ? 'error' : '';
  el.style.display = text ? 'flex' : 'none';
}

const CLOSED_TEXT = 'This waveform is closed.';
const OTHER_TAB_TEXT = 'This waveform shows in a different tab.';

/** The key of a keyboard event in the form that a VS Code keybinding uses, for example `ctrl+0`. */
function chordOf(e: KeyboardEvent): string {
  let key = e.key.toLowerCase();
  if (e.code.startsWith('Numpad')) { key = 'numpad_' + e.code.slice(6).toLowerCase(); }
  if (['control', 'shift', 'alt', 'meta'].includes(key)) { return ''; }
  const parts: string[] = [];
  if (e.ctrlKey) { parts.push('ctrl'); }
  if (e.shiftKey) { parts.push('shift'); }
  if (e.altKey) { parts.push('alt'); }
  if (e.metaKey) { parts.push('cmd'); }
  parts.push(key);
  return parts.join('+');
}
const normalizeChord = (text: string): string => {
  const parts = text.toLowerCase().split('+').filter(Boolean);
  const key = parts.pop() ?? '';
  const order = ['ctrl', 'shift', 'alt', 'cmd'];
  return [...parts.map((p) => (p === 'meta' || p === 'win' ? 'cmd' : p)).sort((a, b) => order.indexOf(a) - order.indexOf(b)), key].join('+');
};

/** Development aid: plays pointer, wheel, and key events on the page. */
function replayInput(events: any[]): void {
  for (const ev of events) {
    const target = (ev.selector ? document.querySelector(ev.selector) : document.elementFromPoint(ev.x ?? 0, ev.y ?? 0)) as HTMLElement | null;
    if (!target) { pageErrors.push(`input: no element for ${JSON.stringify(ev)}`); continue; }
    const r = target.getBoundingClientRect();
    const x = ev.x ?? r.left + r.width / 2;
    const y = ev.y ?? r.top + r.height / 2;
    const base = { bubbles: true, cancelable: true, composed: true, clientX: x, clientY: y, ctrlKey: !!ev.ctrl, shiftKey: !!ev.shift, altKey: !!ev.alt, metaKey: !!ev.meta, view: window };
    if (ev.type === 'click' || ev.type === 'dblclick') {
      for (const t of ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click']) { target.dispatchEvent(new (t.startsWith('pointer') ? PointerEvent : MouseEvent)(t, { ...base, button: 0 })); }
      if (ev.type === 'dblclick') { target.dispatchEvent(new MouseEvent('dblclick', { ...base, button: 0 })); }
    } else if (ev.type === 'contextmenu') {
      target.dispatchEvent(new MouseEvent('contextmenu', { ...base, button: 2 }));
    } else if (ev.type === 'wheel') {
      target.dispatchEvent(new WheelEvent('wheel', { ...base, deltaX: ev.dx ?? 0, deltaY: ev.dy ?? 0 }));
    } else if (ev.type === 'key') {
      const init = { bubbles: true, cancelable: true, key: ev.key, code: ev.code ?? '', ctrlKey: !!ev.ctrl, shiftKey: !!ev.shift, altKey: !!ev.alt, metaKey: !!ev.meta };
      (document.activeElement ?? document.body).dispatchEvent(new KeyboardEvent('keydown', init));
      (document.activeElement ?? document.body).dispatchEvent(new KeyboardEvent('keyup', init));
    } else if (ev.type === 'menu') {
      // Selects an item of the open context menu by its text.
      const item = [...document.querySelectorAll('.vv-menu-item')].find((n) => (n as HTMLElement).dataset.title === ev.text) as HTMLElement | undefined;
      if (item) { item.dispatchEvent(new MouseEvent(ev.hover ? 'mouseenter' : 'click', { bubbles: !ev.hover, cancelable: true })); } else { pageErrors.push(`input: no menu item "${ev.text}"`); }
    }
  }
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

  const sayHello = (reopen: boolean) =>
    request('editor.hello', { instance, fileName: session?.fileName, session, workspace, reopen }, 120_000);
  let hello: any;
  try {
    hello = await sayHello(false);
    if (hello.closed) {
      // The person closed this waveform in the panel. It loads again only on request.
      await new Promise<void>((resolve) => status(CLOSED_TEXT, false, { label: 'Open again', run: () => resolve() }));
      status('Loading the waveform…');
      hello = await sayHello(true);
    }
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

  // Context keys: the keys of the worker, and the keys that the webview sets with `setContext`.
  const contextKeys: Record<string, unknown> = { ...(hello.contextKeys ?? {}) };
  const focusKeys = (): Record<string, unknown> => {
    const active = document.activeElement as HTMLElement | null;
    const typing = !!active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);
    return { inputFocus: typing, textInputFocus: typing, activeCustomEditorId: hello.editorId, webviewId: hello.editorId, resourceExtname: hello.extname };
  };

  const api = {
    postMessage(message: any): void {
      if (message?.command === 'executeCommand' && message.commandName === 'setContext' && Array.isArray(message.args)) {
        contextKeys[message.args[0]] = message.args[1];
      }
      outbox.push(message);
      schedule();
    },
    getState(): unknown { return state; },
    setState<T>(next: T): T { state = next; stateChanged = true; schedule(); return next; },
  };
  (window as any).acquireVsCodeApi = () => api;

  // Messages from the worker to the webview. The frame pulls them.
  const poll = async (): Promise<void> => {
    while (!closed) {
      let answer: any;
      const asked = Date.now();
      try {
        answer = await request('editor.poll', { docKey, instance, visible: document.visibilityState === 'visible', focus: document.hasFocus() }, 60_000);
      } catch (err: any) {
        console.error(`[vaporview] poll failed: ${err?.code ?? err}`);
        await new Promise((r) => setTimeout(r, 1000));
        continue;
      }
      // Diagnostics: the worker answers a poll after 5 s at most. A longer time means that the
      // answer was late, which the plugin log must show.
      if (Date.now() - asked > 9000) { console.error(`[vaporview] poll answer of page ${instance} came after ${((Date.now() - asked) / 1000).toFixed(1)} s`); }
      // A newer page shows this waveform (a second tab in a split view). vaporview has one view for
      // each waveform, so this page stops. The person can move the waveform back to this tab.
      if (answer.stale) {
        closed = true;
        closeMenu();
        return status(OTHER_TAB_TEXT, false, { label: 'Show here', run: () => location.reload() });
      }
      // The worker started again and does not know this page. A new page gets a new document.
      if (answer.restart) { closed = true; location.reload(); return; }
      if (answer.closed) { closed = true; closeMenu(); return status(CLOSED_TEXT, false, { label: 'Open again', run: () => location.reload() }); }
      for (const message of decodeMessages(answer.messages) as any[]) {
        if (message?.command === 'orca-closed') { closed = true; closeMenu(); status(CLOSED_TEXT, false, { label: 'Open again', run: () => location.reload() }); return; }
        if (message?.command === 'orca-context') { Object.assign(contextKeys, message.keys ?? {}); continue; }
        if (message?.command === 'orca-input') { replayInput(message.events ?? []); continue; }
        if (message?.command === 'orca-snapshot') {
          const shot = snapshot();
          const parts = Math.max(1, Math.ceil(shot.image.length / 30_000));
          for (let i = 0; i < parts; i++) {
            await request('debug.part', { id: message.id, index: i, parts, summary: i === 0 ? shot.summary : undefined, data: shot.image.slice(i * 30_000, (i + 1) * 30_000) });
          }
          continue;
        }
        window.dispatchEvent(new MessageEvent('message', { data: message }));
      }
    }
  };

  // Context menu. VS Code builds it from the `data-vscode-context` values of the element under
  // the pointer and its parents. The worker selects the items, and this page draws them.
  window.addEventListener('contextmenu', (e) => {
    if ((e.target as HTMLElement)?.closest?.('.vv-menu')) { return; }
    e.preventDefault();
    const context: Record<string, unknown> = {};
    const chain: HTMLElement[] = [];
    for (let n = e.target as HTMLElement | null; n; n = n.parentElement) { chain.unshift(n); }
    for (const n of chain) {
      const raw = n.getAttribute?.('data-vscode-context');
      if (!raw) { continue; }
      try { Object.assign(context, JSON.parse(raw)); } catch { /* not JSON */ }
    }
    delete context.preventDefaultContextMenuItems;
    const full = { ...contextKeys, ...context, ...focusKeys() };
    const x = e.clientX;
    const y = e.clientY;
    request('menu.webview', { docKey, context: full })
      .then((r) => showMenu(x, y, r.items ?? [], (command) => {
        request('menu.run', { docKey, source: 'webview', command, context }).catch((err: any) => console.error(`[vaporview] ${command} failed: ${err?.message ?? err}`));
      }))
      .catch((err: any) => console.error(`[vaporview] menu failed: ${err?.message ?? err}`));
  });

  // Keybindings of vaporview. In VS Code the keybinding service runs them. Here the page does.
  const isMac = /mac/i.test(navigator.platform);
  const bindings: { chord: string; command: string; when?: string }[] = (hello.keybindings ?? []).map((k: any) => ({
    chord: normalizeChord((isMac && k.mac) || k.key), command: k.command, when: k.when,
  }));
  window.addEventListener('keydown', (e) => {
    const chord = chordOf(e);
    if (!chord) { return; }
    const context = { ...contextKeys, ...focusKeys() };
    const hit = bindings.find((b) => b.chord === chord && evaluateWhen(b.when, context));
    if (!hit) { return; }
    e.preventDefault();
    request('menu.run', { docKey, source: 'key', command: hit.command }).catch((err: any) => console.error(`[vaporview] ${hit.command} failed: ${err?.message ?? err}`));
  });

  orca.plugin.on('clipboard.write', (p: { text: string }) => { if (document.hasFocus()) { void writeClipboard(p?.text ?? ''); } });

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
