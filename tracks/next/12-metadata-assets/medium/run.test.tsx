import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@harness/next-test";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

import config from "./src/next.config";
import { ProductHero } from "./src/ProductHero";

describe("remote product image", () => {
  it("ogranicza optymalizator do jednego wzorca", () => {
    expect(config.images?.remotePatterns).toEqual([{
      protocol: "https",
      hostname: "cdn.example",
      port: "",
      pathname: "/products/**",
      search: "",
    }]);
  });

  it("zapewnia alt, ratio i responsywne sizes", () => {
    render(<ProductHero
      src="https://cdn.example/products/monitor.jpg"
      alt="Monitor 4K na biurku"
    />);
    const image = screen.getByRole("img", { name: "Monitor 4K na biurku" });
    expect(image).toHaveAttribute("width", "1200");
    expect(image).toHaveAttribute("height", "800");
    expect(image).toHaveAttribute("sizes", "(max-width: 768px) 100vw, 50vw");
  });
});
