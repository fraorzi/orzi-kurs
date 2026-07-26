export type Action = "edit" | "delete" | "archive";

export type ActionRequest = {
  action: Action;
  id: string;
};

export function createActionHandler(
  onAction: (request: ActionRequest) => void,
): (event: Event) => void {
  // TODO
  return () => {};
}
