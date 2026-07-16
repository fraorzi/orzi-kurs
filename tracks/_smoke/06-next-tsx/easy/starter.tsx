"use client";

import { usePathname } from "next/navigation";

export function CurrentPath() {
  void usePathname;
  return <p>Ścieżka: /</p>;
}
