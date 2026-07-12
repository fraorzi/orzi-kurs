export function ucFirst(str) {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
}

export function checkSpam(str) {
  const lower = str.toLowerCase();
  return lower.includes("viagra") || lower.includes("xxx");
}

export function initials(fullName) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .join("");
}
