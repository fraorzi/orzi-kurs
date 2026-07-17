export interface Deployment {
  readonly instances: number;
  readonly reverseProxy: boolean;
  readonly drainSeconds: number;
  readonly consistentBuildId: boolean;
  readonly deploymentId: boolean;
  readonly sharedActionKey: boolean;
  readonly sharedCache: boolean;
  readonly coordinatedTags: boolean;
  readonly streaming: boolean;
  readonly proxyBufferingDisabled: boolean;
  readonly runtime: "node" | "docker" | "static-export";
  readonly usesActions: boolean;
  readonly usesProxy: boolean;
}

export type DeploymentIssue =
  | "REVERSE_PROXY_REQUIRED" | "INVALID_DRAIN_WINDOW"
  | "INCONSISTENT_BUILD" | "DEPLOYMENT_ID_REQUIRED" | "ACTION_KEY_REQUIRED"
  | "SHARED_CACHE_REQUIRED" | "TAG_COORDINATION_REQUIRED"
  | "STREAM_BUFFERING" | "STATIC_EXPORT_UNSUPPORTED";

export function auditDeployment(_deployment: Deployment): readonly DeploymentIssue[] {
  return [];
}
