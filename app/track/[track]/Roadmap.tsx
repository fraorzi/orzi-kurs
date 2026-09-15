"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import SearchButton from "@/app/components/SearchButton";
import RouteBreadcrumbs from "@/app/components/RouteBreadcrumbs";
import SelectMenu from "@/app/components/SelectMenu";
import TopicTag from "@/app/components/TopicTag";
import { IconArrowRight, IconCheck, IconStageIndex } from "@/app/components/icons";
import type { CatalogTrack } from "@/app/lib/types";
import { isCompletedStatus, learningModules, topicNumber, topicSlug, topicTag, STATUS_LABEL } from "@/app/lib/tracks";
import { COURSE_FILTERS, courseFilter, courseQuery, courseStagePercent, matchesCourseFilter, nextUnfinishedTask, selectedCourseStage } from "@/app/lib/course-navigation";

export default function Roadmap({ track, name, now, stageId, filter: requestedFilter }: {
  track: CatalogTrack;
  name: string;
  now: string;
  stageId?: string;
  filter?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const stages = learningModules(track, now);
  const stage = selectedCourseStage(track, stageId);
  const filter = courseFilter(requestedFilter);
  if (!stage) return <div className="wrap"><h1 className="title">{name}</h1><p>Ten kurs nie ma jeszcze zadań.</p></div>;
  const query = courseQuery(stage.id, filter);
  const tasks = stage.topics.flatMap((topic) => topic.levels);
  const next = nextUnfinishedTask(stage.topics);
  const topics = stage.topics.filter((topic) => topic.levels.some((level) => matchesCourseFilter(level, filter, now)));

  return <>
    <div className="topbar"><RouteBreadcrumbs trackId={track.id} /><span className="grow" /><SearchButton /></div>
    <div className="wrap course-program" aria-busy={pending}>
      <div className="course-stage-picker"><SelectMenu label="Wybierz etap" value={stage.id}
        options={stages.map((item, index) => ({ value: item.id, label: item.title, detail: `${courseStagePercent(item.passed, item.total)}% zrobione`, leading: <IconStageIndex n={index + 1} /> }))}
        onChange={(id) => startTransition(() => router.push(`/track/${track.id}?${courseQuery(id, filter)}`, { scroll: false }))} /></div>
      <header className="course-heading">
        <div><p className="course-eyebrow">{name} / Etap {stages.findIndex((item) => item.id === stage.id) + 1} z {stages.length}</p>
          <h1 className="title">{stage.title}</h1><p className="lede">{stage.description}</p></div>
        <div className="course-stage-progress"><strong className="num">{stage.passed}<span> / {stage.total}</span></strong><small>zadań zaliczonych</small>
          <div className="course-segments" aria-hidden="true">{tasks.map((task, index) => <i key={index} className={isCompletedStatus(task.status) ? "done" : ""} />)}</div></div>
      </header>
      {next && <div className="course-next"><div><small>{next.level.attempts > 0 ? "Wróć do rozpoczętego zadania" : "Następne w tym etapie"}</small>
        <strong>{topicNumber(next.topic.id)} / {next.topic.title} <span className="course-next-level">{next.level.id}</span></strong></div>
        <Link className="submit" href={`/track/${next.topic.id}/${next.level.id}?${query}`}>Kontynuuj <IconArrowRight /></Link></div>}
      <div className="course-filters" role="group" aria-label="Status zadań">
        {COURSE_FILTERS.map(([key, label]) => <Link key={key} href={`/track/${track.id}?${courseQuery(stage.id, key)}`} scroll={false}
          className={filter === key ? "active" : ""} aria-current={filter === key ? "page" : undefined}>
          {label}<span className="num">{tasks.filter((task) => matchesCourseFilter(task, key, now)).length}</span>
        </Link>)}
      </div>
      <div className="course-table-head" aria-hidden="true"><span>Temat</span><span>Easy</span><span>Medium</span><span>Hard</span></div>
      {topics.map((topic) => { const tag = topicTag(topic.id); return <div className={`course-topic${topic.levels.every((level) => isCompletedStatus(level.status)) ? " complete" : ""}`} key={topic.id}>
        <div className="course-topic-copy"><span className="course-topic-number mono">{topicNumber(topic.id)}</span><div>
          <Link className="course-topic-title" href={`/track/${track.id}/${topicSlug(topic.id)}?${query}`}>{topic.title}</Link>
          {tag && <TopicTag tag={tag} />}
        </div></div>
        {topic.levels.map((level) => <Link key={level.id}
          href={`/track/${topic.id}/${level.id}?${query}`}
          className={`course-level ${level.status}${!["easy", "medium", "hard"].includes(level.id) ? " project" : ""}${filter !== "todo" && !matchesCourseFilter(level, filter, now) ? " filtered" : ""}`}
          tabIndex={filter !== "todo" && !matchesCourseFilter(level, filter, now) ? -1 : undefined}
          aria-hidden={filter !== "todo" && !matchesCourseFilter(level, filter, now) ? true : undefined}
          aria-label={`${topic.title}, ${level.id}: ${STATUS_LABEL[level.status]}`}
          style={level.id === "easy" ? { gridColumn: 2 } : level.id === "medium" ? { gridColumn: 3 } : level.id === "hard" ? { gridColumn: 4 } : undefined}>
          <span className="course-level-label">{level.id === "module" ? "Projekt" : level.id}</span>
          {isCompletedStatus(level.status) ? <><IconCheck /><span className="sr-only">{STATUS_LABEL[level.status]}</span>{level.status === "passed-with-hint" && <span className="course-hint-mark" aria-hidden="true">?</span>}</>
            : <><span className="course-start">Start</span><IconArrowRight /></>}
        </Link>)}
      </div>; })}
      {topics.length === 0 && <div className="road-empty"><strong>Brak zadań w tym widoku</strong><span>{filter === "todo" ? "Wszystkie zadania tego etapu są zaliczone." : "Wybierz inny filtr, aby zobaczyć zadania."}</span>
        <Link className="btn-ghost" href={`/track/${track.id}?${courseQuery(stage.id, "all")}`}>Pokaż wszystkie</Link></div>}
      <div className="course-legend"><span><IconCheck /> Zaliczone</span><span>? Zaliczone ze wskazówką</span><span>Wybierz poziom, aby otworzyć zadanie.</span></div>
    </div>
  </>;
}
