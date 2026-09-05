import { useEffect, useState } from "react";

export interface User {
  readonly id: string;
  readonly name: string;
}

export interface UserProfileProps {
  userId: string;
  loadUser: (userId: string) => Promise<User>;
}

export function UserProfile({
  userId,
  loadUser,
}: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser(userId)
      .then(setUser)
      .catch(() => {});
  }, [loadUser, userId]);

  return user ? <h1>{user.name}</h1> : <p>Brak danych</p>;
}
