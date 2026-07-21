export interface Asset {
  url: string;
  width: number;
  height: number;
  alternativeText?: string | null;
}

export interface ImageDescriptor {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export function imageDescriptor(asset: Asset, origin: string): ImageDescriptor {
  if (
    !Number.isInteger(asset.width) ||
    !Number.isInteger(asset.height) ||
    asset.width < 1 ||
    asset.height < 1
  ) {
    throw new Error("Invalid dimensions");
  }

  const src = new URL(asset.url, origin);
  if (src.origin !== new URL(origin).origin) {
    throw new Error("Untrusted media origin");
  }

  return {
    src: src.href,
    width: asset.width,
    height: asset.height,
    alt: asset.alternativeText?.trim() ?? "",
  };
}
