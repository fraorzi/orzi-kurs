import { notFound } from "next/navigation";
import { buildCatalog } from "@/harness/catalog";
import { trackMeta } from "@/app/lib/tracks";
import Roadmap from "./Roadmap";

export default async function TrackPage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track } = await params;
  const data = buildCatalog().tracks.find((t) => t.id === track);
  if (!data) notFound();
  return <Roadmap track={data} name={trackMeta(track).name} />;
}
