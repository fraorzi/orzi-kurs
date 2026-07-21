"use client";

import { useEffect, useState } from "react";
import { IconSearch } from "./icons";
import styles from "./shell.module.css";

export default function SearchButton() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    function syncState(event: Event) {
      setExpanded(Boolean((event as CustomEvent<boolean>).detail));
    }
    window.addEventListener("orzi:search-state", syncState);
    return () => window.removeEventListener("orzi:search-state", syncState);
  }, []);

  return (
    <button
      type="button"
      className={`btn-ghost ${styles.searchButton}`}
      onClick={() => window.dispatchEvent(new CustomEvent("orzi:search"))}
      aria-label="Szukaj zadania"
      aria-haspopup="dialog"
      aria-expanded={expanded}
      aria-controls="command-palette"
    >
      <IconSearch />
      <span className={styles.searchLabel}>Szukaj</span>
      <span className={`kbd ${styles.searchShortcut}`}>⌘K</span>
    </button>
  );
}
