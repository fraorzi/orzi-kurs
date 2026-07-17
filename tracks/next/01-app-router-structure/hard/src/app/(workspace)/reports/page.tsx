import { ReportSummary } from "../_components/ReportSummary";

export default function ReportsPage() {
  return (
    <section>
      <h1>Raporty</h1>
      <ReportSummary count={3} />
    </section>
  );
}
