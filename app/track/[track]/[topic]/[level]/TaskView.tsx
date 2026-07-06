"use client";

import { useState } from "react";
import Link from "next/link";
import Markdown from "@/app/components/Markdown";
import type { SubmitResult } from "@/app/lib/types";

interface Props {
  taskId: string;
  track: string;
  topic: string;
  level: string;
  taskMd: string;
  hintsTotal: number;
  starterPath: string | null;
  initialSolution: string | null;
}

export default function TaskView({
  taskId,
  track,
  topic,
  level,
  taskMd,
  hintsTotal,
  starterPath,
  initialSolution,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [solution, setSolution] = useState<string | null>(initialSolution);
  const [copied, setCopied] = useState(false);
  const [hints, setHints] = useState<string[]>([]);
  const [hintError, setHintError] = useState<string | null>(null);
  const [loadingHint, setLoadingHint] = useState(false);

  async function handleSubmit() {
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId }),
      });
      const data: SubmitResult = await res.json();
      setResult(data);
      if (data.passed) {
        const taskRes = await fetch(`/api/task?id=${encodeURIComponent(taskId)}`);
        const taskData = await taskRes.json();
        setSolution(taskData.solution ?? null);
      }
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

  async function handleRevealHint(n: number) {
    setLoadingHint(true);
    setHintError(null);
    try {
      const res = await fetch(`/api/hint?id=${encodeURIComponent(taskId)}&n=${n}`);
      const data = await res.json();
      if (!res.ok) {
        setHintError(data.error ?? "nie udalo sie pobrac hinta");
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

  return (
    <main className="p-10 max-w-4xl">
      <div className="text-xs text-fg-faint mb-4">
        <Link href="/" className="hover:text-accent">
          orzi-kurs
        </Link>{" "}
        /{" "}
        <Link href={`/track/${track}/${topic}`} className="hover:text-accent">
          {track} / {topic}
        </Link>{" "}
        / {level}
      </div>

      <Markdown content={taskMd} />

      <section className="mt-8 border border-border bg-bg-raised px-5 py-4">
        <div className="text-[11px] uppercase tracking-widest text-fg-faint mb-2">
          plik startera
        </div>
        {starterPath ? (
          <div className="flex items-center gap-3">
            <code className="text-[13px] text-accent break-all">{starterPath}</code>
            <button
              onClick={handleCopyPath}
              className="shrink-0 border border-border-strong px-2 py-1 text-[11px] uppercase tracking-wide text-fg-dim hover:text-fg hover:bg-bg-inset"
            >
              {copied ? "skopiowano" : "kopiuj"}
            </button>
          </div>
        ) : (
          <span className="text-fail text-sm">brak pliku startera</span>
        )}
      </section>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="border border-accent bg-bg-inset px-5 py-2 font-bold text-accent disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent hover:text-bg disabled:hover:bg-bg-inset disabled:hover:text-accent"
        >
          Submit
        </button>
        {submitting && (
          <span className="text-fg-dim text-sm">sprawdzanie w toku…</span>
        )}
      </div>

      {result && <ResultPanel result={result} />}

      {solution && (
        <section className="mt-8 border border-pass-border bg-pass-bg px-5 py-4">
          <div className="text-[11px] uppercase tracking-widest text-pass mb-3">
            rozwiazanie wzorcowe
          </div>
          <pre className="bg-bg-inset border border-border p-4 overflow-x-auto text-[13px]">
            <code>{solution}</code>
          </pre>
        </section>
      )}

      {hintsTotal > 0 && (
        <section className="mt-8">
          <div className="text-[11px] uppercase tracking-widest text-fg-faint mb-3">
            hinty
          </div>
          <div className="flex flex-col gap-3">
            {hints.map((hint, i) => (
              <div key={i} className="border border-border bg-bg-raised px-4 py-3">
                <div className="text-[11px] uppercase tracking-widest text-fg-faint mb-2">
                  hint {i + 1}
                </div>
                <Markdown content={hint} />
              </div>
            ))}

            {nextHintIndex < hintsTotal && (
              <button
                onClick={() => handleRevealHint(nextHintIndex + 1)}
                disabled={loadingHint}
                className="self-start border border-border-strong px-4 py-2 text-sm text-fg-dim hover:text-fg hover:bg-bg-inset disabled:opacity-50"
              >
                Hint {nextHintIndex + 1}
              </button>
            )}
          </div>
          {hintError && <div className="text-fail text-sm mt-2">{hintError}</div>}
        </section>
      )}
    </main>
  );
}

function ResultPanel({ result }: { result: SubmitResult }) {
  return (
    <section className="mt-8">
      <div
        className={`border px-5 py-3 mb-4 font-extrabold ${
          result.passed
            ? "border-pass-border bg-pass-bg text-pass"
            : "border-fail-border bg-fail-bg text-fail"
        }`}
      >
        {result.passed ? "ZALICZONE" : "NIEZALICZONE"}
        <span className="ml-3 text-xs font-normal text-fg-dim">
          {result.durationMs}ms
        </span>
      </div>

      {result.error && (
        <div className="border border-fail-border bg-fail-bg px-4 py-3 mb-4 text-sm text-fail whitespace-pre-wrap">
          {result.error}
        </div>
      )}

      {result.tests.length > 0 && (
        <div className="mb-4">
          <div className="text-[11px] uppercase tracking-widest text-fg-faint mb-2">
            testy ({result.tests.filter((t) => t.status === "pass").length}/
            {result.tests.length})
          </div>
          <div className="border border-border divide-y divide-border">
            {result.tests.map((t, i) => (
              <div key={i} className="px-4 py-2 bg-bg-raised">
                <div className="flex items-start gap-2">
                  <span
                    className={`font-bold ${t.status === "pass" ? "text-pass" : "text-fail"}`}
                  >
                    {t.status === "pass" ? "[PASS]" : "[FAIL]"}
                  </span>
                  <span className="text-sm">{t.name}</span>
                </div>
                {t.message && (
                  <div className="mt-1 ml-[52px] text-xs text-fail">{t.message}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {(result.lint.errors.length > 0 || result.lint.warnings.length > 0) && (
        <div>
          <div className="text-[11px] uppercase tracking-widest text-fg-faint mb-2">
            lint
          </div>

          {result.lint.errors.length > 0 && (
            <div className="border border-fail-border divide-y divide-fail-border mb-2">
              {result.lint.errors.map((issue, i) => (
                <div key={i} className="px-4 py-2 bg-fail-bg text-sm">
                  <span className="font-bold text-fail">error</span>{" "}
                  <span className="text-fg-dim">L{issue.line}</span>{" "}
                  <span className="text-fg-faint">{issue.ruleId}</span>
                  <div className="text-fg">{issue.message}</div>
                </div>
              ))}
            </div>
          )}

          {result.lint.warnings.length > 0 && (
            <div className="border border-warn-border divide-y divide-warn-border">
              {result.lint.warnings.map((issue, i) => (
                <div key={i} className="px-4 py-2 bg-warn-bg text-sm">
                  <span className="font-bold text-warn">warning</span>{" "}
                  <span className="text-fg-dim">L{issue.line}</span>{" "}
                  <span className="text-fg-faint">{issue.ruleId}</span>
                  <div className="text-fg">{issue.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
