import { describe, expect, it } from "vitest";
import {
  createRenderCounter,
  renderWithUser,
  screen,
} from "@harness/react-test";
import { AnalyticsPage } from "./starter";

describe("AnalyticsPage", () => {
  it("zachowuje zachowanie filtrów i raportu", async () => {
    const { user } = renderWithUser(
      <AnalyticsPage data={{ visits: 1200, revenue: 8400 }} />,
    );

    expect(screen.getByText("Wizyty: 1200")).toBeInTheDocument();
    expect(screen.getByText("Przychód: 8400 zł")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Pokaż filtry" }));
    expect(screen.getByText("Filtry aktywne")).toBeInTheDocument();
  });

  it("[quality] nie renderuje raportu przy lokalnej zmianie wrappera", async () => {
    const reportRenders = createRenderCounter();
    const { user } = renderWithUser(
      <AnalyticsPage
        data={{ visits: 1200, revenue: 8400 }}
        onReportRender={reportRenders.onRender}
      />,
    );
    reportRenders.reset();

    await user.click(screen.getByRole("button", { name: "Pokaż filtry" }));

    expect(reportRenders.commits).toBe(0);
  });
});

