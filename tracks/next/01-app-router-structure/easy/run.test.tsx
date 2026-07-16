import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import RootLayout from "./starter";

describe("RootLayout", () => {
  it("tworzy wymagany dokument i dostępny punkt wejścia do treści", () => {
    const markup = renderToStaticMarkup(
      <RootLayout><h1>Raporty</h1></RootLayout>,
    );

    expect(markup).toContain('<html lang="pl">');
    expect(markup).toContain("<body>");
    expect(markup).toContain('<a href="#main-content">Przejdź do treści</a>');
    expect(markup).toContain('<main id="main-content"><h1>Raporty</h1></main>');
  });
});
