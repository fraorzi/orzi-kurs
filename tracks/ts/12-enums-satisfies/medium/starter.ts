// TODO: as const — wartości mają zostać literałami
export const LOG_LEVEL = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

// TODO: unia kluczy LOG_LEVEL
export type LevelName = string;

// TODO: unia wartości LOG_LEVEL
export type LevelValue = number;

export function shouldLog(minimum: LevelName, message: LevelName): boolean {
  // TODO: poziom wiadomości >= próg
  return false;
}

export function levelName(value: LevelValue): LevelName {
  // TODO: odwrotne mapowanie wartość → nazwa
  return "debug";
}

export function parseLevel(input: string): LevelName | null {
  // TODO: walidacja stringa z zewnątrz; bez `as` i bez `any`
  return null;
}
