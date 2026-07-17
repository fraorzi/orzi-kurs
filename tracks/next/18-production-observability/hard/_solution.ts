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

export function auditDeployment(deployment: Deployment): readonly DeploymentIssue[] {
  const multiInstance = deployment.instances > 1;
  const checks: readonly (readonly [boolean, DeploymentIssue])[] = [
    [!deployment.reverseProxy, "REVERSE_PROXY_REQUIRED"],
    [deployment.drainSeconds < 10 || deployment.drainSeconds > 30, "INVALID_DRAIN_WINDOW"],
    [multiInstance && !deployment.consistentBuildId, "INCONSISTENT_BUILD"],
    [multiInstance && !deployment.deploymentId, "DEPLOYMENT_ID_REQUIRED"],
    [multiInstance && deployment.usesActions && !deployment.sharedActionKey, "ACTION_KEY_REQUIRED"],
    [multiInstance && !deployment.sharedCache, "SHARED_CACHE_REQUIRED"],
    [multiInstance && !deployment.coordinatedTags, "TAG_COORDINATION_REQUIRED"],
    [deployment.streaming && !deployment.proxyBufferingDisabled, "STREAM_BUFFERING"],
    [
      deployment.runtime === "static-export" &&
        (deployment.usesActions || deployment.usesProxy || deployment.streaming),
      "STATIC_EXPORT_UNSUPPORTED",
    ],
  ];
  return checks.filter(([applies]) => applies).map(([, issue]) => issue);
}
