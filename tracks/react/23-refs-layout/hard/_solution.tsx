import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export function AdaptiveTooltip({
  label,
}: {
  readonly label: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState<"top" | "bottom">("bottom");
  const anchorRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isOpen || !anchorRef.current || !tooltipRef.current) {
      return;
    }

    const anchor = anchorRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current.getBoundingClientRect();
    setPlacement(
      window.innerHeight - anchor.bottom < tooltip.height &&
        anchor.top >= tooltip.height
        ? "top"
        : "bottom",
    );
  }, [isOpen, label]);

  return (
    <div>
      <button
        ref={anchorRef}
        type="button"
        aria-describedby={isOpen ? "adaptive-tooltip" : undefined}
        onClick={() => setIsOpen((open) => !open)}
      >
        Szczegóły
      </button>
      {isOpen && (
        <div
          ref={tooltipRef}
          id="adaptive-tooltip"
          role="tooltip"
          data-placement={placement}
        >
          {label}
        </div>
      )}
    </div>
  );
}

