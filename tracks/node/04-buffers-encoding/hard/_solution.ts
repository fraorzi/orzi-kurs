export function solve(type: number, payload: string): Buffer {
  const body = Buffer.from(payload);
  const frame = Buffer.allocUnsafe(5 + body.length);
  frame.writeUInt32BE(body.length + 1, 0);
  frame.writeUInt8(type, 4);
  body.copy(frame, 5);
  return frame;
}
