import {
  Profiler,
  type ProfilerOnRenderCallback,
  type ReactNode,
  useState,
} from "react";

const ignoreRender: ProfilerOnRenderCallback = () => {};

export interface ReportData {
  readonly visits: number;
  readonly revenue: number;
}

function Report({
  data,
  onRender,
}: {
  data: ReportData;
  onRender: ProfilerOnRenderCallback;
}) {
  return (
    <Profiler id="report" onRender={onRender}>
      <section aria-label="Raport">
        <p>Wizyty: {data.visits}</p>
        <p>Przychód: {data.revenue} zł</p>
      </section>
    </Profiler>
  );
}

function ExpandableFilters({
  children,
}: {
  children: ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <main>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? "Ukryj filtry" : "Pokaż filtry"}
      </button>
      {expanded && <p>Filtry aktywne</p>}
      {children}
    </main>
  );
}

export function AnalyticsPage({
  data,
  onReportRender = ignoreRender,
}: {
  data: ReportData;
  onReportRender?: ProfilerOnRenderCallback;
}) {
  return (
    <ExpandableFilters>
      <Report data={data} onRender={onReportRender} />
    </ExpandableFilters>
  );
}
