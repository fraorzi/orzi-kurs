import { useState, type FormEvent } from "react";
import type { Agent, Ticket } from "./types";

export function AssignDialog({
  ticket,
  agents,
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (agentId) onAssign(agentId);
  }

  return (
    <div
      role="dialog"
      aria-label={`Przypisz ${ticket.title}`}
    >
      <form onSubmit={handleSubmit}>
        <label>
          Agent
          <select
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
