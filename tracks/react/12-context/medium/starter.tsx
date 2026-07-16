import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

export interface Session {
  readonly userId: string;
  readonly displayName: string;
}

const SessionContext = createContext<Session>({
  userId: "guest",
  displayName: "Gość",
});

export function SessionProvider({
  session,
  children,
}: {
  readonly session: Session;
  readonly children: ReactNode;
}) {
  return (
    <SessionContext value={session}>
      {children}
    </SessionContext>
  );
}

export function useSession(): Session {
  return useContext(SessionContext);
}

export function AccountButton() {
  const session = useSession();
  return <button type="button">Konto: {session.displayName}</button>;
}
