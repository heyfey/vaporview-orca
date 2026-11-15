// Builds the Orca plugin into build/plugin. Run `npm run build:vaporview` one time first.
//
//   build/plugin/orca-plugin.json
//   build/plugin/worker.js          Orca worker: src/worker + the vaporview extension code
//   build/plugin/ext/               the files that the vaporview extension code reads at run time
//     package.json, media/, dist/worker.js (parser thread), dist/webview.js, target/.../filehandler.wasm
import * as esbuild from 'esbuild';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const vv = path.join(root, 'vaporview');
const out = path.join(root, 'build', 'plugin');
const ext = path.join(out, 'ext');
const headless = process.argv.includes('--headless');

const wasm = path.join(vv, 'target', 'wasm32-unknown-unknown', 'release', 'filehandler.wasm');
if (!fs.existsSync(wasm) || !fs.existsSync(path.join(vv, 'node_modules'))) {
  console.error('vaporview is not built. Run: npm run build:vaporview');
  process.exit(1);
}

const copy = (from, to) => { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.cpSync(from, to, { recursive: true }); };

// Bundled CommonJS code calls require() for Node built-ins. An ES module has no require.
const esmBanner = "import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);";

const nodeBundle = {
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node22',
  sourcemap: 'inline',
  logLevel: 'warning',
  banner: { js: esmBanner },
  alias: {
    vscode: path.join(root, 'src', 'adapter', 'vscode.ts'),
    'vscode-shiki-bridge': path.join(vv, 'node_modules', 'vscode-shiki-bridge', 'dist', 'index.cjs'),
    'jsonc-parser': path.join(vv, 'node_modules', 'jsonc-parser', 'lib', 'esm', 'main.js'),
  },
  // The FSDB reader is a native addon that the plugin does not ship in this phase.
  external: ['../build/Release/fsdb_reader.node'],
  nodePaths: [path.join(vv, 'node_modules')],
};

fs.rmSync(out, { recursive: true, force: true });

// Files that the vaporview extension code reads at run time.
copy(wasm, path.join(ext, 'target', 'wasm32-unknown-unknown', 'release', 'filehandler.wasm'));
copy(path.join(vv, 'media'), path.join(ext, 'media'));
copy(path.join(vv, 'package.json'), path.join(ext, 'package.json'));
copy(path.join(vv, 'LICENSE'), path.join(ext, 'LICENSE'));

await Promise.all([
  // The parser thread, as vaporview builds it.
  esbuild.build({
    entryPoints: [path.join(vv, 'src', 'extension_core', 'worker.ts')],
    bundle: true, platform: 'node', format: 'iife', target: 'es2020', logLevel: 'warning',
    outfile: path.join(ext, 'dist', 'worker.js'),
  }),
  // The webview, as vaporview builds it.
  esbuild.build({
    entryPoints: [path.join(vv, 'src', 'webview', 'vaporview.ts')],
    bundle: true, platform: 'browser', format: 'iife', target: ['es2020'], logLevel: 'warning',
    outfile: path.join(ext, 'dist', 'webview.js'),
  }),
]);

if (headless) {
  await esbuild.build({ ...nodeBundle, entryPoints: [path.join(root, 'test', 'headless.ts')], outfile: path.join(root, 'build', 'headless.mjs') });
  console.log('built build/headless.mjs');
} else if (fs.existsSync(path.join(root, 'src', 'worker', 'main.ts'))) {
  await esbuild.build({ ...nodeBundle, entryPoints: [path.join(root, 'src', 'worker', 'main.ts')], outfile: path.join(out, 'worker.js') });
  console.log('built build/plugin');
}
