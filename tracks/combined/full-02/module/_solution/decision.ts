export const decision = { rootCause: "Event oznaczano jako seen przed udanym apply, więc retry po awarii był tracony.", regressionTest: "Pierwsze apply rzuca, drugie wywołanie tego samego eventu musi przetworzyć dane.", rolloutMetric: "webhook_apply_failures i webhook_retry_success", rollbackWhen: "Wzrost błędów apply lub spadek liczby poprawnych retry po wdrożeniu." };

