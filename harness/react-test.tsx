import "@testing-library/jest-dom/vitest";
import {
  act,
  cleanup,
  render,
  screen,
  waitFor,
  within,
  type RenderResult,
} from "@testing-library/react";
import userEvent, {
  type UserEvent,
} from "@testing-library/user-event";
import { afterEach } from "vitest";
import type {
  ProfilerOnRenderCallback,
  ReactNode,
} from "react";

afterEach(cleanup);

export { act, cleanup, render, screen, waitFor, within };

export interface RenderWithUserResult extends RenderResult {
  readonly user: UserEvent;
}

export function renderWithUser(ui: ReactNode): RenderWithUserResult {
  return {
    user: userEvent.setup(),
    ...render(ui),
  };
}

type ProfilerPhase = Parameters<ProfilerOnRenderCallback>[1];

export interface RenderCounter {
  readonly commits: number;
  readonly phases: readonly ProfilerPhase[];
  readonly onRender: ProfilerOnRenderCallback;
  reset(): void;
}

export function createRenderCounter(): RenderCounter {
  const phases: ProfilerPhase[] = [];

  return {
    get commits(): number {
      return phases.length;
    },
    get phases(): readonly ProfilerPhase[] {
      return phases;
    },
    onRender: (_id, phase) => {
      phases.push(phase);
    },
    reset(): void {
      phases.length = 0;
    },
  };
}
