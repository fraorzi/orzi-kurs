import { createElement } from "react";
import { trackMeta, trackIcon } from "@/app/lib/tracks";

export default function TrackBadge({ id, size }: { id: string; size?: "sm" | "lg" }) {
  const meta = trackMeta(id);
  return (
    <span className={`track-icon${size ? ` ${size}` : ""}`} style={{ color: meta.color }}>
      {createElement(trackIcon(id))}
    </span>
  );
}
