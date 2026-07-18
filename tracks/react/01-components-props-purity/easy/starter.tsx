export interface ProfileCardProps {
  readonly name: string;
  readonly role: string;
  readonly online: boolean;
}

export function ProfileCard({
  name,
  role,
  online,
}: ProfileCardProps) {
  return (
    <article aria-label={`Profil ${name}`}>
      <h2>{name}</h2>
      <p>{role}</p>
      <p>{online ? "Dostępny" : "Offline"}</p>
    </article>
  );
}
