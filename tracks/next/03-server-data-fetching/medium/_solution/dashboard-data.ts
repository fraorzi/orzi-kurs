export interface Summary {
  readonly revenue: number;
  readonly orders: number;
}

export interface Alert {
  readonly id: string;
  readonly message: string;
}

export interface DashboardData {
  readonly summary: Summary;
  readonly alerts: readonly Alert[];
}

export async function loadDashboard(
  getSummary: () => Promise<Summary>,
  getAlerts: () => Promise<readonly Alert[]>,
): Promise<DashboardData> {
  const [summary, alerts] = await Promise.all([getSummary(), getAlerts()]);
  return { summary, alerts };
}
