export type Block = { __component: "page.hero"; title: string } | { __component: "page.quote"; text: string } | { __component: "page.gallery"; images: string[] };
export function solve(blocks: Block[]): string[] {
  return blocks.map((block) => {
    switch (block.__component) {
      case "page.hero": return `hero:${block.title}`;
      case "page.quote": return `quote:${block.text}`;
      case "page.gallery": return `gallery:${block.images.length}`;
      default: return block satisfies never;
    }
  });
}

