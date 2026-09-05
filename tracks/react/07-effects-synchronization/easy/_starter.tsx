import { useEffect } from "react";

export interface DocumentTitleProps {
  title: string;
}

export function DocumentTitle({
  title,
}: DocumentTitleProps) {
  useEffect(() => {
    document.title = title;
  }, []);

  return <h1>{title}</h1>;
}
