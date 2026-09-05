import { cacheLife } from "next/cache";
import { cookies } from "next/headers";
import { readProfile } from "./profile-data";

async function CachedProfile({
  sessionId,
}: {
  sessionId: string;
}) {
  "use cache";
  cacheLife("minutes");
  const profile = await readProfile(sessionId);
  return <h1>Profil: {profile.name}</h1>;
}

export async function ProfilePage() {
  const sessionId = (await cookies()).get("session")?.value;
  if (!sessionId) return <p>Zaloguj się</p>;

  return <CachedProfile sessionId={sessionId} />;
}
