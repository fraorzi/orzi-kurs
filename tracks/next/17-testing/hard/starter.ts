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
  await page.getByText("Kawa").click();
  await page.getByText("Dodaj").click();
}
