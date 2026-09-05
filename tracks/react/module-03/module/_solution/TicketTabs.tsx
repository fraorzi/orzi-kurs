import { useRef, type KeyboardEvent } from "react";
import type { TicketStatus } from "./types";

const tabs: readonly {
  status: TicketStatus;
  label: string;
}[] = [
  { status: "open", label: "Otwarte" },
  { status: "resolved", label: "Rozwiązane" },
];

export function TicketTabs({
  value,
  onChange,
}: {
  value: TicketStatus;
  onChange: (status: TicketStatus) => void;
}) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>(
    [],
  );

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight"
    )
      return;
    event.preventDefault();
    const nextIndex =
      event.key === "ArrowRight"
        ? (index + 1) % tabs.length
        : (index - 1 + tabs.length) % tabs.length;
    onChange(tabs[nextIndex].status);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div role="tablist" aria-label="Status zgłoszeń">
      {tabs.map((tab, index) => (
        <button
          key={tab.status}
          ref={(node) => {
            tabRefs.current[index] = node;
          }}
          id={`ticket-tab-${tab.status}`}
          type="button"
          role="tab"
          aria-selected={value === tab.status}
          aria-controls="ticket-panel"
          tabIndex={value === tab.status ? 0 : -1}
          onClick={() => onChange(tab.status)}
          onKeyDown={(event) => handleKeyDown(event, index)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
