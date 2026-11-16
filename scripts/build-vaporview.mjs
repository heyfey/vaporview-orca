// Prepares the vaporview submodule: installs its dependencies and compiles its parser to WASM.
// Run it one time, and after each change of the submodule commit.
import { execSync } from 'node:child_process';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const vv = path.join(root, 'vaporview');
const cargoHome = process.env.CARGO_HOME ?? path.join(os.homedir(), '.cargo');
// The Rust compiler writes the paths of its source files into the WASM file. The WASM file is in
// git (dist/), so the paths of this machine must not be in it.
const remap = [`--remap-path-prefix=${cargoHome}=/cargo`, `--remap-path-prefix=${vv}=/vaporview`, `--remap-path-prefix=${os.homedir()}=/home`];
const env = { ...process.env, RUSTFLAGS: [process.env.RUSTFLAGS, ...remap].filter(Boolean).join(' ') };
const run = (command) => execSync(command, { cwd: vv, env, stdio: 'inherit' });

run('npm ci --no-audit --no-fund');
run('npm run compile-wasm');
