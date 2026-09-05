import { createPortal } from "react-dom";

export function ToastPortal({
  message,
  container,
}: {
  message: string;
  container: HTMLElement;
}) {
  return createPortal(
    <p role="status">{message}</p>,
    container,
  );
}
