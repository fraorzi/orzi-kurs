export const decision = {
  rootCause: "Event oznaczano jako seen przed udanym apply, więc retry po awarii był tracony.",
  regressionTest: "Test retry: pierwsze apply rzuca, a drugie wywołanie tego samego eventu przetwarza dane.",
  rolloutMetric: "webhook_apply_failures i webhook_retry_success",
  rollbackWhen: "Wzrost błędów apply lub spadek liczby poprawnych retry po wdrożeniu.",
};
