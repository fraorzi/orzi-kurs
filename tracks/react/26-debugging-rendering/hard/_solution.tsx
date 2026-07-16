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
  readonly tickets: readonly Ticket[];
  readonly onRender: ProfilerOnRenderCallback;
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

function InternalNote() {
  const [note, setNote] = useState("");

  return (
    <label>
      Notatka wewnętrzna
      <input
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />
    </label>
  );
}

export function TicketWorkspace({
  tickets,
  onTicketListRender = ignoreRender,
}: {
  readonly tickets: readonly Ticket[];
  readonly onTicketListRender?: ProfilerOnRenderCallback;
}) {
  return (
    <section aria-label="Obsługa zgłoszeń">
      <TicketList tickets={tickets} onRender={onTicketListRender} />
      <InternalNote />
    </section>
  );
}

