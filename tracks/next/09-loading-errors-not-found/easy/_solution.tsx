export default function Loading() {
  return (
    <section role="status" aria-live="polite" aria-busy="true">
      <h2>Ładowanie zamówień</h2>
      <ul aria-hidden="true">
        {[1, 2, 3].map((row) => <li key={row}>••••••••</li>)}
      </ul>
    </section>
  );
}
