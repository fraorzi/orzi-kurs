export function primesUpTo(n) {
  function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  const res = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) res.push(i);
  }
  return res;
}

export function chessboard(size) {
  let string = "";
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const iteracio = j + i;
      if (iteracio % 2 === 0) {
        string += " ";
      } else if (iteracio % 2 === 1) {
        string += "#";
      }
    }
    string += "\n";
  }
  return string;
}

export function firstIndexWhere(arr, pred) {
  for (let i = 0; i < arr.length; i++) {
    if (pred(arr[i], i)) return i;
  }
  return -1;
}
