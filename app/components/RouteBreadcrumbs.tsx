"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  SHARED_LAYOUT_TRANSITION,
  topicNumberLayoutId,
  topicTitleLayoutId,
} from "@/app/lib/route-motion";
import { trackMeta } from "@/app/lib/tracks";
import TrackBadge from "./TrackBadge";
import styles from "./shell.module.css";

interface TopicCrumb {
  id: string;
  number: string;
  title: string;
}

interface LevelCrumb {
  compactLabel: string;
  label: string;
}

function SharedCrumb({
  children,
  current,
  href,
  layoutId,
  track,
}: {
  children: React.ReactNode;
  current: boolean;
  href?: string;
  layoutId: string;
  track?: boolean;
}) {
  return (
    <motion.span
      className={`${styles.sharedCrumb}${track ? ` ${styles.trackCrumb}` : ""}${current ? " cur" : ""}`}
      layout="position"
      layoutId={layoutId}
      transition={SHARED_LAYOUT_TRANSITION}
      aria-current={current ? "page" : undefined}
    >
      {href ? <Link href={href}>{children}</Link> : children}
    </motion.span>
  );
}

function SharedTopicCrumb({
  current,
  href,
  topic,
  trackId,
}: {
  current: boolean;
  href?: string;
  topic: TopicCrumb;
  trackId: string;
}) {
  const content = (
    <>
      <motion.span
        layout="position"
        layoutId={topicNumberLayoutId(trackId, topic.id)}
        transition={SHARED_LAYOUT_TRANSITION}
      >
        {topic.number}
      </motion.span>
      <motion.span
        layout="position"
        layoutId={topicTitleLayoutId(trackId, topic.id)}
        transition={SHARED_LAYOUT_TRANSITION}
      >
        {topic.title}
      </motion.span>
    </>
  );

  return (
    <span
      className={`${styles.sharedCrumb}${current ? " cur" : ""}`}
      aria-current={current ? "page" : undefined}
    >
      {href ? <Link href={href}>{content}</Link> : content}
    </span>
  );
}

export default function RouteBreadcrumbs({
  level,
  topic,
  trackId,
}: {
  level?: LevelCrumb;
  topic?: TopicCrumb;
  trackId?: string;
}) {
  const track = trackId ? trackMeta(trackId) : null;

  return (
    <nav className="crumbs" aria-label="Okruszki">
      <SharedCrumb
        current={!track}
        href={track ? "/" : undefined}
        layoutId="course-root-identity"
      >
        orzi-kurs
      </SharedCrumb>

      {track && (
        <>
          <span className="sep" aria-hidden="true">/</span>
          <SharedCrumb
            current={!topic}
            href={topic ? `/track/${track.id}` : undefined}
            layoutId={`track-identity-${track.id}`}
            track
          >
            <TrackBadge id={track.id} size="sm" />
            <span>{track.name}</span>
          </SharedCrumb>
        </>
      )}

      {track && topic && (
        <>
          <span className="sep" aria-hidden="true">/</span>
          <SharedTopicCrumb
            current={!level}
            href={level ? `/track/${track.id}/${topic.id}` : undefined}
            topic={topic}
            trackId={track.id}
          />
        </>
      )}

      {track && topic && level && (
        <>
          <span className="sep" aria-hidden="true">/</span>
          <SharedCrumb
            current
            layoutId={`level-identity-${track.id}-${topic.id}-${level.label}`}
          >
            <span className="crumb-wide">{level.label}</span>
            <span className="crumb-compact">{level.compactLabel}</span>
          </SharedCrumb>
        </>
      )}
    </nav>
  );
}
