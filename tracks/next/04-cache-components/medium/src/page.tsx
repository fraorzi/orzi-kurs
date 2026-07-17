import { ViewerGreeting } from "./ViewerGreeting";

export default async function Page() {
  const greeting = await ViewerGreeting();

  return (
    <main>
      <h1>Panel operacyjny</h1>
      <nav aria-label="Panel">Przegląd · Raporty</nav>
      {greeting}
    </main>
  );
}
