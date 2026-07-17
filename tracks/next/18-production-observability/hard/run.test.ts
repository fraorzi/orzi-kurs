import { describe, expect, it } from "vitest";
import { auditDeployment, type Deployment } from "./starter";

const production: Deployment = {
  instances: 3,
  reverseProxy: true,
  drainSeconds: 20,
  consistentBuildId: true,
  deploymentId: true,
  sharedActionKey: true,
  sharedCache: true,
  coordinatedTags: true,
  streaming: true,
  proxyBufferingDisabled: true,
  runtime: "docker",
  usesActions: true,
  usesProxy: true,
};

describe("auditDeployment", () => {
  it("akceptuje skoordynowany deployment", () => {
    expect(auditDeployment(production)).toEqual([]);
  });

  it("raportuje pełny zestaw ryzyk wielu instancji w stabilnej kolejności", () => {
    expect(auditDeployment({
      ...production,
      reverseProxy: false,
      drainSeconds: 2,
      consistentBuildId: false,
      deploymentId: false,
      sharedActionKey: false,
      sharedCache: false,
      coordinatedTags: false,
      proxyBufferingDisabled: false,
    })).toEqual([
      "REVERSE_PROXY_REQUIRED",
      "INVALID_DRAIN_WINDOW",
      "INCONSISTENT_BUILD",
      "DEPLOYMENT_ID_REQUIRED",
      "ACTION_KEY_REQUIRED",
      "SHARED_CACHE_REQUIRED",
      "TAG_COORDINATION_REQUIRED",
      "STREAM_BUFFERING",
    ]);
  });

  it("odrzuca nieobsługiwane funkcje static export", () => {
    expect(auditDeployment({
      ...production,
      instances: 1,
      runtime: "static-export",
    })).toContain("STATIC_EXPORT_UNSUPPORTED");
  });
});
