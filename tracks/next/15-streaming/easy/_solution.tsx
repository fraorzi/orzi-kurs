export default function Loading() {
  return (
    <section role="status" aria-live="polite" aria-busy="true">
      <p>Ładowanie zamówień…</p>
      <div aria-hidden="true" style={{ minHeight: 240 }}>
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} data-skeleton-row="" />
        ))}
      </div>
    </section>
  );
}
