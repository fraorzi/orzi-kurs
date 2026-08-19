export interface InboxSummaryProps {
  readonly userName: string;
  readonly unreadCount: number;
}

export function InboxSummary({
  userName,
  unreadCount,
}: InboxSummaryProps) {
  const unreadCountMessages: Record<number, string> = {
    0: "Brak nowych wiadomości",
    1: "1 nowa wiadomość",
  };

  return (
    <section aria-label={`Skrzynka ${userName}`}>
      <h1>Witaj, {userName}</h1>
      <p>
        {unreadCountMessages[unreadCount] ||
          `${unreadCount} nowych wiadomości`}
      </p>
    </section>
  );
}
