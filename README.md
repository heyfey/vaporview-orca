# vaporview-orca

A port of the [vaporview](https://github.com/Lramseyer/vaporview) waveform viewer to an
[Orca](https://github.com/stablyai/orca) plugin.

Status: first prototype. It opens a VCD file, shows the netlist tree, adds signals, and draws them.

## Build and run

```bash
npm install
npm run build:vaporview      # one time: dependencies and the WASM parser of the submodule
npm run build                # makes build/plugin
npm test                     # runs the vaporview core and the built worker in plain Node
npm run sync                 # Orca on Windows: copy build/plugin to C:\Users\<user>\orca-plugin-dev\vaporview
orca plugin dev load <folder of the plugin>
```

In Orca, open the Vaporview panel in the right sidebar and select "Open Waveform".

- [docs/architecture.md](docs/architecture.md): what vaporview does, what the plugin does, and the Orca limit behind each decision.
- [docs/feature-parity.md](docs/feature-parity.md): each vaporview feature and its status in the plugin. Keep it current.
- [docs/orca-pr-candidates.md](docs/orca-pr-candidates.md): changes to propose to Orca, with cost and benefit.
- [docs/orca-test-results.md](docs/orca-test-results.md): measured Orca behavior (test plugin in `spike/probe`).
- `vaporview/`: upstream vaporview as a git submodule. Changes to vaporview must be general and
  backward compatible, so that upstream can merge them.

License: AGPL-3.0, the same as vaporview.
