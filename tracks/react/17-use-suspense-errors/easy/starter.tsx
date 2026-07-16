import {
  createContext,
  useContext,
} from "react";

export const ThemeContext = createContext("light");

export function ThemeDetails({
  showDetails,
}: {
  readonly showDetails: boolean;
}) {
  if (!showDetails) {
    return <p>Szczegóły motywu ukryte</p>;
  }

  const theme = useContext(ThemeContext);
  return <p>Aktywny motyw: {theme}</p>;
}
