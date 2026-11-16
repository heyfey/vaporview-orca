// Test sidebar panel (HTML). It shows what the worker knows and reports its own lifetime.
const instance = Math.random().toString(36).slice(2, 8)
const bootedAt = Date.now()
const pre = document.createElement('pre')
pre.style.cssText = 'margin:0;padding:8px;font:12px ui-monospace,monospace;color:var(--orca-foreground);background:var(--orca-background);white-space:pre-wrap'
document.body.style.margin = '0'
document.body.append(pre)
const lines: string[] = []
const say = (msg: string) => { lines.push(`+${((Date.now() - bootedAt) / 1000).toFixed(1)}s ${msg}`); console.log(`[panel ${instance}] ${msg}`); pre.textContent = `PROBE PANEL instance=${instance}\n` + lines.slice(-30).join('\n') }
say(`boot visibility=${document.visibilityState}`)
orca.plugin.request('hello', { instance, file: '(panel)' } as any).then((r) => say('hello answered ' + JSON.stringify(r)), (e: any) => say(`hello failed ${e.code}`))
orca.on('workspace.changed', (p) => say('workspace.changed ' + JSON.stringify(p)))
orca.plugin.on('ping', (p) => say('ping ' + JSON.stringify(p)))
document.addEventListener('visibilitychange', () => { say(`visibility ${document.visibilityState}`); orca.plugin.request('event', { type: 'panel-visibility', instance, state: document.visibilityState } as any).catch(() => {}) })
const hold = (): void => { orca.plugin.request('hold', { instance } as any, { timeoutMs: 120000 } as any).then(() => hold(), () => setTimeout(hold, 1000)) }
hold()
setInterval(() => orca.plugin.request('state').then((s) => { pre.textContent = `PROBE PANEL instance=${instance} alive ${Math.round((Date.now() - bootedAt) / 1000)} s\n` + JSON.stringify(s, null, 1) + '\n\n' + lines.slice(-12).join('\n') }, () => {}), 3000)
