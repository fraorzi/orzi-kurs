export function fizzBuzz(n) {
  const res = [];
  function isFizz(number) {
    return number % 3 === 0;
  }
  function isBuzz(number) {
    return number % 5 === 0;
  }
  for (let i = 1; i <= n; i++) {
    if (isFizz(i) && isBuzz(i)) {
      res.push("FizzBuzz");
    } else if (isBuzz(i)) {
      res.push("Buzz");
    } else if (isFizz(i)) {
      res.push("Fizz");
    } else {
      res.push(i);
    }
  }
  return res;
}

export function sumRange(a, b) {
  let sum = 0;
  for (let i = a; i <= b; i++) {
    sum += i;
  }
  return sum;
}

export function countVowels(str) {
  const vowels = ["a", "e", "i", "o", "u"];
  let count = 0;
  for (const letter of str.toLowerCase()) {
    if (vowels.includes(letter)) count++;
  }
  return count;
}
