// Test worker for the vaporview port. It records what Orca tells a plugin about frames and tabs.
import type { OrcaWorkerApi } from 'orca/worker'
import fs from 'node:fs'
import os from 'node:os'
import { Worker } from 'node:worker_threads'

type Frame = { caller: string; surface: string; instance: string; file?: string; since: number }

export default function activate(orca: OrcaWorkerApi): void {
  const bootedAt = Date.now()
  const frames = new Map<string, Frame>()
  let active: string | undefined
  const log = (msg: string, data?: unknown) =>
    orca.log(`[probe +${((Date.now() - bootedAt) / 1000).toFixed(1)}s] ${msg}${data === undefined ? '' : ' ' + JSON.stringify(data)}`)

  log('activate', { api: orca.api, node: process.version, platform: process.platform, pid: process.pid, caps: orca.grantedCapabilities })

  orca.events.on('workspace.changed', (p) => log('event workspace.changed', p))

  // A frame says who it is. The caller id is all that Orca adds.
  orca.panels.handle('hello', (input: any, ctx) => {
    frames.set(ctx.panel.id, { caller: ctx.panel.id, surface: ctx.panel.surface, instance: input?.instance, file: input?.file, since: Date.now() })
    log('hello', { caller: ctx.panel, input })
    return { workerBootedAt: bootedAt, frames: frames.size }
  })

  // Long request. Its signal aborts when the frame closes or after the timeout.
  orca.panels.handle('hold', (input: any, ctx) =>
    new Promise((resolve) => {
      const started = Date.now()
      ctx.signal.addEventListener('abort', () => {
        log('hold aborted', { caller: ctx.panel.id, instance: input?.instance, afterMs: Date.now() - started })
        resolve({ aborted: true })
      })
    }))

  // DOM events that the frame reports (focus, blur, visibility, key, tick).
  orca.panels.handle('event', (input: any, ctx) => {
    if (input?.type === 'focus' || input?.type === 'pointerdown' || input?.type === 'keydown') active = ctx.panel.id
    log('frame event', { caller: ctx.panel.id, ...input })
    return { active: active ?? null }
  })

  orca.panels.handle('state', async () => JSON.parse(JSON.stringify({
    frames: [...frames.values()], active: active ?? null, uptimeMs: Date.now() - bootedAt,
    context: await orca.host.call('workspace.readContext').catch((e: any) => ({ error: e.code })),
    hasTypography: orca.host.has('editor.readTypography'), hasTerminalClose: orca.host.has('terminal.close')
  })))

  orca.panels.handle('workspaces', async () => orca.host.call('workspace.list'))

  orca.panels.handle('open', async (input: any) => {
    const t = Date.now()
    const r = await orca.host.call('editor.open', { workspaceId: input.workspaceId, path: input.path })
    log('editor.open', { path: input.path, ms: Date.now() - t, r })
    return r
  })

  // The worker writes a file that is open in a tab. What does the frame see?
  orca.panels.handle('write', (input: any) => {
    fs.writeFileSync(input.path, input.text)
    log('wrote', { path: input.path, bytes: input.text.length })
    return { ok: true }
  })

  orca.panels.handle('ping', (input: any) => {
    orca.panels.post('ping', { at: Date.now(), to: input?.panel ?? 'all' }, input?.panel ? { panel: input.panel } : undefined)
    return { posted: true }
  })

  // Random reads with fs, as the vaporview FST reader does.
  orca.panels.handle('fsbench', (input: any) => {
    const fd = fs.openSync(input.path, 'r')
    const size = fs.fstatSync(fd).size
    const buf = Buffer.alloc(input.chunk ?? 65536)
    const n = input.reads ?? 500
    const t = process.hrtime.bigint()
    let bytes = 0
    for (let i = 0; i < n; i++) bytes += fs.readSync(fd, buf, 0, buf.length, Math.floor(Math.random() * Math.max(1, size - buf.length)))
    const ms = Number(process.hrtime.bigint() - t) / 1e6
    fs.closeSync(fd)
    const r = { path: input.path, size, reads: n, chunk: buf.length, ms: Math.round(ms), msPerRead: +(ms / n).toFixed(3), mibPerSec: +((bytes / 1048576) / (ms / 1000)).toFixed(1) }
    log('fsbench', r)
    return r
  })

  // WASM and worker_threads, which the vaporview parser needs.
  orca.panels.handle('wasm', async (input: any) => {
    const bytes = fs.readFileSync(input.path)
    const t = Date.now()
    const mod = await WebAssembly.compile(bytes)
    const compileMs = Date.now() - t
    const thread = await new Promise<string>((resolve, reject) => {
      const w = new Worker(`const {parentPort,workerData}=require('node:worker_threads');WebAssembly.compile(workerData).then(m=>parentPort.postMessage('thread compiled, exports='+WebAssembly.Module.exports(m).length),e=>parentPort.postMessage('thread error '+e.message))`, { eval: true, workerData: bytes })
      w.once('message', (m) => { resolve(String(m)); void w.terminate() })
      w.once('error', reject)
    })
    const r = { bytes: bytes.length, compileMs, imports: WebAssembly.Module.imports(mod).length, exports: WebAssembly.Module.exports(mod).length, thread, sab: typeof SharedArrayBuffer, cpus: os.cpus().length, totalMemGiB: +(os.totalmem() / 2 ** 30).toFixed(1) }
    log('wasm', r)
    return r
  })

  // Transport speed: the frame pulls base64 parts.
  const blob = Buffer.alloc(700 * 1024, 7).toString('base64')
  orca.panels.handle('pull', () => ({ part: blob }))

  orca.commands.register('probe.ping', () => {
    log('command probe.ping', { active })
    if (active) orca.panels.post('ping', { at: Date.now(), to: active }, { panel: active })
    return `pinged ${active ?? 'no active frame'}`
  })
}
