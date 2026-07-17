import { useMutation, useQuery } from "@tanstack/react-query";

export interface Issue {
  readonly id: string;
  readonly title: string;
  readonly status: "open" | "closed";
}

export function IssueBoard({
  fetchIssues,
  closeIssue,
}: {
  readonly fetchIssues: (signal: AbortSignal) => Promise<readonly Issue[]>;
  readonly closeIssue: (id: string) => Promise<void>;
}) {
  const issues = useQuery({
    queryKey: ["issues"],
    queryFn: () => fetchIssues(new AbortController().signal),
  });
  const closeMutation = useMutation({ mutationFn: closeIssue });

  if (issues.isPending) return <p>Ładowanie zgłoszeń…</p>;
  if (issues.isError) return <p role="alert">Nie udało się pobrać zgłoszeń.</p>;

  return (
    <ul aria-label="Zgłoszenia">
      {issues.data.map((issue) => (
        <li key={issue.id}>
          <span>{issue.title}: {issue.status === "open" ? "Otwarte" : "Zamknięte"}</span>
          {issue.status === "open" && (
            <button
              type="button"
              disabled={closeMutation.isPending}
              onClick={() => closeMutation.mutate(issue.id)}
            >
              Zamknij {issue.title}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
