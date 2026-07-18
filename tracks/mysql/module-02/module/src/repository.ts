import type { Pool } from "mysql2/promise";
import type { Observe, PlaceOrderInput } from "./types";

export class MarketplaceRepository {
  constructor(
    private readonly pool: Pool,
    private readonly observe: Observe = () => undefined,
  ) {}

  async findListing(
    publicId: string,
  ): Promise<{ id: number; stock: number } | null> {
    const [listings] = await this.pool.query(
      `SELECT id,stock FROM listings WHERE public_id='${publicId}'`,
    );
    return (listings as Array<{ id: number; stock: number }>)[0] ?? null;
  }

  async placeOrder(input: PlaceOrderInput): Promise<void> {
    const [listings] = await this.pool.query(
      `SELECT stock,price FROM listings WHERE id=${input.listingId}`,
    );
    const listing = (listings as Array<{ stock: number; price: string }>)[0];
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
    void this.observe;
  }
}
