import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@harness/react-test";
import { ProjectList, type FetchProjects } from "./starter";

function createTestClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: Infinity } },
  });
}

describe("ProjectList", () => {
  it("cache'uje każdy filtr osobno i przekazuje sygnał requestu", async () => {
    const fetchProjects = vi.fn<FetchProjects>(async (status, signal) => {
      expect(signal).toBeInstanceOf(AbortSignal);
      return [{ id: status, name: status === "active" ? "Panel" : "Archiwum" }];
    });
    const client = createTestClient();
    const { rerender } = render(
      <QueryClientProvider client={client}>
        <ProjectList status="active" fetchProjects={fetchProjects} />
      </QueryClientProvider>,
    );
    expect(await screen.findByText("Panel")).toBeInTheDocument();

    rerender(
      <QueryClientProvider client={client}>
        <ProjectList status="archived" fetchProjects={fetchProjects} />
      </QueryClientProvider>,
    );
    expect(await screen.findByText("Archiwum")).toBeInTheDocument();

    rerender(
      <QueryClientProvider client={client}>
        <ProjectList status="active" fetchProjects={fetchProjects} />
      </QueryClientProvider>,
    );
    expect(await screen.findByText("Panel")).toBeInTheDocument();
    expect(fetchProjects).toHaveBeenCalledTimes(2);
    expect(fetchProjects.mock.calls.map(([status]) => status))
      .toEqual(["active", "archived"]);
  });
});
