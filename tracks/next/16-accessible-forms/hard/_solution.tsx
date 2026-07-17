import { useRef, type KeyboardEvent, type RefObject } from "react";
import { useFormStatus } from "react-dom";

function SubmitOperations({
  publishButtonRef,
}: {
  readonly publishButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  const { pending, data } = useFormStatus();
  const intent = data?.get("intent");
  return (
    <>
      <button type="submit" name="intent" value="draft" disabled={pending}>
        {pending && intent === "draft" ? "Zapisywanie…" : "Zapisz draft"}
      </button>
      <button
        ref={publishButtonRef}
        type="submit"
        name="intent"
        value="publish"
        disabled={pending}
      >
        {pending && intent === "publish" ? "Publikowanie…" : "Opublikuj"}
      </button>
    </>
  );
}

export function PostEditor({
  action,
}: {
  readonly action: (data: FormData) => Promise<void>;
}) {
  const publishButtonRef = useRef<HTMLButtonElement>(null);
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.ctrlKey || event.metaKey) && (event.key === "Enter" || event.key === "NumpadEnter")) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit(publishButtonRef.current ?? undefined);
    }
  }

  return (
    <form action={action}>
      <label htmlFor="content">Treść</label>
      <textarea id="content" name="content" required onKeyDown={handleKeyDown} />
      <SubmitOperations publishButtonRef={publishButtonRef} />
    </form>
  );
}
