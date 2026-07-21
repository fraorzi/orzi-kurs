export function solve(error: Error & { kind?: string }): { status: number; code: string; message: string } {
  const known: Record<string, { status: number; code: string; message: string }> = {
    notFound: { status: 404, code: "NOT_FOUND", message: "Nie znaleziono zasobu" },
    conflict: { status: 409, code: "CONFLICT", message: "Konflikt danych" },
    validation: { status: 400, code: "VALIDATION_ERROR", message: "Nieprawidłowe dane" },
  };
  return error.kind && known[error.kind] ? known[error.kind] : { status: 500, code: "INTERNAL_ERROR", message: "Błąd serwera" };
}

