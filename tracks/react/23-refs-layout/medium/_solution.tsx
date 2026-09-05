import {
  type Ref,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export interface EditorHandle {
  focus(): void;
  selectAll(): void;
}

export function NoteEditor({
  ref,
}: {
  ref?: Ref<EditorHandle>;
}) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      focus() {
        textareaRef.current?.focus();
      },
      selectAll() {
        textareaRef.current?.focus();
        textareaRef.current?.select();
      },
    }),
    [],
  );

  return (
    <label>
      Notatka
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </label>
  );
}

export function EditorPanel() {
  const editorRef = useRef<EditorHandle>(null);

  return (
    <section aria-label="Edytor notatki">
      <NoteEditor ref={editorRef} />
      <button
        type="button"
        onClick={() => editorRef.current?.selectAll()}
      >
        Zaznacz notatkę
      </button>
    </section>
  );
}
