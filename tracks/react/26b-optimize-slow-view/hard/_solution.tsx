import {
  memo,
  Profiler,
  type ProfilerOnRenderCallback,
  useMemo,
  useState,
} from "react";

const ignoreRender: ProfilerOnRenderCallback = () => {};

export interface QueueTicket {
  id: string;
  status: "open" | "closed";
  title: string;
}

const QueueList = memo(function QueueList({
  onRender,
  tickets,
}: {
  onRender: ProfilerOnRenderCallback;
  tickets: QueueTicket[];
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
});

function InternalNote() {
  const [note, setNote] = useState("");

  return (
    <label>
      Notatka operatora
      <input
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />
    </label>
  );
}

export function OperationsDashboard({
  tickets,
  buildQueue,
  onQueueRender = ignoreRender,
}: {
  tickets: QueueTicket[];
  buildQueue: (
    tickets: QueueTicket[],
    filter: "all" | QueueTicket["status"],
  ) => QueueTicket[];
  onQueueRender?: ProfilerOnRenderCallback;
}) {
  const [filter, setFilter] = useState<
    "all" | QueueTicket["status"]
  >("all");
  const queue = useMemo(
    () => buildQueue(tickets, filter),
    [buildQueue, filter, tickets],
  );

  return (
    <section aria-label="Operacje">
      <label>
        Status
        <select
          value={filter}
          onChange={(event) =>
            setFilter(
              event.target.value as
                "all" | QueueTicket["status"],
            )
          }
        >
          <option value="all">Wszystkie</option>
          <option value="open">Otwarte</option>
          <option value="closed">Zamknięte</option>
        </select>
      </label>
      <QueueList tickets={queue} onRender={onQueueRender} />
      <InternalNote />
    </section>
  );
}
