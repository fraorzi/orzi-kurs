import { useEffect } from "react";

export interface DocumentTitleProps {
  readonly title: string;
}

export function DocumentTitle({ title }: DocumentTitleProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);

  return <h1>{title}</h1>;
}
