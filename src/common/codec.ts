// Message format between the worker and a frame. Orca moves JSON only, so byte data goes as
// base64 text. This file is the one place to change when Orca gets a byte transport.

const BYTES_KEY = '$bytes';
const MIN_BYTE_ARRAY = 256;

function isByteArray(value: unknown): value is number[] {
  if (!Array.isArray(value) || value.length < MIN_BYTE_ARRAY) { return false; }
  for (let i = 0; i < value.length; i++) {
    const v = value[i];
    if (typeof v !== 'number' || v < 0 || v > 255 || (v | 0) !== v) { return false; }
  }
  return true;
}

function toBase64(bytes: Uint8Array): string {
  if (typeof Buffer !== 'undefined') { return Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength).toString('base64'); }
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) { s += String.fromCharCode(...bytes.subarray(i, i + 0x8000)); }
  return btoa(s);
}

function fromBase64(text: string): Uint8Array {
  if (typeof Buffer !== 'undefined') { return new Uint8Array(Buffer.from(text, 'base64')); }
  const s = atob(text);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) { out[i] = s.charCodeAt(i); }
  return out;
}

function replacer(_key: string, value: unknown): unknown {
  if (value instanceof Uint8Array) { return { [BYTES_KEY]: toBase64(value), typed: true }; }
  // vaporview sends compressed chunks as arrays of numbers. Base64 is about 3 times smaller.
  if (isByteArray(value)) { return { [BYTES_KEY]: toBase64(Uint8Array.from(value)) }; }
  return value;
}

function reviver(_key: string, value: any): unknown {
  if (value && typeof value === 'object' && typeof value[BYTES_KEY] === 'string') {
    const bytes = fromBase64(value[BYTES_KEY]);
    return value.typed ? bytes : Array.from(bytes);
  }
  return value;
}

/** Encodes the first messages of the list, up to about `maxChars`. At least one message. */
export function encodeMessages(messages: unknown[], maxChars: number): { json: string; count: number } {
  const parts: string[] = [];
  let size = 2;
  for (const message of messages) {
    const text = JSON.stringify(message, replacer) ?? 'null';
    if (parts.length > 0 && size + text.length + 1 > maxChars) { break; }
    parts.push(text);
    size += text.length + 1;
  }
  return { json: `[${parts.join(',')}]`, count: parts.length };
}

export function decodeMessages(json: string): unknown[] {
  return JSON.parse(json, reviver);
}

/** Replaces `undefined` and other values that JSON cannot hold. Orca refuses them in a request. */
export function toJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value ?? null, replacer));
}
