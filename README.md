# vaporview-orca

A port of the [vaporview](https://github.com/Lramseyer/vaporview) waveform viewer to an
[Orca](https://github.com/stablyai/orca) plugin.

Status: design and Orca behavior tests. No viewer code yet.

- [docs/architecture.md](docs/architecture.md): what vaporview does, what the plugin does, and the Orca limit behind each decision.
- [docs/feature-parity.md](docs/feature-parity.md): each vaporview feature and its status in the plugin. Keep it current.
- [docs/orca-pr-candidates.md](docs/orca-pr-candidates.md): changes to propose to Orca, with cost and benefit.
- [docs/orca-test-results.md](docs/orca-test-results.md): measured Orca behavior (test plugin in `spike/probe`).
- `vaporview/`: upstream vaporview as a git submodule. Changes to vaporview must be general and
  backward compatible, so that upstream can merge them.

License: AGPL-3.0, the same as vaporview.
