"use client";

import { useId, useState, type ReactNode } from "react";
import styles from "./animated-disclosure.module.css";

export default function AnimatedDisclosure({
  children,
  className,
  defaultOpen = false,
  lazy = false,
  trigger,
  triggerClassName,
}: {
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  lazy?: boolean;
  trigger: ReactNode;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [hasOpened, setHasOpened] = useState(defaultOpen);
  const id = useId();
  const triggerId = `${id}-trigger`;
  const contentId = `${id}-content`;

  return (
    <div className={className} data-open={open ? "true" : "false"}>
      <button
        className={triggerClassName}
        id={triggerId}
        type="button"
        aria-controls={contentId}
        aria-expanded={open}
        onClick={() => {
          setOpen((value) => !value);
          setHasOpened(true);
        }}
      >
        {trigger}
        <span
          className={styles.indicator}
          data-open={open ? "true" : "false"}
          aria-hidden="true"
        />
      </button>
      <div
        className={styles.reveal}
        data-open={open ? "true" : "false"}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={open ? undefined : true}
        inert={open ? undefined : true}
      >
        <div className={styles.inner}>{!lazy || hasOpened ? children : null}</div>
      </div>
    </div>
  );
}
