import { cookies } from "next/headers";
import { readProfile } from "./profile-data";

export async function ProfilePage() {
  "use cache";
  const sessionId = (await cookies()).get("session")?.value;
  if (!sessionId) return <p>Zaloguj się</p>;

  const profile = await readProfile(sessionId);
  return <h1>Profil: {profile.name}</h1>;
}
