export function solve(): {
  enter(): () => void;
  active(): number;
  drain(signal: AbortSignal): Promise<void>;
} {
  throw new Error("TODO");
}
