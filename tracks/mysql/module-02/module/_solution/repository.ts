import type { Pool, RowDataPacket } from "mysql2/promise";
import { runWithRetry } from "./retry";
import type { Observe, PlaceOrderInput } from "./types";

interface ListingRow extends RowDataPacket {
  id: number;
  stock: number;
  price: string;
}

export class MarketplaceRepository {
  constructor(
    private readonly pool: Pool,
    private readonly observe: Observe = () => undefined,
  ) {}

  async findListing(
    publicId: string,
  ): Promise<{ id: number; stock: number } | null> {
    const startedAt = performance.now();
    try {
      const [listings] = await this.pool.execute<ListingRow[]>(
        "SELECT id,stock,price FROM listings WHERE public_id=?",
        [publicId],
      );
      this.observe({
        operation: "findListing",
        outcome: "success",
        attempt: 1,
        durationMs: performance.now() - startedAt,
      });
      const listing = listings[0];
      return listing ? { id: listing.id, stock: listing.stock } : null;
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
    try {
      await runWithRetry(
        3,
        async (attempt) => {
          const connection = await this.pool.getConnection();
          try {
            await connection.beginTransaction();
            const [listings] = await connection.execute<ListingRow[]>(
              "SELECT id,stock,price FROM listings WHERE id=? FOR UPDATE",
              [input.listingId],
            );
            const listing = listings[0];
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
          } catch (error) {
            await connection.rollback();
            throw error;
          } finally {
            connection.release();
          }
        },
        (attempt) => {
          this.observe({
            operation: "placeOrder",
            outcome: "retry",
            attempt,
            durationMs: performance.now() - startedAt,
          });
        },
      );
    } catch (error) {
      this.observe({
        operation: "placeOrder",
        outcome: "error",
        attempt: 3,
        durationMs: performance.now() - startedAt,
      });
      throw error;
    }
  }
}
