// Test editor frame. It reports its lifetime and DOM events to the worker and to the plugin log.
const instance = Math.random().toString(36).slice(2, 8)
const bootedAt = Date.now()
const pre = document.createElement('pre')
pre.style.cssText = 'margin:0;padding:12px;font:12px ui-monospace,monospace;color:var(--orca-foreground);background:var(--orca-background);min-height:100vh;white-space:pre-wrap'
document.body.style.margin = '0'
document.body.tabIndex = 0
document.body.append(pre)
const lines: string[] = []
let file = '?'
let ticks = 0
const show = () => {
  pre.textContent = `PROBE EDITOR  instance=${instance}  file=${file}\nalive ${Math.round((Date.now() - bootedAt) / 1000)} s, ticks=${ticks}\nClick here, then press a key.\n\n` + lines.slice(-25).join('\n')
}
const say = (msg: string) => { lines.push(`+${((Date.now() - bootedAt) / 1000).toFixed(1)}s ${msg}`); console.log(`[editor ${instance}] ${msg}`); show() }
const report = (type: string, extra: object = {}) => {
  say(type + ' ' + JSON.stringify(extra))
  orca.plugin.request('event', { type, instance, file, ...extra } as any).catch((e: any) => say(`report failed ${e.code}`))
}

say(`boot api=${JSON.stringify(orca.api)} visibility=${document.visibilityState} hasFocus=${document.hasFocus()}`)

orca.document!.onDidChange((doc) => {
  const text = doc.content.kind === 'text' ? doc.content.text : ''
  try { file = JSON.parse(text).fileName ?? '?' } catch { file = '(bad json)' }
  say(`document version=${doc.version} readOnly=${doc.readOnly} chars=${text.length} fileType=${doc.fileType}`)
  orca.plugin.request('hello', { instance, file, docVersion: doc.version } as any).then((r) => say('hello answered ' + JSON.stringify(r)), (e: any) => say(`hello failed ${e.code}`))
})

orca.host.call('workspace.readContext').then((c) => say('context ' + JSON.stringify(c)), (e: any) => say(`context failed ${e.code}`))

// One long request stays open. The worker sees its signal abort when this frame goes away.
const hold = (): void => {
  orca.plugin.request('hold', { instance } as any, { timeoutMs: 120000 } as any).then(() => hold(), (e: any) => { say(`hold ended ${e.code}`); setTimeout(hold, 1000) })
}
hold()

orca.plugin.on('ping', (p) => report('ping-received', p as object))
window.addEventListener('focus', () => report('focus'))
window.addEventListener('blur', () => report('blur'))
document.addEventListener('visibilitychange', () => report('visibilitychange', { state: document.visibilityState }))
window.addEventListener('pagehide', () => report('pagehide'))
window.addEventListener('pointerdown', () => report('pointerdown'))
window.addEventListener('keydown', (e) => report('keydown', { key: e.key, ctrl: e.ctrlKey, shift: e.shiftKey, alt: e.altKey }))
window.addEventListener('contextmenu', (e) => { e.preventDefault(); report('contextmenu') })
setInterval(() => { ticks++; show(); if (ticks % 5 === 0) report('tick', { ticks, visibility: document.visibilityState, hasFocus: document.hasFocus() }) }, 1000)

// Transport speed test: runs when the document has "pull": true.
orca.document!.get().then(async (doc) => {
  const text = doc.content.kind === 'text' ? doc.content.text : ''
  let n = 0
  try { n = JSON.parse(text).pullParts ?? 0 } catch { /* no test */ }
  if (!n) return
  const t = performance.now(); let chars = 0; let limited = 0
  for (let i = 0; i < n; i++) {
    try { const r: any = await orca.plugin.request('pull'); chars += r.part.length } catch (e: any) { limited++; await new Promise((r) => setTimeout(r, e.retryAfterMs ?? 500)); i-- ; if (limited > 50) break }
  }
  const s = (performance.now() - t) / 1000
  report('pull', { parts: n, base64MiB: +(chars / 1048576).toFixed(1), seconds: +s.toFixed(2), rawMiBPerSec: +((chars * 0.75 / 1048576) / s).toFixed(1), rateLimited: limited })
})
