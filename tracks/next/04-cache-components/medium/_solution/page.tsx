import { Suspense } from "react";
import { ViewerGreeting } from "./ViewerGreeting";

export default function Page() {
  return (
    <main>
      <h1>Panel operacyjny</h1>
      <nav aria-label="Panel">Przegląd · Raporty</nav>
      <Suspense fallback={<p role="status">Ładowanie użytkownika…</p>}>
        <ViewerGreeting />
      </Suspense>
    </main>
  );
}
