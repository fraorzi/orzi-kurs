"use client";

import { useEffect, useId, useRef, useState } from "react";
import { IconPlay } from "../icons";
import { isExperimentResult, isJsonValue, isRecord, type ExperimentDefinition, type ExperimentResult, type JsonValue } from "@/shared/experiments";

export default function ExperimentPanel({ taskId, definition, sourceVersion }: {
  taskId: string;
  definition: ExperimentDefinition;
  sourceVersion: string;
}) {
  const inputId = useId();
  const [input, setInput] = useState(definition.kind === "types" ? "" : JSON.stringify(definition.example, null, 2));
  const [lastInput, setLastInput] = useState<string | null>(null);
  const [currentVersion, setCurrentVersion] = useState(sourceVersion);
  const [result, setResult] = useState<ExperimentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [frameReady, setFrameReady] = useState(false);
  const [renderCount, setRenderCount] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const frame = useRef<HTMLIFrameElement>(null);
  const pendingProps = useRef<JsonValue>({});
  const controller = useRef<AbortController | null>(null);
  const renderTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stale = result !== null && result.sourceVersion !== currentVersion;

  useEffect(() => {
    const abort = new AbortController();
    async function refreshVersion() {
      try {
        const response = await fetch(`/api/experiment?id=${encodeURIComponent(taskId)}`, { signal: abort.signal, cache: "no-store" });
        const data: unknown = await response.json();
        if (response.ok && isRecord(data) && typeof data.sourceVersion === "string") setCurrentVersion(data.sourceVersion);
      } catch { /* The next poll or explicit run retries a disconnected server. */ }
    }
    const timer = setInterval(() => { if (document.visibilityState === "visible") void refreshVersion(); }, 3000);
    window.addEventListener("focus", refreshVersion);
    return () => {
      abort.abort(); clearInterval(timer); window.removeEventListener("focus", refreshVersion);
      controller.current?.abort();
      if (renderTimeout.current) clearTimeout(renderTimeout.current);
    };
  }, [taskId]);

  useEffect(() => {
    function receive(event: MessageEvent<unknown>) {
      if (event.source !== frame.current?.contentWindow || !isRecord(event.data) || event.data.channel !== "orzi-preview") return;
      if (event.data.type === "ready") {
        setFrameReady(true);
        frame.current?.contentWindow?.postMessage({ channel: "orzi-preview", type: "render", props: pendingProps.current, remount: false }, "*");
      }
      if (event.data.type === "rendered" && typeof event.data.detail === "number") {
        setRenderCount(event.data.detail); setRunning(false);
        if (renderTimeout.current) clearTimeout(renderTimeout.current);
      }
      if (event.data.type === "error" && typeof event.data.detail === "string") {
        setError(event.data.detail); setRunning(false);
        if (renderTimeout.current) clearTimeout(renderTimeout.current);
      }
      if (event.data.type === "log" && typeof event.data.detail === "string") {
        const line = event.data.detail.slice(0, 2000);
        setLogs((previous) => previous.length < 100 ? [...previous, line] : previous);
      }
    }
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, []);

  async function run(remount = false) {
    setError(null);
    let parsed: JsonValue = null;
    try {
      if (definition.kind !== "types") {
        const candidate: unknown = JSON.parse(input);
        if (!isJsonValue(candidate)) throw new Error("Podaj poprawne dane JSON.");
        if (definition.kind === "function" && !Array.isArray(candidate)) throw new Error("Podaj argumenty jako tablicę JSON.");
        if (definition.kind === "component" && !isRecord(candidate)) throw new Error("Propsy muszą być obiektem JSON.");
        parsed = candidate;
      }
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Nieprawidłowy JSON."); return; }
    setRunning(true); setLastInput(input);
    if (definition.kind === "component") {
      pendingProps.current = parsed;
      if (renderTimeout.current) clearTimeout(renderTimeout.current);
      renderTimeout.current = setTimeout(() => { setRunning(false); setError("Podgląd nie odpowiedział. Załaduj kod ponownie."); }, 8000);
      if (result?.kind === "component" && !stale && frameReady) {
        frame.current?.contentWindow?.postMessage({ channel: "orzi-preview", type: "render", props: parsed, remount }, "*");
        return;
      }
    }
    controller.current?.abort();
    const requestController = new AbortController();
    controller.current = requestController;
    try {
      const response = await fetch("/api/experiment", { method: "POST", headers: { "Content-Type": "application/json" }, signal: requestController.signal, body: JSON.stringify({ taskId, input: parsed }) });
      const data: unknown = await response.json();
      if (requestController.signal.aborted) return;
      if (!response.ok) throw new Error(isRecord(data) && typeof data.error === "string" ? data.error : "Nie udało się uruchomić przykładu.");
      if (!isExperimentResult(data)) throw new Error("Nieprawidłowa odpowiedź eksperymentu.");
      setFrameReady(false); setLogs([]); setResult(data); setCurrentVersion(data.sourceVersion);
      if (data.kind !== "component") setRunning(false);
    } catch (cause) {
      if (!requestController.signal.aborted) setError(cause instanceof Error ? cause.message : "Nie udało się uruchomić przykładu.");
      setRunning(false);
      if (renderTimeout.current) clearTimeout(renderTimeout.current);
    }
  }

  return <section className="experiment" aria-labelledby={`${inputId}-title`}>
    <div className="experiment-head"><div><h2 id={`${inputId}-title`}>{definition.title}</h2><p>{definition.description}</p></div><span>Bez zapisu próby</span></div>
    <div className={`experiment-grid${definition.kind === "types" ? " types-only" : ""}`}>
      {definition.kind !== "types" && <div><label htmlFor={inputId}>{definition.kind === "component" ? "Propsy komponentu" : definition.kind === "sql" ? "Dane tabel" : "Argumenty funkcji"} <span>JSON</span></label>
        <textarea id={inputId} value={input} onChange={(event) => setInput(event.target.value)} spellCheck={false} aria-invalid={error ? true : undefined} aria-describedby={`${inputId}-error`} />
        <div className="experiment-input-note">{lastInput !== null && input !== lastInput ? "Dane zmienione. Uruchom przykład ponownie." : "Kod rozwiązania edytujesz i zapisujesz w IDE."}</div>
      </div>}
      <div className="experiment-output"><h3>{definition.kind === "component" ? "Podgląd komponentu" : "Wynik"}</h3>
        {!result && <div className="experiment-empty">{definition.kind === "component" ? "Załaduj zapisany kod, aby zobaczyć komponent." : "Uruchom przykład, aby zobaczyć wynik."}</div>}
        {result?.kind === "value" && <pre className="experiment-value"><code>{result.value}</code></pre>}
        {result?.kind === "component" && <iframe key={result.sourceVersion} ref={frame} title={`Podgląd ${definition.title}`} srcDoc={result.document} sandbox="allow-scripts" />}
        {result?.kind === "types" && (result.issues.length === 0 ? <p className="experiment-success">Brak błędów typowania. To nie jest zaliczenie zadania.</p> : <ul className="experiment-type-issues">{result.issues.map((issue, index) => <li key={index}><code>{issue.file}:{issue.line} {issue.code}</code><p>{issue.message}</p></li>)}</ul>)}
        {result?.kind === "table" && <div className="experiment-table"><table><thead><tr>{result.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{result.rows.map((row, index) => <tr key={index}>{row.map((cell, column) => <td key={column}>{typeof cell === "string" ? cell : JSON.stringify(cell)}</td>)}</tr>)}</tbody></table>{result.rows.length === 0 && <p>Zapytanie nie zwróciło wierszy.</p>}</div>}
        {result?.kind === "component" && frameReady && <p className="experiment-input-note">Render {renderCount}. Zmiana propsów zachowuje stan komponentu.</p>}
        {stale && <p className="experiment-stale" role="status">Plik został zmieniony. Wynik dotyczy poprzedniej wersji kodu.</p>}
      </div>
    </div>
    <p id={`${inputId}-error`} className="experiment-error" role="alert">{error}</p>
    <div className="experiment-actions"><button type="button" className="submit" onClick={() => void run()} disabled={running}><IconPlay />{running ? "Uruchamiam..." : definition.kind === "types" ? "Sprawdź typy" : definition.kind === "component" ? result && !stale && frameReady ? "Zmień propsy" : "Załaduj zapisany kod" : "Uruchom przykład"}</button>
      {definition.kind === "component" && result && !stale && frameReady && <button type="button" className="btn-ghost" onClick={() => void run(true)} disabled={running}>Zamontuj ponownie</button>}
      {running && <button type="button" className="btn-ghost" onClick={() => { controller.current?.abort(); setRunning(false); if (renderTimeout.current) clearTimeout(renderTimeout.current); }}>Anuluj</button>}
    </div>
    {((result?.kind === "value" && result.logs.length > 0) || logs.length > 0) && <div className="experiment-logs"><h3>Logi</h3><pre>{(result?.kind === "value" ? result.logs : logs).join("\n")}</pre></div>}
  </section>;
}
