// Packs a TrueType font as a WOFF 1.0 file (https://www.w3.org/TR/WOFF/). The Orca plugin
// directory does not list a plugin that has a TTF or OTF file, and it accepts WOFF.
// WOFF 1.0 is the same font tables, each one compressed with zlib. No font data changes.
import * as zlib from 'node:zlib';

const pad4 = (n) => (n + 3) & ~3;

/** @param {Buffer} ttf @returns {Buffer} */
export function ttfToWoff(ttf) {
  const numTables = ttf.readUInt16BE(4);
  const tables = [];
  for (let i = 0; i < numTables; i++) {
    const at = 12 + i * 16;
    const offset = ttf.readUInt32BE(at + 8);
    const length = ttf.readUInt32BE(at + 12);
    const data = ttf.subarray(offset, offset + length);
    const packed = zlib.deflateSync(data, { level: 9 });
    tables.push({
      tag: ttf.subarray(at, at + 4), checksum: ttf.readUInt32BE(at + 4), length,
      // The specification asks for the plain table when compression does not make it smaller.
      body: packed.length < length ? packed : data,
    });
  }
  const headerSize = 44 + numTables * 20;
  let size = headerSize;
  for (const t of tables) { t.offset = size; size = pad4(size + t.body.length); }
  const out = Buffer.alloc(size);
  out.write('wOFF', 0, 'latin1');
  ttf.copy(out, 4, 0, 4);                                   // flavor: the sfnt version of the font
  out.writeUInt32BE(size, 8);
  out.writeUInt16BE(numTables, 12);
  out.writeUInt32BE(12 + numTables * 16 + tables.reduce((sum, t) => sum + pad4(t.length), 0), 16);   // size as a plain font
  out.writeUInt16BE(1, 20);                                 // version of this file, major and minor
  tables.forEach((t, i) => {
    const at = 44 + i * 20;
    t.tag.copy(out, at);
    out.writeUInt32BE(t.offset, at + 4);
    out.writeUInt32BE(t.body.length, at + 8);
    out.writeUInt32BE(t.length, at + 12);
    out.writeUInt32BE(t.checksum, at + 16);
    t.body.copy(out, t.offset);
  });
  return out;
}

/** Reads the tables back from a WOFF file. The build uses it to check the result. */
export function woffTables(woff) {
  const numTables = woff.readUInt16BE(12);
  const result = new Map();
  for (let i = 0; i < numTables; i++) {
    const at = 44 + i * 20;
    const offset = woff.readUInt32BE(at + 4), compLength = woff.readUInt32BE(at + 8), origLength = woff.readUInt32BE(at + 12);
    const body = woff.subarray(offset, offset + compLength);
    result.set(woff.toString('latin1', at, at + 4), compLength < origLength ? zlib.inflateSync(body) : Buffer.from(body));
  }
  return result;
}
