import type { Pool } from "mysql2/promise";

export interface DbMetric {
  operation: "findListing" | "placeOrder";
  outcome: "success" | "retry" | "error";
  attempt: number;
  durationMs: number;
}

export interface PlaceOrderInput {
  id: number;
  requestId: string;
  listingId: number;
  quantity: number;
}

export class MarketplaceRepository {
  constructor(
    private readonly pool: Pool,
    private readonly observe: (metric: DbMetric) => void = () => undefined,
  ) {}

  async findListing(
    publicId: string,
  ): Promise<{ id: number; stock: number } | null> {
    const [rows] = await this.pool.query(
      `SELECT id,stock FROM listings WHERE public_id='${publicId}'`,
    );
    return (rows as Array<{ id: number; stock: number }>)[0] ?? null;
  }

  async placeOrder(input: PlaceOrderInput): Promise<void> {
    const [rows] = await this.pool.query(
      `SELECT stock,price FROM listings WHERE id=${input.listingId}`,
    );
    const listing = (rows as Array<{ stock: number; price: string }>)[0];
    if (!listing || listing.stock < input.quantity)
      throw new Error("insufficient stock");
    await this.pool.execute("INSERT INTO orders(id,request_id) VALUES (?,?)", [
      input.id,
      input.requestId,
    ]);
    await this.pool.execute(
      "INSERT INTO order_items(order_id,listing_id,quantity,unit_price) VALUES (?,?,?,?)",
      [input.id, input.listingId, input.quantity, listing.price],
    );
    await this.pool.execute("UPDATE listings SET stock=stock-? WHERE id=?", [
      input.quantity,
      input.listingId,
    ]);
  }
}
