// Menus and keybindings of vaporview, read from its package.json. VS Code draws these menus
// itself. Orca has no menu contribution, so the frames draw them and this file selects the items.

import { evaluateWhen, type WhenContext } from '../common/when';

export type MenuEntry =
  | { kind: 'item'; command: string; title: string }
  | { kind: 'submenu'; label: string; items: MenuEntry[] }
  | { kind: 'separator' };

export type Keybinding = { key: string; mac?: string; command: string; when?: string };

type RawItem = { command?: string; submenu?: string; when?: string; group?: string };

function splitGroup(group: string | undefined): { name: string; order: number } {
  if (!group) { return { name: '', order: 0 }; }
  const at = group.lastIndexOf('@');
  if (at < 0) { return { name: group, order: 0 }; }
  return { name: group.slice(0, at), order: Number(group.slice(at + 1)) || 0 };
}

/**
 * Commands that cannot work in Orca now. The menus do not show them. Each one is in
 * docs/feature-parity.md with its reason.
 */
export const UNAVAILABLE_COMMANDS: Record<string, string> = {
  'vaporview.newSignalFromBitRange': 'input box',
  'vaporview.createSignalsForAllCustomLength': 'input box',
  'vaporview.setRulerTimeIncrement': 'input box',
  'vaporview.displayAsFixedPoint': 'input box',
  'vaporview.displayAsFixedPointSigned': 'input box',
  'vaporview.addVariableByInstancePath': 'input box',
  'vaporview.saveViewerSession': 'file dialog',
  'vaporview.loadViewerSession': 'file dialog',
  'vaporview.viewVaporViewSettings': 'VS Code settings page',
  'vaporview.showReadme': 'VS Code markdown preview',
  'vaporview.openRemoteViewer': 'input box, and remote access is deferred',
};

export class Menus {
  private titles = new Map<string, string>();
  private icons = new Map<string, string>();
  private submenus = new Map<string, { label: string; when?: string }>();
  private menus: Record<string, RawItem[]>;
  readonly keybindings: Keybinding[];

  constructor(packageJson: any) {
    const c = packageJson?.contributes ?? {};
    for (const command of c.commands ?? []) {
      this.titles.set(command.command, command.title);
      const icon = typeof command.icon === 'string' ? /^\$\(([^)]+)\)$/.exec(command.icon)?.[1] : undefined;
      if (icon) { this.icons.set(command.command, icon); }
    }
    for (const sub of c.submenus ?? []) { this.submenus.set(sub.id, { label: sub.label, when: sub.when }); }
    this.menus = c.menus ?? {};
    this.keybindings = (c.keybindings ?? []).filter((k: Keybinding) => !(k.command in UNAVAILABLE_COMMANDS));
  }

  title(command: string): string { return this.titles.get(command) ?? command; }
  /** The codicon name of a command, for a button. */
  icon(command: string): string { return this.icons.get(command) ?? ''; }

  /**
   * The visible items of a menu. `inline` selects the items that VS Code shows as buttons on a
   * tree row (group "inline"), or leaves them out.
   */
  resolve(menuId: string, context: WhenContext, inline: 'only' | 'exclude' = 'exclude', depth = 0): MenuEntry[] {
    const groups = new Map<string, { order: number; index: number; entry: MenuEntry }[]>();
    (this.menus[menuId] ?? []).forEach((raw, index) => {
      const { name, order } = splitGroup(raw.group);
      if ((name === 'inline') !== (inline === 'only')) { return; }
      if (!evaluateWhen(raw.when, context)) { return; }
      let entry: MenuEntry | undefined;
      if (raw.command) {
        if (raw.command in UNAVAILABLE_COMMANDS) { return; }
        entry = { kind: 'item', command: raw.command, title: this.title(raw.command) };
      } else if (raw.submenu && depth < 4) {
        const sub = this.submenus.get(raw.submenu);
        if (!sub || !evaluateWhen(sub.when, context)) { return; }
        const items = this.resolve(raw.submenu, context, 'exclude', depth + 1);
        if (items.length) { entry = { kind: 'submenu', label: sub.label, items }; }
      }
      if (!entry) { return; }
      if (!groups.has(name)) { groups.set(name, []); }
      groups.get(name)!.push({ order, index, entry });
    });
    // VS Code puts the group "navigation" first, then the other groups in the order of their names.
    const names = [...groups.keys()].sort((a, b) => (a === 'navigation' ? -1 : b === 'navigation' ? 1 : a.localeCompare(b)));
    const out: MenuEntry[] = [];
    for (const name of names) {
      if (out.length) { out.push({ kind: 'separator' }); }
      for (const item of groups.get(name)!.sort((a, b) => a.order - b.order || a.index - b.index)) { out.push(item.entry); }
    }
    return out;
  }
}
