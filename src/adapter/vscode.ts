// A small implementation of the `vscode` module for the Orca worker.
//
// The build aliases the module name `vscode` to this file. The vaporview extension code
// (vaporview/src/extension_core) then runs unchanged. What VS Code does for an extension, the
// host (src/worker) does through the AdapterHost interface below.
//
// A VS Code API that Orca has no equivalent for is a no-op that logs one line. See
// docs/feature-parity.md for the effect on each vaporview feature.

import * as fs from 'node:fs';
import * as nodePath from 'node:path';

// ---------------------------------------------------------------------------------------------
// Host interface
// ---------------------------------------------------------------------------------------------

export type CustomEditorRegistration = {
  viewType: string;
  provider: any;
  options: any;
};

export interface AdapterHost {
  /** Folder that has the vaporview files: package.json, media/, dist/worker.js, target/...wasm. */
  extensionPath: string;
  log(message: string): void;
  notify(level: 'info' | 'warning' | 'error', message: string): void;
  /** A message with buttons. The answer is the text of the selected button, or undefined. */
  ask(level: 'info' | 'warning' | 'error', message: string, items: string[]): Promise<string | undefined>;
  /** `vscode.commands.executeCommand` for a command that the extension did not register. */
  executeHostCommand(command: string, args: unknown[]): unknown;
  /** A plugin setting, or undefined to use the default of the vaporview package.json. */
  getSetting(key: string): unknown;
  setSetting(key: string, value: unknown): void;
  statusBarChanged(item: StatusBarItem): void;
  clipboardWrite(text: string): void;
  /** A quick pick changed: it shows or hides, or its text or items are different. */
  quickPickChanged(pick: QuickPick<any>): void;
}

const noHost: AdapterHost = {
  extensionPath: '',
  log: (m) => console.log(m),
  notify: (level, m) => console.log(`[${level}] ${m}`),
  ask: async () => undefined,
  executeHostCommand: () => undefined,
  getSetting: () => undefined,
  setSetting: () => undefined,
  statusBarChanged: () => undefined,
  clipboardWrite: () => undefined,
  quickPickChanged: () => undefined,
};

let host: AdapterHost = noHost;

/** What the extension registered. The host reads it after `activate()`. */
export const registry = {
  customEditors: new Map<string, CustomEditorRegistration>(),
  treeViews: new Map<string, TreeView<any>>(),
  commands: new Map<string, (...args: any[]) => any>(),
  contextKeys: new Map<string, unknown>(),
  statusBarItems: [] as StatusBarItem[],
};

export const onDidChangeContextKey = new (class {
  listeners = new Set<(key: string, value: unknown) => void>();
})();

export function setAdapterHost(h: Partial<AdapterHost>): void {
  host = { ...noHost, ...h };
}

const warned = new Set<string>();
function unsupported(name: string): void {
  if (warned.has(name)) { return; }
  warned.add(name);
  host.log(`[adapter] vscode.${name} is not supported in Orca`);
}

/** A namespace object. An unknown member is a function that does nothing. */
function namespace<T extends object>(name: string, impl: T): T & Record<string, any> {
  return new Proxy(impl as any, {
    get(target, prop) {
      if (prop in target || typeof prop === 'symbol') { return target[prop]; }
      return (..._args: unknown[]) => {
        unsupported(`${name}.${String(prop)}`);
        return new Disposable(() => undefined);
      };
    },
  });
}

// ---------------------------------------------------------------------------------------------
// Basic types
// ---------------------------------------------------------------------------------------------

export class Disposable {
  constructor(private callOnDispose: () => any) {}
  static from(...items: { dispose(): any }[]): Disposable {
    return new Disposable(() => items.forEach((i) => i.dispose()));
  }
  dispose(): any { return this.callOnDispose(); }
}

export class EventEmitter<T> {
  private listeners = new Set<(e: T) => any>();
  event = (listener: (e: T) => any, thisArg?: any, disposables?: Disposable[]): Disposable => {
    const fn = thisArg ? listener.bind(thisArg) : listener;
    this.listeners.add(fn);
    const d = new Disposable(() => this.listeners.delete(fn));
    if (Array.isArray(disposables)) { disposables.push(d); }
    return d;
  };
  fire(e: T): void {
    for (const l of [...this.listeners]) {
      try { l(e); } catch (err: any) { host.log(`[adapter] event listener failed: ${err?.stack ?? err}`); }
    }
  }
  dispose(): void { this.listeners.clear(); }
}

export class CancellationTokenSource {
  private emitter = new EventEmitter<void>();
  token = { isCancellationRequested: false, onCancellationRequested: this.emitter.event };
  cancel(): void { this.token.isCancellationRequested = true; this.emitter.fire(); }
  dispose(): void { this.emitter.dispose(); }
}

const encodeSegment = (s: string) => encodeURIComponent(s);

export class Uri {
  private constructor(
    readonly scheme: string,
    readonly authority: string,
    readonly path: string,
    readonly query: string,
    readonly fragment: string,
  ) {}

  static file(p: string): Uri {
    let authority = '';
    p = p.replace(/\\/g, '/');
    if (p.startsWith('//')) {
      const i = p.indexOf('/', 2);
      authority = i < 0 ? p.slice(2) : p.slice(2, i);
      p = i < 0 ? '/' : p.slice(i);
    }
    if (!p.startsWith('/')) { p = '/' + p; }
    return new Uri('file', authority, p, '', '');
  }

  static parse(value: string): Uri {
    const m = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/.exec(value);
    if (!m) { return new Uri('file', '', value, '', ''); }
    return new Uri(
      m[2] || 'file',
      decodeURIComponent(m[4] || ''),
      decodeURIComponent(m[5] || ''),
      decodeURIComponent(m[7] || ''),
      decodeURIComponent(m[9] || ''),
    );
  }

  static joinPath(base: Uri, ...segments: string[]): Uri {
    return new Uri(base.scheme, base.authority, nodePath.posix.join(base.path, ...segments), base.query, base.fragment);
  }

  static from(c: { scheme: string; authority?: string; path?: string; query?: string; fragment?: string }): Uri {
    return new Uri(c.scheme, c.authority ?? '', c.path ?? '', c.query ?? '', c.fragment ?? '');
  }

  with(change: { scheme?: string; authority?: string; path?: string; query?: string; fragment?: string }): Uri {
    return new Uri(
      change.scheme ?? this.scheme,
      change.authority ?? this.authority,
      change.path ?? this.path,
      change.query ?? this.query,
      change.fragment ?? this.fragment,
    );
  }

  get fsPath(): string {
    let value: string;
    if (this.authority && this.path.length > 1 && this.scheme === 'file') {
      value = `//${this.authority}${this.path}`;
    } else if (/^\/[A-Za-z]:/.test(this.path)) {
      value = this.path[1].toLowerCase() + this.path.slice(2);
    } else {
      value = this.path;
    }
    return process.platform === 'win32' ? value.replace(/\//g, '\\') : value;
  }

  toString(): string {
    const path = this.path.split('/').map(encodeSegment).join('/');
    let out = `${this.scheme}://${encodeSegment(this.authority)}${path}`;
    if (this.query) { out += '?' + encodeSegment(this.query); }
    if (this.fragment) { out += '#' + encodeSegment(this.fragment); }
    return out;
  }

  toJSON(): object {
    return { scheme: this.scheme, authority: this.authority, path: this.path, query: this.query, fragment: this.fragment, fsPath: this.fsPath };
  }
}

export class ThemeColor { constructor(readonly id: string) {} }
export class ThemeIcon {
  static readonly File = new ThemeIcon('file');
  static readonly Folder = new ThemeIcon('folder');
  constructor(readonly id: string, readonly color?: ThemeColor) {}
}

export const TreeItemCollapsibleState = { None: 0, Collapsed: 1, Expanded: 2 } as const;
export const TreeItemCheckboxState = { Unchecked: 0, Checked: 1 } as const;
export const StatusBarAlignment = { Left: 1, Right: 2 } as const;
export const ProgressLocation = { SourceControl: 1, Window: 10, Notification: 15 } as const;
export const ConfigurationTarget = { Global: 1, Workspace: 2, WorkspaceFolder: 3 } as const;
export const ViewColumn = { Active: -1, Beside: -2, One: 1, Two: 2, Three: 3 } as const;
export const QuickPickItemKind = { Separator: -1, Default: 0 } as const;
export const FileType = { Unknown: 0, File: 1, Directory: 2, SymbolicLink: 64 } as const;
export const ExtensionMode = { Production: 1, Development: 2, Test: 3 } as const;
export const UIKind = { Desktop: 1, Web: 2 } as const;

export class TreeItem {
  label?: string | { label: string };
  id?: string;
  description?: string | boolean;
  tooltip?: unknown;
  iconPath?: unknown;
  contextValue?: string;
  command?: unknown;
  checkboxState?: unknown;
  resourceUri?: Uri;
  constructor(label: string | { label: string } | Uri, public collapsibleState: number = TreeItemCollapsibleState.None) {
    if (label instanceof Uri) { this.resourceUri = label; } else { this.label = label; }
  }
}

export class RelativePattern {
  constructor(readonly base: unknown, readonly pattern: string) {}
}

export class DataTransferItem {
  constructor(readonly value: unknown) {}
  async asString(): Promise<string> { return typeof this.value === 'string' ? this.value : JSON.stringify(this.value); }
  asFile(): undefined { return undefined; }
}

export class DataTransfer {
  private items = new Map<string, DataTransferItem>();
  get(mime: string): DataTransferItem | undefined { return this.items.get(mime); }
  set(mime: string, item: DataTransferItem): void { this.items.set(mime, item); }
  forEach(cb: (item: DataTransferItem, mime: string) => void): void { this.items.forEach(cb); }
}

export class MarkdownString {
  constructor(public value = '') {}
  appendMarkdown(v: string): this { this.value += v; return this; }
  appendText(v: string): this { this.value += v; return this; }
  appendCodeblock(v: string): this { this.value += '\n' + v + '\n'; return this; }
}

// ---------------------------------------------------------------------------------------------
// Status bar
// ---------------------------------------------------------------------------------------------

export class StatusBarItem {
  private _text = '';
  tooltip: unknown;
  command: unknown;
  visible = false;
  constructor(readonly alignment: number, readonly priority: number, readonly index: number) {}
  get text(): string { return this._text; }
  set text(v: string) { this._text = v; host.statusBarChanged(this); }
  show(): void { this.visible = true; host.statusBarChanged(this); }
  hide(): void { this.visible = false; host.statusBarChanged(this); }
  dispose(): void { this.hide(); }
}

// ---------------------------------------------------------------------------------------------
// Quick pick: a text field with a list of results. VS Code draws it at the top of its window.
// Orca has no quick pick for a plugin, so the host shows it in the panel.
// ---------------------------------------------------------------------------------------------

export class QuickPick<T> {
  private _value = '';
  private _items: T[] = [];
  private _title: string | undefined;
  private _placeholder: string | undefined;
  private _busy = false;
  visible = false;
  selectedItems: T[] = [];
  activeItems: T[] = [];
  matchOnDescription = false;
  matchOnDetail = false;

  private valueEmitter = new EventEmitter<string>();
  private acceptEmitter = new EventEmitter<void>();
  private hideEmitter = new EventEmitter<void>();
  onDidChangeValue = this.valueEmitter.event;
  onDidAccept = this.acceptEmitter.event;
  onDidHide = this.hideEmitter.event;
  onDidChangeSelection = new EventEmitter<T[]>().event;
  onDidChangeActive = new EventEmitter<T[]>().event;
  onDidTriggerButton = new EventEmitter<unknown>().event;

  get value(): string { return this._value; }
  set value(v: string) {
    if (v === this._value) { return; }
    this._value = v;
    host.quickPickChanged(this);
    this.valueEmitter.fire(v);
  }
  get items(): T[] { return this._items; }
  set items(v: T[]) { this._items = v; host.quickPickChanged(this); }
  get title(): string | undefined { return this._title; }
  set title(v: string | undefined) { this._title = v; host.quickPickChanged(this); }
  get placeholder(): string | undefined { return this._placeholder; }
  set placeholder(v: string | undefined) { this._placeholder = v; host.quickPickChanged(this); }
  get busy(): boolean { return this._busy; }
  set busy(v: boolean) { this._busy = v; host.quickPickChanged(this); }

  show(): void { this.visible = true; host.quickPickChanged(this); }
  hide(): void {
    if (!this.visible) { return; }
    this.visible = false;
    host.quickPickChanged(this);
    this.hideEmitter.fire();
  }
  dispose(): void { this.hide(); }

  /** The host calls this when the person types in the field. */
  userInput(value: string): void {
    if (value === this._value) { return; }
    this._value = value;
    this.valueEmitter.fire(value);
  }
  /** The host calls this when the person selects a result. */
  userAccept(index: number): void {
    const item = this._items[index];
    if (item === undefined) { return; }
    this.selectedItems = [item];
    this.activeItems = [item];
    this.acceptEmitter.fire();
  }
}

// ---------------------------------------------------------------------------------------------
// Tree view
// ---------------------------------------------------------------------------------------------

export class TreeView<T> {
  selection: T[] = [];
  visible = true;
  title?: string;
  description?: string;
  message?: string;
  badge?: unknown;

  readonly expandEmitter = new EventEmitter<{ element: T }>();
  readonly collapseEmitter = new EventEmitter<{ element: T }>();
  readonly selectionEmitter = new EventEmitter<{ selection: readonly T[] }>();
  readonly visibilityEmitter = new EventEmitter<{ visible: boolean }>();
  readonly checkboxEmitter = new EventEmitter<{ items: [T, number][] }>();
  /** The host shows the element in the panel. */
  readonly revealEmitter = new EventEmitter<{ element: T; options?: { select?: boolean; focus?: boolean; expand?: boolean | number } }>();

  onDidExpandElement = this.expandEmitter.event;
  onDidCollapseElement = this.collapseEmitter.event;
  onDidChangeSelection = this.selectionEmitter.event;
  onDidChangeVisibility = this.visibilityEmitter.event;
  onDidChangeCheckboxState = this.checkboxEmitter.event;

  constructor(readonly id: string, readonly options: { treeDataProvider: any; [key: string]: unknown }) {}

  async reveal(element: T, options?: { select?: boolean; focus?: boolean; expand?: boolean | number }): Promise<void> {
    this.revealEmitter.fire({ element, options });
  }
  dispose(): void { /* the host owns the panel */ }
}

// ---------------------------------------------------------------------------------------------
// Webview panel. The host makes one for each document and connects it to the editor frame.
// ---------------------------------------------------------------------------------------------

export class WebviewPanel {
  active = true;
  visible = true;
  viewColumn = ViewColumn.One;
  title = '';
  options = {};

  readonly receiveEmitter = new EventEmitter<any>();
  readonly viewStateEmitter = new EventEmitter<{ webviewPanel: WebviewPanel }>();
  readonly disposeEmitter = new EventEmitter<void>();

  onDidChangeViewState = this.viewStateEmitter.event;
  onDidDispose = this.disposeEmitter.event;

  readonly webview: {
    html: string;
    options: unknown;
    cspSource: string;
    asWebviewUri(uri: Uri): Uri;
    postMessage(message: unknown): Promise<boolean>;
    onDidReceiveMessage: EventEmitter<any>['event'];
  };

  /**
   * @param post sends one message to the frame that shows this panel
   * @param revealPanel shows the tab of this panel
   */
  constructor(readonly viewType: string, post: (message: unknown) => void, private revealPanel: () => void = () => undefined) {
    this.webview = {
      html: '',
      options: {},
      cspSource: "'self'",
      asWebviewUri: (uri: Uri) => uri,
      postMessage: async (message: unknown) => { post(message); return true; },
      onDidReceiveMessage: this.receiveEmitter.event,
    };
  }

  reveal(): void { this.revealPanel(); }

  /** The host calls this when the tab shows or hides. */
  setViewState(active: boolean, visible: boolean): void {
    if (this.active === active && this.visible === visible) { return; }
    this.active = active;
    this.visible = visible;
    this.viewStateEmitter.fire({ webviewPanel: this });
  }

  /** The host calls this to make the panel the active one. It always tells the extension. */
  activate(): void {
    this.active = true;
    this.visible = true;
    this.viewStateEmitter.fire({ webviewPanel: this });
  }

  dispose(): void {
    this.disposeEmitter.fire();
    this.receiveEmitter.dispose();
    this.viewStateEmitter.dispose();
    this.disposeEmitter.dispose();
  }
}

// ---------------------------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------------------------

let packageJsonCache: any;
function extensionPackageJson(): any {
  if (!packageJsonCache) {
    try {
      packageJsonCache = JSON.parse(fs.readFileSync(nodePath.join(host.extensionPath, 'package.json'), 'utf8'));
    } catch {
      packageJsonCache = {};
    }
  }
  return packageJsonCache;
}

let defaultsCache: Map<string, unknown> | undefined;
function settingDefaults(): Map<string, unknown> {
  if (!defaultsCache) {
    defaultsCache = new Map();
    const c = extensionPackageJson().contributes?.configuration;
    for (const group of Array.isArray(c) ? c : c ? [c] : []) {
      for (const [key, def] of Object.entries<any>(group.properties ?? {})) {
        defaultsCache.set(key, def.default);
      }
    }
  }
  return defaultsCache;
}

const configurationEmitter = new EventEmitter<{ affectsConfiguration(section: string): boolean }>();

/** The host calls this when the person changes a plugin setting. */
export function fireConfigurationChanged(keys: string[]): void {
  configurationEmitter.fire({
    affectsConfiguration: (section: string) => keys.some((k) => k === section || k.startsWith(section + '.')),
  });
}

function getConfiguration(section?: string) {
  const full = (key: string) => (section ? `${section}.${key}` : key);
  const read = (key: string) => {
    const v = host.getSetting(full(key));
    return v !== undefined ? v : settingDefaults().get(full(key));
  };
  return {
    get: (key: string, defaultValue?: unknown) => {
      const v = read(key);
      return v !== undefined ? v : defaultValue;
    },
    has: (key: string) => read(key) !== undefined,
    inspect: (key: string) => ({ key: full(key), defaultValue: settingDefaults().get(full(key)), globalValue: host.getSetting(full(key)) }),
    update: async (key: string, value: unknown) => {
      host.setSetting(full(key), value);
      fireConfigurationChanged([full(key)]);
    },
  };
}

// ---------------------------------------------------------------------------------------------
// Namespaces
// ---------------------------------------------------------------------------------------------

export const commands = namespace('commands', {
  registerCommand(id: string, callback: (...args: any[]) => any, thisArg?: any): Disposable {
    registry.commands.set(id, thisArg ? callback.bind(thisArg) : callback);
    return new Disposable(() => registry.commands.delete(id));
  },
  async executeCommand(id: string, ...args: any[]): Promise<unknown> {
    if (id === 'setContext') {
      registry.contextKeys.set(args[0], args[1]);
      onDidChangeContextKey.listeners.forEach((l) => l(args[0], args[1]));
      return undefined;
    }
    const fn = registry.commands.get(id);
    if (fn) { return fn(...args); }
    return host.executeHostCommand(id, args);
  },
  async getCommands(): Promise<string[]> { return [...registry.commands.keys()]; },
});

function outputChannel(name: string) {
  const line = (level: string) => (message: string, ...rest: unknown[]) =>
    host.log(`[${name}]${level} ${message}${rest.length ? ' ' + rest.map(String).join(' ') : ''}`);
  return {
    name,
    append: line(''), appendLine: line(''),
    trace: line(' trace:'), debug: line(' debug:'), info: line(''), warn: line(' warn:'), error: line(' error:'),
    replace: () => undefined, clear: () => undefined, show: () => undefined, hide: () => undefined, dispose: () => undefined,
    logLevel: 3,
    onDidChangeLogLevel: new EventEmitter<number>().event,
  };
}

// `showInformationMessage(text, ...items)` and `showInformationMessage(text, options, ...items)`.
// An item is a text or an object with a `title`. The answer is the item that the person selected.
const message = (level: 'info' | 'warning' | 'error') => async (text: string, ...rest: any[]): Promise<any> => {
  const isOptions = (v: any) => v && typeof v === 'object' && !('title' in v);
  const items = isOptions(rest[0]) ? rest.slice(1) : rest;
  if (items.length === 0) {
    host.notify(level, text);
    return undefined;
  }
  const labels = items.map((i) => (typeof i === 'string' ? i : String(i.title)));
  const answer = await host.ask(level, text, labels);
  const index = answer === undefined ? -1 : labels.indexOf(answer);
  return index < 0 ? undefined : items[index];
};

export const window = namespace('window', {
  createOutputChannel: (name: string) => outputChannel(name),
  registerCustomEditorProvider(viewType: string, provider: any, options: any): Disposable {
    registry.customEditors.set(viewType, { viewType, provider, options });
    return new Disposable(() => registry.customEditors.delete(viewType));
  },
  createTreeView(id: string, options: any): TreeView<any> {
    const view = new TreeView<any>(id, options);
    registry.treeViews.set(id, view);
    return view;
  },
  createStatusBarItem(alignment: number = StatusBarAlignment.Left, priority = 0): StatusBarItem {
    const item = new StatusBarItem(alignment, priority, registry.statusBarItems.length);
    registry.statusBarItems.push(item);
    return item;
  },
  showInformationMessage: message('info'),
  showWarningMessage: message('warning'),
  showErrorMessage: message('error'),
  // Orca has no input prompt, quick pick, or file dialog for a plugin. `undefined` is the
  // answer that VS Code gives when the person cancels.
  async showInputBox(options?: { prompt?: string }): Promise<undefined> {
    host.notify('warning', `This command needs an input box, which Orca does not have${options?.prompt ? `: "${options.prompt}"` : ''}.`);
    return undefined;
  },
  async showQuickPick(): Promise<undefined> { unsupported('window.showQuickPick'); return undefined; },
  async showOpenDialog(): Promise<undefined> { unsupported('window.showOpenDialog'); return undefined; },
  async showSaveDialog(): Promise<undefined> { unsupported('window.showSaveDialog'); return undefined; },
  createQuickPick<T>(): QuickPick<T> { return new QuickPick<T>(); },
  async withProgress<R>(_options: unknown, task: (progress: { report(v: unknown): void }, token: unknown) => Thenable<R>): Promise<R> {
    return task({ report: () => undefined }, new CancellationTokenSource().token);
  },
  activeTextEditor: undefined,
  activeColorTheme: { kind: 2 },
  onDidChangeActiveColorTheme: new EventEmitter<any>().event,
  tabGroups: { all: [], activeTabGroup: { tabs: [] }, onDidChangeTabs: new EventEmitter<any>().event, close: async () => true },
});

export const workspace = namespace('workspace', {
  getConfiguration,
  onDidChangeConfiguration: configurationEmitter.event,
  workspaceFolders: undefined,
  fs: {
    readFile: async (uri: Uri): Promise<Uint8Array> => fs.promises.readFile(uri.fsPath),
    writeFile: async (uri: Uri, content: Uint8Array): Promise<void> => fs.promises.writeFile(uri.fsPath, content),
    stat: async (uri: Uri) => {
      const s = await fs.promises.stat(uri.fsPath);
      return { type: s.isDirectory() ? FileType.Directory : FileType.File, size: s.size, ctime: s.ctimeMs, mtime: s.mtimeMs };
    },
    delete: async (uri: Uri): Promise<void> => fs.promises.rm(uri.fsPath, { recursive: true, force: true }),
  },
  createFileSystemWatcher(pattern: unknown) {
    const change = new EventEmitter<Uri>();
    const create = new EventEmitter<Uri>();
    const del = new EventEmitter<Uri>();
    let stop = () => undefined as void;
    const p = pattern as RelativePattern;
    // vaporview watches one file: RelativePattern(folder, file name).
    const base = (p.base as Uri)?.fsPath ?? String(p.base ?? '');
    const file = nodePath.join(base, p.pattern ?? '');
    let timer: NodeJS.Timeout | undefined;
    const changed = () => {
      clearTimeout(timer);
      timer = setTimeout(() => change.fire(Uri.file(file)), 100);
    };
    try {
      const watcher = fs.watch(file, changed);
      watcher.on('error', () => undefined);
      stop = () => watcher.close();
    } catch {
      // Some file systems give no change events (for example a WSL folder seen from Windows).
      // Then the adapter reads the change time of the file one time each second.
      fs.watchFile(file, { interval: 1000 }, (now, before) => { if (now.mtimeMs !== before.mtimeMs || now.size !== before.size) { changed(); } });
      stop = () => fs.unwatchFile(file);
    }
    return {
      onDidChange: change.event, onDidCreate: create.event, onDidDelete: del.event,
      dispose: () => { stop(); clearTimeout(timer); change.dispose(); create.dispose(); del.dispose(); },
    };
  },
  async save(): Promise<undefined> { unsupported('workspace.save'); return undefined; },
});

export const env = namespace('env', {
  clipboard: {
    writeText: async (text: string): Promise<void> => host.clipboardWrite(text),
    readText: async (): Promise<string> => '',
  },
  appName: 'Orca',
  uiKind: UIKind.Desktop,
  language: 'en',
  remoteName: undefined,
  async openExternal(): Promise<boolean> { unsupported('env.openExternal'); return false; },
});

export const extensions = namespace('extensions', {
  getExtension(_id: string) {
    return { id: _id, packageJSON: extensionPackageJson(), extensionUri: Uri.file(host.extensionPath), extensionPath: host.extensionPath, isActive: true, exports: undefined };
  },
  all: [],
});

export const languages = namespace('languages', {});
export const lm = namespace('lm', {});
export const debug = namespace('debug', {});
export const tasks = namespace('tasks', {});
export const l10n = { t: (message: string) => message };

/** The `ExtensionContext` that the host gives to `activate()`. */
export function createExtensionContext(): any {
  const memento = () => {
    const store = new Map<string, unknown>();
    return {
      get: (key: string, defaultValue?: unknown) => (store.has(key) ? store.get(key) : defaultValue),
      update: async (key: string, value: unknown) => { store.set(key, value); },
      keys: () => [...store.keys()],
      setKeysForSync: () => undefined,
    };
  };
  return {
    subscriptions: [] as { dispose(): any }[],
    extensionUri: Uri.file(host.extensionPath),
    extensionPath: host.extensionPath,
    globalState: memento(),
    workspaceState: memento(),
    extensionMode: ExtensionMode.Production,
    extension: extensions.getExtension('Lramseyer.vaporview'),
    asAbsolutePath: (rel: string) => nodePath.join(host.extensionPath, rel),
  };
}
