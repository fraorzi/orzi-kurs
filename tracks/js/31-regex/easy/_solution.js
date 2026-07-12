export function extractNumbers(str) {
  return (str.match(/\d+/g) ?? []).map(Number);
}

export function isHexColor(str) {
  return /^#[0-9a-f]{6}$/i.test(str);
}
