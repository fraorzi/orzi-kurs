export interface ProfileCardProps {
  name: string;
  role: string;
  online: boolean;
}

export function ProfileCard({
  name,
  role,
  online,
}: ProfileCardProps) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{role}</p>
      <p>{online ? "Dostępny" : "Offline"}</p>
    </article>
  );
}
