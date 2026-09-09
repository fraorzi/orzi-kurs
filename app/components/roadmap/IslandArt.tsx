import styles from "./roadmap.module.css";
import { createElement } from "react";
import { trackIcon, trackMeta } from "@/app/lib/tracks";

export default function IslandArt({
  complete = false,
  project = false,
  trackId,
}: {
  complete?: boolean;
  project?: boolean;
  trackId: string;
}) {
  return (
    <svg className={styles.islandArt} data-track={trackId} style={{ color: trackMeta(trackId).color }} viewBox="0 0 180 160" fill="none" aria-hidden="true">
      <ellipse className={styles.groundShadow} cx="90" cy="146" rx="56" ry="10" />
      <g className={styles.land}>
        <path className={styles.rockDark} d="m18 87 21 35 29 8 21 15 25-14 28-10 21-37-72-23Z" />
        <path className={styles.rockLight} d="m18 87 44 16 27 42-21-15-29-8Z" />
        <path className={styles.rockMid} d="m62 103 55-1-28 43Z" />
        <path className={styles.rockLight} d="m117 102 46-18-21 37-28 10Z" />
        <path
          className={styles.soil}
          d="m18 76 26-19 49-9 47 12 23 16v12l-38 20-39 7-45-15-23-12Z"
        />
        <path className={styles.grass} d="m18 76 26-19 49-9 47 12 23 16-38 20-39 7-45-15Z" />
        <path className={styles.grassEdge} d="m18 76 23 12 45 15 39-7 38-20" />
        <path className={styles.trail} d="m51 90 27-13 28 6 27-10" />
        <ellipse className={styles.objectShadow} cx="87" cy="77" rx="27" ry="9" />
        {project ? (
          <g>
            <path className={styles.buildingSide} d="M64 45 89 57v27L64 72Z" />
            <path className={styles.buildingFront} d="m89 57 27-13v27L89 84Z" />
            <path className={styles.buildingRoof} d="m60 44 29-24 31 22-31 16Z" />
            <g className={styles.islandLogo} transform="matrix(.72 -.35 0 .85 93 59)">
              {createElement(trackIcon(trackId), { width: 25, height: 25 })}
            </g>
            <path className={styles.window} d="m71 53 8 4v10l-8-4Z" />
          </g>
        ) : (
          <g>
            <path className={styles.markerSide} d="m68 41 18 7v35l-18-8Z" />
            <path className={styles.markerFront} d="m86 48 25-12v35L86 83Z" />
            <path className={styles.markerTop} d="m68 41 25-12 18 7-25 12Z" />
            <g className={styles.islandLogo} transform="matrix(.75 -.36 0 1 90 51)">
              {createElement(trackIcon(trackId), { width: 24, height: 24 })}
            </g>
          </g>
        )}
        <g className={styles.tree}>
          <path className={styles.treeTrunk} d="M132 70V48" />
          <path className={styles.treeDark} d="m119 56 13-29 14 28-14 7Z" />
          <path className={styles.treeLight} d="m119 56 13-29v35Z" />
        </g>
        <path className={styles.pebble} d="m36 73 8-4 9 5-9 5Z" />
        <path className={styles.grassDetail} d="m117 87 2-6 3 4m-61-5 2-5 3 4" />
        {complete && <path className={styles.flag} d="M47 58V28m0 0 20 6-20 7" />}
      </g>
    </svg>
  );
}
