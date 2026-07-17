export interface Asset { url: string; width: number; height: number; alternativeText?: string | null }
export function imageDescriptor(asset: Asset, origin: string): { src: string; width: number; height: number; alt: string } {
  if (!Number.isInteger(asset.width) || !Number.isInteger(asset.height) || asset.width < 1 || asset.height < 1) throw new Error("Invalid dimensions");
  const src = new URL(asset.url, origin); if (src.origin !== new URL(origin).origin) throw new Error("Untrusted media origin");
  return { src: src.href, width: asset.width, height: asset.height, alt: asset.alternativeText?.trim() ?? "" };
}

