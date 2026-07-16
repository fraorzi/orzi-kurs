import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import {
  render,
  renderWithUser,
  screen,
  waitFor,
} from "@harness/react-test";
import { IssueBoard, type Issue } from "./starter";

function createTestClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: Infinity } },
  });
}

describe("IssueBoard", () => {
  it("invaliduje listę po mutacji i pokazuje dane z refetchu", async () => {
    let closed = false;
    const fetchIssues = vi.fn(async (): Promise<readonly Issue[]> => [{
      id: "incident-1",
      title: "Płatność",
      status: closed ? "closed" : "open",
    }]);
    const closeIssue = vi.fn(async (_id: string) => {
      closed = true;
    });
    const { user } = renderWithUser(
      <QueryClientProvider client={createTestClient()}>
        <IssueBoard fetchIssues={fetchIssues} closeIssue={closeIssue} />
      </QueryClientProvider>,
    );

    await user.click(await screen.findByRole("button", { name: "Zamknij Płatność" }));

    expect(await screen.findByText("Płatność: Zamknięte")).toBeInTheDocument();
    expect(closeIssue.mock.calls[0]?.[0]).toBe("incident-1");
    expect(fetchIssues).toHaveBeenCalledTimes(2);
  });

  it("anuluje konsumowany signal po utracie obserwatora", async () => {
    let requestSignal: AbortSignal | undefined;
    const fetchIssues = vi.fn((signal: AbortSignal) => {
      requestSignal = signal;
      return new Promise<readonly Issue[]>((_resolve, reject) => {
        signal.addEventListener("abort", () => reject(signal.reason));
      });
    });
    const { unmount } = render(
      <QueryClientProvider client={createTestClient()}>
        <IssueBoard fetchIssues={fetchIssues} closeIssue={vi.fn()} />
      </QueryClientProvider>,
    );
    await waitFor(() => expect(requestSignal).toBeDefined());

    unmount();

    expect(requestSignal?.aborted).toBe(true);
  });
});
