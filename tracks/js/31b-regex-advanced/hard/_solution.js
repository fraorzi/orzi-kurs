export function tokenize(expr) {
  const re = /\d+|[+\-*/()]|(\s+)/y;
  const tokens = [];
  while (re.lastIndex < expr.length) {
    const pos = re.lastIndex;
    const match = re.exec(expr);
    if (match === null) {
      throw new SyntaxError(`nieoczekiwany znak na pozycji ${pos}`);
    }
    if (match[1] === undefined) {
      tokens.push(match[0]);
    }
  }
  return tokens;
}
