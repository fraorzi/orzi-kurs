export default function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[Łł]/g, "l")
    .toLocaleLowerCase("pl-PL")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
