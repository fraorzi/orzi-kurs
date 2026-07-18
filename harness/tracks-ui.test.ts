// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import Sidebar from "../app/components/Sidebar";
import type { CatalogTrack, TaskStatus } from "../app/lib/types";
import {
  nextLearningTarget,
  nextTopic,
  trackProgress,
} from "../app/lib/tracks";

vi.mock("next/navigation", () => ({
  usePathname: () => "/track/js",
  useRouter: () => ({ push: vi.fn() }),
}));

function level(
  id: string,
  status: TaskStatus,
  attempts = status === "not-started" ? 0 : 1,
  nextReviewAt?: string,
) {
  return { id, status, attempts, masteryScore: 0, nextReviewAt };
}

function track(...topics: CatalogTrack["topics"]): CatalogTrack {
  return { id: "js", topics };
}

describe("track UI learning semantics", () => {
  it("treats passed-with-hint as completed progress", () => {
    const catalogTrack = track({
      id: "js/01-functions",
      title: "Functions",
      levels: [
        level("easy", "passed-with-hint"),
        level("medium", "not-started"),
      ],
    });

    expect(trackProgress(catalogTrack)).toEqual({ passed: 1, total: 2 });
    expect(nextTopic(catalogTrack)?.levels[0].status).toBe("passed-with-hint");
  });

  it("does not wrap nextTopic to the first topic after the track is complete", () => {
    const catalogTrack = track(
      {
        id: "js/01-functions",
        title: "Functions",
        levels: [level("easy", "passed"), level("medium", "passed-with-hint")],
      },
      {
        id: "js/02-scope",
        title: "Scope",
        levels: [level("easy", "passed-with-hint"), level("medium", "passed")],
      },
    );

    expect(nextTopic(catalogTrack)).toBeUndefined();
  });

  it("prioritizes a failed attempt, then a due review, then a new task", () => {
    const now = "2026-07-17T12:00:00.000Z";
    const newTopic = {
      id: "js/01-new",
      title: "New",
      levels: [level("easy", "not-started")],
    };
    const reviewTopic = {
      id: "js/02-review",
      title: "Review",
      levels: [level("easy", "passed", 1, "2026-07-16T12:00:00.000Z")],
    };
    const failedTopic = {
      id: "js/03-failed",
      title: "Failed",
      levels: [level("easy", "failed")],
    };

    expect(nextLearningTarget(track(newTopic, reviewTopic, failedTopic), now)).toMatchObject({
      topic: { id: "js/03-failed" },
      level: { id: "easy" },
      intent: "resume",
    });
    expect(nextLearningTarget(track(newTopic, reviewTopic), now)).toMatchObject({
      topic: { id: "js/02-review" },
      level: { id: "easy" },
      intent: "review",
    });
    expect(nextLearningTarget(track(newTopic), now)).toMatchObject({
      topic: { id: "js/01-new" },
      level: { id: "easy" },
      intent: "start",
    });
  });

  it("returns null for a complete track without a due review", () => {
    const catalogTrack = track({
      id: "js/01-functions",
      title: "Functions",
      levels: [
        level("easy", "passed", 1, "2026-07-18T12:00:00.000Z"),
        level("medium", "passed"),
      ],
    });

    expect(nextLearningTarget(catalogTrack, "2026-07-17T12:00:00.000Z")).toBeNull();
  });

  it("sends a legacy hint-assisted pass without a date to review", () => {
    const catalogTrack = track({
      id: "js/01-functions",
      title: "Functions",
      levels: [level("easy", "passed-with-hint")],
    });

    expect(nextLearningTarget(catalogTrack, "2026-07-17T12:00:00.000Z")).toMatchObject({
      intent: "review",
      level: { id: "easy" },
    });
  });
});

describe("sidebar topic disclosure", () => {
  it("keeps closed levels inert and toggles them without closing the mobile drawer", () => {
    const onMobileNavigate = vi.fn();
    const { container } = render(
      createElement(Sidebar, {
        catalog: {
          tracks: [
            track({
              id: "js/01-functions",
              title: "Functions",
              levels: [level("easy", "not-started")],
            }),
          ],
        },
        catalogStatus: "success",
        collapsed: false,
        isMobile: true,
        mobileOpen: true,
        onToggle: vi.fn(),
        onMobileClose: vi.fn(),
        onMobileNavigate,
        onRetryCatalog: vi.fn(),
        inert: false,
      }),
    );

    const toggle = screen.getByRole("button", { name: "Pokaż poziomy: Functions" });
    const panel = container.querySelector<HTMLElement>("#topic-levels-js-01-functions");
    const levelLink = within(panel!).getByRole("link", { hidden: true });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("aria-labelledby", toggle.id);
    expect(panel).toHaveAttribute("aria-hidden", "true");
    expect(panel).toHaveAttribute("inert");
    expect(levelLink).toHaveAttribute("tabindex", "-1");

    fireEvent.click(toggle);

    expect(onMobileNavigate).not.toHaveBeenCalled();
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(panel).not.toHaveAttribute("aria-hidden");
    expect(panel).not.toHaveAttribute("inert");
    expect(levelLink).not.toHaveAttribute("tabindex");

    const topicLink = screen.getByRole("link", { name: /Functions/ });
    topicLink.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(topicLink);
    expect(onMobileNavigate).toHaveBeenCalledOnce();
  });
});
