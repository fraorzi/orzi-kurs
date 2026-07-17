import {
  type KeyboardEvent,
  useId,
  useRef,
  useState,
} from "react";

const tabs = [
  { id: "profile", label: "Profil", content: "Dane profilu" },
  { id: "security", label: "Bezpieczeństwo", content: "Ustawienia hasła" },
  { id: "notifications", label: "Powiadomienia", content: "Kanały powiadomień" },
] as const;

export function SettingsTabs() {
  const baseId = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + tabs.length) % tabs.length;
    setFocusedIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section>
      <div role="tablist" aria-label="Ustawienia">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            id={`${baseId}-tab-${tab.id}`}
            type="button"
            role="tab"
            tabIndex={index === focusedIndex ? 0 : -1}
            aria-selected={index === selectedIndex}
            aria-controls={`${baseId}-panel-${tab.id}`}
            onClick={() => {
              setFocusedIndex(index);
              setSelectedIndex(index);
            }}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id={`${baseId}-panel-${tabs[selectedIndex].id}`}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`${baseId}-tab-${tabs[selectedIndex].id}`}
      >
        {tabs[selectedIndex].content}
      </div>
    </section>
  );
}
