import { useActionState } from "react";

export function SeatReservationCounter({
  initialCount,
  saveCount,
}: {
  initialCount: number;
  saveCount: (nextCount: number) => Promise<number>;
}) {
  const [count, incrementAction, isPending] =
    useActionState(
      async (previousCount) => saveCount(previousCount + 1),
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
