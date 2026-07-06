export function myMap(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i], i, arr));
  }
  return result;
}

export function myFilter(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}

export function myReduce(arr, fn, ...rest) {
  const hasInitial = rest.length > 0;
  if (arr.length === 0 && !hasInitial) {
    throw new TypeError("Reduce of empty array with no initial value");
  }
  let acc = hasInitial ? rest[0] : arr[0];
  for (let i = hasInitial ? 0 : 1; i < arr.length; i++) {
    acc = fn(acc, arr[i], i, arr);
  }
  return acc;
}

export function uniqueFast(arr) {
  const seen = new Set();
  const result = [];
  for (const item of arr) {
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }
  return result;
}
