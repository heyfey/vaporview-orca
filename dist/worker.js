import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/adapter/vscode.ts
var vscode_exports = {};
__export(vscode_exports, {
  CancellationTokenSource: () => CancellationTokenSource,
  ConfigurationTarget: () => ConfigurationTarget,
  DataTransfer: () => DataTransfer,
  DataTransferItem: () => DataTransferItem,
  Disposable: () => Disposable,
  EventEmitter: () => EventEmitter,
  ExtensionMode: () => ExtensionMode,
  FileType: () => FileType,
  MarkdownString: () => MarkdownString,
  ProgressLocation: () => ProgressLocation,
  QuickPick: () => QuickPick,
  QuickPickItemKind: () => QuickPickItemKind,
  RelativePattern: () => RelativePattern,
  StatusBarAlignment: () => StatusBarAlignment,
  StatusBarItem: () => StatusBarItem,
  ThemeColor: () => ThemeColor,
  ThemeIcon: () => ThemeIcon,
  TreeItem: () => TreeItem,
  TreeItemCheckboxState: () => TreeItemCheckboxState,
  TreeItemCollapsibleState: () => TreeItemCollapsibleState,
  TreeView: () => TreeView,
  UIKind: () => UIKind,
  Uri: () => Uri,
  ViewColumn: () => ViewColumn,
  WebviewPanel: () => WebviewPanel,
  commands: () => commands,
  createExtensionContext: () => createExtensionContext,
  debug: () => debug,
  env: () => env,
  extensions: () => extensions,
  fireConfigurationChanged: () => fireConfigurationChanged,
  l10n: () => l10n,
  languages: () => languages,
  lm: () => lm,
  onDidChangeContextKey: () => onDidChangeContextKey,
  registry: () => registry,
  setAdapterHost: () => setAdapterHost,
  tasks: () => tasks,
  window: () => window,
  workspace: () => workspace
});
import * as fs from "node:fs";
import * as nodePath from "node:path";
function setAdapterHost(h) {
  host = { ...noHost, ...h };
}
function unsupported(name) {
  if (warned.has(name)) {
    return;
  }
  warned.add(name);
  host.log(`[adapter] vscode.${name} is not supported in Orca`);
}
function namespace(name, impl) {
  return new Proxy(impl, {
    get(target, prop) {
      if (prop in target || typeof prop === "symbol") {
        return target[prop];
      }
      return (..._args) => {
        unsupported(`${name}.${String(prop)}`);
        return new Disposable(() => void 0);
      };
    }
  });
}
function extensionPackageJson() {
  if (!packageJsonCache) {
    try {
      packageJsonCache = JSON.parse(fs.readFileSync(nodePath.join(host.extensionPath, "package.json"), "utf8"));
    } catch {
      packageJsonCache = {};
    }
  }
  return packageJsonCache;
}
function settingDefaults() {
  if (!defaultsCache) {
    defaultsCache = /* @__PURE__ */ new Map();
    const c = extensionPackageJson().contributes?.configuration;
    for (const group of Array.isArray(c) ? c : c ? [c] : []) {
      for (const [key, def] of Object.entries(group.properties ?? {})) {
        defaultsCache.set(key, def.default);
      }
    }
  }
  return defaultsCache;
}
function fireConfigurationChanged(keys) {
  configurationEmitter.fire({
    affectsConfiguration: (section) => keys.some((k) => k === section || k.startsWith(section + "."))
  });
}
function getConfiguration(section) {
  const full = (key) => section ? `${section}.${key}` : key;
  const read = (key) => {
    const v = host.getSetting(full(key));
    return v !== void 0 ? v : settingDefaults().get(full(key));
  };
  return {
    get: (key, defaultValue) => {
      const v = read(key);
      return v !== void 0 ? v : defaultValue;
    },
    has: (key) => read(key) !== void 0,
    inspect: (key) => ({ key: full(key), defaultValue: settingDefaults().get(full(key)), globalValue: host.getSetting(full(key)) }),
    update: async (key, value) => {
      host.setSetting(full(key), value);
      fireConfigurationChanged([full(key)]);
    }
  };
}
function outputChannel(name) {
  const line = (level) => (message2, ...rest) => host.log(`[${name}]${level} ${message2}${rest.length ? " " + rest.map(String).join(" ") : ""}`);
  return {
    name,
    append: line(""),
    appendLine: line(""),
    trace: line(" trace:"),
    debug: line(" debug:"),
    info: line(""),
    warn: line(" warn:"),
    error: line(" error:"),
    replace: () => void 0,
    clear: () => void 0,
    show: () => void 0,
    hide: () => void 0,
    dispose: () => void 0,
    logLevel: 3,
    onDidChangeLogLevel: new EventEmitter().event
  };
}
function createExtensionContext() {
  const memento = () => {
    const store = /* @__PURE__ */ new Map();
    return {
      get: (key, defaultValue) => store.has(key) ? store.get(key) : defaultValue,
      update: async (key, value) => {
        store.set(key, value);
      },
      keys: () => [...store.keys()],
      setKeysForSync: () => void 0
    };
  };
  return {
    subscriptions: [],
    extensionUri: Uri.file(host.extensionPath),
    extensionPath: host.extensionPath,
    globalState: memento(),
    workspaceState: memento(),
    extensionMode: ExtensionMode.Production,
    extension: extensions.getExtension("Lramseyer.vaporview"),
    asAbsolutePath: (rel) => nodePath.join(host.extensionPath, rel)
  };
}
var noHost, host, registry, onDidChangeContextKey, warned, Disposable, EventEmitter, CancellationTokenSource, encodeSegment, Uri, ThemeColor, ThemeIcon, TreeItemCollapsibleState, TreeItemCheckboxState, StatusBarAlignment, ProgressLocation, ConfigurationTarget, ViewColumn, QuickPickItemKind, FileType, ExtensionMode, UIKind, TreeItem, RelativePattern, DataTransferItem, DataTransfer, MarkdownString, StatusBarItem, QuickPick, TreeView, WebviewPanel, packageJsonCache, defaultsCache, configurationEmitter, commands, message, window, workspace, env, extensions, languages, lm, debug, tasks, l10n;
var init_vscode = __esm({
  "src/adapter/vscode.ts"() {
    noHost = {
      extensionPath: "",
      log: (m) => console.log(m),
      notify: (level, m) => console.log(`[${level}] ${m}`),
      ask: async () => void 0,
      executeHostCommand: () => void 0,
      getSetting: () => void 0,
      setSetting: () => void 0,
      statusBarChanged: () => void 0,
      clipboardWrite: () => void 0,
      quickPickChanged: () => void 0
    };
    host = noHost;
    registry = {
      customEditors: /* @__PURE__ */ new Map(),
      treeViews: /* @__PURE__ */ new Map(),
      commands: /* @__PURE__ */ new Map(),
      contextKeys: /* @__PURE__ */ new Map(),
      statusBarItems: []
    };
    onDidChangeContextKey = new class {
      listeners = /* @__PURE__ */ new Set();
    }();
    warned = /* @__PURE__ */ new Set();
    Disposable = class _Disposable {
      constructor(callOnDispose) {
        this.callOnDispose = callOnDispose;
      }
      static from(...items) {
        return new _Disposable(() => items.forEach((i) => i.dispose()));
      }
      dispose() {
        return this.callOnDispose();
      }
    };
    EventEmitter = class {
      listeners = /* @__PURE__ */ new Set();
      event = (listener, thisArg, disposables) => {
        const fn = thisArg ? listener.bind(thisArg) : listener;
        this.listeners.add(fn);
        const d = new Disposable(() => this.listeners.delete(fn));
        if (Array.isArray(disposables)) {
          disposables.push(d);
        }
        return d;
      };
      fire(e) {
        for (const l of [...this.listeners]) {
          try {
            l(e);
          } catch (err) {
            host.log(`[adapter] event listener failed: ${err?.stack ?? err}`);
          }
        }
      }
      dispose() {
        this.listeners.clear();
      }
    };
    CancellationTokenSource = class {
      emitter = new EventEmitter();
      token = { isCancellationRequested: false, onCancellationRequested: this.emitter.event };
      cancel() {
        this.token.isCancellationRequested = true;
        this.emitter.fire();
      }
      dispose() {
        this.emitter.dispose();
      }
    };
    encodeSegment = (s) => encodeURIComponent(s);
    Uri = class _Uri {
      constructor(scheme, authority, path6, query, fragment) {
        this.scheme = scheme;
        this.authority = authority;
        this.path = path6;
        this.query = query;
        this.fragment = fragment;
      }
      static file(p) {
        let authority = "";
        p = p.replace(/\\/g, "/");
        if (p.startsWith("//")) {
          const i = p.indexOf("/", 2);
          authority = i < 0 ? p.slice(2) : p.slice(2, i);
          p = i < 0 ? "/" : p.slice(i);
        }
        if (!p.startsWith("/")) {
          p = "/" + p;
        }
        return new _Uri("file", authority, p, "", "");
      }
      static parse(value) {
        const m = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/.exec(value);
        if (!m) {
          return new _Uri("file", "", value, "", "");
        }
        return new _Uri(
          m[2] || "file",
          decodeURIComponent(m[4] || ""),
          decodeURIComponent(m[5] || ""),
          decodeURIComponent(m[7] || ""),
          decodeURIComponent(m[9] || "")
        );
      }
      static joinPath(base, ...segments) {
        return new _Uri(base.scheme, base.authority, nodePath.posix.join(base.path, ...segments), base.query, base.fragment);
      }
      static from(c) {
        return new _Uri(c.scheme, c.authority ?? "", c.path ?? "", c.query ?? "", c.fragment ?? "");
      }
      with(change) {
        return new _Uri(
          change.scheme ?? this.scheme,
          change.authority ?? this.authority,
          change.path ?? this.path,
          change.query ?? this.query,
          change.fragment ?? this.fragment
        );
      }
      get fsPath() {
        let value;
        if (this.authority && this.path.length > 1 && this.scheme === "file") {
          value = `//${this.authority}${this.path}`;
        } else if (/^\/[A-Za-z]:/.test(this.path)) {
          value = this.path[1].toLowerCase() + this.path.slice(2);
        } else {
          value = this.path;
        }
        return process.platform === "win32" ? value.replace(/\//g, "\\") : value;
      }
      toString() {
        const path6 = this.path.split("/").map(encodeSegment).join("/");
        let out = `${this.scheme}://${encodeSegment(this.authority)}${path6}`;
        if (this.query) {
          out += "?" + encodeSegment(this.query);
        }
        if (this.fragment) {
          out += "#" + encodeSegment(this.fragment);
        }
        return out;
      }
      toJSON() {
        return { scheme: this.scheme, authority: this.authority, path: this.path, query: this.query, fragment: this.fragment, fsPath: this.fsPath };
      }
    };
    ThemeColor = class {
      constructor(id) {
        this.id = id;
      }
    };
    ThemeIcon = class _ThemeIcon {
      constructor(id, color) {
        this.id = id;
        this.color = color;
      }
      static File = new _ThemeIcon("file");
      static Folder = new _ThemeIcon("folder");
    };
    TreeItemCollapsibleState = { None: 0, Collapsed: 1, Expanded: 2 };
    TreeItemCheckboxState = { Unchecked: 0, Checked: 1 };
    StatusBarAlignment = { Left: 1, Right: 2 };
    ProgressLocation = { SourceControl: 1, Window: 10, Notification: 15 };
    ConfigurationTarget = { Global: 1, Workspace: 2, WorkspaceFolder: 3 };
    ViewColumn = { Active: -1, Beside: -2, One: 1, Two: 2, Three: 3 };
    QuickPickItemKind = { Separator: -1, Default: 0 };
    FileType = { Unknown: 0, File: 1, Directory: 2, SymbolicLink: 64 };
    ExtensionMode = { Production: 1, Development: 2, Test: 3 };
    UIKind = { Desktop: 1, Web: 2 };
    TreeItem = class {
      constructor(label, collapsibleState = TreeItemCollapsibleState.None) {
        this.collapsibleState = collapsibleState;
        if (label instanceof Uri) {
          this.resourceUri = label;
        } else {
          this.label = label;
        }
      }
      label;
      id;
      description;
      tooltip;
      iconPath;
      contextValue;
      command;
      checkboxState;
      resourceUri;
    };
    RelativePattern = class {
      constructor(base, pattern) {
        this.base = base;
        this.pattern = pattern;
      }
    };
    DataTransferItem = class {
      constructor(value) {
        this.value = value;
      }
      async asString() {
        return typeof this.value === "string" ? this.value : JSON.stringify(this.value);
      }
      asFile() {
        return void 0;
      }
    };
    DataTransfer = class {
      items = /* @__PURE__ */ new Map();
      get(mime) {
        return this.items.get(mime);
      }
      set(mime, item) {
        this.items.set(mime, item);
      }
      forEach(cb) {
        this.items.forEach(cb);
      }
    };
    MarkdownString = class {
      constructor(value = "") {
        this.value = value;
      }
      appendMarkdown(v) {
        this.value += v;
        return this;
      }
      appendText(v) {
        this.value += v;
        return this;
      }
      appendCodeblock(v) {
        this.value += "\n" + v + "\n";
        return this;
      }
    };
    StatusBarItem = class {
      constructor(alignment, priority, index) {
        this.alignment = alignment;
        this.priority = priority;
        this.index = index;
      }
      _text = "";
      tooltip;
      command;
      visible = false;
      get text() {
        return this._text;
      }
      set text(v) {
        this._text = v;
        host.statusBarChanged(this);
      }
      show() {
        this.visible = true;
        host.statusBarChanged(this);
      }
      hide() {
        this.visible = false;
        host.statusBarChanged(this);
      }
      dispose() {
        this.hide();
      }
    };
    QuickPick = class {
      _value = "";
      _items = [];
      _title;
      _placeholder;
      _busy = false;
      visible = false;
      selectedItems = [];
      activeItems = [];
      matchOnDescription = false;
      matchOnDetail = false;
      valueEmitter = new EventEmitter();
      acceptEmitter = new EventEmitter();
      hideEmitter = new EventEmitter();
      onDidChangeValue = this.valueEmitter.event;
      onDidAccept = this.acceptEmitter.event;
      onDidHide = this.hideEmitter.event;
      onDidChangeSelection = new EventEmitter().event;
      onDidChangeActive = new EventEmitter().event;
      onDidTriggerButton = new EventEmitter().event;
      get value() {
        return this._value;
      }
      set value(v) {
        if (v === this._value) {
          return;
        }
        this._value = v;
        host.quickPickChanged(this);
        this.valueEmitter.fire(v);
      }
      get items() {
        return this._items;
      }
      set items(v) {
        this._items = v;
        host.quickPickChanged(this);
      }
      get title() {
        return this._title;
      }
      set title(v) {
        this._title = v;
        host.quickPickChanged(this);
      }
      get placeholder() {
        return this._placeholder;
      }
      set placeholder(v) {
        this._placeholder = v;
        host.quickPickChanged(this);
      }
      get busy() {
        return this._busy;
      }
      set busy(v) {
        this._busy = v;
        host.quickPickChanged(this);
      }
      show() {
        this.visible = true;
        host.quickPickChanged(this);
      }
      hide() {
        if (!this.visible) {
          return;
        }
        this.visible = false;
        host.quickPickChanged(this);
        this.hideEmitter.fire();
      }
      dispose() {
        this.hide();
      }
      /** The host calls this when the person types in the field. */
      userInput(value) {
        if (value === this._value) {
          return;
        }
        this._value = value;
        this.valueEmitter.fire(value);
      }
      /** The host calls this when the person selects a result. */
      userAccept(index) {
        const item = this._items[index];
        if (item === void 0) {
          return;
        }
        this.selectedItems = [item];
        this.activeItems = [item];
        this.acceptEmitter.fire();
      }
    };
    TreeView = class {
      constructor(id, options) {
        this.id = id;
        this.options = options;
      }
      selection = [];
      visible = true;
      title;
      description;
      message;
      badge;
      expandEmitter = new EventEmitter();
      collapseEmitter = new EventEmitter();
      selectionEmitter = new EventEmitter();
      visibilityEmitter = new EventEmitter();
      checkboxEmitter = new EventEmitter();
      /** The host shows the element in the panel. */
      revealEmitter = new EventEmitter();
      onDidExpandElement = this.expandEmitter.event;
      onDidCollapseElement = this.collapseEmitter.event;
      onDidChangeSelection = this.selectionEmitter.event;
      onDidChangeVisibility = this.visibilityEmitter.event;
      onDidChangeCheckboxState = this.checkboxEmitter.event;
      async reveal(element, options) {
        this.revealEmitter.fire({ element, options });
      }
      dispose() {
      }
    };
    WebviewPanel = class {
      /**
       * @param post sends one message to the frame that shows this panel
       * @param revealPanel shows the tab of this panel
       */
      constructor(viewType, post, revealPanel = () => void 0) {
        this.viewType = viewType;
        this.revealPanel = revealPanel;
        this.webview = {
          html: "",
          options: {},
          cspSource: "'self'",
          asWebviewUri: (uri) => uri,
          postMessage: async (message2) => {
            post(message2);
            return true;
          },
          onDidReceiveMessage: this.receiveEmitter.event
        };
      }
      active = true;
      visible = true;
      viewColumn = ViewColumn.One;
      title = "";
      options = {};
      receiveEmitter = new EventEmitter();
      viewStateEmitter = new EventEmitter();
      disposeEmitter = new EventEmitter();
      onDidChangeViewState = this.viewStateEmitter.event;
      onDidDispose = this.disposeEmitter.event;
      webview;
      reveal() {
        this.revealPanel();
      }
      /** The host calls this when the tab shows or hides. */
      setViewState(active, visible) {
        if (this.active === active && this.visible === visible) {
          return;
        }
        this.active = active;
        this.visible = visible;
        this.viewStateEmitter.fire({ webviewPanel: this });
      }
      /** The host calls this to make the panel the active one. It always tells the extension. */
      activate() {
        this.active = true;
        this.visible = true;
        this.viewStateEmitter.fire({ webviewPanel: this });
      }
      dispose() {
        this.disposeEmitter.fire();
        this.receiveEmitter.dispose();
        this.viewStateEmitter.dispose();
        this.disposeEmitter.dispose();
      }
    };
    configurationEmitter = new EventEmitter();
    commands = namespace("commands", {
      registerCommand(id, callback, thisArg) {
        registry.commands.set(id, thisArg ? callback.bind(thisArg) : callback);
        return new Disposable(() => registry.commands.delete(id));
      },
      async executeCommand(id, ...args) {
        if (id === "setContext") {
          registry.contextKeys.set(args[0], args[1]);
          onDidChangeContextKey.listeners.forEach((l) => l(args[0], args[1]));
          return void 0;
        }
        const fn = registry.commands.get(id);
        if (fn) {
          return fn(...args);
        }
        return host.executeHostCommand(id, args);
      },
      async getCommands() {
        return [...registry.commands.keys()];
      }
    });
    message = (level) => async (text, ...rest) => {
      const isOptions = (v) => v && typeof v === "object" && !("title" in v);
      const items = isOptions(rest[0]) ? rest.slice(1) : rest;
      if (items.length === 0) {
        host.notify(level, text);
        return void 0;
      }
      const labels = items.map((i) => typeof i === "string" ? i : String(i.title));
      const answer = await host.ask(level, text, labels);
      const index = answer === void 0 ? -1 : labels.indexOf(answer);
      return index < 0 ? void 0 : items[index];
    };
    window = namespace("window", {
      createOutputChannel: (name) => outputChannel(name),
      registerCustomEditorProvider(viewType, provider, options) {
        registry.customEditors.set(viewType, { viewType, provider, options });
        return new Disposable(() => registry.customEditors.delete(viewType));
      },
      createTreeView(id, options) {
        const view = new TreeView(id, options);
        registry.treeViews.set(id, view);
        return view;
      },
      createStatusBarItem(alignment = StatusBarAlignment.Left, priority = 0) {
        const item = new StatusBarItem(alignment, priority, registry.statusBarItems.length);
        registry.statusBarItems.push(item);
        return item;
      },
      showInformationMessage: message("info"),
      showWarningMessage: message("warning"),
      showErrorMessage: message("error"),
      // Orca has no input prompt, quick pick, or file dialog for a plugin. `undefined` is the
      // answer that VS Code gives when the person cancels.
      async showInputBox(options) {
        host.notify("warning", `This command needs an input box, which Orca does not have${options?.prompt ? `: "${options.prompt}"` : ""}.`);
        return void 0;
      },
      async showQuickPick() {
        unsupported("window.showQuickPick");
        return void 0;
      },
      async showOpenDialog() {
        unsupported("window.showOpenDialog");
        return void 0;
      },
      async showSaveDialog() {
        unsupported("window.showSaveDialog");
        return void 0;
      },
      createQuickPick() {
        return new QuickPick();
      },
      async withProgress(_options, task) {
        return task({ report: () => void 0 }, new CancellationTokenSource().token);
      },
      activeTextEditor: void 0,
      activeColorTheme: { kind: 2 },
      onDidChangeActiveColorTheme: new EventEmitter().event,
      tabGroups: { all: [], activeTabGroup: { tabs: [] }, onDidChangeTabs: new EventEmitter().event, close: async () => true }
    });
    workspace = namespace("workspace", {
      getConfiguration,
      onDidChangeConfiguration: configurationEmitter.event,
      workspaceFolders: void 0,
      fs: {
        readFile: async (uri) => fs.promises.readFile(uri.fsPath),
        writeFile: async (uri, content) => fs.promises.writeFile(uri.fsPath, content),
        stat: async (uri) => {
          const s = await fs.promises.stat(uri.fsPath);
          return { type: s.isDirectory() ? FileType.Directory : FileType.File, size: s.size, ctime: s.ctimeMs, mtime: s.mtimeMs };
        },
        delete: async (uri) => fs.promises.rm(uri.fsPath, { recursive: true, force: true })
      },
      createFileSystemWatcher(pattern) {
        const change = new EventEmitter();
        const create = new EventEmitter();
        const del = new EventEmitter();
        let stop = () => void 0;
        const p = pattern;
        const base = p.base?.fsPath ?? String(p.base ?? "");
        const file = nodePath.join(base, p.pattern ?? "");
        let timer;
        const changed = () => {
          clearTimeout(timer);
          timer = setTimeout(() => change.fire(Uri.file(file)), 100);
        };
        try {
          const watcher = fs.watch(file, changed);
          watcher.on("error", () => void 0);
          stop = () => watcher.close();
        } catch {
          fs.watchFile(file, { interval: 1e3 }, (now, before) => {
            if (now.mtimeMs !== before.mtimeMs || now.size !== before.size) {
              changed();
            }
          });
          stop = () => fs.unwatchFile(file);
        }
        return {
          onDidChange: change.event,
          onDidCreate: create.event,
          onDidDelete: del.event,
          dispose: () => {
            stop();
            clearTimeout(timer);
            change.dispose();
            create.dispose();
            del.dispose();
          }
        };
      },
      async save() {
        unsupported("workspace.save");
        return void 0;
      }
    });
    env = namespace("env", {
      clipboard: {
        writeText: async (text) => host.clipboardWrite(text),
        readText: async () => ""
      },
      appName: "Orca",
      uiKind: UIKind.Desktop,
      language: "en",
      remoteName: void 0,
      async openExternal() {
        unsupported("env.openExternal");
        return false;
      }
    });
    extensions = namespace("extensions", {
      getExtension(_id) {
        return { id: _id, packageJSON: extensionPackageJson(), extensionUri: Uri.file(host.extensionPath), extensionPath: host.extensionPath, isActive: true, exports: void 0 };
      },
      all: []
    });
    languages = namespace("languages", {});
    lm = namespace("lm", {});
    debug = namespace("debug", {});
    tasks = namespace("tasks", {});
    l10n = { t: (message2) => message2 };
  }
});

// vaporview/node_modules/@vscode/wasm-component-model/lib/common/ral.js
var require_ral = __commonJS({
  "vaporview/node_modules/@vscode/wasm-component-model/lib/common/ral.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _ral;
    function RAL() {
      if (_ral === void 0) {
        throw new Error(`No runtime abstraction layer installed`);
      }
      return _ral;
    }
    (function(RAL2) {
      function install(ral) {
        if (ral === void 0) {
          throw new Error(`No runtime abstraction layer provided`);
        }
        _ral = ral;
      }
      RAL2.install = install;
      function isInstalled() {
        return _ral !== void 0;
      }
      RAL2.isInstalled = isInstalled;
    })(RAL || (RAL = {}));
    exports.default = RAL;
  }
});

// vaporview/node_modules/uuid/dist/cjs/max.js
var require_max = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/max.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  }
});

// vaporview/node_modules/uuid/dist/cjs/nil.js
var require_nil = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/nil.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = "00000000-0000-0000-0000-000000000000";
  }
});

// vaporview/node_modules/uuid/dist/cjs/regex.js
var require_regex = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/regex.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
  }
});

// vaporview/node_modules/uuid/dist/cjs/validate.js
var require_validate = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/validate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var regex_js_1 = require_regex();
    function validate(uuid) {
      return typeof uuid === "string" && regex_js_1.default.test(uuid);
    }
    exports.default = validate;
  }
});

// vaporview/node_modules/uuid/dist/cjs/parse.js
var require_parse = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/parse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var validate_js_1 = require_validate();
    function parse3(uuid) {
      if (!(0, validate_js_1.default)(uuid)) {
        throw TypeError("Invalid UUID");
      }
      let v;
      return Uint8Array.of((v = parseInt(uuid.slice(0, 8), 16)) >>> 24, v >>> 16 & 255, v >>> 8 & 255, v & 255, (v = parseInt(uuid.slice(9, 13), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(14, 18), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(19, 23), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255, v / 4294967296 & 255, v >>> 24 & 255, v >>> 16 & 255, v >>> 8 & 255, v & 255);
    }
    exports.default = parse3;
  }
});

// vaporview/node_modules/uuid/dist/cjs/stringify.js
var require_stringify = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/stringify.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.unsafeStringify = void 0;
    var validate_js_1 = require_validate();
    var byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).slice(1));
    }
    function unsafeStringify(arr, offset = 0) {
      return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
    }
    exports.unsafeStringify = unsafeStringify;
    function stringify(arr, offset = 0) {
      const uuid = unsafeStringify(arr, offset);
      if (!(0, validate_js_1.default)(uuid)) {
        throw TypeError("Stringified UUID is invalid");
      }
      return uuid;
    }
    exports.default = stringify;
  }
});

// vaporview/node_modules/uuid/dist/cjs/rng.js
var require_rng = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/rng.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var crypto_1 = __require("crypto");
    var rnds8Pool = new Uint8Array(256);
    var poolPtr = rnds8Pool.length;
    function rng() {
      if (poolPtr > rnds8Pool.length - 16) {
        (0, crypto_1.randomFillSync)(rnds8Pool);
        poolPtr = 0;
      }
      return rnds8Pool.slice(poolPtr, poolPtr += 16);
    }
    exports.default = rng;
  }
});

// vaporview/node_modules/uuid/dist/cjs/v1.js
var require_v1 = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/v1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.updateV1State = void 0;
    var rng_js_1 = require_rng();
    var stringify_js_1 = require_stringify();
    var _state = {};
    function v1(options, buf, offset) {
      let bytes;
      const isV6 = options?._v6 ?? false;
      if (options) {
        const optionsKeys = Object.keys(options);
        if (optionsKeys.length === 1 && optionsKeys[0] === "_v6") {
          options = void 0;
        }
      }
      if (options) {
        bytes = v1Bytes(options.random ?? options.rng?.() ?? (0, rng_js_1.default)(), options.msecs, options.nsecs, options.clockseq, options.node, buf, offset);
      } else {
        const now = Date.now();
        const rnds = (0, rng_js_1.default)();
        updateV1State(_state, now, rnds);
        bytes = v1Bytes(rnds, _state.msecs, _state.nsecs, isV6 ? void 0 : _state.clockseq, isV6 ? void 0 : _state.node, buf, offset);
      }
      return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
    }
    function updateV1State(state, now, rnds) {
      state.msecs ??= -Infinity;
      state.nsecs ??= 0;
      if (now === state.msecs) {
        state.nsecs++;
        if (state.nsecs >= 1e4) {
          state.node = void 0;
          state.nsecs = 0;
        }
      } else if (now > state.msecs) {
        state.nsecs = 0;
      } else if (now < state.msecs) {
        state.node = void 0;
      }
      if (!state.node) {
        state.node = rnds.slice(10, 16);
        state.node[0] |= 1;
        state.clockseq = (rnds[8] << 8 | rnds[9]) & 16383;
      }
      state.msecs = now;
      return state;
    }
    exports.updateV1State = updateV1State;
    function v1Bytes(rnds, msecs, nsecs, clockseq, node, buf, offset = 0) {
      if (rnds.length < 16) {
        throw new Error("Random bytes length must be >= 16");
      }
      if (!buf) {
        buf = new Uint8Array(16);
        offset = 0;
      } else {
        if (offset < 0 || offset + 16 > buf.length) {
          throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
      }
      msecs ??= Date.now();
      nsecs ??= 0;
      clockseq ??= (rnds[8] << 8 | rnds[9]) & 16383;
      node ??= rnds.slice(10, 16);
      msecs += 122192928e5;
      const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
      buf[offset++] = tl >>> 24 & 255;
      buf[offset++] = tl >>> 16 & 255;
      buf[offset++] = tl >>> 8 & 255;
      buf[offset++] = tl & 255;
      const tmh = msecs / 4294967296 * 1e4 & 268435455;
      buf[offset++] = tmh >>> 8 & 255;
      buf[offset++] = tmh & 255;
      buf[offset++] = tmh >>> 24 & 15 | 16;
      buf[offset++] = tmh >>> 16 & 255;
      buf[offset++] = clockseq >>> 8 | 128;
      buf[offset++] = clockseq & 255;
      for (let n = 0; n < 6; ++n) {
        buf[offset++] = node[n];
      }
      return buf;
    }
    exports.default = v1;
  }
});

// vaporview/node_modules/uuid/dist/cjs/v1ToV6.js
var require_v1ToV6 = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/v1ToV6.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var parse_js_1 = require_parse();
    var stringify_js_1 = require_stringify();
    function v1ToV6(uuid) {
      const v1Bytes = typeof uuid === "string" ? (0, parse_js_1.default)(uuid) : uuid;
      const v6Bytes = _v1ToV6(v1Bytes);
      return typeof uuid === "string" ? (0, stringify_js_1.unsafeStringify)(v6Bytes) : v6Bytes;
    }
    exports.default = v1ToV6;
    function _v1ToV6(v1Bytes) {
      return Uint8Array.of((v1Bytes[6] & 15) << 4 | v1Bytes[7] >> 4 & 15, (v1Bytes[7] & 15) << 4 | (v1Bytes[4] & 240) >> 4, (v1Bytes[4] & 15) << 4 | (v1Bytes[5] & 240) >> 4, (v1Bytes[5] & 15) << 4 | (v1Bytes[0] & 240) >> 4, (v1Bytes[0] & 15) << 4 | (v1Bytes[1] & 240) >> 4, (v1Bytes[1] & 15) << 4 | (v1Bytes[2] & 240) >> 4, 96 | v1Bytes[2] & 15, v1Bytes[3], v1Bytes[8], v1Bytes[9], v1Bytes[10], v1Bytes[11], v1Bytes[12], v1Bytes[13], v1Bytes[14], v1Bytes[15]);
    }
  }
});

// vaporview/node_modules/uuid/dist/cjs/md5.js
var require_md5 = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/md5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var crypto_1 = __require("crypto");
    function md5(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === "string") {
        bytes = Buffer.from(bytes, "utf8");
      }
      return (0, crypto_1.createHash)("md5").update(bytes).digest();
    }
    exports.default = md5;
  }
});

// vaporview/node_modules/uuid/dist/cjs/v35.js
var require_v35 = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/v35.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.URL = exports.DNS = exports.stringToBytes = void 0;
    var parse_js_1 = require_parse();
    var stringify_js_1 = require_stringify();
    function stringToBytes(str) {
      str = unescape(encodeURIComponent(str));
      const bytes = new Uint8Array(str.length);
      for (let i = 0; i < str.length; ++i) {
        bytes[i] = str.charCodeAt(i);
      }
      return bytes;
    }
    exports.stringToBytes = stringToBytes;
    exports.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    exports.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    function v35(version, hash, value, namespace2, buf, offset) {
      const valueBytes = typeof value === "string" ? stringToBytes(value) : value;
      const namespaceBytes = typeof namespace2 === "string" ? (0, parse_js_1.default)(namespace2) : namespace2;
      if (typeof namespace2 === "string") {
        namespace2 = (0, parse_js_1.default)(namespace2);
      }
      if (namespace2?.length !== 16) {
        throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
      }
      let bytes = new Uint8Array(16 + valueBytes.length);
      bytes.set(namespaceBytes);
      bytes.set(valueBytes, namespaceBytes.length);
      bytes = hash(bytes);
      bytes[6] = bytes[6] & 15 | version;
      bytes[8] = bytes[8] & 63 | 128;
      if (buf) {
        offset = offset || 0;
        for (let i = 0; i < 16; ++i) {
          buf[offset + i] = bytes[i];
        }
        return buf;
      }
      return (0, stringify_js_1.unsafeStringify)(bytes);
    }
    exports.default = v35;
  }
});

// vaporview/node_modules/uuid/dist/cjs/v3.js
var require_v3 = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/v3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.URL = exports.DNS = void 0;
    var md5_js_1 = require_md5();
    var v35_js_1 = require_v35();
    var v35_js_2 = require_v35();
    Object.defineProperty(exports, "DNS", { enumerable: true, get: function() {
      return v35_js_2.DNS;
    } });
    Object.defineProperty(exports, "URL", { enumerable: true, get: function() {
      return v35_js_2.URL;
    } });
    function v3(value, namespace2, buf, offset) {
      return (0, v35_js_1.default)(48, md5_js_1.default, value, namespace2, buf, offset);
    }
    v3.DNS = v35_js_1.DNS;
    v3.URL = v35_js_1.URL;
    exports.default = v3;
  }
});

// vaporview/node_modules/uuid/dist/cjs/native.js
var require_native = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/native.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var crypto_1 = __require("crypto");
    exports.default = { randomUUID: crypto_1.randomUUID };
  }
});

// vaporview/node_modules/uuid/dist/cjs/v4.js
var require_v4 = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/v4.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var native_js_1 = require_native();
    var rng_js_1 = require_rng();
    var stringify_js_1 = require_stringify();
    function v4(options, buf, offset) {
      if (native_js_1.default.randomUUID && !buf && !options) {
        return native_js_1.default.randomUUID();
      }
      options = options || {};
      const rnds = options.random ?? options.rng?.() ?? (0, rng_js_1.default)();
      if (rnds.length < 16) {
        throw new Error("Random bytes length must be >= 16");
      }
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        offset = offset || 0;
        if (offset < 0 || offset + 16 > buf.length) {
          throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
        for (let i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }
        return buf;
      }
      return (0, stringify_js_1.unsafeStringify)(rnds);
    }
    exports.default = v4;
  }
});

// vaporview/node_modules/uuid/dist/cjs/sha1.js
var require_sha1 = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/sha1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var crypto_1 = __require("crypto");
    function sha1(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === "string") {
        bytes = Buffer.from(bytes, "utf8");
      }
      return (0, crypto_1.createHash)("sha1").update(bytes).digest();
    }
    exports.default = sha1;
  }
});

// vaporview/node_modules/uuid/dist/cjs/v5.js
var require_v5 = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/v5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.URL = exports.DNS = void 0;
    var sha1_js_1 = require_sha1();
    var v35_js_1 = require_v35();
    var v35_js_2 = require_v35();
    Object.defineProperty(exports, "DNS", { enumerable: true, get: function() {
      return v35_js_2.DNS;
    } });
    Object.defineProperty(exports, "URL", { enumerable: true, get: function() {
      return v35_js_2.URL;
    } });
    function v5(value, namespace2, buf, offset) {
      return (0, v35_js_1.default)(80, sha1_js_1.default, value, namespace2, buf, offset);
    }
    v5.DNS = v35_js_1.DNS;
    v5.URL = v35_js_1.URL;
    exports.default = v5;
  }
});

// vaporview/node_modules/uuid/dist/cjs/v6.js
var require_v6 = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/v6.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var stringify_js_1 = require_stringify();
    var v1_js_1 = require_v1();
    var v1ToV6_js_1 = require_v1ToV6();
    function v6(options, buf, offset) {
      options ??= {};
      offset ??= 0;
      let bytes = (0, v1_js_1.default)({ ...options, _v6: true }, new Uint8Array(16));
      bytes = (0, v1ToV6_js_1.default)(bytes);
      if (buf) {
        for (let i = 0; i < 16; i++) {
          buf[offset + i] = bytes[i];
        }
        return buf;
      }
      return (0, stringify_js_1.unsafeStringify)(bytes);
    }
    exports.default = v6;
  }
});

// vaporview/node_modules/uuid/dist/cjs/v6ToV1.js
var require_v6ToV1 = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/v6ToV1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var parse_js_1 = require_parse();
    var stringify_js_1 = require_stringify();
    function v6ToV1(uuid) {
      const v6Bytes = typeof uuid === "string" ? (0, parse_js_1.default)(uuid) : uuid;
      const v1Bytes = _v6ToV1(v6Bytes);
      return typeof uuid === "string" ? (0, stringify_js_1.unsafeStringify)(v1Bytes) : v1Bytes;
    }
    exports.default = v6ToV1;
    function _v6ToV1(v6Bytes) {
      return Uint8Array.of((v6Bytes[3] & 15) << 4 | v6Bytes[4] >> 4 & 15, (v6Bytes[4] & 15) << 4 | (v6Bytes[5] & 240) >> 4, (v6Bytes[5] & 15) << 4 | v6Bytes[6] & 15, v6Bytes[7], (v6Bytes[1] & 15) << 4 | (v6Bytes[2] & 240) >> 4, (v6Bytes[2] & 15) << 4 | (v6Bytes[3] & 240) >> 4, 16 | (v6Bytes[0] & 240) >> 4, (v6Bytes[0] & 15) << 4 | (v6Bytes[1] & 240) >> 4, v6Bytes[8], v6Bytes[9], v6Bytes[10], v6Bytes[11], v6Bytes[12], v6Bytes[13], v6Bytes[14], v6Bytes[15]);
    }
  }
});

// vaporview/node_modules/uuid/dist/cjs/v7.js
var require_v7 = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/v7.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.updateV7State = void 0;
    var rng_js_1 = require_rng();
    var stringify_js_1 = require_stringify();
    var _state = {};
    function v7(options, buf, offset) {
      let bytes;
      if (options) {
        bytes = v7Bytes(options.random ?? options.rng?.() ?? (0, rng_js_1.default)(), options.msecs, options.seq, buf, offset);
      } else {
        const now = Date.now();
        const rnds = (0, rng_js_1.default)();
        updateV7State(_state, now, rnds);
        bytes = v7Bytes(rnds, _state.msecs, _state.seq, buf, offset);
      }
      return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
    }
    function updateV7State(state, now, rnds) {
      state.msecs ??= -Infinity;
      state.seq ??= 0;
      if (now > state.msecs) {
        state.seq = rnds[6] << 23 | rnds[7] << 16 | rnds[8] << 8 | rnds[9];
        state.msecs = now;
      } else {
        state.seq = state.seq + 1 | 0;
        if (state.seq === 0) {
          state.msecs++;
        }
      }
      return state;
    }
    exports.updateV7State = updateV7State;
    function v7Bytes(rnds, msecs, seq, buf, offset = 0) {
      if (rnds.length < 16) {
        throw new Error("Random bytes length must be >= 16");
      }
      if (!buf) {
        buf = new Uint8Array(16);
        offset = 0;
      } else {
        if (offset < 0 || offset + 16 > buf.length) {
          throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
      }
      msecs ??= Date.now();
      seq ??= rnds[6] * 127 << 24 | rnds[7] << 16 | rnds[8] << 8 | rnds[9];
      buf[offset++] = msecs / 1099511627776 & 255;
      buf[offset++] = msecs / 4294967296 & 255;
      buf[offset++] = msecs / 16777216 & 255;
      buf[offset++] = msecs / 65536 & 255;
      buf[offset++] = msecs / 256 & 255;
      buf[offset++] = msecs & 255;
      buf[offset++] = 112 | seq >>> 28 & 15;
      buf[offset++] = seq >>> 20 & 255;
      buf[offset++] = 128 | seq >>> 14 & 63;
      buf[offset++] = seq >>> 6 & 255;
      buf[offset++] = seq << 2 & 255 | rnds[10] & 3;
      buf[offset++] = rnds[11];
      buf[offset++] = rnds[12];
      buf[offset++] = rnds[13];
      buf[offset++] = rnds[14];
      buf[offset++] = rnds[15];
      return buf;
    }
    exports.default = v7;
  }
});

// vaporview/node_modules/uuid/dist/cjs/version.js
var require_version = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var validate_js_1 = require_validate();
    function version(uuid) {
      if (!(0, validate_js_1.default)(uuid)) {
        throw TypeError("Invalid UUID");
      }
      return parseInt(uuid.slice(14, 15), 16);
    }
    exports.default = version;
  }
});

// vaporview/node_modules/uuid/dist/cjs/index.js
var require_cjs = __commonJS({
  "vaporview/node_modules/uuid/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.version = exports.validate = exports.v7 = exports.v6ToV1 = exports.v6 = exports.v5 = exports.v4 = exports.v3 = exports.v1ToV6 = exports.v1 = exports.stringify = exports.parse = exports.NIL = exports.MAX = void 0;
    var max_js_1 = require_max();
    Object.defineProperty(exports, "MAX", { enumerable: true, get: function() {
      return max_js_1.default;
    } });
    var nil_js_1 = require_nil();
    Object.defineProperty(exports, "NIL", { enumerable: true, get: function() {
      return nil_js_1.default;
    } });
    var parse_js_1 = require_parse();
    Object.defineProperty(exports, "parse", { enumerable: true, get: function() {
      return parse_js_1.default;
    } });
    var stringify_js_1 = require_stringify();
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return stringify_js_1.default;
    } });
    var v1_js_1 = require_v1();
    Object.defineProperty(exports, "v1", { enumerable: true, get: function() {
      return v1_js_1.default;
    } });
    var v1ToV6_js_1 = require_v1ToV6();
    Object.defineProperty(exports, "v1ToV6", { enumerable: true, get: function() {
      return v1ToV6_js_1.default;
    } });
    var v3_js_1 = require_v3();
    Object.defineProperty(exports, "v3", { enumerable: true, get: function() {
      return v3_js_1.default;
    } });
    var v4_js_1 = require_v4();
    Object.defineProperty(exports, "v4", { enumerable: true, get: function() {
      return v4_js_1.default;
    } });
    var v5_js_1 = require_v5();
    Object.defineProperty(exports, "v5", { enumerable: true, get: function() {
      return v5_js_1.default;
    } });
    var v6_js_1 = require_v6();
    Object.defineProperty(exports, "v6", { enumerable: true, get: function() {
      return v6_js_1.default;
    } });
    var v6ToV1_js_1 = require_v6ToV1();
    Object.defineProperty(exports, "v6ToV1", { enumerable: true, get: function() {
      return v6ToV1_js_1.default;
    } });
    var v7_js_1 = require_v7();
    Object.defineProperty(exports, "v7", { enumerable: true, get: function() {
      return v7_js_1.default;
    } });
    var validate_js_1 = require_validate();
    Object.defineProperty(exports, "validate", { enumerable: true, get: function() {
      return validate_js_1.default;
    } });
    var version_js_1 = require_version();
    Object.defineProperty(exports, "version", { enumerable: true, get: function() {
      return version_js_1.default;
    } });
  }
});

// vaporview/node_modules/@vscode/wasm-component-model/lib/common/componentModel.js
var require_componentModel = __commonJS({
  "vaporview/node_modules/@vscode/wasm-component-model/lib/common/componentModel.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result2 = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result2, mod, k);
      }
      __setModuleDefault(result2, mod);
      return result2;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VariantType = exports.FlagsType = exports.tuple = exports.TupleType = exports.RecordType = exports.Float64ArrayType = exports.Float32ArrayType = exports.BigUint64ArrayType = exports.Uint32ArrayType = exports.Uint16ArrayType = exports.Uint8ArrayType = exports.BigInt64ArrayType = exports.Int32ArrayType = exports.Int16ArrayType = exports.Int8ArrayType = exports.list = exports.ListType = exports.wstring = exports.char = exports.ptr = exports.size = exports.byte = exports.float64 = exports.float32 = exports.s64 = exports.s32 = exports.s16 = exports.s8 = exports.u64 = exports.u32 = exports.u16 = exports.u8 = exports.bool = exports.ResultError = exports.ComponentModelContext = exports.ComponentModelTypeKind = exports.FlatTuple = exports.f64 = exports.f32 = exports.i64 = exports.i32 = exports.FlatTypeKind = exports.Options = exports.Memory = exports.MemoryRange = exports.ReadonlyMemoryRange = exports.BaseMemoryRange = exports.MemoryError = exports.Alignment = exports.ComponentModelTrap = void 0;
    exports.$main = exports.$exports = exports.$imports = exports.WasmContext = exports.PackageType = exports.InterfaceType = exports.OwnType = exports.BorrowType = exports.ResourceType = exports.ResourceHandleType = exports.MethodType = exports.StaticMethodType = exports.DestructorType = exports.ConstructorType = exports.FunctionType = exports.ResourceManagers = exports.ResourceManager = exports.Resource = exports.ResultType = exports.result = exports.OptionType = exports.option = exports.EnumType = void 0;
    var uuid = __importStar(require_cjs());
    var ral_1 = __importDefault(require_ral());
    var isLittleEndian = new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
    if (!isLittleEndian) {
      throw new Error("Big endian platforms are currently not supported.");
    }
    var ComponentModelTrap = class extends Error {
      constructor(message2) {
        super(message2);
      }
    };
    exports.ComponentModelTrap = ComponentModelTrap;
    var BigInts;
    (function(BigInts2) {
      const MAX_VALUE_AS_BIGINT = BigInt(Number.MAX_VALUE);
      function asNumber(value) {
        if (value > MAX_VALUE_AS_BIGINT) {
          throw new ComponentModelTrap("Value too big for number");
        }
        return Number(value);
      }
      BigInts2.asNumber = asNumber;
      function max(...args) {
        return args.reduce((m, e) => e > m ? e : m);
      }
      BigInts2.max = max;
      function min(...args) {
        return args.reduce((m, e) => e < m ? e : m);
      }
      BigInts2.min = min;
    })(BigInts || (BigInts = {}));
    var utf8Decoder = (0, ral_1.default)().TextDecoder.create("utf-8");
    var utf8Encoder = (0, ral_1.default)().TextEncoder.create("utf-8");
    var Alignment;
    (function(Alignment2) {
      Alignment2[Alignment2["byte"] = 1] = "byte";
      Alignment2[Alignment2["halfWord"] = 2] = "halfWord";
      Alignment2[Alignment2["word"] = 4] = "word";
      Alignment2[Alignment2["doubleWord"] = 8] = "doubleWord";
    })(Alignment || (exports.Alignment = Alignment = {}));
    (function(Alignment2) {
      function align2(ptr, alignment) {
        return Math.ceil(ptr / alignment) * alignment;
      }
      Alignment2.align = align2;
      function getAlignment(ptr) {
        if (ptr % Alignment2.doubleWord === 0) {
          return Alignment2.doubleWord;
        }
        if (ptr % Alignment2.word === 0) {
          return Alignment2.word;
        }
        if (ptr % Alignment2.halfWord === 0) {
          return Alignment2.halfWord;
        }
        return Alignment2.byte;
      }
      Alignment2.getAlignment = getAlignment;
    })(Alignment || (exports.Alignment = Alignment = {}));
    var align = Alignment.align;
    var MemoryError = class extends ComponentModelTrap {
      constructor(message2) {
        super(message2);
      }
    };
    exports.MemoryError = MemoryError;
    var BaseMemoryRange = class {
      _memory;
      _ptr;
      _size;
      _alignment;
      _view;
      constructor(memory, ptr, size) {
        this._memory = memory;
        this._ptr = ptr;
        this._size = size;
        this._alignment = Alignment.getAlignment(ptr);
      }
      get memory() {
        return this._memory;
      }
      get ptr() {
        return this._ptr;
      }
      get size() {
        return this._size;
      }
      get alignment() {
        return this._alignment;
      }
      get view() {
        if (this._view === void 0 || this._view.buffer !== this._memory.buffer) {
          this._view = new DataView(this._memory.buffer, this._ptr, this._size);
        }
        return this._view;
      }
      getUint8(offset) {
        return this.view.getUint8(offset);
      }
      getInt8(offset) {
        return this.view.getInt8(offset);
      }
      getUint16(offset) {
        this.assertAlignment(offset, Alignment.halfWord);
        return this.view.getUint16(offset, true);
      }
      getInt16(offset) {
        this.assertAlignment(offset, Alignment.halfWord);
        return this.view.getInt16(offset, true);
      }
      getUint32(offset) {
        this.assertAlignment(offset, Alignment.word);
        return this.view.getUint32(offset, true);
      }
      getInt32(offset) {
        this.assertAlignment(offset, Alignment.word);
        return this.view.getInt32(offset, true);
      }
      getUint64(offset) {
        this.assertAlignment(offset, Alignment.doubleWord);
        return this.view.getBigUint64(offset, true);
      }
      getInt64(offset) {
        this.assertAlignment(offset, Alignment.doubleWord);
        return this.view.getBigInt64(offset, true);
      }
      getFloat32(offset) {
        this.assertAlignment(offset, Alignment.word);
        return this.view.getFloat32(offset, true);
      }
      getFloat64(offset) {
        this.assertAlignment(offset, Alignment.doubleWord);
        return this.view.getFloat64(offset, true);
      }
      getPtr(offset) {
        this.assertAlignment(offset, Alignment.word);
        return this.view.getUint32(offset, true);
      }
      getUint8Array(offset, length) {
        return this.getArray(offset, length, Uint8Array);
      }
      getInt8Array(offset, length) {
        return this.getArray(offset, length, Int8Array);
      }
      getUint16Array(byteOffset, length) {
        return this.getArray(byteOffset, length, Uint16Array);
      }
      getInt16Array(byteOffset, length) {
        return this.getArray(byteOffset, length, Int16Array);
      }
      getUint32Array(byteOffset, length) {
        return this.getArray(byteOffset, length, Uint32Array);
      }
      getInt32Array(byteOffset, length) {
        return this.getArray(byteOffset, length, Int32Array);
      }
      getUint64Array(byteOffset, length) {
        return this.getBigArray(byteOffset, length, BigUint64Array);
      }
      getInt64Array(byteOffset, length) {
        return this.getBigArray(byteOffset, length, BigInt64Array);
      }
      getFloat32Array(byteOffset, length) {
        return this.getArray(byteOffset, length, Float32Array);
      }
      getFloat64Array(byteOffset, length) {
        return this.getArray(byteOffset, length, Float64Array);
      }
      copyBytes(offset, length, into, into_offset) {
        if (offset + length > this.size) {
          throw new MemoryError(`Memory access is out of bounds. Accessing [${offset}, ${length}], allocated[${this.ptr}, ${this.size}]`);
        }
        const target = into.getUint8View(into_offset, length);
        target.set(new Uint8Array(this._memory.buffer, this.ptr + offset, length));
      }
      assertAlignment(offset, alignment) {
        if (alignment > this.alignment || offset % alignment !== 0) {
          throw new MemoryError(`Memory location is not aligned to ${alignment}. Allocated[${this.ptr},${this.size}]`);
        }
      }
      getArray(byteOffset, length, clazz2) {
        length = length ?? (this.size - byteOffset) / clazz2.BYTES_PER_ELEMENT;
        if (!Number.isInteger(length)) {
          throw new MemoryError(`Length must be an integer value. Got ${length}.`);
        }
        const result2 = new clazz2(length);
        result2.set(new clazz2(this._memory.buffer, this.ptr + byteOffset, length));
        return result2;
      }
      getBigArray(byteOffset, length, clazz2) {
        length = length ?? (this.size - byteOffset) / clazz2.BYTES_PER_ELEMENT;
        if (!Number.isInteger(length)) {
          throw new MemoryError(`Length must be an integer value. Got ${length}.`);
        }
        const result2 = new clazz2(length);
        result2.set(new clazz2(this._memory.buffer, this.ptr + byteOffset, length));
        return result2;
      }
    };
    exports.BaseMemoryRange = BaseMemoryRange;
    var ReadonlyMemoryRange = class _ReadonlyMemoryRange extends BaseMemoryRange {
      constructor(memory, ptr, size) {
        super(memory, ptr, size);
      }
      range(offset, size) {
        if (offset + size > this.size) {
          throw new MemoryError(`Memory access is out of bounds. Accessing [${offset}, ${size}], allocated[${this.ptr}, ${this.size}]`);
        }
        return new _ReadonlyMemoryRange(this._memory, this.ptr + offset, size);
      }
    };
    exports.ReadonlyMemoryRange = ReadonlyMemoryRange;
    var MemoryRange = class _MemoryRange extends BaseMemoryRange {
      isAllocated;
      constructor(memory, ptr, size, isPreallocated = false) {
        super(memory, ptr, size);
        this.isAllocated = isPreallocated;
      }
      free() {
        if (typeof this._memory.free !== "function") {
          throw new MemoryError(`Memory doesn't support free`);
        }
        this._memory.free(this);
      }
      range(offset, size) {
        if (offset + size > this.size) {
          throw new MemoryError(`Memory access is out of bounds. Accessing [${offset}, ${size}], allocated[${this.ptr}, ${this.size}]`);
        }
        return new _MemoryRange(this._memory, this.ptr + offset, size);
      }
      setUint8(offset, value) {
        this.view.setUint8(offset, value);
      }
      setInt8(offset, value) {
        this.view.setInt8(offset, value);
      }
      setUint16(offset, value) {
        this.assertAlignment(offset, Alignment.halfWord);
        this.view.setUint16(offset, value, true);
      }
      setInt16(offset, value) {
        this.assertAlignment(offset, Alignment.halfWord);
        this.view.setInt16(offset, value, true);
      }
      setUint32(offset, value) {
        this.assertAlignment(offset, Alignment.word);
        this.view.setUint32(offset, value, true);
      }
      setInt32(offset, value) {
        this.assertAlignment(offset, Alignment.word);
        this.view.setInt32(offset, value, true);
      }
      setUint64(offset, value) {
        this.assertAlignment(offset, Alignment.doubleWord);
        this.view.setBigUint64(offset, value, true);
      }
      setInt64(offset, value) {
        this.assertAlignment(offset, Alignment.doubleWord);
        this.view.setBigInt64(offset, value, true);
      }
      setFloat32(offset, value) {
        this.assertAlignment(offset, Alignment.word);
        this.view.setFloat32(offset, value, true);
      }
      setFloat64(offset, value) {
        this.assertAlignment(offset, Alignment.doubleWord);
        this.view.setFloat64(offset, value, true);
      }
      setPtr(offset, value) {
        this.assertAlignment(offset, Alignment.word);
        this.view.setUint32(offset, value, true);
      }
      getUint8View(offset, length) {
        return this.getArrayView(offset, length, Uint8Array);
      }
      getInt8View(offset, length) {
        return this.getArrayView(offset, length, Int8Array);
      }
      getUint16View(offset, length) {
        return this.getArrayView(offset, length, Uint16Array);
      }
      getInt16View(offset, length) {
        return this.getArrayView(offset, length, Int16Array);
      }
      getUint32View(offset, length) {
        return this.getArrayView(offset, length, Uint32Array);
      }
      getInt32View(offset, length) {
        return this.getArrayView(offset, length, Int32Array);
      }
      getUint64View(offset, length) {
        return this.getBigArrayView(offset, length, BigUint64Array);
      }
      getInt64View(offset, length) {
        return this.getBigArrayView(offset, length, BigInt64Array);
      }
      getFloat32View(offset, length) {
        return this.getArrayView(offset, length, Float32Array);
      }
      getFloat64View(offset, length) {
        return this.getArrayView(offset, length, Float64Array);
      }
      setUint8Array(offset, bytes) {
        this.setArray(offset, bytes, Uint8Array);
      }
      setInt8Array(offset, bytes) {
        this.setArray(offset, bytes, Int8Array);
      }
      setUint16Array(offset, bytes) {
        this.setArray(offset, bytes, Uint16Array);
      }
      setInt16Array(offset, bytes) {
        this.setArray(offset, bytes, Int16Array);
      }
      setUint32Array(offset, bytes) {
        this.setArray(offset, bytes, Uint32Array);
      }
      setInt32Array(offset, bytes) {
        this.setArray(offset, bytes, Int32Array);
      }
      setUint64Array(offset, bytes) {
        this.setBigArray(offset, bytes, BigUint64Array);
      }
      setInt64Array(offset, bytes) {
        this.setBigArray(offset, bytes, BigInt64Array);
      }
      setFloat32Array(offset, bytes) {
        this.setArray(offset, bytes, Float32Array);
      }
      setFloat64Array(offset, bytes) {
        this.setArray(offset, bytes, Float64Array);
      }
      getArrayView(byteOffset, length, clazz2) {
        length = length ?? (this.size - byteOffset) / clazz2.BYTES_PER_ELEMENT;
        if (!Number.isInteger(length)) {
          throw new MemoryError(`Length must be an integer value. Got ${length}.`);
        }
        return new clazz2(this._memory.buffer, this.ptr + byteOffset, length);
      }
      getBigArrayView(byteOffset, length, clazz2) {
        length = length ?? (this.size - byteOffset) / clazz2.BYTES_PER_ELEMENT;
        if (!Number.isInteger(length)) {
          throw new MemoryError(`Length must be an integer value. Got ${length}.`);
        }
        return new clazz2(this._memory.buffer, this.ptr + byteOffset, length);
      }
      setArray(byteOffset, bytes, clazz2) {
        new clazz2(this._memory.buffer, this.ptr + byteOffset, bytes.length).set(bytes);
      }
      setBigArray(byteOffset, bytes, clazz2) {
        new clazz2(this._memory.buffer, this.ptr + byteOffset, bytes.length).set(bytes);
      }
    };
    exports.MemoryRange = MemoryRange;
    var NullMemory = class {
      id = "b60336d2-c856-4767-af3b-f66e1ab6c507";
      buffer = new ArrayBuffer(0);
      alloc() {
        throw new MemoryError("Cannot allocate memory on a null memory.");
      }
      realloc() {
        throw new MemoryError("Cannot re-allocate memory on a null memory.");
      }
      preAllocated() {
        throw new MemoryError("Cannot point to pre-allocate memory on a null memory.");
      }
      readonly() {
        throw new MemoryError("Cannot point to readonly memory on a null memory.");
      }
      free() {
        throw new MemoryError("Cannot free memory on a null memory.");
      }
    };
    var Memory;
    (function(Memory2) {
      Memory2.Null = new NullMemory();
      class Default {
        id;
        memory;
        cabi_realloc;
        constructor(exports2, id) {
          if (exports2.memory === void 0 || exports2.cabi_realloc === void 0) {
            throw new MemoryError("The exports object must contain a memory object and a cabi_realloc function.");
          }
          this.id = id ?? uuid.v4();
          this.memory = exports2.memory;
          this.cabi_realloc = exports2.cabi_realloc;
        }
        get buffer() {
          return this.memory.buffer;
        }
        alloc(align2, size) {
          const ptr = this.cabi_realloc(0, 0, align2, size);
          return new MemoryRange(this, ptr, size);
        }
        realloc(range, newSize) {
          const ptr = this.cabi_realloc(range.ptr, range.size, range.alignment, newSize);
          return new MemoryRange(this, ptr, newSize);
        }
        preAllocated(ptr, size) {
          return new MemoryRange(this, ptr, size);
        }
        readonly(ptr, size) {
          return new ReadonlyMemoryRange(this, ptr, size);
        }
      }
      Memory2.Default = Default;
    })(Memory || (exports.Memory = Memory = {}));
    var Options;
    (function(Options2) {
      function is(value) {
        const candidate = value;
        return candidate && typeof candidate.encoding === "string" && (candidate.keepOption === void 0 || typeof candidate.keepOption === "boolean");
      }
      Options2.is = is;
    })(Options || (exports.Options = Options = {}));
    var FlatTypeKind;
    (function(FlatTypeKind2) {
      FlatTypeKind2["i32"] = "i32";
      FlatTypeKind2["i64"] = "i64";
      FlatTypeKind2["f32"] = "f32";
      FlatTypeKind2["f64"] = "f64";
    })(FlatTypeKind || (exports.FlatTypeKind = FlatTypeKind = {}));
    var $i32;
    (function($i322) {
      $i322.kind = FlatTypeKind.i32;
      $i322.size = 4;
      $i322.alignment = Alignment.word;
      function load(memory, offset) {
        return memory.getUint32(offset);
      }
      $i322.load = load;
      function store(memory, offset, value) {
        memory.setUint32(offset, value);
      }
      $i322.store = store;
      function copy(dest, dest_offset, src, src_offset) {
        dest.assertAlignment(dest_offset, $i322.alignment);
        src.assertAlignment(src_offset, $i322.alignment);
        src.copyBytes(src_offset, $i322.size, dest, dest_offset);
      }
      $i322.copy = copy;
    })($i32 || ($i32 = {}));
    exports.i32 = $i32;
    var $i64;
    (function($i642) {
      $i642.kind = FlatTypeKind.i64;
      $i642.size = 8;
      $i642.alignment = Alignment.doubleWord;
      function load(memory, offset) {
        return memory.getUint64(offset);
      }
      $i642.load = load;
      function store(memory, offset, value) {
        memory.setUint64(offset, value);
      }
      $i642.store = store;
      function copy(dest, dest_offset, src, src_offset) {
        dest.assertAlignment(dest_offset, $i642.alignment);
        src.assertAlignment(src_offset, $i642.alignment);
        src.copyBytes(src_offset, $i642.size, dest, dest_offset);
      }
      $i642.copy = copy;
    })($i64 || ($i64 = {}));
    exports.i64 = $i64;
    var $f32;
    (function($f322) {
      $f322.kind = FlatTypeKind.f32;
      $f322.size = 4;
      $f322.alignment = Alignment.word;
      function load(memory, offset) {
        return memory.getFloat32(offset);
      }
      $f322.load = load;
      function store(memory, offset, value) {
        memory.setFloat32(offset, value);
      }
      $f322.store = store;
      function copy(dest, dest_offset, src, src_offset) {
        dest.assertAlignment(dest_offset, $f322.alignment);
        src.assertAlignment(src_offset, $f322.alignment);
        src.copyBytes(src_offset, $f322.size, dest, dest_offset);
      }
      $f322.copy = copy;
    })($f32 || ($f32 = {}));
    exports.f32 = $f32;
    var $f64;
    (function($f642) {
      $f642.kind = FlatTypeKind.f64;
      $f642.size = 8;
      $f642.alignment = Alignment.doubleWord;
      function load(memory, offset) {
        return memory.getFloat64(offset);
      }
      $f642.load = load;
      function store(memory, offset, value) {
        memory.setFloat64(offset, value);
      }
      $f642.store = store;
      function copy(dest, dest_offset, src, src_offset) {
        dest.assertAlignment(dest_offset, $f642.alignment);
        src.assertAlignment(src_offset, $f642.alignment);
        src.copyBytes(src_offset, $f642.size, dest, dest_offset);
      }
      $f642.copy = copy;
    })($f64 || ($f64 = {}));
    exports.f64 = $f64;
    var FlatTuple = class _FlatTuple {
      types;
      alignment;
      size;
      constructor(types) {
        this.types = types;
        this.alignment = _FlatTuple.alignment(types);
        this.size = _FlatTuple.size(types, this.alignment);
      }
      load(memory, offset) {
        memory.assertAlignment(offset, this.alignment);
        const result2 = [];
        for (const type of this.types) {
          offset = align(offset, type.alignment);
          result2.push(type.load(memory, offset));
          offset += type.size;
        }
        return result2;
      }
      alloc(memory) {
        return memory.alloc(this.alignment, this.size);
      }
      store(memory, offset, values) {
        memory.assertAlignment(offset, this.alignment);
        for (const [index, type] of this.types.entries()) {
          const value = values[index];
          offset = align(offset, type.alignment);
          type.store(memory, offset, value);
          offset += type.size;
        }
      }
      copy(dest, dest_offset, src, src_offset) {
        dest.assertAlignment(dest_offset, this.alignment);
        src.assertAlignment(src_offset, this.alignment);
        src.copyBytes(src_offset, this.size, dest, dest_offset);
      }
      static alignment(types) {
        let result2 = Alignment.byte;
        for (const type of types) {
          result2 = Math.max(result2, type.alignment);
        }
        return result2;
      }
      static size(types, tupleAlignment) {
        let result2 = 0;
        for (const type of types) {
          result2 = align(result2, type.alignment);
          result2 += type.size;
        }
        return align(result2, tupleAlignment);
      }
    };
    exports.FlatTuple = FlatTuple;
    var WasmTypes;
    (function(WasmTypes2) {
      const $32 = new DataView(new ArrayBuffer(4));
      const $64 = new DataView(new ArrayBuffer(8));
      function reinterpret_i32_as_f32(i32) {
        $32.setInt32(0, i32, true);
        return $32.getFloat32(0, true);
      }
      WasmTypes2.reinterpret_i32_as_f32 = reinterpret_i32_as_f32;
      function reinterpret_f32_as_i32(f32) {
        $32.setFloat32(0, f32, true);
        return $32.getInt32(0, true);
      }
      WasmTypes2.reinterpret_f32_as_i32 = reinterpret_f32_as_i32;
      function convert_i64_to_i32(i64) {
        return BigInts.asNumber(i64);
      }
      WasmTypes2.convert_i64_to_i32 = convert_i64_to_i32;
      function convert_i32_to_i64(i32) {
        return BigInt(i32);
      }
      WasmTypes2.convert_i32_to_i64 = convert_i32_to_i64;
      function reinterpret_i64_as_f32(i64) {
        const i32 = convert_i64_to_i32(i64);
        return reinterpret_i32_as_f32(i32);
      }
      WasmTypes2.reinterpret_i64_as_f32 = reinterpret_i64_as_f32;
      function reinterpret_f32_as_i64(f32) {
        const i32 = reinterpret_f32_as_i32(f32);
        return convert_i32_to_i64(i32);
      }
      WasmTypes2.reinterpret_f32_as_i64 = reinterpret_f32_as_i64;
      function reinterpret_i64_as_f64(i64) {
        $64.setBigInt64(0, i64, true);
        return $64.getFloat64(0, true);
      }
      WasmTypes2.reinterpret_i64_as_f64 = reinterpret_i64_as_f64;
      function reinterpret_f64_as_i64(f64) {
        $64.setFloat64(0, f64, true);
        return $64.getBigInt64(0, true);
      }
      WasmTypes2.reinterpret_f64_as_i64 = reinterpret_f64_as_i64;
    })(WasmTypes || (WasmTypes = {}));
    var CoerceValueIter = class {
      values;
      haveFlatTypes;
      wantFlatTypes;
      index;
      constructor(values, haveFlatTypes, wantFlatTypes) {
        this.values = values;
        this.haveFlatTypes = haveFlatTypes;
        this.wantFlatTypes = wantFlatTypes;
        if (haveFlatTypes.length < wantFlatTypes.length) {
          throw new ComponentModelTrap(`Invalid coercion: have ${haveFlatTypes.length} values, want ${wantFlatTypes.length} values`);
        }
        this.index = 0;
      }
      next() {
        const value = this.values.next();
        if (value.done) {
          return value;
        }
        const haveType = this.haveFlatTypes[this.index];
        const wantType = this.wantFlatTypes[this.index++];
        if (haveType === $i32 && wantType === $f32) {
          return { done: false, value: WasmTypes.reinterpret_i32_as_f32(value.value) };
        } else if (haveType === $i64 && wantType === $i32) {
          return { done: false, value: WasmTypes.convert_i64_to_i32(value.value) };
        } else if (haveType === $i64 && wantType === $f32) {
          return { done: false, value: WasmTypes.reinterpret_i64_as_f32(value.value) };
        } else if (haveType === $i64 && wantType === $f64) {
          return { done: false, value: WasmTypes.reinterpret_i64_as_f64(value.value) };
        } else {
          return value;
        }
      }
    };
    var ComponentModelTypeKind;
    (function(ComponentModelTypeKind2) {
      ComponentModelTypeKind2["bool"] = "bool";
      ComponentModelTypeKind2["u8"] = "u8";
      ComponentModelTypeKind2["u16"] = "u16";
      ComponentModelTypeKind2["u32"] = "u32";
      ComponentModelTypeKind2["u64"] = "u64";
      ComponentModelTypeKind2["s8"] = "s8";
      ComponentModelTypeKind2["s16"] = "s16";
      ComponentModelTypeKind2["s32"] = "s32";
      ComponentModelTypeKind2["s64"] = "s64";
      ComponentModelTypeKind2["float32"] = "float32";
      ComponentModelTypeKind2["float64"] = "float64";
      ComponentModelTypeKind2["char"] = "char";
      ComponentModelTypeKind2["string"] = "string";
      ComponentModelTypeKind2["list"] = "list";
      ComponentModelTypeKind2["record"] = "record";
      ComponentModelTypeKind2["tuple"] = "tuple";
      ComponentModelTypeKind2["variant"] = "variant";
      ComponentModelTypeKind2["enum"] = "enum";
      ComponentModelTypeKind2["flags"] = "flags";
      ComponentModelTypeKind2["option"] = "option";
      ComponentModelTypeKind2["result"] = "result";
      ComponentModelTypeKind2["resource"] = "resource";
      ComponentModelTypeKind2["resourceHandle"] = "resourceHandle";
      ComponentModelTypeKind2["borrow"] = "borrow";
      ComponentModelTypeKind2["own"] = "own";
    })(ComponentModelTypeKind || (exports.ComponentModelTypeKind = ComponentModelTypeKind = {}));
    var ComponentModelContext;
    (function(ComponentModelContext2) {
      function is(value) {
        const candidate = value;
        return candidate && Options.is(candidate.options) && ResourceManagers.is(candidate.resources);
      }
      ComponentModelContext2.is = is;
    })(ComponentModelContext || (exports.ComponentModelContext = ComponentModelContext = {}));
    var ComponentModelType;
    (function(ComponentModelType2) {
      function satisfies(_value) {
      }
      ComponentModelType2.satisfies = satisfies;
    })(ComponentModelType || (ComponentModelType = {}));
    var ResultError = class extends Error {
      cause;
      constructor(message2, cause) {
        super(message2, { cause });
        this.cause = cause;
      }
    };
    exports.ResultError = ResultError;
    var bool2;
    (function(bool3) {
      bool3.kind = ComponentModelTypeKind.bool;
      bool3.size = 1;
      bool3.alignment = Alignment.byte;
      bool3.flatTypes = [$i32];
      function load(memory, offset) {
        return memory.getUint8(offset) !== 0;
      }
      bool3.load = load;
      function liftFlat(_memory, values) {
        const value = values.next().value;
        if (value < 0) {
          throw new ComponentModelTrap(`Invalid bool value ${value}`);
        }
        return value !== 0;
      }
      bool3.liftFlat = liftFlat;
      function alloc(memory) {
        return memory.alloc(bool3.alignment, bool3.size);
      }
      bool3.alloc = alloc;
      function store(memory, offset, value) {
        memory.setUint8(offset, value ? 1 : 0);
      }
      bool3.store = store;
      function lowerFlat(result2, _memory, value) {
        result2.push(value ? 1 : 0);
      }
      bool3.lowerFlat = lowerFlat;
      function copy(dest, dest_offset, src, src_offset) {
        src.copyBytes(src_offset, bool3.size, dest, dest_offset);
      }
      bool3.copy = copy;
      function copyFlat(result2, _dest, values, _src) {
        result2.push(values.next().value);
      }
      bool3.copyFlat = copyFlat;
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${cause}`, cause);
        }
      }
      bool3.Error = Error2;
    })(bool2 || (exports.bool = bool2 = {}));
    ComponentModelType.satisfies(bool2);
    var u8;
    (function(u82) {
      u82.kind = ComponentModelTypeKind.u8;
      u82.size = 1;
      u82.alignment = Alignment.byte;
      u82.flatTypes = [$i32];
      u82.LOW_VALUE = 0;
      u82.HIGH_VALUE = 255;
      function load(memory, offset) {
        return memory.getUint8(offset);
      }
      u82.load = load;
      function liftFlat(_memory, values) {
        const value = values.next().value;
        if (value < u82.LOW_VALUE || value > u82.HIGH_VALUE || !Number.isInteger(value)) {
          throw new ComponentModelTrap(`Invalid u8 value ${value}`);
        }
        return value;
      }
      u82.liftFlat = liftFlat;
      function alloc(memory) {
        return memory.alloc(u82.alignment, u82.size);
      }
      u82.alloc = alloc;
      function store(memory, offset, value) {
        memory.setUint8(offset, value);
      }
      u82.store = store;
      function lowerFlat(result2, _memory, value) {
        if (value < u82.LOW_VALUE || value > u82.HIGH_VALUE || !Number.isInteger(value)) {
          throw new ComponentModelTrap(`Invalid u8 value ${value}`);
        }
        result2.push(value);
      }
      u82.lowerFlat = lowerFlat;
      function copy(dest, dest_offset, src, src_offset) {
        src.copyBytes(src_offset, u82.size, dest, dest_offset);
      }
      u82.copy = copy;
      function copyFlat(result2, _dest, values, _src) {
        result2.push(values.next().value);
      }
      u82.copyFlat = copyFlat;
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${cause}`, cause);
        }
      }
      u82.Error = Error2;
    })(u8 || (exports.u8 = u8 = {}));
    ComponentModelType.satisfies(u8);
    var u16;
    (function(u162) {
      u162.kind = ComponentModelTypeKind.u16;
      u162.size = 2;
      u162.alignment = Alignment.halfWord;
      u162.flatTypes = [$i32];
      u162.LOW_VALUE = 0;
      u162.HIGH_VALUE = 65535;
      function load(memory, offset) {
        return memory.getUint16(offset);
      }
      u162.load = load;
      function liftFlat(_memory, values) {
        const value = values.next().value;
        if (value < u162.LOW_VALUE || value > u162.HIGH_VALUE || !Number.isInteger(value)) {
          throw new ComponentModelTrap(`Invalid u16 value ${value}`);
        }
        return value;
      }
      u162.liftFlat = liftFlat;
      function alloc(memory) {
        return memory.alloc(u162.alignment, u162.size);
      }
      u162.alloc = alloc;
      function store(memory, offset, value) {
        memory.setUint16(offset, value);
      }
      u162.store = store;
      function lowerFlat(result2, _memory, value) {
        if (value < u162.LOW_VALUE || value > u162.HIGH_VALUE || !Number.isInteger(value)) {
          throw new ComponentModelTrap(`Invalid u16 value ${value}`);
        }
        result2.push(value);
      }
      u162.lowerFlat = lowerFlat;
      function copy(dest, dest_offset, src, src_offset) {
        dest.assertAlignment(dest_offset, u162.alignment);
        src.assertAlignment(src_offset, u162.alignment);
        src.copyBytes(src_offset, u162.size, dest, dest_offset);
      }
      u162.copy = copy;
      function copyFlat(result2, _dest, values, _src) {
        result2.push(values.next().value);
      }
      u162.copyFlat = copyFlat;
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${cause}`, cause);
        }
      }
      u162.Error = Error2;
    })(u16 || (exports.u16 = u16 = {}));
    ComponentModelType.satisfies(u16);
    var u322;
    (function(u323) {
      u323.kind = ComponentModelTypeKind.u32;
      u323.size = 4;
      u323.alignment = Alignment.word;
      u323.flatTypes = [$i32];
      u323.LOW_VALUE = 0;
      u323.HIGH_VALUE = 4294967295;
      function valid(value) {
        return value >= u323.LOW_VALUE && value <= u323.HIGH_VALUE && Number.isInteger(value);
      }
      u323.valid = valid;
      function load(memory, offset) {
        return memory.getUint32(offset);
      }
      u323.load = load;
      function liftFlat(_memory, values) {
        const value = values.next().value;
        if (value < u323.LOW_VALUE || value > u323.HIGH_VALUE || !Number.isInteger(value)) {
          throw new ComponentModelTrap(`Invalid u32 value ${value}`);
        }
        return value;
      }
      u323.liftFlat = liftFlat;
      function alloc(memory) {
        return memory.alloc(u323.alignment, u323.size);
      }
      u323.alloc = alloc;
      function store(memory, offset, value) {
        memory.setUint32(offset, value);
      }
      u323.store = store;
      function lowerFlat(result2, _memory, value) {
        if (value < u323.LOW_VALUE || value > u323.HIGH_VALUE || !Number.isInteger(value)) {
          throw new ComponentModelTrap(`Invalid u32 value ${value}`);
        }
        result2.push(value);
      }
      u323.lowerFlat = lowerFlat;
      function copy(dest, dest_offset, src, src_offset) {
        dest.assertAlignment(dest_offset, u323.alignment);
        src.assertAlignment(src_offset, u323.alignment);
        src.copyBytes(src_offset, u323.size, dest, dest_offset);
      }
      u323.copy = copy;
      function copyFlat(result2, _dest, values, _src) {
        result2.push(values.next().value);
      }
      u323.copyFlat = copyFlat;
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${cause}`, cause);
        }
      }
      u323.Error = Error2;
    })(u322 || (exports.u32 = u322 = {}));
    ComponentModelType.satisfies(u322);
    var u642;
    (function(u643) {
      u643.kind = ComponentModelTypeKind.u64;
      u643.size = 8;
      u643.alignment = Alignment.doubleWord;
      u643.flatTypes = [$i64];
      u643.LOW_VALUE = 0n;
      u643.HIGH_VALUE = 18446744073709551615n;
      function load(memory, offset) {
        return memory.getUint64(offset);
      }
      u643.load = load;
      function liftFlat(_memory, values) {
        const value = values.next().value;
        if (value < u643.LOW_VALUE) {
          throw new ComponentModelTrap(`Invalid u64 value ${value}`);
        }
        return value;
      }
      u643.liftFlat = liftFlat;
      function alloc(memory) {
        return memory.alloc(u643.alignment, u643.size);
      }
      u643.alloc = alloc;
      function store(memory, offset, value) {
        memory.setUint64(offset, value);
      }
      u643.store = store;
      function lowerFlat(result2, _memory, value) {
        if (value < u643.LOW_VALUE) {
          throw new ComponentModelTrap(`Invalid u64 value ${value}`);
        }
        result2.push(value);
      }
      u643.lowerFlat = lowerFlat;
      function copy(dest, dest_offset, src, src_offset) {
        dest.assertAlignment(dest_offset, u643.alignment);
        src.assertAlignment(src_offset, u643.alignment);
        src.copyBytes(src_offset, u643.size, dest, dest_offset);
      }
      u643.copy = copy;
      function copyFlat(result2, _dest, values, _src) {
        result2.push(values.next().value);
      }
      u643.copyFlat = copyFlat;
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${cause}`, cause);
        }
      }
      u643.Error = Error2;
    })(u642 || (exports.u64 = u642 = {}));
    ComponentModelType.satisfies(u642);
    var s8;
    (function(s82) {
      s82.kind = ComponentModelTypeKind.s8;
      s82.size = 1;
      s82.alignment = Alignment.byte;
      s82.flatTypes = [$i32];
      const LOW_VALUE = -128;
      const HIGH_VALUE = 127;
      function load(memory, offset) {
        return memory.getInt8(offset);
      }
      s82.load = load;
      function liftFlat(_memory, values) {
        let value = values.next().value;
        if (!Number.isInteger(value)) {
          throw new ComponentModelTrap(`Invalid s8 value ${value}`);
        }
        if (value > HIGH_VALUE) {
          value = value - 256;
        }
        if (value < LOW_VALUE || value > HIGH_VALUE) {
          throw new ComponentModelTrap(`Invalid s8 value ${value}`);
        }
        return value;
      }
      s82.liftFlat = liftFlat;
      function alloc(memory) {
        return memory.alloc(s82.alignment, s82.size);
      }
      s82.alloc = alloc;
      function store(memory, offset, value) {
        memory.setInt8(offset, value);
      }
      s82.store = store;
      function lowerFlat(result2, _memory, value) {
        if (value < LOW_VALUE || value > HIGH_VALUE || !Number.isInteger(value)) {
          throw new ComponentModelTrap(`Invalid s8 value ${value}`);
        }
        result2.push(value < 0 ? value + 256 : value);
      }
      s82.lowerFlat = lowerFlat;
      function copy(dest, dest_offset, src, src_offset) {
        dest.assertAlignment(dest_offset, s82.alignment);
        src.assertAlignment(src_offset, s82.alignment);
        src.copyBytes(src_offset, s82.size, dest, dest_offset);
      }
      s82.copy = copy;
      function copyFlat(result2, _dest, values, _src) {
        result2.push(values.next().value);
      }
      s82.copyFlat = copyFlat;
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${cause}`, cause);
        }
      }
      s82.Error = Error2;
    })(s8 || (exports.s8 = s8 = {}));
    ComponentModelType.satisfies(s8);
    var s16;
    (function(s162) {
      s162.kind = ComponentModelTypeKind.s16;
      s162.size = 2;
      s162.alignment = Alignment.halfWord;
      s162.flatTypes = [$i32];
      const LOW_VALUE = -32768;
      const HIGH_VALUE = 32767;
      function load(memory, offset) {
        return memory.getInt16(offset);
      }
      s162.load = load;
      function liftFlat(_memory, values) {
        let value = values.next().value;
        if (!Number.isInteger(value)) {
          throw new ComponentModelTrap(`Invalid s16 value ${value}`);
        }
        if (value > HIGH_VALUE) {
          value = value - 65536;
        }
        if (value < LOW_VALUE || value > HIGH_VALUE) {
          throw new ComponentModelTrap(`Invalid s16 value ${value}`);
        }
        return value;
      }
      s162.liftFlat = liftFlat;
      function alloc(memory) {
        return memory.alloc(s162.alignment, s162.size);
      }
      s162.alloc = alloc;
      function store(memory, offset, value) {
        memory.setInt16(offset, value);
      }
      s162.store = store;
      function lowerFlat(result2, _memory, value) {
        if (value < LOW_VALUE || value > HIGH_VALUE || !Number.isInteger(value)) {
          throw new ComponentModelTrap(`Invalid s16 value ${value}`);
        }
        result2.push(value < 0 ? value + 65536 : value);
      }
      s162.lowerFlat = lowerFlat;
      function copy(dest, dest_offset, src, src_offset) {
        dest.assertAlignment(dest_offset, s162.alignment);
        src.assertAlignment(src_offset, s162.alignment);
        src.copyBytes(src_offset, s162.size, dest, dest_offset);
      }
      s162.copy = copy;
      function copyFlat(result2, _dest, values, _src) {
        result2.push(values.next().value);
      }
      s162.copyFlat = copyFlat;
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${cause}`, cause);
        }
      }
      s162.Error = Error2;
    })(s16 || (exports.s16 = s16 = {}));
    ComponentModelType.satisfies(s16);
    var s322;
    (function(s323) {
      s323.kind = ComponentModelTypeKind.s32;
      s323.size = 4;
      s323.alignment = Alignment.word;
      s323.flatTypes = [$i32];
      const LOW_VALUE = -2147483648;
      const HIGH_VALUE = 2147483647;
      function load(memory, offset) {
        return memory.getInt32(offset);
      }
      s323.load = load;
      function liftFlat(_memory, values) {
        let value = values.next().value;
        if (!Number.isInteger(value)) {
          throw new ComponentModelTrap(`Invalid s32 value ${value}`);
        }
        if (value > HIGH_VALUE) {
          value = value - 4294967296;
        }
        if (value < LOW_VALUE || value > HIGH_VALUE) {
          throw new ComponentModelTrap(`Invalid s32 value ${value}`);
        }
        return value;
      }
      s323.liftFlat = liftFlat;
      function alloc(memory) {
        return memory.alloc(s323.alignment, s323.size);
      }
      s323.alloc = alloc;
      function store(memory, offset, value) {
        memory.setInt32(offset, value);
      }
      s323.store = store;
      function lowerFlat(result2, _memory, value) {
        if (value < LOW_VALUE || value > HIGH_VALUE || !Number.isInteger(value)) {
          throw new ComponentModelTrap(`Invalid s32 value ${value}`);
        }
        result2.push(value < 0 ? value + 4294967296 : value);
      }
      s323.lowerFlat = lowerFlat;
      function copy(dest, dest_offset, src, src_offset) {
        dest.assertAlignment(dest_offset, s323.alignment);
        src.assertAlignment(src_offset, s323.alignment);
        src.copyBytes(src_offset, s323.size, dest, dest_offset);
      }
      s323.copy = copy;
      function copyFlat(result2, _dest, values, _src) {
        result2.push(values.next().value);
      }
      s323.copyFlat = copyFlat;
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${cause}`, cause);
        }
      }
      s323.Error = Error2;
    })(s322 || (exports.s32 = s322 = {}));
    ComponentModelType.satisfies(s322);
    var s64;
    (function(s642) {
      s642.kind = ComponentModelTypeKind.s64;
      s642.size = 8;
      s642.alignment = Alignment.doubleWord;
      s642.flatTypes = [$i64];
      const LOW_VALUE = -9223372036854775808n;
      const HIGH_VALUE = 9223372036854775807n;
      function load(memory, offset) {
        return memory.getInt64(offset);
      }
      s642.load = load;
      function liftFlat(_memory, values) {
        let value = values.next().value;
        if (typeof value !== "bigint") {
          throw new ComponentModelTrap(`Invalid s64 value ${value}`);
        }
        if (value > HIGH_VALUE) {
          value = value - 18446744073709551616n;
        }
        if (value < LOW_VALUE || value > HIGH_VALUE) {
          throw new ComponentModelTrap(`Invalid s64 value ${value}`);
        }
        return value;
      }
      s642.liftFlat = liftFlat;
      function alloc(memory) {
        return memory.alloc(s642.alignment, s642.size);
      }
      s642.alloc = alloc;
      function store(memory, offset, value) {
        memory.setInt64(offset, value);
      }
      s642.store = store;
      function lowerFlat(result2, _memory, value) {
        if (value < LOW_VALUE || value > HIGH_VALUE) {
          throw new ComponentModelTrap(`Invalid s64 value ${value}`);
        }
        result2.push(value < 0 ? value + 18446744073709551616n : value);
      }
      s642.lowerFlat = lowerFlat;
      function copy(dest, dest_offset, src, src_offset) {
        dest.assertAlignment(dest_offset, s642.alignment);
        src.assertAlignment(src_offset, s642.alignment);
        src.copyBytes(src_offset, s642.size, dest, dest_offset);
      }
      s642.copy = copy;
      function copyFlat(result2, _dest, values, _src) {
        result2.push(values.next().value);
      }
      s642.copyFlat = copyFlat;
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${cause}`, cause);
        }
      }
      s642.Error = Error2;
    })(s64 || (exports.s64 = s64 = {}));
    ComponentModelType.satisfies(s64);
    var float32;
    (function(float322) {
      float322.kind = ComponentModelTypeKind.float32;
      float322.size = 4;
      float322.alignment = Alignment.word;
      float322.flatTypes = [$f32];
      const LOW_VALUE = -34028234663852886e22;
      const HIGH_VALUE = 34028234663852886e22;
      const NAN = 2143289344;
      function load(memory, offset) {
        return memory.getFloat32(offset);
      }
      float322.load = load;
      function liftFlat(_memory, values) {
        const value = values.next().value;
        if (value < LOW_VALUE || value > HIGH_VALUE) {
          throw new ComponentModelTrap(`Invalid float32 value ${value}`);
        }
        return value === NAN ? Number.NaN : value;
      }
      float322.liftFlat = liftFlat;
      function alloc(memory) {
        return memory.alloc(float322.alignment, float322.size);
      }
      float322.alloc = alloc;
      function store(memory, offset, value) {
        memory.setFloat32(offset, value);
      }
      float322.store = store;
      function lowerFlat(result2, _memory, value) {
        if (value < LOW_VALUE || value > HIGH_VALUE) {
          throw new ComponentModelTrap(`Invalid float32 value ${value}`);
        }
        result2.push(Number.isNaN(value) ? NAN : value);
      }
      float322.lowerFlat = lowerFlat;
      function copy(dest, dest_offset, src, src_offset) {
        dest.assertAlignment(dest_offset, float322.alignment);
        src.assertAlignment(src_offset, float322.alignment);
        src.copyBytes(src_offset, float322.size, dest, dest_offset);
      }
      float322.copy = copy;
      function copyFlat(result2, _dest, values, _src) {
        result2.push(values.next().value);
      }
      float322.copyFlat = copyFlat;
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${cause}`, cause);
        }
      }
      float322.Error = Error2;
    })(float32 || (exports.float32 = float32 = {}));
    ComponentModelType.satisfies(float32);
    var float642;
    (function(float643) {
      float643.kind = ComponentModelTypeKind.float64;
      float643.size = 8;
      float643.alignment = Alignment.doubleWord;
      float643.flatTypes = [$f64];
      const LOW_VALUE = -1 * Number.MAX_VALUE;
      const HIGH_VALUE = Number.MAX_VALUE;
      const NAN = 9221120237041091e3;
      function load(memory, offset) {
        return memory.getFloat64(offset);
      }
      float643.load = load;
      function liftFlat(_memory, values) {
        const value = values.next().value;
        if (value < LOW_VALUE || value > HIGH_VALUE) {
          throw new ComponentModelTrap(`Invalid float64 value ${value}`);
        }
        return value === NAN ? Number.NaN : value;
      }
      float643.liftFlat = liftFlat;
      function alloc(memory) {
        return memory.alloc(float643.alignment, float643.size);
      }
      float643.alloc = alloc;
      function store(memory, offset, value) {
        memory.setFloat64(offset, value);
      }
      float643.store = store;
      function lowerFlat(result2, _memory, value) {
        if (value < LOW_VALUE || value > HIGH_VALUE) {
          throw new ComponentModelTrap(`Invalid float64 value ${value}`);
        }
        result2.push(Number.isNaN(value) ? NAN : value);
      }
      float643.lowerFlat = lowerFlat;
      function copy(dest, dest_offset, src, src_offset) {
        dest.assertAlignment(dest_offset, float643.alignment);
        src.assertAlignment(src_offset, float643.alignment);
        src.copyBytes(src_offset, float643.size, dest, dest_offset);
      }
      float643.copy = copy;
      function copyFlat(result2, _dest, values, _src) {
        result2.push(values.next().value);
      }
      float643.copyFlat = copyFlat;
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${cause}`, cause);
        }
      }
      float643.Error = Error2;
    })(float642 || (exports.float64 = float642 = {}));
    ComponentModelType.satisfies(float642);
    exports.byte = {
      kind: u8.kind,
      size: u8.size,
      alignment: u8.alignment,
      flatTypes: u8.flatTypes,
      load: u8.load,
      liftFlat: u8.liftFlat,
      alloc: u8.alloc,
      store: u8.store,
      lowerFlat: u8.lowerFlat,
      copy: u8.copy,
      copyFlat: u8.copyFlat
    };
    exports.size = {
      kind: u322.kind,
      size: u322.size,
      alignment: u322.alignment,
      flatTypes: u322.flatTypes,
      load: u322.load,
      liftFlat: u322.liftFlat,
      alloc: u322.alloc,
      store: u322.store,
      lowerFlat: u322.lowerFlat,
      copy: u322.copy,
      copyFlat: u322.copyFlat
    };
    exports.ptr = {
      kind: u322.kind,
      size: u322.size,
      alignment: u322.alignment,
      flatTypes: u322.flatTypes,
      load: u322.load,
      liftFlat: u322.liftFlat,
      alloc: u322.alloc,
      store: u322.store,
      lowerFlat: u322.lowerFlat,
      copy: u322.copy,
      copyFlat: u322.copyFlat
    };
    var char;
    (function(char2) {
      char2.kind = ComponentModelTypeKind.char;
      char2.size = 4;
      char2.alignment = Alignment.word;
      char2.flatTypes = [$i32];
      function load(memory, offset, _context) {
        return fromCodePoint(u322.load(memory, offset));
      }
      char2.load = load;
      function liftFlat(memory, values, _context) {
        return fromCodePoint(u322.liftFlat(memory, values));
      }
      char2.liftFlat = liftFlat;
      function alloc(memory) {
        return u322.alloc(memory);
      }
      char2.alloc = alloc;
      function store(memory, offset, value, _context) {
        u322.store(memory, offset, asCodePoint(value));
      }
      char2.store = store;
      function lowerFlat(result2, memory, value, _context) {
        u322.lowerFlat(result2, memory, asCodePoint(value));
      }
      char2.lowerFlat = lowerFlat;
      function copy(dest, dest_offset, src, src_offset) {
        dest.assertAlignment(dest_offset, char2.alignment);
        src.assertAlignment(src_offset, char2.alignment);
        src.copyBytes(src_offset, char2.size, dest, dest_offset);
      }
      char2.copy = copy;
      function copyFlat(result2, _dest, values, _src) {
        result2.push(values.next().value);
      }
      char2.copyFlat = copyFlat;
      function fromCodePoint(code) {
        if (code >= 1114112 || 55296 <= code && code <= 57343) {
          throw new ComponentModelTrap("Invalid code point");
        }
        return String.fromCodePoint(code);
      }
      function asCodePoint(str) {
        if (str.length !== 1) {
          throw new ComponentModelTrap("String length must be 1");
        }
        const code = str.codePointAt(0);
        if (!(code <= 55295 || 55296 <= code && code <= 1114111)) {
          throw new ComponentModelTrap("Invalid code point");
        }
        return code;
      }
      class Error2 extends ResultError {
        constructor(value) {
          super(value, `Error value: ${value}`);
        }
      }
      char2.Error = Error2;
    })(char || (exports.char = char = {}));
    ComponentModelType.satisfies(char);
    var wstring2;
    (function(wstring3) {
      const offsets = {
        data: 0,
        codeUnits: 4
      };
      wstring3.kind = ComponentModelTypeKind.string;
      wstring3.size = 8;
      wstring3.alignment = Alignment.word;
      wstring3.flatTypes = [$i32, $i32];
      function load(memRange, offset, context) {
        const dataPtr = memRange.getUint32(offset + offsets.data);
        const codeUnits = memRange.getUint32(offset + offsets.codeUnits);
        return loadFromRange(memRange.memory, dataPtr, codeUnits, context.options);
      }
      wstring3.load = load;
      function liftFlat(memory, values, context) {
        const dataPtr = values.next().value;
        const codeUnits = values.next().value;
        return loadFromRange(memory, dataPtr, codeUnits, context.options);
      }
      wstring3.liftFlat = liftFlat;
      function alloc(memory) {
        return memory.alloc(wstring3.alignment, wstring3.size);
      }
      wstring3.alloc = alloc;
      function store(memory, offset, str, context) {
        const [ptr, codeUnits] = storeIntoRange(memory.memory, str, context.options);
        memory.setUint32(offset + offsets.data, ptr);
        memory.setUint32(offset + offsets.codeUnits, codeUnits);
      }
      wstring3.store = store;
      function lowerFlat(result2, memory, str, context) {
        result2.push(...storeIntoRange(memory, str, context.options));
      }
      wstring3.lowerFlat = lowerFlat;
      function copy(dest, dest_offset, src, src_offset, context) {
        dest.assertAlignment(dest_offset, wstring3.alignment);
        src.assertAlignment(src_offset, wstring3.alignment);
        const data = src.getUint32(src_offset + offsets.data);
        const codeUnits = src.getUint32(src_offset + offsets.codeUnits);
        const [alignment, byteLength] = getAlignmentAndByteLength(codeUnits, context.options);
        const srcReader = src.memory.readonly(data, byteLength);
        const destWriter = dest.memory.alloc(alignment, byteLength);
        srcReader.copyBytes(0, byteLength, destWriter, 0);
        dest.setUint32(dest_offset + offsets.data, destWriter.ptr);
        dest.setUint32(dest_offset + offsets.codeUnits, codeUnits);
      }
      wstring3.copy = copy;
      function copyFlat(result2, dest, values, src, context) {
        const data = values.next().value;
        const codeUnits = values.next().value;
        const [alignment, byteLength] = getAlignmentAndByteLength(codeUnits, context.options);
        const srcReader = src.readonly(data, byteLength);
        const destWriter = dest.alloc(alignment, byteLength);
        srcReader.copyBytes(0, byteLength, destWriter, 0);
        result2.push(destWriter.ptr, codeUnits);
      }
      wstring3.copyFlat = copyFlat;
      function getAlignmentAndByteLength(codeUnits, options) {
        const encoding = options.encoding;
        if (encoding === "latin1+utf-16") {
          throw new ComponentModelTrap("latin1+utf-16 encoding not yet supported");
        }
        if (encoding === "utf-8") {
          return [u8.alignment, codeUnits];
        } else if (encoding === "utf-16") {
          return [u16.alignment, codeUnits * 2];
        } else {
          throw new ComponentModelTrap("Unsupported encoding");
        }
      }
      wstring3.getAlignmentAndByteLength = getAlignmentAndByteLength;
      function loadFromRange(memory, data, codeUnits, options) {
        const encoding = options.encoding;
        if (encoding === "latin1+utf-16") {
          throw new ComponentModelTrap("latin1+utf-16 encoding not yet supported");
        }
        if (encoding === "utf-8") {
          const byteLength = codeUnits;
          const reader = memory.readonly(data, byteLength);
          return utf8Decoder.decode(reader.getUint8Array(0, byteLength));
        } else if (encoding === "utf-16") {
          const reader = memory.readonly(data, codeUnits * 2);
          return String.fromCharCode(...reader.getUint16Array(data, codeUnits));
        } else {
          throw new ComponentModelTrap("Unsupported encoding");
        }
      }
      function storeIntoRange(memory, str, options) {
        const { encoding } = options;
        if (encoding === "latin1+utf-16") {
          throw new ComponentModelTrap("latin1+utf-16 encoding not yet supported");
        }
        if (encoding === "utf-8") {
          const data = utf8Encoder.encode(str);
          const writer = memory.alloc(u8.alignment, data.length);
          writer.setUint8Array(0, data);
          return [writer.ptr, data.length];
        } else if (encoding === "utf-16") {
          const writer = memory.alloc(u16.alignment, str.length * 2);
          const data = writer.getUint16View(0);
          for (let i = 0; i < str.length; i++) {
            data[i] = str.charCodeAt(i);
          }
          return [writer.ptr, data.length];
        } else {
          throw new ComponentModelTrap("Unsupported encoding");
        }
      }
      class Error2 extends ResultError {
        constructor(value) {
          super(value, `Error value: ${value}`);
        }
      }
      wstring3.Error = Error2;
    })(wstring2 || (exports.wstring = wstring2 = {}));
    ComponentModelType.satisfies(wstring2);
    var ListType = class _ListType {
      static offsets = {
        data: 0,
        length: 4
      };
      elementType;
      kind;
      size;
      alignment;
      flatTypes;
      constructor(elementType) {
        this.elementType = elementType;
        this.kind = ComponentModelTypeKind.list;
        this.size = 8;
        this.alignment = Alignment.word;
        this.flatTypes = [$i32, $i32];
      }
      load(memRange, offset, context) {
        const offsets = _ListType.offsets;
        const dataPtr = memRange.getUint32(offset + offsets.data);
        const length = memRange.getUint32(offset + offsets.length);
        return this.loadFromRange(memRange.memory.readonly(dataPtr, length * this.elementType.size), length, context);
      }
      liftFlat(memory, values, context) {
        const dataPtr = values.next().value;
        const length = values.next().value;
        return this.loadFromRange(memory.readonly(dataPtr, length * this.elementType.size), length, context);
      }
      alloc(memory) {
        return memory.alloc(this.alignment, this.size);
      }
      store(memRange, offset, values, context) {
        const elementMemory = memRange.memory.alloc(this.elementType.alignment, this.elementType.size * values.length);
        this.storeIntoRange(elementMemory, values, context);
        const offsets = _ListType.offsets;
        memRange.setUint32(offset + offsets.data, elementMemory.ptr);
        memRange.setUint32(offset + offsets.length, values.length);
      }
      lowerFlat(result2, memory, values, context) {
        const elementMemory = memory.alloc(this.elementType.alignment, this.elementType.size * values.length);
        this.storeIntoRange(elementMemory, values, context);
        result2.push(elementMemory.ptr, values.length);
      }
      copy(dest, dest_offset, src, src_offset) {
        dest.assertAlignment(dest_offset, this.alignment);
        src.assertAlignment(src_offset, this.alignment);
        const offsets = _ListType.offsets;
        const data = src.getUint32(src_offset + offsets.data);
        const length = src.getUint32(src_offset + offsets.length);
        const byteLength = length * this.elementType.size;
        const srcReader = src.memory.readonly(data, byteLength);
        const destWriter = dest.memory.alloc(this.elementType.alignment, byteLength);
        srcReader.copyBytes(0, byteLength, destWriter, 0);
        dest.setUint32(dest_offset + offsets.data, destWriter.ptr);
        dest.setUint32(dest_offset + offsets.length, length);
      }
      copyFlat(result2, dest, values, src, _context) {
        const data = values.next().value;
        const length = values.next().value;
        const byteLength = length * this.elementType.size;
        const srcReader = src.readonly(data, byteLength);
        const destWriter = dest.alloc(this.elementType.alignment, byteLength);
        srcReader.copyBytes(0, byteLength, destWriter, 0);
        result2.push(destWriter.ptr, length);
      }
      loadFromRange(memory, length, context) {
        const result2 = [];
        let offset = 0;
        for (let i = 0; i < length; i++) {
          result2.push(this.elementType.load(memory, offset, context));
          offset += this.elementType.size;
        }
        return result2;
      }
      storeIntoRange(memory, values, context) {
        let offset = 0;
        for (const item of values) {
          this.elementType.store(memory, offset, item, context);
          offset += this.elementType.size;
        }
      }
    };
    exports.ListType = ListType;
    var list;
    (function(list2) {
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${JSON.stringify(cause)}`, cause);
        }
      }
      list2.Error = Error2;
    })(list || (exports.list = list = {}));
    var TypeArrayType = class _TypeArrayType {
      static offsets = {
        data: 0,
        length: 4
      };
      kind;
      size;
      alignment;
      flatTypes;
      elementType;
      constructor(elementType) {
        this.kind = ComponentModelTypeKind.list;
        this.size = 8;
        this.alignment = 4;
        this.flatTypes = [$i32, $i32];
        this.elementType = elementType;
      }
      load(memRange, offset) {
        const offsets = _TypeArrayType.offsets;
        const dataPtr = memRange.getUint32(offset + offsets.data);
        const length = memRange.getUint32(offset + offsets.length);
        return this.loadFromRange(memRange.memory.readonly(dataPtr, length * this.elementType.size), length);
      }
      liftFlat(memory, values) {
        const dataPtr = values.next().value;
        const length = values.next().value;
        return this.loadFromRange(memory.readonly(dataPtr, length * this.elementType.size), length);
      }
      alloc(memory) {
        return memory.alloc(this.alignment, this.size);
      }
      store(memRange, offset, value) {
        const writer = memRange.memory.alloc(this.elementType.alignment, value.byteLength);
        this.storeIntoRange(writer, value);
        const offsets = _TypeArrayType.offsets;
        memRange.setUint32(offset + offsets.data, writer.ptr);
        memRange.setUint32(offset + offsets.length, value.length);
      }
      lowerFlat(result2, memory, value) {
        const writer = memory.alloc(this.elementType.alignment, value.byteLength);
        this.storeIntoRange(writer, value);
        result2.push(writer.ptr, value.length);
      }
      copy(dest, dest_offset, src, src_offset) {
        dest.assertAlignment(dest_offset, this.alignment);
        src.assertAlignment(src_offset, this.alignment);
        const offsets = _TypeArrayType.offsets;
        const data = src.getUint32(src_offset + offsets.data);
        const length = src.getUint32(src_offset + offsets.length);
        const byteLength = length * this.elementType.size;
        const srcReader = src.memory.readonly(data, byteLength);
        const destWriter = dest.memory.alloc(this.elementType.alignment, byteLength);
        srcReader.copyBytes(0, byteLength, destWriter, 0);
        dest.setUint32(dest_offset + offsets.data, destWriter.ptr);
        dest.setUint32(dest_offset + offsets.length, length);
      }
      copyFlat(result2, dest, values, src, _context) {
        const data = values.next().value;
        const length = values.next().value;
        const byteLength = length * this.elementType.size;
        const srcReader = src.readonly(data, byteLength);
        const destWriter = dest.alloc(this.elementType.alignment, byteLength);
        srcReader.copyBytes(0, byteLength, destWriter, 0);
        result2.push(destWriter.ptr, length);
      }
    };
    var Int8ArrayType = class extends TypeArrayType {
      constructor() {
        super(s8);
      }
      loadFromRange(memory, length) {
        return memory.getInt8Array(0, length);
      }
      storeIntoRange(memory, value) {
        memory.setInt8Array(0, value);
      }
    };
    exports.Int8ArrayType = Int8ArrayType;
    (function(Int8ArrayType2) {
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${JSON.stringify(cause)}`, cause);
        }
      }
      Int8ArrayType2.Error = Error2;
    })(Int8ArrayType || (exports.Int8ArrayType = Int8ArrayType = {}));
    var Int16ArrayType = class extends TypeArrayType {
      constructor() {
        super(s16);
      }
      loadFromRange(memory, length) {
        return memory.getInt16Array(0, length);
      }
      storeIntoRange(memory, value) {
        memory.setInt16Array(0, value);
      }
    };
    exports.Int16ArrayType = Int16ArrayType;
    (function(Int16ArrayType2) {
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${JSON.stringify(cause)}`, cause);
        }
      }
      Int16ArrayType2.Error = Error2;
    })(Int16ArrayType || (exports.Int16ArrayType = Int16ArrayType = {}));
    var Int32ArrayType = class extends TypeArrayType {
      constructor() {
        super(s322);
      }
      loadFromRange(memory, length) {
        return memory.getInt32Array(0, length);
      }
      storeIntoRange(memory, value) {
        memory.setInt32Array(0, value);
      }
    };
    exports.Int32ArrayType = Int32ArrayType;
    (function(Int32ArrayType2) {
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${JSON.stringify(cause)}`, cause);
        }
      }
      Int32ArrayType2.Error = Error2;
    })(Int32ArrayType || (exports.Int32ArrayType = Int32ArrayType = {}));
    var BigInt64ArrayType = class extends TypeArrayType {
      constructor() {
        super(s64);
      }
      loadFromRange(memory, length) {
        return memory.getInt64Array(0, length);
      }
      storeIntoRange(memory, value) {
        memory.setInt64Array(0, value);
      }
    };
    exports.BigInt64ArrayType = BigInt64ArrayType;
    (function(BigInt64ArrayType2) {
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${JSON.stringify(cause)}`, cause);
        }
      }
      BigInt64ArrayType2.Error = Error2;
    })(BigInt64ArrayType || (exports.BigInt64ArrayType = BigInt64ArrayType = {}));
    var Uint8ArrayType2 = class extends TypeArrayType {
      constructor() {
        super(u8);
      }
      loadFromRange(memory, length) {
        return memory.getUint8Array(0, length);
      }
      storeIntoRange(memory, value) {
        memory.setUint8Array(0, value);
      }
    };
    exports.Uint8ArrayType = Uint8ArrayType2;
    (function(Uint8ArrayType3) {
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${JSON.stringify(cause)}`, cause);
        }
      }
      Uint8ArrayType3.Error = Error2;
    })(Uint8ArrayType2 || (exports.Uint8ArrayType = Uint8ArrayType2 = {}));
    var Uint16ArrayType = class extends TypeArrayType {
      constructor() {
        super(u16);
      }
      loadFromRange(memory, length) {
        return memory.getUint16Array(0, length);
      }
      storeIntoRange(memory, value) {
        memory.setUint16Array(0, value);
      }
    };
    exports.Uint16ArrayType = Uint16ArrayType;
    (function(Uint16ArrayType2) {
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${JSON.stringify(cause)}`, cause);
        }
      }
      Uint16ArrayType2.Error = Error2;
    })(Uint16ArrayType || (exports.Uint16ArrayType = Uint16ArrayType = {}));
    var Uint32ArrayType2 = class extends TypeArrayType {
      constructor() {
        super(u322);
      }
      loadFromRange(memory, length) {
        return memory.getUint32Array(0, length);
      }
      storeIntoRange(memory, value) {
        memory.setUint32Array(0, value);
      }
    };
    exports.Uint32ArrayType = Uint32ArrayType2;
    (function(Uint32ArrayType3) {
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${JSON.stringify(cause)}`, cause);
        }
      }
      Uint32ArrayType3.Error = Error2;
    })(Uint32ArrayType2 || (exports.Uint32ArrayType = Uint32ArrayType2 = {}));
    var BigUint64ArrayType = class extends TypeArrayType {
      constructor() {
        super(u642);
      }
      loadFromRange(memory, length) {
        return memory.getUint64Array(0, length);
      }
      storeIntoRange(memory, value) {
        memory.setUint64Array(0, value);
      }
    };
    exports.BigUint64ArrayType = BigUint64ArrayType;
    (function(BigUint64ArrayType2) {
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${JSON.stringify(cause)}`, cause);
        }
      }
      BigUint64ArrayType2.Error = Error2;
    })(BigUint64ArrayType || (exports.BigUint64ArrayType = BigUint64ArrayType = {}));
    var Float32ArrayType = class extends TypeArrayType {
      constructor() {
        super(float32);
      }
      loadFromRange(memory, length) {
        return memory.getFloat32Array(0, length);
      }
      storeIntoRange(memory, value) {
        memory.setFloat32Array(0, value);
      }
    };
    exports.Float32ArrayType = Float32ArrayType;
    (function(Float32ArrayType2) {
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${JSON.stringify(cause)}`, cause);
        }
      }
      Float32ArrayType2.Error = Error2;
    })(Float32ArrayType || (exports.Float32ArrayType = Float32ArrayType = {}));
    var Float64ArrayType = class extends TypeArrayType {
      constructor() {
        super(float642);
      }
      loadFromRange(memory, length) {
        return memory.getFloat64Array(0, length);
      }
      storeIntoRange(memory, value) {
        memory.setFloat64Array(0, value);
      }
    };
    exports.Float64ArrayType = Float64ArrayType;
    (function(Float64ArrayType2) {
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${JSON.stringify(cause)}`, cause);
        }
      }
      Float64ArrayType2.Error = Error2;
    })(Float64ArrayType || (exports.Float64ArrayType = Float64ArrayType = {}));
    var BaseRecordType = class _BaseRecordType {
      fields;
      kind;
      size;
      alignment;
      flatTypes;
      constructor(fields, kind) {
        this.fields = fields;
        this.kind = kind;
        this.alignment = _BaseRecordType.alignment(fields);
        this.size = _BaseRecordType.size(fields, this.alignment);
        this.flatTypes = _BaseRecordType.flatTypes(fields);
      }
      load(memory, offset, context) {
        memory.assertAlignment(offset, this.alignment);
        const result2 = [];
        for (const field of this.fields) {
          offset = align(offset, field.type.alignment);
          result2.push(field.type.load(memory, offset, context));
          offset += field.type.size;
        }
        return this.create(this.fields, result2);
      }
      liftFlat(memory, values, context) {
        const result2 = [];
        for (const field of this.fields) {
          result2.push(field.type.liftFlat(memory, values, context));
        }
        return this.create(this.fields, result2);
      }
      alloc(memory) {
        return memory.alloc(this.alignment, this.size);
      }
      store(memory, offset, record, context) {
        memory.assertAlignment(offset, this.alignment);
        const values = this.elements(record, this.fields);
        for (let i = 0; i < this.fields.length; i++) {
          const field = this.fields[i];
          const value = values[i];
          offset = align(offset, field.type.alignment);
          field.type.store(memory, offset, value, context);
          offset += field.type.size;
        }
      }
      lowerFlat(result2, memory, record, context) {
        const values = this.elements(record, this.fields);
        for (let i = 0; i < this.fields.length; i++) {
          const field = this.fields[i];
          const value = values[i];
          field.type.lowerFlat(result2, memory, value, context);
        }
      }
      copy(dest, dest_offset, src, src_offset, context) {
        for (const field of this.fields) {
          dest_offset = align(dest_offset, field.type.alignment);
          src_offset = align(src_offset, field.type.alignment);
          field.type.copy(dest, dest_offset, src, src_offset, context);
          dest_offset += field.type.size;
          src_offset += field.type.size;
        }
      }
      copyFlat(result2, dest, values, src, context) {
        for (const field of this.fields) {
          field.type.copyFlat(result2, dest, values, src, context);
        }
      }
      static size(fields, recordAlignment) {
        let result2 = 0;
        for (const field of fields) {
          result2 = align(result2, field.type.alignment);
          result2 += field.type.size;
        }
        return align(result2, recordAlignment);
      }
      static alignment(fields) {
        let result2 = 1;
        for (const field of fields) {
          result2 = Math.max(result2, field.type.alignment);
        }
        return result2;
      }
      static flatTypes(fields) {
        const result2 = [];
        for (const field of fields) {
          result2.push(...field.type.flatTypes);
        }
        return result2;
      }
    };
    var RecordField;
    (function(RecordField2) {
      function create(name, type) {
        return { name, type };
      }
      RecordField2.create = create;
    })(RecordField || (RecordField = {}));
    var RecordType2 = class extends BaseRecordType {
      constructor(fields) {
        const recordFields = [];
        for (const [name, type] of fields) {
          recordFields.push(RecordField.create(name, type));
        }
        super(recordFields, ComponentModelTypeKind.record);
      }
      create(fields, values) {
        const result2 = {};
        for (let i = 0; i < fields.length; i++) {
          const field = fields[i];
          const value = values[i];
          result2[field.name] = value;
        }
        return result2;
      }
      elements(record, fields) {
        const result2 = [];
        for (const field of fields) {
          const value = record[field.name];
          result2.push(value);
        }
        return result2;
      }
    };
    exports.RecordType = RecordType2;
    var TupleField;
    (function(TupleField2) {
      function create(type) {
        return { type };
      }
      TupleField2.create = create;
    })(TupleField || (TupleField = {}));
    var TupleType = class extends BaseRecordType {
      constructor(fields) {
        const tupleFields = [];
        for (const type of fields) {
          tupleFields.push(TupleField.create(type));
        }
        super(tupleFields, ComponentModelTypeKind.tuple);
      }
      create(_fields, values) {
        return values;
      }
      elements(record, _fields) {
        return record;
      }
    };
    exports.TupleType = TupleType;
    var tuple;
    (function(tuple2) {
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${JSON.stringify(cause)}`, cause);
        }
      }
      tuple2.Error = Error2;
    })(tuple || (exports.tuple = tuple = {}));
    var FlagsType = class _FlagsType {
      type;
      arraySize;
      kind;
      size;
      alignment;
      flatTypes;
      constructor(numberOfFlags) {
        this.kind = ComponentModelTypeKind.flags;
        this.size = _FlagsType.size(numberOfFlags);
        this.alignment = _FlagsType.alignment(numberOfFlags);
        this.flatTypes = _FlagsType.flatTypes(numberOfFlags);
        this.type = _FlagsType.getType(numberOfFlags);
        this.arraySize = _FlagsType.num32Flags(numberOfFlags);
      }
      load(memory, offset, context) {
        return this.type === void 0 ? 0 : this.loadFrom(this.type.load(memory, offset, context));
      }
      liftFlat(memory, values, context) {
        return this.type === void 0 ? 0 : this.loadFrom(this.type.liftFlat(memory, values, context));
      }
      loadFrom(value) {
        if (typeof value === "number") {
          return value;
        } else {
          let result2 = 0n;
          for (let f = 0, i = value.length - 1; f < value.length; f++, i--) {
            const bits = value[i];
            result2 = result2 | BigInt(bits) << BigInt(f * 32);
          }
          return result2;
        }
      }
      alloc(memory) {
        return memory.alloc(this.alignment, this.size);
      }
      store(memory, offset, flags, context) {
        if (this.type !== void 0) {
          this.type.store(memory, offset, this.storeInto(flags), context);
        }
      }
      lowerFlat(result2, _memory, flags, context) {
        if (this.type !== void 0) {
          this.type.lowerFlat(result2, _memory, this.storeInto(flags), context);
        }
      }
      copy(dest, dest_offset, src, src_offset, context) {
        if (this.type !== void 0) {
          this.type.copy(dest, dest_offset, src, src_offset, context);
        }
      }
      copyFlat(result2, dest, values, src, context) {
        if (this.type !== void 0) {
          this.type.copyFlat(result2, dest, values, src, context);
        }
      }
      storeInto(value) {
        if (typeof value === "number") {
          return value;
        } else {
          const result2 = new Array(this.arraySize).fill(0);
          for (let f = 0, i = result2.length - 1; f < result2.length; f++, i--) {
            const bits = Number(value >> BigInt(f * 32) & BigInt(4294967295));
            result2[i] = bits;
          }
          return result2;
        }
      }
      static size(numberOfFlags) {
        if (numberOfFlags === 0) {
          return 0;
        } else if (numberOfFlags <= 8) {
          return 1;
        } else if (numberOfFlags <= 16) {
          return 2;
        } else {
          return 4 * this.num32Flags(numberOfFlags);
        }
      }
      static alignment(numberOfFlags) {
        if (numberOfFlags <= 8) {
          return 1;
        } else if (numberOfFlags <= 16) {
          return 2;
        } else {
          return 4;
        }
      }
      static getType(numberOfFlags) {
        if (numberOfFlags === 0) {
          return void 0;
        } else if (numberOfFlags <= 8) {
          return u8;
        } else if (numberOfFlags <= 16) {
          return u16;
        } else if (numberOfFlags <= 32) {
          return u322;
        } else {
          return new TupleType(new Array(this.num32Flags(numberOfFlags)).fill(u322));
        }
      }
      static flatTypes(numberOfFlags) {
        return new Array(this.num32Flags(numberOfFlags)).fill($i32);
      }
      static num32Flags(numberOfFlags) {
        return Math.ceil(numberOfFlags / 32);
      }
    };
    exports.FlagsType = FlagsType;
    var VariantCase;
    (function(VariantCase2) {
      function create(index, tag, type) {
        return { index, tag, type, wantFlatTypes: type !== void 0 ? [] : void 0 };
      }
      VariantCase2.create = create;
    })(VariantCase || (VariantCase = {}));
    var VariantType = class _VariantType {
      cases;
      case2Index;
      ctor;
      discriminantType;
      maxCaseAlignment;
      kind;
      size;
      alignment;
      flatTypes;
      constructor(variants, ctor, kind = ComponentModelTypeKind.variant) {
        const cases = [];
        this.case2Index = /* @__PURE__ */ new Map();
        for (let i = 0; i < variants.length; i++) {
          const type = variants[i][1];
          const name = variants[i][0];
          this.case2Index.set(name, i);
          cases.push(VariantCase.create(i, name, type));
        }
        this.cases = cases;
        this.ctor = ctor;
        this.discriminantType = _VariantType.discriminantType(cases.length);
        this.maxCaseAlignment = _VariantType.maxCaseAlignment(cases);
        this.kind = kind;
        this.size = _VariantType.size(this.discriminantType, cases);
        this.alignment = _VariantType.alignment(this.discriminantType, cases);
        this.flatTypes = _VariantType.flatTypes(this.discriminantType, cases);
      }
      load(memory, offset, context) {
        const caseIndex = this.discriminantType.load(memory, offset);
        const caseVariant = this.cases[caseIndex];
        if (caseVariant.type === void 0) {
          return this.ctor(caseVariant.tag, void 0);
        } else {
          offset += this.discriminantType.size;
          offset = align(offset, this.maxCaseAlignment);
          const value = caseVariant.type.load(memory, offset, context);
          return this.ctor(caseVariant.tag, value);
        }
      }
      liftFlat(memory, values, context) {
        let valuesToReadOver = this.flatTypes.length - 1;
        const caseIndex = this.discriminantType.liftFlat(memory, values);
        const caseVariant = this.cases[caseIndex];
        let result2;
        if (caseVariant.type === void 0) {
          result2 = this.ctor(caseVariant.tag, void 0);
        } else {
          const wantFlatTypes = caseVariant.wantFlatTypes;
          const iter = new CoerceValueIter(values, this.flatTypes.slice(1), wantFlatTypes);
          const value = caseVariant.type.liftFlat(memory, iter, context);
          result2 = this.ctor(caseVariant.tag, value);
          valuesToReadOver = valuesToReadOver - wantFlatTypes.length;
        }
        for (let i = 0; i < valuesToReadOver; i++) {
          values.next();
        }
        return result2;
      }
      alloc(memory) {
        return memory.alloc(this.alignment, this.size);
      }
      store(memory, offset, variantValue, context) {
        const index = this.case2Index.get(variantValue.tag);
        if (index === void 0) {
          throw new ComponentModelTrap(`Variant case ${variantValue.tag} not found`);
        }
        this.discriminantType.store(memory, offset, index);
        offset += this.discriminantType.size;
        const c = this.cases[index];
        if (c.type !== void 0 && variantValue.value !== void 0) {
          offset = align(offset, this.maxCaseAlignment);
          c.type.store(memory, offset, variantValue.value, context);
        }
      }
      lowerFlat(result2, memory, variantValue, context) {
        const flatTypes = this.flatTypes;
        const index = this.case2Index.get(variantValue.tag);
        if (index === void 0) {
          throw new ComponentModelTrap(`Variant case ${variantValue.tag} not found`);
        }
        this.discriminantType.lowerFlat(result2, memory, index);
        const c = this.cases[index];
        let valuesToFill = this.flatTypes.length - 1;
        if (c.type !== void 0 && variantValue.value !== void 0) {
          const payload = [];
          c.type.lowerFlat(payload, memory, variantValue.value, context);
          const wantTypes = flatTypes.slice(1);
          const haveTypes = c.wantFlatTypes;
          if (payload.length !== haveTypes.length) {
            throw new ComponentModelTrap("Mismatched flat types");
          }
          for (let i = 0; i < wantTypes.length; i++) {
            const have = haveTypes[i];
            const want = wantTypes[i];
            if (have === $f32 && want === $i32) {
              payload[i] = WasmTypes.reinterpret_f32_as_i32(payload[i]);
            } else if (have === $i32 && want === $i64) {
              payload[i] = WasmTypes.convert_i32_to_i64(payload[i]);
            } else if (have === $f32 && want === $i64) {
              payload[i] = WasmTypes.reinterpret_f32_as_i64(payload[i]);
            } else if (have === $f64 && want === $i64) {
              payload[i] = WasmTypes.reinterpret_f64_as_i64(payload[i]);
            }
          }
          valuesToFill = valuesToFill - payload.length;
          result2.push(...payload);
        }
        for (let i = flatTypes.length - valuesToFill; i < flatTypes.length; i++) {
          const type = flatTypes[i];
          if (type === $i64) {
            result2.push(0n);
          } else {
            result2.push(0);
          }
        }
      }
      copy(dest, dest_offset, src, src_offset, context) {
        this.discriminantType.copy(dest, dest_offset, src, src_offset);
        const caseIndex = this.discriminantType.load(src, src_offset);
        const caseVariant = this.cases[caseIndex];
        if (caseVariant.type === void 0) {
          return;
        }
        src_offset += this.discriminantType.size;
        src_offset = align(src_offset, this.maxCaseAlignment);
        dest_offset += this.discriminantType.size;
        dest_offset = align(dest_offset, this.maxCaseAlignment);
        caseVariant.type.copy(dest, dest_offset, src, src_offset, context);
      }
      copyFlat(result2, dest, values, src, context) {
        let valuesToCopy = this.flatTypes.length - 1;
        this.discriminantType.copyFlat(result2, dest, values, src);
        const caseIndex = result2[result2.length - 1];
        const caseVariant = this.cases[caseIndex];
        if (caseVariant.type !== void 0) {
          const wantFlatTypes = caseVariant.wantFlatTypes;
          const iter = new CoerceValueIter(values, this.flatTypes.slice(1), wantFlatTypes);
          caseVariant.type.copyFlat(result2, dest, iter, src, context);
          valuesToCopy = valuesToCopy - wantFlatTypes.length;
        }
        for (let i = 0; i < valuesToCopy; i++) {
          result2.push(values.next().value);
        }
      }
      static size(discriminantType, cases) {
        let result2 = discriminantType.size;
        result2 = align(result2, this.maxCaseAlignment(cases));
        return result2 + this.maxCaseSize(cases);
      }
      static alignment(discriminantType, cases) {
        return Math.max(discriminantType.alignment, this.maxCaseAlignment(cases));
      }
      static flatTypes(discriminantType, cases) {
        const flat = [];
        for (const c of cases) {
          if (c.type === void 0) {
            continue;
          }
          const flatTypes = c.type.flatTypes;
          for (let i = 0; i < flatTypes.length; i++) {
            const want = flatTypes[i];
            if (i < flat.length) {
              const use = this.joinFlatType(flat[i], want);
              flat[i] = use;
              c.wantFlatTypes.push(want);
            } else {
              flat.push(want);
              c.wantFlatTypes.push(want);
            }
          }
        }
        return [...discriminantType.flatTypes, ...flat];
      }
      static discriminantType(cases) {
        switch (Math.ceil(Math.log2(cases) / 8)) {
          case 0:
            return u8;
          case 1:
            return u8;
          case 2:
            return u16;
          case 3:
            return u322;
        }
        throw new ComponentModelTrap(`Too many cases: ${cases}`);
      }
      static maxCaseAlignment(cases) {
        let result2 = 1;
        for (const c of cases) {
          if (c.type !== void 0) {
            result2 = Math.max(result2, c.type.alignment);
          }
        }
        return result2;
      }
      static maxCaseSize(cases) {
        let result2 = 0;
        for (const c of cases) {
          if (c.type !== void 0) {
            result2 = Math.max(result2, c.type.size);
          }
        }
        return result2;
      }
      static joinFlatType(a, b) {
        if (a === b) {
          return a;
        }
        if (a === $i32 && b === $f32 || a === $f32 && b === $i32) {
          return $i32;
        }
        return $i64;
      }
    };
    exports.VariantType = VariantType;
    var EnumType = class _EnumType {
      discriminantType;
      cases;
      case2index;
      kind;
      size;
      alignment;
      flatTypes;
      constructor(cases) {
        this.discriminantType = _EnumType.discriminantType(cases.length);
        this.cases = cases;
        this.case2index = /* @__PURE__ */ new Map();
        for (let i = 0; i < cases.length; i++) {
          const c = cases[i];
          this.case2index.set(c, i);
        }
        this.kind = ComponentModelTypeKind.enum;
        this.size = this.discriminantType.size;
        this.alignment = this.discriminantType.alignment;
        this.flatTypes = this.discriminantType.flatTypes;
      }
      load(memory, offset, context) {
        const index = this.assertRange(this.discriminantType.load(memory, offset, context));
        return this.cases[index];
      }
      liftFlat(memory, values, context) {
        const index = this.assertRange(this.discriminantType.liftFlat(memory, values, context));
        return this.cases[index];
      }
      alloc(memory) {
        return memory.alloc(this.alignment, this.size);
      }
      store(memory, offset, value, context) {
        const index = this.case2index.get(value);
        if (index === void 0) {
          throw new ComponentModelTrap("Enumeration value not found");
        }
        this.discriminantType.store(memory, offset, index, context);
      }
      lowerFlat(result2, memory, value, context) {
        const index = this.case2index.get(value);
        if (index === void 0) {
          throw new ComponentModelTrap("Enumeration value not found");
        }
        this.discriminantType.lowerFlat(result2, memory, index, context);
      }
      copy(dest, dest_offset, src, src_offset, context) {
        this.discriminantType.copy(dest, dest_offset, src, src_offset, context);
      }
      copyFlat(result2, dest, values, src, context) {
        this.discriminantType.copyFlat(result2, dest, values, src, context);
      }
      assertRange(value) {
        if (value < 0 || value > this.cases.length) {
          throw new ComponentModelTrap("Enumeration value out of range");
        }
        return value;
      }
      static discriminantType(cases) {
        switch (Math.ceil(Math.log2(cases) / 8)) {
          case 0:
            return u8;
          case 1:
            return u8;
          case 2:
            return u16;
          case 3:
            return u322;
        }
        throw new ComponentModelTrap(`Too many cases: ${cases}`);
      }
    };
    exports.EnumType = EnumType;
    var option;
    (function(option2) {
      option2.none = "none";
      function None() {
        return new OptionImpl(option2.none, void 0);
      }
      option2.None = None;
      option2.some = "some";
      function Some(value) {
        return new OptionImpl(option2.some, value);
      }
      option2.Some = Some;
      function _ctor(c, v) {
        return new OptionImpl(c, v);
      }
      option2._ctor = _ctor;
      function isOption(value) {
        return value instanceof OptionImpl;
      }
      option2.isOption = isOption;
      class OptionImpl {
        _tag;
        _value;
        constructor(tag, value) {
          this._tag = tag;
          this._value = value;
        }
        get tag() {
          return this._tag;
        }
        get value() {
          return this._value;
        }
        isNone() {
          return this._tag === option2.none;
        }
        isSome() {
          return this._tag === option2.some;
        }
      }
      class Error2 extends ResultError {
        constructor(cause) {
          super(`Error value: ${JSON.stringify(cause)}`, cause);
        }
      }
      option2.Error = Error2;
    })(option || (exports.option = option = {}));
    var OptionType = class {
      valueType;
      kind;
      size;
      alignment;
      flatTypes;
      constructor(valueType) {
        this.valueType = valueType;
        this.kind = ComponentModelTypeKind.option;
        this.size = this.computeSize();
        this.alignment = this.computeAlignment();
        this.flatTypes = this.computeFlatTypes();
      }
      load(memory, offset, context) {
        const caseIndex = u8.load(memory, offset);
        if (caseIndex === 0) {
          return context.options.keepOption ? option._ctor(option.none, void 0) : void 0;
        } else {
          offset += u8.size;
          offset = align(offset, this.alignment);
          const value = this.valueType.load(memory, offset, context);
          return context.options.keepOption ? option._ctor(option.some, value) : value;
        }
      }
      liftFlat(memory, values, context) {
        const caseIndex = u8.liftFlat(memory, values);
        if (caseIndex === 0) {
          for (let i = 0; i < this.valueType.flatTypes.length; i++) {
            values.next();
          }
          return context.options.keepOption ? option._ctor(option.none, void 0) : void 0;
        } else {
          const value = this.valueType.liftFlat(memory, values, context);
          return context.options.keepOption ? option._ctor(option.some, value) : value;
        }
      }
      alloc(memory) {
        return memory.alloc(this.alignment, this.size);
      }
      store(memory, offset, value, context) {
        const optValue = this.asOptionValue(value, context.options);
        const index = optValue.tag === option.none ? 0 : 1;
        u8.store(memory, offset, index);
        offset += u8.size;
        if (optValue.tag === option.some) {
          offset = align(offset, this.valueType.alignment);
          this.valueType.store(memory, offset, optValue.value, context);
        }
      }
      lowerFlat(result2, memory, value, context) {
        const optValue = this.asOptionValue(value, context.options);
        const index = optValue.tag === option.none ? 0 : 1;
        u8.lowerFlat(result2, memory, index);
        if (optValue.tag === option.none) {
          for (const type of this.valueType.flatTypes) {
            if (type === $i64) {
              result2.push(0n);
            } else {
              result2.push(0);
            }
          }
        } else {
          this.valueType.lowerFlat(result2, memory, optValue.value, context);
        }
      }
      copy(dest, dest_offset, src, src_offset, context) {
        u8.copy(dest, dest_offset, src, src_offset);
        const caseIndex = u8.load(src, src_offset);
        if (caseIndex === 0) {
          return;
        } else {
          src_offset += u8.size;
          src_offset = align(src_offset, this.alignment);
          dest_offset += u8.size;
          dest_offset = align(dest_offset, this.alignment);
          this.valueType.copy(dest, dest_offset, src, src_offset, context);
        }
      }
      copyFlat(result2, dest, values, src, context) {
        u8.copyFlat(result2, dest, values, src);
        const caseIndex = result2[result2.length - 1];
        if (caseIndex === 0) {
          for (const _type of this.valueType.flatTypes) {
            result2.push(values.next().value);
          }
        } else {
          this.valueType.copyFlat(result2, dest, values, src, context);
        }
      }
      asOptionValue(value, options) {
        if (option.isOption(value)) {
          if (!options.keepOption) {
            throw new ComponentModelTrap("Received an option value although options should be unpacked.");
          }
          return value;
        } else {
          if (options.keepOption) {
            throw new ComponentModelTrap("Received a unpacked option value although options should NOT be unpacked.");
          }
          return value === void 0 ? option._ctor(option.none, void 0) : option._ctor(option.some, value);
        }
      }
      computeSize() {
        let result2 = u8.size;
        result2 = align(result2, this.valueType.alignment);
        return result2 + this.valueType.size;
      }
      computeAlignment() {
        return Math.max(u8.alignment, this.valueType.alignment);
      }
      computeFlatTypes() {
        return [...u8.flatTypes, ...this.valueType.flatTypes];
      }
    };
    exports.OptionType = OptionType;
    var result;
    (function(result2) {
      result2.ok = "ok";
      function Ok(value) {
        return new ResultImpl(result2.ok, value);
      }
      result2.Ok = Ok;
      result2.error = "error";
      function Error2(value) {
        return new ResultImpl(result2.error, value);
      }
      result2.Error = Error2;
      function _ctor(c, v) {
        return new ResultImpl(c, v);
      }
      result2._ctor = _ctor;
      class ResultImpl {
        _tag;
        _value;
        constructor(tag, value) {
          this._tag = tag;
          this._value = value;
        }
        get tag() {
          return this._tag;
        }
        get value() {
          return this._value;
        }
        isOk() {
          return this._tag === result2.ok;
        }
        isError() {
          return this._tag === result2.error;
        }
      }
      result2.ResultImpl = ResultImpl;
    })(result || (exports.result = result = {}));
    var ResultType = class extends VariantType {
      _errorClass;
      constructor(okType, errorType, errorClass) {
        super([["ok", okType], ["error", errorType]], result._ctor, ComponentModelTypeKind.result);
        this._errorClass = errorClass;
      }
      get errorClass() {
        return this._errorClass;
      }
    };
    exports.ResultType = ResultType;
    var Resource;
    (function(Resource2) {
      class Default {
        _handle;
        constructor(handleOrManager) {
          if (typeof handleOrManager === "number") {
            this._handle = handleOrManager;
          } else {
            this._handle = handleOrManager.registerResource(this);
          }
        }
        $handle() {
          return this._handle;
        }
      }
      Resource2.Default = Default;
      function getRepresentation(resource) {
        return typeof resource.$rep === "function" ? resource.$rep() : void 0;
      }
      Resource2.getRepresentation = getRepresentation;
    })(Resource || (exports.Resource = Resource = {}));
    var ResourceManager;
    (function(ResourceManager2) {
      ResourceManager2.handleTag = Symbol("handleTag");
      class Default {
        handleCounter;
        handleTable;
        h2r;
        finalizer;
        ctor;
        dtor;
        // We only need the representation counter for the loop implementation.
        // To make them distinguishable from handles or normal representations we
        // start with MaxValue and decrement it for each new representation.
        representationCounter;
        loopTable;
        constructor() {
          this.handleCounter = 1;
          this.handleTable = /* @__PURE__ */ new Map();
          this.h2r = /* @__PURE__ */ new Map();
          this.finalizer = new FinalizationRegistry((value) => {
            const { handle, rep } = value;
            try {
              this.dtor(rep);
            } catch (error) {
              (0, ral_1.default)().console.error(error);
            }
            this.h2r.delete(handle);
            this.handleTable.delete(handle);
            this.loopTable?.delete(rep);
          });
          this.representationCounter = Number.MAX_VALUE;
          this.loopTable = void 0;
        }
        newHandle(rep) {
          const handle = this.handleCounter++;
          this.handleTable.set(handle, rep);
          return handle;
        }
        getRepresentation(handle) {
          const rep = this.handleTable.get(handle);
          if (rep === void 0) {
            throw new ComponentModelTrap(`No representation registered for resource handle ${handle}`);
          }
          return rep;
        }
        dropHandle(handle) {
          const rep = this.handleTable.get(handle);
          if (rep === void 0) {
            throw new ComponentModelTrap(`Unknown resource handle ${handle}`);
          }
          if (this.dtor !== void 0) {
            this.dtor(rep);
          }
          this.handleTable.delete(handle);
          return rep;
        }
        setProxyInfo(ctor, dtor) {
          this.ctor = ctor;
          this.dtor = dtor;
        }
        hasResource(handle) {
          return this.h2r.has(handle);
        }
        getResource(handle) {
          const value = this.h2r.get(handle);
          if (value !== void 0) {
            if (value instanceof WeakRef) {
              const unwrapped = value.deref();
              if (unwrapped === void 0) {
                throw new ComponentModelTrap(`Resource for handle ${handle} has been collected.`);
              }
              return unwrapped;
            } else {
              return value;
            }
          }
          const rep = this.handleTable.get(handle);
          if (rep !== void 0) {
            if (this.ctor === void 0) {
              throw new ComponentModelTrap(`No proxy constructor set`);
            }
            const proxy = new this.ctor(ResourceManager2.handleTag, handle, rep);
            this.setProxy(handle, rep, proxy);
            return proxy;
          } else {
            throw new ComponentModelTrap(`Unknown resource handle ${handle}`);
          }
        }
        registerResource(resource, handle) {
          if (handle !== void 0) {
            if (handle >= this.handleCounter) {
              throw new ComponentModelTrap(`Handle ${handle} is out of bounds. Current handle counter is ${this.handleCounter}.`);
            }
            if (this.h2r.has(handle)) {
              throw new ComponentModelTrap(`Handle ${handle} is already registered.`);
            }
            if (this.handleTable.has(handle)) {
              throw new ComponentModelTrap(`Handle ${handle} is already in use as a proxy handle.`);
            }
          } else {
            handle = this.handleCounter++;
          }
          this.h2r.set(handle, resource);
          return handle;
        }
        registerProxy(proxy) {
          const handle = proxy.$handle();
          const rep = Resource.getRepresentation(proxy) ?? this.handleTable.get(handle);
          if (rep === void 0) {
            throw new ComponentModelTrap(`Unknown proxy handle ${handle}`);
          }
          this.setProxy(handle, rep, proxy);
        }
        removeResource(value) {
          const handle = typeof value === "number" ? value : value.$handle();
          const resource = this.h2r.get(handle);
          if (resource === void 0) {
            throw new ComponentModelTrap(`Unknown resource handle ${handle}.`);
          }
          if (resource instanceof WeakRef) {
            throw new ComponentModelTrap(`Proxy resources should not be removed manually. They are removed via the GC.`);
          }
          this.h2r.delete(handle);
        }
        registerLoop(handle) {
          if (this.loopTable === void 0) {
            this.loopTable = /* @__PURE__ */ new Map();
          }
          const result2 = this.handleCounter++;
          const representation = this.representationCounter--;
          this.handleTable.set(result2, representation);
          this.loopTable.set(representation, handle);
          return result2;
        }
        getLoop(rep) {
          const result2 = this.loopTable?.get(rep);
          if (result2 === void 0) {
            throw new ComponentModelTrap(`Unknown loop handle for representation ${rep}`);
          }
          return result2;
        }
        setProxy(handle, rep, proxy) {
          if (this.dtor === void 0) {
            throw new ComponentModelTrap(`No proxy destructor set`);
          }
          this.h2r.set(handle, new WeakRef(proxy));
          this.finalizer.register(proxy, { handle, rep }, proxy);
        }
      }
      ResourceManager2.Default = Default;
      function from(obj) {
        if (obj === void 0) {
          return void 0;
        }
        return obj.$resources ?? obj.$resourceManager ?? obj.$manager;
      }
      ResourceManager2.from = from;
    })(ResourceManager || (exports.ResourceManager = ResourceManager = {}));
    var ResourceManagers;
    (function(ResourceManagers2) {
      class Default {
        managers;
        constructor() {
          this.managers = /* @__PURE__ */ new Map();
        }
        has(id) {
          return this.managers.has(id);
        }
        set(id, manager) {
          if (this.managers.has(id)) {
            throw new ComponentModelTrap(`Resource manager ${id} already registered.`);
          }
          this.managers.set(id, manager);
        }
        ensure(id) {
          const manager = this.managers.get(id);
          if (manager === void 0) {
            throw new ComponentModelTrap(`Resource manager ${id} not found.`);
          }
          return manager;
        }
        get(id) {
          return this.managers.get(id);
        }
      }
      ResourceManagers2.Default = Default;
      function is(value) {
        const candidate = value;
        return candidate && typeof candidate.has === "function" && typeof candidate.ensure === "function" && typeof candidate.get === "function" && typeof candidate.set === "function";
      }
      ResourceManagers2.is = is;
    })(ResourceManagers || (exports.ResourceManagers = ResourceManagers = {}));
    var Callable = class _Callable {
      static EMPTY_JTYPE = Object.freeze([]);
      static EMPTY_WASM_TYPE = Object.freeze([]);
      static MAX_FLAT_PARAMS = 16;
      static MAX_FLAT_RESULTS = 1;
      witName;
      params;
      returnType;
      paramType;
      isSingleParam;
      mode;
      constructor(witName, params, returnType) {
        this.witName = witName;
        this.params = params;
        this.returnType = returnType;
        switch (params.length) {
          case 0:
            this.paramType = void 0;
            this.isSingleParam = false;
            break;
          case 1:
            this.paramType = params[0][1];
            this.isSingleParam = true;
            break;
          default:
            this.paramType = new TupleType(params.map((p) => p[1]));
            this.isSingleParam = false;
        }
        this.mode = "lower";
      }
      liftParamValues(wasmValues, memory, context) {
        if (this.paramType === void 0) {
          return _Callable.EMPTY_JTYPE;
        }
        let result2;
        if (this.paramType.flatTypes.length > _Callable.MAX_FLAT_PARAMS) {
          const p0 = wasmValues[0];
          if (!Number.isInteger(p0)) {
            throw new ComponentModelTrap("Invalid pointer");
          }
          result2 = this.paramType.load(memory.readonly(p0, this.paramType.size), 0, context);
        } else {
          result2 = this.paramType.liftFlat(memory, wasmValues.values(), context);
        }
        return this.isSingleParam ? [result2] : result2;
      }
      lowerParamValues(values, memory, context) {
        if (this.paramType === void 0) {
          return _Callable.EMPTY_WASM_TYPE;
        }
        if (this.isSingleParam && values.length !== 1) {
          throw new ComponentModelTrap(`Expected a single parameter, but got ${values.length}`);
        }
        const toLower = this.isSingleParam ? values[0] : values;
        if (this.paramType.flatTypes.length > _Callable.MAX_FLAT_PARAMS) {
          const writer = this.paramType.alloc(memory);
          this.paramType.store(writer, 0, toLower, context);
          return [writer.ptr];
        } else {
          const result2 = [];
          this.paramType.lowerFlat(result2, memory, toLower, context);
          return result2;
        }
      }
      copyParamValues(result2, dest, wasmValues, src, context) {
        const flatReturnTypes = this.returnType !== void 0 ? this.returnType.flatTypes.length : 0;
        const flatParamTypes = this.paramType !== void 0 ? this.paramType.flatTypes.length : 0;
        let out = void 0;
        if (flatReturnTypes > _Callable.MAX_FLAT_RESULTS) {
          if (wasmValues.length === flatParamTypes + 1) {
            const last = wasmValues[flatParamTypes];
            if (!Number.isInteger(last)) {
              throw new ComponentModelTrap(`Expected a pointer as return parameter, but got ${last}`);
            }
            out = last;
          }
        }
        if (this.paramType === void 0) {
          if (out === void 0 && wasmValues.length !== 0 || out !== void 0 && wasmValues.length !== 1) {
            throw new ComponentModelTrap(`Expected no parameters, but got ${wasmValues.length}`);
          }
        } else if (this.paramType.flatTypes.length > _Callable.MAX_FLAT_PARAMS) {
          const p0 = wasmValues[0];
          if (!Number.isInteger(p0)) {
            throw new ComponentModelTrap("Invalid pointer");
          }
          const srcReader = src.readonly(p0, this.paramType.size);
          this.paramType.copy(this.paramType.alloc(dest), 0, srcReader, 0, context);
        } else {
          this.paramType.copyFlat(result2, dest, wasmValues.values(), src, context);
        }
        if (out !== void 0 && this.returnType !== void 0) {
          const destResult = this.returnType.alloc(dest);
          result2.push(destResult.ptr);
          return { transferResult: destResult, originalResult: src.preAllocated(out, this.returnType.size) };
        } else {
          return void 0;
        }
      }
      lowerReturnValue(value, memory, context, out) {
        if (this.returnType === void 0) {
          return;
        }
        if (this.returnType.flatTypes.length <= _Callable.MAX_FLAT_RESULTS) {
          const result2 = [];
          this.returnType.lowerFlat(result2, memory, value, context);
          if (result2.length !== this.returnType.flatTypes.length) {
            throw new ComponentModelTrap(`Expected flat result of length ${this.returnType.flatTypes.length}, but got ${JSON.stringify(result2, void 0, void 0)}`);
          }
          return result2[0];
        } else {
          const writer = out !== void 0 ? memory.preAllocated(out, this.returnType.size) : this.returnType.alloc(memory);
          this.returnType.store(writer, 0, value, context);
          return out !== void 0 ? void 0 : writer.ptr;
        }
      }
      handleError(error, memory, context, out) {
        if (!(this.returnType instanceof ResultType) || this.returnType.errorClass === void 0 || !(error instanceof this.returnType.errorClass)) {
          throw error;
        }
        const value = result.Error(error.cause);
        return this.lowerReturnValue(value, memory, context, out);
      }
      copyReturnValue(resultStorage, dest, src, value, context) {
        if (resultStorage !== void 0) {
          if (this.returnType === void 0) {
            throw new ComponentModelTrap(`Result storage should not be set if there is no return type.`);
          }
          if (value !== void 0) {
            throw new ComponentModelTrap(`Can't use both result storage and result value ${value}.`);
          }
          this.returnType.copy(resultStorage.originalResult, 0, resultStorage.transferResult, 0, context);
          return void 0;
        } else if (value !== void 0) {
          if (this.returnType === void 0) {
            throw new ComponentModelTrap(`Expected no return value, but got ${value}`);
          }
          if (this.returnType.flatTypes.length > _Callable.MAX_FLAT_RESULTS) {
            if (!Number.isInteger(value)) {
              throw new ComponentModelTrap(`Expected a pointer as return value, but got ${value}`);
            }
            const destWriter = this.returnType.alloc(dest);
            this.returnType.copy(destWriter, 0, src.preAllocated(value, this.returnType.size), 0, context);
            return destWriter.ptr;
          } else {
            return value;
          }
        } else {
          return void 0;
        }
      }
      /**
       * Calls a function inside a wasm module.
       */
      callWasm(params, wasmFunction, context) {
        const memory = context.getMemory();
        const wasmValues = this.lowerParamValues(params, memory, context);
        const result2 = wasmFunction(...wasmValues);
        return this.liftReturnValue(result2, memory, context);
      }
      /**
       * Calls a resource method inside a wasm module.
       */
      callWasmMethod(obj, params, wasmFunction, context) {
        const memory = context.getMemory();
        const handle = obj.$rep();
        const wasmValues = this.lowerParamValues(params, memory, context);
        const result2 = wasmFunction(handle, ...wasmValues);
        return this.liftReturnValue(result2, memory, context);
      }
      /**
       * Call a host function on the main thread from a wasm module.
       */
      callMain(connection, qualifier, params, context) {
        connection.prepareCall();
        const newParams = [];
        const resultStorage = this.copyParamValues(newParams, connection.getMemory(), params, context.getMemory(), context);
        const result2 = connection.callMain(`${qualifier}#${this.witName}`, newParams);
        return this.copyReturnValue(resultStorage, context.getMemory(), connection.getMemory(), result2, context);
      }
      /**
       * Call a wasm function from a worker thread.
       */
      callWasmFromWorker(transferMemory, func, params, context) {
        const newParams = [];
        const resultStorage = this.copyParamValues(newParams, context.getMemory(), params, transferMemory, context);
        const result2 = func(...newParams);
        return this.copyReturnValue(resultStorage, transferMemory, context.getMemory(), result2, context);
      }
      /**
       * Call a wasm method from a worker thread.
       */
      callWasmMethodFromWorker(transferMemory, func, params, context) {
        const handle = params[0];
        if (typeof handle !== "number") {
          throw new ComponentModelTrap(`Expected a number as handle, but got ${handle}`);
        }
        const newParams = [];
        const resultStorage = this.copyParamValues(newParams, context.getMemory(), params.slice(1), transferMemory, context);
        const result2 = func(handle, ...newParams);
        return this.copyReturnValue(resultStorage, transferMemory, context.getMemory(), result2, context);
      }
      /**
       * Call the wasm function from the main thread.
       */
      async callWorker(connection, qualifier, params, context) {
        return connection.lock(async () => {
          connection.prepareCall();
          const memory = connection.getMemory();
          const wasmValues = this.lowerParamValues(params, memory, context);
          let result2 = await connection.callWorker(`${qualifier}#${this.witName}`, wasmValues);
          return this.liftReturnValue(result2, memory, context);
        });
      }
      /**
       * Call a resource method inside a wasm module.
       */
      async callWorkerMethod(connection, qualifier, obj, params, context) {
        return connection.lock(async () => {
          connection.prepareCall();
          const memory = connection.getMemory();
          const handle = obj.$rep();
          const wasmValues = this.lowerParamValues(params, memory, context).slice();
          wasmValues.unshift(handle);
          const result2 = await connection.callWorker(`${qualifier}#${this.witName}`, wasmValues);
          return this.liftReturnValue(result2, memory, context);
        });
      }
      getParamValuesForHostCall(params, memory, context) {
        const returnFlatTypes = this.returnType === void 0 ? 0 : this.returnType.flatTypes.length;
        let out;
        if (returnFlatTypes > FunctionType2.MAX_FLAT_RESULTS) {
          const paramFlatTypes = this.paramType !== void 0 ? this.paramType.flatTypes.length : 0;
          if (params.length === paramFlatTypes + 1) {
            const last = params[paramFlatTypes];
            if (typeof last !== "number") {
              throw new ComponentModelTrap(`Result pointer must be a number (u32), but got ${out}.`);
            }
            out = last;
          }
        }
        return [this.liftParamValues(params, memory, context), out];
      }
      liftReturnValue(value, memory, context) {
        if (this.returnType === void 0) {
          return;
        }
        let result2;
        if (this.returnType.flatTypes.length <= _Callable.MAX_FLAT_RESULTS) {
          result2 = this.returnType.liftFlat(memory, [value].values(), context);
        } else {
          result2 = this.returnType.load(memory.readonly(value, this.returnType.size), 0, context);
        }
        if (this.returnType instanceof ResultType) {
          const resultValue = result2;
          if (resultValue.isError()) {
            if (this.returnType.errorClass === void 0) {
              throw new ComponentModelTrap(`Received an error result, but no error class is defined.`);
            }
            throw new this.returnType.errorClass(resultValue.value);
          } else {
            return resultValue.value;
          }
        } else {
          return result2;
        }
      }
    };
    var FunctionType2 = class extends Callable {
      constructor(witName, params, returnType) {
        super(witName, params, returnType);
      }
      /**
       * Calls a service function from a wasm module.
       */
      callService(func, params, context) {
        const [jParams, out] = this.getParamValuesForHostCall(params, context.getMemory(), context);
        try {
          const result2 = func(...jParams);
          return this.lowerReturnValue(result2, context.getMemory(), context, out);
        } catch (error) {
          return this.handleError(error, context.getMemory(), context, out);
        }
      }
      async callServiceAsync(memory, func, params, context) {
        const [jParams, out] = this.getParamValuesForHostCall(params, memory, context);
        try {
          const result2 = await func(...jParams);
          return this.lowerReturnValue(result2, memory, context, out);
        } catch (error) {
          return this.handleError(error, memory, context, out);
        }
      }
    };
    exports.FunctionType = FunctionType2;
    var ConstructorType = class extends Callable {
      constructor(witName, params, returnType) {
        super(witName, params, returnType);
      }
      callService(clazz2, params, context) {
        const returnFlatTypes = this.returnType === void 0 ? 0 : this.returnType.flatTypes.length;
        if (returnFlatTypes !== 1) {
          throw new ComponentModelTrap(`Expected exactly one return type, but got ${returnFlatTypes}.`);
        }
        const memory = context.getMemory();
        const jParams = this.liftParamValues(params, memory, context);
        const obj = new clazz2(...jParams);
        return obj.$handle();
      }
      async callServiceAsync(memory, clazz2, params, context) {
        const returnFlatTypes = this.returnType === void 0 ? 0 : this.returnType.flatTypes.length;
        if (returnFlatTypes !== 1) {
          throw new ComponentModelTrap(`Expected exactly one return type, but got ${returnFlatTypes}.`);
        }
        const jParams = this.liftParamValues(params, memory, context);
        const obj = await clazz2.$new(...jParams);
        return obj.$handle();
      }
      callWasmConstructor(params, wasmFunction, context) {
        const memory = context.getMemory();
        const wasmValues = this.lowerParamValues(params, memory, context);
        const result2 = wasmFunction(...wasmValues);
        if (typeof result2 !== "number") {
          throw new ComponentModelTrap(`Expected a number (u32) as return value, but got ${result2}.`);
        }
        return result2;
      }
      callWasmConstructorAsync(connection, qualifier, params, context) {
        return connection.lock(async () => {
          connection.prepareCall();
          const memory = connection.getMemory();
          const wasmValues = this.lowerParamValues(params, memory, context);
          return connection.callWorker(`${qualifier}#${this.witName}`, wasmValues);
        });
      }
    };
    exports.ConstructorType = ConstructorType;
    var DestructorType = class extends Callable {
      constructor(witName, params) {
        super(witName, params);
      }
      callService(params, resourceManager) {
        const handle = params[0];
        if (typeof handle === "bigint" || !u322.valid(handle)) {
          throw new ComponentModelTrap(`Object handle must be a number (u32), but got ${handle}.`);
        }
        const resource = resourceManager.getResource(handle);
        resource["$drop"] !== void 0 && resource["$drop"]();
        resourceManager.removeResource(handle);
      }
      async callServiceAsync(_memory, params, resourceManager) {
        const handle = params[0];
        if (typeof handle === "bigint" || !u322.valid(handle)) {
          throw new ComponentModelTrap(`Object handle must be a number (u32), but got ${handle}.`);
        }
        const resource = resourceManager.getResource(handle);
        resource["$drop"] !== void 0 && await resource["$drop"]();
        resourceManager.removeResource(handle);
      }
    };
    exports.DestructorType = DestructorType;
    var StaticMethodType = class extends Callable {
      constructor(witName, params, returnType) {
        super(witName, params, returnType);
      }
      callService(func, params, context) {
        const [jParams, out] = this.getParamValuesForHostCall(params, context.getMemory(), context);
        try {
          const result2 = func(...jParams);
          return this.lowerReturnValue(result2, context.getMemory(), context, out);
        } catch (error) {
          return this.handleError(error, context.getMemory(), context, out);
        }
      }
      async callServiceAsync(memory, func, params, context) {
        const [jParams, out] = this.getParamValuesForHostCall(params, memory, context);
        try {
          const result2 = await func(...jParams);
          return this.lowerReturnValue(result2, memory, context, out);
        } catch (error) {
          return this.handleError(error, memory, context, out);
        }
      }
    };
    exports.StaticMethodType = StaticMethodType;
    var MethodType = class extends Callable {
      constructor(witName, params, returnType) {
        super(witName, params, returnType);
      }
      callService(methodName, params, resourceManager, context) {
        if (params.length === 0) {
          throw new ComponentModelTrap(`Method calls must have at least one parameter (the object pointer).`);
        }
        const handle = params.shift();
        if (typeof handle !== "number") {
          throw new ComponentModelTrap(`Object handle must be a number (u32), but got ${handle}.`);
        }
        const [jParams, out] = this.getParamValuesForHostCall(params, context.getMemory(), context);
        const resource = resourceManager.getResource(handle);
        const memory = context.getMemory();
        try {
          const result2 = resource[methodName](...jParams);
          return this.lowerReturnValue(result2, memory, context, out);
        } catch (error) {
          return this.handleError(error, memory, context, out);
        }
      }
      async callServiceAsync(memory, methodName, params, resourceManager, context) {
        if (params.length === 0) {
          throw new ComponentModelTrap(`Method calls must have at least one parameter (the object pointer).`);
        }
        const handle = params.shift();
        if (typeof handle !== "number") {
          throw new ComponentModelTrap(`Object handle must be a number (u32), but got ${handle}.`);
        }
        const [jParams, out] = this.getParamValuesForHostCall(params, memory, context);
        const resource = resourceManager.getResource(handle);
        try {
          const result2 = await resource[methodName](...jParams);
          return this.lowerReturnValue(result2, memory, context, out);
        } catch (error) {
          return this.handleError(error, memory, context, out);
        }
      }
    };
    exports.MethodType = MethodType;
    var ResourceHandleType = class {
      kind;
      size;
      alignment;
      flatTypes;
      witName;
      constructor(witName) {
        this.witName = witName;
        this.kind = ComponentModelTypeKind.resourceHandle;
        this.size = u322.size;
        this.alignment = u322.alignment;
        this.flatTypes = u322.flatTypes;
      }
      load(memory, offset) {
        return u322.load(memory, offset);
      }
      liftFlat(memory, values) {
        return u322.liftFlat(memory, values);
      }
      alloc(memory) {
        return u322.alloc(memory);
      }
      store(memory, offset, value) {
        u322.store(memory, offset, value);
      }
      lowerFlat(result2, memory, value) {
        u322.lowerFlat(result2, memory, value);
      }
      copy(dest, dest_offset, src, src_offset) {
        u322.copy(dest, dest_offset, src, src_offset);
      }
      copyFlat(result2, dest, values, src) {
        u322.copyFlat(result2, dest, values, src);
      }
    };
    exports.ResourceHandleType = ResourceHandleType;
    var ResourceType = class {
      kind;
      size;
      alignment;
      flatTypes;
      witName;
      id;
      callables;
      constructor(witName, id) {
        this.kind = ComponentModelTypeKind.resource;
        this.size = u322.size;
        this.alignment = u322.alignment;
        this.flatTypes = u322.flatTypes;
        this.witName = witName;
        this.id = id;
        this.callables = /* @__PURE__ */ new Map();
      }
      addConstructor(jsName, func) {
        this.callables.set(jsName, func);
      }
      addDestructor(jsName, func) {
        this.callables.set(jsName, func);
      }
      addStaticMethod(jsName, func) {
        this.callables.set(jsName, func);
      }
      addMethod(jsName, func) {
        this.callables.set(jsName, func);
      }
      getCallable(jsName) {
        const result2 = this.callables.get(jsName);
        if (result2 === void 0) {
          throw new ComponentModelTrap(`Method '${jsName}' not found on resource '${this.witName}'.`);
        }
        return result2;
      }
      load(memory, offset, context) {
        const handle = u322.load(memory, offset);
        return context.resources.ensure(this.id).getResource(handle);
      }
      liftFlat(memory, values, context) {
        const handle = u322.liftFlat(memory, values);
        return context.resources.ensure(this.id).getResource(handle);
      }
      alloc(memory) {
        return u322.alloc(memory);
      }
      store(memory, offset, value) {
        const handle = value.$handle();
        u322.store(memory, offset, handle);
      }
      lowerFlat(result2, memory, value) {
        const handle = value.$handle();
        u322.lowerFlat(result2, memory, handle);
      }
      copy(dest, dest_offset, src, src_offset) {
        u322.copy(dest, dest_offset, src, src_offset);
      }
      copyFlat(result2, dest, values, src) {
        u322.copyFlat(result2, dest, values, src);
      }
    };
    exports.ResourceType = ResourceType;
    var AbstractWrapperType = class {
      kind;
      size;
      alignment;
      flatTypes;
      wrapped;
      constructor(kind, wrapped) {
        this.kind = kind;
        this.wrapped = wrapped;
        this.size = u322.size;
        this.alignment = u322.alignment;
        this.flatTypes = u322.flatTypes;
      }
      load(memory, offset, context) {
        return this.wrapped.load(memory, offset, context);
      }
      liftFlat(memory, values, context) {
        return this.wrapped.liftFlat(memory, values, context);
      }
      alloc(memory) {
        return u322.alloc(memory);
      }
      store(memory, offset, value, context) {
        return this.wrapped.store(memory, offset, value, context);
      }
      lowerFlat(result2, memory, value, context) {
        return this.wrapped.lowerFlat(result2, memory, value, context);
      }
      copy(dest, dest_offset, src, src_offset, context) {
        return this.wrapped.copy(dest, dest_offset, src, src_offset, context);
      }
      copyFlat(result2, dest, values, src, context) {
        return this.wrapped.copyFlat(result2, dest, values, src, context);
      }
    };
    var BorrowType = class extends AbstractWrapperType {
      constructor(type) {
        super(ComponentModelTypeKind.borrow, type);
      }
    };
    exports.BorrowType = BorrowType;
    var OwnType = class extends AbstractWrapperType {
      constructor(type) {
        super(ComponentModelTypeKind.own, type);
      }
    };
    exports.OwnType = OwnType;
    var InterfaceType;
    (function(InterfaceType2) {
      function is(value) {
        return typeof value === "object" && typeof value.id === "string" && typeof value.witName === "string" && value.types instanceof Map && value.functions instanceof Map && value.resources instanceof Map;
      }
      InterfaceType2.is = is;
    })(InterfaceType || (exports.InterfaceType = InterfaceType = {}));
    var PackageType;
    (function(PackageType2) {
      function is(value) {
        return typeof value === "object" && typeof value.id === "string" && typeof value.witName === "string" && value.interfaces instanceof Map;
      }
      PackageType2.is = is;
    })(PackageType || (exports.PackageType = PackageType = {}));
    var WasmContext;
    (function(WasmContext2) {
      class Default {
        memory;
        options;
        resources;
        constructor(options, resources) {
          this.options = options ?? { encoding: "utf-8" };
          this.resources = resources ?? new ResourceManagers.Default();
        }
        initialize(memory) {
          if (this.memory !== void 0) {
            throw new MemoryError(`Memory is already initialized.`);
          }
          this.memory = memory;
        }
        getMemory() {
          if (this.memory === void 0) {
            throw new MemoryError(`Memory not yet initialized.`);
          }
          return this.memory;
        }
      }
      WasmContext2.Default = Default;
      function is(value) {
        const candidate = value;
        return candidate && typeof candidate.getMemory === "function" && Options.is(candidate.options) && ResourceManagers.is(candidate.resources);
      }
      WasmContext2.is = is;
    })(WasmContext || (exports.WasmContext = WasmContext = {}));
    function getResourceManager(resource, clazz2, context) {
      let resourceManager;
      if (context.resources.has(resource.id)) {
        resourceManager = context.resources.ensure(resource.id);
      } else {
        resourceManager = ResourceManager.from(clazz2) ?? new ResourceManager.Default();
        context.resources.set(resource.id, resourceManager);
      }
      return resourceManager;
    }
    var $imports2;
    (function($imports3) {
      function create(world, service, context) {
        const packageName = world.id.substring(0, world.id.indexOf("/"));
        const result2 = /* @__PURE__ */ Object.create(null);
        if (world.imports !== void 0) {
          if (world.imports.functions !== void 0) {
            result2["$root"] = doCreate(world.imports.functions, void 0, service, context);
          }
          if (world.imports.interfaces !== void 0) {
            for (const [name, iface] of world.imports.interfaces) {
              const propName = `${name[0].toLowerCase()}${name.substring(1)}`;
              result2[`${packageName}/${iface.witName}`] = doCreate(iface.functions, iface.resources, service[propName], context);
            }
          }
        }
        if (world.exports !== void 0) {
          if (world.exports.interfaces !== void 0) {
            for (const iface of world.exports.interfaces.values()) {
              if (iface.resources === void 0) {
                continue;
              }
              for (const resource of iface.resources.values()) {
                const manager = getResourceManager(resource, void 0, context);
                const exports2 = /* @__PURE__ */ Object.create(null);
                exports2[`[resource-new]${resource.witName}`] = (rep) => manager.newHandle(rep);
                exports2[`[resource-rep]${resource.witName}`] = (handle) => manager.getRepresentation(handle);
                exports2[`[resource-drop]${resource.witName}`] = (handle) => manager.dropHandle(handle);
                result2[`[export]${packageName}/${iface.witName}`] = exports2;
              }
            }
          }
        }
        return result2;
      }
      $imports3.create = create;
      function loop(world, service, context) {
        const imports = create(world, service, context);
        const wasmExports = asExports(imports, context);
        const loop2 = {
          id: world.id,
          witName: world.witName,
          imports: world.exports !== void 0 ? {
            functions: world.exports.functions,
            interfaces: world.exports.interfaces
          } : void 0,
          exports: world.imports !== void 0 ? {
            functions: world.imports.functions,
            interfaces: world.imports.interfaces
          } : void 0
        };
        return $exports2.bind(loop2, wasmExports, context);
      }
      $imports3.loop = loop;
      function asExports(imports, context) {
        const result2 = /* @__PURE__ */ Object.create(null);
        const keys = Object.keys(imports);
        for (const ifaceName of keys) {
          const iface = imports[ifaceName];
          if (ifaceName.startsWith("[export]")) {
            continue;
          } else if (ifaceName === "$root") {
            for (const funcName of Object.keys(iface)) {
              result2[funcName] = iface[funcName];
            }
          } else {
            const qualifier = `${ifaceName}#`;
            for (const funcName of Object.keys(iface)) {
              if (funcName.startsWith("[constructor]")) {
                const managerId = `${ifaceName}/${funcName.substring(
                  13
                  /* length of [constructor] */
                )}`;
                const resourceManager = context.resources.ensure(managerId);
                result2[`${qualifier}${funcName}`] = (...args) => {
                  const handle = iface[funcName](...args);
                  return resourceManager.registerLoop(handle);
                };
              } else if (funcName.startsWith("[method]")) {
                let resourceName = funcName.substring(
                  8
                  /* length of [method] */
                );
                if (resourceName.indexOf(".") !== -1) {
                  resourceName = resourceName.substring(0, resourceName.indexOf("."));
                }
                const managerId = `${ifaceName}/${resourceName}`;
                const resourceManager = context.resources.ensure(managerId);
                result2[`${qualifier}${funcName}`] = ((rep, ...args) => {
                  return iface[funcName](resourceManager.getLoop(rep), ...args);
                });
              } else if (funcName.startsWith("[resource-drop]")) {
                result2[`${qualifier}[dtor]${funcName.substring(
                  15
                  /* length of [resource-drop] */
                )}`] = iface[funcName];
              } else {
                result2[`${qualifier}${funcName}`] = iface[funcName];
              }
            }
          }
        }
        return result2;
      }
      function doCreate(functions, resources, service, context) {
        const result2 = /* @__PURE__ */ Object.create(null);
        if (functions !== void 0) {
          for (const [funcName, func] of functions) {
            result2[func.witName] = createFunction(func, service[funcName], context);
          }
        }
        if (resources !== void 0) {
          for (const [resourceName, resource] of resources) {
            const clazz2 = service[resourceName];
            const resourceManager = getResourceManager(resource, clazz2, context);
            for (const [callableName, callable] of resource.callables) {
              if (callable instanceof ConstructorType) {
                result2[callable.witName] = createConstructorFunction(callable, clazz2, context);
              } else if (callable instanceof StaticMethodType) {
                result2[callable.witName] = createStaticMethodFunction(callable, service[resourceName][callableName], context);
              } else if (callable instanceof MethodType) {
                result2[callable.witName] = createMethodFunction(callableName, callable, resourceManager, context);
              } else if (callable instanceof DestructorType) {
                result2[callable.witName] = createDestructorFunction(callable, resourceManager);
              }
            }
          }
        }
        return result2;
      }
      function createFunction(callable, serviceFunction, context) {
        return function(...params) {
          return callable.callService(serviceFunction, params, context);
        };
      }
      function createConstructorFunction(callable, clazz2, context) {
        return function(...params) {
          return callable.callService(clazz2, params, context);
        };
      }
      function createDestructorFunction(callable, manager) {
        return function(...params) {
          return callable.callService(params, manager);
        };
      }
      function createStaticMethodFunction(callable, func, context) {
        return function(...params) {
          return callable.callService(func, params, context);
        };
      }
      function createMethodFunction(name, callable, manager, context) {
        return function(...params) {
          return callable.callService(name, params, manager, context);
        };
      }
      let worker;
      (function(worker2) {
        function create2(connection, world, context) {
          const packageName = world.id.substring(0, world.id.indexOf("/"));
          const result2 = /* @__PURE__ */ Object.create(null);
          if (world.imports !== void 0) {
            if (world.imports.functions !== void 0) {
              result2["$root"] = doCreate2(connection, "$root", world.imports.functions, void 0, context);
            }
            if (world.imports.interfaces !== void 0) {
              for (const iface of world.imports.interfaces.values()) {
                const qualifier = `${packageName}/${iface.witName}`;
                result2[qualifier] = doCreate2(connection, qualifier, iface.functions, iface.resources, context);
              }
            }
          }
          if (world.exports !== void 0) {
            if (world.exports.interfaces !== void 0) {
              for (const iface of world.exports.interfaces.values()) {
                if (iface.resources === void 0) {
                  continue;
                }
                for (const resource of iface.resources.values()) {
                  const exports2 = /* @__PURE__ */ Object.create(null);
                  const qualifier = `[export]${packageName}/${iface.witName}`;
                  const newName = `[resource-new]${resource.witName}`;
                  exports2[newName] = (rep) => connection.callMain(`${qualifier}#${newName}`, [rep]);
                  const repName = `[resource-rep]${resource.witName}`;
                  exports2[repName] = (handle) => connection.callMain(`${qualifier}#${repName}`, [handle]);
                  const dropName = `[resource-drop]${resource.witName}`;
                  exports2[dropName] = (handle) => connection.callMain(`${qualifier}#${dropName}`, [handle]);
                  result2[qualifier] = exports2;
                }
              }
            }
          }
          return result2;
        }
        worker2.create = create2;
        function doCreate2(connection, qualifier, functions, resources, context) {
          const result2 = /* @__PURE__ */ Object.create(null);
          if (functions !== void 0) {
            for (const [, func] of functions) {
              result2[func.witName] = function(...params) {
                return func.callMain(connection, qualifier, params, context);
              };
            }
          }
          if (resources !== void 0) {
            for (const resource of resources.values()) {
              for (const callable of resource.callables.values()) {
                result2[callable.witName] = function(...params) {
                  return callable.callMain(connection, qualifier, params, context);
                };
              }
            }
          }
          return result2;
        }
      })(worker = $imports3.worker || ($imports3.worker = {}));
    })($imports2 || (exports.$imports = $imports2 = {}));
    var $exports2;
    (function($exports3) {
      function bind(world, exports2, context) {
        const [root, scoped] = partition(exports2);
        const result2 = /* @__PURE__ */ Object.create(null);
        if (world.exports !== void 0) {
          if (world.exports.functions !== void 0) {
            Object.assign(result2, doBind(world.exports.functions, void 0, root, context));
          }
          if (world.exports.interfaces !== void 0) {
            for (const [name, iface] of world.exports.interfaces) {
              const propName = `${name[0].toLowerCase()}${name.substring(1)}`;
              result2[propName] = doBind(iface.functions, iface.resources, scoped[iface.id], context);
            }
          }
        }
        return result2;
      }
      $exports3.bind = bind;
      function partition(exports2) {
        const root = /* @__PURE__ */ Object.create(null);
        const scoped = /* @__PURE__ */ Object.create(null);
        for (const [key, value] of Object.entries(exports2)) {
          const parts = key.split("#");
          if (parts.length === 1) {
            root[key] = value;
          } else {
            const [iface, func] = parts;
            if (scoped[iface] === void 0) {
              scoped[iface] = /* @__PURE__ */ Object.create(null);
            }
            scoped[iface][func] = value;
          }
        }
        return [root, scoped];
      }
      function doBind(functions, resources, wasm, context) {
        const result2 = /* @__PURE__ */ Object.create(null);
        if (functions !== void 0) {
          for (const [name, func] of functions) {
            result2[name] = createFunction(func, wasm[func.witName], context);
          }
        }
        if (resources !== void 0) {
          for (const [name, resource] of resources) {
            const resourceManager = getResourceManager(resource, void 0, context);
            const cl = clazz.create(resource, wasm, context);
            resourceManager.setProxyInfo(cl, wasm[`[dtor]${resource.witName}`]);
            result2[name] = cl;
          }
        }
        return result2;
      }
      function createFunction(func, wasmFunction, context) {
        return (...params) => {
          return func.callWasm(params, wasmFunction, context);
        };
      }
      let worker;
      (function(worker2) {
        function bind2(connection, world, exports2, context) {
          const packageName = world.id.substring(0, world.id.indexOf("/"));
          const [root, scoped] = partition(exports2);
          if (world.exports !== void 0) {
            doBind2(connection, packageName, world.exports.functions, void 0, root, context);
            if (world.exports.interfaces !== void 0) {
              for (const iface of world.exports.interfaces.values()) {
                doBind2(connection, `${packageName}/${iface.witName}`, iface.functions, iface.resources, scoped[iface.id], context);
              }
            }
          }
        }
        worker2.bind = bind2;
        function doBind2(connection, qualifier, functions, resources, exports2, context) {
          if (functions !== void 0) {
            for (const func of functions.values()) {
              connection.on(`${qualifier}#${func.witName}`, (memory, params) => {
                return func.callWasmFromWorker(memory, exports2[func.witName], params, context);
              });
            }
          }
          if (resources !== void 0) {
            for (const resource of resources.values()) {
              for (const callable of resource.callables.values()) {
                if (callable instanceof ConstructorType || callable instanceof StaticMethodType) {
                  connection.on(`${qualifier}#${callable.witName}`, (memory, params) => {
                    return callable.callWasmFromWorker(memory, exports2[callable.witName], params, context);
                  });
                } else {
                  connection.on(`${qualifier}#${callable.witName}`, (memory, params) => {
                    return callable.callWasmMethodFromWorker(memory, exports2[callable.witName], params, context);
                  });
                }
              }
            }
          }
        }
      })(worker = $exports3.worker || ($exports3.worker = {}));
    })($exports2 || (exports.$exports = $exports2 = {}));
    var clazz;
    (function(clazz_1) {
      function create(resource, wasm, context) {
        let resourceManager;
        if (context.resources.has(resource.id)) {
          resourceManager = context.resources.ensure(resource.id);
        } else {
          resourceManager = new ResourceManager.Default();
          context.resources.set(resource.id, resourceManager);
        }
        const clazz2 = class extends Resource.Default {
          _rep;
          constructor(...args) {
            if (args[0] === ResourceManager.handleTag) {
              const handle = args[1];
              super(handle);
              this._rep = args[2];
            } else {
              const ctor = resource.getCallable("constructor");
              const handle = ctor.callWasmConstructor(args, wasm[ctor.witName], context);
              super(handle);
              this._rep = resourceManager.getRepresentation(this.$handle());
            }
          }
          $rep() {
            return this._rep;
          }
        };
        for (const [name, callable] of resource.callables) {
          if (callable instanceof MethodType) {
            clazz2.prototype[name] = function(...params) {
              return callable.callWasmMethod(this, params, wasm[callable.witName], context);
            };
          } else if (callable instanceof DestructorType) {
            clazz2.prototype[name] = function(...params) {
              return callable.callWasmMethod(this, params, wasm[callable.witName], context);
            };
          } else if (callable instanceof StaticMethodType) {
            clazz2[name] = (...params) => {
              return callable.callWasm(params, wasm[callable.witName], context);
            };
          }
        }
        return clazz2;
      }
      clazz_1.create = create;
      function createPromise(connection, qualifier, resource, context) {
        let resourceManager;
        if (context.resources.has(resource.id)) {
          resourceManager = context.resources.ensure(resource.id);
        } else {
          resourceManager = new ResourceManager.Default();
          context.resources.set(resource.id, resourceManager);
        }
        const clazz2 = class extends Resource.Default {
          _rep;
          static async $new(...args) {
            const ctor = resource.getCallable("constructor");
            const result2 = await ctor.callWasmConstructorAsync(connection, qualifier, args, context);
            return new clazz2(ResourceManager.handleTag, result2, resourceManager.getRepresentation(result2));
          }
          constructor(_handleTag, handle, rep) {
            super(handle);
            this._rep = rep;
          }
          $rep() {
            return this._rep;
          }
        };
        for (const [name, callable] of resource.callables) {
          if (callable instanceof MethodType) {
            clazz2.prototype[name] = function(...params) {
              return callable.callWorkerMethod(connection, qualifier, this, params, context);
            };
          } else if (callable instanceof DestructorType) {
            clazz2.prototype[name] = function(...params) {
              return callable.callWorkerMethod(connection, qualifier, this, params, context);
            };
          } else if (callable instanceof StaticMethodType) {
            clazz2[name] = (...params) => {
              return callable.callWorker(connection, qualifier, params, context);
            };
          }
        }
        return clazz2;
      }
      clazz_1.createPromise = createPromise;
    })(clazz || (clazz = {}));
    var $main2;
    (function($main3) {
      function bind(world, service, code, portOrContext, context) {
        if (portOrContext === void 0) {
          return bindSync(world, service, code, new WasmContext.Default());
        } else if (ComponentModelContext.is(portOrContext)) {
          return bindSync(world, service, code, portOrContext);
        } else {
          return bindAsync(world, service, code, portOrContext, context ?? { options: { encoding: "utf-8" }, resources: new ResourceManagers.Default() });
        }
      }
      $main3.bind = bind;
      async function bindSync(world, service, code, context) {
        const wasmContext = context !== void 0 ? new WasmContext.Default(context.options, context.resources) : new WasmContext.Default();
        let module2;
        let memory = void 0;
        if (code.module !== void 0) {
          module2 = code.module;
          memory = code.memory;
        } else {
          module2 = code;
        }
        const imports = $imports2.create(world, service, wasmContext);
        if (memory !== void 0) {
          imports.env.memory = memory;
        }
        const instance = await (0, ral_1.default)().WebAssembly.instantiate(module2, imports);
        wasmContext.initialize(new Memory.Default(instance.exports));
        return $exports2.bind(world, instance.exports, wasmContext);
      }
      async function bindAsync(world, service, code, port, context) {
        const connection = await (0, ral_1.default)().Connection.createMain(port);
        connection.listen();
        await connection.initialize(code, context.options);
        bindServiceAsync(connection, world, service, context);
        return bindApi(connection, world, context);
      }
      function bindServiceAsync(connection, world, service, context) {
        const packageName = world.id.substring(0, world.id.indexOf("/"));
        if (world.imports !== void 0) {
          if (world.imports.functions !== void 0) {
            doBindServiceAsync(connection, "$root", world.imports.functions, void 0, service, context);
          }
          if (world.imports.interfaces !== void 0) {
            for (const [name, iface] of world.imports.interfaces) {
              const propName = `${name[0].toLowerCase()}${name.substring(1)}`;
              doBindServiceAsync(connection, `${packageName}/${iface.witName}`, iface.functions, iface.resources, service[propName], context);
            }
          }
        }
        if (world.exports !== void 0) {
          if (world.exports.interfaces !== void 0) {
            for (const iface of world.exports.interfaces.values()) {
              if (iface.resources === void 0) {
                continue;
              }
              const qualifier = `[export]${packageName}/${iface.witName}`;
              for (const resource of iface.resources.values()) {
                const manager = getResourceManager(resource, void 0, context);
                connection.on(`${qualifier}#[resource-new]${resource.witName}`, (_memory, params) => manager.newHandle(params[0]));
                connection.on(`${qualifier}#[resource-rep]${resource.witName}`, (_memory, params) => manager.getRepresentation(params[0]));
                connection.on(`${qualifier}#[resource-drop]${resource.witName}`, (_memory, params) => manager.dropHandle(params[0]));
              }
            }
          }
        }
      }
      function doBindServiceAsync(connection, qualifier, functions, resources, service, context) {
        if (functions !== void 0) {
          for (const [funcName, func] of functions) {
            connection.on(`${qualifier}#${func.witName}`, (memory, params) => {
              return func.callServiceAsync(memory, service[funcName], params, context);
            });
          }
        }
        if (resources !== void 0) {
          for (const [resourceName, resource] of resources) {
            const clazz2 = service[resourceName];
            const resourceManager = getResourceManager(resource, clazz2, context);
            for (const [callableName, callable] of resource.callables) {
              if (callable instanceof ConstructorType) {
                connection.on(`${qualifier}#${callable.witName}`, (memory, params) => {
                  return callable.callServiceAsync(memory, clazz2, params, context);
                });
              } else if (callable instanceof StaticMethodType) {
                connection.on(`${qualifier}#${callable.witName}`, (memory, params) => {
                  return callable.callServiceAsync(memory, service[resourceName][callableName], params, context);
                });
              } else if (callable instanceof MethodType) {
                connection.on(`${qualifier}#${callable.witName}`, (memory, params) => {
                  return callable.callServiceAsync(memory, callableName, params, resourceManager, context);
                });
              } else if (callable instanceof DestructorType) {
                connection.on(`${qualifier}#${callable.witName}`, (memory, params) => {
                  return callable.callServiceAsync(memory, params, resourceManager);
                });
              }
            }
          }
        }
      }
      function bindApi(connection, world, context) {
        const packageName = world.id.substring(0, world.id.indexOf("/"));
        const result2 = /* @__PURE__ */ Object.create(null);
        if (world.exports !== void 0) {
          if (world.exports.functions !== void 0) {
            Object.assign(result2, doBindApi(connection, packageName, world.exports.functions, void 0, context));
          }
          if (world.exports.interfaces !== void 0) {
            for (const [name, iface] of world.exports.interfaces) {
              const propName = `${name[0].toLowerCase()}${name.substring(1)}`;
              result2[propName] = doBindApi(connection, `${packageName}/${iface.witName}`, iface.functions, iface.resources, context);
            }
          }
        }
        return result2;
      }
      function doBindApi(connection, qualifier, functions, resources, context) {
        const result2 = /* @__PURE__ */ Object.create(null);
        if (functions !== void 0) {
          for (const [name, func] of functions) {
            result2[name] = (...params) => {
              return func.callWorker(connection, qualifier, params, context);
            };
          }
        }
        if (resources !== void 0) {
          for (const [name, resource] of resources) {
            const resourceManager = getResourceManager(resource, void 0, context);
            const cl = clazz.createPromise(connection, qualifier, resource, context);
            resourceManager.setProxyInfo(cl, (self) => {
              connection.callWorker(`${qualifier}#[dtor]${resource.witName}`, [self]).catch(() => {
                (0, ral_1.default)().console.error(`Failed to call destructor for ${resource.witName}`);
              });
            });
            result2[name] = cl;
          }
        }
        return result2;
      }
    })($main2 || (exports.$main = $main2 = {}));
  }
});

// vaporview/node_modules/@vscode/wasm-component-model/lib/common/promises.js
var require_promises = __commonJS({
  "vaporview/node_modules/@vscode/wasm-component-model/lib/common/promises.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CapturedPromise = void 0;
    var CapturedPromise;
    (function(CapturedPromise2) {
      function create() {
        let _resolve;
        let _reject;
        const promise = new Promise((resolve2, reject) => {
          _resolve = resolve2;
          _reject = reject;
        });
        return {
          promise,
          resolve: _resolve,
          reject: _reject
        };
      }
      CapturedPromise2.create = create;
    })(CapturedPromise || (exports.CapturedPromise = CapturedPromise = {}));
  }
});

// vaporview/node_modules/@vscode/wasm-component-model/lib/common/semaphore.js
var require_semaphore = __commonJS({
  "vaporview/node_modules/@vscode/wasm-component-model/lib/common/semaphore.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Semaphore = void 0;
    var ral_1 = __importDefault(require_ral());
    var Semaphore = class {
      _capacity;
      _active;
      _waiting;
      constructor(capacity = 1) {
        if (capacity <= 0) {
          throw new Error("Capacity must be greater than 0");
        }
        this._capacity = capacity;
        this._active = 0;
        this._waiting = [];
      }
      dispose() {
        for (const item of this._waiting) {
          item.reject(new Error("Semaphore disposed"));
        }
        this._active = 0;
        this._waiting = [];
      }
      lock(thunk) {
        return new Promise((resolve2, reject) => {
          this._waiting.push({ thunk, resolve: resolve2, reject });
          this.runNext();
        });
      }
      get active() {
        return this._active;
      }
      runNext() {
        if (this._waiting.length === 0 || this._active === this._capacity) {
          return;
        }
        (0, ral_1.default)().timer.setImmediate(() => this.doRunNext());
      }
      doRunNext() {
        if (this._waiting.length === 0 || this._active === this._capacity) {
          return;
        }
        const next = this._waiting.shift();
        this._active++;
        if (this._active > this._capacity) {
          throw new Error(`To many thunks active`);
        }
        try {
          const result = next.thunk();
          if (result instanceof Promise) {
            result.then((value) => {
              this._active--;
              next.resolve(value);
              this.runNext();
            }, (err) => {
              this._active--;
              next.reject(err);
              this.runNext();
            });
          } else {
            this._active--;
            next.resolve(result);
            this.runNext();
          }
        } catch (err) {
          this._active--;
          next.reject(err);
          this.runNext();
        }
      }
    };
    exports.Semaphore = Semaphore;
  }
});

// vaporview/node_modules/@vscode/wasm-component-model/lib/common/connection.js
var require_connection = __commonJS({
  "vaporview/node_modules/@vscode/wasm-component-model/lib/common/connection.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaseMainConnection = exports.BaseWorkerConnection = exports.Connection = void 0;
    var uuid = __importStar(require_cjs());
    var componentModel_1 = require_componentModel();
    var promises_1 = require_promises();
    var ral_1 = __importDefault(require_ral());
    var semaphore_1 = require_semaphore();
    var ConnectionMemory = class _ConnectionMemory {
      static Header = {
        sync: { offset: 0, size: 4 },
        errorCode: { offset: 4, size: 4 },
        resultType: { offset: 8, size: 4 },
        result: { offset: 12, size: 8 },
        next: { offset: 20, size: 4 },
        end: { offset: 24, size: 0 }
      };
      buffer;
      id;
      next;
      constructor(sizeOrBuffer, id) {
        if (sizeOrBuffer === void 0) {
          sizeOrBuffer = 64 * 1024;
        }
        if (typeof sizeOrBuffer === "number") {
          this.id = uuid.v4();
          this.buffer = new SharedArrayBuffer(sizeOrBuffer);
          this.next = new Uint32Array(this.buffer, _ConnectionMemory.Header.next.offset, 1);
          this.next[0] = _ConnectionMemory.Header.end.offset;
        } else {
          this.buffer = sizeOrBuffer;
          this.id = id;
          this.next = new Uint32Array(this.buffer, _ConnectionMemory.Header.next.offset, 1);
        }
      }
      reset() {
        const view = new Uint8Array(this.buffer, 0, _ConnectionMemory.Header.end.offset);
        view.fill(0);
        this.next[0] = _ConnectionMemory.Header.end.offset;
      }
      alloc(align, size) {
        const next = this.next[0];
        const result = componentModel_1.Alignment.align(next, align);
        this.next[0] = result + size;
        return new componentModel_1.MemoryRange(this, result, size);
      }
      realloc() {
        throw new componentModel_1.ComponentModelTrap("ConnectionMemory does not support realloc");
      }
      preAllocated(ptr, size) {
        return new componentModel_1.MemoryRange(this, ptr, size);
      }
      readonly(ptr, size) {
        return new componentModel_1.ReadonlyMemoryRange(this, ptr, size);
      }
    };
    var Connection = class _Connection {
      static createWorker(world, port, timeout) {
        return (0, ral_1.default)().Connection.createWorker(port, world, timeout);
      }
      memory;
      constructor(memory) {
        this.memory = memory;
      }
      static serializeParams(params) {
        const result = [];
        for (const param of params) {
          if (typeof param === "number") {
            result.push(param);
          } else {
            result.push(param.toString());
          }
        }
        return result;
      }
      static deserializeParams(params) {
        const result = [];
        for (const param of params) {
          if (typeof param === "string") {
            result.push(BigInt(param));
          } else {
            result.push(param);
          }
        }
        return result;
      }
      static serializeResult(result) {
        if (typeof result === "bigint") {
          return result.toString();
        } else if (typeof result === "number") {
          return result;
        }
        return void 0;
      }
      static deserializeResult(result) {
        if (result === void 0) {
          return;
        }
        return typeof result === "number" ? result : BigInt(result);
      }
      static loadResult(buffer) {
        const view = new DataView(buffer, 0, ConnectionMemory.Header.end.offset);
        const resultType = view.getUint32(ConnectionMemory.Header.resultType.offset, true);
        switch (resultType) {
          case _Connection.WasmTypeKind.undefined:
            return;
          case _Connection.WasmTypeKind.float:
            return view.getFloat64(ConnectionMemory.Header.result.offset, true);
          case _Connection.WasmTypeKind.signed:
            return view.getBigInt64(ConnectionMemory.Header.result.offset, true);
          case _Connection.WasmTypeKind.unsigned:
            return view.getBigUint64(ConnectionMemory.Header.result.offset, true);
          default:
            throw new componentModel_1.ComponentModelTrap(`Unexpected result type ${resultType}`);
        }
      }
      static storeResult(buffer, result) {
        const view = new DataView(buffer, 0, ConnectionMemory.Header.end.offset);
        if (result === void 0) {
          view.setUint32(ConnectionMemory.Header.resultType.offset, _Connection.WasmTypeKind.undefined, true);
        } else if (typeof result === "bigint") {
          if (result < 0) {
            view.setUint32(ConnectionMemory.Header.resultType.offset, _Connection.WasmTypeKind.signed, true);
            view.setBigInt64(ConnectionMemory.Header.result.offset, result, true);
          } else {
            view.setUint32(ConnectionMemory.Header.resultType.offset, _Connection.WasmTypeKind.unsigned, true);
            view.setBigUint64(ConnectionMemory.Header.result.offset, result, true);
          }
        } else if (typeof result === "number") {
          view.setUint32(ConnectionMemory.Header.resultType.offset, _Connection.WasmTypeKind.float, true);
          view.setFloat64(ConnectionMemory.Header.result.offset, result, true);
        } else {
          throw new componentModel_1.ComponentModelTrap(`Unexpected result type ${result}`);
        }
      }
    };
    exports.Connection = Connection;
    (function(Connection2) {
      let ErrorCodes;
      (function(ErrorCodes2) {
        ErrorCodes2[ErrorCodes2["noHandler"] = 1] = "noHandler";
        ErrorCodes2[ErrorCodes2["promiseRejected"] = 2] = "promiseRejected";
      })(ErrorCodes = Connection2.ErrorCodes || (Connection2.ErrorCodes = {}));
      let WasmTypeKind;
      (function(WasmTypeKind2) {
        WasmTypeKind2[WasmTypeKind2["undefined"] = 0] = "undefined";
        WasmTypeKind2[WasmTypeKind2["float"] = 1] = "float";
        WasmTypeKind2[WasmTypeKind2["signed"] = 2] = "signed";
        WasmTypeKind2[WasmTypeKind2["unsigned"] = 3] = "unsigned";
      })(WasmTypeKind = Connection2.WasmTypeKind || (Connection2.WasmTypeKind = {}));
    })(Connection || (exports.Connection = Connection = {}));
    var BaseWorkerConnection = class extends Connection {
      world;
      timeout;
      handlers;
      constructor(world, timeout) {
        super(new ConnectionMemory());
        this.world = world;
        this.timeout = timeout;
        this.handlers = /* @__PURE__ */ new Map();
      }
      dispose() {
        this.handlers.clear();
      }
      on(name, handler) {
        this.handlers.set(name, handler);
      }
      getMemory() {
        return this.memory;
      }
      prepareCall() {
        this.memory.reset();
      }
      callMain(name, params) {
        const buffer = this.memory.buffer;
        const sync = new Int32Array(buffer, ConnectionMemory.Header.sync.offset, 1);
        Atomics.store(sync, 0, 0);
        const message2 = {
          method: "callMain",
          name,
          params: Connection.serializeParams(params),
          memory: { buffer: this.memory.buffer, id: this.memory.id }
        };
        this.postMessage(message2);
        const result = Atomics.wait(sync, 0, 0, this.timeout);
        switch (result) {
          case "timed-out":
            throw new componentModel_1.ComponentModelTrap(`Call ${name} to main thread timed out`);
          case "not-equal":
            const value = Atomics.load(sync, 0);
            if (value !== 1) {
              throw new componentModel_1.ComponentModelTrap(`Unexpected value ${value} in sync object`);
            }
        }
        return Connection.loadResult(buffer);
      }
      handleMessage(message2) {
        if (message2.method === "initializeWorker") {
          const wasmContext = new componentModel_1.WasmContext.Default(message2.options);
          const imports = componentModel_1.$imports.worker.create(this, this.world, wasmContext);
          if (message2.memory !== void 0) {
            imports.env.memory = message2.memory;
          }
          (0, ral_1.default)().WebAssembly.instantiate(message2.module, imports).then((instance) => {
            wasmContext.initialize(new componentModel_1.Memory.Default(instance.exports));
            componentModel_1.$exports.worker.bind(this, this.world, instance.exports, wasmContext);
            this.postMessage({ method: "reportResult", name: "$initializeWorker", result: "success" });
          }).catch((error) => {
            this.postMessage({ method: "reportResult", name: "$initializeWorker", error: error.toString() });
          });
        } else if (message2.method === "callWorker") {
          const handler = this.handlers.get(message2.name);
          if (handler === void 0) {
            this.postMessage({ method: "reportResult", name: message2.name, error: `No handler found for ${message2.name}` });
            return;
          }
          try {
            const memory = new ConnectionMemory(message2.memory.buffer, message2.memory.id);
            const result = handler(memory, Connection.deserializeParams(message2.params));
            this.postMessage({ method: "reportResult", name: message2.name, result: Connection.serializeResult(result) });
          } catch (error) {
            this.postMessage({ method: "reportResult", name: message2.name, error: `Calling WASM function ${message2.name} failed.` });
          }
        }
      }
    };
    exports.BaseWorkerConnection = BaseWorkerConnection;
    var BaseMainConnection = class extends Connection {
      initializeCall;
      handlers;
      callQueue;
      currentCall;
      constructor() {
        super(new ConnectionMemory());
        this.handlers = /* @__PURE__ */ new Map();
        this.callQueue = new semaphore_1.Semaphore(1);
        this.currentCall = void 0;
      }
      dispose() {
        this.handlers.clear();
        this.callQueue.dispose();
      }
      lock(thunk) {
        return this.callQueue.lock(thunk);
      }
      prepareCall() {
        this.memory.reset();
      }
      getMemory() {
        return this.memory;
      }
      async initialize(code, options) {
        let module2;
        let memory = void 0;
        if (code.module !== void 0) {
          module2 = code.module;
          memory = code.memory;
        } else {
          module2 = code;
        }
        return new Promise((resolve2, reject) => {
          const message2 = {
            method: "initializeWorker",
            module: module2,
            memory,
            options
          };
          this.initializeCall = { resolve: resolve2, reject };
          this.postMessage(message2);
        });
      }
      callWorker(name, params) {
        if (this.currentCall !== void 0) {
          throw new componentModel_1.ComponentModelTrap("Call already in progress");
        }
        this.currentCall = promises_1.CapturedPromise.create();
        const message2 = {
          method: "callWorker",
          name,
          params: Connection.serializeParams(params),
          memory: { buffer: this.memory.buffer, id: this.memory.id }
        };
        this.postMessage(message2);
        return this.currentCall.promise;
      }
      on(id, handler) {
        this.handlers.set(id, handler);
      }
      handleMessage(message2) {
        if (message2.method === "callMain") {
          const buffer = message2.memory.buffer;
          const sync = new Int32Array(buffer, ConnectionMemory.Header.sync.offset, 1);
          const view = new DataView(buffer, 0, ConnectionMemory.Header.end.offset);
          const handler = this.handlers.get(message2.name);
          if (handler === void 0) {
            view.setUint32(ConnectionMemory.Header.errorCode.offset, Connection.ErrorCodes.noHandler, true);
            Atomics.store(sync, 0, 1);
            Atomics.notify(sync, 0);
            return;
          } else {
            const memory = new ConnectionMemory(buffer, message2.memory.id);
            const params = Connection.deserializeParams(message2.params);
            const result = handler(memory, params);
            if (result instanceof Promise) {
              result.then((value) => {
                Connection.storeResult(buffer, value);
              }).catch(() => {
                view.setUint32(ConnectionMemory.Header.errorCode.offset, Connection.ErrorCodes.promiseRejected, true);
              }).finally(() => {
                Atomics.store(sync, 0, 1);
                Atomics.notify(sync, 0);
              });
            } else {
              Connection.storeResult(buffer, result);
              Atomics.store(sync, 0, 1);
              Atomics.notify(sync, 0);
            }
          }
        } else if (message2.method === "reportResult") {
          if (message2.name === "$initializeWorker") {
            if (this.initializeCall === void 0) {
              return;
            }
            if (message2.error !== void 0) {
              this.initializeCall.reject(new Error(message2.error));
            } else {
              this.initializeCall.resolve();
            }
            this.initializeCall = void 0;
          } else {
            if (this.currentCall === void 0) {
              return;
            }
            if (message2.error !== void 0) {
              this.currentCall.reject(new Error(message2.error));
            } else {
              const result = Connection.deserializeResult(message2.result);
              this.currentCall.resolve(result);
            }
            this.currentCall = void 0;
          }
        }
      }
    };
    exports.BaseMainConnection = BaseMainConnection;
  }
});

// vaporview/node_modules/@vscode/wasm-component-model/lib/node/connection.js
var require_connection2 = __commonJS({
  "vaporview/node_modules/@vscode/wasm-component-model/lib/node/connection.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WorkerConnection = exports.MainConnection = void 0;
    var worker_threads_1 = __require("worker_threads");
    var connection_1 = require_connection();
    var MainConnection = class extends connection_1.BaseMainConnection {
      port;
      constructor(port) {
        super();
        this.port = port;
      }
      dispose() {
        this.port.removeAllListeners("message");
        if (this.port instanceof worker_threads_1.MessagePort) {
          this.port.close();
        }
        super.dispose();
      }
      postMessage(message2, transferList) {
        this.port.postMessage(message2, transferList);
      }
      listen() {
        this.port.on("message", (value) => {
          this.handleMessage(value);
        });
      }
    };
    exports.MainConnection = MainConnection;
    var WorkerConnection = class extends connection_1.BaseWorkerConnection {
      port;
      constructor(port, world, timeout) {
        super(world, timeout);
        this.port = port;
      }
      dispose() {
        this.port.removeAllListeners("message");
        super.dispose();
      }
      postMessage(message2, transferList) {
        this.port.postMessage(message2, transferList);
      }
      listen() {
        this.port.on("message", (value) => {
          this.handleMessage(value);
        });
      }
    };
    exports.WorkerConnection = WorkerConnection;
  }
});

// vaporview/node_modules/@vscode/wasm-component-model/lib/node/ril.js
var require_ril = __commonJS({
  "vaporview/node_modules/@vscode/wasm-component-model/lib/node/ril.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = __require("util");
    var worker_threads_1 = __require("worker_threads");
    var ral_1 = __importDefault(require_ral());
    var _ril = Object.freeze({
      TextEncoder: Object.freeze({
        create(encoding = "utf-8") {
          return {
            encode(input) {
              return Buffer.from(input ?? "", encoding);
            }
          };
        }
      }),
      TextDecoder: Object.freeze({
        create(encoding = "utf-8") {
          return new util_1.TextDecoder(encoding);
        }
      }),
      console,
      timer: Object.freeze({
        setTimeout(callback, ms, ...args) {
          const handle = setTimeout(callback, ms, ...args);
          return { dispose: () => clearTimeout(handle) };
        },
        setImmediate(callback, ...args) {
          const handle = setImmediate(callback, ...args);
          return { dispose: () => clearImmediate(handle) };
        },
        setInterval(callback, ms, ...args) {
          const handle = setInterval(callback, ms, ...args);
          return { dispose: () => clearInterval(handle) };
        }
      }),
      Connection: Object.freeze({
        async createWorker(port, world, timeout) {
          if (port === void 0) {
            port = worker_threads_1.parentPort;
          }
          if (!(port instanceof MessagePort)) {
            throw new Error(`Expected MessagePort`);
          }
          const connection = await Promise.resolve().then(() => __toESM(require_connection2()));
          return new connection.WorkerConnection(port, world, timeout);
        },
        async createMain(port) {
          if (!(port instanceof MessagePort) && !(port instanceof worker_threads_1.Worker)) {
            throw new Error(`Expected MessagePort or Worker`);
          }
          const connection = await Promise.resolve().then(() => __toESM(require_connection2()));
          return new connection.MainConnection(port);
        }
      }),
      Worker: Object.freeze({
        getPort() {
          return worker_threads_1.parentPort;
        },
        getArgs() {
          return process.argv.slice(2);
        },
        get exitCode() {
          return process.exitCode;
        },
        set exitCode(value) {
          process.exitCode = value;
        }
      }),
      WebAssembly: Object.freeze({
        compile(bytes) {
          return WebAssembly.compile(bytes);
        },
        instantiate(module2, imports) {
          return WebAssembly.instantiate(module2, imports);
        }
      })
    });
    function RIL() {
      return _ril;
    }
    (function(RIL2) {
      function install() {
        if (!ral_1.default.isInstalled()) {
          ral_1.default.install(_ril);
        }
      }
      RIL2.install = install;
    })(RIL || (RIL = {}));
    if (!ral_1.default.isInstalled()) {
      ral_1.default.install(_ril);
    }
    exports.default = RIL;
  }
});

// vaporview/node_modules/@vscode/wasm-component-model/lib/common/api.js
var require_api = __commonJS({
  "vaporview/node_modules/@vscode/wasm-component-model/lib/common/api.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.f32 = exports.char = exports.byte = exports.bool = exports.WasmContext = exports.VariantType = exports.Uint8ArrayType = exports.Uint32ArrayType = exports.Uint16ArrayType = exports.TupleType = exports.StaticMethodType = exports.ResultType = exports.ResultError = exports.ResourceType = exports.ResourceManagers = exports.ResourceManager = exports.ResourceHandleType = exports.Resource = exports.RecordType = exports.ReadonlyMemoryRange = exports.PackageType = exports.OwnType = exports.Options = exports.OptionType = exports.MethodType = exports.MemoryRange = exports.MemoryError = exports.Memory = exports.ListType = exports.InterfaceType = exports.Int8ArrayType = exports.Int32ArrayType = exports.Int16ArrayType = exports.FunctionType = exports.FlatTypeKind = exports.FlagsType = exports.EnumType = exports.DestructorType = exports.ConstructorType = exports.ComponentModelTypeKind = exports.ComponentModelTrap = exports.ComponentModelContext = exports.BorrowType = exports.BigUint64ArrayType = exports.BigInt64ArrayType = exports.BaseMemoryRange = exports.Alignment = exports.$main = exports.$imports = exports.$exports = void 0;
    exports.RAL = exports.Connection = exports.wstring = exports.u8 = exports.u64 = exports.u32 = exports.u16 = exports.size = exports.s8 = exports.s64 = exports.s32 = exports.s16 = exports.result = exports.ptr = exports.option = exports.i64 = exports.i32 = exports.float64 = exports.float32 = exports.f64 = void 0;
    var ral_1 = __importDefault(require_ral());
    exports.RAL = ral_1.default;
    var componentModel_1 = require_componentModel();
    Object.defineProperty(exports, "$exports", { enumerable: true, get: function() {
      return componentModel_1.$exports;
    } });
    Object.defineProperty(exports, "$imports", { enumerable: true, get: function() {
      return componentModel_1.$imports;
    } });
    Object.defineProperty(exports, "$main", { enumerable: true, get: function() {
      return componentModel_1.$main;
    } });
    Object.defineProperty(exports, "Alignment", { enumerable: true, get: function() {
      return componentModel_1.Alignment;
    } });
    Object.defineProperty(exports, "BaseMemoryRange", { enumerable: true, get: function() {
      return componentModel_1.BaseMemoryRange;
    } });
    Object.defineProperty(exports, "BigInt64ArrayType", { enumerable: true, get: function() {
      return componentModel_1.BigInt64ArrayType;
    } });
    Object.defineProperty(exports, "BigUint64ArrayType", { enumerable: true, get: function() {
      return componentModel_1.BigUint64ArrayType;
    } });
    Object.defineProperty(exports, "BorrowType", { enumerable: true, get: function() {
      return componentModel_1.BorrowType;
    } });
    Object.defineProperty(exports, "ComponentModelContext", { enumerable: true, get: function() {
      return componentModel_1.ComponentModelContext;
    } });
    Object.defineProperty(exports, "ComponentModelTrap", { enumerable: true, get: function() {
      return componentModel_1.ComponentModelTrap;
    } });
    Object.defineProperty(exports, "ComponentModelTypeKind", { enumerable: true, get: function() {
      return componentModel_1.ComponentModelTypeKind;
    } });
    Object.defineProperty(exports, "ConstructorType", { enumerable: true, get: function() {
      return componentModel_1.ConstructorType;
    } });
    Object.defineProperty(exports, "DestructorType", { enumerable: true, get: function() {
      return componentModel_1.DestructorType;
    } });
    Object.defineProperty(exports, "EnumType", { enumerable: true, get: function() {
      return componentModel_1.EnumType;
    } });
    Object.defineProperty(exports, "FlagsType", { enumerable: true, get: function() {
      return componentModel_1.FlagsType;
    } });
    Object.defineProperty(exports, "FlatTypeKind", { enumerable: true, get: function() {
      return componentModel_1.FlatTypeKind;
    } });
    Object.defineProperty(exports, "FunctionType", { enumerable: true, get: function() {
      return componentModel_1.FunctionType;
    } });
    Object.defineProperty(exports, "Int16ArrayType", { enumerable: true, get: function() {
      return componentModel_1.Int16ArrayType;
    } });
    Object.defineProperty(exports, "Int32ArrayType", { enumerable: true, get: function() {
      return componentModel_1.Int32ArrayType;
    } });
    Object.defineProperty(exports, "Int8ArrayType", { enumerable: true, get: function() {
      return componentModel_1.Int8ArrayType;
    } });
    Object.defineProperty(exports, "InterfaceType", { enumerable: true, get: function() {
      return componentModel_1.InterfaceType;
    } });
    Object.defineProperty(exports, "ListType", { enumerable: true, get: function() {
      return componentModel_1.ListType;
    } });
    Object.defineProperty(exports, "Memory", { enumerable: true, get: function() {
      return componentModel_1.Memory;
    } });
    Object.defineProperty(exports, "MemoryError", { enumerable: true, get: function() {
      return componentModel_1.MemoryError;
    } });
    Object.defineProperty(exports, "MemoryRange", { enumerable: true, get: function() {
      return componentModel_1.MemoryRange;
    } });
    Object.defineProperty(exports, "MethodType", { enumerable: true, get: function() {
      return componentModel_1.MethodType;
    } });
    Object.defineProperty(exports, "OptionType", { enumerable: true, get: function() {
      return componentModel_1.OptionType;
    } });
    Object.defineProperty(exports, "Options", { enumerable: true, get: function() {
      return componentModel_1.Options;
    } });
    Object.defineProperty(exports, "OwnType", { enumerable: true, get: function() {
      return componentModel_1.OwnType;
    } });
    Object.defineProperty(exports, "PackageType", { enumerable: true, get: function() {
      return componentModel_1.PackageType;
    } });
    Object.defineProperty(exports, "ReadonlyMemoryRange", { enumerable: true, get: function() {
      return componentModel_1.ReadonlyMemoryRange;
    } });
    Object.defineProperty(exports, "RecordType", { enumerable: true, get: function() {
      return componentModel_1.RecordType;
    } });
    Object.defineProperty(exports, "Resource", { enumerable: true, get: function() {
      return componentModel_1.Resource;
    } });
    Object.defineProperty(exports, "ResourceHandleType", { enumerable: true, get: function() {
      return componentModel_1.ResourceHandleType;
    } });
    Object.defineProperty(exports, "ResourceManager", { enumerable: true, get: function() {
      return componentModel_1.ResourceManager;
    } });
    Object.defineProperty(exports, "ResourceManagers", { enumerable: true, get: function() {
      return componentModel_1.ResourceManagers;
    } });
    Object.defineProperty(exports, "ResourceType", { enumerable: true, get: function() {
      return componentModel_1.ResourceType;
    } });
    Object.defineProperty(exports, "ResultError", { enumerable: true, get: function() {
      return componentModel_1.ResultError;
    } });
    Object.defineProperty(exports, "ResultType", { enumerable: true, get: function() {
      return componentModel_1.ResultType;
    } });
    Object.defineProperty(exports, "StaticMethodType", { enumerable: true, get: function() {
      return componentModel_1.StaticMethodType;
    } });
    Object.defineProperty(exports, "TupleType", { enumerable: true, get: function() {
      return componentModel_1.TupleType;
    } });
    Object.defineProperty(exports, "Uint16ArrayType", { enumerable: true, get: function() {
      return componentModel_1.Uint16ArrayType;
    } });
    Object.defineProperty(exports, "Uint32ArrayType", { enumerable: true, get: function() {
      return componentModel_1.Uint32ArrayType;
    } });
    Object.defineProperty(exports, "Uint8ArrayType", { enumerable: true, get: function() {
      return componentModel_1.Uint8ArrayType;
    } });
    Object.defineProperty(exports, "VariantType", { enumerable: true, get: function() {
      return componentModel_1.VariantType;
    } });
    Object.defineProperty(exports, "WasmContext", { enumerable: true, get: function() {
      return componentModel_1.WasmContext;
    } });
    Object.defineProperty(exports, "bool", { enumerable: true, get: function() {
      return componentModel_1.bool;
    } });
    Object.defineProperty(exports, "byte", { enumerable: true, get: function() {
      return componentModel_1.byte;
    } });
    Object.defineProperty(exports, "char", { enumerable: true, get: function() {
      return componentModel_1.char;
    } });
    Object.defineProperty(exports, "f32", { enumerable: true, get: function() {
      return componentModel_1.f32;
    } });
    Object.defineProperty(exports, "f64", { enumerable: true, get: function() {
      return componentModel_1.f64;
    } });
    Object.defineProperty(exports, "float32", { enumerable: true, get: function() {
      return componentModel_1.float32;
    } });
    Object.defineProperty(exports, "float64", { enumerable: true, get: function() {
      return componentModel_1.float64;
    } });
    Object.defineProperty(exports, "i32", { enumerable: true, get: function() {
      return componentModel_1.i32;
    } });
    Object.defineProperty(exports, "i64", { enumerable: true, get: function() {
      return componentModel_1.i64;
    } });
    Object.defineProperty(exports, "option", { enumerable: true, get: function() {
      return componentModel_1.option;
    } });
    Object.defineProperty(exports, "ptr", { enumerable: true, get: function() {
      return componentModel_1.ptr;
    } });
    Object.defineProperty(exports, "result", { enumerable: true, get: function() {
      return componentModel_1.result;
    } });
    Object.defineProperty(exports, "s16", { enumerable: true, get: function() {
      return componentModel_1.s16;
    } });
    Object.defineProperty(exports, "s32", { enumerable: true, get: function() {
      return componentModel_1.s32;
    } });
    Object.defineProperty(exports, "s64", { enumerable: true, get: function() {
      return componentModel_1.s64;
    } });
    Object.defineProperty(exports, "s8", { enumerable: true, get: function() {
      return componentModel_1.s8;
    } });
    Object.defineProperty(exports, "size", { enumerable: true, get: function() {
      return componentModel_1.size;
    } });
    Object.defineProperty(exports, "u16", { enumerable: true, get: function() {
      return componentModel_1.u16;
    } });
    Object.defineProperty(exports, "u32", { enumerable: true, get: function() {
      return componentModel_1.u32;
    } });
    Object.defineProperty(exports, "u64", { enumerable: true, get: function() {
      return componentModel_1.u64;
    } });
    Object.defineProperty(exports, "u8", { enumerable: true, get: function() {
      return componentModel_1.u8;
    } });
    Object.defineProperty(exports, "wstring", { enumerable: true, get: function() {
      return componentModel_1.wstring;
    } });
    var connection_1 = require_connection();
    Object.defineProperty(exports, "Connection", { enumerable: true, get: function() {
      return connection_1.Connection;
    } });
  }
});

// vaporview/node_modules/@vscode/wasm-component-model/lib/node/main.js
var require_main = __commonJS({
  "vaporview/node_modules/@vscode/wasm-component-model/lib/node/main.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var ril_1 = __importDefault(require_ril());
    ril_1.default.install();
    __exportStar(require_api(), exports);
  }
});

// vaporview/node_modules/fast-plist/release/src/main.js
var require_main2 = __commonJS({
  "vaporview/node_modules/fast-plist/release/src/main.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.parse = exports.parseWithLocation = void 0;
    function parseWithLocation(content, filename, locationKeyName) {
      return _parse(content, filename, locationKeyName);
    }
    exports.parseWithLocation = parseWithLocation;
    function parse3(content) {
      return _parse(content, null, null);
    }
    exports.parse = parse3;
    function _parse(content, filename, locationKeyName) {
      var len = content.length;
      var pos = 0;
      var line = 1;
      var char = 0;
      if (len > 0 && content.charCodeAt(0) === 65279) {
        pos = 1;
      }
      function advancePosBy(by) {
        if (locationKeyName === null) {
          pos = pos + by;
        } else {
          while (by > 0) {
            var chCode2 = content.charCodeAt(pos);
            if (chCode2 === 10) {
              pos++;
              line++;
              char = 0;
            } else {
              pos++;
              char++;
            }
            by--;
          }
        }
      }
      function advancePosTo(to) {
        if (locationKeyName === null) {
          pos = to;
        } else {
          advancePosBy(to - pos);
        }
      }
      function skipWhitespace() {
        while (pos < len) {
          var chCode2 = content.charCodeAt(pos);
          if (chCode2 !== 32 && chCode2 !== 9 && chCode2 !== 13 && chCode2 !== 10) {
            break;
          }
          advancePosBy(1);
        }
      }
      function advanceIfStartsWith(str) {
        if (content.substr(pos, str.length) === str) {
          advancePosBy(str.length);
          return true;
        }
        return false;
      }
      function advanceUntil(str) {
        var nextOccurence = content.indexOf(str, pos);
        if (nextOccurence !== -1) {
          advancePosTo(nextOccurence + str.length);
        } else {
          advancePosTo(len);
        }
      }
      function captureUntil(str) {
        var nextOccurence = content.indexOf(str, pos);
        if (nextOccurence !== -1) {
          var r = content.substring(pos, nextOccurence);
          advancePosTo(nextOccurence + str.length);
          return r;
        } else {
          var r = content.substr(pos);
          advancePosTo(len);
          return r;
        }
      }
      var state = 0;
      var cur = null;
      var stateStack = [];
      var objStack = [];
      var curKey = null;
      function pushState(newState, newCur) {
        stateStack.push(state);
        objStack.push(cur);
        state = newState;
        cur = newCur;
      }
      function popState() {
        if (stateStack.length === 0) {
          return fail("illegal state stack");
        }
        state = stateStack.pop();
        cur = objStack.pop();
      }
      function fail(msg) {
        throw new Error("Near offset " + pos + ": " + msg + " ~~~" + content.substr(pos, 50) + "~~~");
      }
      var dictState = {
        enterDict: function() {
          if (curKey === null) {
            return fail("missing <key>");
          }
          var newDict = {};
          if (locationKeyName !== null) {
            newDict[locationKeyName] = {
              filename,
              line,
              char
            };
          }
          cur[curKey] = newDict;
          curKey = null;
          pushState(1, newDict);
        },
        enterArray: function() {
          if (curKey === null) {
            return fail("missing <key>");
          }
          var newArr = [];
          cur[curKey] = newArr;
          curKey = null;
          pushState(2, newArr);
        }
      };
      var arrState = {
        enterDict: function() {
          var newDict = {};
          if (locationKeyName !== null) {
            newDict[locationKeyName] = {
              filename,
              line,
              char
            };
          }
          cur.push(newDict);
          pushState(1, newDict);
        },
        enterArray: function() {
          var newArr = [];
          cur.push(newArr);
          pushState(2, newArr);
        }
      };
      function enterDict() {
        if (state === 1) {
          dictState.enterDict();
        } else if (state === 2) {
          arrState.enterDict();
        } else {
          cur = {};
          if (locationKeyName !== null) {
            cur[locationKeyName] = {
              filename,
              line,
              char
            };
          }
          pushState(1, cur);
        }
      }
      function leaveDict() {
        if (state === 1) {
          popState();
        } else if (state === 2) {
          return fail("unexpected </dict>");
        } else {
          return fail("unexpected </dict>");
        }
      }
      function enterArray() {
        if (state === 1) {
          dictState.enterArray();
        } else if (state === 2) {
          arrState.enterArray();
        } else {
          cur = [];
          pushState(2, cur);
        }
      }
      function leaveArray() {
        if (state === 1) {
          return fail("unexpected </array>");
        } else if (state === 2) {
          popState();
        } else {
          return fail("unexpected </array>");
        }
      }
      function acceptKey(val) {
        if (state === 1) {
          if (curKey !== null) {
            return fail("too many <key>");
          }
          curKey = val;
        } else if (state === 2) {
          return fail("unexpected <key>");
        } else {
          return fail("unexpected <key>");
        }
      }
      function acceptString(val) {
        if (state === 1) {
          if (curKey === null) {
            return fail("missing <key>");
          }
          cur[curKey] = val;
          curKey = null;
        } else if (state === 2) {
          cur.push(val);
        } else {
          cur = val;
        }
      }
      function acceptReal(val) {
        if (isNaN(val)) {
          return fail("cannot parse float");
        }
        if (state === 1) {
          if (curKey === null) {
            return fail("missing <key>");
          }
          cur[curKey] = val;
          curKey = null;
        } else if (state === 2) {
          cur.push(val);
        } else {
          cur = val;
        }
      }
      function acceptInteger(val) {
        if (isNaN(val)) {
          return fail("cannot parse integer");
        }
        if (state === 1) {
          if (curKey === null) {
            return fail("missing <key>");
          }
          cur[curKey] = val;
          curKey = null;
        } else if (state === 2) {
          cur.push(val);
        } else {
          cur = val;
        }
      }
      function acceptDate(val) {
        if (state === 1) {
          if (curKey === null) {
            return fail("missing <key>");
          }
          cur[curKey] = val;
          curKey = null;
        } else if (state === 2) {
          cur.push(val);
        } else {
          cur = val;
        }
      }
      function acceptData(val) {
        if (state === 1) {
          if (curKey === null) {
            return fail("missing <key>");
          }
          cur[curKey] = val;
          curKey = null;
        } else if (state === 2) {
          cur.push(val);
        } else {
          cur = val;
        }
      }
      function acceptBool(val) {
        if (state === 1) {
          if (curKey === null) {
            return fail("missing <key>");
          }
          cur[curKey] = val;
          curKey = null;
        } else if (state === 2) {
          cur.push(val);
        } else {
          cur = val;
        }
      }
      function escapeVal(str) {
        return str.replace(/&#([0-9]+);/g, function(_, m0) {
          return String.fromCodePoint(parseInt(m0, 10));
        }).replace(/&#x([0-9a-f]+);/g, function(_, m0) {
          return String.fromCodePoint(parseInt(m0, 16));
        }).replace(/&amp;|&lt;|&gt;|&quot;|&apos;/g, function(_) {
          switch (_) {
            case "&amp;":
              return "&";
            case "&lt;":
              return "<";
            case "&gt;":
              return ">";
            case "&quot;":
              return '"';
            case "&apos;":
              return "'";
          }
          return _;
        });
      }
      function parseOpenTag() {
        var r = captureUntil(">");
        var isClosed = false;
        if (r.charCodeAt(r.length - 1) === 47) {
          isClosed = true;
          r = r.substring(0, r.length - 1);
        }
        return {
          name: r.trim(),
          isClosed
        };
      }
      function parseTagValue(tag2) {
        if (tag2.isClosed) {
          return "";
        }
        var val = captureUntil("</");
        advanceUntil(">");
        return escapeVal(val);
      }
      while (pos < len) {
        skipWhitespace();
        if (pos >= len) {
          break;
        }
        var chCode = content.charCodeAt(pos);
        advancePosBy(1);
        if (chCode !== 60) {
          return fail("expected <");
        }
        if (pos >= len) {
          return fail("unexpected end of input");
        }
        var peekChCode = content.charCodeAt(pos);
        if (peekChCode === 63) {
          advancePosBy(1);
          advanceUntil("?>");
          continue;
        }
        if (peekChCode === 33) {
          advancePosBy(1);
          if (advanceIfStartsWith("--")) {
            advanceUntil("-->");
            continue;
          }
          advanceUntil(">");
          continue;
        }
        if (peekChCode === 47) {
          advancePosBy(1);
          skipWhitespace();
          if (advanceIfStartsWith("plist")) {
            advanceUntil(">");
            continue;
          }
          if (advanceIfStartsWith("dict")) {
            advanceUntil(">");
            leaveDict();
            continue;
          }
          if (advanceIfStartsWith("array")) {
            advanceUntil(">");
            leaveArray();
            continue;
          }
          return fail("unexpected closed tag");
        }
        var tag = parseOpenTag();
        switch (tag.name) {
          case "dict":
            enterDict();
            if (tag.isClosed) {
              leaveDict();
            }
            continue;
          case "array":
            enterArray();
            if (tag.isClosed) {
              leaveArray();
            }
            continue;
          case "key":
            acceptKey(parseTagValue(tag));
            continue;
          case "string":
            acceptString(parseTagValue(tag));
            continue;
          case "real":
            acceptReal(parseFloat(parseTagValue(tag)));
            continue;
          case "integer":
            acceptInteger(parseInt(parseTagValue(tag), 10));
            continue;
          case "date":
            acceptDate(new Date(parseTagValue(tag)));
            continue;
          case "data":
            acceptData(parseTagValue(tag));
            continue;
          case "true":
            parseTagValue(tag);
            acceptBool(true);
            continue;
          case "false":
            parseTagValue(tag);
            acceptBool(false);
            continue;
        }
        if (/^plist/.test(tag.name)) {
          continue;
        }
        return fail("unexpected opened tag " + tag.name);
      }
      return cur;
    }
  }
});

// vaporview/node_modules/jsonc-parser/lib/esm/impl/scanner.js
function createScanner(text, ignoreTrivia = false) {
  const len = text.length;
  let pos = 0, value = "", tokenOffset = 0, token = 16, lineNumber = 0, lineStartOffset = 0, tokenLineStartOffset = 0, prevTokenLineStartOffset = 0, scanError = 0;
  function scanHexDigits(count, exact) {
    let digits = 0;
    let value2 = 0;
    while (digits < count || !exact) {
      let ch = text.charCodeAt(pos);
      if (ch >= 48 && ch <= 57) {
        value2 = value2 * 16 + ch - 48;
      } else if (ch >= 65 && ch <= 70) {
        value2 = value2 * 16 + ch - 65 + 10;
      } else if (ch >= 97 && ch <= 102) {
        value2 = value2 * 16 + ch - 97 + 10;
      } else {
        break;
      }
      pos++;
      digits++;
    }
    if (digits < count) {
      value2 = -1;
    }
    return value2;
  }
  function setPosition(newPosition) {
    pos = newPosition;
    value = "";
    tokenOffset = 0;
    token = 16;
    scanError = 0;
  }
  function scanNumber() {
    let start = pos;
    if (text.charCodeAt(pos) === 48) {
      pos++;
    } else {
      pos++;
      while (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
      }
    }
    if (pos < text.length && text.charCodeAt(pos) === 46) {
      pos++;
      if (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
        while (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
        }
      } else {
        scanError = 3;
        return text.substring(start, pos);
      }
    }
    let end = pos;
    if (pos < text.length && (text.charCodeAt(pos) === 69 || text.charCodeAt(pos) === 101)) {
      pos++;
      if (pos < text.length && text.charCodeAt(pos) === 43 || text.charCodeAt(pos) === 45) {
        pos++;
      }
      if (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
        while (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
        }
        end = pos;
      } else {
        scanError = 3;
      }
    }
    return text.substring(start, end);
  }
  function scanString() {
    let result = "", start = pos;
    while (true) {
      if (pos >= len) {
        result += text.substring(start, pos);
        scanError = 2;
        break;
      }
      const ch = text.charCodeAt(pos);
      if (ch === 34) {
        result += text.substring(start, pos);
        pos++;
        break;
      }
      if (ch === 92) {
        result += text.substring(start, pos);
        pos++;
        if (pos >= len) {
          scanError = 2;
          break;
        }
        const ch2 = text.charCodeAt(pos++);
        switch (ch2) {
          case 34:
            result += '"';
            break;
          case 92:
            result += "\\";
            break;
          case 47:
            result += "/";
            break;
          case 98:
            result += "\b";
            break;
          case 102:
            result += "\f";
            break;
          case 110:
            result += "\n";
            break;
          case 114:
            result += "\r";
            break;
          case 116:
            result += "	";
            break;
          case 117:
            const ch3 = scanHexDigits(4, true);
            if (ch3 >= 0) {
              result += String.fromCharCode(ch3);
            } else {
              scanError = 4;
            }
            break;
          default:
            scanError = 5;
        }
        start = pos;
        continue;
      }
      if (ch >= 0 && ch <= 31) {
        if (isLineBreak(ch)) {
          result += text.substring(start, pos);
          scanError = 2;
          break;
        } else {
          scanError = 6;
        }
      }
      pos++;
    }
    return result;
  }
  function scanNext() {
    value = "";
    scanError = 0;
    tokenOffset = pos;
    lineStartOffset = lineNumber;
    prevTokenLineStartOffset = tokenLineStartOffset;
    if (pos >= len) {
      tokenOffset = len;
      return token = 17;
    }
    let code = text.charCodeAt(pos);
    if (isWhiteSpace(code)) {
      do {
        pos++;
        value += String.fromCharCode(code);
        code = text.charCodeAt(pos);
      } while (isWhiteSpace(code));
      return token = 15;
    }
    if (isLineBreak(code)) {
      pos++;
      value += String.fromCharCode(code);
      if (code === 13 && text.charCodeAt(pos) === 10) {
        pos++;
        value += "\n";
      }
      lineNumber++;
      tokenLineStartOffset = pos;
      return token = 14;
    }
    switch (code) {
      // tokens: []{}:,
      case 123:
        pos++;
        return token = 1;
      case 125:
        pos++;
        return token = 2;
      case 91:
        pos++;
        return token = 3;
      case 93:
        pos++;
        return token = 4;
      case 58:
        pos++;
        return token = 6;
      case 44:
        pos++;
        return token = 5;
      // strings
      case 34:
        pos++;
        value = scanString();
        return token = 10;
      // comments
      case 47:
        const start = pos - 1;
        if (text.charCodeAt(pos + 1) === 47) {
          pos += 2;
          while (pos < len) {
            if (isLineBreak(text.charCodeAt(pos))) {
              break;
            }
            pos++;
          }
          value = text.substring(start, pos);
          return token = 12;
        }
        if (text.charCodeAt(pos + 1) === 42) {
          pos += 2;
          const safeLength = len - 1;
          let commentClosed = false;
          while (pos < safeLength) {
            const ch = text.charCodeAt(pos);
            if (ch === 42 && text.charCodeAt(pos + 1) === 47) {
              pos += 2;
              commentClosed = true;
              break;
            }
            pos++;
            if (isLineBreak(ch)) {
              if (ch === 13 && text.charCodeAt(pos) === 10) {
                pos++;
              }
              lineNumber++;
              tokenLineStartOffset = pos;
            }
          }
          if (!commentClosed) {
            pos++;
            scanError = 1;
          }
          value = text.substring(start, pos);
          return token = 13;
        }
        value += String.fromCharCode(code);
        pos++;
        return token = 16;
      // numbers
      case 45:
        value += String.fromCharCode(code);
        pos++;
        if (pos === len || !isDigit(text.charCodeAt(pos))) {
          return token = 16;
        }
      // found a minus, followed by a number so
      // we fall through to proceed with scanning
      // numbers
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        value += scanNumber();
        return token = 11;
      // literals and unknown symbols
      default:
        while (pos < len && isUnknownContentCharacter(code)) {
          pos++;
          code = text.charCodeAt(pos);
        }
        if (tokenOffset !== pos) {
          value = text.substring(tokenOffset, pos);
          switch (value) {
            case "true":
              return token = 8;
            case "false":
              return token = 9;
            case "null":
              return token = 7;
          }
          return token = 16;
        }
        value += String.fromCharCode(code);
        pos++;
        return token = 16;
    }
  }
  function isUnknownContentCharacter(code) {
    if (isWhiteSpace(code) || isLineBreak(code)) {
      return false;
    }
    switch (code) {
      case 125:
      case 93:
      case 123:
      case 91:
      case 34:
      case 58:
      case 44:
      case 47:
        return false;
    }
    return true;
  }
  function scanNextNonTrivia() {
    let result;
    do {
      result = scanNext();
    } while (result >= 12 && result <= 15);
    return result;
  }
  return {
    setPosition,
    getPosition: () => pos,
    scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
    getToken: () => token,
    getTokenValue: () => value,
    getTokenOffset: () => tokenOffset,
    getTokenLength: () => pos - tokenOffset,
    getTokenStartLine: () => lineStartOffset,
    getTokenStartCharacter: () => tokenOffset - prevTokenLineStartOffset,
    getTokenError: () => scanError
  };
}
function isWhiteSpace(ch) {
  return ch === 32 || ch === 9;
}
function isLineBreak(ch) {
  return ch === 10 || ch === 13;
}
function isDigit(ch) {
  return ch >= 48 && ch <= 57;
}
var CharacterCodes;
var init_scanner = __esm({
  "vaporview/node_modules/jsonc-parser/lib/esm/impl/scanner.js"() {
    "use strict";
    (function(CharacterCodes2) {
      CharacterCodes2[CharacterCodes2["lineFeed"] = 10] = "lineFeed";
      CharacterCodes2[CharacterCodes2["carriageReturn"] = 13] = "carriageReturn";
      CharacterCodes2[CharacterCodes2["space"] = 32] = "space";
      CharacterCodes2[CharacterCodes2["_0"] = 48] = "_0";
      CharacterCodes2[CharacterCodes2["_1"] = 49] = "_1";
      CharacterCodes2[CharacterCodes2["_2"] = 50] = "_2";
      CharacterCodes2[CharacterCodes2["_3"] = 51] = "_3";
      CharacterCodes2[CharacterCodes2["_4"] = 52] = "_4";
      CharacterCodes2[CharacterCodes2["_5"] = 53] = "_5";
      CharacterCodes2[CharacterCodes2["_6"] = 54] = "_6";
      CharacterCodes2[CharacterCodes2["_7"] = 55] = "_7";
      CharacterCodes2[CharacterCodes2["_8"] = 56] = "_8";
      CharacterCodes2[CharacterCodes2["_9"] = 57] = "_9";
      CharacterCodes2[CharacterCodes2["a"] = 97] = "a";
      CharacterCodes2[CharacterCodes2["b"] = 98] = "b";
      CharacterCodes2[CharacterCodes2["c"] = 99] = "c";
      CharacterCodes2[CharacterCodes2["d"] = 100] = "d";
      CharacterCodes2[CharacterCodes2["e"] = 101] = "e";
      CharacterCodes2[CharacterCodes2["f"] = 102] = "f";
      CharacterCodes2[CharacterCodes2["g"] = 103] = "g";
      CharacterCodes2[CharacterCodes2["h"] = 104] = "h";
      CharacterCodes2[CharacterCodes2["i"] = 105] = "i";
      CharacterCodes2[CharacterCodes2["j"] = 106] = "j";
      CharacterCodes2[CharacterCodes2["k"] = 107] = "k";
      CharacterCodes2[CharacterCodes2["l"] = 108] = "l";
      CharacterCodes2[CharacterCodes2["m"] = 109] = "m";
      CharacterCodes2[CharacterCodes2["n"] = 110] = "n";
      CharacterCodes2[CharacterCodes2["o"] = 111] = "o";
      CharacterCodes2[CharacterCodes2["p"] = 112] = "p";
      CharacterCodes2[CharacterCodes2["q"] = 113] = "q";
      CharacterCodes2[CharacterCodes2["r"] = 114] = "r";
      CharacterCodes2[CharacterCodes2["s"] = 115] = "s";
      CharacterCodes2[CharacterCodes2["t"] = 116] = "t";
      CharacterCodes2[CharacterCodes2["u"] = 117] = "u";
      CharacterCodes2[CharacterCodes2["v"] = 118] = "v";
      CharacterCodes2[CharacterCodes2["w"] = 119] = "w";
      CharacterCodes2[CharacterCodes2["x"] = 120] = "x";
      CharacterCodes2[CharacterCodes2["y"] = 121] = "y";
      CharacterCodes2[CharacterCodes2["z"] = 122] = "z";
      CharacterCodes2[CharacterCodes2["A"] = 65] = "A";
      CharacterCodes2[CharacterCodes2["B"] = 66] = "B";
      CharacterCodes2[CharacterCodes2["C"] = 67] = "C";
      CharacterCodes2[CharacterCodes2["D"] = 68] = "D";
      CharacterCodes2[CharacterCodes2["E"] = 69] = "E";
      CharacterCodes2[CharacterCodes2["F"] = 70] = "F";
      CharacterCodes2[CharacterCodes2["G"] = 71] = "G";
      CharacterCodes2[CharacterCodes2["H"] = 72] = "H";
      CharacterCodes2[CharacterCodes2["I"] = 73] = "I";
      CharacterCodes2[CharacterCodes2["J"] = 74] = "J";
      CharacterCodes2[CharacterCodes2["K"] = 75] = "K";
      CharacterCodes2[CharacterCodes2["L"] = 76] = "L";
      CharacterCodes2[CharacterCodes2["M"] = 77] = "M";
      CharacterCodes2[CharacterCodes2["N"] = 78] = "N";
      CharacterCodes2[CharacterCodes2["O"] = 79] = "O";
      CharacterCodes2[CharacterCodes2["P"] = 80] = "P";
      CharacterCodes2[CharacterCodes2["Q"] = 81] = "Q";
      CharacterCodes2[CharacterCodes2["R"] = 82] = "R";
      CharacterCodes2[CharacterCodes2["S"] = 83] = "S";
      CharacterCodes2[CharacterCodes2["T"] = 84] = "T";
      CharacterCodes2[CharacterCodes2["U"] = 85] = "U";
      CharacterCodes2[CharacterCodes2["V"] = 86] = "V";
      CharacterCodes2[CharacterCodes2["W"] = 87] = "W";
      CharacterCodes2[CharacterCodes2["X"] = 88] = "X";
      CharacterCodes2[CharacterCodes2["Y"] = 89] = "Y";
      CharacterCodes2[CharacterCodes2["Z"] = 90] = "Z";
      CharacterCodes2[CharacterCodes2["asterisk"] = 42] = "asterisk";
      CharacterCodes2[CharacterCodes2["backslash"] = 92] = "backslash";
      CharacterCodes2[CharacterCodes2["closeBrace"] = 125] = "closeBrace";
      CharacterCodes2[CharacterCodes2["closeBracket"] = 93] = "closeBracket";
      CharacterCodes2[CharacterCodes2["colon"] = 58] = "colon";
      CharacterCodes2[CharacterCodes2["comma"] = 44] = "comma";
      CharacterCodes2[CharacterCodes2["dot"] = 46] = "dot";
      CharacterCodes2[CharacterCodes2["doubleQuote"] = 34] = "doubleQuote";
      CharacterCodes2[CharacterCodes2["minus"] = 45] = "minus";
      CharacterCodes2[CharacterCodes2["openBrace"] = 123] = "openBrace";
      CharacterCodes2[CharacterCodes2["openBracket"] = 91] = "openBracket";
      CharacterCodes2[CharacterCodes2["plus"] = 43] = "plus";
      CharacterCodes2[CharacterCodes2["slash"] = 47] = "slash";
      CharacterCodes2[CharacterCodes2["formFeed"] = 12] = "formFeed";
      CharacterCodes2[CharacterCodes2["tab"] = 9] = "tab";
    })(CharacterCodes || (CharacterCodes = {}));
  }
});

// vaporview/node_modules/jsonc-parser/lib/esm/impl/string-intern.js
var cachedSpaces, maxCachedValues, cachedBreakLinesWithSpaces, supportedEols;
var init_string_intern = __esm({
  "vaporview/node_modules/jsonc-parser/lib/esm/impl/string-intern.js"() {
    cachedSpaces = new Array(20).fill(0).map((_, index) => {
      return " ".repeat(index);
    });
    maxCachedValues = 200;
    cachedBreakLinesWithSpaces = {
      " ": {
        "\n": new Array(maxCachedValues).fill(0).map((_, index) => {
          return "\n" + " ".repeat(index);
        }),
        "\r": new Array(maxCachedValues).fill(0).map((_, index) => {
          return "\r" + " ".repeat(index);
        }),
        "\r\n": new Array(maxCachedValues).fill(0).map((_, index) => {
          return "\r\n" + " ".repeat(index);
        })
      },
      "	": {
        "\n": new Array(maxCachedValues).fill(0).map((_, index) => {
          return "\n" + "	".repeat(index);
        }),
        "\r": new Array(maxCachedValues).fill(0).map((_, index) => {
          return "\r" + "	".repeat(index);
        }),
        "\r\n": new Array(maxCachedValues).fill(0).map((_, index) => {
          return "\r\n" + "	".repeat(index);
        })
      }
    };
    supportedEols = ["\n", "\r", "\r\n"];
  }
});

// vaporview/node_modules/jsonc-parser/lib/esm/impl/format.js
function format(documentText, range, options) {
  let initialIndentLevel;
  let formatText;
  let formatTextStart;
  let rangeStart;
  let rangeEnd;
  if (range) {
    rangeStart = range.offset;
    rangeEnd = rangeStart + range.length;
    formatTextStart = rangeStart;
    while (formatTextStart > 0 && !isEOL(documentText, formatTextStart - 1)) {
      formatTextStart--;
    }
    let endOffset = rangeEnd;
    while (endOffset < documentText.length && !isEOL(documentText, endOffset)) {
      endOffset++;
    }
    formatText = documentText.substring(formatTextStart, endOffset);
    initialIndentLevel = computeIndentLevel(formatText, options);
  } else {
    formatText = documentText;
    initialIndentLevel = 0;
    formatTextStart = 0;
    rangeStart = 0;
    rangeEnd = documentText.length;
  }
  const eol = getEOL(options, documentText);
  const eolFastPathSupported = supportedEols.includes(eol);
  let numberLineBreaks = 0;
  let indentLevel = 0;
  let indentValue;
  if (options.insertSpaces) {
    indentValue = cachedSpaces[options.tabSize || 4] ?? repeat(cachedSpaces[1], options.tabSize || 4);
  } else {
    indentValue = "	";
  }
  const indentType = indentValue === "	" ? "	" : " ";
  let scanner = createScanner(formatText, false);
  let hasError = false;
  function newLinesAndIndent() {
    if (numberLineBreaks > 1) {
      return repeat(eol, numberLineBreaks) + repeat(indentValue, initialIndentLevel + indentLevel);
    }
    const amountOfSpaces = indentValue.length * (initialIndentLevel + indentLevel);
    if (!eolFastPathSupported || amountOfSpaces > cachedBreakLinesWithSpaces[indentType][eol].length) {
      return eol + repeat(indentValue, initialIndentLevel + indentLevel);
    }
    if (amountOfSpaces <= 0) {
      return eol;
    }
    return cachedBreakLinesWithSpaces[indentType][eol][amountOfSpaces];
  }
  function scanNext() {
    let token = scanner.scan();
    numberLineBreaks = 0;
    while (token === 15 || token === 14) {
      if (token === 14 && options.keepLines) {
        numberLineBreaks += 1;
      } else if (token === 14) {
        numberLineBreaks = 1;
      }
      token = scanner.scan();
    }
    hasError = token === 16 || scanner.getTokenError() !== 0;
    return token;
  }
  const editOperations = [];
  function addEdit(text, startOffset, endOffset) {
    if (!hasError && (!range || startOffset < rangeEnd && endOffset > rangeStart) && documentText.substring(startOffset, endOffset) !== text) {
      editOperations.push({ offset: startOffset, length: endOffset - startOffset, content: text });
    }
  }
  let firstToken = scanNext();
  if (options.keepLines && numberLineBreaks > 0) {
    addEdit(repeat(eol, numberLineBreaks), 0, 0);
  }
  if (firstToken !== 17) {
    let firstTokenStart = scanner.getTokenOffset() + formatTextStart;
    let initialIndent = indentValue.length * initialIndentLevel < 20 && options.insertSpaces ? cachedSpaces[indentValue.length * initialIndentLevel] : repeat(indentValue, initialIndentLevel);
    addEdit(initialIndent, formatTextStart, firstTokenStart);
  }
  while (firstToken !== 17) {
    let firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
    let secondToken = scanNext();
    let replaceContent = "";
    let needsLineBreak = false;
    while (numberLineBreaks === 0 && (secondToken === 12 || secondToken === 13)) {
      let commentTokenStart = scanner.getTokenOffset() + formatTextStart;
      addEdit(cachedSpaces[1], firstTokenEnd, commentTokenStart);
      firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
      needsLineBreak = secondToken === 12;
      replaceContent = needsLineBreak ? newLinesAndIndent() : "";
      secondToken = scanNext();
    }
    if (secondToken === 2) {
      if (firstToken !== 1) {
        indentLevel--;
      }
      ;
      if (options.keepLines && numberLineBreaks > 0 || !options.keepLines && firstToken !== 1) {
        replaceContent = newLinesAndIndent();
      } else if (options.keepLines) {
        replaceContent = cachedSpaces[1];
      }
    } else if (secondToken === 4) {
      if (firstToken !== 3) {
        indentLevel--;
      }
      ;
      if (options.keepLines && numberLineBreaks > 0 || !options.keepLines && firstToken !== 3) {
        replaceContent = newLinesAndIndent();
      } else if (options.keepLines) {
        replaceContent = cachedSpaces[1];
      }
    } else {
      switch (firstToken) {
        case 3:
        case 1:
          indentLevel++;
          if (options.keepLines && numberLineBreaks > 0 || !options.keepLines) {
            replaceContent = newLinesAndIndent();
          } else {
            replaceContent = cachedSpaces[1];
          }
          break;
        case 5:
          if (options.keepLines && numberLineBreaks > 0 || !options.keepLines) {
            replaceContent = newLinesAndIndent();
          } else {
            replaceContent = cachedSpaces[1];
          }
          break;
        case 12:
          replaceContent = newLinesAndIndent();
          break;
        case 13:
          if (numberLineBreaks > 0) {
            replaceContent = newLinesAndIndent();
          } else if (!needsLineBreak) {
            replaceContent = cachedSpaces[1];
          }
          break;
        case 6:
          if (options.keepLines && numberLineBreaks > 0) {
            replaceContent = newLinesAndIndent();
          } else if (!needsLineBreak) {
            replaceContent = cachedSpaces[1];
          }
          break;
        case 10:
          if (options.keepLines && numberLineBreaks > 0) {
            replaceContent = newLinesAndIndent();
          } else if (secondToken === 6 && !needsLineBreak) {
            replaceContent = "";
          }
          break;
        case 7:
        case 8:
        case 9:
        case 11:
        case 2:
        case 4:
          if (options.keepLines && numberLineBreaks > 0) {
            replaceContent = newLinesAndIndent();
          } else {
            if ((secondToken === 12 || secondToken === 13) && !needsLineBreak) {
              replaceContent = cachedSpaces[1];
            } else if (secondToken !== 5 && secondToken !== 17) {
              hasError = true;
            }
          }
          break;
        case 16:
          hasError = true;
          break;
      }
      if (numberLineBreaks > 0 && (secondToken === 12 || secondToken === 13)) {
        replaceContent = newLinesAndIndent();
      }
    }
    if (secondToken === 17) {
      if (options.keepLines && numberLineBreaks > 0) {
        replaceContent = newLinesAndIndent();
      } else {
        replaceContent = options.insertFinalNewline ? eol : "";
      }
    }
    const secondTokenStart = scanner.getTokenOffset() + formatTextStart;
    addEdit(replaceContent, firstTokenEnd, secondTokenStart);
    firstToken = secondToken;
  }
  return editOperations;
}
function repeat(s, count) {
  let result = "";
  for (let i = 0; i < count; i++) {
    result += s;
  }
  return result;
}
function computeIndentLevel(content, options) {
  let i = 0;
  let nChars = 0;
  const tabSize = options.tabSize || 4;
  while (i < content.length) {
    let ch = content.charAt(i);
    if (ch === cachedSpaces[1]) {
      nChars++;
    } else if (ch === "	") {
      nChars += tabSize;
    } else {
      break;
    }
    i++;
  }
  return Math.floor(nChars / tabSize);
}
function getEOL(options, text) {
  for (let i = 0; i < text.length; i++) {
    const ch = text.charAt(i);
    if (ch === "\r") {
      if (i + 1 < text.length && text.charAt(i + 1) === "\n") {
        return "\r\n";
      }
      return "\r";
    } else if (ch === "\n") {
      return "\n";
    }
  }
  return options && options.eol || "\n";
}
function isEOL(text, offset) {
  return "\r\n".indexOf(text.charAt(offset)) !== -1;
}
var init_format = __esm({
  "vaporview/node_modules/jsonc-parser/lib/esm/impl/format.js"() {
    "use strict";
    init_scanner();
    init_string_intern();
  }
});

// vaporview/node_modules/jsonc-parser/lib/esm/impl/parser.js
function getLocation(text, position) {
  const segments = [];
  const earlyReturnException = new Object();
  let previousNode = void 0;
  const previousNodeInst = {
    value: {},
    offset: 0,
    length: 0,
    type: "object",
    parent: void 0
  };
  let isAtPropertyKey = false;
  function setPreviousNode(value, offset, length, type) {
    previousNodeInst.value = value;
    previousNodeInst.offset = offset;
    previousNodeInst.length = length;
    previousNodeInst.type = type;
    previousNodeInst.colonOffset = void 0;
    previousNode = previousNodeInst;
  }
  try {
    visit(text, {
      onObjectBegin: (offset, length) => {
        if (position <= offset) {
          throw earlyReturnException;
        }
        previousNode = void 0;
        isAtPropertyKey = position > offset;
        segments.push("");
      },
      onObjectProperty: (name, offset, length) => {
        if (position < offset) {
          throw earlyReturnException;
        }
        setPreviousNode(name, offset, length, "property");
        segments[segments.length - 1] = name;
        if (position <= offset + length) {
          throw earlyReturnException;
        }
      },
      onObjectEnd: (offset, length) => {
        if (position <= offset) {
          throw earlyReturnException;
        }
        previousNode = void 0;
        segments.pop();
      },
      onArrayBegin: (offset, length) => {
        if (position <= offset) {
          throw earlyReturnException;
        }
        previousNode = void 0;
        segments.push(0);
      },
      onArrayEnd: (offset, length) => {
        if (position <= offset) {
          throw earlyReturnException;
        }
        previousNode = void 0;
        segments.pop();
      },
      onLiteralValue: (value, offset, length) => {
        if (position < offset) {
          throw earlyReturnException;
        }
        setPreviousNode(value, offset, length, getNodeType(value));
        if (position <= offset + length) {
          throw earlyReturnException;
        }
      },
      onSeparator: (sep2, offset, length) => {
        if (position <= offset) {
          throw earlyReturnException;
        }
        if (sep2 === ":" && previousNode && previousNode.type === "property") {
          previousNode.colonOffset = offset;
          isAtPropertyKey = false;
          previousNode = void 0;
        } else if (sep2 === ",") {
          const last = segments[segments.length - 1];
          if (typeof last === "number") {
            segments[segments.length - 1] = last + 1;
          } else {
            isAtPropertyKey = true;
            segments[segments.length - 1] = "";
          }
          previousNode = void 0;
        }
      }
    });
  } catch (e) {
    if (e !== earlyReturnException) {
      throw e;
    }
  }
  return {
    path: segments,
    previousNode,
    isAtPropertyKey,
    matches: (pattern) => {
      let k = 0;
      for (let i = 0; k < pattern.length && i < segments.length; i++) {
        if (pattern[k] === segments[i] || pattern[k] === "*") {
          k++;
        } else if (pattern[k] !== "**") {
          return false;
        }
      }
      return k === pattern.length;
    }
  };
}
function parse(text, errors = [], options = ParseOptions.DEFAULT) {
  let currentProperty = null;
  let currentParent = [];
  const previousParents = [];
  function onValue(value) {
    if (Array.isArray(currentParent)) {
      currentParent.push(value);
    } else if (currentProperty !== null) {
      currentParent[currentProperty] = value;
    }
  }
  const visitor = {
    onObjectBegin: () => {
      const object = {};
      onValue(object);
      previousParents.push(currentParent);
      currentParent = object;
      currentProperty = null;
    },
    onObjectProperty: (name) => {
      currentProperty = name;
    },
    onObjectEnd: () => {
      currentParent = previousParents.pop();
    },
    onArrayBegin: () => {
      const array = [];
      onValue(array);
      previousParents.push(currentParent);
      currentParent = array;
      currentProperty = null;
    },
    onArrayEnd: () => {
      currentParent = previousParents.pop();
    },
    onLiteralValue: onValue,
    onError: (error, offset, length) => {
      errors.push({ error, offset, length });
    }
  };
  visit(text, visitor, options);
  return currentParent[0];
}
function parseTree(text, errors = [], options = ParseOptions.DEFAULT) {
  let currentParent = { type: "array", offset: -1, length: -1, children: [], parent: void 0 };
  function ensurePropertyComplete(endOffset) {
    if (currentParent.type === "property") {
      currentParent.length = endOffset - currentParent.offset;
      currentParent = currentParent.parent;
    }
  }
  function onValue(valueNode) {
    currentParent.children.push(valueNode);
    return valueNode;
  }
  const visitor = {
    onObjectBegin: (offset) => {
      currentParent = onValue({ type: "object", offset, length: -1, parent: currentParent, children: [] });
    },
    onObjectProperty: (name, offset, length) => {
      currentParent = onValue({ type: "property", offset, length: -1, parent: currentParent, children: [] });
      currentParent.children.push({ type: "string", value: name, offset, length, parent: currentParent });
    },
    onObjectEnd: (offset, length) => {
      ensurePropertyComplete(offset + length);
      currentParent.length = offset + length - currentParent.offset;
      currentParent = currentParent.parent;
      ensurePropertyComplete(offset + length);
    },
    onArrayBegin: (offset, length) => {
      currentParent = onValue({ type: "array", offset, length: -1, parent: currentParent, children: [] });
    },
    onArrayEnd: (offset, length) => {
      currentParent.length = offset + length - currentParent.offset;
      currentParent = currentParent.parent;
      ensurePropertyComplete(offset + length);
    },
    onLiteralValue: (value, offset, length) => {
      onValue({ type: getNodeType(value), offset, length, parent: currentParent, value });
      ensurePropertyComplete(offset + length);
    },
    onSeparator: (sep2, offset, length) => {
      if (currentParent.type === "property") {
        if (sep2 === ":") {
          currentParent.colonOffset = offset;
        } else if (sep2 === ",") {
          ensurePropertyComplete(offset);
        }
      }
    },
    onError: (error, offset, length) => {
      errors.push({ error, offset, length });
    }
  };
  visit(text, visitor, options);
  const result = currentParent.children[0];
  if (result) {
    delete result.parent;
  }
  return result;
}
function findNodeAtLocation(root, path6) {
  if (!root) {
    return void 0;
  }
  let node = root;
  for (let segment of path6) {
    if (typeof segment === "string") {
      if (node.type !== "object" || !Array.isArray(node.children)) {
        return void 0;
      }
      let found = false;
      for (const propertyNode of node.children) {
        if (Array.isArray(propertyNode.children) && propertyNode.children[0].value === segment && propertyNode.children.length === 2) {
          node = propertyNode.children[1];
          found = true;
          break;
        }
      }
      if (!found) {
        return void 0;
      }
    } else {
      const index = segment;
      if (node.type !== "array" || index < 0 || !Array.isArray(node.children) || index >= node.children.length) {
        return void 0;
      }
      node = node.children[index];
    }
  }
  return node;
}
function getNodePath(node) {
  if (!node.parent || !node.parent.children) {
    return [];
  }
  const path6 = getNodePath(node.parent);
  if (node.parent.type === "property") {
    const key = node.parent.children[0].value;
    path6.push(key);
  } else if (node.parent.type === "array") {
    const index = node.parent.children.indexOf(node);
    if (index !== -1) {
      path6.push(index);
    }
  }
  return path6;
}
function getNodeValue(node) {
  switch (node.type) {
    case "array":
      return node.children.map(getNodeValue);
    case "object":
      const obj = /* @__PURE__ */ Object.create(null);
      for (let prop of node.children) {
        const valueNode = prop.children[1];
        if (valueNode) {
          obj[prop.children[0].value] = getNodeValue(valueNode);
        }
      }
      return obj;
    case "null":
    case "string":
    case "number":
    case "boolean":
      return node.value;
    default:
      return void 0;
  }
}
function contains(node, offset, includeRightBound = false) {
  return offset >= node.offset && offset < node.offset + node.length || includeRightBound && offset === node.offset + node.length;
}
function findNodeAtOffset(node, offset, includeRightBound = false) {
  if (contains(node, offset, includeRightBound)) {
    const children = node.children;
    if (Array.isArray(children)) {
      for (let i = 0; i < children.length && children[i].offset <= offset; i++) {
        const item = findNodeAtOffset(children[i], offset, includeRightBound);
        if (item) {
          return item;
        }
      }
    }
    return node;
  }
  return void 0;
}
function visit(text, visitor, options = ParseOptions.DEFAULT) {
  const _scanner = createScanner(text, false);
  const _jsonPath = [];
  let suppressedCallbacks = 0;
  function toNoArgVisit(visitFunction) {
    return visitFunction ? () => suppressedCallbacks === 0 && visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter()) : () => true;
  }
  function toOneArgVisit(visitFunction) {
    return visitFunction ? (arg) => suppressedCallbacks === 0 && visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter()) : () => true;
  }
  function toOneArgVisitWithPath(visitFunction) {
    return visitFunction ? (arg) => suppressedCallbacks === 0 && visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter(), () => _jsonPath.slice()) : () => true;
  }
  function toBeginVisit(visitFunction) {
    return visitFunction ? () => {
      if (suppressedCallbacks > 0) {
        suppressedCallbacks++;
      } else {
        let cbReturn = visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter(), () => _jsonPath.slice());
        if (cbReturn === false) {
          suppressedCallbacks = 1;
        }
      }
    } : () => true;
  }
  function toEndVisit(visitFunction) {
    return visitFunction ? () => {
      if (suppressedCallbacks > 0) {
        suppressedCallbacks--;
      }
      if (suppressedCallbacks === 0) {
        visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter());
      }
    } : () => true;
  }
  const onObjectBegin = toBeginVisit(visitor.onObjectBegin), onObjectProperty = toOneArgVisitWithPath(visitor.onObjectProperty), onObjectEnd = toEndVisit(visitor.onObjectEnd), onArrayBegin = toBeginVisit(visitor.onArrayBegin), onArrayEnd = toEndVisit(visitor.onArrayEnd), onLiteralValue = toOneArgVisitWithPath(visitor.onLiteralValue), onSeparator = toOneArgVisit(visitor.onSeparator), onComment = toNoArgVisit(visitor.onComment), onError = toOneArgVisit(visitor.onError);
  const disallowComments = options && options.disallowComments;
  const allowTrailingComma = options && options.allowTrailingComma;
  function scanNext() {
    while (true) {
      const token = _scanner.scan();
      switch (_scanner.getTokenError()) {
        case 4:
          handleError(
            14
            /* ParseErrorCode.InvalidUnicode */
          );
          break;
        case 5:
          handleError(
            15
            /* ParseErrorCode.InvalidEscapeCharacter */
          );
          break;
        case 3:
          handleError(
            13
            /* ParseErrorCode.UnexpectedEndOfNumber */
          );
          break;
        case 1:
          if (!disallowComments) {
            handleError(
              11
              /* ParseErrorCode.UnexpectedEndOfComment */
            );
          }
          break;
        case 2:
          handleError(
            12
            /* ParseErrorCode.UnexpectedEndOfString */
          );
          break;
        case 6:
          handleError(
            16
            /* ParseErrorCode.InvalidCharacter */
          );
          break;
      }
      switch (token) {
        case 12:
        case 13:
          if (disallowComments) {
            handleError(
              10
              /* ParseErrorCode.InvalidCommentToken */
            );
          } else {
            onComment();
          }
          break;
        case 16:
          handleError(
            1
            /* ParseErrorCode.InvalidSymbol */
          );
          break;
        case 15:
        case 14:
          break;
        default:
          return token;
      }
    }
  }
  function handleError(error, skipUntilAfter = [], skipUntil = []) {
    onError(error);
    if (skipUntilAfter.length + skipUntil.length > 0) {
      let token = _scanner.getToken();
      while (token !== 17) {
        if (skipUntilAfter.indexOf(token) !== -1) {
          scanNext();
          break;
        } else if (skipUntil.indexOf(token) !== -1) {
          break;
        }
        token = scanNext();
      }
    }
  }
  function parseString(isValue) {
    const value = _scanner.getTokenValue();
    if (isValue) {
      onLiteralValue(value);
    } else {
      onObjectProperty(value);
      _jsonPath.push(value);
    }
    scanNext();
    return true;
  }
  function parseLiteral() {
    switch (_scanner.getToken()) {
      case 11:
        const tokenValue = _scanner.getTokenValue();
        let value = Number(tokenValue);
        if (isNaN(value)) {
          handleError(
            2
            /* ParseErrorCode.InvalidNumberFormat */
          );
          value = 0;
        }
        onLiteralValue(value);
        break;
      case 7:
        onLiteralValue(null);
        break;
      case 8:
        onLiteralValue(true);
        break;
      case 9:
        onLiteralValue(false);
        break;
      default:
        return false;
    }
    scanNext();
    return true;
  }
  function parseProperty() {
    if (_scanner.getToken() !== 10) {
      handleError(3, [], [
        2,
        5
        /* SyntaxKind.CommaToken */
      ]);
      return false;
    }
    parseString(false);
    if (_scanner.getToken() === 6) {
      onSeparator(":");
      scanNext();
      if (!parseValue()) {
        handleError(4, [], [
          2,
          5
          /* SyntaxKind.CommaToken */
        ]);
      }
    } else {
      handleError(5, [], [
        2,
        5
        /* SyntaxKind.CommaToken */
      ]);
    }
    _jsonPath.pop();
    return true;
  }
  function parseObject() {
    onObjectBegin();
    scanNext();
    let needsComma = false;
    while (_scanner.getToken() !== 2 && _scanner.getToken() !== 17) {
      if (_scanner.getToken() === 5) {
        if (!needsComma) {
          handleError(4, [], []);
        }
        onSeparator(",");
        scanNext();
        if (_scanner.getToken() === 2 && allowTrailingComma) {
          break;
        }
      } else if (needsComma) {
        handleError(6, [], []);
      }
      if (!parseProperty()) {
        handleError(4, [], [
          2,
          5
          /* SyntaxKind.CommaToken */
        ]);
      }
      needsComma = true;
    }
    onObjectEnd();
    if (_scanner.getToken() !== 2) {
      handleError(7, [
        2
        /* SyntaxKind.CloseBraceToken */
      ], []);
    } else {
      scanNext();
    }
    return true;
  }
  function parseArray() {
    onArrayBegin();
    scanNext();
    let isFirstElement = true;
    let needsComma = false;
    while (_scanner.getToken() !== 4 && _scanner.getToken() !== 17) {
      if (_scanner.getToken() === 5) {
        if (!needsComma) {
          handleError(4, [], []);
        }
        onSeparator(",");
        scanNext();
        if (_scanner.getToken() === 4 && allowTrailingComma) {
          break;
        }
      } else if (needsComma) {
        handleError(6, [], []);
      }
      if (isFirstElement) {
        _jsonPath.push(0);
        isFirstElement = false;
      } else {
        _jsonPath[_jsonPath.length - 1]++;
      }
      if (!parseValue()) {
        handleError(4, [], [
          4,
          5
          /* SyntaxKind.CommaToken */
        ]);
      }
      needsComma = true;
    }
    onArrayEnd();
    if (!isFirstElement) {
      _jsonPath.pop();
    }
    if (_scanner.getToken() !== 4) {
      handleError(8, [
        4
        /* SyntaxKind.CloseBracketToken */
      ], []);
    } else {
      scanNext();
    }
    return true;
  }
  function parseValue() {
    switch (_scanner.getToken()) {
      case 3:
        return parseArray();
      case 1:
        return parseObject();
      case 10:
        return parseString(true);
      default:
        return parseLiteral();
    }
  }
  scanNext();
  if (_scanner.getToken() === 17) {
    if (options.allowEmptyContent) {
      return true;
    }
    handleError(4, [], []);
    return false;
  }
  if (!parseValue()) {
    handleError(4, [], []);
    return false;
  }
  if (_scanner.getToken() !== 17) {
    handleError(9, [], []);
  }
  return true;
}
function stripComments(text, replaceCh) {
  let _scanner = createScanner(text), parts = [], kind, offset = 0, pos;
  do {
    pos = _scanner.getPosition();
    kind = _scanner.scan();
    switch (kind) {
      case 12:
      case 13:
      case 17:
        if (offset !== pos) {
          parts.push(text.substring(offset, pos));
        }
        if (replaceCh !== void 0) {
          parts.push(_scanner.getTokenValue().replace(/[^\r\n]/g, replaceCh));
        }
        offset = _scanner.getPosition();
        break;
    }
  } while (kind !== 17);
  return parts.join("");
}
function getNodeType(value) {
  switch (typeof value) {
    case "boolean":
      return "boolean";
    case "number":
      return "number";
    case "string":
      return "string";
    case "object": {
      if (!value) {
        return "null";
      } else if (Array.isArray(value)) {
        return "array";
      }
      return "object";
    }
    default:
      return "null";
  }
}
var ParseOptions;
var init_parser = __esm({
  "vaporview/node_modules/jsonc-parser/lib/esm/impl/parser.js"() {
    "use strict";
    init_scanner();
    (function(ParseOptions2) {
      ParseOptions2.DEFAULT = {
        allowTrailingComma: false
      };
    })(ParseOptions || (ParseOptions = {}));
  }
});

// vaporview/node_modules/jsonc-parser/lib/esm/impl/edit.js
function setProperty(text, originalPath, value, options) {
  const path6 = originalPath.slice();
  const errors = [];
  const root = parseTree(text, errors);
  let parent = void 0;
  let lastSegment = void 0;
  while (path6.length > 0) {
    lastSegment = path6.pop();
    parent = findNodeAtLocation(root, path6);
    if (parent === void 0 && value !== void 0) {
      if (typeof lastSegment === "string") {
        value = { [lastSegment]: value };
      } else {
        value = [value];
      }
    } else {
      break;
    }
  }
  if (!parent) {
    if (value === void 0) {
      throw new Error("Can not delete in empty document");
    }
    return withFormatting(text, { offset: root ? root.offset : 0, length: root ? root.length : 0, content: JSON.stringify(value) }, options);
  } else if (parent.type === "object" && typeof lastSegment === "string" && Array.isArray(parent.children)) {
    const existing = findNodeAtLocation(parent, [lastSegment]);
    if (existing !== void 0) {
      if (value === void 0) {
        if (!existing.parent) {
          throw new Error("Malformed AST");
        }
        const propertyIndex = parent.children.indexOf(existing.parent);
        let removeBegin;
        let removeEnd = existing.parent.offset + existing.parent.length;
        if (propertyIndex > 0) {
          let previous = parent.children[propertyIndex - 1];
          removeBegin = previous.offset + previous.length;
        } else {
          removeBegin = parent.offset + 1;
          if (parent.children.length > 1) {
            let next = parent.children[1];
            removeEnd = next.offset;
          }
        }
        return withFormatting(text, { offset: removeBegin, length: removeEnd - removeBegin, content: "" }, options);
      } else {
        return withFormatting(text, { offset: existing.offset, length: existing.length, content: JSON.stringify(value) }, options);
      }
    } else {
      if (value === void 0) {
        return [];
      }
      const newProperty = `${JSON.stringify(lastSegment)}: ${JSON.stringify(value)}`;
      const index = options.getInsertionIndex ? options.getInsertionIndex(parent.children.map((p) => p.children[0].value)) : parent.children.length;
      let edit;
      if (index > 0) {
        let previous = parent.children[index - 1];
        edit = { offset: previous.offset + previous.length, length: 0, content: "," + newProperty };
      } else if (parent.children.length === 0) {
        edit = { offset: parent.offset + 1, length: 0, content: newProperty };
      } else {
        edit = { offset: parent.offset + 1, length: 0, content: newProperty + "," };
      }
      return withFormatting(text, edit, options);
    }
  } else if (parent.type === "array" && typeof lastSegment === "number" && Array.isArray(parent.children)) {
    const insertIndex = lastSegment;
    if (insertIndex === -1) {
      const newProperty = `${JSON.stringify(value)}`;
      let edit;
      if (parent.children.length === 0) {
        edit = { offset: parent.offset + 1, length: 0, content: newProperty };
      } else {
        const previous = parent.children[parent.children.length - 1];
        edit = { offset: previous.offset + previous.length, length: 0, content: "," + newProperty };
      }
      return withFormatting(text, edit, options);
    } else if (value === void 0 && parent.children.length >= 0) {
      const removalIndex = lastSegment;
      const toRemove = parent.children[removalIndex];
      let edit;
      if (parent.children.length === 1) {
        edit = { offset: parent.offset + 1, length: parent.length - 2, content: "" };
      } else if (parent.children.length - 1 === removalIndex) {
        let previous = parent.children[removalIndex - 1];
        let offset = previous.offset + previous.length;
        let parentEndOffset = parent.offset + parent.length;
        edit = { offset, length: parentEndOffset - 2 - offset, content: "" };
      } else {
        edit = { offset: toRemove.offset, length: parent.children[removalIndex + 1].offset - toRemove.offset, content: "" };
      }
      return withFormatting(text, edit, options);
    } else if (value !== void 0) {
      let edit;
      const newProperty = `${JSON.stringify(value)}`;
      if (!options.isArrayInsertion && parent.children.length > lastSegment) {
        const toModify = parent.children[lastSegment];
        edit = { offset: toModify.offset, length: toModify.length, content: newProperty };
      } else if (parent.children.length === 0 || lastSegment === 0) {
        edit = { offset: parent.offset + 1, length: 0, content: parent.children.length === 0 ? newProperty : newProperty + "," };
      } else {
        const index = lastSegment > parent.children.length ? parent.children.length : lastSegment;
        const previous = parent.children[index - 1];
        edit = { offset: previous.offset + previous.length, length: 0, content: "," + newProperty };
      }
      return withFormatting(text, edit, options);
    } else {
      throw new Error(`Can not ${value === void 0 ? "remove" : options.isArrayInsertion ? "insert" : "modify"} Array index ${insertIndex} as length is not sufficient`);
    }
  } else {
    throw new Error(`Can not add ${typeof lastSegment !== "number" ? "index" : "property"} to parent of type ${parent.type}`);
  }
}
function withFormatting(text, edit, options) {
  if (!options.formattingOptions) {
    return [edit];
  }
  let newText = applyEdit(text, edit);
  let begin = edit.offset;
  let end = edit.offset + edit.content.length;
  if (edit.length === 0 || edit.content.length === 0) {
    while (begin > 0 && !isEOL(newText, begin - 1)) {
      begin--;
    }
    while (end < newText.length && !isEOL(newText, end)) {
      end++;
    }
  }
  const edits = format(newText, { offset: begin, length: end - begin }, { ...options.formattingOptions, keepLines: false });
  for (let i = edits.length - 1; i >= 0; i--) {
    const edit2 = edits[i];
    newText = applyEdit(newText, edit2);
    begin = Math.min(begin, edit2.offset);
    end = Math.max(end, edit2.offset + edit2.length);
    end += edit2.content.length - edit2.length;
  }
  const editLength = text.length - (newText.length - end) - begin;
  return [{ offset: begin, length: editLength, content: newText.substring(begin, end) }];
}
function applyEdit(text, edit) {
  return text.substring(0, edit.offset) + edit.content + text.substring(edit.offset + edit.length);
}
var init_edit = __esm({
  "vaporview/node_modules/jsonc-parser/lib/esm/impl/edit.js"() {
    "use strict";
    init_format();
    init_parser();
  }
});

// vaporview/node_modules/jsonc-parser/lib/esm/main.js
var main_exports = {};
__export(main_exports, {
  ParseErrorCode: () => ParseErrorCode,
  ScanError: () => ScanError,
  SyntaxKind: () => SyntaxKind,
  applyEdits: () => applyEdits,
  createScanner: () => createScanner2,
  findNodeAtLocation: () => findNodeAtLocation2,
  findNodeAtOffset: () => findNodeAtOffset2,
  format: () => format2,
  getLocation: () => getLocation2,
  getNodePath: () => getNodePath2,
  getNodeValue: () => getNodeValue2,
  modify: () => modify,
  parse: () => parse2,
  parseTree: () => parseTree2,
  printParseErrorCode: () => printParseErrorCode,
  stripComments: () => stripComments2,
  visit: () => visit2
});
function printParseErrorCode(code) {
  switch (code) {
    case 1:
      return "InvalidSymbol";
    case 2:
      return "InvalidNumberFormat";
    case 3:
      return "PropertyNameExpected";
    case 4:
      return "ValueExpected";
    case 5:
      return "ColonExpected";
    case 6:
      return "CommaExpected";
    case 7:
      return "CloseBraceExpected";
    case 8:
      return "CloseBracketExpected";
    case 9:
      return "EndOfFileExpected";
    case 10:
      return "InvalidCommentToken";
    case 11:
      return "UnexpectedEndOfComment";
    case 12:
      return "UnexpectedEndOfString";
    case 13:
      return "UnexpectedEndOfNumber";
    case 14:
      return "InvalidUnicode";
    case 15:
      return "InvalidEscapeCharacter";
    case 16:
      return "InvalidCharacter";
  }
  return "<unknown ParseErrorCode>";
}
function format2(documentText, range, options) {
  return format(documentText, range, options);
}
function modify(text, path6, value, options) {
  return setProperty(text, path6, value, options);
}
function applyEdits(text, edits) {
  let sortedEdits = edits.slice(0).sort((a, b) => {
    const diff = a.offset - b.offset;
    if (diff === 0) {
      return a.length - b.length;
    }
    return diff;
  });
  let lastModifiedOffset = text.length;
  for (let i = sortedEdits.length - 1; i >= 0; i--) {
    let e = sortedEdits[i];
    if (e.offset + e.length <= lastModifiedOffset) {
      text = applyEdit(text, e);
    } else {
      throw new Error("Overlapping edit");
    }
    lastModifiedOffset = e.offset;
  }
  return text;
}
var createScanner2, ScanError, SyntaxKind, getLocation2, parse2, parseTree2, findNodeAtLocation2, findNodeAtOffset2, getNodePath2, getNodeValue2, visit2, stripComments2, ParseErrorCode;
var init_main = __esm({
  "vaporview/node_modules/jsonc-parser/lib/esm/main.js"() {
    "use strict";
    init_format();
    init_edit();
    init_scanner();
    init_parser();
    createScanner2 = createScanner;
    (function(ScanError2) {
      ScanError2[ScanError2["None"] = 0] = "None";
      ScanError2[ScanError2["UnexpectedEndOfComment"] = 1] = "UnexpectedEndOfComment";
      ScanError2[ScanError2["UnexpectedEndOfString"] = 2] = "UnexpectedEndOfString";
      ScanError2[ScanError2["UnexpectedEndOfNumber"] = 3] = "UnexpectedEndOfNumber";
      ScanError2[ScanError2["InvalidUnicode"] = 4] = "InvalidUnicode";
      ScanError2[ScanError2["InvalidEscapeCharacter"] = 5] = "InvalidEscapeCharacter";
      ScanError2[ScanError2["InvalidCharacter"] = 6] = "InvalidCharacter";
    })(ScanError || (ScanError = {}));
    (function(SyntaxKind2) {
      SyntaxKind2[SyntaxKind2["OpenBraceToken"] = 1] = "OpenBraceToken";
      SyntaxKind2[SyntaxKind2["CloseBraceToken"] = 2] = "CloseBraceToken";
      SyntaxKind2[SyntaxKind2["OpenBracketToken"] = 3] = "OpenBracketToken";
      SyntaxKind2[SyntaxKind2["CloseBracketToken"] = 4] = "CloseBracketToken";
      SyntaxKind2[SyntaxKind2["CommaToken"] = 5] = "CommaToken";
      SyntaxKind2[SyntaxKind2["ColonToken"] = 6] = "ColonToken";
      SyntaxKind2[SyntaxKind2["NullKeyword"] = 7] = "NullKeyword";
      SyntaxKind2[SyntaxKind2["TrueKeyword"] = 8] = "TrueKeyword";
      SyntaxKind2[SyntaxKind2["FalseKeyword"] = 9] = "FalseKeyword";
      SyntaxKind2[SyntaxKind2["StringLiteral"] = 10] = "StringLiteral";
      SyntaxKind2[SyntaxKind2["NumericLiteral"] = 11] = "NumericLiteral";
      SyntaxKind2[SyntaxKind2["LineCommentTrivia"] = 12] = "LineCommentTrivia";
      SyntaxKind2[SyntaxKind2["BlockCommentTrivia"] = 13] = "BlockCommentTrivia";
      SyntaxKind2[SyntaxKind2["LineBreakTrivia"] = 14] = "LineBreakTrivia";
      SyntaxKind2[SyntaxKind2["Trivia"] = 15] = "Trivia";
      SyntaxKind2[SyntaxKind2["Unknown"] = 16] = "Unknown";
      SyntaxKind2[SyntaxKind2["EOF"] = 17] = "EOF";
    })(SyntaxKind || (SyntaxKind = {}));
    getLocation2 = getLocation;
    parse2 = parse;
    parseTree2 = parseTree;
    findNodeAtLocation2 = findNodeAtLocation;
    findNodeAtOffset2 = findNodeAtOffset;
    getNodePath2 = getNodePath;
    getNodeValue2 = getNodeValue;
    visit2 = visit;
    stripComments2 = stripComments;
    (function(ParseErrorCode2) {
      ParseErrorCode2[ParseErrorCode2["InvalidSymbol"] = 1] = "InvalidSymbol";
      ParseErrorCode2[ParseErrorCode2["InvalidNumberFormat"] = 2] = "InvalidNumberFormat";
      ParseErrorCode2[ParseErrorCode2["PropertyNameExpected"] = 3] = "PropertyNameExpected";
      ParseErrorCode2[ParseErrorCode2["ValueExpected"] = 4] = "ValueExpected";
      ParseErrorCode2[ParseErrorCode2["ColonExpected"] = 5] = "ColonExpected";
      ParseErrorCode2[ParseErrorCode2["CommaExpected"] = 6] = "CommaExpected";
      ParseErrorCode2[ParseErrorCode2["CloseBraceExpected"] = 7] = "CloseBraceExpected";
      ParseErrorCode2[ParseErrorCode2["CloseBracketExpected"] = 8] = "CloseBracketExpected";
      ParseErrorCode2[ParseErrorCode2["EndOfFileExpected"] = 9] = "EndOfFileExpected";
      ParseErrorCode2[ParseErrorCode2["InvalidCommentToken"] = 10] = "InvalidCommentToken";
      ParseErrorCode2[ParseErrorCode2["UnexpectedEndOfComment"] = 11] = "UnexpectedEndOfComment";
      ParseErrorCode2[ParseErrorCode2["UnexpectedEndOfString"] = 12] = "UnexpectedEndOfString";
      ParseErrorCode2[ParseErrorCode2["UnexpectedEndOfNumber"] = 13] = "UnexpectedEndOfNumber";
      ParseErrorCode2[ParseErrorCode2["InvalidUnicode"] = 14] = "InvalidUnicode";
      ParseErrorCode2[ParseErrorCode2["InvalidEscapeCharacter"] = 15] = "InvalidEscapeCharacter";
      ParseErrorCode2[ParseErrorCode2["InvalidCharacter"] = 16] = "InvalidCharacter";
    })(ParseErrorCode || (ParseErrorCode = {}));
  }
});

// vaporview/node_modules/vscode-shiki-bridge/dist/index.cjs
var require_dist = __commonJS({
  "vaporview/node_modules/vscode-shiki-bridge/dist/index.cjs"(exports) {
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames2(from), i = 0, n = keys.length, key; i < n; i++) {
        key = keys[i];
        if (!__hasOwnProp2.call(to, key) && key !== except) __defProp2(to, key, {
          get: ((k) => from[k]).bind(null, key),
          enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", {
      value: mod,
      enumerable: true
    }) : target, mod));
    var fast_plist = __toESM2(require_main2());
    var jsonc_parser = __toESM2((init_main(), __toCommonJS(main_exports)));
    function getVscode() {
      try {
        return init_vscode(), __toCommonJS(vscode_exports);
      } catch {
        throw new Error("vscode-shiki-bridge: The 'vscode' API is only available inside the VS Code extension host.");
      }
    }
    function parseJsonc(jsonc) {
      const errors = [];
      const result = (0, jsonc_parser.parse)(jsonc, errors, {
        allowEmptyContent: true,
        allowTrailingComma: true
      });
      if (errors.length) throw new AggregateError(errors, "failed to parse JSONC");
      return result;
    }
    var ExtensionFileReader = class {
      constructor(vscode, decoder = new TextDecoder("utf-8")) {
        this.vscode = vscode;
        this.decoder = decoder;
      }
      async readFile(base, path6) {
        const uri = path6 ? this.vscode.Uri.joinPath(base, path6) : base;
        const bytes = await this.vscode.workspace.fs.readFile(uri);
        const text = this.decoder.decode(bytes);
        return text;
      }
      async readJson(base, path6) {
        const text = await this.readFile(base, path6);
        const json = parseJsonc(text);
        return json;
      }
      async readPlist(base, path6) {
        const text = await this.readFile(base, path6);
        const plist = (0, fast_plist.parse)(text);
        return plist;
      }
      /**
      * TextMate grammar/language files can be written in JSON (with comments) or XML PList formats.
      * If the path ends with `.json[c]`, it will be parsed as JSON, else it will be assumed to be a PList
      */
      async readTmLanguage(base, path6) {
        const pathWithExtension = path6 ?? base.path;
        if (pathWithExtension.endsWith(".json") || pathWithExtension.endsWith(".jsonc")) return this.readJson(base, path6);
        else return this.readPlist(base, path6);
      }
    };
    var noopLogger = {
      trace() {
      },
      debug() {
      },
      log() {
      },
      info() {
      },
      warn() {
      },
      error() {
      }
    };
    var isRunningExampleExtension = () => {
      const vscode = getVscode();
      const extension = vscode.extensions.getExtension("vscode-shiki-bridge.vscode-shiki-bridge-example-extension") ?? vscode.extensions.getExtension("vscode-shiki-bridge.vscode-shiki-bridge-advanced-example-extension");
      return !!extension;
    };
    var createOutputLog = () => {
      const vscode = getVscode();
      const output = vscode.window.createOutputChannel("vscode-shiki-bridge", { log: true });
      return {
        trace(message2) {
          output.debug(message2.toString());
        },
        debug(message2) {
          output.debug(message2.toString());
        },
        log(message2) {
          output.info(message2.toString());
        },
        info(message2) {
          output.info(message2.toString());
        },
        warn(message2) {
          output.warn(message2.toString());
        },
        error(message2) {
          output.error(message2.toString());
        }
      };
    };
    var logger = (function() {
      try {
        if (isRunningExampleExtension()) return console;
        return createOutputLog();
      } catch (_) {
        return noopLogger;
      }
    })();
    var ThemeRegistry = class {
      labels = /* @__PURE__ */ new Map();
      themes = /* @__PURE__ */ new Map();
      uris = /* @__PURE__ */ new Map();
      registerThemeContribution(theme, uri) {
        const id = theme.id ?? theme.label;
        if (!id) {
          logger.debug(`tried to register a theme contribution without id: ${uri.toString(true)}`, theme, uri);
          return;
        }
        const cacheHit = this.themes.get(id);
        if (cacheHit) {
          logger.debug(`tried to register a duplicate theme contribution: ${theme.id}`, theme, uri);
          return;
        }
        let labels = this.labels.get(id);
        if (!labels) {
          labels = /* @__PURE__ */ new Set();
          this.labels.set(id, labels);
        }
        if (theme.label && theme.label !== id) labels.add(theme.label);
        if (labels.size > 1) logger.debug(`theme '${id}' has multiple labels: ${[...labels.values()].join(", ")}`, theme, labels);
        this.themes.set(id, theme);
        this.uris.set(theme, uri);
      }
      resolveLabelToId(label) {
        if (this.labels.has(label)) return label;
        for (const [id, labels] of this.labels.entries()) if (labels.has(label)) return id;
        return label;
      }
      getUri(theme) {
        return this.uris.get(theme);
      }
      getLabels(themeId) {
        return [...this.labels.get(themeId) ?? []];
      }
      constructor(extensions2) {
        for (const extension of extensions2) {
          const manifest = extension.packageJSON;
          const contributes = manifest.contributes;
          if (!contributes) continue;
          if (!contributes.themes) continue;
          for (const theme of contributes.themes) this.registerThemeContribution(theme, extension.extensionUri);
        }
      }
    };
    async function buildThemeRegistration(contribution, registry2, fileReader, Uri2) {
      const id = contribution.id ?? contribution.label;
      if (!id) {
        logger.debug(`cannot build a theme registration for a contribution without a label or id`, contribution);
        return {};
      }
      const rawTheme = await resolveThemeGrammar(contribution, registry2, fileReader, Uri2);
      const themeRegistration = {
        name: id,
        displayName: contribution.label,
        settings: rawTheme.tokenColors ?? rawTheme.settings,
        colors: rawTheme.colors,
        semanticHighlighting: rawTheme.semanticHighlighting,
        semanticTokenColors: rawTheme.semanticTokenColors,
        type: bridgeThemeType(contribution.uiTheme)
      };
      return themeRegistration;
    }
    async function resolveThemeGrammar(contribution, registry2, fileReader, Uri2) {
      const id = contribution.id ?? contribution.label;
      const uri = registry2.getUri(contribution);
      const contributionUri = Uri2.joinPath(uri, contribution.path);
      let directory = Uri2.parse(dirname5(contributionUri.path));
      let rawTheme = await fileReader.readTmLanguage(contributionUri);
      let hasInclude = typeof rawTheme.include === "string";
      while (hasInclude) {
        const includeUri = Uri2.joinPath(directory, rawTheme.include);
        directory = Uri2.parse(dirname5(includeUri.path));
        const include = await fileReader.readTmLanguage(includeUri);
        if (typeof rawTheme.tokenColors === "string") {
          logger.debug(`theme '${id}' with include '${rawTheme.include}' has 'tokenColors' set to a relative file path`, contribution, rawTheme);
          const contents = await fileReader.readPlist(directory, rawTheme.tokenColors);
          rawTheme.tokenColors = contents.settings;
        }
        rawTheme = mergeRawTheme(include, rawTheme);
        hasInclude = typeof rawTheme.include === "string";
      }
      return rawTheme;
    }
    function dirname5(path6) {
      return path6.slice(0, path6.lastIndexOf("/"));
    }
    function mergeRawTheme(include, result) {
      return {
        type: result.type ?? include.type,
        include: include.include,
        colors: Object.assign({}, include.colors, result.colors),
        semanticHighlighting: result.semanticHighlighting || include.semanticHighlighting,
        semanticTokenColors: Object.assign({}, include.semanticTokenColors, result.semanticTokenColors),
        tokenColors: [...include.tokenColors ?? [], ...result.tokenColors ?? []]
      };
    }
    function bridgeThemeType(uiTheme) {
      switch (uiTheme) {
        case "hc-black":
        case "vs-dark":
          return "dark";
        case "hc-light":
        case "vs":
          return "light";
        default:
          return "dark";
      }
    }
    var cache$1 = null;
    function getThemeRegistry(vscode) {
      if (!cache$1) {
        cache$1 = new ThemeRegistry(vscode.extensions.all);
        const disposable = vscode.extensions.onDidChange(() => {
          cache$1 = null;
          disposable.dispose();
        });
      }
      return cache$1;
    }
    async function getUserTheme2() {
      const vscode = getVscode();
      const workbenchConfig = vscode.workspace.getConfiguration("workbench");
      const themeName = workbenchConfig.get("colorTheme");
      return await getTheme(themeName);
    }
    async function getTheme(themeName) {
      const vscode = getVscode();
      const registry2 = getThemeRegistry(vscode);
      const fileReader = new ExtensionFileReader(vscode);
      const themeId = registry2.resolveLabelToId(themeName);
      const contribution = registry2.themes.get(themeId);
      if (!contribution) {
        const message2 = `no theme contribution found for theme id ${themeId}`;
        logger.debug(message2);
        throw new Error(message2);
      }
      const themeRegistration = await buildThemeRegistration(contribution, registry2, fileReader, vscode.Uri);
      return [themeId, [themeRegistration]];
    }
    function hasConfiguration(language) {
      return !!language.configuration;
    }
    var LanguageRegistrationCollectionBuilder = class {
      constructor(registry2, fileReader) {
        this.registry = registry2;
        this.fileReader = fileReader;
      }
      /**
      * Fetch the `language-configuration.json` files for the given `languages` contributions
      */
      async getLanguageConfigurationFiles(languages2) {
        const entries = await Promise.all(languages2.filter(hasConfiguration).map(async (language) => {
          const uri = this.registry.getUri(language);
          const configuration = await this.fileReader.readJson(uri, language.configuration);
          return [language, configuration];
        }));
        return new Map(entries);
      }
      /**
      * Fetch the `grammar.tmLanguage[.json] | grammar.tmTheme` files for the given `grammars` contributions
      * These can be in the following formats:
      * - plist
      * - json[c]
      */
      async getGrammarFiles(grammars) {
        const entries = await Promise.all(grammars.map(async (grammar) => {
          const base = this.registry.getUri(grammar);
          const rawGrammar = await this.fileReader.readTmLanguage(base, grammar.path);
          return [grammar, rawGrammar];
        }));
        return new Map(entries);
      }
      /**
      * This function needs to build the language registrations for the given language ids.
      * It needs to:
      * - find the given language ids
      * - build at least 1 language registration
      *   - merge the language contributions
      *   - language configuration files are part of a language contribution
      *   - for each grammar (grammars are always scoped), build a language registration merge the contributions and the grammar
      * - find any embedded languages, and recursively add those to the result
      */
      async build(languageIds) {
        languageIds = [...languageIds];
        const results = [];
        const languageIdsWithoutContributions = [];
        for (const languageId of languageIds) {
          const languages2 = this.registry.getLanguageContributions(languageId);
          const grammars = this.registry.getGrammarContributions(languageId);
          if (languages2.length === 0 && grammars.length === 0) {
            logger.debug(`language ${languageId} has no language or grammar contributions`);
            const aliased = this.registry.resolveAliasToLanguageId(languageId);
            if (aliased !== languageId) logger.debug(` but is an alias for ${aliased}`);
            languageIdsWithoutContributions.push(languageId);
            continue;
          }
          if (languages2.length === 0 && grammars.length > 0) logger.debug(`language ${languageId} has grammars (${grammars.length}) but no language contribution`, grammars);
          if (languages2.length > 0 && grammars.length === 0) logger.debug(`language ${languageId} has languages (${languages2.length}) but no grammar contribution`, languages2);
          if (languages2.length > 1) {
            logger.debug(`language ${languageId} has multiple language contributions (${languages2.length})`, languages2);
            const firstLines = languages2.map((lang) => lang.firstLine).filter((firstLine) => !!firstLine);
            if (firstLines.length > 1 && firstLines.slice(1).some((other) => other !== firstLines[0])) logger.debug(`language ${languageId} has conflicting firstLines: ${firstLines}`, firstLines);
          }
          if (grammars.length > 1) logger.debug(`language ${languageId} has multiple grammars contributions (${grammars.length})`, grammars);
          const language = mergeLanguageContributions(languageId, languages2);
          const languageConfigurations = await this.getLanguageConfigurationFiles(languages2);
          const rawGrammars = await this.getGrammarFiles(grammars);
          if (languageConfigurations.size > 1) logger.debug(`language ${languageId} has multiple language configuration files (${languageConfigurations.size})`, languageConfigurations);
          const languageConfiguration = mergeLanguageConfigurations(languageConfigurations);
          if (rawGrammars.size > 1) logger.debug(`language ${languageId} has multiple grammar files (${rawGrammars.size})`, rawGrammars);
          for (const [grammar, rawGrammar] of rawGrammars.entries()) {
            if (grammar.scopeName !== rawGrammar.scopeName) logger.debug(`language ${languageId} has scope mismatch in grammar contribution and grammar file: ${grammar.scopeName} !== ${rawGrammar.scopeName}`, grammar, rawGrammar);
            const languageRegistration = buildLanguageRegistration({
              grammar,
              language,
              languageConfiguration,
              rawGrammar
            });
            results.push(languageRegistration);
          }
          for (const grammar of grammars) {
            if (!grammar.embeddedLanguages) continue;
            for (const embeddedLanguageId of bridgeEmbeddedLanguages(languageId, grammar.embeddedLanguages)) if (!languageIds.includes(embeddedLanguageId)) languageIds.push(embeddedLanguageId);
          }
        }
        const scopeNames = results.reduce((scopeNames$1, registration) => {
          findScopesInRawGrammar(registration, scopeNames$1);
          return scopeNames$1;
        }, /* @__PURE__ */ new Set());
        for (const scopeName of scopeNames) {
          const grammars = this.registry.getScopeContributions(scopeName);
          for (const grammar of grammars) {
            const uri = this.registry.getUri(grammar);
            const rawGrammar = await this.fileReader.readTmLanguage(uri, grammar.path);
            const languageRegistration = buildLanguageRegistration({
              grammar,
              language: { id: scopeName },
              languageConfiguration: {},
              rawGrammar
            });
            results.push(languageRegistration);
          }
        }
        languageIdsWithoutContributions.forEach((languageId) => {
          const resolvedLanguageId = this.registry.resolveAliasToLanguageId(languageId);
          const isAlias = resolvedLanguageId !== languageId;
          logger.debug(`language id without contribution: ${languageId}, ${isAlias ? `but is an alias: ${resolvedLanguageId}` : "has no alias!"}`);
          const isEmbeddedIn = results.filter((lang) => lang.embeddedLangs?.includes(languageId) || lang.embeddedLangsLazy?.includes(languageId));
          if (isEmbeddedIn.length) logger.debug(`  ${languageId} is embedded in the following languages: ${isEmbeddedIn.map((l) => l.name).join(", ")}`);
        });
        return results;
      }
    };
    function findScopesInRawGrammar(rawGrammar, scopeNames = /* @__PURE__ */ new Set()) {
      if (rawGrammar.patterns) findScopesInRules(rawGrammar.patterns, scopeNames);
      if (rawGrammar.repository) findScopesInRules(Object.values(rawGrammar.repository), scopeNames);
      return scopeNames;
    }
    function findScopesInRules(rules, scopeNames) {
      for (const rule of rules) findScopesInRule(rule, scopeNames);
      return scopeNames;
    }
    function findScopesInRule(rule, scopeNames) {
      if (rule.include) {
        const [scopeName] = rule.include.split("#");
        if (scopeName && !scopeName.startsWith("$")) scopeNames.add(scopeName);
      }
      if (rule.beginCaptures) findScopesInRules(Object.values(rule.beginCaptures), scopeNames);
      if (rule.captures) findScopesInRules(Object.values(rule.captures), scopeNames);
      if (rule.endCaptures) findScopesInRules(Object.values(rule.endCaptures), scopeNames);
      if (rule.whileCaptures) findScopesInRules(Object.values(rule.whileCaptures), scopeNames);
      if (rule.patterns) findScopesInRules(rule.patterns, scopeNames);
      if (rule.repository) findScopesInRules(Object.values(rule.repository), scopeNames);
    }
    function buildLanguageRegistration({ language, grammar, languageConfiguration, rawGrammar }) {
      return {
        ...bridgeLanguageContribution(language),
        ...bridgeGrammarContribution(grammar),
        ...bridgeRawGrammar(rawGrammar),
        ...bridgeFoldingMarkers(languageConfiguration)
      };
    }
    function warnForPropertyOverwrite(target, source, property) {
      if (source && target[property] && source[property]) {
        if (typeof target[property] !== typeof source[property] || target[property].toString() !== source[property].toString()) logger.warn(`overwriting ${property}: '${target[property]}' with '${source[property]}'`, target[property], source[property]);
      }
    }
    function mergeLanguageContributions(languageId, languages2) {
      const initialValue = {
        id: languageId,
        aliases: [],
        firstLine: void 0,
        extensions: [],
        filenamePatterns: [],
        filenames: [],
        mimetypes: []
      };
      return languages2.reduce((result, language) => {
        if (language.aliases) result.aliases.push(...language.aliases);
        if (language.extensions) result.extensions.push(...language.extensions);
        if (language.filenamePatterns) result.filenamePatterns.push(...language.filenamePatterns);
        if (language.filenames) result.filenames.push(...language.filenames);
        if (language.firstLine) {
          warnForPropertyOverwrite(result, language, "firstLine");
          result.firstLine = language.firstLine;
        }
        if (language.mimetypes) result.mimetypes.push(...language.mimetypes);
        return result;
      }, initialValue);
    }
    function mergeLanguageConfigurations(languageConfigurations) {
      const initialValue = {
        autoClosingPairs: [],
        brackets: [],
        comments: {
          blockComment: void 0,
          lineComment: void 0
        },
        indentationRules: {
          decreaseIndentPattern: void 0,
          increaseIndentPattern: void 0,
          indentNextLinePattern: void 0,
          unIndentedLinePattern: void 0
        },
        onEnterRules: [],
        wordPattern: void 0
      };
      return [...languageConfigurations.values()].reduce((result, configuration) => {
        if (configuration.autoClosingPairs) result.autoClosingPairs.push(...configuration.autoClosingPairs);
        if (configuration.brackets) result.brackets.push(...configuration.brackets);
        if (configuration.comments) {
          warnForPropertyOverwrite(result.comments, configuration.comments, "blockComment");
          warnForPropertyOverwrite(result.comments, configuration.comments, "lineComment");
          Object.assign(result.comments, configuration.comments);
        }
        if (configuration.indentationRules) {
          warnForPropertyOverwrite(result.indentationRules, configuration.indentationRules, "decreaseIndentPattern");
          warnForPropertyOverwrite(result.indentationRules, configuration.indentationRules, "increaseIndentPattern");
          warnForPropertyOverwrite(result.indentationRules, configuration.indentationRules, "indentNextLinePattern");
          warnForPropertyOverwrite(result.indentationRules, configuration.indentationRules, "unIndentedLinePattern");
          Object.assign(result.indentationRules, configuration.indentationRules);
        }
        if (configuration.onEnterRules) result.onEnterRules.push(...configuration.onEnterRules);
        if (configuration.wordPattern) {
          warnForPropertyOverwrite(result, configuration, "wordPattern");
          result.wordPattern = configuration.wordPattern;
        }
        return result;
      }, initialValue);
    }
    function bridgeLanguageContribution(contribution) {
      const name = contribution.id;
      const aliases = contribution.aliases?.filter((alias) => alias !== name);
      return {
        name,
        aliases,
        displayName: contribution.aliases?.[0] || name,
        firstLineMatch: contribution.firstLine,
        extensions: contribution.extensions,
        filenamePatterns: contribution.filenamePatterns,
        filenames: contribution.filenames,
        mimetypes: contribution.mimetypes
      };
    }
    function bridgeGrammarContribution(contribution) {
      return {
        scopeName: contribution.scopeName,
        embeddedLangs: [],
        embeddedLangsLazy: bridgeEmbeddedLanguages(contribution.language, contribution.embeddedLanguages),
        injectTo: contribution.injectTo,
        balancedBracketSelectors: contribution.balancedBracketScopes,
        unbalancedBracketSelectors: contribution.unbalancedBracketScopes
      };
    }
    function bridgeEmbeddedLanguages(languageId, embeddedLanguages) {
      if (!embeddedLanguages) return [];
      const languages2 = Object.values(embeddedLanguages);
      const unique = new Set(languages2);
      if (languageId) unique.delete(languageId);
      return [...unique];
    }
    function bridgeFoldingMarkers(configuration) {
      return {
        foldingStartMarker: configuration.folding?.markers?.start,
        foldingStopMarker: configuration.folding?.markers?.end
      };
    }
    function bridgeRawGrammar(grammar) {
      return {
        repository: grammar.repository,
        patterns: grammar.patterns,
        injections: grammar.injections,
        injectionSelector: grammar.injectionSelector,
        fileTypes: grammar.fileTypes
      };
    }
    var LanguageRegistry = class {
      /**
      * Map of `languageId` to its aliases.
      */
      aliases = /* @__PURE__ */ new Map();
      /**
      * Map of `languageId` to its extension manifest language contribution.
      * These are plural because multiple extensions can contribute to the same language id.
      * @see https://code.visualstudio.com/api/references/contribution-points#contributes.languages
      */
      languages = /* @__PURE__ */ new Map();
      /**
      * Map of `languageId` to its extension manifest grammar contributions
      * These are plural because multiple extensions can contribute to the same language id.
      * @see https://code.visualstudio.com/api/references/contribution-points#contributes.grammars
      */
      grammars = /* @__PURE__ */ new Map();
      /**
      * Map of contributions to its `extensionUri`.
      */
      uris = /* @__PURE__ */ new Map();
      /**
      * Map of `scopeName` to its extension manifest grammar contribution
      * These are plural because multiple extensions can contribute to the same `scopeName`.
      * Some extensions contribute a grammar without a `language` property, these are considered `orphaned` by vscode-shiki-bridge.
      * An example is the [`text.html.basic`](https://github.com/microsoft/vscode/blob/main/extensions/html/package.json).
      * Shiki requires `LanguageRegistration` to have a `language` property, so orphaned scopes are registered as a language under their `scopeName`.
      */
      orphanedScopes = /* @__PURE__ */ new Map();
      registerLanguageContribution(language, uri) {
        if (!language.id) {
          logger.debug(`tried to register a language contribution without id: ${uri.toString(true)}`, language, uri);
          return;
        }
        let aliases = this.aliases.get(language.id);
        if (!aliases) {
          aliases = /* @__PURE__ */ new Set();
          this.aliases.set(language.id, aliases);
        }
        if (language.aliases) language.aliases.forEach((alias) => {
          aliases.add(alias);
        });
        let languages2 = this.languages.get(language.id);
        if (!languages2) {
          languages2 = [];
          this.languages.set(language.id, languages2);
        }
        languages2.push(language);
        this.uris.set(language, uri);
      }
      resolveAliasToLanguageId(alias) {
        if (this.aliases.has(alias)) return alias;
        for (const [languageId, aliases] of this.aliases.entries()) if (aliases.has(alias)) return languageId;
        return alias;
      }
      getLanguageContributions(languageId) {
        return this.languages.get(languageId) ?? [];
      }
      registerGrammarContribution(grammar, uri) {
        const languageId = grammar.language;
        let grammars = this.grammars.get(languageId);
        if (!grammars) {
          grammars = [];
          this.grammars.set(languageId, grammars);
        }
        grammars.push(grammar);
        this.uris.set(grammar, uri);
      }
      getGrammarContributions(languageId) {
        return this.grammars.get(languageId) ?? [];
      }
      registerOrphanScopeContribution(grammar, uri) {
        let scopes = this.orphanedScopes.get(grammar.scopeName);
        if (!scopes) {
          scopes = [];
          this.orphanedScopes.set(grammar.scopeName, scopes);
        }
        scopes.push(grammar);
        if (scopes.length > 1) logger.debug(`orphan scope '${grammar.scopeName}' has multiple (${scopes.length}) grammars`);
        this.uris.set(grammar, uri);
      }
      getScopeContributions(scopeName) {
        return [...this.orphanedScopes.get(scopeName) ?? []];
      }
      getLanguageIds() {
        return [...this.languages.keys()];
      }
      getUri(contribution) {
        return this.uris.get(contribution);
      }
      constructor(extensions2) {
        for (const extension of extensions2) {
          const manifest = extension.packageJSON;
          const contributes = manifest.contributes;
          if (!contributes) continue;
          if (contributes.languages) for (const lang of contributes.languages) this.registerLanguageContribution(lang, extension.extensionUri);
          if (contributes.grammars) for (const grammar of contributes.grammars) if (hasLanguage(grammar)) this.registerGrammarContribution(grammar, extension.extensionUri);
          else {
            logger.debug(`extension '${manifest.name}' has no language set for grammar with scope: '${grammar.scopeName}'`);
            this.registerOrphanScopeContribution(grammar, extension.extensionUri);
          }
        }
      }
    };
    function hasLanguage(grammar) {
      return typeof grammar.language === "string";
    }
    var cache = null;
    function getLanguageRegistry(vscode) {
      if (!cache) {
        cache = new LanguageRegistry(vscode.extensions.all);
        const disposable = vscode.extensions.onDidChange(() => {
          cache = null;
          disposable.dispose();
        });
      }
      return cache;
    }
    async function getLanguages(languageIds) {
      const languages2 = await getUserLangs(languageIds);
      return {
        langs: languages2,
        get(languageId) {
          for (const language of languages2) {
            if (language.name === languageId) return language;
            if (language.aliases?.includes(languageId)) return language;
          }
          return;
        },
        resolveAlias(languageId) {
          return this.get(languageId)?.name ?? languageId;
        },
        resolveExtension(extension) {
          for (const language of languages2) if (language.extensions?.includes(extension)) return language.name;
          return "text";
        }
      };
    }
    async function getUserLangs(languageIds) {
      const vscode = getVscode();
      const registry2 = getLanguageRegistry(vscode);
      const fileReader = new ExtensionFileReader(vscode);
      const registeredLanguageIds = registry2.getLanguageIds();
      if (!languageIds) languageIds = registeredLanguageIds;
      else languageIds = languageIds.map((langId) => registry2.resolveAliasToLanguageId(langId)).filter((langId) => registeredLanguageIds.includes(langId));
      const builder = new LanguageRegistrationCollectionBuilder(registry2, fileReader);
      const languages2 = await builder.build(languageIds);
      return languages2;
    }
    exports.getLanguages = getLanguages;
    exports.getTheme = getTheme;
    exports.getUserLangs = getUserLangs;
    exports.getUserTheme = getUserTheme2;
  }
});

// src/worker/main.ts
import * as fs5 from "node:fs";
import * as os from "node:os";
import * as path5 from "node:path";
import { fileURLToPath } from "node:url";

// vaporview/src/extension_core/extension.ts
init_vscode();

// vaporview/src/extension_core/terminal_links.ts
init_vscode();
var TimestampLinkProvider = class {
  constructor(viewerProvider) {
    this.viewerProvider = viewerProvider;
  }
  // Terminal link provider code
  // Detect UVM timestamps - ie: @ 1234
  uvmTimestampRegex = /@\s+(\d+)/g;
  // Detect timestamps with units - ie: 1.234 ns
  timeStampWithUnits = /([\d,.]+)\s*([kmµunpf]?s)/g;
  // Detect surver URL - ie: http://192.168.1.100:8080
  surverUrlRegex = /surfer\s+(https?:\/\/[^\s]+)/g;
  provideTerminalLinks(context, token) {
    const uvmTimestampMatches = [...context.line.matchAll(this.uvmTimestampRegex)];
    const timeStampWithUnitsMatches = [...context.line.matchAll(this.timeStampWithUnits)];
    const surverUrlMatches = [...context.line.matchAll(this.surverUrlRegex)];
    const uvmTimestampLinks = uvmTimestampMatches.map((match) => {
      const line = context.line;
      const startIndex = match.index ?? line.indexOf(match[0]);
      return {
        startIndex,
        length: match[0].length,
        tooltip: "Go to time: " + match[1] + " in waveform viewer",
        data: match[0],
        type: "uvm-timestamp"
      };
    });
    const timeStampWithUnitsLinks = timeStampWithUnitsMatches.map((match) => {
      const line = context.line;
      const startIndex = match.index ?? line.indexOf(match[0]);
      return {
        startIndex,
        length: match[0].length,
        tooltip: "Go to " + match[1] + " " + match[2] + " in waveform viewer",
        data: match[0],
        type: "timestamp-with-units"
      };
    });
    const surverUrlLinks = surverUrlMatches.map((match) => {
      const line = context.line;
      const startIndex = match.index ?? line.indexOf(match[0]);
      return {
        startIndex,
        length: match[0].length,
        tooltip: "Open remote viewer: " + match[1],
        data: match[0],
        type: "surver-url"
      };
    });
    return [...uvmTimestampLinks, ...timeStampWithUnitsLinks, ...surverUrlLinks];
  }
  handleTerminalLink(link) {
    switch (link.type) {
      case "uvm-timestamp": {
        const time = parseInt([...link.data.matchAll(this.uvmTimestampRegex)][0][1]);
        this.viewerProvider.log.appendLine("UVM Timestamp link clicked: " + time);
        this.viewerProvider.setMarkerAtTime(time, 0);
        break;
      }
      case "timestamp-with-units": {
        const timeString = [...link.data.matchAll(this.timeStampWithUnits)][0][1];
        const time = parseFloat(timeString.replace(/,/g, ""));
        const units = [...link.data.matchAll(this.timeStampWithUnits)][0][2];
        this.viewerProvider.log.appendLine("Timestamp with units link clicked: " + time + "; units: " + units);
        this.viewerProvider.setMarkerAtTimeWithUnits(time, units, 0);
        break;
      }
      case "surver-url": {
        const url = [...link.data.matchAll(this.surverUrlRegex)][0][1];
        this.viewerProvider.log.appendLine("Surver URL link clicked: " + url);
        window.showInputBox({
          prompt: "Enter bearer token (optional)",
          password: true,
          value: ""
        }).then((bearerToken) => {
          this.viewerProvider.openRemoteViewer(url, bearerToken);
        });
        break;
      }
    }
  }
};
var NetlistLinkProvider = class {
  // We only want to match to valid top level modules (which will be passed in)
  // and not to any random string that looks like a netlist element
  constructor(delegate, scopeTop) {
    this.delegate = delegate;
    if (scopeTop.length > 16) {
      this.regexList.push(this.defaultRegex);
    } else {
      for (const scope of scopeTop) {
        const escapedScope = scope.replace(/[$*+?()[\]]/g, "\\$&");
        const regex = new RegExp(escapedScope + "(\\.[\\w\\$\\[\\]\\:]+)+", "g");
        this.regexList.push(regex);
      }
    }
  }
  // Terminal link provider code
  // Detect netlist elements in the terminal - ie: top.submodule.signal
  defaultRegex = /(([\w$.[\]:]+)\.)+[\w$.[\]:]+/g;
  regexList = [];
  provideTerminalLinks(context, token) {
    const netlistElementMatches = [];
    for (const regex of this.regexList) {
      const matches = [...context.line.matchAll(regex)];
      netlistElementMatches.push(...matches);
    }
    const netlistElementLinks = netlistElementMatches.map((match) => {
      const line = context.line;
      const startIndex = match.index ?? line.indexOf(match[0]);
      return {
        startIndex,
        length: match[0].length,
        tooltip: 'Add "' + match[0] + '" to waveform viewer',
        data: match[0],
        type: "netlist-element"
      };
    });
    return [...netlistElementLinks];
  }
  handleTerminalLink(link) {
    this.delegate.addSignalByNameToDocument(link.data);
    this.delegate.logOutputChannel("Terminal link clicked: " + link.data);
  }
};

// vaporview/src/extension_core/commands.ts
init_vscode();
import * as path from "path";
import { dirname } from "path";
function registerVaporviewCommands(context, outputLog, viewerProvider, documentCollection, wcpServer) {
  context.subscriptions.push(commands.registerCommand("vaporview.openFile", (e) => {
    if (!e?.uri) {
      return;
    }
    outputLog.appendLine("Command called: 'vaporview.openFile' " + e.uri.toString());
    return viewerProvider.openFileCommand(e);
  }));
  context.subscriptions.push(commands.registerCommand("waveformViewer.addVariable", (e) => {
    outputLog.appendLine("Command called: 'waveformViewer.addVariable' " + JSON.stringify(e));
    viewerProvider.variableActionCommandHandler(e, "add");
  }));
  context.subscriptions.push(commands.registerCommand("waveformViewer.removeVariable", (e) => {
    outputLog.appendLine("Command called: 'waveformViewer.removeVariable' " + JSON.stringify(e));
    viewerProvider.variableActionCommandHandler(e, "remove");
  }));
  context.subscriptions.push(commands.registerCommand("waveformViewer.revealInNetlistView", (e) => {
    outputLog.appendLine("Command called: 'waveformViewer.revealInNetlistView' " + JSON.stringify(e));
    viewerProvider.variableActionCommandHandler(e, "reveal");
  }));
  context.subscriptions.push(commands.registerCommand("waveformViewer.addSignalValueLink", (e) => {
    outputLog.appendLine("Command called: 'waveformViewer.addSignalValueLink' " + JSON.stringify(e));
    viewerProvider.variableActionCommandHandler(e, "addLink");
  }));
  context.subscriptions.push(commands.registerCommand("waveformViewer.setMarker", (e) => {
    outputLog.appendLine("Command called: 'waveformViewer.setMarker' " + JSON.stringify(e));
    viewerProvider.markerCommandHandler(e);
  }));
  context.subscriptions.push(commands.registerCommand("waveformViewer.getOpenDocuments", () => {
    outputLog.appendLine("Command called: 'waveformViewer.getOpenDocuments'");
    return viewerProvider.getAllDocumentUris();
  }));
  context.subscriptions.push(commands.registerCommand("waveformViewer.getViewerState", (e) => {
    outputLog.appendLine("Command called: 'waveformViewer.getViewerState' " + JSON.stringify(e));
    return viewerProvider.getViewerState(e.uri);
  }));
  context.subscriptions.push(commands.registerCommand("waveformViewer.loadViewerState", (e) => {
    outputLog.appendLine("Command called: 'waveformViewer.loadViewerState' " + JSON.stringify(e));
    return viewerProvider.loadViewerStateCommand(e);
  }));
  context.subscriptions.push(commands.registerCommand("waveformViewer.getValuesAtTime", (e) => {
    outputLog.appendLine("Command called: 'waveformViewer.getValuesAtTime' " + JSON.stringify(e));
    const document = viewerProvider.getDocumentFromOptionalUri(e.uri);
    if (!document) {
      return;
    }
    return document.getValuesAtTime(e);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.clickNetlistItem", (e) => {
    viewerProvider.netlistTreeDataProvider.clickNetlistItem(e.uri, e.netlistId);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.searchNetlist", (e) => {
    viewerProvider.searchNetlist(void 0);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.searchScope", (e) => {
    viewerProvider.searchNetlist(e);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.addVariableByInstancePath", (e) => {
    viewerProvider.addVariableByInstancePathToDocument(e);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.addVariable", async (e) => {
    viewerProvider.filterAddSignalsInNetlist([e], true);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.removeSignal", (e) => {
    if (e && e.rowId !== void 0) {
      viewerProvider.removeSignalFromDocument(void 0, e.rowId, true);
    }
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.newSignalGroup", (e) => {
    if (e) {
      viewerProvider.newSignalGroup(e.name, e.groupPath, e.parentGroupId, e.rowId, false);
    } else {
      viewerProvider.newSignalGroup(void 0, void 0, void 0, void 0, false);
    }
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.newGroupFromSelection", (e) => {
    viewerProvider.newSignalGroup(e?.name, e?.groupPath, e?.parentGroupId, e?.rowId, true);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.ungroupSignals", (e) => {
    viewerProvider.deleteSignalGroup(e, false);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.deleteGroup", (e) => {
    viewerProvider.deleteSignalGroup(e, true);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.newSeparator", (e) => {
    viewerProvider.newSeparator(e.name, e.groupPath, e.parentGroupId, e.rowId);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.removeSeparator", (e) => {
    viewerProvider.removeSeparator(e.rowId, true);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.newSignalFromBitRange", (e) => {
    window.showInputBox({
      prompt: "Enter the bit range (e.g. 7:0 for bits 0 to 7, or 7 for a single bit)",
      value: "0"
    }).then((bitRangeString2) => {
      if (!bitRangeString2) {
        return;
      }
      viewerProvider.newSignalFromBitRange(e.name, e.groupPath, e.parentGroupId, e.rowId, bitRangeString2);
    });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.createSignalsForAllBits", (e) => {
    viewerProvider.createSignalsForAllBits(e.name, e.groupPath, e.parentGroupId, e.rowId, 1);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.createSignalsForAllNibbles", (e) => {
    viewerProvider.createSignalsForAllBits(e.name, e.groupPath, e.parentGroupId, e.rowId, 4);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.createSignalsForAllBytes", (e) => {
    viewerProvider.createSignalsForAllBits(e.name, e.groupPath, e.parentGroupId, e.rowId, 8);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.createSignalsForAllWords", (e) => {
    viewerProvider.createSignalsForAllBits(e.name, e.groupPath, e.parentGroupId, e.rowId, 16);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.createSignalsForAllDoubleWords", (e) => {
    viewerProvider.createSignalsForAllBits(e.name, e.groupPath, e.parentGroupId, e.rowId, 32);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.createSignalsForAllQuadWords", (e) => {
    viewerProvider.createSignalsForAllBits(e.name, e.groupPath, e.parentGroupId, e.rowId, 64);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.createSignalsForAllCustomLength", (e) => {
    window.showInputBox({
      prompt: "Enter the custom length in bits",
      value: "1"
    }).then((customLength) => {
      if (!customLength) {
        return;
      }
      const length = parseInt(customLength);
      if (isNaN(length) || length <= 0) {
        window.showErrorMessage("Invalid custom length. Please enter a positive integer.");
        return;
      }
      viewerProvider.createSignalsForAllBits(e.name, e.groupPath, e.parentGroupId, e.rowId, length);
    });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.renameSignalGroup", (e) => {
    viewerProvider.renameSignalGroup(e);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.addSelected", () => {
    viewerProvider.filterAddSignalsInNetlist(viewerProvider.netlistTreeDataProvider.selectedSignals, false);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.addAllInScopeShallow", (e) => {
    viewerProvider.addAllInScopeToDocument(e, false, 128);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.addAllInScopeRecursive", (e) => {
    viewerProvider.addAllInScopeToDocument(e, true, 128);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.removeSelectedNetlist", () => {
    viewerProvider.removeSignalList(viewerProvider.netlistTreeDataProvider.selectedSignals);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.removeAllInScope", (e) => {
    if (e.collapsibleState === TreeItemCollapsibleState.None) {
      return;
    }
    viewerProvider.removeSignalList(e.children);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.showInNetlistView", (e) => {
    viewerProvider.showInNetlistView(e);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.showInViewer", (e) => {
    viewerProvider.revealSignalInWebview(e.netlistId);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.copyName", (e) => {
    let result = "";
    if (e.scopePath !== "") {
      result += e.scopePath + ".";
    }
    if (e.name) {
      result += e.name;
    }
    if (e.signalName) {
      result += e.signalName;
    }
    env.clipboard.writeText(result);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.copyValueAtMarker", (e) => {
    viewerProvider.copyValueAtMarker(e);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.saveViewerSession", async (e) => {
    const document = viewerProvider.getDocumentFromId(e.documentId);
    if (!document) {
      return;
    }
    const filePath = document.uri.fsPath;
    const fileName = path.basename(filePath);
    const saveFileName = fileName.replace(/\.[^/.]+$/, "") + ".json" || "untitled.json";
    const uri = await window.showSaveDialog({
      saveLabel: "Save session",
      filters: { JSON: ["json"] },
      defaultUri: Uri.file(path.join(dirname(filePath), saveFileName))
    });
    if (uri) {
      viewerProvider.saveSessionToFile(document, uri);
    }
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.loadViewerSession", () => {
    viewerProvider.loadSessionFromFile();
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.reloadFile", (e) => {
    viewerProvider.reloadFile(e);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.zoomToFit", (e) => {
    viewerProvider.handleKeyBinding(e, "zoomToFit");
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.setTimeUnits", () => {
    viewerProvider.updateTimeUnits("");
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.setTimeUnitsSeconds", () => {
    viewerProvider.updateTimeUnits("s");
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.setTimeUnitsMilliseconds", () => {
    viewerProvider.updateTimeUnits("ms");
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.setTimeUnitsMicroseconds", () => {
    viewerProvider.updateTimeUnits("\xB5s");
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.setTimeUnitsNanoseconds", () => {
    viewerProvider.updateTimeUnits("ns");
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.setTimeUnitsPicoseconds", () => {
    viewerProvider.updateTimeUnits("ps");
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.setTimeUnitsFemtoseconds", () => {
    viewerProvider.updateTimeUnits("fs");
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.autoRulerTimeIncrement", (e) => {
    viewerProvider.setDefaultPixelTime(e, void 0);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.setRulerTimeIncrement", (e) => {
    window.showInputBox({
      prompt: "Enter the ruler time increment - Note that this will be rounded to the nearest power of 10",
      value: ""
    }).then((increment) => {
      if (increment === void 0) {
        return;
      }
      viewerProvider.setDefaultPixelTime(e, increment);
    });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.copyWaveDrom", () => {
    viewerProvider.copyWaveDrom();
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.setWaveDromClockRising", (e) => {
    viewerProvider.setWaveDromClock("1", e.netlistId ?? null);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.setWaveDromClockFalling", (e) => {
    viewerProvider.setWaveDromClock("0", e.netlistId ?? null);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.unsetWaveDromClock", () => {
    viewerProvider.setWaveDromClock("1", null);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.displayAsBinary", (e) => {
    viewerProvider.setValueFormat(e, void 0, { valueFormat: "binary" });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.displayAsHexadecimal", (e) => {
    viewerProvider.setValueFormat(e, void 0, { valueFormat: "hexadecimal" });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.displayAsDecimal", (e) => {
    viewerProvider.setValueFormat(e, void 0, { valueFormat: "decimal" });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.displayAsDecimalSigned", (e) => {
    viewerProvider.setValueFormat(e, void 0, { valueFormat: "signed" });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.displayAsOctal", (e) => {
    viewerProvider.setValueFormat(e, void 0, { valueFormat: "octal" });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.displayAsBase64", (e) => {
    viewerProvider.setValueFormat(e, void 0, { valueFormat: "base64" });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.displayAsFloat", (e) => {
    switch (e.width) {
      case 4:
        viewerProvider.setValueFormat(e, void 0, { valueFormat: "float4" });
        break;
      case 8:
        viewerProvider.setValueFormat(e, void 0, { valueFormat: "float8" });
        break;
      case 16:
        viewerProvider.setValueFormat(e, void 0, { valueFormat: "float16" });
        break;
      case 32:
        viewerProvider.setValueFormat(e, void 0, { valueFormat: "float32" });
        break;
      case 64:
        viewerProvider.setValueFormat(e, void 0, { valueFormat: "float64" });
        break;
      default:
        viewerProvider.setValueFormat(e, void 0, { valueFormat: "binary" });
        break;
    }
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.renderMultiBit", (e) => {
    viewerProvider.setValueFormat(e, void 0, { renderType: "multiBit" });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.renderLinear", (e) => {
    viewerProvider.setValueFormat(e, void 0, { renderType: "linear" });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.renderStepped", (e) => {
    viewerProvider.setValueFormat(e, void 0, { renderType: "stepped" });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.renderLinearSigned", (e) => {
    viewerProvider.setValueFormat(e, void 0, { renderType: "linearSigned" });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.renderSteppedSigned", (e) => {
    viewerProvider.setValueFormat(e, void 0, { renderType: "steppedSigned" });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.displayAsBFloat", (e) => {
    viewerProvider.setValueFormat(e, void 0, { valueFormat: "bfloat16" });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.displayAsTFloat", (e) => {
    viewerProvider.setValueFormat(e, void 0, { valueFormat: "tensorfloat32" });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.displayAsAscii", (e) => {
    viewerProvider.setValueFormat(e, void 0, { valueFormat: "ascii" });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.displayAsEpochTimeNs", (e) => {
    viewerProvider.setValueFormat(e, void 0, { valueFormat: "nsepoch" });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.displayAsEnum", (e) => {
    viewerProvider.setValueFormat(e, void 0, { valueFormat: "enum" });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.displayAsFixedPoint", (e) => {
    window.showInputBox({
      prompt: "Enter the fixed point offset",
      value: "0"
    }).then((offset) => {
      if (!offset) {
        return;
      }
      viewerProvider.setValueFormat(e, void 0, { valueFormat: "fixedpoint_u_" + offset.toString() });
    });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.displayAsFixedPointSigned", (e) => {
    window.showInputBox({
      prompt: "Enter the fixed point offset",
      value: "0"
    }).then((offset) => {
      if (!offset) {
        return;
      }
      viewerProvider.setValueFormat(e, void 0, { valueFormat: "fixedpoint_s_" + offset.toString() });
    });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.annotatePosedge", (e) => {
    viewerProvider.setValueFormat(e, void 0, { annotateValue: ["1"] });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.annotateNegedge", (e) => {
    viewerProvider.setValueFormat(e, void 0, { annotateValue: ["0"] });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.annotateAllEdge", (e) => {
    viewerProvider.setValueFormat(e, void 0, { annotateValue: ["0", "1"] });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.annotateNone", (e) => {
    viewerProvider.setValueFormat(e, void 0, { annotateValue: [] });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.defaultColor1", (e) => {
    viewerProvider.setValueFormat(e, void 0, { colorIndex: 0 });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.defaultColor2", (e) => {
    viewerProvider.setValueFormat(e, void 0, { colorIndex: 1 });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.defaultColor3", (e) => {
    viewerProvider.setValueFormat(e, void 0, { colorIndex: 2 });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.defaultColor4", (e) => {
    viewerProvider.setValueFormat(e, void 0, { colorIndex: 3 });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.defaultColor5", (e) => {
    viewerProvider.setValueFormat(e, void 0, { colorIndex: 4 });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.defaultColor6", (e) => {
    viewerProvider.setValueFormat(e, void 0, { colorIndex: 5 });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.defaultColor7", (e) => {
    viewerProvider.setValueFormat(e, void 0, { colorIndex: 6 });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.defaultColor8", (e) => {
    viewerProvider.setValueFormat(e, void 0, { colorIndex: 7 });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.rowHeight1x", (e) => {
    viewerProvider.setValueFormat(e, void 0, { rowHeight: 1 });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.rowHeight2x", (e) => {
    viewerProvider.setValueFormat(e, void 0, { rowHeight: 2 });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.rowHeight4x", (e) => {
    viewerProvider.setValueFormat(e, void 0, { rowHeight: 4 });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.rowHeight8x", (e) => {
    viewerProvider.setValueFormat(e, void 0, { rowHeight: 8 });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.increaseVerticalScale", (e) => {
    viewerProvider.handleKeyBinding(e, "increaseVerticalScale");
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.decreaseVerticalScale", (e) => {
    viewerProvider.handleKeyBinding(e, "decreaseVerticalScale");
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.resetVerticalScale", (e) => {
    viewerProvider.handleKeyBinding(e, "resetVerticalScale");
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.setNameTypeFullPath", (e) => {
    viewerProvider.setValueFormat(e, void 0, { nameType: "fullPath" });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.setNameTypeSignalName", (e) => {
    viewerProvider.setValueFormat(e, void 0, { nameType: "signalName" });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.setNameTypeCustom", (e) => {
    viewerProvider.setValueFormat(e, void 0, { nameType: "custom" });
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.showRulerLines", () => {
    workspace.getConfiguration("vaporview").update("showRulerLines", true, ConfigurationTarget.Global);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.hideRulerLines", () => {
    workspace.getConfiguration("vaporview").update("showRulerLines", false, ConfigurationTarget.Global);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.fillBitVector", () => {
    workspace.getConfiguration("vaporview").update("fillMultiBitValues", true, ConfigurationTarget.Global);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.outlineBitVector", () => {
    workspace.getConfiguration("vaporview").update("fillMultiBitValues", false, ConfigurationTarget.Global);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.enableAnimations", () => {
    workspace.getConfiguration("vaporview").update("enableAnimations", true, ConfigurationTarget.Global);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.disableAnimations", () => {
    workspace.getConfiguration("vaporview").update("enableAnimations", false, ConfigurationTarget.Global);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.setMouseScrollingMode", () => {
    workspace.getConfiguration("vaporview").update("scrollingMode", "Mouse", ConfigurationTarget.Global);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.setTouchpadScrollingMode", () => {
    workspace.getConfiguration("vaporview").update("scrollingMode", "Touchpad", ConfigurationTarget.Global);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.setAutoScrollingMode", () => {
    workspace.getConfiguration("vaporview").update("scrollingMode", "Auto", ConfigurationTarget.Global);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.viewVaporViewSettings", () => {
    commands.executeCommand("workbench.action.openSettings", "vaporview");
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.showReadme", () => {
    commands.executeCommand("extension.open", "lramseyer.vaporview");
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.dummy", (e) => {
    outputLog.appendLine("Command called: 'vaporview.dummy' " + JSON.stringify(e));
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.openRemoteViewer", async (e) => {
    if (e && e.url) {
      viewerProvider.openRemoteViewer(e.url, e.bearerToken);
      return;
    }
    const serverUrl = await window.showInputBox({
      prompt: "Enter the Surfer server URL",
      value: ""
    });
    if (!serverUrl) {
      return;
    }
    const bearerToken = await window.showInputBox({
      prompt: "Enter bearer token (optional)",
      password: true,
      value: ""
    });
    viewerProvider.openRemoteViewer(serverUrl, bearerToken);
  }));
  context.subscriptions.push(commands.registerCommand("vaporview.wcp.openWaveform", async (resource) => {
    let uri = typeof resource === "string" ? Uri.file(resource) : resource;
    if (!uri) {
      const selected = await window.showOpenDialog({
        canSelectFiles: true,
        canSelectFolders: false,
        canSelectMany: false,
        filters: { "Wave files": ["vcd", "fst", "ghw", "fsdb"] },
        title: "Open waveform with VaporView"
      });
      uri = selected?.[0];
    }
    if (!uri) {
      throw new Error("No waveform was selected");
    }
    return await wcpServer.openWaveform(uri);
  }));
}

// vaporview/src/extension_core/viewer_provider.ts
init_vscode();

// vaporview/packages/vaporview-api/index.ts
init_vscode();
function decodeNetlistUri(uri) {
  if (uri.scheme !== "waveform") {
    throw new Error("Not a waveform URI");
  }
  const params = new URLSearchParams(uri.fragment);
  const result = { fsPath: uri.path, path: "" };
  const scope = params.get("scope");
  const varId = params.get("var");
  const net = params.get("net");
  if (scope) {
    result.scopeId = decodeURIComponent(scope);
    result.id = parseInt(scope);
  }
  if (varId) {
    result.id = parseInt(varId);
  }
  if (net) {
    result.path = decodeURIComponent(net);
  }
  return result;
}

// vaporview/src/common/functions.ts
function createInstancePath(scopePath, signalName) {
  if (scopePath.length === 0) {
    return signalName;
  } else {
    return scopePath.join(".") + "." + signalName;
  }
}
function bitRangeString(msb, lsb, hideBitZero) {
  if (hideBitZero && lsb === 0 && msb === 0) {
    return "";
  }
  if (msb < 0 || lsb < 0) {
    return "";
  }
  if (msb === lsb) {
    return "[" + msb + "]";
  }
  return "[" + msb + ":" + lsb + "]";
}
function toStringWithCommas(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function parseParamValue(paramValue) {
  if (paramValue === "") {
    return "";
  }
  if (paramValue.match(/[xXzZ]/)) {
    return paramValue;
  }
  return BigInt("0b" + paramValue).toString(10);
}
function scaleFromUnits(unit) {
  switch (unit) {
    case "zs":
      return 1e-21;
    case "as":
      return 1e-18;
    case "fs":
      return 1e-15;
    case "ps":
      return 1e-12;
    case "ns":
      return 1e-9;
    case "us":
      return 1e-6;
    case "\xB5s":
      return 1e-6;
    case "ms":
      return 1e-3;
    case "s":
      return 1;
    case "ks":
      return 1e3;
    default:
      return 1;
  }
}
function logScaleFromUnits(unit) {
  switch (unit) {
    case "zs":
      return -21;
    case "as":
      return -18;
    case "fs":
      return -15;
    case "ps":
      return -12;
    case "ns":
      return -9;
    case "us":
      return -6;
    case "\xB5s":
      return -6;
    case "ms":
      return -3;
    case "s":
      return 0;
    case "ks":
      return 3;
    default:
      return 0;
  }
}
function timeHz(deltaT, unit, precision) {
  const timeHz2 = Math.abs(1 / (deltaT * scaleFromUnits(unit)));
  let divisor = 1;
  let units = "Hz";
  if (timeHz2 >= 1e15) {
    divisor = 1e15;
    units = "PHz";
  } else if (timeHz2 >= 1e12) {
    divisor = 1e12;
    units = "THz";
  } else if (timeHz2 >= 1e9) {
    divisor = 1e9;
    units = "GHz";
  } else if (timeHz2 >= 1e6) {
    divisor = 1e6;
    units = "MHz";
  } else if (timeHz2 >= 1e3) {
    divisor = 1e3;
    units = "KHz";
  }
  const roundedTimeHz = Math.round(timeHz2 / divisor * Math.pow(10, precision)) / Math.pow(10, precision);
  return roundedTimeHz + " " + units;
}

// vaporview/src/extension_core/viewer_provider.ts
import * as fs3 from "fs";

// vaporview/src/extension_core/document.ts
init_vscode();
import * as path2 from "path";

// vaporview/src/extension_core/tree_view.ts
init_vscode();
var scopeColor = new ThemeColor("charts.purple");
var moduleIcon = new ThemeIcon("chip", scopeColor);
var taskIcon = new ThemeIcon("debug-stackframe", scopeColor);
var funcIcon = new ThemeIcon("symbol-module", scopeColor);
var beginIcon = new ThemeIcon("debug-start", scopeColor);
var forkIcon = new ThemeIcon("repo-forked", scopeColor);
var structIcon = new ThemeIcon("symbol-structure", scopeColor);
var unionIcon = new ThemeIcon("surround-with", scopeColor);
var classIcon = new ThemeIcon("symbol-misc", scopeColor);
var interfaceIcon = new ThemeIcon("debug-disconnect", scopeColor);
var packageIcon = new ThemeIcon("package", scopeColor);
var scopeIcon = new ThemeIcon("symbol-module", scopeColor);
var unknownIcon = new ThemeIcon("symbol-misc", scopeColor);
function getScopeIcon(type) {
  const typeName = type.toLocaleLowerCase();
  switch (typeName) {
    case "module": {
      return moduleIcon;
    }
    case "task": {
      return taskIcon;
    }
    case "function": {
      return funcIcon;
    }
    case "begin": {
      return beginIcon;
    }
    case "fork": {
      return forkIcon;
    }
    case "generate": {
      return scopeIcon;
    }
    case "struct": {
      return structIcon;
    }
    case "union": {
      return unionIcon;
    }
    case "class": {
      return classIcon;
    }
    case "interface": {
      return interfaceIcon;
    }
    case "package": {
      return packageIcon;
    }
    case "program": {
      return scopeIcon;
    }
    case "vhdlarchitecture": {
      return scopeIcon;
    }
    case "vhdlprocedure": {
      return taskIcon;
    }
    case "vhdlfunction": {
      return funcIcon;
    }
    case "vhdlrecord": {
      return scopeIcon;
    }
    case "vhdlprocess": {
      return scopeIcon;
    }
    case "vhdlblock": {
      return scopeIcon;
    }
    case "vhdlforgenerate": {
      return scopeIcon;
    }
    case "vhdlifgenerate": {
      return scopeIcon;
    }
    case "vhdlgenerate": {
      return scopeIcon;
    }
    case "vhdlpackage": {
      return packageIcon;
    }
    case "ghwgeneric": {
      return scopeIcon;
    }
    case "vhdlarray": {
      return scopeIcon;
    }
    case "unknown": {
      return unknownIcon;
    }
    case "clocking": {
      return scopeIcon;
    }
    case "svarray": {
      return scopeIcon;
    }
  }
  return unknownIcon;
}
function createScope(name, type, path6, netlistId, scopeOffsetIdx, uri) {
  const icon = getScopeIcon(type);
  const typeName = type.toLocaleLowerCase();
  if (typeName === "vhdlarray") {
    const regex = /\[(\d+:)?(\d+)\]$/;
    name = name.replace(regex, "");
  }
  const module = new NetlistItem(name, "", typeName, "none" /* none */, 0, 0, netlistId, name, path6, 0, 0, "", scopeOffsetIdx, [], TreeItemCollapsibleState.Collapsed, uri);
  module.iconPath = icon;
  return module;
}
var chartsGreen = new ThemeColor("charts.green");
var chartsOrange = new ThemeColor("charts.orange");
var chartsYellow = new ThemeColor("charts.yellow");
var chartsBlue = new ThemeColor("charts.blue");
var regIcon = new ThemeIcon("symbol-array", chartsGreen);
var wireIcon = new ThemeIcon("symbol-interface", chartsGreen);
var intIcon = new ThemeIcon("symbol-variable", chartsGreen);
var paramIcon = new ThemeIcon("settings", chartsBlue);
var realIcon = new ThemeIcon("pulse", chartsOrange);
var defaultIcon = new ThemeIcon("file-binary", chartsGreen);
var stringIcon = new ThemeIcon("symbol-key", chartsYellow);
var portIcon = new ThemeIcon("plug", chartsGreen);
var timeIcon = new ThemeIcon("watch", chartsGreen);
var enumIcon = new ThemeIcon("symbol-parameter", chartsGreen);
function getVarIcon(type) {
  const typeName = type.toLocaleLowerCase();
  switch (typeName) {
    case "event": {
      return defaultIcon;
    }
    case "integer": {
      return intIcon;
    }
    case "parameter": {
      return paramIcon;
    }
    case "real": {
      return realIcon;
    }
    case "reg": {
      return defaultIcon;
    }
    case "supply0": {
      return defaultIcon;
    }
    case "supply1": {
      return defaultIcon;
    }
    case "time": {
      return timeIcon;
    }
    case "tri": {
      return defaultIcon;
    }
    case "triand": {
      return defaultIcon;
    }
    case "trior": {
      return defaultIcon;
    }
    case "trireg": {
      return defaultIcon;
    }
    case "tri0": {
      return defaultIcon;
    }
    case "tri1": {
      return defaultIcon;
    }
    case "wand": {
      return defaultIcon;
    }
    case "wire": {
      return wireIcon;
    }
    case "wor": {
      return defaultIcon;
    }
    case "string": {
      return stringIcon;
    }
    case "port": {
      return portIcon;
    }
    case "sparsearray": {
      return defaultIcon;
    }
    case "realtime": {
      return timeIcon;
    }
    case "realparameter": {
      return paramIcon;
    }
    case "bit": {
      return defaultIcon;
    }
    case "logic": {
      return defaultIcon;
    }
    case "int": {
      return intIcon;
    }
    case "shortint": {
      return intIcon;
    }
    case "longint": {
      return intIcon;
    }
    case "byte": {
      return defaultIcon;
    }
    case "enum": {
      return enumIcon;
    }
    case "shortreal": {
      return defaultIcon;
    }
    case "boolean": {
      return defaultIcon;
    }
    case "bitvector": {
      return defaultIcon;
    }
    case "stdlogic": {
      return defaultIcon;
    }
    case "stdlogicvector": {
      return defaultIcon;
    }
    case "stdulogic": {
      return defaultIcon;
    }
    case "stdulogicvector": {
      return defaultIcon;
    }
  }
  return defaultIcon;
}
function createVar(name, paramValue, type, encoding, path6, netlistId, signalId, width, msb, lsb, enumType, isFsdb, uri) {
  const field = bitRangeString(msb, lsb, false);
  let label = name;
  if (isFsdb) {
    const regex = /\[(\d+:)?(\d+)\]$/;
    const stripped = name.replace(regex, "");
    if (stripped === name && field !== "") {
      label = name + field;
    }
    name = stripped;
  } else {
    label = name + field;
  }
  let variableEncoding = "none" /* none */;
  switch (encoding) {
    case "BitVector": {
      variableEncoding = "BitVector" /* BitVector */;
      break;
    }
    case "Real": {
      variableEncoding = "Real" /* Real */;
      break;
    }
    case "String": {
      variableEncoding = "String" /* String */;
      break;
    }
    default: {
      variableEncoding = "none" /* none */;
      break;
    }
  }
  const variable = new NetlistItem(label, paramValue, type, variableEncoding, width, signalId, netlistId, name, path6, msb, lsb, enumType, -1, [], TreeItemCollapsibleState.None, uri);
  const typeName = type.toLocaleLowerCase();
  const icon = getVarIcon(type);
  variable.iconPath = icon;
  if (typeName === "wire" || typeName === "reg" || icon === defaultIcon) {
    if (width > 1) {
      variable.iconPath = regIcon;
    } else {
      variable.iconPath = wireIcon;
    }
  }
  return variable;
}
var NetlistTreeDataProvider = class {
  treeData = [];
  _onDidChangeTreeData = new EventEmitter();
  onDidChangeTreeData = this._onDidChangeTreeData.event;
  document;
  lastClickedTreeItem = void 0;
  lastClickedTime = 0;
  _selectedSignals = [];
  get selectedSignals() {
    return this._selectedSignals;
  }
  // onDidChangeSelection() event returns readonly elements
  // so we need to copy the selected elements to a new array
  // Six one way, half a dozen the other. One is just more concise...
  handleSelectionChanged = (e, uri) => {
    this._selectedSignals = [];
    e.selection.forEach((element) => {
      this._selectedSignals.push(element);
    });
    if (this._selectedSignals.length === 1 && uri !== void 0) {
      const netlistData = this._selectedSignals[0];
      WaveformViewerProvider.signalSelectEventEmitter.fire({
        uri: uri.toString(),
        instancePath: [netlistData.instancePath()],
        netlistId: [netlistData.netlistId],
        source: "netlistView"
      });
    }
  };
  loadDocument(document) {
    this.setTreeData(document.treeData);
    this.document = document;
    this._selectedSignals = [];
  }
  // Method to set the tree data
  setTreeData(netlistItems) {
    this.treeData = netlistItems;
    this._onDidChangeTreeData.fire(void 0);
  }
  hide() {
    this.setTreeData([]);
    this.document = void 0;
    this._selectedSignals = [];
  }
  getTreeData() {
    return this.treeData;
  }
  getTreeItem(element) {
    return element;
  }
  getChildren(element) {
    return this.document?.getScopeChildren(element) ?? Promise.resolve([]);
  }
  getParent(element) {
    if (this.document && element.scopePath.length !== 0) {
      const name = element.scopePath[element.scopePath.length - 1];
      const scopePath = element.scopePath.slice(0, -1);
      return Promise.resolve(this.document.findTreeItem(scopePath, name, void 0, void 0));
    }
    return null;
  }
  clickNetlistItem(uri, netlistId) {
    const currentTime = Date.now();
    const deltaTime = currentTime - this.lastClickedTime;
    this.lastClickedTime = currentTime;
    let newUri = uri;
    if (deltaTime < 300 && uri === this.lastClickedTreeItem) {
      if (!this.document) {
        return;
      }
      this.document.renderSignals([netlistId], void 0, void 0);
      newUri = void 0;
    }
    this.lastClickedTreeItem = newUri;
  }
  refresh() {
    this._onDidChangeTreeData.fire(void 0);
  }
};
var NetlistItem = class extends TreeItem {
  constructor(label, paramValue, type, encoding, width, signalId, netlistId, name, scopePath, msb, lsb, enumType, scopeOffsetIdx, children = [], collapsibleState, uri) {
    super(label, collapsibleState);
    this.label = label;
    this.paramValue = paramValue;
    this.type = type;
    this.encoding = encoding;
    this.width = width;
    this.signalId = signalId;
    this.netlistId = netlistId;
    this.name = name;
    this.scopePath = scopePath;
    this.msb = msb;
    this.lsb = lsb;
    this.enumType = enumType;
    this.scopeOffsetIdx = scopeOffsetIdx;
    this.children = children;
    this.collapsibleState = collapsibleState;
    const fullName = this.instancePath();
    let fragmentId = "";
    if (collapsibleState === TreeItemCollapsibleState.None) {
      fragmentId = "var=" + netlistId;
      this.contextValue = "netlistVar";
    } else {
      fragmentId = "scope=" + netlistId;
      this.contextValue = "netlistScope";
    }
    this.setParamAndTooltip(paramValue);
    this.resourceUri = Uri.parse(`waveform://${uri.fsPath}#${fragmentId}&net=${this.instancePath()}`);
    if (this.contextValue === "netlistVar") {
      this.command = {
        command: "vaporview.clickNetlistItem",
        title: "Add to viewer",
        arguments: [{ uri: this.resourceUri, netlistId: this.netlistId }]
      };
    } else {
      this.command = void 0;
    }
  }
  //public numberFormat: string;
  fsdbVarLoaded = false;
  // Only used in fsdb
  resourceUri;
  command;
  instancePath() {
    return createInstancePath(this.scopePath, this.name);
  }
  setParamAndTooltip(paramValue) {
    this.paramValue = paramValue;
    this.description = parseParamValue(paramValue);
    this.tooltip = "Name: " + this.instancePath() + "\nType: " + this.type + "\n";
    if (this.collapsibleState === TreeItemCollapsibleState.None) {
      this.tooltip += "Width: " + this.width + "\nEncoding: " + this.encoding;
    }
    if (this.paramValue !== "") {
      this.tooltip += "\nParameter Value: " + this.description;
    }
  }
  // Method to recursively find a child element in the tree
  async findChild(label, document, msb, lsb) {
    if (label.length === 0) {
      if (this.contextValue === "netlistScope") {
        return this;
      }
      if (this.children.length === 0 || this.children === void 0) {
        return this;
      }
      if (msb === void 0 || lsb === void 0) {
        return this;
      }
      if (this.msb === msb && this.lsb === lsb) {
        return this;
      }
      const returnItem = this.children.find((childItem2) => childItem2.msb === msb && childItem2.lsb === lsb);
      if (returnItem) {
        return returnItem;
      }
      return this;
    }
    const currentModule = label[0];
    if (this.children.length === 0 || document.fileType === "fsdb" && this.fsdbVarLoaded === false) {
      await document.getScopeChildren(this);
    }
    const childItem = this.children.find((child) => child.name === currentModule);
    if (childItem) {
      return await childItem.findChild(label.slice(1), document, msb, lsb);
    } else {
      return null;
    }
  }
};
var netlistItemDragAndDropController = {
  dragMimeTypes: [],
  dropMimeTypes: [],
  handleDrag: (source, dataTransfer, token) => {
    return Promise.resolve();
  },
  handleDrop: (target, dataTransfer, token) => {
    return Promise.resolve();
  }
};
var VaporviewStatusBar = class {
  constructor(context) {
    this.context = context;
    this.markerTimeStatusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 97);
    this.deltaTimeStatusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 98);
    this.selectedSignalStatusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 99);
    this.markerTimeStatusBarItem.command = "vaporview.setTimeUnits";
    this.markerTimeStatusBarItem.tooltip = "Select Time Units";
    this.context.subscriptions.push(this.markerTimeStatusBarItem);
    this.context.subscriptions.push(this.deltaTimeStatusBarItem);
    this.context.subscriptions.push(this.selectedSignalStatusBarItem);
  }
  markerTimeStatusBarItem;
  deltaTimeStatusBarItem;
  selectedSignalStatusBarItem;
  hide() {
    this.markerTimeStatusBarItem.hide();
    this.deltaTimeStatusBarItem.hide();
    this.selectedSignalStatusBarItem.hide();
  }
  update(document, event) {
    if (!document) {
      return;
    }
    const w = document.webviewContext;
    const timeUnit = event.displayTimeUnit || w.displayTimeUnit;
    if (w.markerTime || w.markerTime === 0) {
      this.markerTimeStatusBarItem.text = "Time: " + document.formatTime(w.markerTime, timeUnit);
      if (w.altMarkerTime !== null && w.markerTime !== null) {
        const deltaT = w.markerTime - w.altMarkerTime;
        this.deltaTimeStatusBarItem.text = "\u0394t: " + document.formatTime(deltaT, timeUnit) + " (" + timeHz(deltaT, document.metadata.timeUnit, 3) + ")";
        this.deltaTimeStatusBarItem.show();
      } else {
        this.deltaTimeStatusBarItem.hide();
      }
    } else {
      this.deltaTimeStatusBarItem.hide();
      this.markerTimeStatusBarItem.text = "Time Units: " + timeUnit;
    }
    this.markerTimeStatusBarItem.show();
    if (w.selectedSignal || w.selectedSignal === 0) {
      const netlistData = document.netlistIdTable[w.selectedSignal];
      if (netlistData) {
        const signalName = netlistData.name;
        this.selectedSignalStatusBarItem.text = "Selected signal: " + signalName;
      } else {
        this.selectedSignalStatusBarItem.hide();
      }
      if (event.transitionCount !== void 0 && event.transitionCount !== null) {
        const plural = event.transitionCount === 1 ? ")" : "s)";
        this.selectedSignalStatusBarItem.text += " (" + toStringWithCommas(event.transitionCount) + " value change" + plural;
      }
      this.selectedSignalStatusBarItem.show();
    } else if (event.selectedSignalCount !== void 0 && event.selectedSignalCount > 1) {
      this.selectedSignalStatusBarItem.text = event.selectedSignalCount + " signals selected";
    } else {
      this.selectedSignalStatusBarItem.hide();
    }
  }
};

// vaporview/src/extension_core/document.ts
var WebviewInitState = class {
  _initialized = false;
  _promise;
  _resolve;
  _reject;
  get initialized() {
    return this._initialized;
  }
  constructor() {
    this.createPromise();
  }
  wait() {
    return this._promise;
  }
  cancel(reason) {
    this._reject(reason);
  }
  createPromise() {
    this._promise = new Promise((resolve2, reject) => {
      this._resolve = resolve2;
      this._reject = reject;
    });
    this._promise.catch(() => {
    });
  }
  setInitialized() {
    this._initialized = true;
    this._resolve();
  }
  setNotInitialized() {
    if (this._initialized) {
      this.createPromise();
    }
    this._initialized = false;
  }
};
var WebviewState = class {
  markerTime = null;
  altMarkerTime = null;
  displayTimeUnit = "ns";
  selectedSignal = null;
  zoomRatio = 1;
  scrollLeft = 0;
  defaultPixelTime = 1;
  autoReload = false;
  displayedSignals = [];
};
var VaporviewDocument = class _VaporviewDocument extends Disposable {
  disposables = [];
  uri;
  fileType = "unknown";
  fileWatcher = void 0;
  reloadDebounce = void 0;
  _fileUpdated = false;
  _reloadPending = false;
  documentId;
  // Hierarchy
  treeData = [];
  _netlistIdTable = [];
  terminalLinkDisposable = void 0;
  sortNetlist = workspace.getConfiguration("vaporview").get("sortNetlist") || false;
  _providerDelegate;
  // Format handler (composition) - always defined
  _handler;
  // Webview
  webviewPanel = void 0;
  _webviewInitState = new WebviewInitState();
  metadata;
  webviewContext = new WebviewState();
  // State management
  clearDirtyStatus = false;
  saveFileUri = void 0;
  undoStack = [];
  redoStack = [];
  constructor(uri, providerDelegate, handler, documentId) {
    super(() => this.dispose());
    this.uri = uri;
    this.documentId = documentId;
    this.fileType = uri.fsPath.split(".").pop()?.toLocaleLowerCase() || "";
    this._providerDelegate = providerDelegate;
    this._handler = handler;
    this.metadata = this._handler.metadata;
    this.setupFileWatcher();
  }
  static async create(uri, handler, providerDelegate, documentCollection) {
    const fileType = uri.fsPath.split(".").pop()?.toLocaleLowerCase() || "";
    const documentId = documentCollection.createUniqueDocumentId();
    const document = new _VaporviewDocument(uri, providerDelegate, handler, documentId);
    documentCollection.add(documentId, document);
    if (fileType === "fsdb") {
      document._handler.findTreeItemFn = document.findTreeItem.bind(document);
    }
    return document;
  }
  // #region Public getters
  get netlistIdTable() {
    return this._netlistIdTable;
  }
  get webviewInitialized() {
    return this._webviewInitState.initialized;
  }
  // Await this before sending state or signals to the webview from outside the
  // webview lifecycle (commands, API calls). Rejects if the document is disposed first.
  whenWebviewInitialized() {
    return this._webviewInitState.wait();
  }
  get fileUpdated() {
    return this._fileUpdated;
  }
  get reloadPending() {
    return this._reloadPending;
  }
  //public get handler(): WaveformFileParser { return this._handler; }
  get providerDelegate() {
    return this._providerDelegate;
  }
  postMessageToWebview(message2) {
    this.webviewPanel?.webview.postMessage(message2);
  }
  // #region Handler management
  async load() {
    const loadTime = Date.now();
    await this._handler.loadNetlist();
    const netlistTime = (Date.now() - loadTime) / 1e3;
    this.treeData = await this.getScopeChildren(void 0);
    this._providerDelegate.updateViews(this.uri);
    this.setSearchCommandContext();
    const scopeCount = toStringWithCommas(this._handler.metadata.scopeCount);
    const netlistIdCount = toStringWithCommas(this._handler.metadata.netlistIdCount);
    this._providerDelegate.logOutputChannel("Finished parsing netlist for " + this.uri.fsPath);
    this._providerDelegate.logOutputChannel("Scope count: " + scopeCount + ", Variable count: " + netlistIdCount + ", Time: " + netlistTime + " seconds");
    const bodyLoadTime = Date.now();
    await this._handler.loadBody();
    const bodyTime = (Date.now() - bodyLoadTime) / 1e3;
    this.onDoneParsingWaveforms();
    const timeTableCount = toStringWithCommas(Number(this.metadata.timeTableCount));
    this._providerDelegate.logOutputChannel("Finished parsing body for " + this.uri.fsPath);
    this._providerDelegate.logOutputChannel("Total Value Change Events: " + timeTableCount + ", Time: " + bodyTime + " seconds");
  }
  // #region Webview lifecycle
  // This function requires both the webview panel to be initialized and the
  // waveform dump file to be loaded. Both of these tasks call this function
  // upon completion, so we need to check for both conditions.
  onWebviewReady(webviewPanel) {
    this.webviewPanel = webviewPanel;
    this._handler.postMessageToWebview = webviewPanel.webview.postMessage.bind(webviewPanel.webview);
    if (!this.metadata.timeTableLoaded) {
      return;
    }
    this._webviewInitState.setNotInitialized();
    const colorPalette = this._providerDelegate.getColorPalette();
    this.setConfigurationSettings();
    webviewPanel.webview.postMessage({
      command: "initViewport",
      metadata: this.metadata,
      documentId: this.documentId,
      uri: this.uri.toString(),
      colorPalette: colorPalette.colorPalette,
      errorColorPalette: colorPalette.errorColorPalette,
      themeValid: colorPalette.themeValid,
      autoReload: this.webviewContext.autoReload
    });
  }
  onWebviewInitialized() {
    this._webviewInitState.setInitialized();
  }
  setConfigurationSettings() {
    const config = workspace.getConfiguration("vaporview");
    const customColor5 = config.get("customColor5");
    const customColor6 = config.get("customColor6");
    const customColor7 = config.get("customColor7");
    const customColor8 = config.get("customColor8");
    this.webviewPanel?.webview.postMessage({
      command: "setConfigSettings",
      scrollingMode: config.get("scrollingMode"),
      touchpadPinchSensitivity: config.get("touchpadPinchSensitivity"),
      rulerLines: config.get("showRulerLines"),
      overrideDevicePixelRatio: config.get("overrideDevicePixelRatio"),
      userPixelRatio: config.get("userPixelRatio"),
      fillMultiBitValues: config.get("fillMultiBitValues"),
      multiBitFixedHeight: config.get("multiBitFixedHeight"),
      removeGlitchTransitions: config.get("removeGlitchTransitions"),
      defaultTimeUnit: config.get("defaultTimeUnit"),
      enableAnimations: config.get("enableAnimations"),
      animationDuration: config.get("animationDuration"),
      useGlow: config.get("useGlow"),
      disableAnalogRendererOptimizations: config.get("disableAnalogRendererOptimizations"),
      defaultNameType: config.get("defaultNameType"),
      defaultSingleBitColor: config.get("defaultSingleBitColor"),
      defaultMultiBitColor: config.get("defaultMultiBitColor"),
      defaultParamColor: config.get("defaultParamColor"),
      defaultStringColor: config.get("defaultStringColor"),
      defaultEnumColor: config.get("defaultEnumColor"),
      defaultCustomSignalColor: config.get("defaultCustomSignalColor"),
      customColorPalette: [customColor5, customColor6, customColor7, customColor8]
    });
    this.setTerminalLinkProvider();
  }
  setSearchCommandContext() {
    commands.executeCommand("setContext", "vaporview.netlistSearchable", this._handler.netlistSearchable);
  }
  onDoneParsingWaveforms() {
    if (this.webviewPanel) {
      this.onWebviewReady(this.webviewPanel);
    }
  }
  // #region Webview state management
  captureWebviewState(event) {
    let isDirty = false;
    if (event.stateChangeType === 5 /* User */ || event.stateChangeType === 2 /* File */) {
      this.captureStateForUndo();
      this.redoStack = [];
    }
    if (event.stateChangeType === 5 /* User */) {
      isDirty = true;
    }
    if (event.markerTime || event.markerTime === 0) {
      this.webviewContext.markerTime = event.markerTime;
    }
    if (event.altMarkerTime || event.altMarkerTime === 0) {
      this.webviewContext.altMarkerTime = event.altMarkerTime;
    }
    if (event.displayTimeUnit) {
      this.webviewContext.displayTimeUnit = event.displayTimeUnit;
    }
    this.webviewContext.selectedSignal = event.selectedSignal ?? this.webviewContext.selectedSignal;
    this.webviewContext.displayedSignals = event.displayedSignals || this.webviewContext.displayedSignals;
    this.webviewContext.zoomRatio = event.zoomRatio || this.webviewContext.zoomRatio;
    this.webviewContext.scrollLeft = event.scrollLeft || this.webviewContext.scrollLeft;
    this.webviewContext.defaultPixelTime = event.defaultPixelTime || this.webviewContext.defaultPixelTime;
    this.webviewContext.autoReload = event.autoReload || this.webviewContext.autoReload;
    return isDirty;
  }
  getWebviewSession() {
    return {
      extensionVersion: extensions.getExtension("Lramseyer.vaporview")?.packageJSON.version,
      fileName: this.uri.fsPath,
      markerTime: this.webviewContext.markerTime,
      altMarkerTime: this.webviewContext.altMarkerTime,
      displayTimeUnit: this.webviewContext.displayTimeUnit,
      selectedSignal: this.getNameFromNetlistId(this.webviewContext.selectedSignal),
      zoomRatio: this.webviewContext.zoomRatio,
      scrollLeft: this.webviewContext.scrollLeft,
      defaultPixelTime: this.webviewContext.defaultPixelTime,
      displayedSignals: this.webviewContext.displayedSignals
    };
  }
  async getNetlistItemFromSignalInfo(signalInfo, useNetlistId) {
    let metadata = null;
    if (useNetlistId && signalInfo.netlistId !== void 0) {
      metadata = this.netlistIdTable[signalInfo.netlistId];
    } else {
      metadata = await this.findTreeItem(signalInfo.scopePath, signalInfo.name, signalInfo.msb, signalInfo.lsb);
    }
    return metadata;
  }
  async parseNetlistVariableSettings(signalInfo, useNetlistId) {
    const metadata = await this.getNetlistItemFromSignalInfo(signalInfo, useNetlistId);
    if (metadata !== null) {
      const signalData = Object.assign(signalInfo, {
        netlistId: metadata.netlistId,
        signalId: metadata.signalId,
        signalName: metadata.name,
        scopePath: metadata.scopePath,
        signalWidth: metadata.width,
        type: metadata.type,
        encoding: metadata.encoding,
        enumType: metadata.enumType,
        msb: metadata.msb,
        lsb: metadata.lsb
      });
      return signalData;
    } else {
      const signalData = Object.assign(signalInfo, {
        netlistId: void 0,
        signalId: void 0,
        signalName: signalInfo.name.split(".").pop() || "",
        scopePath: signalInfo.name.split(".").slice(0, -1)
      });
      return signalData;
    }
  }
  async parseCustomVariableSettings(signalInfo, useNetlistId) {
    let dataValid = true;
    const missingSignals = [];
    const source = await Promise.all((signalInfo.source || []).map(async (item) => {
      const metadata = await this.getNetlistItemFromSignalInfo(item, useNetlistId);
      const defaultSource = {
        name: item.name,
        scopePath: item.scopePath || [],
        netlistId: void 0,
        signalId: void 0,
        signalWidth: item.signalWidth,
        msb: item.msb,
        lsb: Math.max(item.lsb, 0)
      };
      if (metadata === null) {
        dataValid = false;
        missingSignals.push(item.name);
        return defaultSource;
      }
      if (item.lsb >= metadata.width) {
        dataValid = false;
        missingSignals.push(item.name);
        return defaultSource;
      }
      const source2 = {
        name: metadata.name,
        scopePath: metadata.scopePath,
        netlistId: metadata.netlistId,
        signalId: metadata.signalId,
        signalWidth: metadata.width,
        msb: Math.min(item.msb, metadata.width - 1),
        lsb: Math.max(item.lsb, 0)
      };
      return source2;
    }));
    const signalData = Object.assign(signalInfo, {
      encoding: "BitVector" /* BitVector */,
      source
    });
    return {
      dataValid,
      signalData,
      missingSignals
    };
  }
  async convertSignalListToSettings(signalList, useNetlistId) {
    const missingSignals = [];
    const settings = [];
    if (!Array.isArray(signalList)) {
      return { missingSignals: [], signalList: [] };
    }
    for (const signalInfo of signalList) {
      try {
        if (signalInfo.dataType && signalInfo.dataType === "signal-group") {
          const childrenSettings = await this.convertSignalListToSettings(signalInfo.children ?? [], useNetlistId);
          const groupData = Object.assign({}, signalInfo, { children: childrenSettings.signalList });
          settings.push(groupData);
          missingSignals.push(...childrenSettings.missingSignals);
        } else if (signalInfo.dataType && signalInfo.dataType === "signal-separator") {
          settings.push(signalInfo);
        } else if (signalInfo.dataType && signalInfo.dataType === "custom-variable") {
          const result = await this.parseCustomVariableSettings(signalInfo, useNetlistId);
          settings.push(result.signalData);
          if (!result.dataValid) {
            missingSignals.push(...result.missingSignals);
          }
        } else if (signalInfo.dataType === "netlist-variable" || signalInfo.dataType === void 0) {
          const signalData = await this.parseNetlistVariableSettings(signalInfo, useNetlistId);
          if (signalData !== null) {
            settings.push(signalData);
          } else {
            missingSignals.push(signalInfo.name);
          }
        }
      } catch (e) {
        console.error("Error parsing signal list:", e);
      }
    }
    return {
      missingSignals,
      signalList: settings
    };
  }
  async applySessionState(session, stateChangeType, useNetlistId) {
    const signalListSettings = await this.convertSignalListToSettings(session.displayedSignals || [], useNetlistId);
    const documentState = {
      extensionVersion: session.extensionVersion,
      displayedSignals: signalListSettings.signalList,
      markerTime: session.markerTime,
      altMarkerTime: session.altMarkerTime,
      displayTimeUnit: session.displayTimeUnit,
      selectedSignal: session.selectedSignal,
      zoomRatio: session.zoomRatio,
      scrollLeft: session.scrollLeft,
      defaultPixelTime: session.defaultPixelTime,
      autoReload: session.autoReload
    };
    this.webviewPanel?.webview.postMessage({
      command: "apply-state",
      state: documentState,
      stateChangeType
    });
    if (signalListSettings.missingSignals.length > 0) {
      this._providerDelegate.logOutputChannel("Missing signals: " + signalListSettings.missingSignals.join(", "));
    }
  }
  captureStateForUndo() {
    this.undoStack.push(JSON.stringify(this.webviewContext));
    if (this.undoStack.length > 50) {
      this.undoStack.shift();
    }
    this.redoStack = [];
  }
  undo() {
    if (this.undoStack.length === 0) {
      return;
    }
    const lastState = this.undoStack.pop();
    this.redoStack.push(JSON.stringify(this.webviewContext));
    this.applySessionState(JSON.parse(lastState || "{}"), 3 /* Undo */, false);
  }
  redo() {
    if (this.redoStack.length === 0) {
      return;
    }
    const lastState = this.redoStack.pop();
    this.undoStack.push(JSON.stringify(this.webviewContext));
    this.applySessionState(JSON.parse(lastState || "{}"), 4 /* Redo */, false);
  }
  // #region File watching
  setupFileWatcher() {
    if (this.uri.scheme !== "file") {
      return;
    }
    const settings = workspace.getConfiguration("vaporview");
    const pattern = new RelativePattern(path2.dirname(this.uri.fsPath), path2.basename(this.uri.fsPath));
    const watcher = workspace.createFileSystemWatcher(pattern);
    this.webviewContext.autoReload = settings.get("defaultAutoReload") || false;
    const scheduleReload = () => {
      if (this.reloadDebounce) {
        clearTimeout(this.reloadDebounce);
      }
      this.reloadDebounce = setTimeout(() => this.handleUpdateFile(), 500);
      this._fileUpdated = true;
    };
    watcher.onDidChange(scheduleReload, this, this.disposables);
    this.disposables.push(watcher);
    this.fileWatcher = watcher;
  }
  handleUpdateFile() {
    this._providerDelegate.logOutputChannel("File changed: " + this.uri.fsPath);
    if (this.webviewContext.autoReload && this._fileUpdated) {
      this._reloadPending = true;
      if (this.webviewPanel?.active) {
        commands.executeCommand("vaporview.reloadFile", this.uri);
      }
    }
  }
  // #region Netlist helpers
  sortNetlistScopeChildren(netlistItems) {
    const result = [];
    const scopes = netlistItems.filter((item) => item.contextValue === "netlistScope");
    const variables = netlistItems.filter((item) => item.contextValue !== "netlistScope");
    const parameters = variables.filter((item) => item.type === "Parameter");
    const signals = variables.filter((item) => item.type !== "Parameter");
    if (this.sortNetlist) {
      result.push(...scopes.sort((a, b) => a.name.localeCompare(b.name, void 0, { numeric: true })));
      result.push(...parameters.sort((a, b) => a.name.localeCompare(b.name, void 0, { numeric: true })));
      result.push(...signals.sort((a, b) => a.name.localeCompare(b.name, void 0, { numeric: true })));
    } else {
      result.push(...scopes);
      result.push(...parameters);
      result.push(...signals);
    }
    return result;
  }
  setTerminalLinkProvider() {
    const enableTerminalLinks = workspace.getConfiguration("vaporview").get("enableInstancePathTerminalLinks") || false;
    if (!enableTerminalLinks) {
      this.unsetTerminalLinkProvider();
    } else if (!this.terminalLinkDisposable) {
      const scopeTopNames = this.treeData.filter((item) => item.contextValue === "netlistScope").map((item) => item.name);
      const terminalLinkProvider = new NetlistLinkProvider(this._providerDelegate, scopeTopNames);
      this.terminalLinkDisposable = window.registerTerminalLinkProvider(terminalLinkProvider);
    }
  }
  unsetTerminalLinkProvider() {
    if (this.terminalLinkDisposable) {
      this.terminalLinkDisposable.dispose();
      this.terminalLinkDisposable = void 0;
    }
  }
  // #region Public API
  reveal() {
    if (!this.webviewPanel) {
      return;
    }
    this.webviewPanel.reveal(ViewColumn.Active);
  }
  formatTime(time, unit) {
    const timescaleOffset = logScaleFromUnits(this.metadata.timeUnit) - logScaleFromUnits(unit);
    const timeScaleOffsetInverse = logScaleFromUnits(unit) - logScaleFromUnits(this.metadata.timeUnit);
    let timeValue;
    if (timescaleOffset > 0) {
      timeValue = time * this.metadata.timeScale * 10 ** timescaleOffset;
    } else {
      timeValue = time * this.metadata.timeScale / 10 ** timeScaleOffsetInverse;
    }
    const strings = timeValue.toString().split(".");
    strings[0] = strings[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return strings.join(".") + " " + unit;
  }
  async findTreeItem(scopePath, name, msb, lsb) {
    if (!name) {
      return null;
    }
    let pathArray;
    if (scopePath === void 0) {
      pathArray = name.split(".");
    } else {
      pathArray = scopePath.concat(name);
    }
    const module = this.treeData.find((element) => element.label === pathArray[0]);
    if (!module) {
      return null;
    }
    return await module.findChild(pathArray.slice(1), this, msb, lsb);
  }
  getNameFromNetlistId(netlistId) {
    if (netlistId === null) {
      return null;
    }
    const netlistData = this.netlistIdTable[netlistId];
    const msb = netlistData?.msb;
    const lsb = netlistData?.lsb;
    return {
      name: netlistData?.instancePath(),
      msb,
      lsb
    };
  }
  getDisplayedNetlistIds() {
    return this.getNetlistIdsFromDisplayedSignals(this.webviewContext.displayedSignals);
  }
  getNetlistIdsFromDisplayedSignals(displayedSignals) {
    const result = [];
    displayedSignals.forEach((element) => {
      if (element.dataType === "netlist-variable" && element.netlistId !== void 0) {
        result.push(element.netlistId);
      } else if (element.dataType === "signal-group") {
        result.push(...this.getNetlistIdsFromDisplayedSignals(element.children));
      }
    });
    return result;
  }
  isSignalDisplayed(netlistId) {
    if (netlistId === null || netlistId === void 0) {
      return false;
    }
    const displayed = this.getDisplayedNetlistIds();
    return displayed.includes(netlistId);
  }
  async renderSignals(netlistIdList, moveToGroup, index) {
    const signalList = [];
    if (!this.webviewPanel) {
      return;
    }
    const instancePathList = [];
    netlistIdList.forEach((netlistId) => {
      const metadata = this.netlistIdTable[netlistId];
      if (!metadata) {
        return;
      }
      instancePathList.push(metadata.instancePath());
      signalList.push({
        signalId: metadata.signalId,
        signalWidth: metadata.width,
        signalName: metadata.name,
        scopePath: metadata.scopePath,
        netlistId: metadata.netlistId,
        type: metadata.type,
        encoding: metadata.encoding,
        enumType: metadata.enumType,
        msb: metadata.msb,
        lsb: metadata.lsb
      });
    });
    this.webviewPanel.webview.postMessage({
      command: "add-variable",
      signalList,
      groupPath: moveToGroup,
      index
    });
    const eventData = {
      uri: this.uri.toString(),
      instancePath: instancePathList,
      netlistId: netlistIdList,
      source: "webview"
    };
    this._providerDelegate.emitEvent({
      command: "emitEvent",
      eventType: "addVariable",
      eventData
    });
  }
  fetchData(requestList) {
    const signalIdList = [];
    const enumList = [];
    requestList.forEach((entry) => {
      if (entry.type === "signal") {
        signalIdList.push(entry.signalId);
      } else if (entry.type === "enum") {
        enumList.push(entry);
      }
    });
    if (enumList.length > 0) {
      this.getEnumData(enumList);
    }
    if (signalIdList.length === 0) {
      return;
    }
    this.getSignalData(signalIdList);
  }
  revealSignalInWebview(netlistId) {
    if (!this.webviewPanel) {
      return;
    }
    this.webviewPanel.webview.postMessage({
      command: "setSelectedSignal",
      netlistId
    });
  }
  removeSignalFromWebview(netlistId, rowId, removeAllSelected) {
    if (!this.webviewPanel) {
      return;
    }
    this.webviewPanel.webview.postMessage({
      command: "remove-signal",
      netlistId,
      rowId,
      removeAllSelected
    });
  }
  async unloadTreeData() {
    this.treeData = [];
    this._netlistIdTable = [];
    this._providerDelegate.updateViews(this.uri);
  }
  async unloadWebview() {
    this._webviewInitState.setNotInitialized();
    if (!this.webviewPanel) {
      return;
    }
    try {
      this.webviewPanel?.webview.postMessage({ command: "unload" });
    } catch (e) {
    }
  }
  async reload() {
    this.sortNetlist = workspace.getConfiguration("vaporview").get("sortNetlist") || false;
    await this.unload();
    await this.load();
    this._fileUpdated = false;
    this._reloadPending = false;
  }
  // #region Handler delegated methods
  async getScopeChildren(element) {
    const children = await this._handler.getChildren(element);
    const sortedChildren = this.sortNetlistScopeChildren(children);
    if (element !== void 0) {
      element.children = sortedChildren;
    }
    children.forEach((child) => {
      this._netlistIdTable[child.netlistId] = child;
    });
    return sortedChildren;
  }
  async getSignalData(signalIdList) {
    return this._handler.getSignalData(signalIdList);
  }
  async getEnumData(enumNameList) {
    return this._handler.getEnumData(enumNameList);
  }
  async getValuesAtTime(e) {
    const time = e.time ?? this.webviewContext.markerTime ?? 0;
    return this._handler.getValuesAtTime(time, e.instancePaths);
  }
  searchNetlist(searchQuery, scopeId) {
    return this._handler.searchNetlist(searchQuery, scopeId ?? 4294967295);
  }
  async unload() {
    this.metadata.timeTableLoaded = false;
    this.unloadWebview();
    this.unloadTreeData();
    await this._handler.unload();
  }
  dispose() {
    this._webviewInitState.cancel(new Error("Viewer was closed before it finished initializing: " + this.uri.toString()));
    this._handler.dispose();
    this._providerDelegate.updateViews(this.uri);
    this._providerDelegate.removeFromCollection(this.uri, this);
    this.unsetTerminalLinkProvider();
    this.disposables.forEach((disposable) => {
      disposable.dispose();
    });
    this.disposables = [];
  }
};
var NetlistSearchQuickPick = class {
  quickPick;
  document;
  searchInProgress = false;
  pendingQuery;
  searchScopeId;
  searchScopeName = "Top Level";
  searchScopeTextLength = 0;
  constructor() {
    this.quickPick = window.createQuickPick();
    this.quickPick.placeholder = "Search netlist by instance path...";
    this.quickPick.matchOnDetail = true;
    this.quickPick.busy = false;
    this.quickPick.onDidHide(() => {
      this.quickPick.value = "";
    });
    this.quickPick.onDidChangeValue((value) => this.applyFilter(value));
    this.quickPick.onDidAccept(() => this.onAccept());
  }
  show(document, scopeId) {
    this.document = document;
    this.pendingQuery = void 0;
    this.searchInProgress = false;
    this.updateSearchScope(scopeId);
    this.quickPick.placeholder = this.searchScopeName;
    this.quickPick.show();
  }
  updateSearchScope(scopeId) {
    this.searchScopeId = scopeId;
    this.searchScopeTextLength = 0;
    if (!scopeId) {
      this.searchScopeName = "Searching Top Level:";
      return;
    }
    const scope = this.document?.getNameFromNetlistId(scopeId);
    if (!scope) {
      this.searchScopeName = "Searching Unknown Scope:";
      return;
    }
    this.searchScopeName = "Searching " + scope.name + ":";
    this.searchScopeTextLength = scope.name.length;
  }
  async applyFilter(query) {
    if (!this.document) {
      return;
    }
    if (!query) {
      this.quickPick.items = [];
      this.quickPick.title = void 0;
      this.quickPick.busy = false;
      return;
    }
    if (this.searchInProgress) {
      this.pendingQuery = query;
      return;
    }
    this.searchInProgress = true;
    this.quickPick.busy = true;
    const searchResult = await this.document.searchNetlist(query, this.searchScopeId);
    this.searchInProgress = false;
    const totalResults = searchResult.totalResults;
    const displayedResults = searchResult.searchResults.length;
    const resultString = totalResults === 1 ? "result" : "results";
    if (totalResults === 0) {
      this.quickPick.title = `${this.searchScopeName} No results found`;
    } else if (displayedResults !== totalResults) {
      this.quickPick.title = `${this.searchScopeName} Showing ${displayedResults} of ${totalResults} ${resultString}`;
    } else {
      this.quickPick.title = `${this.searchScopeName} ${totalResults} ${resultString}`;
    }
    const elipsis = this.searchScopeTextLength > 0 ? ".." : "";
    this.quickPick.items = searchResult.searchResults.map((result) => {
      const icon = result.isVar ? getVarIcon(result.type) : getScopeIcon(result.type);
      const bitRange = result.isVar ? bitRangeString(result.msb, result.lsb, true) : "";
      const paramValue = result.paramValue ? ": " + parseParamValue(result.paramValue) : "";
      const detail = result.instancePath.slice(this.searchScopeTextLength);
      return {
        label: result.instancePath.slice(result.instancePath.lastIndexOf(".") + 1) + bitRange,
        description: result.type + paramValue,
        detail: elipsis + detail,
        instancePath: result.instancePath,
        isVar: result.isVar,
        msb: result.msb || 0,
        lsb: result.lsb || 0,
        iconPath: icon
      };
    });
    this.quickPick.busy = false;
    if (this.pendingQuery !== void 0) {
      const next = this.pendingQuery;
      this.pendingQuery = void 0;
      if (next !== query) {
        this.applyFilter(next);
      }
    }
  }
  async onAccept() {
    if (!this.document) {
      return;
    }
    const selected = this.quickPick.selectedItems[0];
    if (!selected) {
      return;
    }
    if (selected.isVar) {
      const metadata = await this.document.findTreeItem(void 0, selected.instancePath, selected.msb, selected.lsb);
      if (metadata) {
        this.document.renderSignals([metadata.netlistId], [], void 0);
      }
      this.quickPick.hide();
    } else {
      this.quickPick.value = selected.instancePath + ".";
    }
  }
};

// vaporview/src/extension_core/wasm_handler.ts
init_vscode();
import { promisify } from "util";
import { Worker } from "worker_threads";
import * as fs2 from "fs";

// vaporview/src/wellen_parser/filehandler.ts
var $wcm = __toESM(require_main());
var Types;
((Types2) => {
  let $;
  (($2) => {
    $2.Scopeitem = new $wcm.RecordType([
      ["name", $wcm.wstring],
      ["id", $wcm.wstring],
      ["tpe", $wcm.wstring]
    ]);
  })($ = Types2.$ || (Types2.$ = {}));
})(Types || (Types = {}));
((Types2) => {
  let _;
  ((_2) => {
    _2.id = "vaporview:fileparser/types";
    _2.witName = "types";
    _2.types = /* @__PURE__ */ new Map([
      ["Scopeitem", Types2.$.Scopeitem]
    ]);
  })(_ = Types2._ || (Types2._ = {}));
})(Types || (Types = {}));
var filehandler;
((filehandler2) => {
  let $;
  (($2) => {
    $2.Scopeitem = Types.$.Scopeitem;
    let imports;
    ((imports2) => {
      imports2.log = new $wcm.FunctionType("log", [
        ["msg", $wcm.wstring]
      ], void 0);
      imports2.outputlog = new $wcm.FunctionType("outputlog", [
        ["msg", $wcm.wstring]
      ], void 0);
      imports2.fsreadptr = new $wcm.FunctionType("fsreadptr", [
        ["fd", $wcm.u32],
        ["offset", $wcm.u64],
        ["ptr", $wcm.u32],
        ["length", $wcm.u32]
      ], $wcm.u32);
      imports2.getsize = new $wcm.FunctionType("getsize", [
        ["fd", $wcm.u32]
      ], $wcm.u64);
      imports2.setscopetop = new $wcm.FunctionType("setscopetop", [
        ["name", $wcm.wstring],
        ["id", $wcm.u32],
        ["tpe", $wcm.wstring]
      ], void 0);
      imports2.setvartop = new $wcm.FunctionType("setvartop", [
        ["name", $wcm.wstring],
        ["id", $wcm.u32],
        ["signalid", $wcm.u32],
        ["tpe", $wcm.wstring],
        ["encoding", $wcm.wstring],
        ["width", $wcm.u32],
        ["msb", $wcm.s32],
        ["lsb", $wcm.s32],
        ["enumtype", $wcm.wstring]
      ], void 0);
      imports2.setmetadata = new $wcm.FunctionType("setmetadata", [
        ["scopecount", $wcm.u32],
        ["varcount", $wcm.u32],
        ["timescale", $wcm.u32],
        ["timeunit", $wcm.wstring]
      ], void 0);
      imports2.setchunksize = new $wcm.FunctionType("setchunksize", [
        ["chunksize", $wcm.u64],
        ["timeend", $wcm.u64],
        ["timetablelength", $wcm.u64]
      ], void 0);
      imports2.sendtransitiondatachunk = new $wcm.FunctionType("sendtransitiondatachunk", [
        ["signalid", $wcm.u32],
        ["totalchunks", $wcm.u32],
        ["chunknum", $wcm.u32],
        ["min", $wcm.float64],
        ["max", $wcm.float64],
        ["data", $wcm.wstring]
      ], void 0);
      imports2.sendenumdata = new $wcm.FunctionType("sendenumdata", [
        ["name", $wcm.wstring],
        ["totalchunks", $wcm.u32],
        ["chunknum", $wcm.u32],
        ["data", $wcm.wstring]
      ], void 0);
      imports2.sendcompressedtransitiondata = new $wcm.FunctionType("sendcompressedtransitiondata", [
        ["signalid", $wcm.u32],
        ["signalwidth", $wcm.u32],
        ["totalchunks", $wcm.u32],
        ["chunknum", $wcm.u32],
        ["min", $wcm.float64],
        ["max", $wcm.float64],
        ["compresseddata", new $wcm.Uint8ArrayType()],
        ["originalsize", $wcm.u32]
      ], void 0);
    })(imports = $2.imports || ($2.imports = {}));
    let exports;
    ((exports2) => {
      exports2.loadfile = new $wcm.FunctionType("loadfile", [
        ["size", $wcm.u64],
        ["fd", $wcm.u32],
        ["loadstatic", $wcm.bool],
        ["buffersize", $wcm.u32]
      ], void 0);
      exports2.readbody = new $wcm.FunctionType("readbody", [], void 0);
      exports2.unload = new $wcm.FunctionType("unload", [], void 0);
      exports2.getparametervalues = new $wcm.FunctionType("getparametervalues", [
        ["signalidlist", new $wcm.Uint32ArrayType()]
      ], $wcm.wstring);
      exports2.getchildren = new $wcm.FunctionType("getchildren", [
        ["id", $wcm.u32],
        ["startindex", $wcm.u32]
      ], $wcm.wstring);
      exports2.getsignaldata = new $wcm.FunctionType("getsignaldata", [
        ["signalidlist", new $wcm.Uint32ArrayType()]
      ], void 0);
      exports2.getenumdata = new $wcm.FunctionType("getenumdata", [
        ["netlistidlist", new $wcm.Uint32ArrayType()]
      ], void 0);
      exports2.getvaluesattime = new $wcm.FunctionType("getvaluesattime", [
        ["time", $wcm.u64],
        ["paths", $wcm.wstring]
      ], $wcm.wstring);
      exports2.searchnetlist = new $wcm.FunctionType("searchnetlist", [
        ["searchquery", $wcm.wstring],
        ["scopeid", $wcm.u32]
      ], $wcm.wstring);
      exports2.loadremotestatus = new $wcm.FunctionType("loadremotestatus", [
        ["status", new $wcm.Uint8ArrayType()]
      ], $wcm.wstring);
      exports2.loadremotechunk = new $wcm.FunctionType("loadremotechunk", [
        ["chunkType", $wcm.u32],
        ["chunkData", new $wcm.Uint8ArrayType()],
        ["chunkIndex", $wcm.u32],
        ["totalChunks", $wcm.u32]
      ], void 0);
    })(exports = $2.exports || ($2.exports = {}));
  })($ = filehandler2.$ || (filehandler2.$ = {}));
})(filehandler || (filehandler = {}));
((filehandler2) => {
  let _;
  ((_2) => {
    _2.id = "vaporview:fileparser/filehandler";
    _2.witName = "filehandler";
    let imports;
    ((imports2) => {
      imports2.functions = /* @__PURE__ */ new Map([
        ["log", filehandler2.$.imports.log],
        ["outputlog", filehandler2.$.imports.outputlog],
        ["fsreadptr", filehandler2.$.imports.fsreadptr],
        ["getsize", filehandler2.$.imports.getsize],
        ["setscopetop", filehandler2.$.imports.setscopetop],
        ["setvartop", filehandler2.$.imports.setvartop],
        ["setmetadata", filehandler2.$.imports.setmetadata],
        ["setchunksize", filehandler2.$.imports.setchunksize],
        ["sendtransitiondatachunk", filehandler2.$.imports.sendtransitiondatachunk],
        ["sendenumdata", filehandler2.$.imports.sendenumdata],
        ["sendcompressedtransitiondata", filehandler2.$.imports.sendcompressedtransitiondata]
      ]);
      imports2.interfaces = /* @__PURE__ */ new Map([
        ["Types", Types._]
      ]);
      function create(service, context) {
        return $wcm.$imports.create(_2, service, context);
      }
      imports2.create = create;
      function loop(service, context) {
        return $wcm.$imports.loop(_2, service, context);
      }
      imports2.loop = loop;
    })(imports = _2.imports || (_2.imports = {}));
    let exports;
    ((exports2) => {
      exports2.functions = /* @__PURE__ */ new Map([
        ["loadfile", filehandler2.$.exports.loadfile],
        ["readbody", filehandler2.$.exports.readbody],
        ["unload", filehandler2.$.exports.unload],
        ["getparametervalues", filehandler2.$.exports.getparametervalues],
        ["getchildren", filehandler2.$.exports.getchildren],
        ["getsignaldata", filehandler2.$.exports.getsignaldata],
        ["getenumdata", filehandler2.$.exports.getenumdata],
        ["getvaluesattime", filehandler2.$.exports.getvaluesattime],
        ["searchnetlist", filehandler2.$.exports.searchnetlist],
        ["loadremotestatus", filehandler2.$.exports.loadremotestatus],
        ["loadremotechunk", filehandler2.$.exports.loadremotechunk]
      ]);
      function bind2(exports3, context) {
        return $wcm.$exports.bind(_2, exports3, context);
      }
      exports2.bind = bind2;
    })(exports = _2.exports || (_2.exports = {}));
    function bind(service, code, portOrContext, context) {
      return $wcm.$main.bind(_2, service, code, portOrContext, context);
    }
    _2.bind = bind;
  })(_ = filehandler2._ || (filehandler2._ = {}));
})(filehandler || (filehandler = {}));

// vaporview/src/extension_core/wasm_handler.ts
var nodeFsWrapper = {
  type: "nodeFs",
  loadStatic: false,
  fd: 0,
  fileSize: 0,
  bufferSize: 60 * 1024,
  loadFile: async (uri, fileType) => {
    const open2 = promisify(fs2.open);
    const stats = fs2.statSync(uri.fsPath);
    nodeFsWrapper.fd = await open2(uri.fsPath, "r");
    nodeFsWrapper.fileSize = stats.size;
    const fstMaxStaticLoadSize = workspace.getConfiguration("vaporview").get("fstMaxStaticLoadSize");
    const maxStaticSize = Number(fstMaxStaticLoadSize) * 1048576;
    nodeFsWrapper.loadStatic = stats.size < maxStaticSize;
    if (fileType === "fst" && nodeFsWrapper.loadStatic === false) {
      nodeFsWrapper.bufferSize = 8192;
    }
  },
  readSlice: fs2.readSync,
  close: promisify(fs2.close)
};
var workspaceFsWrapper = {
  type: "workspace",
  loadStatic: true,
  fd: 0,
  fileSize: 0,
  bufferSize: 60 * 1024,
  loadFile: async (uri, fileType) => {
    const stats = await workspace.fs.stat(uri);
    workspaceFsWrapper.fileData = await workspace.fs.readFile(uri);
    workspaceFsWrapper.fileSize = stats.size;
  },
  readSlice: (fd, buffer, offset, length, position) => {
    buffer.set(workspaceFsWrapper.fileData.subarray(position, position + length), offset);
    return length;
  },
  close: (fd) => {
  }
};
var getFsWrapper = async (uri) => {
  if (uri.scheme === "file") {
    try {
      const fileStats = await fs2.promises.stat(uri.fsPath);
      if (fileStats.isFile()) {
        return nodeFsWrapper;
      }
    } catch {
    }
  }
  return workspaceFsWrapper;
};
var WasmFormatHandler = class _WasmFormatHandler {
  providerDelegate;
  uri;
  fileType;
  fileReader;
  wasmWorker;
  wasmModule;
  wasmApi;
  parametersLoaded = false;
  // Top level netlist items
  netlistTop = [];
  netlistSearchable = false;
  postMessageToWebview = (_message) => {
  };
  metadata = {
    timeTableLoaded: false,
    scopeCount: 0,
    netlistIdCount: 0,
    signalIdCount: 0,
    timeTableCount: 0,
    timeEnd: 0,
    minTimeStep: 1,
    timeScale: 1,
    timeUnit: "ns"
  };
  constructor(providerDelegate, uri, fileType, fileReader, wasmWorker, wasmModule) {
    this.providerDelegate = providerDelegate;
    this.uri = uri;
    this.fileType = fileType;
    this.fileReader = fileReader;
    this.wasmWorker = wasmWorker;
    this.wasmModule = wasmModule;
  }
  static async create(providerDelegate, uri, fileType, wasmWorkerFile, wasmModule) {
    const fsWrapper = await getFsWrapper(uri);
    const wasmWorker = new Worker(wasmWorkerFile);
    const handler = new _WasmFormatHandler(providerDelegate, uri, fileType, fsWrapper, wasmWorker, wasmModule);
    await handler.initWasmApi();
    return handler;
  }
  async initWasmApi() {
    this.wasmApi = await filehandler._.bind(this.service, this.wasmModule, this.wasmWorker);
  }
  // WASM service callbacks
  service = {
    log: (msg) => {
      console.log(msg);
    },
    outputlog: (msg) => {
      this.providerDelegate.logOutputChannel(msg);
    },
    // fsreadptr is handled entirely inside worker.ts (Worker-local shim).
    // This stub satisfies the TypeScript interface; it is never dispatched here.
    fsreadptr: (_fd, _offset, _ptr, _length) => {
      return 0;
    },
    getsize: (fd) => {
      return BigInt(this.fileReader.fileSize);
    },
    setscopetop: (name, id, tpe) => {
      const scope = createScope(name, tpe, [], id, -1, this.uri);
      this.netlistTop.push(scope);
    },
    setvartop: (name, id, signalid, tpe, encoding, width, msb, lsb, enumtype) => {
      const varItem = createVar(name, "", tpe, encoding, [], id, signalid, width, msb, lsb, enumtype, false, this.uri);
      this.netlistTop.push(varItem);
    },
    setmetadata: (scopecount, varcount, timescale, timeunit) => {
      this.metadata.scopeCount = scopecount;
      this.metadata.netlistIdCount = varcount;
      this.metadata.timeScale = timescale;
      this.metadata.timeUnit = timeunit;
    },
    setchunksize: (chunksize, timeend, timetablelength) => {
      this.metadata.timeEnd = Number(timeend);
      this.metadata.timeTableCount = Number(timetablelength);
      this.metadata.minTimeStep = Number(chunksize);
      this.metadata.timeTableLoaded = true;
    },
    sendtransitiondatachunk: (signalid, totalchunks, chunknum, min, max, transitionData) => {
      this.postMessageToWebview({
        command: "update-waveform-chunk",
        signalId: signalid,
        transitionDataChunk: transitionData,
        totalChunks: totalchunks,
        chunkNum: chunknum,
        min,
        max
      });
    },
    sendenumdata: (name, totalchunks, chunknum, data) => {
      this.postMessageToWebview({
        command: "update-enum-chunk",
        enumName: name,
        enumDataChunk: data,
        totalChunks: totalchunks,
        chunkNum: chunknum
      });
    },
    sendcompressedtransitiondata: (signalid, signalwidth, totalchunks, chunknum, min, max, compresseddata, originalsize) => {
      this.postMessageToWebview({
        command: "update-waveform-chunk-compressed",
        signalId: signalid,
        signalWidth: signalwidth,
        compressedDataChunk: Array.from(compresseddata),
        totalChunks: totalchunks,
        chunkNum: chunknum,
        min,
        max,
        originalSize: originalsize
      });
    }
  };
  async loadNetlist() {
    this.providerDelegate.logOutputChannel("Using " + this.fileReader.type + " - Loading " + this.fileType + " file: " + this.uri.fsPath);
    await this.fileReader.loadFile(this.uri, this.fileType);
    if (this.fileReader.type === "nodeFs") {
      this.wasmWorker.postMessage({ type: "setup-file", fd: this.fileReader.fd });
    } else {
      const buf = this.fileReader.fileData.buffer;
      this.wasmWorker.postMessage({ type: "setup-file", fd: 0, data: buf }, [buf]);
    }
    if (this.fileType === "fst" && this.fileReader.loadStatic === false) {
      const fstMaxStaticLoadSize = workspace.getConfiguration("vaporview").get("fstMaxStaticLoadSize");
      this.providerDelegate.logOutputChannel(
        this.uri.fsPath + " is larger than the max static load size of " + fstMaxStaticLoadSize + " MB. File will be loaded dynamically. Configure max load size in the settings menu"
      );
    }
    await window.withProgress({
      location: ProgressLocation.Notification,
      title: "Parsing Netlist for " + this.uri.fsPath,
      cancellable: false
    }, async () => {
      await this.wasmApi.loadfile(BigInt(this.fileReader.fileSize), this.fileReader.fd, this.fileReader.loadStatic, this.fileReader.bufferSize);
    });
    this.netlistSearchable = true;
  }
  async loadBody() {
    if (this.fileType === "vcd") {
      await window.withProgress({
        location: ProgressLocation.Notification,
        title: "Parsing Waveforms for " + this.uri.fsPath,
        cancellable: false
      }, async () => {
        await this.wasmApi.readbody();
      });
    } else {
      await this.wasmApi.readbody();
    }
    if (this.fileType !== "fst") {
      this.loadTopLevelParameters();
    }
  }
  getParametersInTreeData(treeData) {
    const result = [];
    treeData.forEach((item) => {
      if (item.type === "Parameter") {
        result.push(item);
      }
      if (item.children.length > 0) {
        result.push(...this.getParametersInTreeData(item.children));
      }
    });
    return result;
  }
  async loadTopLevelParameters() {
    if (!this.wasmApi) {
      return;
    }
    if (this.parametersLoaded) {
      return;
    }
    const parameterItems = this.getParametersInTreeData(this.netlistTop);
    const signalIdList = parameterItems.map((param) => param.signalId);
    const params = await this.wasmApi.getparametervalues(new Uint32Array(signalIdList));
    const parameterValues = JSON.parse(params);
    parameterItems.forEach((param) => {
      const paramValue = parameterValues.find((entry) => entry[0] === param.signalId);
      if (paramValue) {
        param.setParamAndTooltip(paramValue[1]);
      }
    });
    this.providerDelegate.updateViews(this.uri);
    this.parametersLoaded = true;
  }
  async getChildren(element) {
    if (!element) {
      return this.netlistTop;
    }
    if (!this.wasmApi) {
      return [];
    }
    if (element.children.length > 0) {
      return element.children;
    }
    const scopePath = element.scopePath.concat([element.name]);
    let itemsRemaining = Infinity;
    let startIndex = 0;
    let callLimit = 255;
    const result = [];
    while (itemsRemaining > 0) {
      const children = await this.wasmApi.getchildren(element.netlistId, startIndex);
      const childItems = JSON.parse(children);
      itemsRemaining = childItems.remainingItems;
      startIndex += childItems.totalReturned;
      const scopes = childItems.scopes?.map((child) => {
        return createScope(child.name, child.type, scopePath, child.id, -1, this.uri);
      }) || [];
      const vars = childItems.vars?.map((child) => {
        return createVar(child.name, child.paramValue, child.type, child.encoding.split("(")[0], scopePath, child.netlistId, child.signalId, child.width, child.msb, child.lsb, child.enumType, false, this.uri);
      }) || [];
      result.push(...scopes);
      result.push(...vars);
      callLimit--;
      if (callLimit <= 0) {
        break;
      }
    }
    return result;
  }
  async getSignalData(signalIdList) {
    this.wasmApi.getsignaldata(new Uint32Array(signalIdList));
    this.loadTopLevelParameters();
  }
  async getEnumData(enumList) {
    const netlistIdList = enumList.map((entry) => entry.netlistId);
    this.wasmApi.getenumdata(new Uint32Array(netlistIdList));
  }
  async getValuesAtTime(time, instancePaths) {
    const result = await this.wasmApi.getvaluesattime(BigInt(time), instancePaths.join(" "));
    return JSON.parse(result);
  }
  async searchNetlist(searchString, scopeId) {
    const resultJson = await this.wasmApi.searchnetlist(searchString, scopeId);
    try {
      return JSON.parse(resultJson);
    } catch {
      return { totalResults: 0, searchResults: [] };
    }
  }
  async unload() {
    this.fileReader.close(this.fileReader.fd);
    if (this.wasmApi) {
      await this.wasmApi.unload();
    }
    this.parametersLoaded = false;
    this.netlistTop = [];
  }
  dispose() {
    this.unload();
    this.wasmWorker.terminate();
  }
};

// vaporview/src/extension_core/fsdb_handler.ts
init_vscode();
import { fork } from "child_process";
import * as path3 from "path";
var FsdbFormatHandler = class {
  providerDelegate;
  uri;
  fsdbWorker = void 0;
  // Vars collected for the in-flight readVars call (avoids races on children.push).
  fsdbVarsBuffer = [];
  // Nest STRUCT/RECORD/array children while reading vars for a scope.
  fsdbChildrenStack = [];
  fsdbStructNameStack = [];
  // Need a reference to findTreeItem for getValuesAtTime
  findTreeItemFn;
  // Top level netlist items
  netlistSearchable = false;
  netlistTop = [];
  parametersLoaded = false;
  // VS Code may call getChildren concurrently while expanding; coalesce loads
  // per element and serialize them globally, since the readVars callback state
  // (fsdbVarsBuffer/fsdbChildrenStack) is shared across the whole handler.
  childrenLoadInFlight = /* @__PURE__ */ new Map();
  childrenLoadChain = Promise.resolve();
  postMessageToWebview = (_message) => {
  };
  metadata = {
    timeTableLoaded: false,
    scopeCount: 0,
    netlistIdCount: 0,
    signalIdCount: 0,
    timeTableCount: 0,
    timeEnd: 0,
    minTimeStep: 1,
    timeScale: 1,
    timeUnit: "ns"
  };
  constructor(providerDelegate, uri, findTreeItemFn) {
    this.providerDelegate = providerDelegate;
    this.uri = uri;
    this.findTreeItemFn = findTreeItemFn;
  }
  async loadNetlist() {
    if (process.platform !== "linux") {
      window.showErrorMessage("FSDB support is currently available on Linux only.");
      return;
    }
    const fsdbReaderLibsPath = workspace.getConfiguration("vaporview").get("fsdbReaderLibsPath");
    this.fsdbWorker = fork(path3.resolve(__dirname, "fsdb_worker.js"), {
      env: {
        ...process.env,
        LD_LIBRARY_PATH: `${process.env.LD_LIBRARY_PATH ? process.env.LD_LIBRARY_PATH + ":" : ""}${fsdbReaderLibsPath}`
      }
    });
    this.fsdbWorker.setMaxListeners(50);
    this.setupFsdbWorkerListeners();
    await this.callFsdbWorkerTask({
      command: "openFsdb",
      fsdbPath: this.uri.fsPath
    });
    await window.withProgress({
      location: ProgressLocation.Notification,
      title: "Reading Scopes for " + this.uri.fsPath,
      cancellable: false
    }, async () => {
      const response = await this.callFsdbWorkerTask({
        command: "readScopes"
      });
      const topScopes = response.result ?? [];
      this.netlistTop = topScopes.map(
        (scope) => createScope(scope.name, scope.type, [], scope.netlistId, scope.scopeOffsetIdx, this.uri)
      );
    });
    await window.withProgress({
      location: ProgressLocation.Notification,
      title: "Reading Metadata for " + this.uri.fsPath,
      cancellable: false
    }, async () => {
      await this.callFsdbWorkerTask({
        command: "readMetadata"
      });
    });
  }
  async loadBody() {
    return;
  }
  setupFsdbWorkerListeners() {
    if (!this.fsdbWorker) return;
    this.fsdbWorker.on("online", () => {
      console.log("FSDB worker is online.");
    });
    this.fsdbWorker.on("error", (err) => {
      console.error("FSDB worker error:", err);
    });
    this.fsdbWorker.on("exit", (code, signal) => {
      if (code !== 0) {
        console.error(`Child process exited with error code ${code} (signal: ${signal})`);
      }
    });
    this.fsdbWorker.on("message", (msg) => {
      if ("command" in msg) {
        this.handleMessage(msg);
      }
    });
  }
  handleMessage(message2) {
    switch (message2.command) {
      case "require-failed": {
        const errorCode = message2.error?.code ?? "unknown";
        window.showErrorMessage("Failed to load FSDB reader, is vaporview.fsdbReaderLibsPath properly set? (" + errorCode + ")");
        break;
      }
      case "setMetadata": {
        this.metadata.scopeCount = message2.scopecount;
        this.metadata.netlistIdCount = message2.varcount;
        this.metadata.timeScale = message2.timescale;
        this.metadata.timeUnit = message2.timeunit;
        break;
      }
      case "setChunkSize": {
        this.metadata.timeEnd = Number(message2.timeend);
        this.metadata.timeTableCount = Number(message2.timetablelength);
        this.metadata.timeTableLoaded = true;
        break;
      }
      case "fsdb-var-callback": {
        this.fsdbVarCallback(
          message2.name,
          message2.type,
          message2.encoding,
          message2.path,
          message2.netlistId,
          message2.signalId,
          message2.width,
          message2.msb,
          message2.lsb
        );
        break;
      }
      case "fsdb-array-begin-callback": {
        this.fsdbArrayBeginCallback(message2.name, message2.path, message2.netlistId);
        break;
      }
      case "fsdb-array-end-callback": {
        this.fsdbArrayEndCallback(message2.size);
        break;
      }
      case "fsdb-struct-begin-callback": {
        this.fsdbStructBeginCallback(message2.name, message2.type, message2.path, message2.netlistId);
        break;
      }
      case "fsdb-struct-end-callback": {
        this.fsdbStructEndCallback();
        break;
      }
    }
  }
  callFsdbWorkerTask(message2) {
    if (this.fsdbWorker === void 0) return Promise.resolve({ id: "" });
    return new Promise((resolve2, reject) => {
      const id = Math.random().toString(36).substring(2, 9);
      const ipcMessage = { ...message2, id };
      const responseHandler = (msg) => {
        if ("id" in msg && msg.id === id) {
          this.fsdbWorker.off("message", responseHandler);
          if (msg.error) {
            console.log(msg.error);
            return reject(new Error(String(msg.error)));
          }
          resolve2(msg);
        }
      };
      this.fsdbWorker.on("message", responseHandler);
      this.fsdbWorker.send(ipcMessage);
    });
  }
  async fsdbReadVars(element) {
    if (!element) return;
    this.fsdbVarsBuffer = [];
    this.fsdbChildrenStack = [this.fsdbVarsBuffer];
    this.fsdbStructNameStack = [];
    let scopePath = "";
    if (element.scopePath.length !== 0) {
      scopePath += element.scopePath.join(".") + ".";
    }
    scopePath += element.name;
    await this.callFsdbWorkerTask({
      command: "readVars",
      scopePath,
      scopeOffsetIdx: element.scopeOffsetIdx
    });
    element.children = element.children.concat(this.fsdbVarsBuffer);
    this.fsdbVarsBuffer = [];
    this.fsdbChildrenStack = [];
    this.fsdbStructNameStack = [];
  }
  fsdbCurrentChildren() {
    return this.fsdbChildrenStack[this.fsdbChildrenStack.length - 1];
  }
  async fsdbReadChildScopes(element) {
    if (element.scopeOffsetIdx < 0) {
      return [];
    }
    const scopePath = element.scopePath.concat([element.name]);
    const result = [];
    let itemsRemaining = Infinity;
    let startIndex = 0;
    let callLimit = 255;
    while (itemsRemaining > 0) {
      const response = await this.callFsdbWorkerTask({
        command: "getScopeChildren",
        scopeOffsetIdx: element.scopeOffsetIdx,
        startIndex
      });
      const childItems = response.result ?? {
        scopes: [],
        totalReturned: 0,
        remainingItems: 0
      };
      itemsRemaining = childItems.remainingItems;
      startIndex += childItems.totalReturned;
      for (const child of childItems.scopes) {
        result.push(createScope(child.name, child.type, scopePath, child.netlistId, child.scopeOffsetIdx, this.uri));
      }
      callLimit--;
      if (callLimit <= 0) {
        break;
      }
    }
    return result;
  }
  // Group same-named bit selects under a bus parent (matches surfer/wasm netlist UX).
  mergeDuplicateFsdbVars(children) {
    const scopes = [];
    const varTable = {};
    const seenVars = /* @__PURE__ */ new Set();
    for (const child of children) {
      if (child.contextValue === "netlistScope") {
        scopes.push(child);
        continue;
      }
      const varKey = child.signalId + ":" + child.label;
      if (seenVars.has(varKey)) {
        continue;
      }
      seenVars.add(varKey);
      const key = child.name;
      if (varTable[key] === void 0) {
        varTable[key] = [child];
      } else {
        varTable[key].push(child);
      }
    }
    const result = [...scopes];
    for (const vars of Object.values(varTable)) {
      if (vars.length === 1) {
        result.push(vars[0]);
        continue;
      }
      const bitList = [];
      const busList = [];
      let parent;
      let maxWidth = 0;
      for (const varItem of vars) {
        if (varItem.width === 1) {
          bitList.push(varItem);
        } else {
          busList.push(varItem);
        }
      }
      for (const busItem of busList) {
        if (busItem.width > maxWidth) {
          maxWidth = busItem.width;
          parent = busItem;
        }
        result.push(busItem);
      }
      if (parent !== void 0) {
        parent.children = bitList;
        parent.collapsibleState = TreeItemCollapsibleState.Collapsed;
        parent.fsdbVarLoaded = true;
      } else {
        result.push(...bitList);
      }
    }
    return result;
  }
  async loadScopeChildren(element) {
    const childScopes = await this.fsdbReadChildScopes(element);
    element.children = childScopes;
    await this.fsdbReadVars(element);
    element.children = this.mergeDuplicateFsdbVars(element.children);
    element.fsdbVarLoaded = true;
    return element.children;
  }
  async getChildren(element) {
    if (!element) {
      return this.netlistTop;
    }
    if (element.fsdbVarLoaded) {
      return element.children;
    }
    const inFlight = this.childrenLoadInFlight.get(element);
    if (inFlight) {
      return inFlight;
    }
    const loadPromise = this.childrenLoadChain.then(() => this.loadScopeChildren(element)).finally(() => {
      this.childrenLoadInFlight.delete(element);
    });
    this.childrenLoadChain = loadPromise.catch(() => {
    });
    this.childrenLoadInFlight.set(element, loadPromise);
    return loadPromise;
  }
  async getSignalData(signalIdList) {
    await window.withProgress({
      location: ProgressLocation.Notification,
      title: "Loading signals",
      cancellable: false
    }, async () => {
      await this.callFsdbWorkerTask({
        command: "loadSignals",
        signalIdList
      });
    });
    const tasks2 = signalIdList.map(async (signalId) => {
      const result = await this.callFsdbWorkerTask({
        command: "getValueChanges",
        signalId
      });
      const message2 = result;
      const data = message2.result;
      this.postMessageToWebview({
        command: "update-waveform-chunk",
        signalId,
        transitionDataChunk: data.valueChanges,
        totalChunks: 1,
        chunkNum: 0,
        min: data.min,
        max: data.max
      });
    });
    await Promise.all(tasks2);
  }
  async getEnumData(enumList) {
    return;
  }
  async getValuesAtTime(time, instancePaths) {
    const instancePath2signalId = /* @__PURE__ */ new Map();
    const signalId2values = /* @__PURE__ */ new Map();
    for (const instancePath of instancePaths) {
      const netlistItem = await this.findTreeItemFn(void 0, instancePath, void 0, void 0);
      if (netlistItem) {
        instancePath2signalId.set(instancePath, netlistItem.signalId);
        signalId2values.set(netlistItem.signalId, []);
      }
    }
    if (signalId2values.size === 0) {
      return [];
    }
    const signalIdList = Array.from(signalId2values.keys());
    await this.callFsdbWorkerTask({
      command: "loadSignals",
      signalIdList
    });
    await Promise.all(signalIdList.map(async (signalId) => {
      const result2 = await this.callFsdbWorkerTask({
        command: "getValuesAtTime",
        signalId,
        time
      });
      const message2 = result2;
      signalId2values.set(signalId, message2.result ?? "");
    }));
    const result = [];
    for (const [instancePath, signalId] of instancePath2signalId.entries()) {
      const values = signalId2values.get(signalId);
      if (values !== void 0) {
        result.push({
          instancePath,
          value: values
        });
      }
    }
    return result;
  }
  async unload() {
    await this.callFsdbWorkerTask({ command: "unload" });
    if (this.fsdbWorker !== void 0) {
      this.fsdbWorker.disconnect();
      this.fsdbWorker = void 0;
    }
    this.parametersLoaded = false;
    this.netlistTop = [];
    this.childrenLoadInFlight.clear();
    this.childrenLoadChain = Promise.resolve();
    this.fsdbVarsBuffer = [];
    this.fsdbChildrenStack = [];
    this.fsdbStructNameStack = [];
  }
  dispose() {
    this.unload();
  }
  // FSDB callback methods
  fsdbPathToScopePath(path6) {
    return path6.length === 0 ? [] : path6.split(".");
  }
  fsdbGroupScopePath(path6) {
    return this.fsdbPathToScopePath(path6).concat(this.fsdbStructNameStack);
  }
  fsdbVarCallback(name, type, encoding, path6, netlistId, signalId, width, msb, lsb) {
    const enumType = "";
    const paramValue = "";
    const scopePath = this.fsdbGroupScopePath(path6);
    const varItem = createVar(name, paramValue, type, encoding, scopePath, netlistId, signalId, width, msb, lsb, enumType, true, this.uri);
    this.fsdbCurrentChildren().push(varItem);
  }
  fsdbArrayBeginCallback(name, path6, netlistId) {
    const scopePath = this.fsdbGroupScopePath(path6);
    const arrayScope = createScope(name, "vhdlarray", scopePath, netlistId, -1, this.uri);
    this.fsdbCurrentChildren().push(arrayScope);
    this.fsdbChildrenStack.push(arrayScope.children);
    this.fsdbStructNameStack.push(name);
  }
  fsdbArrayEndCallback(_size) {
    this.fsdbChildrenStack.pop();
    this.fsdbStructNameStack.pop();
    const parentChildren = this.fsdbCurrentChildren();
    const arrayScope = parentChildren[parentChildren.length - 1];
    if (arrayScope) {
      arrayScope.fsdbVarLoaded = true;
    }
  }
  fsdbStructBeginCallback(name, type, path6, netlistId) {
    const scopePath = this.fsdbGroupScopePath(path6);
    const structScope = createScope(name, type, scopePath, netlistId, -1, this.uri);
    this.fsdbCurrentChildren().push(structScope);
    this.fsdbChildrenStack.push(structScope.children);
    this.fsdbStructNameStack.push(name);
  }
  fsdbStructEndCallback() {
    this.fsdbChildrenStack.pop();
    this.fsdbStructNameStack.pop();
    const parentChildren = this.fsdbCurrentChildren();
    const structScope = parentChildren[parentChildren.length - 1];
    if (structScope) {
      structScope.fsdbVarLoaded = true;
    }
  }
  // TODO: @heyfey - implement netlist search
  searchNetlist(searchString) {
    return Promise.resolve({ totalResults: 0, searchResults: [] });
  }
};

// vaporview/src/extension_core/surfer_handler.ts
init_vscode();
import { Worker as Worker2 } from "worker_threads";
var SurferFormatHandler = class _SurferFormatHandler {
  providerDelegate;
  uri;
  serverUrl;
  bearerToken;
  wasmWorker;
  wasmModule;
  wasmApi;
  // Top level netlist items
  netlistTop = [];
  netlistSearchable = false;
  parametersLoaded = false;
  postMessageToWebview = (_message) => {
  };
  metadata = {
    timeTableLoaded: false,
    scopeCount: 0,
    netlistIdCount: 0,
    signalIdCount: 0,
    timeTableCount: 0,
    timeEnd: 0,
    minTimeStep: 1,
    timeScale: 1,
    timeUnit: "ns"
  };
  constructor(providerDelegate, uri, serverUrl, wasmWorker, wasmModule, bearerToken) {
    this.providerDelegate = providerDelegate;
    this.uri = uri;
    this.serverUrl = serverUrl;
    this.wasmWorker = wasmWorker;
    this.wasmModule = wasmModule;
    this.bearerToken = bearerToken;
  }
  static async create(providerDelegate, uri, serverUrl, wasmWorkerFile, wasmModule, bearerToken) {
    const wasmWorker = new Worker2(wasmWorkerFile);
    const handler = new _SurferFormatHandler(providerDelegate, uri, serverUrl, wasmWorker, wasmModule, bearerToken);
    await handler.initWasmApi();
    return handler;
  }
  async initWasmApi() {
    this.wasmApi = await filehandler._.bind(this.service, this.wasmModule, this.wasmWorker);
  }
  // WASM service callbacks
  service = {
    log: (msg) => {
      console.log(msg);
    },
    outputlog: (msg) => {
      this.providerDelegate.logOutputChannel(msg);
    },
    fsreadptr: (_fd, _offset, _ptr, _length) => {
      return 0;
    },
    getsize: (fd) => {
      return BigInt(0);
    },
    setscopetop: (name, id, tpe) => {
      const scope = createScope(name, tpe, [], id, -1, this.uri);
      this.netlistTop.push(scope);
    },
    setvartop: (name, id, signalid, tpe, encoding, width, msb, lsb, enumtype) => {
      const varItem = createVar(name, "", tpe, encoding, [], id, signalid, width, msb, lsb, enumtype, false, this.uri);
      this.netlistTop.push(varItem);
    },
    setmetadata: (scopecount, varcount, timescale, timeunit) => {
      this.metadata.scopeCount = scopecount;
      this.metadata.netlistIdCount = varcount;
      this.metadata.timeScale = timescale;
      this.metadata.timeUnit = timeunit;
    },
    setchunksize: (chunksize, timeend, timetablelength) => {
      this.metadata.timeEnd = Number(timeend);
      this.metadata.timeTableCount = Number(timetablelength);
      this.metadata.minTimeStep = Number(chunksize);
      this.metadata.timeTableLoaded = true;
    },
    sendtransitiondatachunk: (signalid, totalchunks, chunknum, min, max, transitionData) => {
      this.postMessageToWebview({
        command: "update-waveform-chunk",
        signalId: signalid,
        transitionDataChunk: transitionData,
        totalChunks: totalchunks,
        chunkNum: chunknum,
        min,
        max
      });
    },
    sendenumdata: (name, totalchunks, chunknum, data) => {
      this.postMessageToWebview({
        command: "update-enum-chunk",
        enumName: name,
        enumDataChunk: data,
        totalChunks: totalchunks,
        chunkNum: chunknum
      });
    },
    sendcompressedtransitiondata: (signalid, signalwidth, totalchunks, chunknum, min, max, compresseddata, originalsize) => {
      this.postMessageToWebview({
        command: "update-waveform-chunk-compressed",
        signalId: signalid,
        signalWidth: signalwidth,
        compressedDataChunk: Array.from(compresseddata),
        totalChunks: totalchunks,
        chunkNum: chunknum,
        min,
        max,
        originalSize: originalsize
      });
    }
  };
  async _load() {
    this.providerDelegate.logOutputChannel("Connecting to remote server: " + this.serverUrl);
    await window.withProgress({
      location: ProgressLocation.Notification,
      title: "Connecting to remote server " + this.serverUrl,
      cancellable: false
    }, async () => {
      try {
        await loadRemoteHierarchy(this.serverUrl, this.wasmApi, this.bearerToken);
        await loadRemoteTimeTable(this.serverUrl, this.wasmApi, this.bearerToken);
      } catch (error) {
        this.providerDelegate.logOutputChannel("Failed to connect to remote server: " + error);
        throw error;
      }
    });
    this.loadTopLevelParameters();
  }
  async loadNetlist() {
    this.providerDelegate.logOutputChannel("Connecting to remote server: " + this.serverUrl);
    await window.withProgress({
      location: ProgressLocation.Notification,
      title: "Connecting to remote server " + this.serverUrl,
      cancellable: false
    }, async () => {
      try {
        await loadRemoteHierarchy(this.serverUrl, this.wasmApi, this.bearerToken);
      } catch (error) {
        this.providerDelegate.logOutputChannel("Failed to connect to remote server: " + error);
        throw error;
      }
    });
    this.netlistSearchable = true;
  }
  async loadBody() {
    try {
      await loadRemoteTimeTable(this.serverUrl, this.wasmApi, this.bearerToken);
    } catch (error) {
      this.providerDelegate.logOutputChannel("Failed to connect to remote server: " + error);
      throw error;
    }
    this.loadTopLevelParameters();
  }
  getParametersInTreeData(treeData) {
    const result = [];
    treeData.forEach((item) => {
      if (item.type === "Parameter") {
        result.push(item);
      }
      if (item.children.length > 0) {
        result.push(...this.getParametersInTreeData(item.children));
      }
    });
    return result;
  }
  async loadTopLevelParameters() {
    if (!this.wasmApi) {
      return;
    }
    if (this.parametersLoaded) {
      return;
    }
    const parameterItems = this.getParametersInTreeData(this.netlistTop);
    const signalIdList = parameterItems.map((param) => param.signalId);
    const params = await this.wasmApi.getparametervalues(new Uint32Array(signalIdList));
    const parameterValues = JSON.parse(params);
    parameterItems.forEach((param) => {
      const paramValue = parameterValues.find((entry) => entry[0] === param.signalId);
      if (paramValue) {
        param.setParamAndTooltip(paramValue[1]);
      }
    });
    this.parametersLoaded = true;
  }
  async getChildren(element) {
    if (!element) {
      return this.netlistTop;
    }
    if (!this.wasmApi) {
      return [];
    }
    if (element.children.length > 0) {
      return element.children;
    }
    const scopePath = element.scopePath.concat([element.name]);
    let itemsRemaining = Infinity;
    let startIndex = 0;
    const result = [];
    let callLimit = 255;
    const varTable = {};
    while (itemsRemaining > 0) {
      const children = await this.wasmApi.getchildren(element.netlistId, startIndex);
      const childItems = JSON.parse(children);
      itemsRemaining = childItems.remainingItems;
      startIndex += childItems.totalReturned;
      childItems.scopes.forEach((child) => {
        result.push(createScope(child.name, child.type, scopePath, child.id, -1, this.uri));
      });
      childItems.vars.forEach((child) => {
        const encoding = child.encoding.split("(")[0];
        const varItem = createVar(child.name, child.paramValue, child.type, encoding, scopePath, child.netlistId, child.signalId, child.width, child.msb, child.lsb, child.enumType, false, this.uri);
        if (varTable[child.name] === void 0) {
          varTable[child.name] = [varItem];
        } else {
          varTable[child.name].push(varItem);
        }
      });
      callLimit--;
      if (callLimit <= 0) {
        break;
      }
    }
    for (const [_key, value] of Object.entries(varTable)) {
      if (value.length === 1) {
        result.push(value[0]);
      } else {
        const varList = value;
        const bitList = [];
        const busList = [];
        let maxWidth = 0;
        let parent;
        varList.forEach((varItem) => {
          if (varItem.width === 1) {
            bitList.push(varItem);
          } else {
            busList.push(varItem);
          }
        });
        busList.forEach((busItem) => {
          if (busItem.width > maxWidth) {
            maxWidth = busItem.width;
            parent = busItem;
          }
          result.push(busItem);
        });
        if (parent !== void 0) {
          parent.children = bitList;
          parent.collapsibleState = TreeItemCollapsibleState.Collapsed;
        } else {
          result.push(...bitList);
        }
      }
    }
    return result;
  }
  async getSignalData(signalIdList) {
    try {
      await loadRemoteSignals(this.serverUrl, this.wasmApi, this.bearerToken, signalIdList);
    } catch (error) {
      this.providerDelegate.logOutputChannel("Failed to get signal data from remote server: " + error);
      signalIdList.forEach((signalId) => {
        this.postMessageToWebview({
          command: "update-waveform-chunk",
          signalId,
          transitionDataChunk: "[]",
          totalChunks: 1,
          chunkNum: 0,
          min: 0,
          max: 1
        });
      });
    }
  }
  async getEnumData(enumList) {
    const netlistIdList = enumList.map((entry) => entry.netlistId);
    this.wasmApi.getenumdata(new Uint32Array(netlistIdList));
  }
  async getValuesAtTime(time, instancePaths) {
    if (!this.wasmApi) {
      return [];
    }
    try {
      const result = await this.wasmApi.getvaluesattime(BigInt(time), instancePaths.join(" "));
      return JSON.parse(result);
    } catch (error) {
      this.providerDelegate.logOutputChannel("Failed to get values at time from remote server: " + error);
      return [];
    }
  }
  async searchNetlist(searchString, scopeId) {
    const resultJson = await this.wasmApi.searchnetlist(searchString, scopeId);
    try {
      return JSON.parse(resultJson);
    } catch {
      return { totalResults: 0, searchResults: [] };
    }
  }
  async unload() {
    if (this.wasmApi) {
      await this.wasmApi.unload();
    }
    this.parametersLoaded = false;
    this.netlistTop = [];
  }
  dispose() {
    this.unload();
    this.wasmWorker.terminate();
  }
};
var CHUNK_SIZE = 1024 * 32;
async function sendDataInChunks(data, sendChunkFn) {
  const totalChunks = Math.ceil(data.length / CHUNK_SIZE);
  for (let i = 0; i < totalChunks; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, data.length);
    const chunk = data.slice(start, end);
    sendChunkFn(chunk, i, totalChunks);
  }
}
async function httpFetch(server, path6, bearerToken) {
  const headers = {};
  if (bearerToken) {
    headers["Authorization"] = `Bearer ${bearerToken}`;
  }
  const response = await fetch(`${server}/${path6}`, { headers });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response;
}
async function loadRemoteHierarchy(server, wasmApi, bearerToken) {
  const hierarchy = await httpFetch(server, "get_hierarchy", bearerToken);
  const hierarchyBytes = await hierarchy.arrayBuffer();
  const hierarchyUint8Array = new Uint8Array(hierarchyBytes);
  await sendDataInChunks(hierarchyUint8Array, (chunk, chunkIndex, totalChunks) => {
    wasmApi.loadremotechunk(0 /* Hierarchy */, chunk, chunkIndex, totalChunks);
  });
}
async function loadRemoteTimeTable(server, wasmApi, bearerToken) {
  const timeTable = await httpFetch(server, "get_time_table", bearerToken);
  const timeTableBytes = await timeTable.arrayBuffer();
  const timeTableUint8Array = new Uint8Array(timeTableBytes);
  await sendDataInChunks(timeTableUint8Array, (chunk, chunkIndex, totalChunks) => {
    wasmApi.loadremotechunk(1 /* TimeTable */, chunk, chunkIndex, totalChunks);
  });
}
async function loadRemoteSignals(server, wasmApi, bearerToken, signalIds) {
  let path6 = "get_signals";
  if (signalIds && signalIds.length > 0) {
    path6 += "/" + signalIds.join("/");
  }
  const signals = await httpFetch(server, path6, bearerToken);
  const signalsBytes = await signals.arrayBuffer();
  const signalsUint8Array = new Uint8Array(signalsBytes);
  await sendDataInChunks(signalsUint8Array, (chunk, chunkIndex, totalChunks) => {
    wasmApi.loadremotechunk(2 /* Signals */, chunk, chunkIndex, totalChunks);
  });
}

// vaporview/src/extension_core/viewer_provider.ts
import path4 from "path";
import { dirname as dirname3 } from "path";
var { getUserTheme } = require_dist();
var VaporviewDocumentBackup = class {
  constructor(id) {
    this.id = id;
  }
  delete() {
    return;
  }
};
var VaporviewDocumentCollection = class {
  constructor(log) {
    this.log = log;
    this.getTokenColorsForTheme();
  }
  _documents = {};
  _numDocuments = 0;
  get numDocuments() {
    return this._numDocuments;
  }
  // Color palette
  colorPalette = [];
  errorColorPalette = [];
  themeValid = false;
  randomString() {
    return Math.random().toString(36).substring(2, 15);
  }
  createUniqueDocumentId() {
    let documentId = this.randomString();
    while (this._documents[documentId]) {
      documentId = this.randomString();
    }
    return documentId;
  }
  add(documentId, document) {
    this._documents[documentId] = document;
    this._numDocuments++;
    commands.executeCommand("setContext", "vaporview.documentCount", this._numDocuments);
  }
  get(documentId) {
    return this._documents[documentId];
  }
  remove(documentId) {
    delete this._documents[documentId];
    this._numDocuments--;
    commands.executeCommand("setContext", "vaporview.documentCount", this._numDocuments);
  }
  getDocumentFromUri(uri) {
    for (const documentId in this._documents) {
      if (this._documents[documentId].uri.toString() === uri) {
        return this._documents[documentId];
      }
    }
    return void 0;
  }
  getAllDocuments() {
    return Object.keys(this._documents).map((documentId) => {
      return {
        documentId,
        uri: this._documents[documentId].uri
      };
    });
  }
  broadcast(callback) {
    for (const documentId in this._documents) {
      const document = this._documents[documentId];
      if (document) {
        callback(document);
      }
    }
  }
  updateConfiguration(_e) {
    this.broadcast((document) => {
      document.setConfigurationSettings();
    });
  }
  // Build a color palette from the current theme
  // Step 1: Get the color theme and settings
  //      A: Try reading the user's theme by vscode-shiki-bridge
  //      B: Try using the 'shiki.getUserTheme' command
  // Step 2: create a set of unique colors
  // Step 3: Use a commonly used scope list to map the colors to a color palette
  //         The scope list has an established order, so we can use it to build a
  //         color palette in that order.
  // Step 4: De-duplicate the colors built from the common scope list.
  //         If a the palette is full, then we can stop. If it's not, then we can
  //         select from the remaining colors in the unique color set.
  async getTokenColorsForTheme() {
    const theme = await this.fetchUserTheme();
    if (theme) {
      const [_themeName, themeData] = theme;
      this.processThemeRules(themeData);
    } else {
      window.showErrorMessage(
        "Error getting user theme. If you are seeing this while using VS Code SSH, you will need to use this helper extension: https://github.com/Lramseyer/shiki-service"
      );
      this.setDefaultThemeRules();
    }
    this.broadcast((document) => {
      document.webviewPanel?.webview.postMessage({
        command: "updateColorPalette",
        colorPalette: this.colorPalette,
        errorColorPalette: this.errorColorPalette,
        themeValid: this.themeValid
      });
    });
  }
  // Try each theme source in order; return undefined if all fail.
  // Note: `return await` is required so rejections are caught by each try.
  async fetchUserTheme() {
    try {
      return await getUserTheme();
    } catch {
    }
    try {
      return await commands.executeCommand("shiki.getUserTheme");
    } catch {
      return void 0;
    }
  }
  setDefaultThemeRules() {
    this.colorPalette = ["#CCCCCC", "#CCCCCC", "#CCCCCC", "#CCCCCC", "#CCCCCC", "#CCCCCC", "#CCCCCC", "#CCCCCC"];
    this.errorColorPalette = ["#C00000"];
    this.themeValid = false;
  }
  processThemeRules(themeData) {
    const scopeList = [
      "constant.numeric",
      "string",
      "keyword",
      "constant.language",
      "storage.type",
      "keyword.control",
      "variable",
      "entity.name.function",
      "support.function",
      "entity.name.type",
      "support.type",
      "comment",
      "keyword.operator",
      "variable.parameter"
    ];
    const errorScopes = ["token.error-token", "invalid"];
    const colorMap = {};
    const scopeMap = {};
    const colorPalette = [];
    const errorColorPalette = [];
    scopeList.forEach((scope) => {
      scopeMap[scope] = [];
    });
    errorScopes.forEach((scope) => {
      scopeMap[scope] = [];
    });
    themeData.forEach((theme) => {
      const settings = theme.settings;
      if (!settings) {
        return;
      }
      settings.forEach((rule) => {
        if (!rule.settings?.foreground) {
          return;
        }
        const color = rule.settings.foreground.toLowerCase();
        if (!colorMap[color]) {
          colorMap[color] = [];
        }
        let rulesList = [];
        if (typeof rule.scope === "string") {
          rulesList = [rule.scope];
        } else if (rule.scope instanceof Array) {
          rulesList = rule.scope;
        }
        rulesList.forEach((scope) => {
          colorMap[color].push(scope);
          if (scopeList.includes(scope)) {
            scopeMap[scope].push(color);
          }
          if (errorScopes.includes(scope)) {
            errorColorPalette.push(color);
          }
        });
      });
    });
    const semanticTokens = Object.keys(colorMap);
    errorScopes.forEach((scope) => {
      scopeMap[scope].forEach((color) => {
        if (errorColorPalette.includes(color)) {
          return;
        }
        errorColorPalette.push(color);
      });
    });
    scopeList.forEach((scope) => {
      scopeMap[scope].forEach((color) => {
        if (colorPalette.includes(color)) {
          return;
        }
        if (errorColorPalette.includes(color)) {
          return;
        }
        colorPalette.push(color);
      });
    });
    semanticTokens.forEach((color) => {
      if (colorPalette.includes(color)) {
        return;
      }
      if (errorColorPalette.includes(color)) {
        return;
      }
      colorPalette.push(color);
    });
    this.log.appendLine("Color palette from semantic token colors: " + colorPalette.join(", ") + ", " + errorColorPalette.join(", "));
    this.colorPalette = colorPalette;
    this.errorColorPalette = errorColorPalette;
    this.themeValid = true;
  }
  getColorPalette() {
    return {
      colorPalette: this.colorPalette,
      errorColorPalette: this.errorColorPalette,
      themeValid: this.themeValid
    };
  }
};
var WaveformViewerProvider = class _WaveformViewerProvider {
  constructor(_context, log, wasmModule, documentCollection) {
    this._context = _context;
    this.log = log;
    this.wasmModule = wasmModule;
    this.documentCollection = documentCollection;
    this.netlistTreeDataProvider = new NetlistTreeDataProvider();
    this.netlistView = window.createTreeView("waveformViewerNetlistView", {
      treeDataProvider: this.netlistTreeDataProvider,
      manageCheckboxStateManually: true,
      canSelectMany: true,
      showCollapseAll: true,
      dragAndDropController: netlistItemDragAndDropController
    });
    this._context.subscriptions.push(this.netlistView);
    this.statusBar = new VaporviewStatusBar(this._context);
    this.netlistView.onDidExpandElement(this.handleNetlistExpandElement);
    this.netlistView.onDidCollapseElement(this.handleNetlistCollapseElement);
    this.netlistView.onDidChangeSelection(this.handleNetlistViewSelectionChanged, this, this._context.subscriptions);
    this.wasmWorkerFile = Uri.joinPath(this._context.extensionUri, "dist", "worker.js").fsPath;
    this.quickPick = new NetlistSearchQuickPick();
  }
  static viewType = "vaporview.waveformViewer";
  themeColors = /* @__PURE__ */ new Map();
  wasmWorkerFile;
  //private readonly documentCollection = new VaporviewDocumentCollection();
  getDocumentFromUri(uri) {
    return this.documentCollection.getDocumentFromUri(uri);
  }
  getDocumentFromId(documentId) {
    return this.documentCollection.get(documentId);
  }
  remoteConnections = /* @__PURE__ */ new Map();
  activeWebview;
  activeDocument;
  lastActiveWebview;
  lastActiveDocument;
  get getActiveDocument() {
    return this.activeDocument;
  }
  get getLastActiveDocument() {
    return this.lastActiveDocument;
  }
  // API endpoints
  netlistTreeDataProvider;
  netlistView;
  statusBar;
  // Event emitters
  static markerSetEventEmitter = new EventEmitter();
  static signalSelectEventEmitter = new EventEmitter();
  static addVariableEventEmitter = new EventEmitter();
  static removeVariableEventEmitter = new EventEmitter();
  static valueLinkEventEmitter = new EventEmitter();
  static externalDropEventEmitter = new EventEmitter();
  _onDidChangeCustomDocument = new EventEmitter();
  onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;
  // Quick Pick Menu
  quickPick;
  async openCustomDocument(uri, openContext, _token) {
    const delegate = {
      addSignalByNameToDocument: this.addSignalByNameToDocument.bind(this),
      logOutputChannel: (message2) => {
        this.log.appendLine(message2);
      },
      updateViews: (uri2) => {
        return;
      },
      // placeholder function to be overridden once we create the document
      emitEvent: (e) => {
        this.emitEvent(e);
      },
      removeFromCollection: this.removeFromCollection.bind(this),
      getColorPalette: () => {
        return this.documentCollection.getColorPalette();
      }
    };
    let handler;
    if (uri.scheme === "vaporview-remote") {
      const connectionInfo = await this.getRemoteConnectionInfo(uri);
      handler = await SurferFormatHandler.create(delegate, uri, connectionInfo.serverUrl, this.wasmWorkerFile, this.wasmModule, connectionInfo.bearerToken);
    } else {
      const fileType = uri.fsPath.split(".").pop()?.toLocaleLowerCase() || "";
      if (fileType === "fsdb") {
        handler = new FsdbFormatHandler(delegate, uri, async () => null);
      } else {
        handler = await WasmFormatHandler.create(delegate, uri, fileType, this.wasmWorkerFile, this.wasmModule);
      }
    }
    const document = await VaporviewDocument.create(uri, handler, delegate, this.documentCollection);
    delegate.updateViews = (uri2) => {
      if (this.activeDocument?.uri !== uri2) {
        return;
      }
      this.netlistTreeDataProvider.loadDocument(document);
    };
    await document.load();
    return document;
  }
  async resolveCustomEditor(document, webviewPanel, _token) {
    webviewPanel.webview.onDidReceiveMessage((e) => {
      switch (e.command) {
        case "logOutput": {
          this.log.appendLine(e.message);
          break;
        }
        case "showMessage": {
          this.handleWebviewMessage(e);
          break;
        }
        case "copyToClipboard": {
          env.clipboard.writeText(e.text);
          break;
        }
        case "executeCommand": {
          commands.executeCommand(e.commandName, ...e.args || []);
          break;
        }
        case "updateConfiguration": {
          workspace.getConfiguration("vaporview").update(e.property, e.value, ConfigurationTarget.Global);
          break;
        }
        case "ready": {
          document.onWebviewReady(webviewPanel);
          break;
        }
        case "initialized": {
          document.onWebviewInitialized();
          break;
        }
        case "restoreState": {
          this.restoreState(e.state, e.uri);
          break;
        }
        case "contextUpdate": {
          this.handleUpdateWebviewContext(document, e);
          break;
        }
        case "emitEvent": {
          this.emitEvent(e);
          break;
        }
        case "fetchDataFromFile": {
          document.fetchData(e.requestList);
          break;
        }
        case "close-webview": {
          webviewPanel.dispose();
          break;
        }
        case "handleDrop": {
          this.handleWebviewDrop(e);
          break;
        }
        case "focus": {
          webviewPanel.reveal();
          break;
        }
        default: {
          this.log.appendLine("Unknown message type from webview: " + JSON.stringify(e));
          break;
        }
      }
      if (e.type === "response") {
        this.onMessage(e);
      }
    }, this, this._context.subscriptions);
    webviewPanel.onDidChangeViewState((e) => {
      if (e.webviewPanel.active) {
        this.onDidChangeViewStateActive(document, webviewPanel);
        webviewPanel.webview.postMessage({ command: "getContext" });
      } else if (!e.webviewPanel.visible && e.webviewPanel === this.activeWebview) {
        this.onDidChangeViewStateInactive();
      }
    }, this, this._context.subscriptions);
    webviewPanel.onDidDispose(() => {
      if (this.activeWebview === webviewPanel) {
        this.onDidChangeViewStateInactive();
      }
      if (this.lastActiveWebview === webviewPanel) {
        this.lastActiveWebview = void 0;
        this.lastActiveDocument = void 0;
      }
    }, this, this._context.subscriptions);
    webviewPanel.webview.options = { enableScripts: true };
    webviewPanel.webview.html = this.getHtmlContent(webviewPanel.webview);
    this.onDidChangeViewStateActive(document, webviewPanel);
  }
  backupCustomDocument(document, context, cancellation) {
    return Promise.resolve(new VaporviewDocumentBackup(document.uri.toString()));
  }
  revertCustomDocument(document, cancellation) {
    if (document.saveFileUri) {
      this.loadSessionFromFileUri(document, document.saveFileUri, false);
    }
    return Promise.resolve();
  }
  async saveCustomDocument(document, cancellation) {
    if (document.clearDirtyStatus) {
      document.clearDirtyStatus = false;
    } else {
      await this.saveSessionToFile(document, document.saveFileUri, cancellation);
    }
  }
  async saveCustomDocumentAs(document, destination, cancellation) {
    await this.saveSessionToFile(document, destination, cancellation);
  }
  getDocumentFromOptionalUri(uri) {
    if (!uri) {
      return this.activeDocument;
    } else {
      return this.documentCollection.getDocumentFromUri(uri);
    }
  }
  getAllDocumentUris() {
    return this.documentCollection.getAllDocuments().map((entry) => entry.uri.toString());
  }
  getViewerState(uri) {
    const document = this.getDocumentFromOptionalUri(uri);
    if (!document) {
      return;
    }
    return document.getWebviewSession();
  }
  async getRemoteConnectionInfo(uri) {
    let connectionInfo = this.remoteConnections.get(uri.toString());
    if (connectionInfo) {
      return connectionInfo;
    }
    const persistedConnection = this._context.globalState.get(`remote-connection-${uri.toString()}`);
    if (persistedConnection) {
      connectionInfo = persistedConnection;
      this.remoteConnections.set(uri.toString(), connectionInfo);
    } else {
      const action = await window.showErrorMessage(
        `Remote connection lost for ${uri.path}. Please reconnect.`,
        "Reconnect",
        "Close Tab"
      );
      if (action === "Reconnect") {
        await commands.executeCommand("workbench.action.closeActiveEditor");
        await commands.executeCommand("vaporview.openRemoteViewer");
      }
      throw new Error(`Remote connection lost and user chose not to reconnect`);
    }
    return connectionInfo;
  }
  // True when the URL is plain http:// to a host other than this machine, i.e. a
  // bearer token sent to it would cross the network unencrypted.
  isPlaintextNonLoopback(serverUrl) {
    let url;
    try {
      url = new URL(serverUrl);
    } catch {
      return false;
    }
    if (url.protocol !== "http:") {
      return false;
    }
    const host2 = url.hostname.toLowerCase();
    const isLoopback = host2 === "localhost" || host2.endsWith(".localhost") || host2 === "[::1]" || /^127(\.\d{1,3}){3}$/.test(host2);
    return !isLoopback;
  }
  async openRemoteViewer(serverUrl, bearerToken) {
    if (bearerToken && this.isPlaintextNonLoopback(serverUrl)) {
      const choice = await window.showWarningMessage(
        `${serverUrl} uses unencrypted HTTP. Your bearer token will be sent in plain text and can be read by anyone on the network path.`,
        { modal: true },
        "Connect Anyway"
      );
      if (choice !== "Connect Anyway") {
        this.log.appendLine(`Remote viewer connection to ${serverUrl} cancelled: bearer token over plain HTTP`);
        return;
      }
    }
    try {
      const sanitizedUrl = serverUrl.replace(/[^a-zA-Z0-9.-]/g, "_");
      const remoteUri = Uri.parse(`vaporview-remote://${sanitizedUrl}/remote-waveforms.vcd`).with({ scheme: "vaporview-remote" });
      const connectionInfo = { serverUrl, bearerToken };
      this.remoteConnections.set(remoteUri.toString(), connectionInfo);
      await this._context.globalState.update(`remote-connection-${remoteUri.toString()}`, connectionInfo);
      await commands.executeCommand("vscode.openWith", remoteUri, _WaveformViewerProvider.viewType);
      this.log.appendLine(`Opened remote viewer for ${serverUrl}`);
    } catch (error) {
      window.showErrorMessage(`Failed to open remote viewer: ${error}`);
      this.log.appendLine(`Failed to open remote viewer: ${error}`);
    }
  }
  async saveSessionToFile(specifiedDocument, saveFileUri, cancellation) {
    let document = specifiedDocument;
    if (!document) {
      document = this.activeDocument;
    }
    if (!document) {
      window.showErrorMessage("No viewer is active. Please select the viewer you wish to save session.");
      throw new Error("No active document to save");
    }
    const autosave = workspace.getConfiguration("files").get("autoSave");
    const autosaveOff = autosave === "off";
    let uri = saveFileUri;
    if (!saveFileUri && autosaveOff) {
      const filePath = document.uri.fsPath;
      const fileName = path4.basename(filePath);
      const saveFileName = fileName.replace(/\.[^/.]+$/, "") + ".json" || "untitled.json";
      uri = await window.showSaveDialog({
        saveLabel: "Save session",
        filters: { JSON: ["json"] },
        defaultUri: Uri.file(path4.join(dirname3(filePath), saveFileName))
      });
    }
    if (!uri || cancellation?.isCancellationRequested) {
      throw new Error("Save cancelled, or location was not provided");
    }
    const saveData = document.getWebviewSession();
    const saveDataString = JSON.stringify(saveData, null, 2);
    await workspace.fs.writeFile(uri, new TextEncoder().encode(saveDataString));
    document.saveFileUri = uri;
  }
  // Opens a waveform file and resolves only once the webview is initialized, so callers
  // can immediately send state/signals. 'vscode.openWith' alone only waits for
  // resolveCustomEditor, which returns before the webview script has even run.
  async openFileCommand(args) {
    if (!args?.uri) {
      return;
    }
    await commands.executeCommand("vscode.openWith", args.uri, "vaporview.waveformViewer");
    const document = this.documentCollection.getDocumentFromUri(args.uri.toString());
    if (!document) {
      return;
    }
    await document.whenWebviewInitialized();
    if (args.loadAll) {
      this.loadAllVariablesFromFile(args.uri.toString(), args.maxSignals || 64);
    }
  }
  async loadViewerStateCommand(args) {
    const document = this.getDocumentFromCommandArgs({ uri: args.documentUri });
    if (!document) {
      return;
    }
    if (!args.sessionFileUri) {
      return;
    }
    await document.whenWebviewInitialized();
    await this.loadSessionFromFileUri(document, Uri.parse(args.sessionFileUri), true);
  }
  async loadSessionFromFile() {
    if (!this.activeDocument) {
      window.showErrorMessage("No viewer is active. Please select the viewer you wish to load session into.");
      return;
    }
    const uri = await new Promise((resolve2, reject) => {
      window.showOpenDialog({
        canSelectFiles: true,
        canSelectFolders: false,
        canSelectMany: false,
        openLabel: "Load session",
        filters: { JSON: ["json"] }
      }).then((uri2) => {
        if (uri2) {
          resolve2(uri2[0]);
        } else {
          reject("No file selected");
        }
      }, (error) => {
        reject(error);
      });
    });
    if (!uri) {
      return;
    }
    await this.loadSessionFromFileUri(this.activeDocument, uri, true);
  }
  async loadSessionFromFileUri(document, saveFileUri, saveEvent) {
    const fileData = await workspace.fs.readFile(saveFileUri).then((data) => {
      return JSON.parse(new TextDecoder().decode(data));
    });
    if (!fileData) {
      return;
    }
    if (fileData.fileName && fileData.fileName !== document.uri.fsPath) {
      window.showWarningMessage("The session file may not match the active viewer");
    }
    this.log.appendLine("Loading session state from file: " + fileData.fileName);
    document.saveFileUri = saveFileUri;
    document.applySessionState(fileData, 2 /* File */, false);
    if (saveEvent) {
      document.clearDirtyStatus = true;
      workspace.save(document.uri);
    }
  }
  restoreState(state, uri) {
    const fileUri = typeof uri === "string" ? Uri.parse(uri) : uri;
    let document = this.documentCollection.getDocumentFromUri(fileUri.toString());
    if (!document) {
      document = this.activeDocument;
    }
    if (!document) {
      return;
    }
    if (state) {
      document.applySessionState(state, 1 /* Restore */, false);
    } else {
      const filePath = fileUri.fsPath.match(/^(.*)\.[^.]+$/)?.[1] + ".json";
      if (fs3.existsSync(filePath)) {
        const sessionFileUri = Uri.file(filePath);
        const promptLoadSession = workspace.getConfiguration("vaporview").get("promptLoadSettings");
        if (promptLoadSession === "Never") {
          return;
        } else if (promptLoadSession === "Always") {
          this.loadSessionFromFileUri(document, sessionFileUri, true);
          return;
        }
        window.showInformationMessage(
          "Restore state from file: " + filePath + "?\nYou can set a default behavior and disable this prompt in the extension settings.",
          "Yes",
          "No",
          "Settings"
        ).then((action) => {
          if (action === "Yes") {
            this.loadSessionFromFileUri(document, sessionFileUri, true);
          } else if (action === "Settings") {
            commands.executeCommand("workbench.action.openSettings", "vaporview.promptLoadSettings");
          }
        });
      }
    }
  }
  async reloadFile(e) {
    let document;
    if (e.fsPath) {
      document = this.documentCollection.getDocumentFromUri(e.toString());
    } else {
      document = this.activeDocument;
    }
    if (!this.activeDocument) {
      return;
    }
    if (!document) {
      return;
    }
    if (document.uri.fsPath !== this.activeDocument.uri.fsPath) {
      return;
    }
    this.netlistTreeDataProvider.hide();
    await document.reload();
  }
  removeFromCollection(uri, document) {
    this.documentCollection.remove(document.documentId);
    if (uri.scheme === "vaporview-remote") {
      this.remoteConnections.delete(uri.toString());
      this._context.globalState.update(`remote-connection-${uri.toString()}`, void 0);
    }
  }
  copyWaveDrom() {
    this.activeWebview?.webview.postMessage({ command: "copyWaveDrom" });
  }
  setWaveDromClock(edge, netlistId) {
    this.activeWebview?.webview.postMessage({
      command: "setWaveDromClock",
      edge,
      netlistId
    });
  }
  handleWebviewMessage(event) {
    switch (event.messageType) {
      case "warning" /* Warning */: {
        window.showWarningMessage(event.message);
        break;
      }
      case "error" /* Error */: {
        window.showErrorMessage(event.message);
        break;
      }
      case "info" /* Info */: {
        window.showInformationMessage(event.message);
        break;
      }
      default: {
        window.showInformationMessage(event.message);
        break;
      }
    }
  }
  setMarkerAtTimeWithUnits(time, unit, altMarker) {
    if (!this.lastActiveDocument) {
      return;
    }
    const metadata = this.lastActiveDocument.metadata;
    const timeScale = metadata.timeScale;
    const timeUnit = scaleFromUnits(metadata.timeUnit);
    if (!timeScale || !timeUnit) {
      return;
    }
    const scaleFactor = scaleFromUnits(unit) / (timeUnit * timeScale);
    this.setMarkerAtTime(Math.round(time * scaleFactor), altMarker);
  }
  setMarkerAtTime(time, altMarker) {
    if (!this.lastActiveWebview) {
      return;
    }
    if (!this.lastActiveDocument) {
      return;
    }
    const timeEnd = this.lastActiveDocument.metadata.timeEnd;
    if (time < 0 || time > timeEnd) {
      return;
    }
    this.lastActiveWebview.webview.postMessage({ command: "setMarker", time, markerType: altMarker });
  }
  async updateTimeUnits(newUnits) {
    if (!this.lastActiveWebview) {
      return;
    }
    if (!this.lastActiveDocument) {
      return;
    }
    const timeUnit = scaleFromUnits(this.lastActiveDocument.metadata.timeUnit);
    const timeEnd = this.lastActiveDocument.metadata.timeEnd;
    const timeScale = this.lastActiveDocument.metadata.timeScale;
    const maxTime = timeUnit * timeScale * timeEnd;
    const unitsList = ["fs", "ps", "ns", "\xB5s", "ms", "s"];
    const selectableUnits = unitsList.filter((unit) => {
      return scaleFromUnits(unit) <= maxTime;
    });
    let units = newUnits;
    if (newUnits === "") {
      await window.showQuickPick(
        selectableUnits,
        {
          placeHolder: "Select Time Units",
          canPickMany: false
        }
      ).then((unit) => {
        units = unit;
      });
    }
    if (units === void 0 || units === "") {
      return;
    }
    this.lastActiveWebview.webview.postMessage({ command: "updateRulerSettings", units });
  }
  handleUpdateWebviewContext(document, event) {
    if (!document) {
      return;
    }
    const isDirty = document.captureWebviewState(event);
    if (isDirty) {
      this._onDidChangeCustomDocument.fire({
        document,
        undo: () => {
          document.undo();
        },
        redo: () => {
          document.redo();
        }
      });
    }
    if (event.autoReload && document.fileUpdated && document.reloadPending) {
      commands.executeCommand("vaporview.reloadFile", document.uri);
    } else {
      this.statusBar.update(document, event);
    }
  }
  emitEvent(e) {
    switch (e.eventType) {
      case "markerSet": {
        _WaveformViewerProvider.markerSetEventEmitter.fire(e.eventData);
        break;
      }
      case "signalSelect": {
        _WaveformViewerProvider.signalSelectEventEmitter.fire(e.eventData);
        break;
      }
      case "addVariable": {
        _WaveformViewerProvider.addVariableEventEmitter.fire(e.eventData);
        break;
      }
      case "removeVariable": {
        _WaveformViewerProvider.removeVariableEventEmitter.fire(e.eventData);
        break;
      }
      case "valueLink": {
        _WaveformViewerProvider.valueLinkEventEmitter.fire(e.eventData);
        break;
      }
    }
  }
  onDidChangeViewStateActive(document, webviewPanel) {
    this.activeWebview = webviewPanel;
    this.activeDocument = document;
    this.lastActiveWebview = webviewPanel;
    this.lastActiveDocument = document;
    this.netlistTreeDataProvider.loadDocument(document);
    document.setSearchCommandContext();
  }
  onDidChangeViewStateInactive() {
    this.activeWebview = void 0;
    this.activeDocument = void 0;
    this.netlistTreeDataProvider.hide();
    this.statusBar.hide();
    commands.executeCommand("setContext", "vaporview.netlistSearchable", false);
  }
  async showInNetlistViewByName(signalName) {
    if (!this.lastActiveDocument) {
      return;
    }
    const document = this.lastActiveDocument;
    const metadata = await document.findTreeItem(void 0, signalName, void 0, void 0);
    if (metadata !== null) {
      this.netlistView.reveal(metadata, { select: true, focus: false, expand: 3 });
    }
  }
  showInNetlistView(e) {
    if (!this.lastActiveDocument) {
      return;
    }
    const document = this.lastActiveDocument;
    let netlistId;
    if (e) {
      netlistId = e.netlistId;
    } else {
      netlistId = document.webviewContext.selectedSignal;
    }
    if (netlistId === null || netlistId === void 0) {
      return;
    }
    const netlistItem = document.netlistIdTable[netlistId];
    if (netlistItem) {
      this.netlistView.reveal(netlistItem, { select: true, focus: false, expand: 3 });
    }
  }
  _requestId = 1;
  _callbacks = /* @__PURE__ */ new Map();
  postMessageWithResponse(panel, type, body) {
    const requestId = this._requestId++;
    const p = new Promise((resolve2) => this._callbacks.set(requestId, resolve2));
    panel.webview.postMessage({ type, requestId, body });
    return p;
  }
  onMessage(message2) {
    const callback = this._callbacks.get(message2.requestId);
    callback?.(message2.body);
  }
  // #region Command Handlers
  getDocumentFromCommandArgs(e) {
    if (e.uri !== void 0) {
      const document = this.documentCollection.getDocumentFromUri(e.uri);
      if (!document) {
        window.showErrorMessage("Document not found: " + e.uri);
        return void 0;
      } else {
        return document;
      }
    } else if (this.activeDocument) {
      return this.activeDocument;
    } else {
      return this.lastActiveDocument;
    }
  }
  async getNetlistItemFromCommandArgs(e) {
    let path6;
    let metadata = null;
    const document = this.getDocumentFromCommandArgs(e);
    if (!document) {
      return null;
    }
    if (e.netlistId !== void 0) {
      metadata = document.netlistIdTable[e.netlistId];
      if (metadata === void 0) {
        window.showWarningMessage("Signal not found: " + e.netlistId);
        return null;
      }
    } else {
      if (e.instancePath !== void 0) {
        path6 = e.instancePath;
      } else {
        if (e.scopePath !== void 0) {
          path6 = (path6 ?? "") + e.scopePath + ".";
        }
        path6 = (path6 ?? "") + (e.name ?? "");
      }
      metadata = await document.findTreeItem(void 0, path6 ?? "", e.msb, e.lsb);
    }
    return metadata;
  }
  loadAllVariablesFromFile(uri, maxSignals) {
    const document = this.documentCollection.getDocumentFromUri(uri);
    if (!document) {
      return;
    }
    const netlistIdCount = document.metadata.netlistIdCount;
    if (netlistIdCount > maxSignals || netlistIdCount > 64) {
      return;
    }
    document.treeData.forEach((scope) => {
      this.addChildVariablesToDocument(document, scope, true, maxSignals, true);
    });
  }
  // Add or remove signals from the waveform viewer
  async variableActionCommandHandler(e, action) {
    const document = this.getDocumentFromCommandArgs(e);
    if (!document) {
      return;
    }
    if (document.uri.fsPath !== this.activeDocument?.uri.fsPath) {
      document.reveal();
    }
    const metadata = await this.getNetlistItemFromCommandArgs(e);
    if (metadata === null) {
      window.showWarningMessage("Signal not found: " + e.netlistId);
      return;
    }
    switch (action) {
      case "add": {
        if (metadata.contextValue === "netlistScope") {
          const recursive = e.recursive === true;
          this.addAllInScopeToDocument(metadata, recursive, 128);
        } else {
          const isDisplayed = document.isSignalDisplayed(metadata.netlistId);
          if (e.reveal === true && isDisplayed) {
            document.revealSignalInWebview(metadata.netlistId);
          } else {
            document.renderSignals([metadata.netlistId], [], void 0);
          }
        }
        break;
      }
      case "remove": {
        if (metadata.contextValue !== "netlistScope") {
          const netlistId = metadata.netlistId;
          document.removeSignalFromWebview(netlistId, void 0, false);
        }
        break;
      }
      case "reveal": {
        this.netlistView.reveal(metadata, { select: true, focus: false, expand: 0 });
        break;
      }
      case "addLink": {
        if (metadata.contextValue !== "netlistScope") {
          this.setValueFormat({ netlistId: metadata.netlistId }, 0, { valueLinkEnable: e.valueLinkEnable === true });
        }
        break;
      }
    }
  }
  markerCommandHandler(e) {
    if (e.time === void 0) {
      return;
    }
    const document = this.getDocumentFromCommandArgs(e);
    if (!document) {
      return;
    }
    if (document.uri.fsPath !== this.activeDocument?.uri.fsPath) {
      document.reveal();
    }
    const markerType = e.markerType || 0;
    if (e.units !== void 0) {
      this.setMarkerAtTimeWithUnits(e.time, e.units, markerType);
    } else {
      this.setMarkerAtTime(e.time, markerType);
    }
  }
  handleKeyBinding(e, keyCommand) {
    if (!this.activeWebview) {
      return;
    }
    this.activeWebview.webview.postMessage({
      command: "handle-keypress",
      keyCommand,
      event: e
    });
  }
  handleWebviewDrop(e) {
    const unknownUriList = [];
    const netlistIdList = [];
    const document = this.documentCollection.get(e.documentId);
    if (!document) {
      return;
    }
    if (!e.resourceUriList) {
      return;
    }
    e.resourceUriList.forEach((uri) => {
      if (uri.scheme === "waveform") {
        const decoded = decodeNetlistUri(uri);
        if (decoded.id !== void 0) {
          netlistIdList.push(decoded.id);
        }
        return;
      } else if (uri.scheme === "file") {
        const fileName = uri.fsPath || uri.path;
        if (fileName.endsWith(".json")) {
          const sanitizedUri = Uri.file(fileName);
          this.loadSessionFromFileUri(document, sanitizedUri, true);
          return;
        }
      }
      unknownUriList.push(uri);
    });
    let groupPath = [];
    let index;
    if (e.groupPath) {
      groupPath = e.groupPath;
    }
    if (e.dropIndex || e.dropIndex === 0) {
      index = e.dropIndex;
    }
    if (document !== this.activeDocument) {
      return;
    }
    document.renderSignals(netlistIdList, groupPath, index);
    if (netlistIdList.length > 0) {
      document.reveal();
    }
    if (unknownUriList.length === 0) {
      return;
    }
    _WaveformViewerProvider.externalDropEventEmitter.fire({
      uri: document.uri.toString(),
      resourceUriList: unknownUriList,
      groupPath,
      index: index ?? 0
    });
  }
  //private addSignalsToDocument(document: VaporviewDocument, netlistElements: NetlistItem[], groupPath: string[], index: number | undefined) {
  //  const netlistIdList = netlistElements.map((element) => element.netlistId);
  //  document.renderSignals(netlistIdList, groupPath, index);
  //}
  async getNetlistItemFromSignalName(document, signalName) {
    const instancePath = signalName.replace(/[:;]$/, "");
    const regex = /\[(\d+:)?(\d+)\]$/;
    const field = instancePath.match(regex);
    const lookup = instancePath.replace(regex, "");
    const msb = field ? parseInt(field[1], 10) : void 0;
    const lsb = field ? parseInt(field[2], 10) : msb;
    return await document.findTreeItem(void 0, lookup, msb, lsb);
  }
  async addSignalByNameToDocument(signalName) {
    if (!this.lastActiveDocument) {
      return;
    }
    const document = this.lastActiveDocument;
    const metadata = await this.getNetlistItemFromSignalName(document, signalName);
    if (metadata === null) {
      window.showWarningMessage("Signal not found: " + signalName);
      return;
    }
    if (metadata.contextValue === "netlistScope") {
      this.netlistView.reveal(metadata, { select: true, focus: false, expand: 0 });
      return;
    }
    const netlistId = metadata.netlistId;
    const displayedNetlistIds = document.getDisplayedNetlistIds();
    const isDisplayed = displayedNetlistIds.includes(netlistId);
    if (isDisplayed) {
      document.revealSignalInWebview(netlistId);
    } else {
      document.renderSignals([netlistId], [], void 0);
    }
  }
  revealSignalInWebview(netlistId) {
    if (!this.activeDocument) {
      return;
    }
    const document = this.activeDocument;
    document.revealSignalInWebview(netlistId);
  }
  async addVariableByInstancePathToDocument(e) {
    if (e === void 0 || e.instancePath === void 0) {
      window.showInputBox({
        prompt: "Enter variable name",
        placeHolder: "top.mid.var"
      }).then((userInput) => {
        if (userInput !== void 0 && userInput !== "") {
          this.addSignalByNameToDocument(`${userInput}`);
        }
      });
      return;
    }
    this.addSignalByNameToDocument(e.instancePath);
  }
  searchNetlist(e) {
    const document = this.activeDocument;
    let scopeId;
    if (!document) {
      return;
    }
    if (e) {
      scopeId = e.netlistId;
    }
    this.quickPick.show(document, scopeId);
  }
  async addAllInScopeToDocument(e, recursive, maxChildren) {
    if (!this.activeDocument) {
      return;
    }
    const document = this.activeDocument;
    if (e === void 0) {
      window.showInputBox({
        prompt: "Enter scope name",
        placeHolder: "top.mid.scope"
      }).then((userInput) => {
        if (userInput !== void 0 && userInput !== "") {
          this.addChildVariablesToDocumentByName(`${userInput}`, recursive, maxChildren);
        }
      });
      return;
    }
    if (e.collapsibleState === TreeItemCollapsibleState.None) {
      return;
    }
    this.addChildVariablesToDocument(document, e, recursive, maxChildren);
  }
  async addChildVariablesToDocumentByName(name, recursive, maxChildren) {
    if (!this.activeDocument) {
      return;
    }
    const document = this.activeDocument;
    const netlistItem = await document.findTreeItem(void 0, name, void 0, void 0);
    if (netlistItem === null || netlistItem.contextValue !== "netlistScope") {
      window.showWarningMessage("Scope not found: " + name);
      return;
    }
    this.addChildVariablesToDocument(document, netlistItem, recursive, maxChildren);
  }
  async addChildVariablesToDocument(document, netlistItem, recursive, maxChildren, noWarning = false) {
    if (netlistItem.contextValue !== "netlistScope") {
      return;
    }
    const netlistVariables = [];
    const netlistScopes = [netlistItem];
    while (netlistScopes.length > 0 && netlistVariables.length < maxChildren) {
      const parentScope = netlistScopes.shift();
      const children = await document.getScopeChildren(parentScope);
      children.forEach((element) => {
        if (element.contextValue === "netlistVar") {
          netlistVariables.push(element);
        } else if (element.contextValue === "netlistScope" && recursive) {
          netlistScopes.push(element);
        }
      });
    }
    this.filterAddSignalsInNetlist(netlistVariables, noWarning);
  }
  filterAddSignalsInNetlist(netlistElements, noWarning = false) {
    const document = this.activeDocument;
    if (!document) {
      return;
    }
    const elementList = netlistElements.filter((element) => {
      return element.contextValue === "netlistVar";
    }).map((element) => element.netlistId);
    if (elementList.length > 48 && !noWarning) {
      window.showWarningMessage("You are about to add a large number of signals to the waveform viewer. This may cause performance issues. Do you want to continue?", "Yes", "No").then((response) => {
        if (response === "Yes") {
          document.renderSignals(elementList, [], void 0);
        }
      });
    } else {
      document.renderSignals(elementList, [], void 0);
    }
  }
  removeSignalFromDocument(netlistId, rowId, removeAllSelected) {
    if (!this.activeDocument) {
      return;
    }
    if (!this.activeWebview?.visible) {
      return;
    }
    this.activeDocument.removeSignalFromWebview(netlistId, rowId, removeAllSelected);
  }
  removeSignalList(signalList) {
    if (!this.activeWebview) {
      return;
    }
    if (!this.activeDocument) {
      return;
    }
    if (!this.activeWebview.visible) {
      return;
    }
    signalList.forEach((element) => {
      if (element.contextValue !== "netlistVar") {
        return;
      }
      this.activeDocument?.removeSignalFromWebview(element.netlistId, void 0, false);
    });
  }
  newSignalGroup(name, groupPath, parentGroupId, eventRowId, moveSelected) {
    if (!this.activeWebview) {
      return;
    }
    if (!this.activeDocument) {
      return;
    }
    if (!this.activeWebview.visible) {
      return;
    }
    const panel = this.activeWebview;
    panel.webview.postMessage({
      command: "newSignalGroup",
      groupName: name,
      groupPath,
      parentGroupId,
      eventRowId,
      moveSelected,
      showRenameInput: true
    });
  }
  newSeparator(name, groupPath, parentGroupId, eventRowId) {
    if (!this.activeWebview) {
      return;
    }
    if (!this.activeDocument) {
      return;
    }
    if (!this.activeWebview.visible) {
      return;
    }
    const panel = this.activeWebview;
    panel.webview.postMessage({
      command: "add-separator",
      name,
      groupPath,
      parentGroupId,
      eventRowId
    });
  }
  newSignalFromBitRange(name, groupPath, parentGroupId, eventRowId, bitRangeString2) {
    if (!this.activeWebview) {
      return;
    }
    if (!this.activeDocument) {
      return;
    }
    if (!this.activeWebview.visible) {
      return;
    }
    const bitRangeRegex = /^(\d+)(:(\d+))?$/;
    if (bitRangeString2 === void 0 || !bitRangeRegex.test(bitRangeString2)) {
      window.showWarningMessage("Invalid bit range string: " + bitRangeString2);
      return;
    } else {
      const msb = parseInt(bitRangeString2.split(":")[0]);
      let lsb = msb;
      if (bitRangeString2.includes(":")) {
        lsb = parseInt(bitRangeString2.split(":")[1]);
      }
      const panel = this.activeWebview;
      panel.webview.postMessage({
        command: "add-bit-slice",
        name,
        groupPath,
        parentGroupId,
        eventRowId,
        msb,
        lsb
      });
    }
  }
  createSignalsForAllBits(name, groupPath, parentGroupId, eventRowId, bitWidth) {
    if (!this.activeWebview) {
      return;
    }
    if (!this.activeDocument) {
      return;
    }
    if (!this.activeWebview.visible) {
      return;
    }
    const panel = this.activeWebview;
    panel.webview.postMessage({
      command: "add-all-bit-slices",
      name,
      groupPath,
      parentGroupId,
      eventRowId,
      bitWidth
    });
  }
  renameSignalGroup(e) {
    if (!this.activeWebview) {
      return;
    }
    if (!this.activeDocument) {
      return;
    }
    if (!this.activeWebview.visible) {
      return;
    }
    const groupId = e?.groupId;
    const groupName = e?.name;
    const rowId = e?.rowId;
    const panel = this.activeWebview;
    panel.webview.postMessage({
      command: "renameSignalGroup",
      rowId,
      groupId,
      groupName
    });
  }
  editSignalGroup(groupId, groupPath, name, isExpanded) {
    if (!this.activeWebview) {
      return;
    }
    if (!this.activeDocument) {
      return;
    }
    if (!this.activeWebview.visible) {
      return;
    }
    const panel = this.activeWebview;
    panel.webview.postMessage({
      command: "editSignalGroup",
      groupId,
      groupPath,
      name,
      isExpanded
    });
  }
  deleteSignalGroup(e, recursive) {
    if (!this.activeWebview) {
      return;
    }
    if (!this.activeDocument) {
      return;
    }
    if (!this.activeWebview.visible) {
      return;
    }
    const groupId = e?.groupId;
    const panel = this.activeWebview;
    panel.webview.postMessage({
      command: "remove-group",
      groupId,
      recursive
    });
  }
  removeSeparator(rowId, removeAllSelected) {
    if (!this.activeWebview) {
      return;
    }
    if (!this.activeDocument) {
      return;
    }
    if (!this.activeWebview.visible) {
      return;
    }
    const panel = this.activeWebview;
    panel.webview.postMessage({
      command: "remove-separator",
      rowId,
      removeAllSelected
    });
  }
  setValueFormat(commandArgs, index, properties) {
    if (!this.activeWebview) {
      return;
    }
    if (!this.activeDocument) {
      return;
    }
    if (!this.activeWebview.visible) {
      return;
    }
    const panel = this.activeWebview;
    const format3 = properties.valueFormat;
    const netlistId = commandArgs === void 0 ? void 0 : commandArgs.netlistId;
    const rowId = commandArgs === void 0 ? void 0 : commandArgs.rowId;
    panel.webview.postMessage({
      command: "setDisplayFormat",
      netlistId,
      index,
      rowId,
      numberFormat: format3,
      colorIndex: properties.colorIndex,
      renderType: properties.renderType,
      rowHeight: properties.rowHeight,
      verticalScale: properties.verticalScale,
      nameType: properties.nameType,
      customName: properties.customName,
      valueLinkEnable: properties.valueLinkEnable,
      annotateValue: properties.annotateValue
    });
  }
  copyValueAtMarker(e) {
    if (e.rowId === void 0) {
      return;
    }
    if (!this.activeWebview) {
      return;
    }
    if (!this.activeDocument) {
      return;
    }
    if (!this.activeWebview.visible) {
      return;
    }
    this.activeWebview.webview.postMessage({
      command: "copyValueAtMarker",
      rowId: e.rowId
    });
  }
  setDefaultPixelTime(e, increment) {
    let document;
    if (!this.lastActiveWebview) {
      return;
    }
    if (!this.lastActiveDocument) {
      return;
    }
    if (e !== void 0) {
      document = this.documentCollection.get(e.documentId);
    }
    if (!document) {
      document = this.lastActiveDocument;
    }
    let pixelTime = 0;
    let timeScale = 1;
    if (increment !== void 0) {
      const [time, units] = increment.split(" ");
      if (time === void 0) {
        return;
      }
      const timeValue = parseFloat(time);
      if (units !== void 0) {
        const scale = logScaleFromUnits(units);
        const defaultScale = logScaleFromUnits(document.metadata.timeUnit);
        timeScale = 10 ** (scale - defaultScale);
      }
      pixelTime = timeValue * timeScale;
    }
    document.webviewPanel?.webview.postMessage({ command: "updateRulerSettings", pixelTime });
  }
  // To do: implement nonce with this HTML:
  //<script nonce="${nonce}" src="${scriptUri}"></script>
  getHtmlContent(webview) {
    const extensionUri = this._context.extensionUri;
    const htmlFile = webview.asWebviewUri(Uri.joinPath(extensionUri, "media", "webview.html"));
    const svgIconsUri = webview.asWebviewUri(Uri.joinPath(extensionUri, "src", "webview", "icons.svg"));
    const jsFileUri = webview.asWebviewUri(Uri.joinPath(extensionUri, "dist", "webview.js"));
    const cssFileUri = webview.asWebviewUri(Uri.joinPath(extensionUri, "media", "style.css"));
    const codiconsUri = webview.asWebviewUri(Uri.joinPath(extensionUri, "node_modules", "@vscode", "codicons", "dist", "codicon.css"));
    let htmlContent = fs3.readFileSync(htmlFile.fsPath, "utf8");
    htmlContent = htmlContent.replace("${webAssets.svgIconsUri}", svgIconsUri.toString());
    htmlContent = htmlContent.replace("${webAssets.jsFileUri}", jsFileUri.toString());
    htmlContent = htmlContent.replace("${webAssets.cssFileUri}", cssFileUri.toString());
    htmlContent = htmlContent.replace("${webAssets.codiconsUri}", codiconsUri.toString());
    return htmlContent;
  }
  // onDidChangeSelection() event returns readonly elements
  // so we need to copy the selected elements to a new array
  // Six one way, half a dozen the other. One is just more concise...
  handleNetlistViewSelectionChanged = (e) => {
    const uri = this.activeDocument?.uri;
    this.netlistTreeDataProvider.handleSelectionChanged(e, uri);
  };
  handleNetlistCollapseElement = (e) => {
    if (!this.lastActiveWebview?.visible) {
      return;
    }
    if (e.element.collapsibleState === TreeItemCollapsibleState.None) {
      return;
    }
    e.element.collapsibleState = TreeItemCollapsibleState.Collapsed;
  };
  handleNetlistExpandElement = (e) => {
    if (!this.lastActiveWebview?.visible) {
      return;
    }
    if (e.element.collapsibleState === TreeItemCollapsibleState.None) {
      return;
    }
    e.element.collapsibleState = TreeItemCollapsibleState.Expanded;
  };
};

// vaporview/src/extension_core/wcp_server.ts
init_vscode();
import * as fs4 from "fs";

// vaporview/src/extension_core/wcp/node_tcp_server.ts
import { createServer } from "node:net";

// vaporview/src/extension_core/wcp/generated/wcp_server.ts
var WcpServer = class _WcpServer {
  getItemList() {
    return unsupportedWcpCommand("get_item_list");
  }
  getItemInfo(_params) {
    return unsupportedWcpCommand("get_item_info");
  }
  setItemColor(_params) {
    return unsupportedWcpCommand("set_item_color");
  }
  addItems(_params) {
    return unsupportedWcpCommand("add_items");
  }
  removeItems(_params) {
    return unsupportedWcpCommand("remove_items");
  }
  focusItem(_params) {
    return unsupportedWcpCommand("focus_item");
  }
  addMarkers(_params) {
    return unsupportedWcpCommand("add_markers");
  }
  setViewportTo(_params) {
    return unsupportedWcpCommand("set_viewport_to");
  }
  setViewportRange(_params) {
    return unsupportedWcpCommand("set_viewport_range");
  }
  zoomToFit() {
    return unsupportedWcpCommand("zoom_to_fit");
  }
  setCursor(_params) {
    return unsupportedWcpCommand("set_cursor");
  }
  load(_params) {
    return unsupportedWcpCommand("load");
  }
  reload() {
    return unsupportedWcpCommand("reload");
  }
  clear() {
    return unsupportedWcpCommand("clear");
  }
  shutdown() {
    return unsupportedWcpCommand("shutdown");
  }
  get supportedCommands() {
    const commands2 = [];
    if (this.getItemList !== _WcpServer.prototype.getItemList) {
      commands2.push("get_item_list");
    }
    if (this.getItemInfo !== _WcpServer.prototype.getItemInfo) {
      commands2.push("get_item_info");
    }
    if (this.setItemColor !== _WcpServer.prototype.setItemColor) {
      commands2.push("set_item_color");
    }
    if (this.addItems !== _WcpServer.prototype.addItems) {
      commands2.push("add_items");
    }
    if (this.removeItems !== _WcpServer.prototype.removeItems) {
      commands2.push("remove_items");
    }
    if (this.focusItem !== _WcpServer.prototype.focusItem) {
      commands2.push("focus_item");
    }
    if (this.addMarkers !== _WcpServer.prototype.addMarkers) {
      commands2.push("add_markers");
    }
    if (this.setViewportTo !== _WcpServer.prototype.setViewportTo) {
      commands2.push("set_viewport_to");
    }
    if (this.setViewportRange !== _WcpServer.prototype.setViewportRange) {
      commands2.push("set_viewport_range");
    }
    if (this.zoomToFit !== _WcpServer.prototype.zoomToFit) {
      commands2.push("zoom_to_fit");
    }
    if (this.setCursor !== _WcpServer.prototype.setCursor) {
      commands2.push("set_cursor");
    }
    if (this.load !== _WcpServer.prototype.load) {
      commands2.push("load");
    }
    if (this.reload !== _WcpServer.prototype.reload) {
      commands2.push("reload");
    }
    if (this.clear !== _WcpServer.prototype.clear) {
      commands2.push("clear");
    }
    if (this.shutdown !== _WcpServer.prototype.shutdown) {
      commands2.push("shutdown");
    }
    return commands2;
  }
};
function unsupportedWcpCommand(command) {
  return { type: "error", message: `Unsupported WCP command: ${command}` };
}
async function dispatchWcpCommand(server, command) {
  switch (command.command) {
    case "get_item_list":
      return server.getItemList();
    case "get_item_info":
      return server.getItemInfo({
        ids: command.ids
      });
    case "set_item_color":
      return server.setItemColor({
        id: command.id,
        color: command.color
      });
    case "add_items":
      return server.addItems({
        items: command.items,
        recursive: command.recursive
      });
    case "remove_items":
      return server.removeItems({
        ids: command.ids
      });
    case "focus_item":
      return server.focusItem({
        id: command.id
      });
    case "add_markers":
      return server.addMarkers({
        items: command.items
      });
    case "set_viewport_to":
      return server.setViewportTo({
        timestamp: command.timestamp
      });
    case "set_viewport_range":
      return server.setViewportRange({
        start: command.start,
        end: command.end
      });
    case "zoom_to_fit":
      return server.zoomToFit();
    case "set_cursor":
      return server.setCursor({
        timestamp: command.timestamp
      });
    case "load":
      return server.load({
        source: command.source
      });
    case "reload":
      return server.reload();
    case "clear":
      return server.clear();
    case "shutdown":
      return server.shutdown();
    default: {
      const unreachable = command;
      throw new Error(`Unsupported WCP command: ${JSON.stringify(unreachable)}`);
    }
  }
}

// vaporview/src/extension_core/wcp/node_tcp_server.ts
var WcpProtocolError = class extends Error {
  constructor(message2) {
    super(message2);
    this.name = "WcpProtocolError";
  }
};
var NodeTcpWcpServer = class _NodeTcpWcpServer {
  constructor(server, handlers, version, greetingTimeoutMs, maxFrameBytes, errorHandler) {
    this.server = server;
    this.handlers = handlers;
    this.version = version;
    this.greetingTimeoutMs = greetingTimeoutMs;
    this.maxFrameBytes = maxFrameBytes;
    this.errorHandler = errorHandler;
    this.supportedCommands = handlers.supportedCommands;
  }
  connections = /* @__PURE__ */ new Set();
  supportedCommands;
  closePromise;
  static async listen(options, handlers) {
    const netServer = createServer();
    const wcpServer = new _NodeTcpWcpServer(
      netServer,
      handlers,
      options.version ?? "0",
      options.greetingTimeoutMs ?? 2e3,
      options.maxFrameBytes ?? 16 * 1024 * 1024,
      options.onError
    );
    netServer.on("connection", (socket) => wcpServer.accept(socket));
    await new Promise((resolve2, reject) => {
      const onError = (error) => {
        netServer.off("listening", onListening);
        reject(error);
      };
      const onListening = () => {
        netServer.off("error", onError);
        resolve2();
      };
      netServer.once("error", onError);
      netServer.once("listening", onListening);
      netServer.listen(options.port, options.host ?? "127.0.0.1");
    });
    netServer.on("error", (error) => wcpServer.reportError(error));
    return wcpServer;
  }
  get port() {
    const address = this.server.address();
    if (!address || typeof address === "string") {
      throw new Error("WCP server is not listening on a TCP port");
    }
    return address.port;
  }
  get connectionCount() {
    return this.connections.size;
  }
  broadcast(event) {
    let recipients = 0;
    for (const connection of this.connections) {
      if (connection.greeting?.commands.includes(event.event) && !connection.socket.destroyed) {
        try {
          this.writeMessage(connection.socket, event);
          recipients += 1;
        } catch (error) {
          this.abort(connection, this.asError(error));
        }
      }
    }
    return recipients;
  }
  close() {
    if (this.closePromise) {
      return this.closePromise;
    }
    for (const connection of this.connections) {
      connection.socket.destroy();
    }
    this.closePromise = new Promise((resolve2, reject) => {
      this.server.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve2();
        }
      });
    });
    return this.closePromise;
  }
  accept(socket) {
    socket.setNoDelay(true);
    const connection = {
      socket,
      buffer: Buffer.alloc(0),
      commandQueue: Promise.resolve()
    };
    connection.greetingTimer = setTimeout(() => {
      this.abort(
        connection,
        new WcpProtocolError("Timed out waiting for WCP client greeting")
      );
    }, this.greetingTimeoutMs);
    this.connections.add(connection);
    socket.on("data", (data) => this.handleData(connection, data));
    socket.on("error", (error) => {
      this.reportError(error);
      socket.destroy();
    });
    socket.once("close", () => {
      if (connection.greetingTimer) {
        clearTimeout(connection.greetingTimer);
      }
      this.connections.delete(connection);
    });
  }
  handleData(connection, data) {
    connection.buffer = Buffer.concat([connection.buffer, data]);
    let delimiter = connection.buffer.indexOf(0);
    while (delimiter >= 0) {
      if (delimiter > this.maxFrameBytes) {
        this.abort(
          connection,
          new WcpProtocolError(
            `WCP message exceeds ${this.maxFrameBytes} byte frame limit`
          )
        );
        return;
      }
      const frame = connection.buffer.subarray(0, delimiter);
      connection.buffer = connection.buffer.subarray(delimiter + 1);
      if (frame.length !== 0) {
        try {
          this.handleFrame(connection, frame);
        } catch (error) {
          this.abort(connection, this.asError(error));
        }
      }
      if (connection.socket.destroyed) {
        return;
      }
      delimiter = connection.buffer.indexOf(0);
    }
    if (connection.buffer.length > this.maxFrameBytes) {
      this.abort(
        connection,
        new WcpProtocolError(
          `WCP message exceeds ${this.maxFrameBytes} byte frame limit`
        )
      );
    }
  }
  handleFrame(connection, frame) {
    let message2;
    try {
      message2 = JSON.parse(frame.toString("utf8"));
    } catch (error) {
      this.rejectMessage(connection, `Invalid WCP JSON: ${this.asError(error).message}`);
      return;
    }
    if (typeof message2 !== "object" || message2 === null || !("type" in message2) || typeof message2.type !== "string") {
      this.rejectMessage(connection, "Received malformed WCP message");
      return;
    }
    if (!connection.greeting) {
      this.handleGreeting(connection, message2);
      return;
    }
    if (message2.type !== "command" || !("command" in message2) || typeof message2.command !== "string") {
      this.enqueueError(connection, "Expected a WCP command");
      return;
    }
    this.enqueueCommand(connection, message2);
  }
  handleGreeting(connection, message2) {
    if (message2.type !== "greeting" || !("version" in message2) || typeof message2.version !== "string" || !("commands" in message2) || !Array.isArray(message2.commands) || !message2.commands.every((command) => typeof command === "string")) {
      this.rejectMessage(connection, "Expected a valid WCP greeting");
      return;
    }
    if (message2.version !== this.version) {
      this.rejectMessage(
        connection,
        `Unsupported WCP version ${message2.version}; expected ${this.version}`
      );
      return;
    }
    if (connection.greetingTimer) {
      clearTimeout(connection.greetingTimer);
      connection.greetingTimer = void 0;
    }
    connection.greeting = message2;
    this.writeMessage(connection.socket, {
      type: "greeting",
      version: this.version,
      commands: [...this.supportedCommands]
    });
  }
  rejectMessage(connection, message2) {
    if (connection.greeting) {
      this.enqueueError(connection, message2);
      return;
    }
    try {
      this.writeMessage(connection.socket, { type: "error", message: message2 });
      connection.socket.end();
    } catch (error) {
      this.abort(connection, this.asError(error));
    }
  }
  enqueueError(connection, message2) {
    this.enqueueResponse(connection, async () => ({ type: "error", message: message2 }));
  }
  enqueueCommand(connection, command) {
    this.enqueueResponse(connection, async () => {
      try {
        return await dispatchWcpCommand(this.handlers, command);
      } catch (error) {
        return { type: "error", message: this.asError(error).message };
      }
    });
  }
  enqueueResponse(connection, response) {
    connection.commandQueue = connection.commandQueue.then(async () => {
      const message2 = await response();
      if (!connection.socket.destroyed) {
        this.writeMessage(connection.socket, message2);
      }
    }).catch((error) => this.abort(connection, this.asError(error)));
  }
  writeMessage(socket, message2) {
    const frame = Buffer.from(`${JSON.stringify(message2)}\0`, "utf8");
    if (frame.length - 1 > this.maxFrameBytes) {
      throw new WcpProtocolError(
        `WCP message exceeds ${this.maxFrameBytes} byte frame limit`
      );
    }
    socket.write(frame);
  }
  abort(connection, error) {
    connection.socket.destroy(error);
  }
  reportError(error) {
    this.errorHandler?.(error);
  }
  asError(error) {
    return error instanceof Error ? error : new Error(String(error));
  }
};

// vaporview/src/extension_core/wcp_server.ts
var ACK_RESPONSE = { type: "response", command: "ack" };
async function waitForDocument(viewerProvider, uri) {
  const timeoutAt = Date.now() + 6e5;
  while (Date.now() < timeoutAt) {
    const document = viewerProvider.getDocumentFromUri(uri);
    if (document?.webviewInitialized) {
      return document;
    }
    await new Promise((resolve2) => setTimeout(resolve2, 100));
  }
  throw new Error(`Timed out waiting for waveform viewer: ${uri}`);
}
var VaporviewWcpServer = class extends WcpServer {
  constructor(viewerProvider, session) {
    super();
    this.viewerProvider = viewerProvider;
    this.session = session;
  }
  getItemList() {
    return {
      type: "response",
      command: "get_item_list",
      ids: this.getDocument().getDisplayedNetlistIds()
    };
  }
  getItemInfo(params) {
    const document = this.getDocument();
    return {
      type: "response",
      command: "get_item_info",
      results: params.ids.map((id) => {
        const netlistId = this.getNetlistId(id);
        const item = document.netlistIdTable[netlistId];
        if (!item) {
          throw new Error(`Item not found: ${id}`);
        }
        return { name: item.instancePath(), type: item.type, id };
      })
    };
  }
  setItemColor(params) {
    const document = this.getDocument();
    const netlistId = this.getNetlistId(params.id);
    const item = document.netlistIdTable[netlistId];
    if (!item) {
      throw new Error(`Item not found: ${params.id}`);
    }
    if (item.contextValue === "netlistScope") {
      throw new Error("Cannot set color for scope items");
    }
    if (!document.isSignalDisplayed(netlistId)) {
      throw new Error(`Signal is not displayed: ${params.id}`);
    }
    const colorIndex = (/* @__PURE__ */ new Map([
      ["green", 0],
      ["orange", 1],
      ["blue", 2],
      ["purple", 3],
      ["custom1", 4],
      ["custom2", 5],
      ["custom3", 6],
      ["custom4", 7]
    ])).get(params.color.toLowerCase());
    if (colorIndex !== void 0) {
      this.viewerProvider.setValueFormat({ netlistId }, 0, { colorIndex });
    }
    return ACK_RESPONSE;
  }
  async addItems(params) {
    const document = this.getDocument();
    const ids = [];
    for (const path6 of params.items) {
      const item = await this.viewerProvider.getNetlistItemFromSignalName(document, path6);
      if (!item) {
        continue;
      }
      if (item.contextValue === "netlistVar") {
        ids.push(item.netlistId);
        continue;
      }
      const scopes = [item];
      while (scopes.length > 0) {
        const scope = scopes.shift();
        const children = await document.getScopeChildren(scope);
        for (const child of children) {
          if (child.contextValue === "netlistVar") {
            ids.push(child.netlistId);
          } else if (params.recursive && child.contextValue === "netlistScope") {
            scopes.push(child);
          }
        }
      }
    }
    if (ids.length === 0) {
      throw new Error("No matching items were found");
    }
    await document.renderSignals(ids, [], void 0);
    await this.waitForItemsDisplayed(document, ids);
    document.reveal();
    return { type: "response", command: "add_items", ids };
  }
  removeItems(params) {
    const document = this.getDocument();
    for (const id of params.ids) {
      const netlistId = this.getNetlistId(id);
      if (document.isSignalDisplayed(netlistId)) {
        document.removeSignalFromWebview(netlistId, void 0, false);
      }
    }
    return ACK_RESPONSE;
  }
  focusItem(params) {
    const document = this.getDocument();
    const netlistId = this.getNetlistId(params.id);
    if (!document.netlistIdTable[netlistId]) {
      throw new Error(`Item not found: ${params.id}`);
    }
    if (!document.isSignalDisplayed(netlistId)) {
      throw new Error(`Signal is not displayed: ${params.id}`);
    }
    document.reveal();
    document.revealSignalInWebview(netlistId);
    return ACK_RESPONSE;
  }
  async setViewportTo(params) {
    const document = this.getDocument();
    if (params.timestamp < 0 || params.timestamp > document.metadata.timeEnd) {
      throw new Error(`Time ${params.timestamp} is out of bounds (0 to ${document.metadata.timeEnd})`);
    }
    if (!document.webviewPanel) {
      throw new Error("Webview not available");
    }
    await document.webviewPanel.webview.postMessage({
      command: "setViewportTo",
      time: params.timestamp
    });
    return ACK_RESPONSE;
  }
  async setViewportRange(params) {
    const document = this.getDocument();
    if (params.start < 0 || params.end > document.metadata.timeEnd || params.start >= params.end) {
      throw new Error(
        `Invalid time range: ${params.start} to ${params.end} (valid range: 0 to ${document.metadata.timeEnd})`
      );
    }
    if (!document.webviewPanel) {
      throw new Error("Webview not available");
    }
    await document.webviewPanel.webview.postMessage({
      command: "setViewportRange",
      startTime: params.start,
      endTime: params.end
    });
    return ACK_RESPONSE;
  }
  async zoomToFit() {
    const document = this.getDocument();
    await commands.executeCommand("vaporview.zoomToFit", { uri: document.uri });
    return ACK_RESPONSE;
  }
  async setCursor(params) {
    const document = this.getDocument();
    if (params.timestamp < 0 || params.timestamp > document.metadata.timeEnd) {
      throw new Error(`Time ${params.timestamp} is out of bounds (0 to ${document.metadata.timeEnd})`);
    }
    if (!document.webviewPanel) {
      throw new Error("Webview not available");
    }
    await document.webviewPanel.webview.postMessage({
      command: "setMarker",
      time: params.timestamp,
      markerType: 0
    });
    return ACK_RESPONSE;
  }
  async load(params) {
    const parsed = Uri.parse(params.source);
    const uri = parsed.scheme === "file" ? Uri.file(parsed.fsPath) : Uri.file(params.source);
    await fs4.promises.access(uri.fsPath, fs4.constants.F_OK);
    this.session.documentUri = uri.toString();
    void this.loadDocumentAndSendEvent(uri, params.source).catch((error) => {
      this.viewerProvider.log.appendLine(
        `WCP: Error loading document ${params.source}: ${error instanceof Error ? error.message : String(error)}`
      );
    });
    return ACK_RESPONSE;
  }
  async reload() {
    const document = this.getDocument();
    await commands.executeCommand("vaporview.reloadFile", document.uri);
    void this.waitForDocumentAndSendEvent(document.uri.toString(), document.uri.toString());
    return ACK_RESPONSE;
  }
  clear() {
    const document = this.getDocument();
    for (const id of document.getDisplayedNetlistIds()) {
      document.removeSignalFromWebview(id, void 0, false);
    }
    return ACK_RESPONSE;
  }
  shutdown() {
    setImmediate(() => {
      void this.session.shutdown().catch((error) => {
        this.viewerProvider.log.appendLine(
          `WCP server error while stopping: ${error instanceof Error ? error.message : String(error)}`
        );
      });
    });
    return ACK_RESPONSE;
  }
  getDocument() {
    if (!this.session.documentUri) {
      throw new Error("No waveform is loaded");
    }
    const document = this.viewerProvider.getDocumentFromUri(this.session.documentUri);
    if (!document) {
      throw new Error(`Waveform is not open: ${this.session.documentUri}`);
    }
    return document;
  }
  getNetlistId(id) {
    if (typeof id !== "number") {
      throw new Error(`Vaporview does not recognize displayed item reference ${id}`);
    }
    return id;
  }
  async loadDocumentAndSendEvent(uri, source) {
    await commands.executeCommand("vaporview.openFile", {
      uri,
      loadAll: false,
      maxSignals: 64
    });
    await this.waitForDocumentAndSendEvent(uri.toString(), source);
  }
  async waitForDocumentAndSendEvent(uri, source) {
    await waitForDocument(this.viewerProvider, uri);
    this.session.sendEvent({ type: "event", event: "waveforms_loaded", source });
  }
  async waitForItemsDisplayed(document, ids) {
    const timeoutAt = Date.now() + 3e4;
    while (Date.now() < timeoutAt) {
      const displayedIds = new Set(document.getDisplayedNetlistIds());
      if (ids.every((id) => displayedIds.has(id))) {
        return;
      }
      await new Promise((resolve2) => setTimeout(resolve2, 25));
    }
    throw new Error("Timed out waiting for VaporView to display WCP items");
  }
};
var WCPServer = class {
  constructor(viewerProvider, context) {
    this.viewerProvider = viewerProvider;
    context.subscriptions.push(this.subscribeToCursorEvents());
  }
  documentServers = /* @__PURE__ */ new Map();
  configuredListener;
  configuredPort;
  configurationUpdate = Promise.resolve();
  dispose() {
    const servers = [
      ...this.documentServers.values(),
      ...this.configuredListener ? [this.configuredListener] : []
    ];
    this.documentServers.clear();
    this.configuredListener = void 0;
    this.configuredPort = void 0;
    void Promise.all(servers.map(({ server }) => server.close())).catch((error) => {
      this.viewerProvider.log.appendLine(
        `WCP server error while stopping: ${error instanceof Error ? error.message : String(error)}`
      );
    });
  }
  updateConfiguration() {
    this.configurationUpdate = this.configurationUpdate.then(() => this.applyConfiguration()).catch((error) => {
      this.viewerProvider.log.appendLine(
        `WCP server configuration error: ${error instanceof Error ? error.message : String(error)}`
      );
    });
    return this.configurationUpdate;
  }
  async openWaveform(uri) {
    await commands.executeCommand("vscode.openWith", uri, "vaporview.waveformViewer");
    const document = await waitForDocument(this.viewerProvider, uri.toString());
    document.reveal();
    const key = uri.toString();
    let listener = this.documentServers.get(key);
    if (!listener) {
      const newListener = await this.createListener(key, 0, async () => {
        if (this.documentServers.get(key) === newListener) {
          this.documentServers.delete(key);
        }
        await newListener.server.close();
      });
      listener = newListener;
      this.documentServers.set(key, listener);
      this.viewerProvider.log.appendLine(
        `WCP endpoint for ${uri.fsPath} started on TCP port ${listener.server.port}`
      );
    }
    return { host: "127.0.0.1", port: listener.server.port };
  }
  async applyConfiguration() {
    const config = workspace.getConfiguration("vaporview");
    const enabled = config.get("wcp.enabled", false);
    const port = config.get("wcp.port", 54322);
    if (!enabled) {
      if (this.configuredListener) {
        const listener2 = this.configuredListener;
        this.configuredListener = void 0;
        this.configuredPort = void 0;
        await listener2.server.close();
        this.viewerProvider.log.appendLine("Configured WCP endpoint stopped");
      }
      return;
    }
    if (this.configuredListener && this.configuredPort === port) {
      return;
    }
    if (this.configuredListener) {
      await this.configuredListener.server.close();
      this.configuredListener = void 0;
      this.configuredPort = void 0;
    }
    const listener = await this.createListener(void 0, port, async () => {
      if (this.configuredListener === listener) {
        this.configuredListener = void 0;
        this.configuredPort = void 0;
      }
      await listener.server.close();
    });
    this.configuredListener = listener;
    this.configuredPort = port;
    this.viewerProvider.log.appendLine(
      `Configured WCP endpoint started on 127.0.0.1:${listener.server.port}`
    );
  }
  async createListener(documentUri, port, shutdown) {
    const session = {
      documentUri,
      sendEvent: () => void 0,
      shutdown
    };
    const server = await NodeTcpWcpServer.listen(
      {
        port,
        onError: (error) => this.viewerProvider.log.appendLine(`WCP server error: ${error.message}`)
      },
      new VaporviewWcpServer(this.viewerProvider, session)
    );
    session.sendEvent = (event) => {
      server.broadcast(event);
    };
    return { server, session };
  }
  subscribeToCursorEvents() {
    return WaveformViewerProvider.markerSetEventEmitter.event((event) => {
      const document = this.viewerProvider.getDocumentFromUri(event.uri);
      if (!document) {
        return;
      }
      const timeUnit = scaleFromUnits(document.metadata.timeUnit);
      const eventUnit = scaleFromUnits(event.units);
      if (!timeUnit || !eventUnit || !document.metadata.timeScale) {
        return;
      }
      const timestamp = Math.round(event.time * eventUnit / (timeUnit * document.metadata.timeScale));
      for (const listener of [
        ...this.documentServers.values(),
        ...this.configuredListener ? [this.configuredListener] : []
      ]) {
        if (listener.session.documentUri === event.uri) {
          listener.server.broadcast({ type: "event", event: "cursor_set", timestamp });
        }
      }
    });
  }
};

// vaporview/src/extension_core/extension.ts
async function activate(context) {
  const binaryFile = Uri.joinPath(context.extensionUri, "target", "wasm32-unknown-unknown", "release", "filehandler.wasm");
  const binaryData = await workspace.fs.readFile(binaryFile);
  const wasmModule = await WebAssembly.compile(new Uint8Array(binaryData));
  const outputLog = window.createOutputChannel("Vaporview", { log: true });
  context.subscriptions.push(outputLog);
  const documentCollection = new VaporviewDocumentCollection(outputLog);
  const viewerProvider = new WaveformViewerProvider(context, outputLog, wasmModule, documentCollection);
  window.registerCustomEditorProvider(
    "vaporview.waveformViewer",
    viewerProvider,
    {
      webviewOptions: {
        retainContextWhenHidden: true
      },
      supportsMultipleEditorsPerDocument: false
    }
  );
  const wcpServer = new WCPServer(viewerProvider, context);
  context.subscriptions.push(wcpServer);
  context.subscriptions.push(workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration("vaporview.wcp.enabled") || e.affectsConfiguration("vaporview.wcp.port")) {
      void wcpServer.updateConfiguration();
    }
    if (e.affectsConfiguration("workbench.colorTheme")) {
      documentCollection.getTokenColorsForTheme();
    }
    documentCollection.updateConfiguration(e);
  }));
  window.registerTerminalLinkProvider(new TimestampLinkProvider(viewerProvider));
  const markerSetEvent = WaveformViewerProvider.markerSetEventEmitter.event;
  const signalSelectEvent = WaveformViewerProvider.signalSelectEventEmitter.event;
  const addVariableEvent = WaveformViewerProvider.addVariableEventEmitter.event;
  const removeVariableEvent = WaveformViewerProvider.removeVariableEventEmitter.event;
  const valueLinkEvent = WaveformViewerProvider.valueLinkEventEmitter.event;
  const externalDropEvent = WaveformViewerProvider.externalDropEventEmitter.event;
  registerVaporviewCommands(context, outputLog, viewerProvider, documentCollection, wcpServer);
  await wcpServer.updateConfiguration();
  outputLog.appendLine("Vaporview Activated");
  commands.executeCommand("setContext", "vaporview.activated", true);
  const api = {
    // Events
    onDidSetMarker: markerSetEvent,
    onDidSelectSignal: signalSelectEvent,
    onDidAddVariable: addVariableEvent,
    onDidRemoveVariable: removeVariableEvent,
    onDidDropInWaveformViewer: externalDropEvent,
    onDidClickSignalValueLink: valueLinkEvent,
    // Commands
    async openFile(args) {
      await viewerProvider.openFileCommand(args);
    },
    async addVariable(args) {
      viewerProvider.variableActionCommandHandler(args, "add");
    },
    async removeVariable(args) {
      viewerProvider.variableActionCommandHandler(args, "remove");
    },
    async revealInNetlistView(args) {
      viewerProvider.variableActionCommandHandler(args, "reveal");
    },
    async addSignalValueLink(args) {
      viewerProvider.variableActionCommandHandler(args, "addLink");
    },
    setMarker(args) {
      viewerProvider.markerCommandHandler(args);
    },
    async getOpenDocuments() {
      return viewerProvider.getAllDocumentUris();
    },
    async getViewerState(args) {
      const document = viewerProvider.getDocumentFromOptionalUri(args?.uri);
      if (!document) {
        return void 0;
      }
      return document.getWebviewSession();
    },
    async loadViewerState(args) {
      await viewerProvider.loadViewerStateCommand(args);
    },
    async getValuesAtTime(args) {
      const document = viewerProvider.getDocumentFromOptionalUri(args.uri);
      if (!document) {
        return [];
      }
      return document.getValuesAtTime(args);
    },
    async addVariableByInstancePath(args) {
      viewerProvider.addVariableByInstancePathToDocument(args);
    }
  };
  return api;
}

// src/worker/main.ts
init_vscode();

// src/common/codec.ts
var BYTES_KEY = "$bytes";
var MIN_BYTE_ARRAY = 256;
function isByteArray(value) {
  if (!Array.isArray(value) || value.length < MIN_BYTE_ARRAY) {
    return false;
  }
  for (let i = 0; i < value.length; i++) {
    const v = value[i];
    if (typeof v !== "number" || v < 0 || v > 255 || (v | 0) !== v) {
      return false;
    }
  }
  return true;
}
function toBase64(bytes) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength).toString("base64");
  }
  let s = "";
  for (let i = 0; i < bytes.length; i += 32768) {
    s += String.fromCharCode(...bytes.subarray(i, i + 32768));
  }
  return btoa(s);
}
function replacer(_key, value) {
  if (value instanceof Uint8Array) {
    return { [BYTES_KEY]: toBase64(value), typed: true };
  }
  if (isByteArray(value)) {
    return { [BYTES_KEY]: toBase64(Uint8Array.from(value)) };
  }
  return value;
}
function encodeMessages(messages, maxChars) {
  const parts = [];
  let size = 2;
  for (const message2 of messages) {
    const text = JSON.stringify(message2, replacer) ?? "null";
    if (parts.length > 0 && size + text.length + 1 > maxChars) {
      break;
    }
    parts.push(text);
    size += text.length + 1;
  }
  return { json: `[${parts.join(",")}]`, count: parts.length };
}

// src/common/when.ts
function tokenize(source) {
  const tokens = [];
  let i = 0;
  while (i < source.length) {
    const c = source[i];
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    const two = source.slice(i, i + 2);
    const three = source.slice(i, i + 3);
    if (three === "===" || three === "!==") {
      tokens.push({ type: "op", text: three.slice(0, 2) });
      i += 3;
      continue;
    }
    if (["||", "&&", "==", "!=", ">=", "<=", "=~"].includes(two)) {
      tokens.push({ type: "op", text: two });
      i += 2;
      continue;
    }
    if ("()!<>".includes(c)) {
      tokens.push({ type: "op", text: c });
      i++;
      continue;
    }
    if (c === "'" || c === '"') {
      const end = source.indexOf(c, i + 1);
      const stop = end < 0 ? source.length : end;
      tokens.push({ type: "value", text: source.slice(i + 1, stop), quoted: true });
      i = stop + 1;
      continue;
    }
    if (c === "/" && tokens.at(-1)?.text === "=~") {
      const end = source.indexOf("/", i + 1);
      const stop = end < 0 ? source.length : end;
      let flags = "";
      let j2 = stop + 1;
      while (j2 < source.length && /[a-z]/.test(source[j2])) {
        flags += source[j2++];
      }
      tokens.push({ type: "regex", text: source.slice(i + 1, stop) + "\0" + flags });
      i = j2;
      continue;
    }
    let j = i;
    while (j < source.length && !/[\s()!=<>|&]/.test(source[j])) {
      j++;
    }
    if (j === i) {
      i++;
      continue;
    }
    tokens.push({ type: "value", text: source.slice(i, j) });
    i = j;
  }
  return tokens;
}
function evaluateWhen(clause, context) {
  if (!clause || !clause.trim()) {
    return true;
  }
  const tokens = tokenize(clause);
  let pos = 0;
  const peek = () => tokens[pos];
  const isOp = (text) => peek()?.type === "op" && peek().text === text;
  const or = () => {
    let value = and();
    while (isOp("||")) {
      pos++;
      const right = and();
      value = value || right;
    }
    return value;
  };
  const and = () => {
    let value = unary();
    while (isOp("&&")) {
      pos++;
      const right = unary();
      value = value && right;
    }
    return value;
  };
  const unary = () => {
    if (isOp("!")) {
      pos++;
      return !unary();
    }
    if (isOp("(")) {
      pos++;
      const value = or();
      if (isOp(")")) {
        pos++;
      }
      return value;
    }
    return comparison();
  };
  const comparison = () => {
    const left = tokens[pos++];
    if (!left || left.type !== "value") {
      return false;
    }
    const actual = left.quoted ? left.text : context[left.text];
    const op = peek();
    if (!op || op.type !== "op" || !["==", "!=", ">", ">=", "<", "<=", "=~"].includes(op.text)) {
      if (left.quoted) {
        return left.text.length > 0;
      }
      if (left.text === "true") {
        return true;
      }
      if (left.text === "false") {
        return false;
      }
      return Boolean(actual);
    }
    pos++;
    const right = tokens[pos++];
    if (!right) {
      return false;
    }
    if (op.text === "=~") {
      const [pattern, flags] = right.text.split("\0");
      try {
        return new RegExp(pattern, flags ?? "").test(String(actual ?? ""));
      } catch {
        return false;
      }
    }
    if (op.text === "==") {
      return String(actual) === right.text;
    }
    if (op.text === "!=") {
      return String(actual) !== right.text;
    }
    const a = Number(actual);
    const b = Number(right.text);
    if (Number.isNaN(a) || Number.isNaN(b)) {
      return false;
    }
    return op.text === ">" ? a > b : op.text === ">=" ? a >= b : op.text === "<" ? a < b : a <= b;
  };
  try {
    return or();
  } catch {
    return false;
  }
}

// src/worker/menus.ts
function splitGroup(group) {
  if (!group) {
    return { name: "", order: 0 };
  }
  const at = group.lastIndexOf("@");
  if (at < 0) {
    return { name: group, order: 0 };
  }
  return { name: group.slice(0, at), order: Number(group.slice(at + 1)) || 0 };
}
var UNAVAILABLE_COMMANDS = {
  "vaporview.newSignalFromBitRange": "input box",
  "vaporview.createSignalsForAllCustomLength": "input box",
  "vaporview.setRulerTimeIncrement": "input box",
  "vaporview.displayAsFixedPoint": "input box",
  "vaporview.displayAsFixedPointSigned": "input box",
  "vaporview.addVariableByInstancePath": "input box",
  "vaporview.saveViewerSession": "file dialog",
  "vaporview.loadViewerSession": "file dialog",
  "vaporview.viewVaporViewSettings": "VS Code settings page",
  "vaporview.showReadme": "VS Code markdown preview",
  "vaporview.openRemoteViewer": "input box, and remote access is deferred"
};
var MENU_ICONS = {
  // tree
  "vaporview.searchScope": "search",
  "vaporview.addSelected": "plus",
  "vaporview.removeSelectedNetlist": "minus",
  "vaporview.addAllInScopeShallow": "list-plus",
  "vaporview.addAllInScopeRecursive": "list-tree",
  "vaporview.removeAllInScope": "list-x",
  // "Show in Viewer" and "Show in Netlist View" have one icon. Orca uses it for "Reveal active workspace".
  "vaporview.showInViewer": "crosshair",
  "vaporview.copyName": "copy",
  "vaporview.reloadFile": "refresh-cw",
  // viewer: signal
  "vaporview.valueFormat": "hash",
  "vaporview.renderType": "chart-line",
  "vaporview.highlightEdge": "trending-up",
  "vaporview.valueColor": "palette",
  "vaporview.rowHeight": "unfold-vertical",
  "vaporview.nameType": "tag",
  "vaporview.increaseVerticalScale": "zoom-in",
  "vaporview.decreaseVerticalScale": "zoom-out",
  "vaporview.resetVerticalScale": "rotate-ccw",
  "vaporview.removeSignal": "trash",
  "vaporview.showInNetlistView": "crosshair",
  "vaporview.copyValueAtMarker": "clipboard-copy",
  "vaporview.renameSignalGroup": "pencil",
  "vaporview.ungroupSignals": "ungroup",
  "vaporview.deleteGroup": "trash",
  "vaporview.removeSeparator": "trash",
  "vaporview.newSignalGroup": "folder-plus",
  "vaporview.newGroupFromSelection": "group",
  "vaporview.newSeparator": "separator-horizontal",
  "vaporview.createSignals": "split",
  "vaporview.waveDrom": "audio-waveform",
  "vaporview.copyWaveDrom": "copy",
  "vaporview.setWaveDromClockRising": "trending-up",
  "vaporview.setWaveDromClockFalling": "trending-down",
  "vaporview.unsetWaveDromClock": "x",
  // viewer: ruler
  "vaporview.timeUnit": "timer",
  "vaporview.rulerTimeIncrement": "ruler",
  "vaporview.scrollMode": "mouse",
  "vaporview.showRulerLines": "grid-3x3",
  "vaporview.hideRulerLines": "grid-3x3",
  "vaporview.fillBitVector": "paint-bucket",
  "vaporview.outlineBitVector": "square-dashed",
  "vaporview.enableAnimations": "zap",
  "vaporview.disableAnimations": "zap-off"
};
var DANGER_COMMANDS = /* @__PURE__ */ new Set([
  "vaporview.removeSignal",
  "vaporview.deleteGroup",
  "vaporview.removeSeparator",
  "vaporview.removeSelectedNetlist",
  "vaporview.removeAllInScope"
]);
function formatShortcut(key, mac) {
  const names = mac ? { ctrl: "\u2303", shift: "\u21E7", alt: "\u2325", cmd: "\u2318", meta: "\u2318" } : { ctrl: "Ctrl", shift: "\u21E7", alt: "Alt", cmd: "Win", meta: "Win" };
  const parts = key.toLowerCase().split("+").filter(Boolean);
  const last = key.endsWith("+") ? "+" : parts.pop() ?? "";
  const keyName = last.startsWith("numpad_") ? `Num ${last.slice(7)}` : last.length === 1 ? last.toUpperCase() : last[0].toUpperCase() + last.slice(1);
  const mods = parts.map((p) => names[p] ?? p);
  return mac ? [...mods, keyName].join("") : [...mods, keyName].join("+");
}
var Menus = class {
  titles = /* @__PURE__ */ new Map();
  icons = /* @__PURE__ */ new Map();
  submenus = /* @__PURE__ */ new Map();
  menus;
  keybindings;
  shortcuts = /* @__PURE__ */ new Map();
  constructor(packageJson) {
    const c = packageJson?.contributes ?? {};
    for (const command of c.commands ?? []) {
      this.titles.set(command.command, command.title);
      const icon = typeof command.icon === "string" ? /^\$\(([^)]+)\)$/.exec(command.icon)?.[1] : void 0;
      if (icon) {
        this.icons.set(command.command, icon);
      }
    }
    for (const sub of c.submenus ?? []) {
      this.submenus.set(sub.id, { label: sub.label, when: sub.when });
    }
    this.menus = c.menus ?? {};
    this.keybindings = (c.keybindings ?? []).filter((k) => !(k.command in UNAVAILABLE_COMMANDS));
    const mac = process.platform === "darwin";
    for (const k of this.keybindings) {
      const key = mac && k.mac || k.key;
      if (!this.shortcuts.has(k.command) || /numpad/.test(this.shortcuts.get(k.command))) {
        this.shortcuts.set(k.command, key);
      }
    }
    for (const [command, key] of this.shortcuts) {
      this.shortcuts.set(command, formatShortcut(key, mac));
    }
  }
  title(command) {
    return this.titles.get(command) ?? command;
  }
  /** The codicon name of a command, for a button. */
  icon(command) {
    return this.icons.get(command) ?? "";
  }
  /**
   * The visible items of a menu. `inline` selects the items that VS Code shows as buttons on a
   * tree row (group "inline"), or leaves them out.
   */
  resolve(menuId, context, inline = "exclude", depth = 0) {
    const groups = /* @__PURE__ */ new Map();
    (this.menus[menuId] ?? []).forEach((raw, index) => {
      const { name, order } = splitGroup(raw.group);
      if (name === "inline" !== (inline === "only")) {
        return;
      }
      if (!evaluateWhen(raw.when, context)) {
        return;
      }
      let entry;
      if (raw.command) {
        if (raw.command in UNAVAILABLE_COMMANDS) {
          return;
        }
        entry = { kind: "item", command: raw.command, title: this.title(raw.command) };
        if (MENU_ICONS[raw.command]) {
          entry.icon = MENU_ICONS[raw.command];
        }
        if (this.shortcuts.has(raw.command)) {
          entry.shortcut = this.shortcuts.get(raw.command);
        }
        if (DANGER_COMMANDS.has(raw.command)) {
          entry.danger = true;
        }
      } else if (raw.submenu && depth < 4) {
        const sub = this.submenus.get(raw.submenu);
        if (!sub || !evaluateWhen(sub.when, context)) {
          return;
        }
        const items = this.resolve(raw.submenu, context, "exclude", depth + 1);
        if (items.length) {
          entry = { kind: "submenu", label: sub.label, items };
          if (MENU_ICONS[raw.submenu]) {
            entry.icon = MENU_ICONS[raw.submenu];
          }
        }
      }
      if (!entry) {
        return;
      }
      if (!groups.has(name)) {
        groups.set(name, []);
      }
      groups.get(name).push({ order, index, entry });
    });
    const names = [...groups.keys()].sort((a, b) => a === "navigation" ? -1 : b === "navigation" ? 1 : a.localeCompare(b));
    const out = [];
    for (const name of names) {
      if (out.length) {
        out.push({ kind: "separator" });
      }
      for (const item of groups.get(name).sort((a, b) => a.order - b.order || a.index - b.index)) {
        out.push(item.entry);
      }
    }
    return out;
  }
};

// src/worker/main.ts
var VIEW_TYPE = "vaporview.waveformViewer";
var TREE_ID = "waveformViewerNetlistView";
var SESSION_DIR = ".vaporview";
var SESSION_SUFFIX = ".vaporview.json";
var WAVEFORM_SUFFIXES = [".vcd", ".fst", ".ghw"];
var EDITOR_ID = "vaporview.waveformViewer";
var SETTING_PREFIX = "vaporview.";
var HIDDEN_MESSAGES = [
  // vaporview reads the colors of the VS Code color theme at its start. Orca has no such theme.
  /^Error getting user theme/,
  // A question with buttons that the person cannot answer in Orca.
  /^Restore state from file:/
];
var ADD_MANY_SIGNALS = /^You are about to add a large number of signals/;
var STATUS_IDS = ["vaporview-marker", "vaporview-delta", "vaporview-signal"];
var POLL_HOLD_MS = 2e4;
var POLL_MIN_SPACING_MS = 150;
var BATCH_MAX_CHARS = 6e5;
var LIVE_PROBE_MS = 800;
var FRAME_START_MS = 2e4;
var FrameLink = class {
  instance;
  // the frame that is connected now
  outbox = [];
  waiting;
  waitTimer;
  lastAnswerAt = 0;
  pollSeen;
  started;
  post(message2) {
    this.outbox.push(message2);
    this.flush();
  }
  /** A new frame connected. Messages for the old frame are of no use to it. */
  connect(instance) {
    this.instance = instance;
    this.outbox = [];
    this.release({ messages: "[]" });
  }
  /** The webview in the frame finished its start. */
  markStarted() {
    this.started?.();
    this.started = void 0;
  }
  poll(instance) {
    if (instance !== this.instance) {
      return Promise.resolve({ messages: "[]", stale: true });
    }
    this.pollSeen?.();
    this.pollSeen = void 0;
    this.release({ messages: "[]" });
    return new Promise((resolve2) => {
      this.waiting = resolve2;
      this.waitTimer = setTimeout(() => this.release({ messages: "[]" }), POLL_HOLD_MS);
      this.flush();
    });
  }
  release(batch) {
    clearTimeout(this.waitTimer);
    const resolve2 = this.waiting;
    this.waiting = void 0;
    if (resolve2) {
      this.lastAnswerAt = Date.now();
      resolve2(batch);
    }
  }
  flushTimer;
  flush() {
    if (!this.waiting || this.outbox.length === 0 || this.flushTimer) {
      return;
    }
    const wait = Math.max(0, this.lastAnswerAt + POLL_MIN_SPACING_MS - Date.now());
    this.flushTimer = setTimeout(() => {
      this.flushTimer = void 0;
      if (!this.waiting || this.outbox.length === 0) {
        return;
      }
      const { json, count } = encodeMessages(this.outbox, BATCH_MAX_CHARS);
      this.outbox.splice(0, count);
      this.release({ messages: json });
    }, wait);
  }
  /** True if the connected frame answers. Orca does not tell the worker when a frame goes away. */
  async isLive() {
    if (!this.instance) {
      return false;
    }
    const seen = new Promise((resolve2) => {
      this.pollSeen = () => resolve2(true);
      setTimeout(() => resolve2(false), LIVE_PROBE_MS);
    });
    this.release({ messages: "[]" });
    return seen;
  }
  whenStarted() {
    return new Promise((resolve2) => {
      this.started = () => resolve2(true);
      setTimeout(() => resolve2(false), FRAME_START_MS);
    });
  }
};
async function activate2(orca) {
  const here = path5.dirname(fileURLToPath(import.meta.url));
  const log = (m) => orca.log(m);
  const token = new CancellationTokenSource().token;
  const entries = /* @__PURE__ */ new Map();
  const activeByWorkspace = /* @__PURE__ */ new Map();
  let currentWorkspace;
  const notify = (level, message2) => {
    log(`[${level}] ${message2}`);
    if (HIDDEN_MESSAGES.some((m) => m.test(message2))) {
      return;
    }
    orca.panels.post("panel.message", { level, message: message2 });
  };
  const ask = async (level, message2, items) => {
    if (ADD_MANY_SIGNALS.test(message2) && items.includes("Yes")) {
      return "Yes";
    }
    notify(level, message2);
    return void 0;
  };
  const SEARCH_MAX_ITEMS = 200;
  let search;
  let searchTimer;
  let settings = {};
  try {
    settings = await orca.settings?.get?.() ?? {};
  } catch (err) {
    log(`settings not available: ${err?.code ?? err}`);
  }
  orca.settings?.onDidChange?.(async () => {
    const before = settings;
    try {
      settings = await orca.settings.get() ?? {};
    } catch {
      return;
    }
    const changed = Object.keys({ ...before, ...settings }).filter((k) => before[k] !== settings[k]);
    if (changed.length) {
      fireConfigurationChanged(changed.map((k) => SETTING_PREFIX + k));
    }
  });
  const statusTimers = /* @__PURE__ */ new Map();
  const statusBarChanged = (item) => {
    const id = STATUS_IDS[item.index];
    if (!id || statusTimers.has(item.index)) {
      return;
    }
    statusTimers.set(item.index, setTimeout(() => {
      statusTimers.delete(item.index);
      const text = item.text.replace(/\$\([^)]*\)\s*/g, "").trim();
      orca.host.call("statusBar.update", { id, text, visible: item.visible && text.length > 0 }).catch(() => void 0);
    }, 150));
  };
  setAdapterHost({
    extensionPath: path5.join(here, "ext"),
    log,
    notify,
    ask,
    executeHostCommand: (command) => {
      log(`[adapter] command not available in Orca: ${command}`);
      return void 0;
    },
    getSetting: (key) => key.startsWith(SETTING_PREFIX) ? settings[key.slice(SETTING_PREFIX.length)] : void 0,
    setSetting: (key, value) => {
      if (!key.startsWith(SETTING_PREFIX)) {
        return;
      }
      settings[key.slice(SETTING_PREFIX.length)] = value;
      orca.settings?.set?.(key.slice(SETTING_PREFIX.length), value)?.catch?.((err) => log(`cannot save setting ${key}: ${err?.code ?? err}`));
    },
    statusBarChanged,
    quickPickChanged: (pick) => searchChanged(pick),
    // The worker has no clipboard. A frame writes the text.
    clipboardWrite: (text) => {
      log(`clipboard: ${text.length} characters, starts with ${JSON.stringify(text.slice(0, 60))}`);
      orca.panels.post("clipboard.write", { text });
    }
  });
  await activate(createExtensionContext());
  const provider = registry.customEditors.get(VIEW_TYPE).provider;
  const tree = registry.treeViews.get(TREE_ID);
  const treeData = tree.options.treeDataProvider;
  const menus = new Menus(JSON.parse(fs5.readFileSync(path5.join(here, "ext", "package.json"), "utf8")));
  log(`vaporview core active: ${registry.commands.size} commands`);
  const contextKeys = () => Object.fromEntries(registry.contextKeys);
  onDidChangeContextKey.listeners.add(() => {
    for (const e of entries.values()) {
      if (e.link.instance) {
        e.link.post({ command: "orca-context", keys: contextKeys() });
      }
    }
    orca.panels.post("tree.context", {});
  });
  async function resolveWorkspace(hint) {
    const focused = await orca.host.call("workspace.readContext").catch(() => null);
    const who = hint ?? focused;
    if (!who) {
      return void 0;
    }
    let workspaces = [];
    try {
      workspaces = (await orca.host.call("workspace.list")).workspaces;
    } catch (err) {
      log(`workspace.list failed: ${err?.code ?? err}`);
    }
    const sameAsFocused = focused && focused.displayName === who.displayName && focused.branch === who.branch;
    const found = (sameAsFocused && focused.workspaceId ? workspaces.find((w) => w.id === focused.workspaceId) : void 0) ?? workspaces.find((w) => w.name === who.displayName && (w.branch ?? "") === who.branch);
    return {
      key: found?.id ?? `${who.displayName}
${who.branch}`,
      id: found?.id,
      name: who.displayName,
      path: found?.path
    };
  }
  const entryKey = (ws, waveformPath) => `${ws.key}
${Uri.file(waveformPath).fsPath}`;
  function listFor(ws) {
    if (!ws) {
      return { workspace: null, waveforms: [], active: null };
    }
    const waveforms = [...entries.values()].filter((e) => e.workspace.key === ws.key).map((e) => ({
      key: e.key,
      name: path5.basename(e.waveformPath),
      folder: path5.dirname(e.waveformPath)
    }));
    return { workspace: ws.name, waveforms, active: activeByWorkspace.get(ws.key) ?? null };
  }
  const panelChanged = () => orca.panels.post("panel.changed", listFor(currentWorkspace));
  let coreActive;
  function setActive(entry) {
    if (entry) {
      activeByWorkspace.set(entry.workspace.key, entry.key);
    }
    if (coreActive !== entry) {
      const before = coreActive;
      coreActive = entry;
      resetTree(true);
      if (before && entries.has(before.key)) {
        before.panel.setViewState(false, false);
      }
      entry?.panel.activate();
    }
    panelChanged();
  }
  const loading = /* @__PURE__ */ new Map();
  const closedKeys = /* @__PURE__ */ new Set();
  function loadWaveform(ws, waveformPath) {
    const key = entryKey(ws, waveformPath);
    const existing = entries.get(key);
    if (existing) {
      return Promise.resolve(existing);
    }
    let pending = loading.get(key);
    if (!pending) {
      pending = createEntry(key, ws, waveformPath).finally(() => loading.delete(key));
      loading.set(key, pending);
    }
    return pending;
  }
  async function createEntry(key, ws, waveformPath) {
    if (!fs5.existsSync(waveformPath)) {
      throw Object.assign(new Error(`File not found: ${waveformPath}`), { code: "action_failed" });
    }
    log(`load ${waveformPath} for workspace ${ws.name}`);
    const link = new FrameLink();
    const entry = { key, workspace: ws, waveformPath, document: void 0, panel: void 0, link, state: void 0 };
    entry.panel = new WebviewPanel(VIEW_TYPE, (m) => link.post(m), () => void showTab(entry));
    entry.document = await provider.openCustomDocument(Uri.file(waveformPath), {}, token);
    await provider.resolveCustomEditor(entry.document, entry.panel, token);
    const file = sessionFileFor(entry);
    if (file) {
      try {
        const { fileName: _f, closed: _c, ...state } = JSON.parse(fs5.readFileSync(file, "utf8"));
        if (Object.keys(state).length) {
          entry.state = state;
        }
      } catch {
      }
    }
    entries.set(key, entry);
    if (coreActive && coreActive !== entry) {
      coreActive.panel.active = false;
      coreActive.panel.visible = false;
    }
    coreActive = entry;
    resetTree(true);
    return entry;
  }
  async function closeWaveform(entry) {
    entries.delete(entry.key);
    closedKeys.add(entry.key);
    clearTimeout(entry.saveTimer);
    writeSession(entry, true);
    if (activeByWorkspace.get(entry.workspace.key) === entry.key) {
      activeByWorkspace.delete(entry.workspace.key);
    }
    entry.link.post({ command: "orca-closed" });
    try {
      entry.panel.dispose();
    } catch (err) {
      log(`panel dispose failed: ${err}`);
    }
    try {
      await entry.document.dispose();
    } catch (err) {
      log(`document dispose failed: ${err}`);
    }
    const next = [...entries.values()].find((e) => e.workspace.key === entry.workspace.key);
    setActive(next);
  }
  function sessionFileFor(entry) {
    if (entry.sessionPath) {
      return entry.sessionPath;
    }
    if (!entry.workspace.path) {
      return void 0;
    }
    const dir = path5.join(entry.workspace.path, SESSION_DIR);
    fs5.mkdirSync(dir, { recursive: true });
    const ignore = path5.join(dir, ".gitignore");
    if (!fs5.existsSync(ignore)) {
      fs5.writeFileSync(ignore, "*\n");
    }
    const base = path5.basename(entry.waveformPath);
    for (let n = 0; n < 100; n++) {
      const candidate = path5.join(dir, `${base}${n ? `.${n}` : ""}${SESSION_SUFFIX}`);
      let owner;
      try {
        owner = JSON.parse(fs5.readFileSync(candidate, "utf8")).fileName;
      } catch {
        owner = void 0;
      }
      if (owner === void 0 || Uri.file(owner).fsPath === Uri.file(entry.waveformPath).fsPath) {
        if (owner === void 0) {
          fs5.writeFileSync(candidate, JSON.stringify({ fileName: entry.waveformPath }, null, 2));
        }
        entry.sessionPath = candidate;
        return candidate;
      }
    }
    return void 0;
  }
  function writeSession(entry, closed = false) {
    const file = sessionFileFor(entry);
    if (!file) {
      return;
    }
    const state = entry.state && typeof entry.state === "object" ? entry.state : {};
    try {
      fs5.writeFileSync(file, JSON.stringify({ ...state, fileName: entry.waveformPath, ...closed ? { closed: true } : {} }, null, 2));
    } catch (err) {
      log(`cannot write the session file: ${err?.message ?? err}`);
    }
  }
  function saveSessionSoon(entry) {
    clearTimeout(entry.saveTimer);
    entry.saveTimer = setTimeout(() => {
      if (entries.has(entry.key)) {
        writeSession(entry);
      }
    }, 800);
  }
  async function showTab(entry) {
    const file = sessionFileFor(entry);
    if (!file || !entry.workspace.id || !entry.workspace.path) {
      throw Object.assign(new Error("Orca did not give the folder of this workspace."), { code: "action_failed" });
    }
    const relative2 = path5.relative(entry.workspace.path, file).split(path5.sep).join("/");
    await orca.host.call("editor.open", { workspaceId: entry.workspace.id, path: relative2 });
  }
  async function ensureFrame(entry) {
    if (await entry.link.isLive()) {
      return;
    }
    const started = entry.link.whenStarted();
    await showTab(entry);
    if (!await started) {
      log("the editor frame did not start in time");
    }
  }
  const fail = (message2) => Object.assign(new Error(message2), { code: "action_failed" });
  const entryOf = (input) => {
    const entry = entries.get(input?.docKey);
    if (!entry) {
      throw Object.assign(new Error("This waveform is closed."), { code: "conflict" });
    }
    return entry;
  };
  orca.panels.handle("editor.hello", async (input) => {
    const ws = await resolveWorkspace(input.workspace);
    if (!ws) {
      throw fail("No workspace has the focus.");
    }
    if (typeof input.fileName !== "string" || !input.fileName) {
      throw fail("The session file names no waveform file.");
    }
    const key = entryKey(ws, input.fileName);
    const known = entries.has(key);
    if (!known && !input.reopen && (closedKeys.has(key) || input.session?.closed === true)) {
      return { closed: true };
    }
    closedKeys.delete(key);
    const entry = await loadWaveform(ws, input.fileName);
    if (!known) {
      writeSession(entry);
    }
    log(`frame ${input.instance} shows ${path5.basename(entry.waveformPath)} (${known ? "open document" : "new document"})`);
    entry.link.connect(input.instance);
    currentWorkspace = ws;
    setActive(entry);
    return {
      docKey: entry.key,
      state: entry.state ?? null,
      uri: entry.document.uri.toString(),
      keybindings: menus.keybindings,
      contextKeys: contextKeys(),
      editorId: EDITOR_ID,
      extname: path5.extname(entry.waveformPath).toLowerCase()
    };
  });
  orca.panels.handle("editor.poll", (input) => {
    const entry = entries.get(input?.docKey);
    if (!entry) {
      return closedKeys.has(input?.docKey) ? { messages: "[]", closed: true } : { messages: "[]", restart: true };
    }
    return entry.link.poll(input.instance);
  });
  orca.panels.handle("editor.focus", (input) => {
    const entry = entries.get(input?.docKey);
    if (entry && input.instance === entry.link.instance) {
      currentWorkspace = entry.workspace;
      setActive(entry);
    }
    return { ok: true };
  });
  orca.panels.handle("editor.send", (input) => {
    const entry = entryOf(input);
    if (input.instance !== entry.link.instance) {
      return { stale: true };
    }
    if ("state" in input) {
      entry.state = input.state;
      saveSessionSoon(entry);
    }
    for (const message2 of input.messages ?? []) {
      if (message2?.command === "initialized") {
        entry.link.markStarted();
      }
      if (message2?.command === "ready" || message2?.command === "restoreState") {
        log(`webview ${input.instance}: ${message2.command}`);
      }
      entry.panel.receiveEmitter.fire(message2);
    }
    return { ok: true };
  });
  let treeItems = /* @__PURE__ */ new Map();
  let treeIds = /* @__PURE__ */ new Map();
  let nextTreeId = 1;
  function resetTree(full = false) {
    if (full) {
      treeItems = /* @__PURE__ */ new Map();
      treeIds = /* @__PURE__ */ new Map();
    }
    orca.panels.post("tree.changed", { full });
  }
  function idOf(element) {
    let id = treeIds.get(element);
    if (!id) {
      id = nextTreeId++;
      treeIds.set(element, id);
      treeItems.set(id, element);
    }
    return id;
  }
  treeData.onDidChangeTreeData?.(() => resetTree(false));
  tree.revealEmitter.event(async ({ element, options }) => {
    const chain = [];
    for (let e = element; e; e = await treeData.getParent?.(e)) {
      chain.unshift(idOf(e));
      if (chain.length > 64) {
        break;
      }
    }
    orca.panels.post("tree.reveal", { path: chain, select: options?.select !== false });
  });
  const treeContext = (item) => ({ ...contextKeys(), view: TREE_ID, viewItem: item.contextValue ?? "" });
  async function describe(element) {
    const item = await treeData.getTreeItem(element);
    const label = typeof item.label === "string" ? item.label : item.label?.label ?? "";
    return {
      id: idOf(element),
      label,
      description: typeof item.description === "string" ? item.description : "",
      expandable: item.collapsibleState !== TreeItemCollapsibleState.None,
      // vaporview records the open state in the element (as VS Code tells it at each expand and
      // collapse). The panel opens such a node, so a waveform gets its open nodes back.
      open: item.collapsibleState === TreeItemCollapsibleState.Expanded,
      kind: item.contextValue ?? "",
      icon: item.iconPath?.id ?? "",
      color: item.iconPath?.color?.id ?? "",
      tooltip: typeof item.tooltip === "string" ? item.tooltip : item.tooltip?.value ?? "",
      // The buttons that VS Code shows on the row (menu group "inline").
      inline: menus.resolve("view/item/context", treeContext(item), "only").flatMap((m) => m.kind === "item" ? [{ command: m.command, title: m.title, icon: menus.icon(m.command) }] : [])
    };
  }
  const activeEntry = () => {
    const key = currentWorkspace && activeByWorkspace.get(currentWorkspace.key);
    return key ? entries.get(key) : void 0;
  };
  orca.panels.handle("tree.children", async (input) => {
    if (!activeEntry()) {
      return { items: [] };
    }
    const parent = input?.id ? treeItems.get(input.id) : void 0;
    if (input?.id && !parent) {
      return { items: [], stale: true };
    }
    const children = await treeData.getChildren(parent) ?? [];
    const title = menus.resolve("view/title", { ...contextKeys(), view: TREE_ID }).flatMap((m) => m.kind === "item" ? [{ command: m.command, title: m.title, icon: menus.icon(m.command) }] : []);
    return { items: await Promise.all(children.map(describe)), title };
  });
  orca.panels.handle("tree.action", async (input) => {
    const entry = activeEntry();
    const element = treeItems.get(input?.id);
    if (!entry) {
      return { stale: true };
    }
    if (input.action === "select") {
      const selection = (input.ids ?? []).map((id) => treeItems.get(id)).filter(Boolean);
      tree.selection = selection;
      tree.selectionEmitter.fire({ selection });
      return { ok: true };
    }
    if (!element) {
      return { stale: true };
    }
    if (input.action === "expand") {
      tree.expandEmitter.fire({ element });
      return { ok: true };
    }
    if (input.action === "collapse") {
      tree.collapseEmitter.fire({ element });
      return { ok: true };
    }
    if (input.action === "click") {
      const item = await treeData.getTreeItem(element);
      if (item.command?.command) {
        await ensureFrame(entry);
        await registry.commands.get(item.command.command)?.(...item.command.arguments ?? []);
      }
      return { ok: true };
    }
    return { ok: false };
  });
  function searchChanged(pick) {
    if (pick.visible) {
      search = pick;
    } else if (search !== pick) {
      return;
    }
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      const p = search;
      if (!p) {
        return;
      }
      orca.panels.post("search.update", {
        visible: p.visible,
        value: p.value,
        title: p.title ?? "",
        placeholder: p.placeholder ?? "",
        busy: p.busy,
        more: Math.max(0, p.items.length - SEARCH_MAX_ITEMS),
        items: p.items.slice(0, SEARCH_MAX_ITEMS).map((item) => ({
          label: String(item.label ?? ""),
          description: String(item.description ?? ""),
          detail: String(item.detail ?? ""),
          icon: item.iconPath?.id ?? "",
          color: item.iconPath?.color?.id ?? ""
        }))
      });
      if (!p.visible) {
        search = void 0;
      }
    }, 30);
  }
  orca.panels.handle("search.input", (input) => {
    search?.userInput(String(input?.value ?? ""));
    return { ok: !!search };
  });
  orca.panels.handle("search.hide", () => {
    search?.hide();
    return { ok: true };
  });
  orca.panels.handle("search.accept", async (input) => {
    const entry = activeEntry();
    if (!search || !entry) {
      return { ok: false };
    }
    await ensureFrame(entry);
    search.userAccept(Number(input?.index));
    return { ok: true };
  });
  orca.panels.handle("menu.webview", (input) => {
    const context = { ...contextKeys(), ...input?.context ?? {}, webviewId: EDITOR_ID, activeCustomEditorId: EDITOR_ID };
    return { items: menus.resolve("webview/context", context) };
  });
  orca.panels.handle("menu.tree", async (input) => {
    const element = treeItems.get(input?.id);
    if (!element) {
      return { items: [] };
    }
    return { items: menus.resolve("view/item/context", treeContext(await treeData.getTreeItem(element))) };
  });
  orca.panels.handle("menu.run", async (input) => {
    const command = registry.commands.get(input?.command);
    if (!command) {
      throw fail(`Command not found: ${input?.command}`);
    }
    if (input.source === "tree") {
      const entry = activeEntry();
      const element = treeItems.get(input.id);
      if (!entry || !element) {
        return { stale: true };
      }
      await ensureFrame(entry);
      const selection = tree.selection.includes(element) ? tree.selection : [element];
      await command(element, selection);
    } else if (input.source === "webview") {
      await command(input.context ?? {});
    } else {
      await command();
    }
    return { ok: true };
  });
  orca.panels.handle("panel.state", async (input) => {
    const ws = await resolveWorkspace(input?.workspace ?? null);
    if (ws?.key !== currentWorkspace?.key) {
      currentWorkspace = ws;
      const key = ws && activeByWorkspace.get(ws.key);
      setActive(key ? entries.get(key) : void 0);
    }
    return listFor(currentWorkspace);
  });
  orca.panels.handle("panel.open", async (input) => {
    if (!currentWorkspace) {
      throw fail("Select a workspace first.");
    }
    closedKeys.delete(entryKey(currentWorkspace, input.path));
    const entry = await loadWaveform(currentWorkspace, input.path);
    writeSession(entry);
    setActive(entry);
    await showTab(entry);
    return { docKey: entry.key };
  });
  orca.panels.handle("panel.select", async (input) => {
    const entry = entryOf(input);
    setActive(entry);
    await showTab(entry);
    return { ok: true };
  });
  orca.panels.handle("panel.close", async (input) => {
    await closeWaveform(entryOf(input));
    return { ok: true };
  });
  orca.panels.handle("panel.browse", async (input) => {
    let dir = input?.dir || currentWorkspace?.path || process.cwd();
    try {
      if (fs5.statSync(dir).isFile()) {
        return { file: dir };
      }
    } catch {
    }
    try {
      const names = await fs5.promises.readdir(dir, { withFileTypes: true });
      const folders = names.filter((n) => n.isDirectory()).map((n) => n.name).sort((a, b) => a.localeCompare(b));
      const files = names.filter((n) => n.isFile() && WAVEFORM_SUFFIXES.some((s) => n.name.toLowerCase().endsWith(s))).map((n) => n.name).sort((a, b) => a.localeCompare(b));
      const parent = path5.dirname(dir);
      return { dir, parent: parent === dir ? null : parent, sep: path5.sep, folders: folders.slice(0, 500), files: files.slice(0, 500) };
    } catch (err) {
      return { dir, parent: path5.dirname(dir), sep: path5.sep, folders: [], files: [], error: err?.message ?? String(err) };
    }
  });
  const snapshots = /* @__PURE__ */ new Map();
  let snapshotId = 0;
  orca.panels.handle("debug.snapshot", async () => {
    const entry = activeEntry();
    if (!entry) {
      return { error: "no active waveform" };
    }
    if (!await entry.link.isLive()) {
      return { error: "no live frame" };
    }
    const id = ++snapshotId;
    const result = new Promise((resolve2) => {
      snapshots.set(id, { parts: [], done: resolve2 });
      setTimeout(() => resolve2({ error: "the frame did not answer" }), 15e3);
    });
    entry.link.post({ command: "orca-snapshot", id });
    return result;
  });
  orca.panels.handle("debug.settings", async (input) => {
    if (input?.key) {
      await orca.settings.set(input.key, input.value);
    }
    return JSON.parse(JSON.stringify({ settings }));
  });
  orca.panels.handle("debug.panelMenu", (input) => {
    orca.panels.post("debug.menu", { row: input?.row ?? 0 });
    return { ok: true };
  });
  orca.panels.handle("debug.input", async (input) => {
    const entry = activeEntry();
    if (!entry || !await entry.link.isLive()) {
      return { error: "no live frame" };
    }
    entry.link.post({ command: "orca-input", events: input?.events ?? [] });
    return { ok: true };
  });
  orca.panels.handle("debug.part", (input) => {
    const shot = snapshots.get(input.id);
    if (!shot) {
      return { ok: false };
    }
    shot.parts[input.index] = input.data;
    if (input.summary) {
      shot.summary = input.summary;
    }
    if (shot.parts.filter((p) => p !== void 0).length === input.parts) {
      const file = path5.join(os.tmpdir(), "vaporview-orca-snapshot.jpg");
      fs5.writeFileSync(file, Buffer.from(shot.parts.join(""), "base64"));
      snapshots.delete(input.id);
      shot.done({ summary: shot.summary, image: file });
    }
    return { ok: true };
  });
  orca.events?.on?.("workspace.changed", async (payload) => {
    const ws = await resolveWorkspace(payload?.context ?? null);
    if (ws?.key === currentWorkspace?.key) {
      return;
    }
    currentWorkspace = ws;
    const key = ws && activeByWorkspace.get(ws.key);
    setActive(key ? entries.get(key) : void 0);
  });
}
export {
  activate2 as default
};
