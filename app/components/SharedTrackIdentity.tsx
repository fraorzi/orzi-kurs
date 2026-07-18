"use client";

import { motion } from "motion/react";
import { trackMeta } from "@/app/lib/tracks";
import { SHARED_LAYOUT_TRANSITION } from "@/app/lib/route-motion";
import TrackBadge from "./TrackBadge";

export default function SharedTrackIdentity({
  className,
  labelId,
  trackId,
}: {
  className?: string;
  labelId?: string;
  trackId: string;
}) {
  return (
    <motion.span
      className={className}
      id={labelId}
      layout="position"
      layoutId={`track-identity-${trackId}`}
      transition={SHARED_LAYOUT_TRANSITION}
    >
      <TrackBadge id={trackId} size="sm" />
      <strong>{trackMeta(trackId).name}</strong>
    </motion.span>
  );
}
