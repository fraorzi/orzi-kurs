import {
  loadDashboard,
  type Alert,
  type Summary,
} from "./dashboard-data";

interface DashboardPageProps {
  getSummary: () => Promise<Summary>;
  getAlerts: () => Promise<readonly Alert[]>;
}

export async function DashboardPage({
  getSummary,
  getAlerts,
}: DashboardPageProps) {
  const { summary, alerts } = await loadDashboard(
    getSummary,
    getAlerts,
  );

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Przychód: {summary.revenue} zł</p>
      <p>Zamówienia: {summary.orders}</p>
      <ul aria-label="Alerty">
        {alerts.map((alert) => (
          <li key={alert.id}>{alert.message}</li>
        ))}
      </ul>
    </main>
  );
}
