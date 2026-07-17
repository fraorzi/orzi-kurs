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
  return {
    ok: true,
    value: {
      title: String(formData.get("title") ?? ""),
      budget: Number(formData.get("budget")),
    },
  };
}
