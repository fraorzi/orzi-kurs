"use client";

import { useState } from "react";
import Link from "next/link";
import Markdown from "@/app/components/Markdown";
import SearchButton from "@/app/components/SearchButton";
import { IconCopy, IconCheck, IconExternal, IconPlay } from "@/app/components/icons";
import { openInEditor } from "@/app/lib/actions";
import type { SubmitResult } from "@/app/lib/types";
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
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [solution, setSolution] = useState<string | null>(initialSolution);
  const [copied, setCopied] = useState(false);
  const [hints, setHints] = useState<string[]>([]);
  const [hintError, setHintError] = useState<string | null>(null);
  const [loadingHint, setLoadingHint] = useState(false);
  const [openingEditor, setOpeningEditor] = useState(false);
  const [editorError, setEditorError] = useState<string | null>(null);

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

        <div className="row-card">
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

        {result && <ResultPanel result={result} />}

        {solution && (
          <section className="solution">
            <h2 className="sec" style={{ marginTop: 0, color: "var(--good)" }}>
              Rozwiązanie wzorcowe
            </h2>
            <pre>
              <code>{solution}</code>
            </pre>
          </section>
        )}

        {hintsTotal > 0 && (
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
            {nextHintIndex < hintsTotal && (
              <button
                className="btn-ghost"
                style={{ marginTop: 10 }}
                onClick={() => handleRevealHint(nextHintIndex + 1)}
                disabled={loadingHint}
              >
                Odkryj Hint {nextHintIndex + 1}
              </button>
            )}
            {hintError && (
              <div style={{ color: "var(--bad)", fontSize: "13px", marginTop: 8 }}>{hintError}</div>
            )}
          </section>
        )}
      </div>
    </>
  );
}

function ResultPanel({ result }: { result: SubmitResult }) {
  return (
    <section>
      <div className={`result ${result.passed ? "ok" : "no"}`}>
        {result.passed ? "ZALICZONE" : "NIEZALICZONE"}
        <span className="ms num">{result.durationMs} ms</span>
      </div>

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
