import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

type Locale = "pl" | "en";

const LocaleContext = createContext<Locale>("pl");

export interface LocaleProviderProps {
  readonly locale: Locale;
  readonly children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  return children;
}

export function Greeting() {
  const locale = useContext(LocaleContext);
  return <h1>{locale === "pl" ? "Witaj!" : "Welcome!"}</h1>;
}
