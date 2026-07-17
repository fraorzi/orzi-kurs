import { useActionState } from "react";

export type ProjectFormState =
  | { readonly status: "idle" }
  | { readonly status: "error"; readonly message: string }
  | { readonly status: "success"; readonly projectId: string };

export function CreateProjectForm({
  createProject,
}: {
  readonly createProject: (name: string) => Promise<string>;
}) {
  const [state, submitAction, isPending] = useActionState<
    ProjectFormState,
    FormData
  >(
    async (_previousState, formData) => {
      const name = String(formData.get("projectName") ?? "");
      const projectId = await createProject(name);
      return { status: "success", projectId };
    },
    { status: "idle" },
  );

  return (
    <form action={submitAction}>
      <label htmlFor="project-name">Nazwa projektu</label>
      <input id="project-name" name="projectName" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Tworzenie…" : "Utwórz projekt"}
      </button>
      {state.status === "error" && <p role="alert">{state.message}</p>}
      {state.status === "success" && (
        <p role="status">Utworzono projekt {state.projectId}</p>
      )}
    </form>
  );
}
