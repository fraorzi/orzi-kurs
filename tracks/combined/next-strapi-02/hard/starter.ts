export interface Asset { url: string; width: number; height: number; alternativeText?: string | null }
export function imageDescriptor(asset: Asset, _origin: string) { return asset; }
