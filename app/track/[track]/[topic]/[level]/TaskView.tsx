"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Markdown from "@/app/components/Markdown";
import SearchButton from "@/app/components/SearchButton";
import UndoToast from "@/app/components/UndoToast";
import { IconArrowRight, IconCopy, IconCheck, IconExternal, IconPlay } from "@/app/components/icons";
import { openInEditor } from "@/app/lib/actions";
import {
  loadUndoRecords,
  removeUndoRecord,
  storeUndoRecord,
  UNDO_DURATION_MS,
} from "@/app/lib/task-undo";
import type { LearningResource, SubmitResult, TaskProgress, TaskResponse } from "@/app/lib/types";
import { trackMeta, topicNumber } from "@/app/lib/tracks";
import type { StarterSnapshot, TaskUndoRecord } from "@/shared/task-undo";

interface Props {
  taskId: string;
  track: string;
  topic: string;
  topicTitle: string;
  level: string;
  taskMd: string;
  hintsTotal: number;
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
  const [hints, setHints] = useState<string[]>([]);
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
        setPassKind(hints.length > 0 ? "with-hint" : "without-hint");
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
      const res = await fetch(`/api/hint?id=${encodeURIComponent(taskId)}&n=${n}`);
      const data = await res.json();
      if (!res.ok) {
        setHintError(data.error ?? "nie udało się pobrać hinta");
        return;
      }
      setHints((prev) => {
        const next = [...prev];
        next[n - 1] = data.hint;
        return next;
      });
    } catch {
      setHintError("Nie udało się pobrać wskazówki. Spróbuj ponownie.");
    } finally {
      setLoadingHint(false);
    }
  }

  const nextHintIndex = hints.length;

  function handleRetryWithoutHint() {
    setResult(null);
    setSolution(null);
    setStarter(null);
    setPassKind(null);
    setHints([]);
    document.getElementById("task-starter")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "center",
    });
  }

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
        body: JSON.stringify({ taskId }),
      });
      const data = await res.json();
      if (!res.ok) {
        removeUndoRecord(undoRecord.id);
        setSubmitError(data.error ?? "nie udało się zresetować postępu");
        return;
      }
      setProgress(data.progress ?? null);
      setResult(null);
      setSolution(null);
      setStarter(null);
      setPassKind(null);
      setHints([]);
      window.dispatchEvent(new CustomEvent("orzi:progress"));
      const activatedAt = Date.now();
      storeUndoRecord({
        ...undoRecord,
        createdAt: activatedAt,
        expiresAt: activatedAt + UNDO_DURATION_MS,
      });
      setUndoRecords(loadUndoRecords(taskId));
    } catch {
      removeUndoRecord(undoRecord.id);
      setSubmitError("Nie udało się zresetować postępu. Spróbuj ponownie.");
    } finally {
      setResetting(false);
    }
  }

  async function handleResetCode() {
    setResettingCode(true);
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
        return;
      }
      const now = Date.now();
      undoRecord = {
        id: crypto.randomUUID(),
        taskId,
        kind: "code",
        message: "Przywrócono kod początkowy.",
        payload: snapshotData.snapshot,
        createdAt: now,
        expiresAt: now + 60_000,
      };
      if (!storeUndoRecord(undoRecord)) {
        setSubmitError("Nie udało się przygotować cofnięcia. Kod nie został zresetowany.");
        return;
      }

      const res = await fetch("/api/starter", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId }),
      });
      const data: {
        starterPath?: string | null;
        starterRel?: string | null;
        error?: string;
      } = await res.json();
      if (!res.ok) {
        removeUndoRecord(undoRecord.id);
        setSubmitError(data.error ?? "nie udało się przywrócić kodu początkowego");
        return;
      }
      setResult(null);
      setSolution(null);
      setStarter(null);
      setPassKind(null);
      setCurrentStarterPath(data.starterPath ?? null);
      setCurrentStarterRel(data.starterRel ?? null);
      const activatedAt = Date.now();
      storeUndoRecord({
        ...undoRecord,
        createdAt: activatedAt,
        expiresAt: activatedAt + UNDO_DURATION_MS,
      });
      setUndoRecords(loadUndoRecords(taskId));
    } catch {
      if (undoRecord) removeUndoRecord(undoRecord.id);
      setSubmitError("Nie udało się przywrócić kodu początkowego. Spróbuj ponownie.");
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
        <nav className="crumbs">
          <Link href="/">orzi-kurs</Link>
          <span className="sep">/</span>
          <Link href={`/track/${track}`}>{trackMeta(track).name}</Link>
          <span className="sep">/</span>
          <Link href={`/track/${track}/${topic}`}>
            {topicNumber(`${track}/${topic}`)} {topicTitle}
          </Link>
          <span className="sep">/</span>
          <span className="cur">{level}</span>
        </nav>
        <span className="grow" />
        <SearchButton />
      </div>

      <div className="wrap wrap-task page-task">
        <div className="page-role task-role">
          <strong>Praktyka · {level}</strong>
        </div>

        <article className="task-brief">
          <Markdown content={taskMd} />
        </article>

        {resources.length > 0 && (
          <aside className="resources" aria-label="Referencje">
            <div className="resources-label">
              <span className="resources-glyph" aria-hidden="true">↗</span>
              <span>Referencje</span>
            </div>
            <div className="resource-links">
              {resources.map((resource) => (
                <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer">
                  <span>
                    <strong>{resource.title}</strong>
                    <small>{resource.description}</small>
                  </span>
                  <IconExternal />
                </a>
              ))}
            </div>
          </aside>
        )}

        <ProgressPanel
          progress={progress}
          resetting={resetting}
          onReset={handleResetProgress}
        />

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
            <div className="starter-reset">
              <button className="btn-ghost" onClick={handleResetCode} disabled={resettingCode}>
                {resettingCode ? "Przywracam…" : "Przywróć kod początkowy"}
              </button>
            </div>
          </div>

          <div className="actions">
            <button className="submit" onClick={handleSubmit} disabled={submitting}>
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
            {starter ? (
              <SolutionComparison starter={starter} solution={solution} />
            ) : (
              <pre>
                <code>{solution}</code>
              </pre>
            )}
          </section>
        )}

        {(nextHintIndex < hintsTotal || passKind === "with-hint") && (
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
              {passKind === "with-hint" && (
                <button className="btn-ghost" onClick={handleRetryWithoutHint}>
                  Spróbuj bez hinta
                </button>
              )}
            </div>
          </div>
        )}
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

function ProgressPanel({
  progress,
  resetting,
  onReset,
}: {
  progress: TaskProgress | null;
  resetting: boolean;
  onReset: () => void;
}) {
  const score = Math.max(0, Math.min(4, Math.round(progress?.masteryScore ?? 0)));

  return (
    <section className="learning-progress" aria-labelledby="learning-progress-title">
      <div className="mastery-summary">
        <div>
          <span className="lbl" id="learning-progress-title">Poziom opanowania</span>
          <strong>{MASTERY_LABELS[score] ?? MASTERY_LABELS[0]}</strong>
        </div>
        <div className="mastery-scale" aria-label={`Poziom opanowania ${score} z 4`}>
          {[1, 2, 3, 4].map((step) => (
            <i key={step} className={step <= score ? "on" : ""} aria-hidden="true" />
          ))}
        </div>
        <div className="mastery-meta">
          {progress?.nextReviewAt && (
            <span>
              Powtórka: {formatProgressDate(progress.nextReviewAt, {
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>
      </div>

      {progress && (
        <div className="progress-reset">
          <button className="btn-ghost" onClick={onReset} disabled={resetting}>
            {resetting ? "Resetuję…" : "Resetuj postęp"}
          </button>
        </div>
      )}
    </section>
  );
}

interface DiffRow {
  left: { number: number; text: string } | null;
  right: { number: number; text: string } | null;
  kind: "same" | "remove" | "add" | "changed";
}

function buildDiff(leftText: string, rightText: string): DiffRow[] {
  const left = leftText.replace(/\r\n/g, "\n").split("\n");
  const right = rightText.replace(/\r\n/g, "\n").split("\n");

  if (left.length * right.length > 250_000) {
    return Array.from({ length: Math.max(left.length, right.length) }, (_, index) => ({
      left: index < left.length ? { number: index + 1, text: left[index] } : null,
      right: index < right.length ? { number: index + 1, text: right[index] } : null,
      kind: left[index] === right[index] ? "same" : "changed",
    }));
  }

  const width = right.length + 1;
  const lengths = new Uint32Array((left.length + 1) * width);
  for (let i = left.length - 1; i >= 0; i--) {
    for (let j = right.length - 1; j >= 0; j--) {
      lengths[i * width + j] = left[i] === right[j]
        ? lengths[(i + 1) * width + j + 1] + 1
        : Math.max(lengths[(i + 1) * width + j], lengths[i * width + j + 1]);
    }
  }

  const rows: DiffRow[] = [];
  let i = 0;
  let j = 0;
  while (i < left.length || j < right.length) {
    if (i < left.length && j < right.length && left[i] === right[j]) {
      rows.push({
        left: { number: i + 1, text: left[i] },
        right: { number: j + 1, text: right[j] },
        kind: "same",
      });
      i++;
      j++;
    } else if (i < left.length && (j === right.length || lengths[(i + 1) * width + j] >= lengths[i * width + j + 1])) {
      rows.push({ left: { number: i + 1, text: left[i] }, right: null, kind: "remove" });
      i++;
    } else {
      rows.push({ left: null, right: { number: j + 1, text: right[j] }, kind: "add" });
      j++;
    }
  }
  const alignedRows: DiffRow[] = [];
  for (let index = 0; index < rows.length;) {
    if (rows[index].kind === "same") {
      alignedRows.push(rows[index]);
      index++;
      continue;
    }

    const changedBlock: DiffRow[] = [];
    while (index < rows.length && rows[index].kind !== "same") {
      changedBlock.push(rows[index]);
      index++;
    }
    const removed = changedBlock.flatMap((row) => row.left ? [row.left] : []);
    const added = changedBlock.flatMap((row) => row.right ? [row.right] : []);
    for (let lineIndex = 0; lineIndex < Math.max(removed.length, added.length); lineIndex++) {
      alignedRows.push({
        left: removed[lineIndex] ?? null,
        right: added[lineIndex] ?? null,
        kind: removed[lineIndex] && added[lineIndex]
          ? "changed"
          : removed[lineIndex]
            ? "remove"
            : "add",
      });
    }
  }
  return alignedRows;
}

function SolutionComparison({ starter, solution }: { starter: string; solution: string }) {
  const rows = useMemo(() => buildDiff(starter, solution), [starter, solution]);
  const [comparisonOpen, setComparisonOpen] = useState(false);

  return (
    <div className={`solution-comparison${comparisonOpen ? " open" : ""}`}>
      <button
        className="solution-comparison-trigger"
        aria-expanded={comparisonOpen}
        aria-controls="solution-comparison-content"
        onClick={() => setComparisonOpen((open) => !open)}
      >
        <span>Porównaj z własnym rozwiązaniem</span>
        <span className="solution-comparison-mark" aria-hidden="true">+</span>
      </button>
      <div
        className="solution-comparison-reveal"
        id="solution-comparison-content"
        aria-hidden={!comparisonOpen}
      >
        <div className="solution-comparison-inner">
          <div className="compare-head" aria-hidden="true">
            <span>Twoje rozwiązanie</span>
            <span>Rozwiązanie wzorcowe</span>
          </div>
          <div className="compare-code" role="table" aria-label="Porównanie rozwiązania linia po linii">
            {rows.map((row, index) => (
              <div className={`compare-row ${row.kind}`} role="row" key={index}>
                <code role="cell">
                  <span className="line-no">{row.left?.number ?? ""}</span>
                  <span>{row.left?.text ?? ""}</span>
                </code>
                <code role="cell">
                  <span className="line-no">{row.right?.number ?? ""}</span>
                  <span>{row.right?.text ?? ""}</span>
                </code>
              </div>
            ))}
          </div>
        </div>
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
      <section className="result-shell result-success" aria-live="polite">
        <div className="result-success-main">
          <span className="result-mark"><IconCheck /></span>
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
    <section className="result-shell result-failure" aria-live="polite">
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
        <details className="result-details" open>
          <summary>Błąd uruchomienia</summary>
          <pre className="infra-error">{result.error}</pre>
        </details>
      )}

      {result.tests.length > 0 && (
        <details className="result-details" open={failedTests.length > 0}>
          <summary>Testy <span className="num">{passedTests}/{result.tests.length}</span></summary>
          <div className="tests">
            {result.tests.map((test, index) => (
              <div key={index} className={`test ${test.status === "pass" ? "p" : "f"}`}>
                <span className="st">{test.status === "pass" ? "PASS" : "FAIL"}</span>
                <div>{test.name}{test.message && <div className="msg">{test.message}</div>}</div>
              </div>
            ))}
          </div>
        </details>
      )}

      {result.typecheck.errors.length > 0 && (
        <details className="result-details" open={failedTests.length === 0}>
          <summary>Typy <span className="num">{result.typecheck.errors.length}</span></summary>
          <div className="lint">
            {result.typecheck.errors.map((issue, index) => (
              <div key={index} className="li err">
                <span className="lv">type</span>{" "}
                <span className="loc">{issue.file}:{issue.line}</span>{" "}
                <span className="loc">{issue.code}</span><div>{issue.message}</div>
              </div>
            ))}
          </div>
        </details>
      )}

      {(result.lint.errors.length > 0 || result.lint.warnings.length > 0) && (
        <details className="result-details" open={failedTests.length === 0 && result.typecheck.errors.length === 0}>
          <summary>Lint <span className="num">{result.lint.errors.length + result.lint.warnings.length}</span></summary>
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
        </details>
      )}
    </section>
  );
}
