import { notFound } from "next/navigation";
import { buildCatalog } from "@/harness/catalog";
import { trackMeta } from "@/app/lib/tracks";
import Roadmap from "./Roadmap";

export default async function TrackPage({
  params,
  searchParams = Promise.resolve({}),
}: {
  params: Promise<{ track: string }>;
  searchParams?: Promise<{ stage?: string; filter?: string }>;
}) {
  const { track } = await params;
  const query = await searchParams;
  const data = buildCatalog().tracks.find((t) => t.id === track);
  if (!data) notFound();
  return <Roadmap track={data} name={trackMeta(track).name} now={new Date().toISOString()} stageId={query.stage} filter={query.filter} />;
}
