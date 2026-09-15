"use client";

import TrackBadge from "../TrackBadge";
import SelectMenu from "../SelectMenu";
import type { Roadmap } from "@/app/lib/roadmap";

export default function CoursePicker({ chapters, selectedId, onSelect }: {
  chapters: Roadmap["chapters"];
  selectedId: string | undefined;
  onSelect: (topicId: string) => void;
}) {
  return <SelectMenu label="Wybierz kurs" menuLabel="Kursy na roadmapie"
    value={selectedId ?? chapters[0]?.id ?? ""}
    options={chapters.map((chapter) => ({
      value: chapter.id,
      label: chapter.name,
      detail: `${chapter.passed} / ${chapter.total} tematów`,
      leading: <TrackBadge id={chapter.id} size="sm" />,
    }))}
    onChange={(id) => {
      const first = chapters.find((chapter) => chapter.id === id)?.steps[0];
      if (first) onSelect(first.topic.id);
    }} />;
}
