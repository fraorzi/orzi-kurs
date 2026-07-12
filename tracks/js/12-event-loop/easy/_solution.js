export function scheduleLogs(log) {
  setTimeout(() => log("macro"));
  queueMicrotask(() => log("micro"));
  log("sync");
}
