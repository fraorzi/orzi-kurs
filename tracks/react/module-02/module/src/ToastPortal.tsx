export function ToastPortal({
  message,
  container: _container,
}: {
  readonly message: string;
  readonly container: HTMLElement;
}) {
  return <p role="status">{message}</p>;
}
