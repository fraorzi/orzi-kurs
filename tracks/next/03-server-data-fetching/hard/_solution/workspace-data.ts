export interface User {
  readonly id: string;
  readonly name: string;
}

export interface FeatureFlags {
  readonly compactNavigation: boolean;
}

export interface Order {
  readonly id: string;
  readonly total: number;
}

export interface WorkspaceServices {
  getUser(slug: string): Promise<User>;
  getFeatureFlags(): Promise<FeatureFlags>;
  getOrders(userId: string): Promise<readonly Order[]>;
}

export interface WorkspaceData {
  readonly user: User;
  readonly flags: FeatureFlags;
  readonly orders: readonly Order[];
}

export async function loadWorkspace(
  slug: string,
  services: WorkspaceServices,
): Promise<WorkspaceData> {
  const userPromise = services.getUser(slug);
  const flagsPromise = services.getFeatureFlags();
  const user = await userPromise;
  const [flags, orders] = await Promise.all([
    flagsPromise,
    services.getOrders(user.id),
  ]);
  return { user, flags, orders };
}
