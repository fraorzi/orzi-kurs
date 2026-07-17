export interface RecommendationRequest {
  readonly tenantId: string;
  readonly productId: string;
  readonly currency: string;
  readonly requestId: string;
}

export interface Recommendation {
  readonly productId: string;
  readonly price: number;
}

export function createRecommendationCache(
  load: (request: RecommendationRequest) => Promise<readonly Recommendation[]>,
) {
  const cache = new Map<string, Promise<readonly Recommendation[]>>();
  return (request: RecommendationRequest): Promise<readonly Recommendation[]> => {
    const key = JSON.stringify([request.tenantId, request.productId, request.currency]);
    const existing = cache.get(key);
    if (existing) return existing;
    const pending = load(request);
    cache.set(key, pending);
    return pending;
  };
}
