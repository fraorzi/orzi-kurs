export interface Locator {
  click(): Promise<void>;
  fill(value: string): Promise<void>;
}

export interface BrowserPage {
  goto(path: string): Promise<void>;
  getByRole(role: string, options: { readonly name: string }): Locator;
  getByText(text: string): Locator;
  waitForURL(pattern: RegExp): Promise<void>;
  expectVisible(locator: Locator): Promise<void>;
}

export async function runCheckoutJourney(page: BrowserPage): Promise<void> {
  await page.goto("/products");
  await page.getByRole("link", { name: "Kawa" }).click();
  await page.getByRole("button", { name: "Dodaj do koszyka" }).click();
  await page.getByRole("link", { name: "Koszyk" }).click();
  await page.expectVisible(page.getByRole("heading", { name: "Koszyk" }));
  await page.expectVisible(page.getByText("1 produkt"));
  await page.getByRole("link", { name: "Do kasy" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill("ada@example.com");
  await page.getByRole("button", { name: "Złóż zamówienie" }).click();
  await page.waitForURL(/\/orders\/o-[^/]+$/);
  await page.expectVisible(
    page.getByRole("heading", { name: "Zamówienie przyjęte" }),
  );
}
