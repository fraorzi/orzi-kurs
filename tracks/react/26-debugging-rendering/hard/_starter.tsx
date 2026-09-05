import {
  Profiler,
  type ProfilerOnRenderCallback,
  useState,
} from "react";

const ignoreRender: ProfilerOnRenderCallback = () => {};

export interface Ticket {
  readonly id: string;
  readonly title: string;
}

function TicketList({
  tickets,
  onRender,
}: {
  tickets: readonly Ticket[];
  onRender: ProfilerOnRenderCallback;
}) {
  return (
    <Profiler id="ticket-list" onRender={onRender}>
      <ul aria-label="Zgłoszenia">
        {tickets.map((ticket) => (
          <li key={ticket.id}>{ticket.title}</li>
        ))}
      </ul>
    </Profiler>
  );
}

export function TicketWorkspace({
  tickets,
  onTicketListRender = ignoreRender,
}: {
  tickets: readonly Ticket[];
  onTicketListRender?: ProfilerOnRenderCallback;
}) {
  const [note, setNote] = useState("");

  return (
    <section aria-label="Obsługa zgłoszeń">
      <TicketList
        tickets={tickets}
        onRender={onTicketListRender}
      />
      <label>
        Notatka wewnętrzna
        <input
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </label>
    </section>
  );
}
