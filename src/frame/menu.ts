// A context menu drawn in the page. VS Code draws its menus itself. Orca has no menu for a
// plugin frame, so the editor frame and the panel use this one.

export type MenuEntry =
  | { kind: 'item'; command: string; title: string }
  | { kind: 'submenu'; label: string; items: MenuEntry[] }
  | { kind: 'separator' };

const STYLE = `
.vv-menu { position: fixed; z-index: 10000; min-width: 180px; max-width: 320px; max-height: 80vh; overflow: auto; padding: 4px;
  font: 12px/1.4 system-ui, -apple-system, "Segoe UI", sans-serif; color: var(--orca-popover-foreground); background: var(--orca-popover);
  border: 1px solid var(--orca-border); border-radius: var(--orca-radius, 6px); box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35); user-select: none; }
.vv-menu-item { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 4px 8px; border-radius: 4px; cursor: default; white-space: nowrap; }
.vv-menu-item:hover, .vv-menu-item.open { background: var(--orca-accent); color: var(--orca-accent-foreground); }
.vv-menu-sep { height: 1px; margin: 4px 0; background: var(--orca-border); }
.vv-menu-arrow { opacity: 0.7; }
`;

let open: HTMLElement[] = [];
let onClose: (() => void) | undefined;

export function closeMenu(): void {
  open.forEach((m) => m.remove());
  open = [];
  onClose?.();
  onClose = undefined;
}

function place(menu: HTMLElement, x: number, y: number, besideWidth = 0): void {
  document.body.append(menu);
  const r = menu.getBoundingClientRect();
  let left = x;
  if (left + r.width > window.innerWidth - 4) { left = Math.max(4, besideWidth ? x - besideWidth - r.width : window.innerWidth - r.width - 4); }
  const top = Math.max(4, Math.min(y, window.innerHeight - r.height - 4));
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
}

function build(entries: MenuEntry[], level: number, pick: (command: string) => void): HTMLElement {
  const menu = document.createElement('div');
  menu.className = 'vv-menu';
  menu.dataset.level = String(level);
  const closeDeeper = () => {
    open.filter((m) => Number(m.dataset.level) > level).forEach((m) => m.remove());
    open = open.filter((m) => Number(m.dataset.level) <= level);
    menu.querySelectorAll('.open').forEach((n) => n.classList.remove('open'));
  };
  for (const entry of entries) {
    if (entry.kind === 'separator') {
      const sep = document.createElement('div');
      sep.className = 'vv-menu-sep';
      menu.append(sep);
      continue;
    }
    const row = document.createElement('div');
    row.className = 'vv-menu-item';
    const label = document.createElement('span');
    label.textContent = entry.kind === 'item' ? entry.title : entry.label;
    row.append(label);
    if (entry.kind === 'item') {
      row.dataset.command = entry.command;
      row.addEventListener('mouseenter', closeDeeper);
      row.addEventListener('click', (e) => { e.stopPropagation(); closeMenu(); pick(entry.command); });
    } else {
      const arrow = document.createElement('span');
      arrow.className = 'vv-menu-arrow';
      arrow.textContent = '›';
      row.append(arrow);
      const show = () => {
        closeDeeper();
        row.classList.add('open');
        const sub = build(entry.items, level + 1, pick);
        const r = row.getBoundingClientRect();
        place(sub, r.right - 2, r.top - 4, r.width);
        open.push(sub);
      };
      row.addEventListener('mouseenter', show);
      row.addEventListener('click', (e) => { e.stopPropagation(); show(); });
    }
    menu.append(row);
  }
  return menu;
}

export function showMenu(x: number, y: number, entries: MenuEntry[], pick: (command: string) => void, closed?: () => void): void {
  closeMenu();
  if (!entries.length) { closed?.(); return; }
  if (!document.getElementById('vv-menu-style')) {
    const style = document.createElement('style');
    style.id = 'vv-menu-style';
    style.textContent = STYLE;
    document.head.append(style);
  }
  onClose = closed;
  const menu = build(entries, 0, pick);
  place(menu, x, y);
  open.push(menu);
}

window.addEventListener('pointerdown', (e) => {
  if (open.length && !(e.target as HTMLElement)?.closest?.('.vv-menu')) { closeMenu(); }
}, true);
window.addEventListener('keydown', (e) => { if (open.length && e.key === 'Escape') { closeMenu(); e.stopPropagation(); } }, true);
window.addEventListener('blur', () => closeMenu());
window.addEventListener('wheel', (e) => { if (open.length && !(e.target as HTMLElement)?.closest?.('.vv-menu')) { closeMenu(); } }, true);

/** Writes text to the clipboard. The worker cannot do this itself. */
export async function writeClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.cssText = 'position:fixed;left:-1000px;top:0';
    document.body.append(area);
    area.select();
    try { document.execCommand('copy'); } catch { /* no clipboard access */ }
    area.remove();
  }
}
