import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import type { Agent, Ticket } from "./types";

export function AssignDialog({
  ticket,
  agents,
  trigger,
  onAssign,
  onClose,
}: {
  ticket: Ticket;
  agents: readonly Agent[];
  trigger: HTMLButtonElement;
  onAssign: (agentId: string) => void;
  onClose: () => void;
}) {
  const [agentId, setAgentId] = useState(
    agents[0]?.id ?? "",
  );
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    selectRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
      trigger.focus();
    };
  }, [onClose, trigger]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (agentId) onAssign(agentId);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="assign-dialog-title"
    >
      <h2 id="assign-dialog-title">
        Przypisz {ticket.title}
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Agent
          <select
            ref={selectRef}
            value={agentId}
            onChange={(event) =>
              setAgentId(event.target.value)
            }
          >
            {agents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={onClose}>
          Anuluj
        </button>
        <button type="submit">Zapisz przypisanie</button>
      </form>
    </div>
  );
}
