import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export interface Issue {
  readonly id: string;
  readonly title: string;
  readonly status: "open" | "closed";
}

export function IssueBoard({
  fetchIssues,
  closeIssue,
}: {
  fetchIssues: (
    signal: AbortSignal,
  ) => Promise<readonly Issue[]>;
  closeIssue: (id: string) => Promise<void>;
}) {
  const queryClient = useQueryClient();
  const issues = useQuery({
    queryKey: ["issues"],
    queryFn: ({ signal }) => fetchIssues(signal),
  });
  const closeMutation = useMutation({
    mutationFn: closeIssue,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["issues"],
      }),
  });

  if (issues.isPending) return <p>Ładowanie zgłoszeń…</p>;
  if (issues.isError)
    return (
      <p role="alert">Nie udało się pobrać zgłoszeń.</p>
    );

  return (
    <ul aria-label="Zgłoszenia">
      {issues.data.map((issue) => (
        <li key={issue.id}>
          <span>
            {issue.title}:{" "}
            {issue.status === "open"
              ? "Otwarte"
              : "Zamknięte"}
          </span>
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
