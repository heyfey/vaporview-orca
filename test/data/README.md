# Test data

- `tpu.vcd` is a waveform of the tiny-tpu design (https://github.com/heyfey/tiny-tpu, file
  `waveforms/tpu.vcd`).
- `tpu.fst` is the same waveform as an FST file. It was made from `tpu.vcd` with the `2fst` example
  of the Rust crate `fst-writer` 0.3.2 (`cargo build --release --example 2fst`).

The tests in `test/` use both files. Put private waveform files in `testdata/` at the root of the
repository. Git ignores that folder.
