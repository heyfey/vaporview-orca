// Makes a release of the plugin: one commit with only the plugin files, and a version tag on it.
//
//   npm run release            then:  git push origin release v<version>
//
// Orca installs a plugin from the files of the tagged commit, and the Orca plugin directory
// refuses a commit that has a submodule or a binary test file. The main branch has both. So the
// tag goes on a commit of the branch `release`, which holds only the folder that the build
// stages for Orca (build/plugin): the manifest, the license, dist/, and the pictures.
//
// Before a release: set the new version in orca-plugin.json and package.json, and commit.
import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const stage = path.join(root, 'build', 'plugin');
const git = (args, options = {}) => execFileSync('git', args, { cwd: root, encoding: 'utf8', ...options }).trim();
const stop = (message) => { console.error(`release: ${message}`); process.exit(1); };

if (git(['status', '--porcelain'])) { stop('the work tree has changes. Commit them first.'); }
execFileSync(process.execPath, [path.join(root, 'scripts', 'build.mjs')], { cwd: root, stdio: 'inherit' });
if (git(['status', '--porcelain'])) { stop('the build changed files that are in git. Commit them first.'); }

const version = JSON.parse(fs.readFileSync(path.join(stage, 'orca-plugin.json'), 'utf8')).version;
const tag = `v${version}`;
if (!/^\d+\.\d+\.\d+$/.test(version)) { stop(`the version "${version}" is not x.y.z`); }
if (git(['tag', '--list', tag])) { stop(`the tag ${tag} exists. Set a new version in orca-plugin.json.`); }

// A separate index, so that the index and the files of the work tree do not change.
const index = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'vaporview-release-')), 'index');
const staged = { cwd: stage, env: { ...process.env, GIT_DIR: path.join(root, '.git'), GIT_WORK_TREE: stage, GIT_INDEX_FILE: index } };
git(['add', '--all', '.'], staged);
const tree = git(['write-tree'], staged);
fs.rmSync(path.dirname(index), { recursive: true, force: true });

// The Orca plugin directory accepts only plain files in the tree of a release.
const odd = git(['ls-tree', '-r', tree]).split('\n').filter((line) => !line.startsWith('100644 blob '));
if (odd.length) { stop(`the release has entries that are not plain files:\n${odd.join('\n')}`); }

const source = git(['rev-parse', 'HEAD']);
const parent = (() => { try { return git(['rev-parse', '--verify', '--quiet', 'refs/heads/release']); } catch { return ''; } })();
const commit = git(['commit-tree', tree, ...(parent ? ['-p', parent] : []), '-m', `Release ${tag}\n\nBuilt from the commit ${source} of the main branch.`]);
git(['update-ref', 'refs/heads/release', commit]);
git(['tag', '-a', tag, '-m', tag, commit]);

const files = git(['ls-tree', '-r', '--name-only', tree]).split('\n').length;
console.log(`release ${tag}: commit ${commit.slice(0, 7)} on the branch "release", ${files} files`);
console.log(`To publish it: git push origin release ${tag}`);
