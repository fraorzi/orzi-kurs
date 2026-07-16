import { useEffect } from "react";

export function DocumentTitleSync({
  documentId,
  title,
  saveTitle,
}: {
  readonly documentId: string;
  readonly title: string;
  readonly saveTitle: (documentId: string, title: string) => void;
}) {
  useEffect(() => {
    saveTitle(documentId, title);
  }, [documentId, saveTitle, title]);

  return <h1>{title}</h1>;
}

