import type { CSSProperties } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { buildCatalog } from "@/harness/catalog";
import AnimatedDisclosure from "@/app/components/AnimatedDisclosure";
import SearchButton from "@/app/components/SearchButton";
import RouteBreadcrumbs from "@/app/components/RouteBreadcrumbs";
import SharedTrackIdentity from "@/app/components/SharedTrackIdentity";
import TrackBadge from "@/app/components/TrackBadge";
import { IconArrowRight } from "@/app/components/icons";
import {
  TRACK_META,
  isCompletedStatus,
  isReviewDue,
  nextLearningTarget,
  pct,
  topicNumber,
  topicSlug,
  trackMeta,
  trackProgress,
} from "@/app/lib/tracks";
import type { CatalogLevel, CatalogTopic, CatalogTrack } from "@/app/lib/types";
import { sortTracksByLearningOrder } from "@/curriculum/order";
import styles from "./home.module.css";

const POLISH_PLURALS = new Intl.PluralRules("pl-PL");

interface DashboardTask {
  track: CatalogTrack;
  topic: CatalogTopic;
  level: CatalogLevel;
}

interface DashboardTrack {
  track: CatalogTrack;
  tasks: DashboardTask[];
  target: DashboardTask | null;
  targetIntent: "resume" | "review" | "start" | null;
  touched: number;
  attempts: number;
}

function taskHref({ track, topic, level }: DashboardTask): string {
  return `/track/${track.id}/${topicSlug(topic.id)}/${level.id}`;
}

function taskTitle(topic: CatalogTopic): string {
  const number = topicNumber(topic.id);
  return `${number ? `${number} ` : ""}${topic.title}`;
}

function countLabel(count: number, one: string, few: string, many: string): string {
  const category = POLISH_PLURALS.select(count);
  return `${count} ${category === "one" ? one : category === "few" ? few : many}`;
}

function ProgressTrackList({ tracks }: { tracks: CatalogTrack[] }) {
  return (
    <ul className={styles.progressList}>
      {tracks.map((track) => {
        const progress = trackProgress(track);
        const percentage = pct(progress);
        const meta = trackMeta(track.id);

        return (
          <li className={styles.progressItem} key={track.id}>
            <Link
              className={styles.progressLink}
              href={`/track/${track.id}`}
              aria-label={`${meta.name}, ${progress.passed} z ${progress.total} poziomów, ${percentage}%. Otwórz ścieżkę`}
              style={{
                "--progress": percentage / 100,
                "--progress-color": meta.color,
              } as CSSProperties}
            >
              <SharedTrackIdentity
                className={styles.progressName}
                labelId={`progress-label-${track.id}`}
                trackId={track.id}
              />
              <span className={styles.progressStats}>
                <span>{progress.passed} z {progress.total} poziomów</span>
                <strong>{percentage}%</strong>
              </span>
              <div
                className={styles.progressBar}
                role="progressbar"
                aria-labelledby={`progress-label-${track.id}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percentage}
                aria-valuetext={`${progress.passed} z ${progress.total} poziomów (${percentage}%)`}
              >
                <span
                  className={styles.progressFill}
                  aria-hidden="true"
                />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default async function Home() {
  await connection();

  const catalog = buildCatalog();
  const activeIds = new Set(catalog.tracks.map((track) => track.id));
  const upcoming = TRACK_META.filter((track) => !activeIds.has(track.id));
  const now = new Date();
  const dashboardTracks: DashboardTrack[] = sortTracksByLearningOrder(
    catalog.tracks,
  ).map((track) => {
    const tasks = track.topics.flatMap((topic) =>
      topic.levels.map((level) => ({ track, topic, level })),
    );
    const target = nextLearningTarget(track, now);

    return {
      track,
      tasks,
      target: target ? { track, topic: target.topic, level: target.level } : null,
      targetIntent: target?.intent ?? null,
      touched: tasks.filter(({ level }) => level.status !== "not-started").length,
      attempts: tasks.reduce((total, { level }) => total + level.attempts, 0),
    };
  });
  const rankedTracks = [...dashboardTracks].sort((left, right) =>
    right.touched - left.touched ||
    trackProgress(right.track).passed - trackProgress(left.track).passed ||
    right.attempts - left.attempts,
  );
  const focusTrack = rankedTracks.find(({ targetIntent }) => targetIntent === "resume") ??
    rankedTracks.find(({ targetIntent }) => targetIntent === "review") ??
    rankedTracks.find(({ target, touched }) => target !== null && touched > 0) ??
    rankedTracks.find(({ target }) => target !== null) ??
    rankedTracks[0];
  const focusTask = focusTrack?.target ?? null;
  const queue = focusTask && focusTrack
    ? focusTrack.tasks
        .filter(({ topic, level }) =>
          (topic.id !== focusTask.topic.id || level.id !== focusTask.level.id) &&
          (!isCompletedStatus(level.status) || isReviewDue(level, now)),
        )
        .slice(0, 3)
    : [];
  const focusProgress = focusTrack ? trackProgress(focusTrack.track) : null;
  const focusMode = !focusTask
    ? "complete"
    : focusTrack?.targetIntent === "review"
      ? "review"
      : focusTrack?.targetIntent === "resume"
        ? "resume"
        : focusTrack && focusTrack.touched > 0
          ? "continue"
          : "start";
  const startedProgressEntries = dashboardTracks.filter(({ touched }) => touched > 0);

  return (
    <>
      <div className="topbar">
        <RouteBreadcrumbs />
        <span className="grow" />
        <SearchButton />
      </div>

      <div className={styles.page}>
        <section className={styles.today} aria-labelledby="today-title">
          <header className={styles.todayHeader}>
            <h1 id="today-title">Dzisiaj</h1>
            <p>Jeden konkretny krok, bez przeglądania całego katalogu.</p>
          </header>

          {focusTask && focusTrack && focusProgress ? (
            <div className={styles.focus}>
              <div className={styles.focusTrack}>
                <TrackBadge id={focusTrack.track.id} size="lg" />
                <div>
                  <strong>{trackMeta(focusTrack.track.id).name}</strong>
                  <span>{focusProgress.passed} z {focusProgress.total} poziomów</span>
                </div>
              </div>
              <div className={styles.focusDetails}>
                <p className={styles.focusLabel}>
                  {focusMode === "review" && "Powtórka na dziś"}
                  {focusMode === "resume" && "Wróć do rozpoczętego zadania"}
                  {focusMode === "continue" && "Następny krok"}
                  {focusMode === "start" && "Pierwszy krok"}
                  <span aria-hidden="true"> · </span>
                  <span className={styles.level}>{focusTask.level.id}</span>
                </p>
                <h2>{taskTitle(focusTask.topic)}</h2>
                <p className={styles.focusCopy}>
                  {focusMode === "review" && "Termin powtórki już minął. Krótki powrót teraz pomoże utrwalić materiał."}
                  {focusMode === "resume" && "Zadanie ma niezakończoną próbę. Wróć do niego i dokończ ten krok."}
                  {focusMode === "continue" && "Poprzedni krok jest za Tobą. To pierwsze nieukończone zadanie w tej ścieżce."}
                  {focusMode === "start" && "Rozpocznij od pierwszego dostępnego zadania i zbuduj swój plan nauki w praktyce."}
                </p>
              </div>
              <Link className={styles.primaryAction} href={taskHref(focusTask)}>
                {focusMode === "review" && "Powtórz zadanie"}
                {focusMode === "resume" && "Wznów zadanie"}
                {focusMode === "continue" && "Kontynuuj ścieżkę"}
                {focusMode === "start" && "Zacznij naukę"}
                <IconArrowRight />
              </Link>
            </div>
          ) : focusTrack ? (
            <div className={styles.focus}>
              <div className={styles.focusTrack}>
                <TrackBadge id={focusTrack.track.id} size="lg" />
                <div>
                  <strong>{trackMeta(focusTrack.track.id).name}</strong>
                  <span>Wszystkie poziomy ukończone</span>
                </div>
              </div>
              <div className={styles.focusDetails}>
                <p className={styles.focusLabel}>Ścieżka ukończona</p>
                <h2>Ścieżka jest kompletna</h2>
                <p className={styles.focusCopy}>Możesz wrócić do roadmapy i wybrać materiał do powtórki.</p>
              </div>
              <Link className={styles.primaryAction} href={`/track/${focusTrack.track.id}`}>
                Przejrzyj ścieżkę
                <IconArrowRight />
              </Link>
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.focusDetails}>
                <h2>Brak dostępnych zadań</h2>
                <p>Gdy pojawi się pierwsza ścieżka, znajdziesz tutaj następny krok.</p>
              </div>
            </div>
          )}
        </section>

        <section className={styles.progress} aria-labelledby="progress-title">
          <header className={styles.sectionHeader}>
            <div>
              <h2 id="progress-title">Postęp ścieżek</h2>
              <p>
                {countLabel(
                  startedProgressEntries.length,
                  "rozpoczęta ścieżka",
                  "rozpoczęte ścieżki",
                  "rozpoczętych ścieżek",
                )}
                <span aria-hidden="true"> · </span>
                {countLabel(
                  dashboardTracks.length,
                  "dostępna ścieżka",
                  "dostępne ścieżki",
                  "dostępnych ścieżek",
                )}
              </p>
            </div>
          </header>

          <ProgressTrackList tracks={dashboardTracks.map(({ track }) => track)} />
        </section>

        <div className={styles.secondary}>
          {queue.length > 0 && (
            <AnimatedDisclosure
              className={styles.disclosure}
              triggerClassName={styles.disclosureTrigger}
              trigger={
                <span>
                  <span className={styles.disclosureTitle}>Kolejka nauki</span>
                  <small>{countLabel(queue.length, "następne zadanie", "następne zadania", "następnych zadań")}</small>
                </span>
              }
            >
              <ol className={styles.queueList}>
                {queue.map((task) => (
                  <li key={`${task.topic.id}/${task.level.id}`}>
                    <Link href={taskHref(task)}>
                      <span>{taskTitle(task.topic)}</span>
                      <small className={styles.level}>{task.level.id}</small>
                    </Link>
                  </li>
                ))}
              </ol>
            </AnimatedDisclosure>
          )}

          {upcoming.length > 0 && (
            <AnimatedDisclosure
              className={styles.disclosure}
              triggerClassName={styles.disclosureTrigger}
              trigger={
                <span>
                  <span className={styles.disclosureTitle}>Wkrótce</span>
                  <small>{countLabel(upcoming.length, "planowana ścieżka", "planowane ścieżki", "planowanych ścieżek")}</small>
                </span>
              }
            >
              <ul className={styles.upcomingList}>
                {upcoming.map((track) => (
                  <li key={track.id}>
                    <TrackBadge id={track.id} size="sm" />
                    <span>{track.name}</span>
                    <small>{track.category}</small>
                  </li>
                ))}
              </ul>
            </AnimatedDisclosure>
          )}
        </div>
      </div>
    </>
  );
}
