import {
  createContext,
  use,
} from "react";
import { createPortal } from "react-dom";

export const WorkspaceContext = createContext("Brak workspace");

function WorkspaceButton() {
  const workspace = use(WorkspaceContext);

  return (
    <button
      type="button"
      onClick={(event) => event.stopPropagation()}
    >
      Otwórz {workspace}
    </button>
  );
}

export function PortalAction({
  container,
  onInteraction,
}: {
  readonly container: HTMLElement;
  readonly onInteraction: () => void;
}) {
  return (
    <section onClick={onInteraction}>
      {createPortal(<WorkspaceButton />, container)}
    </section>
  );
}
