import { describe, expect, it } from "vitest";
import {
  renderWithUser,
  screen,
  within,
} from "@harness/react-test";
import { SettingsTabs } from "./starter";

describe("SettingsTabs", () => {
  it("rozdziela ruch focusu strzałkami od ręcznej aktywacji", async () => {
    const { user } = renderWithUser(<SettingsTabs />);
    const tablist = screen.getByRole("tablist", { name: "Ustawienia" });
    const profile = within(tablist).getByRole("tab", { name: "Profil" });
    const security = within(tablist).getByRole("tab", {
      name: "Bezpieczeństwo",
    });
    const notifications = within(tablist).getByRole("tab", {
      name: "Powiadomienia",
    });

    profile.focus();
    await user.keyboard("{ArrowRight}");

    expect(security).toHaveFocus();
    expect(profile).toHaveAttribute("aria-selected", "true");
    expect(security).toHaveAttribute("aria-selected", "false");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Dane profilu");

    await user.keyboard("{Enter}");
    expect(security).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Ustawienia hasła");
    expect(security).toHaveAttribute("tabindex", "0");
    expect(profile).toHaveAttribute("tabindex", "-1");

    await user.keyboard("{ArrowLeft}");
    expect(profile).toHaveFocus();
    await user.keyboard("{ArrowLeft}");
    expect(notifications).toHaveFocus();
  });
});
