"use client";

import { usePathname } from "next/navigation";

export function CurrentPath() {
  const pathname = usePathname();
  return <p>Ścieżka: {pathname}</p>;
}
