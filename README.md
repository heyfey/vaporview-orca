# vaporview-orca

A waveform viewer for the [Orca](https://github.com/stablyai/orca) IDE.

It is a port of the VS Code extension [vaporview](https://github.com/Lramseyer/vaporview). The
plugin runs the vaporview parser, viewer, and netlist tree, so it looks and works like vaporview.

This project is not a part of vaporview or of Orca. All credit for the viewer goes to the vaporview
authors.

## Features

- Opens VCD, FST, and GHW waveform files
- Netlist tree with search
- Add and remove signals, zoom, scroll, and markers
- Value formats: binary, hexadecimal, decimal, and more
- Context menus and keyboard shortcuts, as in vaporview
- More than one waveform in a workspace, with a list in the sidebar
- The view of each waveform (signals, zoom, markers) comes back when you open it again

## Status

Prototype. It works best with small waveforms, and it has known limits (see below).

It needs Orca 1.4.248 or later. It is tested with Orca on Windows.

## Install

The plugin is not yet in the Orca plugin catalog. For now, build it from the source and load it as a
development plugin. [docs/development.md](docs/development.md) has the steps.

## Use

1. Open the Vaporview panel in the right sidebar.
2. Select "Open Waveform" and select a waveform file. The file can be outside of the workspace.
3. The waveform opens in an editor tab, and the panel shows its netlist tree.
4. Click a variable two times, or use the "add" button of its row, to add it to the viewer.
5. Right-click a signal or a tree row for more commands.

The panel lists the open waveforms of the workspace. Click a row to show that waveform. Use the
close button of the row to close it.

### Files that the plugin writes

The plugin writes one small file for each waveform into the folder `.vaporview/` of the workspace.
The file holds the view of the waveform, so that the view comes back the next time. Git does not see
this folder. You can delete it at any time.

### Settings

The settings are in the Orca settings page of the plugin. They are the vaporview settings, plus
"Netlist Icons" (the Orca icon set or the vaporview icon set).

## Known limits

- A waveform file does not open from the Orca file explorer. Use "Open Waveform" in the panel.
- The tab title is the name of the view file (`<name>.vaporview.json`), not of the waveform file.
- When you return to a waveform tab, the viewer loads its signals again.
- After you close a waveform in the panel, its tab stays open and shows "This waveform is closed".
- Some vaporview commands are not available, for example the fixed point value format.
- `Ctrl+0` (zoom to fit) goes to Orca. Use the button in the control bar.
- If you close two waveforms one after the other, the plugin can restart. Open the waveform again.
- Large waveforms are slow.

Most of these limits come from the Orca plugin API. [docs/feature-parity.md](docs/feature-parity.md)
has the full list of vaporview features and their state in the plugin.

## For developers

- [docs/development.md](docs/development.md): build, test, repository layout, and tools
- [docs/architecture.md](docs/architecture.md): how the plugin runs the vaporview code, and the design decisions

## License

GPL-3.0, the same as vaporview. See [LICENSE](LICENSE).

- The font in `assets/fonts` is Geist, under the SIL Open Font License
  (`assets/fonts/Geist-OFL.txt`).
- The icon shapes in `src/frame/lucide-icons.ts` are from the lucide icon set, under the ISC
  license.
