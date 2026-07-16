interface ProjectInput {
  readonly title: string;
  readonly budget: number;
}

export type ProjectFormResult =
  | { readonly ok: true; readonly value: ProjectInput }
  | {
      readonly ok: false;
      readonly fieldErrors: Readonly<Partial<Record<keyof ProjectInput, string>>>;
    };

export function parseProjectForm(formData: FormData): ProjectFormResult {
  const rawTitle = formData.get("title");
  const rawBudget = formData.get("budget");
  const title = typeof rawTitle === "string" ? rawTitle.trim() : "";
  const budget = typeof rawBudget === "string" ? Number(rawBudget) : Number.NaN;
  const fieldErrors: Partial<Record<keyof ProjectInput, string>> = {};

  if (title.length < 3 || title.length > 80) {
    fieldErrors.title = "Tytuł musi mieć od 3 do 80 znaków";
  }
  if (!Number.isFinite(budget) || budget < 0) {
    fieldErrors.budget = "Budżet musi być nieujemną liczbą";
  }

  return Object.keys(fieldErrors).length
    ? { ok: false, fieldErrors }
    : { ok: true, value: { title, budget } };
}
