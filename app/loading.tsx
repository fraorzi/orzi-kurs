export default function Loading() {
  return (
    <>
      <div className="topbar" aria-hidden="true">
        <span className="state-skeleton state-skeleton-crumb" />
      </div>
      <div className="wrap state-page" role="status" aria-label="Ładowanie widoku">
        <span className="state-skeleton state-skeleton-title" aria-hidden="true" />
        <span className="state-skeleton state-skeleton-copy" aria-hidden="true" />
        <span className="state-skeleton state-skeleton-panel" aria-hidden="true" />
        <span className="sr-only">Ładowanie widoku…</span>
      </div>
    </>
  );
}
