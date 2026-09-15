// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
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
  useSearchParams: () => new URLSearchParams(),
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

describe("sidebar stage navigation", () => {
  it("shows available and upcoming tracks in learning order", () => {
    render(
      createElement(Sidebar, {
        catalog: {
          tracks: ["next", "react", "js", "ts"].map((id) => ({
            id,
            topics: [{
              id: `${id}/01-topic`,
              title: "Topic",
              levels: [level("easy", "not-started")],
            }],
          })),
        },
        catalogStatus: "success",
        collapsed: false,
        isMobile: false,
        mobileOpen: false,
        onToggle: vi.fn(),
        onMobileClose: vi.fn(),
        onMobileNavigate: vi.fn(),
        onRetryCatalog: vi.fn(),
        inert: false,
      }),
    );

    fireEvent.click(screen.getByRole("button", { name: /JavaScript.*zmień/i }));

    const labels = Array.from(
      document.querySelectorAll<HTMLElement>("#track-switcher .trackpop-item > span:nth-child(2)"),
      (element) => element.textContent,
    );
    expect(labels).toEqual([
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "MySQL",
      "Strapi",
      "Projekty łączone",
    ]);
  });

  it("links directly to the stage and closes the mobile drawer on navigation", () => {
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

    expect(container.querySelector(".topic-toggle")).toBeNull();
    expect(container.querySelector(".levels")).toBeNull();
    const stageLink = screen.getByRole("link", { name: /Fundamenty języka, 0 z 1 zaliczonych/ });
    expect(stageLink).toHaveAttribute("href", "/track/js?stage=fundamenty&filter=todo");
    expect(stageLink).toHaveAttribute("aria-current", "step");
    expect(stageLink.querySelector(".course-stage-mark")).not.toBeNull();
    expect(stageLink.querySelector(".course-stage-digit")).not.toBeNull();
    expect(stageLink.querySelector(".course-stage-pencil")).not.toBeNull();
    expect(stageLink.querySelector(".course-stage-pct")?.textContent).toBe("0% zrobione");
    expect(stageLink.querySelector(".course-stage-bar i")).toHaveStyle({ width: "0%" });
    stageLink.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(stageLink);
    expect(onMobileNavigate).toHaveBeenCalledOnce();
  });
});
