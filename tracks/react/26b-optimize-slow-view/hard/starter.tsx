import {
  Profiler,
  type ProfilerOnRenderCallback,
  useState,
} from "react";

const ignoreRender: ProfilerOnRenderCallback = () => {};

export interface QueueTicket {
  readonly id: string;
  readonly status: "open" | "closed";
  readonly title: string;
}

function QueueList({
  onRender,
  tickets,
}: {
  readonly onRender: ProfilerOnRenderCallback;
  readonly tickets: readonly QueueTicket[];
}) {
  return (
    <Profiler id="queue" onRender={onRender}>
      <ul aria-label="Kolejka">
        {tickets.map((ticket) => (
          <li key={ticket.id}>{ticket.title}</li>
        ))}
      </ul>
    </Profiler>
  );
}

export function OperationsDashboard({
  tickets,
  buildQueue,
  onQueueRender = ignoreRender,
}: {
  readonly tickets: readonly QueueTicket[];
  readonly buildQueue: (
    tickets: readonly QueueTicket[],
    filter: "all" | QueueTicket["status"],
  ) => readonly QueueTicket[];
  readonly onQueueRender?: ProfilerOnRenderCallback;
}) {
  const [filter, setFilter] = useState<"all" | QueueTicket["status"]>("all");
  const [note, setNote] = useState("");
  const queue = buildQueue(tickets, filter);

  return (
    <section aria-label="Operacje">
      <label>
        Status
        <select
          value={filter}
          onChange={(event) => setFilter(
            event.target.value as "all" | QueueTicket["status"],
          )}
        >
          <option value="all">Wszystkie</option>
          <option value="open">Otwarte</option>
          <option value="closed">Zamknięte</option>
        </select>
      </label>
      <QueueList tickets={queue} onRender={onQueueRender} />
      <label>
        Notatka operatora
        <input
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </label>
    </section>
  );
}

