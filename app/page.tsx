import Link from "next/link";
import { buildCatalog } from "@/harness/catalog";
import StatusBadge from "./components/StatusBadge";

export default function Home() {
  const catalog = buildCatalog();

  const allLevels = catalog.tracks.flatMap((t) =>
    t.topics.flatMap((topic) => topic.levels),
  );
  const passed = allLevels.filter((l) => l.status === "passed").length;
  const total = allLevels.length;

  return (
    <main className="p-10 max-w-4xl">
      <h1 className="text-2xl font-extrabold tracking-tight mb-1">orzi-kurs</h1>
      <p className="text-fg-dim mb-8">
        lokalny dashboard do nauki programowania — teoria, zadania, testy
      </p>

      <div className="border border-border bg-bg-raised px-5 py-4 mb-10 inline-block">
        <div className="text-[11px] uppercase tracking-widest text-fg-faint mb-1">
          postęp ogólny
        </div>
        <div className="text-xl font-extrabold">
          <span className="text-pass">{passed}</span>
          <span className="text-fg-faint"> / {total}</span>
          <span className="text-fg-dim text-sm font-normal ml-2">zadań zaliczonych</span>
        </div>
      </div>

      <h2 className="text-[11px] uppercase tracking-widest text-fg-faint mb-3">
        tracki
      </h2>

      <div className="flex flex-col gap-6">
        {catalog.tracks.map((track) => {
          const trackLevels = track.topics.flatMap((t) => t.levels);
          const trackPassed = trackLevels.filter((l) => l.status === "passed").length;

          return (
            <section key={track.id} className="border border-border bg-bg-raised">
              <header className="flex items-baseline justify-between px-5 py-3 border-b border-border">
                <span className="font-extrabold text-lg">{track.id}</span>
                <span className="text-sm text-fg-dim">
                  {trackPassed} / {trackLevels.length}
                </span>
              </header>

              <ul>
                {track.topics.map((topic) => {
                  const topicSlug = topic.id.split("/")[1];
                  return (
                    <li
                      key={topic.id}
                      className="flex items-center justify-between px-5 py-2.5 border-b border-border last:border-b-0"
                    >
                      <Link
                        href={`/track/${track.id}/${topicSlug}`}
                        className="text-fg hover:text-accent font-bold"
                      >
                        {topic.title}
                      </Link>
                      <div className="flex gap-2">
                        {topic.levels.map((level) => (
                          <Link
                            key={level.id}
                            href={`/track/${track.id}/${topicSlug}/${level.id}`}
                          >
                            <StatusBadge status={level.status} />
                          </Link>
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
