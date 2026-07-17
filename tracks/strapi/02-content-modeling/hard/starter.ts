export type Block = { __component: "page.hero"; title: string } | { __component: "page.quote"; text: string } | { __component: "page.gallery"; images: string[] };
export function solve(blocks: Block[]): string[] {
  return blocks.map(() => "");
}

