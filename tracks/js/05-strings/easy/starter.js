export function ucFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function checkSpam(str) {
  const lowerCaseStr = str.toLowerCase();
  const bannedWords = ["viagra", "XXX"];
  return bannedWords.some((word) =>
    lowerCaseStr.includes(word.toLowerCase()),
  );
}

export function initials(fullName) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}
