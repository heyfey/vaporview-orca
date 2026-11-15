// Messages of the plugin, with buttons if the message is a question. VS Code shows these as
// notifications. Orca gives a plugin only a desktop notification with no buttons.

declare const orca: any;

type UiMessage = { id: number; level: string; message: string; items: string[] };

const STYLE = `
.vv-messages { position: fixed; left: 8px; right: 8px; bottom: 8px; z-index: 9000; display: flex; flex-direction: column; gap: 6px; pointer-events: none; }
.vv-messages.top { position: static; padding: 6px 8px 0; }
.vv-msg { pointer-events: auto; display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 8px 10px;
  font: 12px/1.4 system-ui, -apple-system, "Segoe UI", sans-serif; color: var(--orca-popover-foreground); background: var(--orca-popover);
  border: 1px solid var(--orca-border); border-left: 3px solid var(--orca-primary); border-radius: var(--orca-radius, 6px); box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); }
.vv-msg[data-level="warning"] { border-left-color: #cca700; }
.vv-msg[data-level="error"] { border-left-color: var(--orca-destructive); }
.vv-msg-text { flex: 1 1 200px; white-space: pre-wrap; }
.vv-msg button { font: inherit; border-radius: 4px; padding: 2px 10px; cursor: pointer; border: 1px solid var(--orca-border); color: var(--orca-foreground); background: transparent; }
.vv-msg button.primary { color: var(--orca-primary-foreground); background: var(--orca-primary); border-color: var(--orca-primary); }
.vv-msg button.close { border: 0; padding: 0 4px; color: var(--orca-muted-foreground); }
`;

/**
 * Shows the messages of the worker in this page.
 * @param host the element that gets the message list. Default: a layer at the bottom of the page.
 */
export function installMessages(host?: HTMLElement): void {
  const style = document.createElement('style');
  style.textContent = STYLE;
  document.head.append(style);
  const box = document.createElement('div');
  box.className = 'vv-messages' + (host ? ' top' : '');
  (host ?? document.body).append(box);
  const rows = new Map<number, HTMLElement>();

  const remove = (id: number): void => { rows.get(id)?.remove(); rows.delete(id); };
  const answer = (id: number, item?: string): void => {
    remove(id);
    orca.plugin.request('ui.answer', item === undefined ? { id } : { id, item }).catch(() => undefined);
  };

  orca.plugin.on('ui.dismiss', (p: { id: number }) => remove(p?.id));
  orca.plugin.on('ui.message', (m: UiMessage) => {
    if (!m || rows.has(m.id)) { return; }
    const isQuestion = m.items.length > 0;
    // A message with no button replaces the message before it.
    if (!isQuestion) { for (const [id, row] of rows) { if (row.dataset.question !== 'true') { remove(id); } } }
    const row = document.createElement('div');
    row.className = 'vv-msg';
    row.dataset.level = m.level;
    row.dataset.question = String(isQuestion);
    const text = document.createElement('span');
    text.className = 'vv-msg-text';
    text.textContent = m.message;
    row.append(text);
    m.items.forEach((item, index) => {
      const button = document.createElement('button');
      button.textContent = item;
      if (index === 0) { button.className = 'primary'; }
      button.addEventListener('click', () => answer(m.id, item));
      row.append(button);
    });
    const close = document.createElement('button');
    close.className = 'close';
    close.textContent = '×';
    close.title = isQuestion ? 'Cancel' : 'Close';
    close.addEventListener('click', () => (isQuestion ? answer(m.id) : remove(m.id)));
    row.append(close);
    rows.set(m.id, row);
    box.append(row);
  });
}
