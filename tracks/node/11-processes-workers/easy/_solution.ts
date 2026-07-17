export function solve(
  input: string,
  output: string,
  format: string,
): {
  file: string;
  args: string[];
  shell: false;
} {
  if (!/^[a-zA-Z0-9._/-]+$/.test(input) || !/^[a-zA-Z0-9._/-]+$/.test(output))
    throw new Error("Niebezpieczna ścieżka");
  if (!["webp", "png"].includes(format)) throw new Error("Format niedozwolony");
  return {
    file: "img-tool",
    args: ["--input", input, "--output", output, "--format", format],
    shell: false,
  };
}
