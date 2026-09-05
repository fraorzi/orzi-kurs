import type { TicketStatus } from "./types";

export function TicketTabs({
  value,
  onChange,
}: {
  value: TicketStatus;
  onChange: (status: TicketStatus) => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={() => onChange("open")}
      >
        Otwarte {value === "open" && "(aktywne)"}
      </button>
      <button
        type="button"
        onClick={() => onChange("resolved")}
      >
        Rozwiązane {value === "resolved" && "(aktywne)"}
      </button>
    </div>
  );
}
