export type Action = "edit" | "delete" | "archive";

export type ActionRequest = {
  action: Action;
  id: string;
};

function isAction(value: string | undefined): value is Action {
  return value === "edit" || value === "delete" || value === "archive";
}

export function createActionHandler(
  onAction: (request: ActionRequest) => void,
): (event: Event) => void {
  return (event) => {
    if (
      !(event.target instanceof Element) ||
      !(event.currentTarget instanceof Element)
    ) {
      return;
    }
    const actionElement = event.target.closest<HTMLElement>("[data-action]");
    if (
      actionElement === null ||
      !event.currentTarget.contains(actionElement) ||
      (actionElement instanceof HTMLButtonElement && actionElement.disabled)
    ) {
      return;
    }
    const { action, id } = actionElement.dataset;
    if (!isAction(action) || id === undefined || id.length === 0) return;
    onAction({ action, id });
  };
}
