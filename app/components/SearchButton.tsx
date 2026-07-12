"use client";

import { IconSearch } from "./icons";

export default function SearchButton() {
  return (
    <button
      className="btn-ghost"
      onClick={() => window.dispatchEvent(new CustomEvent("orzi:search"))}
      aria-label="Szukaj zadania"
    >
      <IconSearch />
      <span>Szukaj</span>
      <span className="kbd">⌘K</span>
    </button>
  );
}
