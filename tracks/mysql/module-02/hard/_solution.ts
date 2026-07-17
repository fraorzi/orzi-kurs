import type { Pool, RowDataPacket } from "mysql2/promise";

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

interface ListingRow extends RowDataPacket {
  id: number;
  stock: number;
  price: string;
}

function isRetryable(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "errno" in error &&
    (error.errno === 1213 || error.errno === 1205)
  );
}

export class MarketplaceRepository {
  constructor(
    private readonly pool: Pool,
    private readonly observe: (metric: DbMetric) => void = () => undefined,
  ) {}

  async findListing(
    publicId: string,
  ): Promise<{ id: number; stock: number } | null> {
    const startedAt = performance.now();
    try {
      const [rows] = await this.pool.execute<ListingRow[]>(
        "SELECT id,stock,price FROM listings WHERE public_id=?",
        [publicId],
      );
      this.observe({
        operation: "findListing",
        outcome: "success",
        attempt: 1,
        durationMs: performance.now() - startedAt,
      });
      return rows[0] ?? null;
    } catch (error) {
      this.observe({
        operation: "findListing",
        outcome: "error",
        attempt: 1,
        durationMs: performance.now() - startedAt,
      });
      throw error;
    }
  }

  async placeOrder(input: PlaceOrderInput): Promise<void> {
    const startedAt = performance.now();
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      const connection = await this.pool.getConnection();
      try {
        await connection.beginTransaction();
        const [rows] = await connection.execute<ListingRow[]>(
          "SELECT id,stock,price FROM listings WHERE id=? FOR UPDATE",
          [input.listingId],
        );
        const listing = rows[0];
        if (!listing || listing.stock < input.quantity || input.quantity <= 0) {
          throw new Error("insufficient stock");
        }
        await connection.execute(
          "INSERT INTO orders(id,request_id) VALUES (?,?)",
          [input.id, input.requestId],
        );
        await connection.execute(
          "INSERT INTO order_items(order_id,listing_id,quantity,unit_price) VALUES (?,?,?,?)",
          [input.id, input.listingId, input.quantity, listing.price],
        );
        await connection.execute(
          "UPDATE listings SET stock=stock-? WHERE id=?",
          [input.quantity, input.listingId],
        );
        await connection.commit();
        this.observe({
          operation: "placeOrder",
          outcome: "success",
          attempt,
          durationMs: performance.now() - startedAt,
        });
        return;
      } catch (error) {
        await connection.rollback();
        if (isRetryable(error) && attempt < 3) {
          this.observe({
            operation: "placeOrder",
            outcome: "retry",
            attempt,
            durationMs: performance.now() - startedAt,
          });
          continue;
        }
        this.observe({
          operation: "placeOrder",
          outcome: "error",
          attempt,
          durationMs: performance.now() - startedAt,
        });
        throw error;
      } finally {
        connection.release();
      }
    }
  }
}
