(() => {
  // src/frame/lucide-icons.ts
  var LUCIDE = {
    "search": '<path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" />',
    "x": '<path d="M18 6 6 18" /><path d="m6 6 12 12" />',
    "plus": '<path d="M5 12h14" /><path d="M12 5v14" />',
    "crosshair": '<circle cx="12" cy="12" r="10" /><line x1="22" x2="18" y1="12" y2="12" /><line x1="6" x2="2" y1="12" y2="12" /><line x1="12" x2="12" y1="6" y2="2" /><line x1="12" x2="12" y1="22" y2="18" />',
    "refresh-cw": '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" />',
    "chevron-right": '<path d="m9 18 6-6-6-6" />',
    "folder": '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />',
    "file": '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" />',
    "cpu": '<path d="M12 20v2" /><path d="M12 2v2" /><path d="M17 20v2" /><path d="M17 2v2" /><path d="M2 12h2" /><path d="M2 17h2" /><path d="M2 7h2" /><path d="M20 12h2" /><path d="M20 17h2" /><path d="M20 7h2" /><path d="M7 20v2" /><path d="M7 2v2" /><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="8" y="8" width="8" height="8" rx="1" />',
    "list-checks": '<path d="M13 5h8" /><path d="M13 12h8" /><path d="M13 19h8" /><path d="m3 17 2 2 4-4" /><path d="m3 7 2 2 4-4" />',
    "braces": '<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" /><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />',
    "play": '<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />',
    "git-fork": '<circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" /><path d="M12 12v3" />',
    "network": '<rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><path d="M12 12V8" />',
    "combine": '<path d="M14 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" /><path d="M19 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" /><path d="m7 15 3 3" /><path d="m7 21 3-3H5a2 2 0 0 1-2-2v-2" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="3" width="7" height="7" rx="1" />',
    "shapes": '<path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" /><rect x="3" y="14" width="7" height="7" rx="1" /><circle cx="17.5" cy="17.5" r="3.5" />',
    "unplug": '<path d="m19 5 3-3" /><path d="m2 22 3-3" /><path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" /><path d="M7.5 13.5 10 11" /><path d="M10.5 16.5 13 14" /><path d="m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z" />',
    "package": '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" /><path d="M12 22V12" /><polyline points="3.29 7 12 12 20.71 7" /><path d="m7.5 4.27 9 5.15" />',
    "brackets": '<path d="M16 3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3" /><path d="M8 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3" />',
    "git-commit-horizontal": '<circle cx="12" cy="12" r="3" /><line x1="3" x2="9" y1="12" y2="12" /><line x1="15" x2="21" y1="12" y2="12" />',
    "variable": '<path d="M8 21s-4-3-4-9 4-9 4-9" /><path d="M16 3s4 3 4 9-4 9-4 9" /><line x1="15" x2="9" y1="9" y2="15" /><line x1="9" x2="15" y1="9" y2="15" />',
    "sliders-vertical": '<path d="M10 8h4" /><path d="M12 21v-9" /><path d="M12 8V3" /><path d="M17 16h4" /><path d="M19 12V3" /><path d="M19 21v-5" /><path d="M3 14h4" /><path d="M5 10V3" /><path d="M5 21v-7" />',
    "activity": '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />',
    "binary": '<rect x="14" y="14" width="4" height="6" rx="2" /><rect x="6" y="4" width="4" height="6" rx="2" /><path d="M6 20h4" /><path d="M14 10h4" /><path d="M6 14h2v6" /><path d="M14 4h2v6" />',
    "type": '<path d="M12 4v16" /><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" /><path d="M9 20h6" />',
    "plug": '<path d="M12 22v-5" /><path d="M15 8V2" /><path d="M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z" /><path d="M9 8V2" />',
    "watch": '<path d="M12 10v2.2l1.6 1" /><path d="m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05" /><path d="m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05" /><circle cx="12" cy="12" r="6" />',
    "list-ordered": '<path d="M11 5h10" /><path d="M11 12h10" /><path d="M11 19h10" /><path d="M4 4h1v5" /><path d="M4 9h2" /><path d="M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02" />',
    "minus": '<path d="M5 12h14" />',
    "list-plus": '<path d="M16 5H3" /><path d="M11 12H3" /><path d="M16 19H3" /><path d="M18 9v6" /><path d="M21 12h-6" />',
    "list-tree": '<path d="M8 5h13" /><path d="M13 12h8" /><path d="M13 19h8" /><path d="M3 10a2 2 0 0 0 2 2h3" /><path d="M3 5v12a2 2 0 0 0 2 2h3" />',
    "list-x": '<path d="M16 5H3" /><path d="M11 12H3" /><path d="M16 19H3" /><path d="m15.5 9.5 5 5" /><path d="m20.5 9.5-5 5" />',
    "copy": '<rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />',
    "clipboard-copy": '<rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /><path d="M16 4h2a2 2 0 0 1 2 2v4" /><path d="M21 14H11" /><path d="m15 10-4 4 4 4" />',
    "timer": '<line x1="10" x2="14" y1="2" y2="2" /><line x1="12" x2="15" y1="14" y2="11" /><circle cx="12" cy="14" r="8" />',
    "ruler": '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" /><path d="m14.5 12.5 2-2" /><path d="m11.5 9.5 2-2" /><path d="m8.5 6.5 2-2" /><path d="m17.5 15.5 2-2" />',
    "mouse": '<rect x="5" y="2" width="14" height="20" rx="7" /><path d="M12 6v4" />',
    "eye-off": '<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /><path d="m2 2 20 20" />',
    "paint-bucket": '<path d="M11 7 6 2" /><path d="M18.992 12H2.041" /><path d="M21.145 18.38A3.34 3.34 0 0 1 20 16.5a3.3 3.3 0 0 1-1.145 1.88c-.575.46-.855 1.02-.855 1.595A2 2 0 0 0 20 22a2 2 0 0 0 2-2.025c0-.58-.285-1.13-.855-1.595" /><path d="m8.5 4.5 2.148-2.148a1.205 1.205 0 0 1 1.704 0l7.296 7.296a1.205 1.205 0 0 1 0 1.704l-7.592 7.592a3.615 3.615 0 0 1-5.112 0l-3.888-3.888a3.615 3.615 0 0 1 0-5.112L5.67 7.33" />',
    "square-dashed": '<path d="M5 3a2 2 0 0 0-2 2" /><path d="M19 3a2 2 0 0 1 2 2" /><path d="M21 19a2 2 0 0 1-2 2" /><path d="M5 21a2 2 0 0 1-2-2" /><path d="M9 3h1" /><path d="M9 21h1" /><path d="M14 3h1" /><path d="M14 21h1" /><path d="M3 9v1" /><path d="M21 9v1" /><path d="M3 14v1" /><path d="M21 14v1" />',
    "zap": '<path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z" />',
    "zap-off": '<path d="M10.768 5.111 13.44 2.44a1.5 1.5 0 012.474 1.561l-1.633 4.625" /><path d="m18.889 13.232.672-.672A1.5 1.5 0 0018.5 10h-2.844" /><path d="m2 2 20 20" /><path d="m7.94 7.94-3.5 3.499A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l5.5-5.5" />',
    "hash": '<line x1="4" x2="20" y1="9" y2="9" /><line x1="4" x2="20" y1="15" y2="15" /><line x1="10" x2="8" y1="3" y2="21" /><line x1="16" x2="14" y1="3" y2="21" />',
    "chart-line": '<path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="m19 9-5 5-4-4-3 3" />',
    "trending-up": '<path d="M16 7h6v6" /><path d="m22 7-8.5 8.5-5-5L2 17" />',
    "trending-down": '<path d="M16 17h6v-6" /><path d="m22 17-8.5-8.5-5 5L2 7" />',
    "palette": '<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" /><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />',
    "unfold-vertical": '<path d="M12 22v-6" /><path d="M12 8V2" /><path d="M4 12H2" /><path d="M10 12H8" /><path d="M16 12h-2" /><path d="M22 12h-2" /><path d="m15 19-3 3-3-3" /><path d="m15 5-3-3-3 3" />',
    "tag": '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" /><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />',
    "zoom-in": '<circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /><line x1="11" x2="11" y1="8" y2="14" /><line x1="8" x2="14" y1="11" y2="11" />',
    "zoom-out": '<circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /><line x1="8" x2="14" y1="11" y2="11" />',
    "rotate-ccw": '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />',
    "trash": '<path d="M10 11v6" /><path d="M14 11v6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />',
    "pencil": '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" />',
    "ungroup": '<rect x="11" y="14" width="10" height="7" rx="2" /><rect x="3" y="3" width="10" height="7" rx="2" />',
    "group": '<path d="M3 7V5c0-1.1.9-2 2-2h2" /><path d="M17 3h2c1.1 0 2 .9 2 2v2" /><path d="M21 17v2c0 1.1-.9 2-2 2h-2" /><path d="M7 21H5c-1.1 0-2-.9-2-2v-2" /><rect width="7" height="5" x="7" y="7" rx="1" /><rect width="7" height="5" x="10" y="12" rx="1" />',
    "folder-plus": '<path d="M12 10v6" /><path d="M9 13h6" /><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />',
    "separator-horizontal": '<path d="m16 16-4 4-4-4" /><path d="M3 12h18" /><path d="m8 8 4-4 4 4" />',
    "split": '<path d="M16 3h5v5" /><path d="M8 3H3v5" /><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" /><path d="m15 9 6-6" />',
    "audio-waveform": '<path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2" />',
    "grid-3x3": '<rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M3 15h18" /><path d="M9 3v18" /><path d="M15 3v18" />'
  };

  // src/frame/icons.ts
  var FROM_CODICON = {
    // scopes (vaporview/src/extension_core/tree_view.ts)
    "chip": "cpu",
    // module
    "debug-stackframe": "list-checks",
    // task
    "symbol-module": "braces",
    // function, generate block, other scopes
    "debug-start": "play",
    // begin block
    "repo-forked": "git-fork",
    // fork
    "symbol-structure": "network",
    // struct
    "surround-with": "combine",
    // union
    "symbol-misc": "shapes",
    // class, unknown
    "debug-disconnect": "unplug",
    // interface
    "package": "package",
    // package
    // variables
    "symbol-array": "brackets",
    // vector
    "symbol-interface": "git-commit-horizontal",
    // wire of 1 bit
    "symbol-variable": "variable",
    // integer
    "settings": "sliders-vertical",
    // parameter
    "pulse": "activity",
    // real
    "file-binary": "binary",
    // other kinds
    "symbol-key": "type",
    // string
    "plug": "plug",
    // port
    "watch": "watch",
    // time
    "symbol-parameter": "list-ordered",
    // enum
    // commands
    "add": "plus",
    "inspect": "crosshair",
    // "Show in Viewer". Orca uses this icon for "Reveal active workspace".
    "search": "search",
    "sync": "refresh-cw",
    "close": "x"
  };
  var svg = (inner) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  function lucideIcon(name, className, tag = "span") {
    const node = document.createElement(tag);
    node.className = className;
    node.innerHTML = svg(LUCIDE[name] ?? "");
    return node;
  }
  function icon(codicon, className, tag = "span") {
    const name = FROM_CODICON[codicon];
    if (name) {
      return lucideIcon(name, className, tag);
    }
    const node = document.createElement(tag);
    node.className = codicon ? `${className} codicon codicon-${codicon}` : className;
    return node;
  }

  // src/frame/menu.ts
  var STYLE = `
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
.vv-menu-shortcut { margin-left: auto; padding-left: 16px; color: var(--orca-muted-foreground); }
.vv-menu-item.danger, .vv-menu-item.danger .vv-menu-icon { color: var(--orca-destructive); }
.vv-menu-item.danger:hover { background: color-mix(in srgb, var(--orca-destructive) 20%, transparent); }
`;
  var open = [];
  var onClose;
  function closeMenu() {
    open.forEach((m) => m.remove());
    open = [];
    onClose?.();
    onClose = void 0;
  }
  function place(menu, x, y, besideWidth = 0) {
    document.body.append(menu);
    const r = menu.getBoundingClientRect();
    let left = x;
    if (left + r.width > window.innerWidth - 4) {
      left = Math.max(4, besideWidth ? x - besideWidth - r.width : window.innerWidth - r.width - 4);
    }
    const top = Math.max(4, Math.min(y, window.innerHeight - r.height - 4));
    menu.style.left = `${left}px`;
    menu.style.top = `${top}px`;
  }
  function build(entries, level, pick) {
    const menu = document.createElement("div");
    menu.className = "vv-menu";
    menu.dataset.level = String(level);
    const closeDeeper = () => {
      open.filter((m) => Number(m.dataset.level) > level).forEach((m) => m.remove());
      open = open.filter((m) => Number(m.dataset.level) <= level);
      menu.querySelectorAll(".open").forEach((n) => n.classList.remove("open"));
    };
    const withIcons = entries.some((e) => e.kind !== "separator" && !!e.icon);
    for (const entry of entries) {
      if (entry.kind === "separator") {
        const sep = document.createElement("div");
        sep.className = "vv-menu-sep";
        menu.append(sep);
        continue;
      }
      const row = document.createElement("div");
      row.className = "vv-menu-item";
      if (withIcons) {
        row.append(entry.icon ? lucideIcon(entry.icon, "vv-menu-icon") : Object.assign(document.createElement("span"), { className: "vv-menu-icon" }));
      }
      const label = document.createElement("span");
      label.textContent = entry.kind === "item" ? entry.title : entry.label;
      row.append(label);
      if (entry.kind === "item") {
        row.dataset.command = entry.command;
        row.dataset.title = entry.title;
        if (entry.danger) {
          row.classList.add("danger");
        }
        if (entry.shortcut) {
          const shortcut = document.createElement("span");
          shortcut.className = "vv-menu-shortcut";
          shortcut.textContent = entry.shortcut;
          row.append(shortcut);
        }
        row.addEventListener("mouseenter", closeDeeper);
        row.addEventListener("click", (e) => {
          e.stopPropagation();
          closeMenu();
          pick(entry.command);
        });
      } else {
        row.dataset.title = entry.label;
        row.append(lucideIcon("chevron-right", "vv-menu-arrow"));
        const show = () => {
          closeDeeper();
          row.classList.add("open");
          const sub = build(entry.items, level + 1, pick);
          const r = row.getBoundingClientRect();
          place(sub, r.right - 2, r.top - 4, r.width);
          open.push(sub);
        };
        row.addEventListener("mouseenter", show);
        row.addEventListener("click", (e) => {
          e.stopPropagation();
          show();
        });
      }
      menu.append(row);
    }
    return menu;
  }
  function showMenu(x, y, entries, pick, closed) {
    closeMenu();
    if (!entries.length) {
      closed?.();
      return;
    }
    if (!document.getElementById("vv-menu-style")) {
      const style = document.createElement("style");
      style.id = "vv-menu-style";
      style.textContent = STYLE;
      document.head.append(style);
    }
    onClose = closed;
    const menu = build(entries, 0, pick);
    place(menu, x, y);
    open.push(menu);
  }
  window.addEventListener("pointerdown", (e) => {
    if (open.length && !e.target?.closest?.(".vv-menu")) {
      closeMenu();
    }
  }, true);
  window.addEventListener("keydown", (e) => {
    if (open.length && e.key === "Escape") {
      closeMenu();
      e.stopPropagation();
    }
  }, true);
  window.addEventListener("blur", () => closeMenu());
  window.addEventListener("wheel", (e) => {
    if (open.length && !e.target?.closest?.(".vv-menu")) {
      closeMenu();
    }
  }, true);
  var lastClipboardResult = "";
  async function writeClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      lastClipboardResult = `ok, ${text.length} characters`;
    } catch (err) {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.cssText = "position:fixed;left:-1000px;top:0";
      document.body.append(area);
      area.select();
      let copied = false;
      try {
        copied = document.execCommand("copy");
      } catch {
      }
      area.remove();
      lastClipboardResult = `${copied ? "ok with the fallback" : "failed"}, ${text.length} characters (${err?.name ?? err})`;
    }
  }

  // src/frame/panel.ts
  var ICON_SETTING = "treeIcons";
  var vaporviewIcons = false;
  var ICON_COLORS = {
    "charts.purple": "#b180d7",
    "charts.green": "#89d185",
    "charts.orange": "#d18616",
    "charts.yellow": "#cca700",
    "charts.blue": "#3794ff",
    "charts.red": "#f14c4c"
  };
  var el = (tag, cls = "", text = "") => {
    const node = document.createElement(tag);
    if (cls) {
      node.className = cls;
    }
    if (text) {
      node.textContent = text;
    }
    return node;
  };
  async function request(name, input = {}, timeoutMs = 3e4) {
    for (; ; ) {
      try {
        return await orca.plugin.request(name, JSON.parse(JSON.stringify(input)), { timeoutMs });
      } catch (err) {
        if (err?.code !== "rate_limited") {
          throw err;
        }
        await new Promise((r) => setTimeout(r, err.retryAfterMs ?? 500));
      }
    }
  }
  var root = el("div", "vv-panel");
  var header = el("div", "vv-header");
  var title = el("span", "vv-title", "Waveforms");
  var openButton = el("button", "vv-button", "Open Waveform");
  header.append(title, openButton);
  var messageBar = el("div", "vv-message");
  var browser = el("div", "vv-browser");
  var list = el("div", "vv-list vv-rows vv-scroll");
  var treeTitle = el("div", "vv-section");
  var treeTitleText = el("span", "", "Netlist");
  var treeButtons = el("span", "vv-section-buttons");
  treeTitle.append(treeTitleText, treeButtons);
  var searchBox = el("div", "vv-search");
  var tree = el("div", "vv-tree vv-rows vv-scroll");
  var results = el("div", "vv-tree vv-rows vv-scroll");
  results.style.display = "none";
  root.append(header, messageBar, browser, list, treeTitle, searchBox, tree, results);
  document.body.append(root);
  var state = { workspace: null, waveforms: [], active: null };
  function showMessage(text, level = "error") {
    messageBar.textContent = text;
    messageBar.dataset.level = level;
    messageBar.style.display = text ? "block" : "none";
  }
  async function run(action) {
    try {
      showMessage("");
      await action();
    } catch (err) {
      showMessage(err?.message ?? String(err));
    }
  }
  function renderList() {
    list.replaceChildren();
    if (!state.workspace) {
      list.append(el("div", "vv-empty", "Select a workspace to open a waveform."));
    } else if (state.waveforms.length === 0) {
      list.append(el("div", "vv-empty", "No waveform is open in this workspace. Open a VCD, FST, or GHW file."));
    }
    for (const w of state.waveforms) {
      const row = el("div", "vv-row" + (w.key === state.active ? " active" : ""));
      row.title = w.folder;
      const close = lucideIcon("x", "vv-icon", "button");
      close.title = "Close Waveform";
      close.addEventListener("click", (e) => {
        e.stopPropagation();
        void run(() => request("panel.close", { docKey: w.key }));
      });
      row.addEventListener("click", () => void run(() => request("panel.select", { docKey: w.key })));
      row.append(el("span", "vv-name", w.name), el("span", "vv-dim", w.folder), close);
      list.append(row);
    }
    const hasTree = !!state.active;
    treeTitle.style.display = hasTree ? "" : "none";
    if (!hasTree) {
      searchBox.replaceChildren();
      searchInput = void 0;
      results.style.display = "none";
    }
    tree.style.display = hasTree && results.style.display === "none" ? "" : "none";
  }
  var browserOpen = false;
  async function browse(dir) {
    const r = await request("panel.browse", { dir });
    if (r.file) {
      return openWaveform(r.file);
    }
    browser.replaceChildren();
    const bar = el("div", "vv-field");
    const input = el("input");
    input.value = r.dir;
    input.spellcheck = false;
    input.title = "Folder or waveform file. Press Enter.";
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        void run(() => browse(input.value.trim()));
      }
    });
    const cancel = lucideIcon("x", "vv-icon", "button");
    cancel.title = "Cancel";
    cancel.addEventListener("click", () => {
      browserOpen = false;
      browser.replaceChildren();
    });
    bar.append(input, cancel);
    browser.append(bar);
    if (r.error) {
      browser.append(el("div", "vv-empty", r.error));
    }
    const entries = el("div", "vv-entries vv-rows vv-scroll");
    const join = (name) => r.dir + (r.dir.endsWith(r.sep) ? "" : r.sep) + name;
    if (r.parent) {
      const up = el("div", "vv-entry");
      up.append(lucideIcon("folder", "vv-node-icon"), el("span", "vv-name", ".."));
      up.addEventListener("click", () => void run(() => browse(r.parent)));
      entries.append(up);
    }
    for (const name of r.folders) {
      const row = el("div", "vv-entry");
      row.append(lucideIcon("folder", "vv-node-icon"), el("span", "vv-name", name));
      row.addEventListener("click", () => void run(() => browse(join(name))));
      entries.append(row);
    }
    for (const name of r.files) {
      const row = el("div", "vv-entry");
      row.append(lucideIcon("file", "vv-node-icon"), el("span", "vv-name", name));
      row.addEventListener("click", () => void run(() => openWaveform(join(name))));
      entries.append(row);
    }
    if (!r.error && r.folders.length === 0 && r.files.length === 0) {
      entries.append(el("div", "vv-empty", "No folder and no waveform file here."));
    }
    browser.append(entries);
  }
  async function openWaveform(path) {
    showMessage("Loading the waveform\u2026", "info");
    await request("panel.open", { path }, 12e4);
    browserOpen = false;
    browser.replaceChildren();
    showMessage("");
  }
  openButton.addEventListener("click", () => {
    if (browserOpen) {
      browserOpen = false;
      browser.replaceChildren();
      return;
    }
    browserOpen = true;
    void run(() => browse());
  });
  var views = /* @__PURE__ */ new Map();
  var selected = /* @__PURE__ */ new Set();
  var openIds = /* @__PURE__ */ new Set();
  function setSelection(ids) {
    for (const id of selected) {
      views.get(id)?.row.classList.remove("selected");
    }
    selected = new Set(ids);
    for (const id of selected) {
      views.get(id)?.row.classList.add("selected");
    }
    void request("tree.action", { action: "select", ids });
  }
  var runTreeCommand = (id, command) => run(() => request("menu.run", { source: "tree", id, command }, 6e4));
  function netlistIcon(codicon, color) {
    if (!vaporviewIcons) {
      return icon(codicon, "vv-node-icon");
    }
    const node = el("span", codicon ? `vv-node-icon vv-vaporview-icon codicon codicon-${codicon}` : "vv-node-icon");
    node.style.color = ICON_COLORS[color] ?? "";
    return node;
  }
  async function loadChildren(container, id, depth = 0) {
    const r = await request("tree.children", { id });
    if (id === void 0) {
      renderTitleButtons(r.title ?? []);
    }
    container.replaceChildren();
    for (const node of r.items) {
      container.append(renderNode(node, depth));
    }
  }
  function renderTitleButtons(buttons) {
    treeButtons.replaceChildren();
    showSearchField(buttons.some((b) => b.command === SEARCH_COMMAND));
    for (const b of buttons) {
      if (b.command === SEARCH_COMMAND) {
        continue;
      }
      const button = icon(b.icon, "vv-icon", "button");
      if (!b.icon) {
        button.textContent = b.title.slice(0, 1);
      }
      button.title = b.title;
      button.addEventListener("click", () => void run(() => request("menu.run", { source: "title", command: b.command })));
      treeButtons.append(button);
    }
  }
  function renderNode(node, depth) {
    const wrap = el("div", "vv-node");
    const row = el("div", "vv-node-row");
    row.style.paddingLeft = `${8 + depth * 16}px`;
    row.title = node.tooltip || node.label;
    const twist = node.expandable ? lucideIcon("chevron-right", "vv-twist") : el("span", "vv-twist");
    const icon2 = netlistIcon(node.icon, node.color);
    row.append(twist, icon2, el("span", "vv-name", node.label), el("span", "vv-dim", node.description));
    for (const b of node.inline) {
      const button = icon(b.icon, "vv-icon vv-inline", "button");
      if (!b.icon) {
        button.textContent = b.title.slice(0, 1);
      }
      button.title = b.title;
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        void runTreeCommand(node.id, b.command);
      });
      row.append(button);
    }
    const children = el("div", "vv-children");
    children.style.display = "none";
    let isOpen = false;
    let loaded;
    const setOpen = async (next, tell = true) => {
      if (!node.expandable || isOpen === next) {
        return loaded;
      }
      isOpen = next;
      if (isOpen) {
        openIds.add(node.id);
      } else {
        openIds.delete(node.id);
      }
      twist.classList.toggle("open", isOpen);
      children.style.display = isOpen ? "" : "none";
      if (tell) {
        void request("tree.action", { id: node.id, action: isOpen ? "expand" : "collapse" });
      }
      if (isOpen && !loaded) {
        loaded = loadChildren(children, node.id, depth + 1);
      }
      return loaded;
    };
    row.addEventListener("click", (e) => {
      if (e.ctrlKey || e.metaKey) {
        const next = new Set(selected);
        if (next.has(node.id)) {
          next.delete(node.id);
        } else {
          next.add(node.id);
        }
        setSelection([...next]);
        return;
      }
      setSelection([node.id]);
      if (node.expandable) {
        void run(() => setOpen(!isOpen));
      } else {
        void run(() => request("tree.action", { id: node.id, action: "click" }, 6e4));
      }
    });
    row.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (!selected.has(node.id)) {
        setSelection([node.id]);
      }
      const x = e.clientX;
      const y = e.clientY;
      void run(async () => {
        const r = await request("menu.tree", { id: node.id });
        showMenu(x, y, r.items, (command) => void runTreeCommand(node.id, command));
      });
    });
    views.set(node.id, { node, row, open: () => setOpen(true) });
    wrap.append(row, children);
    if (selected.has(node.id)) {
      row.classList.add("selected");
    }
    if (node.open || openIds.has(node.id)) {
      void run(() => setOpen(true, false));
    }
    return wrap;
  }
  function reloadTree(full = true) {
    views = /* @__PURE__ */ new Map();
    if (full) {
      selected = /* @__PURE__ */ new Set();
      openIds = /* @__PURE__ */ new Set();
    }
    if (state.active) {
      void run(() => loadChildren(tree));
    } else {
      tree.replaceChildren();
    }
  }
  async function reveal(path, select) {
    for (const id of path.slice(0, -1)) {
      await views.get(id)?.open();
    }
    const target = views.get(path[path.length - 1]);
    if (!target) {
      return;
    }
    target.row.scrollIntoView({ block: "nearest" });
    if (select) {
      setSelection([target.node.id]);
    }
  }
  var SEARCH_COMMAND = "vaporview.searchNetlist";
  var SEARCH_PLACEHOLDER = "Search netlist";
  var searchInput;
  var searchClear;
  var searchInfo;
  var searchOpen = false;
  function showSearchField(searchable) {
    if (!searchable) {
      searchBox.replaceChildren();
      searchInput = void 0;
      return;
    }
    if (searchInput?.isConnected) {
      return;
    }
    searchBox.replaceChildren();
    const field = el("div", "vv-field");
    const input = el("input");
    input.spellcheck = false;
    input.placeholder = SEARCH_PLACEHOLDER;
    input.addEventListener("input", () => void run(async () => {
      if (!searchOpen) {
        searchOpen = true;
        await request("menu.run", { source: "title", command: SEARCH_COMMAND });
      }
      await request("search.input", { value: input.value });
    }));
    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        void request("search.hide");
      }
      if (e.key === "Enter") {
        results.firstElementChild?.click();
      }
    });
    const clear = lucideIcon("x", "vv-icon", "button");
    clear.title = "Clear the search";
    clear.style.visibility = "hidden";
    clear.addEventListener("click", () => void request("search.hide"));
    field.append(lucideIcon("search", "vv-field-icon"), input, clear);
    searchInfo = el("div", "vv-search-info");
    searchBox.append(field, searchInfo);
    searchInput = input;
    searchClear = clear;
  }
  function renderSearch(s) {
    searchOpen = s.visible;
    if (!searchInput) {
      return;
    }
    if (s.visible && document.activeElement !== searchInput && s.value === "") {
      searchInput.focus();
    }
    if (searchInput.value !== s.value) {
      searchInput.value = s.value;
    }
    searchInput.placeholder = s.visible && s.placeholder ? s.placeholder : SEARCH_PLACEHOLDER;
    const active = s.visible && s.value !== "";
    searchClear.style.visibility = active ? "visible" : "hidden";
    searchInfo.textContent = !active ? "" : s.busy ? "Searching\u2026" : s.title + (s.more ? ` (the first ${s.items.length} show)` : "");
    results.style.display = active ? "" : "none";
    tree.style.display = active || !state.active ? "none" : "";
    results.replaceChildren();
    if (!active) {
      return;
    }
    s.items.forEach((item, index) => {
      const row = el("div", "vv-result");
      const icon2 = netlistIcon(item.icon, item.color);
      const text = el("div", "vv-result-text");
      const first = el("div", "vv-result-line");
      first.append(el("span", "vv-name", item.label), el("span", "vv-dim", item.description));
      text.append(first, el("div", "vv-dim vv-result-detail", item.detail));
      row.title = item.detail;
      row.append(icon2, text);
      row.addEventListener("click", () => void run(() => request("search.accept", { index }, 6e4)));
      results.append(row);
    });
  }
  async function refresh(context) {
    const workspace = context !== void 0 ? context : await orca.host.call("workspace.readContext").catch(() => null);
    state = await request("panel.state", { workspace });
    renderList();
    reloadTree();
  }
  orca.plugin.on("panel.changed", (next) => {
    state = next;
    renderList();
  });
  orca.plugin.on("tree.changed", (p) => reloadTree(p?.full === true));
  orca.plugin.on("search.update", (s) => renderSearch(s));
  orca.plugin.on("debug.menu", (p) => {
    const row = document.querySelectorAll(".vv-node-row")[p?.row ?? 0];
    const r = row?.getBoundingClientRect();
    if (row && r) {
      row.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, cancelable: true, clientX: r.left + 80, clientY: r.top + 12 }));
    }
  });
  orca.plugin.on("tree.reveal", (p) => void run(() => reveal(p.path ?? [], p.select)));
  orca.plugin.on("panel.message", (m) => showMessage(m.message, m.level));
  orca.plugin.on("clipboard.write", (p) => {
    if (document.hasFocus()) {
      void writeClipboard(p?.text ?? "");
    }
  });
  async function readIconSetting() {
    const before = vaporviewIcons;
    vaporviewIcons = await orca.settings.get(ICON_SETTING).catch(() => void 0) === "Vaporview";
    if (before !== vaporviewIcons) {
      reloadTree(false);
    }
  }
  orca.settings.onDidChange?.(() => void readIconSetting());
  orca.on("workspace.changed", (p) => void run(() => refresh(p?.context ?? null)));
  renderList();
  void run(async () => {
    await readIconSetting();
    await refresh();
  });
})();
