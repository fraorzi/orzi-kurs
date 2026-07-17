export interface DashboardData {
  readonly revenue: number;
  readonly orders: number;
}

export async function loadDashboard(
  loadRevenue: () => Promise<number>,
  loadOrders: () => Promise<number>,
): Promise<DashboardData> {
  const revenue = await loadRevenue();
  const orders = await loadOrders();
  return { revenue, orders };
}
