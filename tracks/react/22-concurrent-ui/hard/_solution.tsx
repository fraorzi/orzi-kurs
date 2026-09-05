import { Activity, useEffect, useState } from "react";

function Editor({
  subscribe,
}: {
  subscribe: () => () => void;
}) {
  const [draft, setDraft] = useState("");

  useEffect(() => subscribe(), [subscribe]);

  return (
    <section aria-label="Panel edycji">
      <label>
        Notatka robocza
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
      </label>
    </section>
  );
}

export function WorkspaceTabs({
  subscribe,
}: {
  subscribe: () => () => void;
}) {
  const [activeTab, setActiveTab] = useState<
    "edit" | "preview"
  >("edit");

  return (
    <section aria-label="Obszar roboczy">
      <nav aria-label="Widok dokumentu">
        <button
          type="button"
          onClick={() => setActiveTab("edit")}
        >
          Edycja
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("preview")}
        >
          Podgląd
        </button>
      </nav>

      <Activity
        mode={activeTab === "edit" ? "visible" : "hidden"}
      >
        <Editor subscribe={subscribe} />
      </Activity>
      {activeTab === "preview" && (
        <section aria-label="Panel podglądu">
          Podgląd dokumentu
        </section>
      )}
    </section>
  );
}
