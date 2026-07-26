// TODO
export const LOG_LEVEL = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

// TODO
export type LevelName = string;

// TODO
export type LevelValue = number;

export function shouldLog(minimum: LevelName, message: LevelName): boolean {
  // TODO
  return false;
}

export function levelName(value: LevelValue): LevelName {
  // TODO
  return "debug";
}

export function parseLevel(input: string): LevelName | null {
  // TODO
  return null;
}
