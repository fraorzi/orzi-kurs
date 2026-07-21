import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap state-page">
      <p className="state-kicker">Nie znaleziono</p>
      <h1>Ta część kursu nie istnieje</h1>
      <p>Adres może być nieaktualny albo wybrany temat nie jest jeszcze dostępny.</p>
      <div className="state-actions">
        <Link className="cta" href="/">Przejdź do strony głównej</Link>
      </div>
    </div>
  );
}
