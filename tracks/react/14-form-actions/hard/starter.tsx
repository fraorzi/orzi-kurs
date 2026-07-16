import { useActionState } from "react";

export function SeatReservationCounter({
  initialCount,
  saveCount,
}: {
  readonly initialCount: number;
  readonly saveCount: (nextCount: number) => Promise<number>;
}) {
  const [count, incrementAction, isPending] = useActionState(
    async () => saveCount(initialCount + 1),
    initialCount,
  );

  return (
    <form action={incrementAction}>
      <output aria-label="Liczba miejsc">{count}</output>
      <button type="submit">Dodaj miejsce</button>
      {isPending && <p role="status">Aktualizowanie…</p>}
    </form>
  );
}
