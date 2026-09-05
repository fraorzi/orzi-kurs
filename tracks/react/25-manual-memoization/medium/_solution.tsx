import {
  memo,
  Profiler,
  type ProfilerOnRenderCallback,
  useCallback,
  useState,
} from "react";

const ignoreRender: ProfilerOnRenderCallback = () => {};

const ExportButton = memo(function ExportButton({
  onExport,
  onRender,
}: {
  onExport: () => void;
  onRender: ProfilerOnRenderCallback;
}) {
  return (
    <Profiler id="export-button" onRender={onRender}>
      <button type="button" onClick={onExport}>
        Eksportuj raport
      </button>
    </Profiler>
  );
});

export function ExportDashboard({
  reportId,
  onExport,
  onExportButtonRender = ignoreRender,
}: {
  reportId: string;
  onExport: (reportId: string) => void;
  onExportButtonRender?: ProfilerOnRenderCallback;
}) {
  const [compact, setCompact] = useState(false);
  const handleExport = useCallback(
    () => onExport(reportId),
    [onExport, reportId],
  );

  return (
    <section data-compact={compact}>
      <label>
        <input
          type="checkbox"
          checked={compact}
          onChange={(event) =>
            setCompact(event.target.checked)
          }
        />
        Kompaktowy
      </label>
      <ExportButton
        onExport={handleExport}
        onRender={onExportButtonRender}
      />
    </section>
  );
}
