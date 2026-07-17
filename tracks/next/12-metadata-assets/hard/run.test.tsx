import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(process.cwd(), "tracks/next/12-metadata-assets/hard/src");
const read = (file: string) => readFileSync(join(root, file), "utf8");

describe("asset placement contract", () => {
  it("self-hostuje font w root layout bez globalnej analityki", () => {
    const source = read("layout.tsx");
    expect(source).toContain('from "next/font/local"');
    expect(source).toContain('src: "./InterVariable.woff2"');
    expect(source).toContain("className={inter.className}");
    expect(source).not.toContain("next/script");
  });

  it("zawęża niekrytyczny skrypt do dashboardu", () => {
    const source = read("dashboard-layout.tsx");
    expect(source).toContain('from "next/script"');
    expect(source).toContain('id="dashboard-analytics"');
    expect(source).toContain('strategy="lazyOnload"');
    expect(source).not.toContain('strategy="worker"');
  });

  it("generuje kartę OG w standardowym rozmiarze", () => {
    const source = read("opengraph-image.tsx");
    expect(source).toContain('from "next/og"');
    expect(source).toMatch(/width:\s*1200/);
    expect(source).toMatch(/height:\s*630/);
    expect(source).toContain('contentType = "image/png"');
    expect(source).toContain("await params");
    expect(source).toContain("new ImageResponse");
  });
});
