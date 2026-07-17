export function readTextValue(event: Event): string | null {
  const target = event.currentTarget;
  return target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement
    ? target.value
    : null;
}
