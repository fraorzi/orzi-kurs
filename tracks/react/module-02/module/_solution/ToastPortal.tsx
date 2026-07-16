import { createPortal } from "react-dom";

export function ToastPortal({
  message,
  container,
}: {
  readonly message: string;
  readonly container: HTMLElement;
}) {
  return createPortal(<p role="status">{message}</p>, container);
}
