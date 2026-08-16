export function findAnagrams(word, candidates) {
  const sortAndSplitLetters = (string) =>
    string.toLowerCase().split("").sort();
  const wordLowerCased = word.toLowerCase();
  const formattedWord = sortAndSplitLetters(word);
  const formattedCandidates = candidates.map((c) =>
    sortAndSplitLetters(c),
  );
  const res = [];

  for (let i = 0; i < candidates.length; i++) {
    const isAnagram =
      formattedWord.length ===
        formattedCandidates[i].length &&
      formattedWord.every(
        (letter, index) =>
          letter === formattedCandidates[i][index],
      ) &&
      wordLowerCased !== candidates[i].toLowerCase();
    if (isAnagram) {
      res.push(candidates[i]);
    }
  }

  return res;
}

export function slugify(title) {
  let wynik = title
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replaceAll("+", "")
    .replaceAll("=", "")
    .replaceAll("  ", " ")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[!@#]/g, "")
    .replace(/^-+/, "")
    .replaceAll("--", "-")
    .replaceAll("ł", "l")
    .replaceAll(",", "")
    .split(" ")
    .join("-");

  while (wynik.endsWith("-")) {
    wynik = wynik.slice(0, -1);
  }

  return wynik;
}
