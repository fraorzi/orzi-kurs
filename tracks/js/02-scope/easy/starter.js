export function makeIndexFns(n) {
  const fns = [];
  for (var i = 0; i < n; i++) {
    fns.push(function () {
      return i;
    });
  }
  return fns;
}

export function labelTemperature(t) {
  let label = "w normie";
  if (t > 30) {
    let label = "upał";
  }
  return label;
}
