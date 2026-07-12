function isPrime(x) {
  if (x < 2) {
    return false;
  }
  for (let j = 2; j * j <= x; j++) {
    if (x % j === 0) {
      return false;
    }
  }
  return true;
}

export function primesUpTo(n) {
  const primes = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
}

export function chessboard(size) {
  let board = "";
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      board += (row + col) % 2 === 0 ? " " : "#";
    }
    board += "\n";
  }
  return board;
}

export function firstIndexWhere(arr, pred) {
  for (let i = 0; i < arr.length; i++) {
    if (pred(arr[i], i)) {
      return i;
    }
  }
  return -1;
}
