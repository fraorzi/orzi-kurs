import {
  Profiler,
  type ProfilerOnRenderCallback,
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
  readonly data: ReportData;
  readonly onRender: ProfilerOnRenderCallback;
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

export function AnalyticsPage({
  data,
  onReportRender = ignoreRender,
}: {
  readonly data: ReportData;
  readonly onReportRender?: ProfilerOnRenderCallback;
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
      <Report data={data} onRender={onReportRender} />
    </main>
  );
}

