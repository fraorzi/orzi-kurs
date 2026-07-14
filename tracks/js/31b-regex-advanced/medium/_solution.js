function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function highlight(text, query) {
  if (query === "") return text;
  const re = new RegExp(escapeRegExp(query), "gi");
  return text.replace(re, (match) => `[[${match}]]`);
}

export function reformatDate(str) {
  return str.replace(/(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/, "$<d>/$<m>/$<y>");
}
