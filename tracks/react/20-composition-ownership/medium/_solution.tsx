import { useId, type ReactNode } from "react";

export function Card({
  title,
  children,
  actions,
}: {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  const titleId = useId();

  return (
    <section aria-labelledby={titleId}>
      <h2 id={titleId}>{title}</h2>
      {children}
      {actions && <footer>{actions}</footer>}
    </section>
  );
}
