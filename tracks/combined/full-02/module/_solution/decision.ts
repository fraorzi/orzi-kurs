export const decision = {
  rootCause:
    "Event oznaczano jako seen przed udanym apply, więc retry po awarii apply był tracony (event uznany za przetworzony mimo braku efektu).",
  regressionTest:
    "Pierwsze apply rzuca — event nie może zostać seen; drugie wywołanie (retry) tego samego eventu musi przetworzyć dane i zakończyć się sukcesem.",
  rolloutMetric: "webhook_apply_failures oraz webhook_retry_success",
  rollbackWhen:
    "Wzrost webhook_apply_failures lub spadek liczby poprawnych retry względem baseline po wdrożeniu.",
};
