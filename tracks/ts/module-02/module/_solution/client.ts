import { parseOrder, parseOrderList } from "./parse";
import { createTaskQueue, type TaskQueue } from "./queue";
import type {
  ApiError,
  FetchLike,
  Order,
  OrderClient,
  OrderClientOptions,
  OrderId,
  Parser,
  RequestOptions,
  Result,
} from "./types";

class RequestAbortedError extends Error {
  constructor(readonly reason: "external" | "timeout") {
    super(`Request aborted: ${reason}`);
    this.name = "RequestAbortedError";
  }
}

type AttemptResult =
  | { readonly ok: true; readonly response: Response }
  | {
      readonly ok: false;
      readonly error: ApiError;
      readonly retryable: boolean;
    };

const RETRY = Symbol("retry");

function validateNonNegativeInteger(value: number, name: string): void {
  if (!Number.isInteger(value) || value < 0) {
    throw new RangeError(`${name} musi być nieujemną liczbą całkowitą`);
  }
}

function validatePositiveNumber(value: number, name: string): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${name} musi być dodatnią liczbą`);
  }
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "nieznany błąd sieci";
}

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function trimTrailingSlashes(url: string): string {
  let end = url.length;
  while (end > 0 && url[end - 1] === "/") end -= 1;
  return url.slice(0, end);
}

function abortedResult<T>(): Result<T, ApiError> {
  return {
    ok: false,
    error: { kind: "aborted", reason: "external" },
  };
}

class OrderClientImpl implements OrderClient {
  readonly #baseUrl: string;
  readonly #fetchImpl: FetchLike;
  readonly #retries: number;
  readonly #backoffMs: number;
  readonly #timeoutMs: number;
  readonly #sleep: (ms: number) => Promise<void>;
  readonly #queue: TaskQueue;

  constructor(options: OrderClientOptions) {
    this.#baseUrl = trimTrailingSlashes(options.baseUrl);
    this.#fetchImpl = options.fetchImpl;
    this.#retries = options.retries ?? 2;
    this.#backoffMs = options.backoffMs ?? 50;
    this.#timeoutMs = options.timeoutMs ?? 1000;
    this.#sleep = options.sleep ?? defaultSleep;
    this.#queue = createTaskQueue(options.concurrency ?? 4);

    validateNonNegativeInteger(this.#retries, "retries");
    validateNonNegativeInteger(this.#backoffMs, "backoffMs");
    validatePositiveNumber(this.#timeoutMs, "timeoutMs");
  }

  getOrder(
    id: OrderId,
    options?: RequestOptions,
  ): Promise<Result<Order, ApiError>> {
    return this.#request(`/orders/${id}`, parseOrder, options);
  }

  listOrders(
    options?: RequestOptions,
  ): Promise<Result<readonly Order[], ApiError>> {
    return this.#request("/orders", parseOrderList, options);
  }

  get active(): number {
    return this.#queue.active;
  }

  get pending(): number {
    return this.#queue.pending;
  }

  #request<T>(
    path: string,
    parser: Parser<T>,
    options: RequestOptions | undefined,
  ): Promise<Result<T, ApiError>> {
    return this.#queue.add(() => this.#execute(path, parser, options?.signal));
  }

  async #execute<T>(
    path: string,
    parser: Parser<T>,
    signal: AbortSignal | undefined,
  ): Promise<Result<T, ApiError>> {
    for (let attempt = 0; attempt <= this.#retries; attempt += 1) {
      if (!(await this.#prepareAttempt(attempt, signal))) {
        return abortedResult();
      }

      const decision = await this.#handleAttempt(
        await this.#attempt(path, signal),
        attempt,
        parser,
      );
      if (decision === RETRY) continue;
      return decision;
    }

    return {
      ok: false,
      error: { kind: "network", message: "wyczerpano próby żądania" },
    };
  }

  async #prepareAttempt(
    attempt: number,
    signal: AbortSignal | undefined,
  ): Promise<boolean> {
    if (signal?.aborted) return false;
    if (attempt === 0) return true;
    await this.#sleep(this.#backoffMs * 2 ** (attempt - 1));
    return !signal?.aborted;
  }

  async #handleAttempt<T>(
    attempted: AttemptResult,
    attempt: number,
    parser: Parser<T>,
  ): Promise<typeof RETRY | Result<T, ApiError>> {
    if (!attempted.ok) {
      return attempted.retryable && attempt < this.#retries
        ? RETRY
        : { ok: false, error: attempted.error };
    }
    if (attempted.response.status >= 500 && attempt < this.#retries) {
      return RETRY;
    }
    if (!attempted.response.ok) {
      return {
        ok: false,
        error: { kind: "http", status: attempted.response.status },
      };
    }
    return this.#parseResponse(attempted.response, parser);
  }

  async #attempt(
    path: string,
    signal: AbortSignal | undefined,
  ): Promise<AttemptResult> {
    try {
      return {
        ok: true,
        response: await this.#fetchAttempt(path, signal),
      };
    } catch (error) {
      return error instanceof RequestAbortedError
        ? {
            ok: false,
            error: { kind: "aborted", reason: error.reason },
            retryable: false,
          }
        : {
            ok: false,
            error: { kind: "network", message: errorMessage(error) },
            retryable: true,
          };
    }
  }

  async #fetchAttempt(
    path: string,
    signal: AbortSignal | undefined,
  ): Promise<Response> {
    if (signal?.aborted) throw new RequestAbortedError("external");

    const controller = new AbortController();
    let abortedByExternal = false;
    let timedOut = false;
    const propagateAbort = (): void => {
      abortedByExternal = true;
      controller.abort();
    };
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, this.#timeoutMs);

    signal?.addEventListener("abort", propagateAbort, { once: true });
    if (signal?.aborted) propagateAbort();

    try {
      const response = await this.#fetchImpl(`${this.#baseUrl}${path}`, {
        signal: controller.signal,
      });
      if (timedOut) throw new RequestAbortedError("timeout");
      if (abortedByExternal) throw new RequestAbortedError("external");
      return response;
    } catch (error) {
      if (timedOut) throw new RequestAbortedError("timeout");
      if (abortedByExternal || signal?.aborted) {
        throw new RequestAbortedError("external");
      }
      throw error;
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener("abort", propagateAbort);
    }
  }

  async #parseResponse<T>(
    response: Response,
    parser: Parser<T>,
  ): Promise<Result<T, ApiError>> {
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      return {
        ok: false,
        error: {
          kind: "invalid-response",
          errors: ["response nie zawiera poprawnego JSON"],
        },
      };
    }

    const parsed = parser(body);
    return parsed.ok
      ? { ok: true, value: parsed.value }
      : {
          ok: false,
          error: { kind: "invalid-response", errors: parsed.error },
        };
  }
}

export function createOrderClient(options: OrderClientOptions): OrderClient {
  return new OrderClientImpl(options);
}
