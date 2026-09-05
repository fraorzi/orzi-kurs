export function ToastPortal({
  message,
  container: _container,
}: {
  message: string;
  container: HTMLElement;
}) {
  return <p role="status">{message}</p>;
}
