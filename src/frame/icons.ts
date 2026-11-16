// Icons of the panel. Orca draws its icons with the lucide icon set, so the panel uses the same
// set. vaporview names its icons with VS Code icon names ("codicons"). This file gives the lucide
// icon for each of them. A name with no lucide icon keeps the VS Code icon.

import { LUCIDE } from './lucide-icons';

/** VS Code icon name -> lucide icon name. */
const FROM_CODICON: Record<string, string> = {
  // scopes (vaporview/src/extension_core/tree_view.ts)
  'chip': 'cpu',                          // module
  'debug-stackframe': 'list-checks',      // task
  'symbol-module': 'braces',              // function, generate block, other scopes
  'debug-start': 'play',                  // begin block
  'repo-forked': 'git-fork',              // fork
  'symbol-structure': 'network',          // struct
  'surround-with': 'combine',             // union
  'symbol-misc': 'shapes',                // class, unknown
  'debug-disconnect': 'unplug',           // interface
  'package': 'package',                   // package
  // variables
  'symbol-array': 'brackets',             // vector
  'symbol-interface': 'git-commit-horizontal', // wire of 1 bit
  'symbol-variable': 'variable',          // integer
  'settings': 'sliders-vertical',         // parameter
  'pulse': 'activity',                    // real
  'file-binary': 'binary',                // other kinds
  'symbol-key': 'type',                   // string
  'plug': 'plug',                         // port
  'watch': 'watch',                       // time
  'symbol-parameter': 'list-ordered',     // enum
  // commands
  'add': 'plus',
  'inspect': 'crosshair',                 // "Show in Viewer". Orca uses this icon for "Reveal active workspace".
  'search': 'search',
  'sync': 'refresh-cw',
  'close': 'x',
};

const svg = (inner: string): string =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

/** An element with a lucide icon. */
export function lucideIcon(name: string, className: string, tag: 'span' | 'button' = 'span'): HTMLElement {
  const node = document.createElement(tag);
  node.className = className;
  node.innerHTML = svg(LUCIDE[name] ?? '');
  return node;
}

/** An element with the icon for a VS Code icon name. */
export function icon(codicon: string, className: string, tag: 'span' | 'button' = 'span'): HTMLElement {
  const name = FROM_CODICON[codicon];
  if (name) { return lucideIcon(name, className, tag); }
  const node = document.createElement(tag);
  node.className = codicon ? `${className} codicon codicon-${codicon}` : className;
  return node;
}
