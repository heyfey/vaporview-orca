// Evaluates a VS Code "when" clause, for example
//   webviewSection == 'signal' && width > 1 && !inputFocus
// against a set of context keys. It supports the operators that the vaporview menus and
// keybindings use: || && ! ( ) == != > >= < <= =~ and bare keys.

type Token = { type: 'op' | 'value' | 'regex'; text: string; quoted?: boolean };

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < source.length) {
    const c = source[i];
    if (/\s/.test(c)) { i++; continue; }
    const two = source.slice(i, i + 2);
    const three = source.slice(i, i + 3);
    if (three === '===' || three === '!==') { tokens.push({ type: 'op', text: three.slice(0, 2) }); i += 3; continue; }
    if (['||', '&&', '==', '!=', '>=', '<=', '=~'].includes(two)) { tokens.push({ type: 'op', text: two }); i += 2; continue; }
    if ('()!<>'.includes(c)) { tokens.push({ type: 'op', text: c }); i++; continue; }
    if (c === "'" || c === '"') {
      const end = source.indexOf(c, i + 1);
      const stop = end < 0 ? source.length : end;
      tokens.push({ type: 'value', text: source.slice(i + 1, stop), quoted: true });
      i = stop + 1;
      continue;
    }
    if (c === '/' && tokens.at(-1)?.text === '=~') {
      const end = source.indexOf('/', i + 1);
      const stop = end < 0 ? source.length : end;
      let flags = '';
      let j = stop + 1;
      while (j < source.length && /[a-z]/.test(source[j])) { flags += source[j++]; }
      tokens.push({ type: 'regex', text: source.slice(i + 1, stop) + '\u0000' + flags });
      i = j;
      continue;
    }
    let j = i;
    while (j < source.length && !/[\s()!=<>|&]/.test(source[j])) { j++; }
    if (j === i) { i++; continue; }
    tokens.push({ type: 'value', text: source.slice(i, j) });
    i = j;
  }
  return tokens;
}

export type WhenContext = Record<string, unknown>;

export function evaluateWhen(clause: string | undefined, context: WhenContext): boolean {
  if (!clause || !clause.trim()) { return true; }
  const tokens = tokenize(clause);
  let pos = 0;
  const peek = () => tokens[pos];
  const isOp = (text: string) => peek()?.type === 'op' && peek()!.text === text;

  const or = (): boolean => {
    let value = and();
    while (isOp('||')) { pos++; const right = and(); value = value || right; }
    return value;
  };
  const and = (): boolean => {
    let value = unary();
    while (isOp('&&')) { pos++; const right = unary(); value = value && right; }
    return value;
  };
  const unary = (): boolean => {
    if (isOp('!')) { pos++; return !unary(); }
    if (isOp('(')) { pos++; const value = or(); if (isOp(')')) { pos++; } return value; }
    return comparison();
  };
  const comparison = (): boolean => {
    const left = tokens[pos++];
    if (!left || left.type !== 'value') { return false; }
    const actual = left.quoted ? left.text : context[left.text];
    const op = peek();
    if (!op || op.type !== 'op' || !['==', '!=', '>', '>=', '<', '<=', '=~'].includes(op.text)) {
      if (left.quoted) { return left.text.length > 0; }
      if (left.text === 'true') { return true; }
      if (left.text === 'false') { return false; }
      return Boolean(actual);
    }
    pos++;
    const right = tokens[pos++];
    if (!right) { return false; }
    if (op.text === '=~') {
      const [pattern, flags] = right.text.split('\u0000');
      try { return new RegExp(pattern, flags ?? '').test(String(actual ?? '')); } catch { return false; }
    }
    if (op.text === '==' ) { return String(actual) === right.text; }
    if (op.text === '!=' ) { return String(actual) !== right.text; }
    const a = Number(actual);
    const b = Number(right.text);
    if (Number.isNaN(a) || Number.isNaN(b)) { return false; }
    return op.text === '>' ? a > b : op.text === '>=' ? a >= b : op.text === '<' ? a < b : a <= b;
  };

  try { return or(); } catch { return false; }
}
