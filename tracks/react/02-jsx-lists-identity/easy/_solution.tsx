export interface InboxSummaryProps {
  readonly userName: string;
  readonly unreadCount: number;
}

export function InboxSummary({
  userName,
  unreadCount,
}: InboxSummaryProps) {
  let message = `${unreadCount} nowych wiadomości`;
  if (unreadCount === 0) message = "Brak nowych wiadomości";
  if (unreadCount === 1) message = "1 nowa wiadomość";

  return (
    <section aria-label={`Skrzynka ${userName}`}>
      <h2>Witaj, {userName}</h2>
      <p>{message}</p>
    </section>
  );
}
