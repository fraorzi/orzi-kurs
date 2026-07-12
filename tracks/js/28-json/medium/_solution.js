export function stringifyHidingSecrets(obj) {
  return JSON.stringify(obj, (key, value) =>
    key === "password" || key === "token" ? undefined : value,
  );
}

const ISO_DATE = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d/;

export function parseWithDates(str) {
  return JSON.parse(str, (key, value) =>
    typeof value === "string" && ISO_DATE.test(value) ? new Date(value) : value,
  );
}
