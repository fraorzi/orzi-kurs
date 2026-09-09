import type { Metadata } from "next";
import { connection } from "next/server";
import { buildCatalog } from "@/harness/catalog";
import { buildRoadmap } from "@/app/lib/roadmap";
import LearningMap from "@/app/components/roadmap/LearningMap";

export const metadata: Metadata = { title: "Roadmapa | orzi-kurs" };

export default async function RoadmapPage() {
  await connection();
  return <LearningMap roadmap={buildRoadmap(buildCatalog())} />;
}
