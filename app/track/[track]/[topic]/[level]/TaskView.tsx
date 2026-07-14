"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Markdown from "@/app/components/Markdown";
import SearchButton from "@/app/components/SearchButton";
import { IconArrowRight, IconCopy, IconCheck, IconExternal, IconPlay } from "@/app/components/icons";
import { openInEditor } from "@/app/lib/actions";
import type { LearningResource, SubmitResult, TaskProgress, TaskResponse } from "@/app/lib/types";
import type { TaskRecommendation } from "@/harness/recommendation";
import { trackMeta, topicNumber } from "@/app/lib/tracks";

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
  nextTask: TaskRecommendation | null;
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
  nextTask,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [solution, setSolution] = useState<string | null>(initialSolution);
  const [starter, setStarter] = useState<string | null>(initialStarter);
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
  const [confirmReset, setConfirmReset] = useState(false);

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
    if (!starterPath) return;
    await navigator.clipboard.writeText(starterPath);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function handleOpenEditor() {
    if (!starterRel) return;
    setOpeningEditor(true);
    setEditorError(null);
    try {
      const res = await openInEditor(starterRel);
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
        setSubmitError(data.error ?? "nie udało się zresetować postępu");
        return;
      }
      setProgress(data.progress ?? null);
      setResult(null);
      setSolution(null);
      setStarter(null);
      setPassKind(null);
      setHints([]);
      setConfirmReset(false);
    } catch {
      setSubmitError("Nie udało się zresetować postępu. Spróbuj ponownie.");
    } finally {
      setResetting(false);
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

      <div className="wrap wrap-read">
        <Markdown content={taskMd} />

        {resources.length > 0 && (
          <section className="resources" aria-labelledby="resources-title">
            <div>
              <h2 id="resources-title">Materiały przed hintem</h2>
              <p>Wyjaśniają mechanizm, ale nie pokazują rozwiązania tego zadania.</p>
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
          </section>
        )}

        <ProgressPanel
          progress={progress}
          confirmReset={confirmReset}
          resetting={resetting}
          onAskReset={() => setConfirmReset(true)}
          onCancelReset={() => setConfirmReset(false)}
          onReset={handleResetProgress}
        />

        <div className="row-card" id="task-starter">
          <div className="lbl">{starterPath?.endsWith("/src") ? "Katalog startera" : "Plik startera"}</div>
          {starterPath ? (
            <>
              <div className="starter">
                <code>{starterPath}</code>
                {starterRel && (
                  <button
                    className="btn-ghost"
                    onClick={handleOpenEditor}
                    disabled={openingEditor}
                    title="Otwórz plik w WebStorm"
                  >
                    <IconExternal />
                    {openingEditor ? "otwieram…" : "WebStorm"}
                  </button>
                )}
                <button className="btn-ghost" onClick={handleCopyPath}>
                  {copied ? <IconCheck /> : <IconCopy />}
                  {copied ? "skopiowano" : "Kopiuj ścieżkę"}
                </button>
              </div>
              {editorError && (
                <div style={{ color: "var(--bad)", fontSize: "12px", marginTop: 8 }}>{editorError}</div>
              )}
            </>
          ) : (
            <span style={{ color: "var(--bad)" }}>brak pliku startera</span>
          )}
        </div>

        <div className="actions">
          <button className="submit" onClick={handleSubmit} disabled={submitting}>
            <IconPlay />
            {submitting ? "Sprawdzam…" : "Submit"}
          </button>
          {submitting && (
            <span style={{ color: "var(--faint)", fontSize: "12.5px" }}>sprawdzanie w toku…</span>
          )}
        </div>

        {submitError && (
          <div className="request-error" role="alert">
            <strong>Nie udało się wykonać operacji</strong>
            <span>{submitError}</span>
          </div>
        )}

        {result && <ResultPanel result={result} />}

        {hints.length > 0 && (
          <section className="hints">
            <h2 className="sec" style={{ marginTop: 0 }}>
              Hinty <span className="n num">{hintsTotal}</span>
            </h2>
            {hints.map((hint, i) => (
              <div key={i} className="hint">
                <div className="hn">Hint {i + 1}</div>
                <Markdown content={hint} />
              </div>
            ))}
          </section>
        )}

        {hintError && (
          <div style={{ color: "var(--bad)", fontSize: "13px", marginTop: 8 }}>{hintError}</div>
        )}

        {solution && (
          <section className="solution">
            <div className="solution-heading">
              <h2 className="sec">Rozwiązanie wzorcowe</h2>
              {passKind === "with-hint" && <span className="pass-kind">zaliczone z hintem</span>}
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

        {(nextHintIndex < hintsTotal || (passKind && nextTask) || passKind === "with-hint") && (
          <div className="completion-actions">
            <div>
              {nextHintIndex < hintsTotal && (
                <button
                  className="btn-ghost"
                  onClick={() => handleRevealHint(nextHintIndex + 1)}
                  disabled={loadingHint}
                >
                  {loadingHint ? "Odkrywam…" : `Odkryj Hint ${nextHintIndex + 1}`}
                </button>
              )}
            </div>
            <div className="completion-actions-right">
              {passKind === "with-hint" && (
                <button className="btn-ghost" onClick={handleRetryWithoutHint}>
                  Spróbuj bez hinta
                </button>
              )}
              {passKind && nextTask && (
                <Link className="next-task" href={nextTask.href} title={nextTask.label}>
                  {nextTask.reason === "next-new" ? "Następne zadanie" : nextTask.label}
                  <IconArrowRight />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
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
  confirmReset,
  resetting,
  onAskReset,
  onCancelReset,
  onReset,
}: {
  progress: TaskProgress | null;
  confirmReset: boolean;
  resetting: boolean;
  onAskReset: () => void;
  onCancelReset: () => void;
  onReset: () => void;
}) {
  const score = Math.max(0, Math.min(4, Math.round(progress?.masteryScore ?? 0)));
  const attempts = progress?.attempts ?? 0;

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
          <span>
            {attempts} {attempts === 1 ? "próba" : attempts > 1 && attempts < 5 ? "próby" : "prób"}
          </span>
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
          {confirmReset ? (
            <div className="reset-confirm" role="group" aria-label="Potwierdź reset postępu">
              <p>Postęp, licznik prób i poziom opanowania zaczną się od zera. Twój kod zostanie zachowany.</p>
              <div>
                <button className="btn-danger" onClick={onReset} disabled={resetting}>
                  {resetting ? "Resetuję…" : "Potwierdź reset"}
                </button>
                <button className="btn-ghost" onClick={onCancelReset} disabled={resetting}>Anuluj</button>
              </div>
            </div>
          ) : (
            <button className="btn-ghost" onClick={onAskReset}>Resetuj postęp</button>
          )}
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
  return rows;
}

function SolutionComparison({ starter, solution }: { starter: string; solution: string }) {
  const rows = useMemo(() => buildDiff(starter, solution), [starter, solution]);

  return (
    <details className="solution-comparison" open>
      <summary>Porównaj z własnym rozwiązaniem</summary>
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
    </details>
  );
}

function ResultPanel({ result }: { result: SubmitResult }) {
  const failedTests = result.tests.filter((test) => test.status === "fail");
  const passedTests = result.tests.length - failedTests.length;

  return (
    <section aria-live="polite">
      <div className={`result ${result.passed ? "ok" : "no"}`} role="status">
        {result.passed ? (result.usedHint ? "ZALICZONE Z HINTEM" : "ZALICZONE") : "NIEZALICZONE"}
        <span className="ms num">{result.durationMs} ms</span>
      </div>

      {!result.passed && (
        <div className="error-guidance">
          <strong>Co poprawić teraz</strong>
          {result.error ? (
            <p>Runner nie ukończył sprawdzenia. Zacznij od komunikatu infrastruktury poniżej.</p>
          ) : failedTests.length > 0 ? (
            <p>
              Przeszło {passedTests} z {result.tests.length} testów. Zacznij od pierwszego czerwonego testu — jego nazwa opisuje wymaganie, a komunikat pokazuje różnicę wyniku.
            </p>
          ) : (
            <p>Testy przeszły, ale lint zatrzymał zaliczenie. Otwórz wskazane linie i usuń błędy oznaczone jako „error”.</p>
          )}
        </div>
      )}

      {result.error && (
        <div
          className="hint"
          style={{ borderColor: "var(--bad-line)", color: "var(--bad)", whiteSpace: "pre-wrap" }}
        >
          {result.error}
        </div>
      )}

      {result.tests.length > 0 && (
        <div className="tests">
          {result.tests.map((t, i) => (
            <div key={i} className={`test ${t.status === "pass" ? "p" : "f"}`}>
              <span className="st">{t.status === "pass" ? "PASS" : "FAIL"}</span>
              <div>
                {t.name}
                {t.message && <div className="msg">{t.message}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {(result.lint.errors.length > 0 || result.lint.warnings.length > 0) && (
        <div className="lint">
          {result.lint.errors.map((issue, i) => (
            <div key={`e${i}`} className="li err">
              <span className="lv">error</span> <span className="loc">L{issue.line}</span>{" "}
              <span className="loc">{issue.ruleId}</span>
              <div>{issue.message}</div>
            </div>
          ))}
          {result.lint.warnings.map((issue, i) => (
            <div key={`w${i}`} className="li warnrow">
              <span className="lv">warning</span> <span className="loc">L{issue.line}</span>{" "}
              <span className="loc">{issue.ruleId}</span>
              <div>{issue.message}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
