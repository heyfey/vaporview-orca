# Orca probe

A small test plugin for Orca ("Vaporview Probe"). It does not show waveforms. It measures how Orca
treats a plugin: the life of a page, what a page and a worker know about tabs and workspaces, the
speed of the data path, and the checks on an answer.

- When and how to use it: [../../docs/development.md](../../docs/development.md), section "The Orca probe".
- Results: [../../docs/orca-test-results.md](../../docs/orca-test-results.md).

`sync.sh` copies the probe to a Windows folder, because a plugin worker cannot start from a
`\\wsl.localhost` path.
