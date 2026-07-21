export function validatePlan(steps: string[]): boolean {
  const required = [
    "test",
    "build",
    "backup",
    "migrate-expand",
    "deploy",
    "healthcheck",
    "rollback-ready",
  ];

  return required.every((step) => steps.includes(step));
}
