function signature(word) {
  return [...word.toLowerCase()].sort().join("");
}

export function findAnagrams(word, candidates) {
  const target = word.toLowerCase();
  const targetSignature = signature(word);
  return candidates.filter((candidate) => {
    const lower = candidate.toLowerCase();
    return lower !== target && signature(candidate) === targetSignature;
  });
}

export function slugify(title) {
  return title
    .toLowerCase()
    .replaceAll("ł", "l")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .join("-");
}
