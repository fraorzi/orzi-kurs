import { createContext, use } from "react";

export const ThemeContext = createContext("light");

export function ThemeDetails({
  showDetails,
}: {
  showDetails: boolean;
}) {
  if (!showDetails) {
    return <p>Szczegóły motywu ukryte</p>;
  }

  const theme = use(ThemeContext);
  return <p>Aktywny motyw: {theme}</p>;
}
