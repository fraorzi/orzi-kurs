"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { IconCheck } from "./icons";

export interface SelectOption {
  value: string;
  label: string;
  detail?: string;
  leading?: ReactNode;
}

export default function SelectMenu({ label, menuLabel = label, options, value, onChange }: {
  label: string;
  menuLabel?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const menu = root.current?.querySelector('[role="menu"]');
    (menu?.querySelector<HTMLButtonElement>('[aria-checked="true"]')
      ?? menu?.querySelector<HTMLButtonElement>("button"))?.focus({ preventScroll: true });
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus({ preventScroll: true });
      }
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  if (!selected) return null;
  return (
    <div className="select-menu" ref={root} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <button ref={trigger} className="trackswitch select-trigger" type="button"
        aria-haspopup="menu" aria-expanded={open} aria-controls={menuId}
        aria-label={`${label}, ${selected.label}`} onClick={() => setOpen(!open)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
          }
        }}>
        {selected.leading && <span className="select-leading">{selected.leading}</span>}
        <span className="select-label">{selected.label}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
      </button>
      {open && <div className="trackpop select-options" id={menuId} role="menu" aria-label={menuLabel}
        onKeyDown={(event) => {
          const items = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button[role="menuitemradio"]'));
          const index = items.findIndex((item) => item === document.activeElement);
          let next: number;
          switch (event.key) {
            case "ArrowDown": next = (index + 1) % items.length; break;
            case "ArrowUp": next = (index - 1 + items.length) % items.length; break;
            case "Home": next = 0; break;
            case "End": next = items.length - 1; break;
            default: return;
          }
          event.preventDefault();
          items[next]?.focus({ preventScroll: true });
          items[next]?.scrollIntoView?.({ block: "nearest" });
        }}>
        {options.map((option) => <button key={option.value} type="button" role="menuitemradio"
          aria-checked={option.value === selected.value} className="trackpop-item select-option"
          onClick={() => { onChange(option.value); setOpen(false); trigger.current?.focus({ preventScroll: true }); }}>
          {option.leading && <span className="select-leading">{option.leading}</span>}
          <span className="select-copy"><span className="select-label">{option.label}</span>{option.detail && <small>{option.detail}</small>}</span>
          {option.value === selected.value && <IconCheck className="ck" />}
        </button>)}
      </div>}
    </div>
  );
}
