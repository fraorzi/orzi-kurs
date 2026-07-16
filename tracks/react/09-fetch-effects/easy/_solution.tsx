import {
  useEffect,
  useState,
} from "react";

export interface User {
  readonly id: string;
  readonly name: string;
}

export interface UserProfileProps {
  readonly userId: string;
  readonly loadUser: (userId: string) => Promise<User>;
}

type UserResult =
  | {
    readonly userId: string;
    readonly status: "success";
    readonly user: User;
  }
  | {
    readonly userId: string;
    readonly status: "error";
  };

export function UserProfile({ userId, loadUser }: UserProfileProps) {
  const [result, setResult] = useState<UserResult | null>(null);
  const currentResult = result?.userId === userId ? result : null;

  useEffect(() => {
    loadUser(userId)
      .then((user) => {
        setResult({ userId, status: "success", user });
      })
      .catch(() => {
        setResult({ userId, status: "error" });
      });
  }, [loadUser, userId]);

  if (!currentResult) {
    return <p>Ładowanie profilu…</p>;
  }
  if (currentResult.status === "error") {
    return <p role="alert">Nie udało się pobrać profilu.</p>;
  }
  return <h1>{currentResult.user.name}</h1>;
}
