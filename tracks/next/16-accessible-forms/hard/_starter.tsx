import type { KeyboardEvent } from "react";

export function PostEditor({
  action,
}: {
  action: (data: FormData) => Promise<void>;
}) {
  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key === "Enter"
    ) {
      event.currentTarget.form?.submit();
    }
  }

  return (
    <form action={action}>
      <label htmlFor="content">Treść</label>
      <textarea
        id="content"
        name="content"
        onKeyDown={handleKeyDown}
      />
      <button name="intent" value="draft">
        Zapisz draft
      </button>
      <button name="intent" value="publish">
        Opublikuj
      </button>
    </form>
  );
}
