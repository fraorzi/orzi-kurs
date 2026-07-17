import type { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  readonly children: ReactNode;
}) {
  return <div>{children}</div>;
}
