import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

export interface Session {
  readonly userId: string;
  readonly displayName: string;
}

const SessionContext = createContext<Session | null>(null);

export function SessionProvider({
  session,
  children,
}: {
  session: Session;
  children: ReactNode;
}) {
  return (
    <SessionContext value={session}>
      {children}
    </SessionContext>
  );
}

export function useSession(): Session {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error("useSession wymaga SessionProvider");
  }
  return session;
}

export function AccountButton() {
  const session = useSession();
  return (
    <button type="button">
      Konto: {session.displayName}
    </button>
  );
}
