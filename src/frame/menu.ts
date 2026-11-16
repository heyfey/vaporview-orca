// A context menu drawn in the page. VS Code draws its menus itself. Orca has no menu for a
// plugin frame, so the editor frame and the panel use this one.

import { lucideIcon } from './icons';

export type MenuEntry =
  | { kind: 'item'; command: string; title: string; icon?: string }
  | { kind: 'submenu'; label: string; items: MenuEntry[]; icon?: string }
  | { kind: 'separator' };

// The sizes are the values of the Orca menus (components/ui/menu-item.ts): rows of 26 px with
// 13 px text, icons of 15 px in the muted text color, 6 px around the items.
const STYLE = `
@font-face { font-family: 'Geist'; src: url('fonts/Geist-Variable.woff2') format('woff2'); font-weight: 100 900; font-display: swap; }
.vv-menu { position: fixed; z-index: 10000; box-sizing: border-box; min-width: 11rem; max-width: 360px; max-height: 80vh; overflow-x: hidden; overflow-y: auto; padding: 6px;
  font: 400 13px/16px 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: var(--orca-popover-foreground); background: var(--orca-popover);
  border: 1px solid var(--orca-border); border-radius: var(--orca-radius, 10px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35); user-select: none; -webkit-font-smoothing: antialiased; }
.vv-menu-item { display: flex; align-items: center; gap: 8px; padding: 5px 10px; border-radius: calc(var(--orca-radius, 10px) * 0.8); cursor: default; white-space: nowrap; }
.vv-menu-item:hover, .vv-menu-item.open { background: color-mix(in srgb, var(--orca-popover-foreground) 14%, transparent); }
.vv-menu-icon { display: inline-flex; flex: none; width: 15px; height: 15px; color: var(--orca-muted-foreground); }
.vv-menu-icon svg { width: 15px; height: 15px; stroke-width: 1.5; }
.vv-menu-sep { height: 1px; margin: 6px -6px; background: color-mix(in srgb, var(--orca-popover-foreground) 10%, transparent); }
.vv-menu-arrow { display: inline-flex; flex: none; width: 14px; height: 14px; margin-left: auto; padding-left: 16px; opacity: 0.7; }
.vv-menu-arrow svg { width: 14px; height: 14px; }
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
  const withIcons = entries.some((e) => e.kind !== 'separator' && !!e.icon);
  for (const entry of entries) {
    if (entry.kind === 'separator') {
      const sep = document.createElement('div');
      sep.className = 'vv-menu-sep';
      menu.append(sep);
      continue;
    }
    const row = document.createElement('div');
    row.className = 'vv-menu-item';
    // If one item of the menu has an icon, each item keeps the same space for it.
    if (withIcons) { row.append(entry.icon ? lucideIcon(entry.icon, 'vv-menu-icon') : Object.assign(document.createElement('span'), { className: 'vv-menu-icon' })); }
    const label = document.createElement('span');
    label.textContent = entry.kind === 'item' ? entry.title : entry.label;
    row.append(label);
    if (entry.kind === 'item') {
      row.dataset.command = entry.command;
      row.addEventListener('mouseenter', closeDeeper);
      row.addEventListener('click', (e) => { e.stopPropagation(); closeMenu(); pick(entry.command); });
    } else {
      row.append(lucideIcon('chevron-right', 'vv-menu-arrow'));
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

/** The result of the last clipboard write, for the development snapshot. */
export let lastClipboardResult = '';

/** Writes text to the clipboard. The worker cannot do this itself. */
export async function writeClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    lastClipboardResult = `ok, ${text.length} characters`;
  } catch (err: any) {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.cssText = 'position:fixed;left:-1000px;top:0';
    document.body.append(area);
    area.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch { /* no clipboard access */ }
    area.remove();
    lastClipboardResult = `${copied ? 'ok with the fallback' : 'failed'}, ${text.length} characters (${err?.name ?? err})`;
  }
}
