"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import AnimatedDisclosure from "@/app/components/AnimatedDisclosure";
import Markdown from "@/app/components/Markdown";
import RouteBreadcrumbs from "@/app/components/RouteBreadcrumbs";
import SearchButton from "@/app/components/SearchButton";
import UndoToast from "@/app/components/UndoToast";
import { IconArrowRight, IconCopy, IconCheck, IconExternal, IconPlay } from "@/app/components/icons";
import { openInEditor } from "@/app/lib/actions";
import {
  buildCodeDiff,
  type CodeDiffChangeReason,
  type CodeDiffRow,
} from "@/app/lib/code-diff";
import {
  loadUndoRecords,
  removeUndoRecord,
  storeUndoRecord,
  UNDO_DURATION_MS,
} from "@/app/lib/task-undo";
import type { LearningResource, SubmitResult, TaskProgress, TaskResponse } from "@/app/lib/types";
import { topicNumber } from "@/app/lib/tracks";
import type { StarterSnapshot, TaskUndoRecord } from "@/shared/task-undo";

interface Props {
  taskId: string;
  track: string;
  topic: string;
  topicTitle: string;
  level: string;
  taskMd: string;
  hintsTotal: number;
  initialHints: string[];
  starterPath: string | null;
  starterRel: string | null;
  initialSolution: string | null;
  initialStarter: string | null;
  initialProgress: TaskProgress | null;
  initialPassKind: "with-hint" | "without-hint" | null;
  resources: LearningResource[];
  nextTaskHref: string | null;
}

export default function TaskView({
  taskId,
  track,
  topic,
  topicTitle,
  level,
  taskMd,
  hintsTotal,
  initialHints,
  starterPath,
  starterRel,
  initialSolution,
  initialStarter,
  initialProgress,
  initialPassKind,
  resources,
  nextTaskHref,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [solution, setSolution] = useState<string | null>(initialSolution);
  const [starter, setStarter] = useState<string | null>(initialStarter);
  const [currentStarterPath, setCurrentStarterPath] = useState(starterPath);
  const [currentStarterRel, setCurrentStarterRel] = useState(starterRel);
  const [progress, setProgress] = useState<TaskProgress | null>(initialProgress);
  const [passKind, setPassKind] = useState(initialPassKind);
  const [copied, setCopied] = useState(false);
  const [hints, setHints] = useState<string[]>(initialHints);
  const [hintError, setHintError] = useState<string | null>(null);
  const [loadingHint, setLoadingHint] = useState(false);
  const [openingEditor, setOpeningEditor] = useState(false);
  const [editorError, setEditorError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);
  const [resettingCode, setResettingCode] = useState(false);
  const [undoRecords, setUndoRecords] = useState<TaskUndoRecord<TaskProgress>[]>([]);
  const [undoingId, setUndoingId] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => setUndoRecords(loadUndoRecords(taskId));
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [taskId]);

  useEffect(() => {
    if (undoRecords.length === 0) return;
    const nextExpiry = Math.min(...undoRecords.map((record) => record.expiresAt));
    const timer = window.setTimeout(
      () => setUndoRecords(loadUndoRecords(taskId)),
      Math.max(0, nextExpiry - Date.now() + 180),
    );
    return () => window.clearTimeout(timer);
  }, [taskId, undoRecords]);

  function activateUndoRecord(record: TaskUndoRecord<TaskProgress>) {
    const activatedAt = Date.now();
    storeUndoRecord({
      ...record,
      createdAt: activatedAt,
      expiresAt: activatedAt + UNDO_DURATION_MS,
    });
    setUndoRecords(loadUndoRecords(taskId));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setResult(null);
    setSubmitError(null);
    setSolution(null);
    setStarter(null);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, usedHint: hints.length > 0 }),
      });
      const data: SubmitResult = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "nie udało się sprawdzić zadania");
        return;
      }
      setResult(data);
      setProgress(data.progress ?? null);
      window.dispatchEvent(new CustomEvent("orzi:progress"));
      if (data.passed) {
        setPassKind(data.usedHint === true ? "with-hint" : "without-hint");
        try {
          const taskRes = await fetch(`/api/task?id=${encodeURIComponent(taskId)}`);
          const taskData: TaskResponse = await taskRes.json();
          if (!taskRes.ok) {
            setSubmitError(taskData.error ?? "Zadanie zaliczone, ale nie udało się pobrać porównania. Odśwież stronę.");
          } else {
            setSolution(taskData.solution ?? null);
            setStarter(taskData.starter ?? null);
          }
        } catch {
          setSubmitError("Zadanie zaliczone, ale nie udało się pobrać porównania. Odśwież stronę.");
        }
      } else {
        setPassKind(null);
      }
    } catch {
      setSubmitError("Nie udało się połączyć z lokalnym runnerem. Kod pozostał bez zmian — spróbuj ponownie.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCopyPath() {
    if (!currentStarterPath) return;
    await navigator.clipboard.writeText(currentStarterPath);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function handleOpenEditor() {
    if (!currentStarterRel) return;
    setOpeningEditor(true);
    setEditorError(null);
    try {
      const res = await openInEditor(currentStarterRel);
      if (!res.ok) setEditorError(res.error ?? "nie udało się otworzyć WebStorm");
    } finally {
      setOpeningEditor(false);
    }
  }

  async function handleRevealHint(n: number) {
    setLoadingHint(true);
    setHintError(null);
    try {
      const res = await fetch("/api/hint", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, n }),
      });
      const data: { hint?: string; progress?: TaskProgress; error?: string } = await res.json();
      if (!res.ok) {
        setHintError(data.error ?? "nie udało się pobrać hinta");
        return;
      }
      const hint = data.hint;
      if (!hint) {
        setHintError("Serwer nie zwrócił treści wskazówki.");
        return;
      }
      setHints((prev) => {
        const next = [...prev];
        next[n - 1] = hint;
        return next;
      });
      setProgress(data.progress ?? null);
    } catch {
      setHintError("Nie udało się pobrać wskazówki. Spróbuj ponownie.");
    } finally {
      setLoadingHint(false);
    }
  }

  const nextHintIndex = hints.length;

  async function handleResetProgress() {
    if (!progress) return;
    const now = Date.now();
    const undoRecord: TaskUndoRecord<TaskProgress> = {
      id: crypto.randomUUID(),
      taskId,
      kind: "progress",
      message: "Zresetowano postęp zadania.",
      payload: progress,
      createdAt: now,
      expiresAt: now + 60_000,
    };
    if (!storeUndoRecord(undoRecord)) {
      setSubmitError("Nie udało się przygotować cofnięcia. Postęp nie został zresetowany.");
      return;
    }

    setResetting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/progress", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, progress }),
      });
      const data: {
        progress?: TaskProgress | null;
        previousProgress?: TaskProgress | null;
        mutated?: boolean;
        error?: string;
      } = await res.json();
      if (!res.ok) {
        if (data.mutated === false) removeUndoRecord(undoRecord.id);
        else activateUndoRecord(undoRecord);
        setSubmitError(data.error ?? "nie udało się zresetować postępu");
        return;
      }
      setProgress(data.progress ?? null);
      setResult(null);
      setSolution(null);
      setStarter(null);
      setPassKind(null);
      window.dispatchEvent(new CustomEvent("orzi:progress"));
      activateUndoRecord({
        ...undoRecord,
        payload: data.previousProgress ?? undoRecord.payload,
      });
    } catch {
      activateUndoRecord(undoRecord);
      setSubmitError("Nie udało się zresetować postępu. Spróbuj ponownie.");
    } finally {
      setResetting(false);
    }
  }

  async function restoreInitialCode(revealedHints?: string[]): Promise<boolean> {
    setSubmitError(null);
    let undoRecord: TaskUndoRecord<TaskProgress> | null = null;
    try {
      const snapshotRes = await fetch(`/api/starter?id=${encodeURIComponent(taskId)}`);
      const snapshotData: { snapshot?: StarterSnapshot | null; error?: string } =
        await snapshotRes.json();
      if (!snapshotRes.ok || !snapshotData.snapshot) {
        setSubmitError(
          snapshotData.error ?? "Nie udało się przygotować kopii kodu. Kod nie został zresetowany.",
        );
        return false;
      }
      const now = Date.now();
      undoRecord = {
        id: crypto.randomUUID(),
        taskId,
        kind: "code",
        message: "Przywrócono kod początkowy.",
        payload: snapshotData.snapshot,
        revealedHints,
        createdAt: now,
        expiresAt: now + 60_000,
      };
      if (!storeUndoRecord(undoRecord)) {
        setSubmitError("Nie udało się przygotować cofnięcia. Kod nie został zresetowany.");
        return false;
      }

      const res = await fetch("/api/starter", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId }),
      });
      const data: {
        starterPath?: string | null;
        starterRel?: string | null;
        mutated?: boolean;
        error?: string;
      } = await res.json();
      if (!res.ok) {
        if (data.mutated === false) removeUndoRecord(undoRecord.id);
        else activateUndoRecord(undoRecord);
        setSubmitError(data.error ?? "nie udało się przywrócić kodu początkowego");
        return false;
      }
      setResult(null);
      setSolution(null);
      setStarter(null);
      setPassKind(null);
      setCurrentStarterPath(data.starterPath ?? null);
      setCurrentStarterRel(data.starterRel ?? null);
      activateUndoRecord(undoRecord);
      return true;
    } catch {
      if (undoRecord) activateUndoRecord(undoRecord);
      setSubmitError("Nie udało się przywrócić kodu początkowego. Spróbuj ponownie.");
      return false;
    }
  }

  async function handleResetCode() {
    setResettingCode(true);
    try {
      await restoreInitialCode();
    } finally {
      setResettingCode(false);
    }
  }

  async function handleRetryWithoutHint() {
    setResettingCode(true);
    setSubmitError(null);
    try {
      if (!await restoreInitialCode([...hints])) return;

      const res = await fetch("/api/hint", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId }),
      });
      const data: { progress?: TaskProgress | null; error?: string } = await res.json();
      if (!res.ok) {
        setSubmitError(
          data.error ?? "Kod został przywrócony, ale nie udało się wyczyścić stanu wskazówek.",
        );
        return;
      }

      setProgress(data.progress ?? null);
      setHints([]);
      setResult(null);
      setSolution(null);
      setStarter(null);
      setPassKind(null);
      document.getElementById("task-starter")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "center",
      });
    } catch {
      setSubmitError("Nie udało się rozpocząć próby bez wskazówek. Spróbuj ponownie.");
    } finally {
      setResettingCode(false);
    }
  }

  async function handleUndo(record: TaskUndoRecord<TaskProgress>) {
    setUndoingId(record.id);
    setSubmitError(null);
    try {
      const res = await fetch(record.kind === "code" ? "/api/starter" : "/api/progress", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          record.kind === "code"
            ? { taskId: record.taskId, snapshot: record.payload }
            : { taskId: record.taskId, progress: record.payload },
        ),
      });
      const data: {
        starterPath?: string | null;
        starterRel?: string | null;
        progress?: TaskProgress;
        error?: string;
      } = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "Nie udało się cofnąć resetu.");
        return;
      }

      if (record.kind === "code") {
        setCurrentStarterPath(data.starterPath ?? null);
        setCurrentStarterRel(data.starterRel ?? null);
        if (record.revealedHints && record.revealedHints.length > 0) {
          const hintRes = await fetch("/api/hint", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ taskId: record.taskId, n: record.revealedHints.length }),
          });
          const hintData: { progress?: TaskProgress; error?: string } = await hintRes.json();
          if (!hintRes.ok) {
            setSubmitError(hintData.error ?? "Kod przywrócono, ale nie udało się odtworzyć wskazówek.");
            return;
          }
          setHints(record.revealedHints);
          setProgress(hintData.progress ?? null);
        }
      } else {
        setProgress(data.progress ?? record.payload);
        window.dispatchEvent(new CustomEvent("orzi:progress"));
      }

      removeUndoRecord(record.id);
      setUndoRecords(loadUndoRecords(taskId));
    } catch {
      setSubmitError("Nie udało się cofnąć resetu. Spróbuj ponownie.");
    } finally {
      setUndoingId(null);
    }
  }

  return (
    <>
      <div className="topbar">
        <RouteBreadcrumbs
          trackId={track}
          topic={{
            id: topic,
            number: topicNumber(`${track}/${topic}`),
            title: topicTitle,
          }}
          level={{
            label: level,
            compactLabel: `${topicNumber(`${track}/${topic}`)} ${topicTitle} · ${level}`,
          }}
        />
        <span className="grow" />
        <SearchButton />
      </div>

      <div className="wrap wrap-task page-task">
        <div className="page-role task-role">
          <strong>Praktyka · {level}</strong>
        </div>

        <div className="task-layout">
          <article className="task-brief" id="task-brief">
            {taskMd ? (
              <Markdown content={taskMd} />
            ) : (
              <div className="task-empty">
                <h1>Brak opisu zadania</h1>
                <p>To zadanie nie ma jeszcze polecenia. Wróć do tematu i wybierz inny poziom.</p>
                <Link className="btn-ghost" href={`/track/${track}/${topic}`}>Wróć do tematu</Link>
              </div>
            )}
          </article>

          <TaskContextPanel
            level={level}
            progress={progress}
            resetting={resetting}
            resources={resources}
            hintsShown={hints.length}
            hintsTotal={hintsTotal}
            solutionAvailable={solution !== null}
            onReset={handleResetProgress}
          />

          <div className="task-flow">
            <section className="task-workbench" id="task-starter" aria-labelledby="workbench-title">
              <div className="task-workbench-head">
                <div>
                  <h2 id="workbench-title">Pracuj w WebStormie</h2>
                  <p>Zapisz rozwiązanie w pliku startera, a potem wróć tutaj i uruchom sprawdzanie.</p>
                </div>
              </div>

              <div className="starter-block">
                <div className="lbl">{currentStarterPath?.endsWith("/src") ? "Katalog startera" : "Plik startera"}</div>
                {currentStarterPath ? (
                  <>
                    <div className="starter">
                      <code>{currentStarterRel ?? currentStarterPath}</code>
                      {currentStarterRel && (
                        <button
                          className="btn-ghost"
                          onClick={handleOpenEditor}
                          disabled={openingEditor}
                          title="Otwórz plik w WebStorm"
                        >
                          <IconExternal />
                          {openingEditor ? "Otwieram…" : "Otwórz"}
                        </button>
                      )}
                      <button className="btn-ghost" onClick={handleCopyPath}>
                        {copied ? <IconCheck /> : <IconCopy />}
                        {copied ? "Skopiowano" : "Kopiuj pełną ścieżkę"}
                      </button>
                    </div>
                    {editorError && <p className="inline-error" role="alert">{editorError}</p>}
                  </>
                ) : (
                  <p className="inline-error" role="alert">Brak pliku startera.</p>
                )}
                {currentStarterPath && (
                  <div className="starter-reset">
                    <button className="btn-ghost" onClick={handleResetCode} disabled={resettingCode}>
                      {resettingCode ? "Przywracam…" : "Przywróć kod początkowy"}
                    </button>
                  </div>
                )}
              </div>

              <div className="actions">
                <button className="submit" onClick={handleSubmit} disabled={submitting || !currentStarterPath}>
                  <IconPlay />
                  {submitting ? "Sprawdzam…" : "Sprawdź rozwiązanie"}
                </button>
              </div>
              {submitting && <p className="submit-status" role="status">Uruchamiam testy i lint…</p>}
            </section>

            {submitError && (
              <div className="request-error" role="alert">
                <strong>Nie udało się wykonać operacji</strong>
                <span>{submitError}</span>
              </div>
            )}

            {result && (
              <ResultPanel
                result={result}
                nextTaskHref={nextTaskHref}
                hasSolution={solution !== null}
                canOpenEditor={currentStarterRel !== null}
                openingEditor={openingEditor}
                onOpenEditor={handleOpenEditor}
                onRetry={handleSubmit}
              />
            )}

            {hints.length > 0 && (
              <section className="hints" id="hints">
                <div className="hints-head">
                  <div>
                    <h2>Wskazówki</h2>
                    <p>Odkrywaj je pojedynczo, kiedy utkniesz.</p>
                  </div>
                  <span className="num">{hints.length}/{hintsTotal}</span>
                </div>
                {hints.map((hint, i) => (
                  <div key={i} className="hint">
                    <div className="hn">Wskazówka {i + 1}</div>
                    <Markdown content={hint} />
                  </div>
                ))}
              </section>
            )}

            {hintError && <p className="inline-error" role="alert">{hintError}</p>}

            {solution && (
              <section className="solution" id="solution">
                <div className="solution-head">
                  <div>
                    <h2>Rozwiązanie wzorcowe</h2>
                    <p>Porównaj strukturę i decyzje, nie tylko końcowy wynik.</p>
                  </div>
                  {passKind === "with-hint" && (
                    <span className="pass-kind">zaliczone ze wskazówką</span>
                  )}
                </div>
                {starter !== null ? (
                  <SolutionComparison starter={starter} solution={solution} />
                ) : (
                  <pre>
                    <code>{solution}</code>
                  </pre>
                )}
              </section>
            )}

            {(nextHintIndex < hintsTotal || hints.length > 0 || passKind === "with-hint") && (
              <div className="completion-actions">
                <div>
                  {nextHintIndex < hintsTotal && (
                    <button
                      className="btn-ghost"
                      onClick={() => handleRevealHint(nextHintIndex + 1)}
                      disabled={loadingHint}
                    >
                      {loadingHint ? "Odkrywam…" : `Odkryj wskazówkę ${nextHintIndex + 1}`}
                    </button>
                  )}
                </div>
                <div className="completion-actions-right">
                  {(hints.length > 0 || passKind === "with-hint") && (
                    <button
                      className="btn-ghost"
                      onClick={handleRetryWithoutHint}
                      disabled={resettingCode}
                    >
                      {resettingCode ? "Przywracam starter…" : "Zacznij od nowa bez wskazówek"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {undoRecords.length > 0 && (
        <div className="undo-toast-stack" aria-live="polite">
          {undoRecords.map((record) => (
            <UndoToast
              key={record.id}
              record={record}
              busy={undoingId === record.id}
              onUndo={() => handleUndo(record)}
            />
          ))}
        </div>
      )}
    </>
  );
}

const MASTERY_LABELS = ["Nowe", "Uczę się", "Rozumiem", "Utrwalone", "Opanowane"];

function formatProgressDate(
  value: string,
  options: Intl.DateTimeFormatOptions,
): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "nieznana data"
    : new Intl.DateTimeFormat("pl-PL", { ...options, timeZone: "Europe/Warsaw" }).format(date);
}

function TaskContextPanel({
  level,
  progress,
  resetting,
  resources,
  hintsShown,
  hintsTotal,
  solutionAvailable,
  onReset,
}: {
  level: string;
  progress: TaskProgress | null;
  resetting: boolean;
  resources: LearningResource[];
  hintsShown: number;
  hintsTotal: number;
  solutionAvailable: boolean;
  onReset: () => void;
}) {
  const score = Math.max(0, Math.min(4, Math.round(progress?.masteryScore ?? 0)));

  return (
    <aside className="task-context" aria-label="Status i materiały zadania">
      <div className="task-context-head">
        <h2>Panel zadania</h2>
        <span>{level}</span>
      </div>

      <section className="task-context-section" aria-labelledby="learning-progress-title">
        <span className="task-context-label" id="learning-progress-title">Poziom opanowania</span>
        <div className="mastery-heading">
          <strong>{MASTERY_LABELS[score] ?? MASTERY_LABELS[0]}</strong>
          <span className="num">{score}/4</span>
        </div>
        <div
          className="mastery-scale"
          role="progressbar"
          aria-label="Poziom opanowania"
          aria-valuemin={0}
          aria-valuemax={4}
          aria-valuenow={score}
        >
          {[1, 2, 3, 4].map((step) => (
            <i key={step} className={step <= score ? "on" : ""} aria-hidden="true" />
          ))}
        </div>
        {progress?.nextReviewAt && (
          <p className="task-context-note">
            Powtórka {formatProgressDate(progress.nextReviewAt, {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}

        {progress && (
          <button className="task-context-action" onClick={onReset} disabled={resetting}>
            {resetting ? "Resetuję…" : "Resetuj postęp"}
          </button>
        )}
      </section>

      <nav className="task-context-section task-context-nav" aria-label="Sekcje zadania">
        <span className="task-context-label">Na tej stronie</span>
        <a href="#task-brief">
          <span>Polecenie</span>
          <span aria-hidden="true">↓</span>
        </a>
        <a href="#task-starter">
          <span>Edytor i testy</span>
          <span aria-hidden="true">↓</span>
        </a>
        {hintsShown > 0 ? (
          <a href="#hints">
            <span>Wskazówki</span>
            <span className="num">{hintsShown}/{hintsTotal}</span>
          </a>
        ) : hintsTotal > 0 ? (
          <span className="task-context-locked">
            <span>Wskazówki</span>
            <span className="num">0/{hintsTotal}</span>
          </span>
        ) : null}
        {solutionAvailable ? (
          <a href="#solution">
            <span>Rozwiązanie wzorcowe</span>
            <span className="task-context-ready">dostępne</span>
          </a>
        ) : (
          <span className="task-context-locked">
            <span>Rozwiązanie wzorcowe</span>
            <span>po zaliczeniu</span>
          </span>
        )}
      </nav>

      <section className="task-context-section task-context-resources" aria-labelledby="task-resources-title">
        <span className="task-context-label" id="task-resources-title">Referencje</span>
        {resources.length > 0 ? (
          resources.map((resource) => (
            <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer">
              <span>
                <strong>{resource.title}</strong>
                <small>{resource.description}</small>
              </span>
              <IconExternal />
            </a>
          ))
        ) : (
          <p className="task-context-resources-empty">Brakuje referencji</p>
        )}
      </section>
    </aside>
  );
}

const DIFF_REASON_LABEL: Record<Exclude<CodeDiffChangeReason, "content">, string> = {
  whitespace: "różnica białych znaków",
  "end-of-file-newline": "znak końca linii",
};

function SolutionComparison({ starter, solution }: { starter: string; solution: string }) {
  return (
    <AnimatedDisclosure
      className="solution-comparison"
      lazy
      triggerClassName="solution-comparison-trigger"
      trigger={<span>Porównaj z własnym rozwiązaniem</span>}
    >
      <SolutionDiff starter={starter} solution={solution} />
    </AnimatedDisclosure>
  );
}

function SolutionDiff({ starter, solution }: { starter: string; solution: string }) {
  const diff = useMemo(() => buildCodeDiff(starter, solution), [starter, solution]);
  const headingId = useId();

  return (
    <>
      {diff.limited && (
        <p className="compare-limited" role="status">
          Porównanie jest bardzo duże, więc pokazujemy wspólny początek i koniec bez szczegółowego parowania środka.
        </p>
      )}
      <div className="compare-code" role="group" aria-label="Porównanie rozwiązania linia po linii">
        <div className="compare-code-head">
          <div id={`${headingId}-own`}>Twoje rozwiązanie</div>
          <div id={`${headingId}-reference`}>Rozwiązanie wzorcowe</div>
        </div>
        <div className="compare-code-body">
          <DiffPane headingId={`${headingId}-own`} rows={diff.rows} side="left" />
          <DiffPane headingId={`${headingId}-reference`} rows={diff.rows} side="right" />
        </div>
      </div>
    </>
  );
}

function DiffPane({
  headingId,
  rows,
  side,
}: {
  headingId: string;
  rows: CodeDiffRow[];
  side: "left" | "right";
}) {
  return (
    <div className={`compare-pane compare-pane-${side}`} role="region" aria-labelledby={headingId}>
      <div className="compare-lines">
        {rows.map((row, index) => {
          const line = side === "left" ? row.left : row.right;
          const status = !line
            ? "Brak odpowiadającej linii."
            : row.kind === "context"
              ? `Linia ${line.number}, bez zmian.`
              : row.kind === "change"
                ? `Linia ${line.number}, zmieniona.`
                : `Linia ${line.number}, ${side === "left" ? "usunięta" : "dodana"}.`;

          return (
            <div className={`compare-row compare-row-${row.kind}`} key={index}>
              <code>
                <span className="sr-only">{status}</span>
                <span className="line-no" aria-hidden="true">{line?.number ?? ""}</span>
                <span className="compare-line">
                  <span>{line?.text ?? ""}</span>
                  {side === "right" && row.changeReason && row.changeReason !== "content" && (
                    <span className="compare-reason">{DIFF_REASON_LABEL[row.changeReason]}</span>
                  )}
                </span>
              </code>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ResultPanel({
  result,
  nextTaskHref,
  hasSolution,
  canOpenEditor,
  openingEditor,
  onOpenEditor,
  onRetry,
}: {
  result: SubmitResult;
  nextTaskHref: string | null;
  hasSolution: boolean;
  canOpenEditor: boolean;
  openingEditor: boolean;
  onOpenEditor: () => void;
  onRetry: () => void;
}) {
  const failedTests = result.tests.filter((test) => test.status === "fail");
  const passedTests = result.tests.length - failedTests.length;
  const firstBlocker = result.error
    ?? failedTests[0]?.message
    ?? failedTests[0]?.name
    ?? result.typecheck.errors[0]?.message
    ?? result.lint.errors[0]?.message
    ?? "Sprawdź szczegóły raportu i popraw pierwszą blokującą pozycję.";

  if (result.passed) {
    return (
      <section className="result-shell result-success">
        <p className="sr-only" role="status">
          {result.usedHint ? "Zadanie zaliczone ze wskazówką." : "Zadanie zaliczone."}
        </p>
        <div className="result-success-main">
          <span className="result-mark" aria-hidden="true"><IconCheck /></span>
          <div>
            <h2>{result.usedHint ? "Zadanie zaliczone ze wskazówką" : "Zadanie zaliczone"}</h2>
            <p>Testy i lint potwierdziły rozwiązanie. Możesz porównać wzorzec albo przejść dalej.</p>
          </div>
          <span className="result-time num">{result.durationMs} ms</span>
        </div>

        <div className="result-persistence">
          <span className="persistence-ok"><IconCheck /> Postęp zapisany</span>
          {result.progress?.nextReviewAt && <span>Powtórka została zaplanowana</span>}
        </div>

        <div className="result-actions result-actions-success">
          {hasSolution && <a className="btn-ghost" href="#solution">Porównaj rozwiązanie</a>}
          {nextTaskHref && (
            <Link className="cta result-next" href={nextTaskHref}>
              <span>
                <small>Kontynuuj ścieżkę</small>
                Następne zadanie
              </span>
              <IconArrowRight />
            </Link>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="result-shell result-failure">
      <p className="sr-only" role="status">Zadanie nie jest jeszcze zaliczone. {firstBlocker}</p>
      <div className="result-failure-head">
        <div>
          <h2>Jeszcze nie przechodzi</h2>
          <p>{firstBlocker}</p>
        </div>
        <span className="result-time num">{result.durationMs} ms</span>
      </div>

      <div className="result-summary" aria-label="Podsumowanie sprawdzania">
        <span className={failedTests.length > 0 ? "has-error" : "is-ok"}>
          Testy <strong className="num">{passedTests}/{result.tests.length}</strong>
        </span>
        {result.typecheck.errors.length > 0 && (
          <span className="has-error">
            Typy <strong className="num">{result.typecheck.errors.length}</strong>
          </span>
        )}
        <span className={result.lint.errors.length > 0 ? "has-error" : "is-ok"}>
          Lint <strong className="num">{result.lint.errors.length}</strong>
        </span>
      </div>

      <div className="result-actions">
        <button className="submit submit-compact" onClick={onRetry}><IconPlay /> Sprawdź ponownie</button>
        {canOpenEditor && (
          <button className="btn-ghost" onClick={onOpenEditor} disabled={openingEditor}>
            <IconExternal /> {openingEditor ? "Otwieram…" : "Otwórz w WebStormie"}
          </button>
        )}
      </div>

      {result.error && (
        <AnimatedDisclosure
          className="result-details"
          defaultOpen
          trigger="Błąd uruchomienia"
          triggerClassName="result-details-trigger"
        >
          <pre className="infra-error">{result.error}</pre>
        </AnimatedDisclosure>
      )}

      {result.tests.length > 0 && (
        <AnimatedDisclosure
          className="result-details"
          defaultOpen={failedTests.length > 0}
          trigger={<span>Testy <span className="num">{passedTests}/{result.tests.length}</span></span>}
          triggerClassName="result-details-trigger"
        >
          <div className="tests">
            {result.tests.map((test, index) => (
              <div key={index} className={`test ${test.status === "pass" ? "p" : "f"}`}>
                <span className="st">{test.status === "pass" ? "PASS" : "FAIL"}</span>
                <div>{test.name}{test.message && <div className="msg">{test.message}</div>}</div>
              </div>
            ))}
          </div>
        </AnimatedDisclosure>
      )}

      {result.typecheck.errors.length > 0 && (
        <AnimatedDisclosure
          className="result-details"
          defaultOpen={failedTests.length === 0}
          trigger={<span>Typy <span className="num">{result.typecheck.errors.length}</span></span>}
          triggerClassName="result-details-trigger"
        >
          <div className="lint">
            {result.typecheck.errors.map((issue, index) => (
              <div key={index} className="li err">
                <span className="lv">type</span>{" "}
                <span className="loc">{issue.file}:{issue.line}</span>{" "}
                <span className="loc">{issue.code}</span><div>{issue.message}</div>
              </div>
            ))}
          </div>
        </AnimatedDisclosure>
      )}

      {(result.lint.errors.length > 0 || result.lint.warnings.length > 0) && (
        <AnimatedDisclosure
          className="result-details"
          defaultOpen={failedTests.length === 0 && result.typecheck.errors.length === 0}
          trigger={<span>Lint <span className="num">{result.lint.errors.length + result.lint.warnings.length}</span></span>}
          triggerClassName="result-details-trigger"
        >
          <div className="lint">
            {result.lint.errors.map((issue, index) => (
              <div key={`e${index}`} className="li err">
                <span className="lv">error</span> <span className="loc">L{issue.line}</span>{" "}
                <span className="loc">{issue.ruleId}</span><div>{issue.message}</div>
              </div>
            ))}
            {result.lint.warnings.map((issue, index) => (
              <div key={`w${index}`} className="li warnrow">
                <span className="lv">warning</span> <span className="loc">L{issue.line}</span>{" "}
                <span className="loc">{issue.ruleId}</span><div>{issue.message}</div>
              </div>
            ))}
          </div>
        </AnimatedDisclosure>
      )}
    </section>
  );
}
