export interface InboxSummaryProps {
  readonly userName: string;
  readonly unreadCount: number;
}

const getMessage = (
  unreadCount: InboxSummaryProps["unreadCount"],
) => {
  switch (unreadCount) {
    case 0:
      return "Brak nowych wiadomości";
    case 1:
      return "1 nowa wiadomość";
    default:
      return `${unreadCount} nowych wiadomości`;
  }
};

export function InboxSummary({
  userName,
  unreadCount,
}: InboxSummaryProps) {
  return (
    <section aria-label={`Skrzynka ${userName}`}>
      <h2>Witaj, {userName}</h2>
      <p>{getMessage(unreadCount)}</p>
    </section>
  );
}
