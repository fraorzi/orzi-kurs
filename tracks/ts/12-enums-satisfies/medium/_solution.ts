export const LOG_LEVEL = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
} as const;

export type LevelName = keyof typeof LOG_LEVEL;

export type LevelValue = (typeof LOG_LEVEL)[LevelName];

function isLevelName(input: string): input is LevelName {
  return Object.hasOwn(LOG_LEVEL, input);
}

export function shouldLog(minimum: LevelName, message: LevelName): boolean {
  return LOG_LEVEL[message] >= LOG_LEVEL[minimum];
}

export function levelName(value: LevelValue): LevelName {
  for (const name of Object.keys(LOG_LEVEL)) {
    if (isLevelName(name) && LOG_LEVEL[name] === value) return name;
  }
  return "debug";
}

export function parseLevel(input: string): LevelName | null {
  return isLevelName(input) ? input : null;
}
