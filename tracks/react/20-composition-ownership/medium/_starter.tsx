import { useId, type ReactNode } from "react";

export function Card({
  title,
  children: _children,
  actions: _actions,
}: {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  const titleId = useId();

  return (
    <section aria-labelledby={titleId}>
      <h2 id={titleId}>{title}</h2>
      <p>Stała zawartość</p>
    </section>
  );
}
