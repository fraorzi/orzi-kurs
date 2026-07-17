import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>Nie znaleziono produktu</h1>
      <Link href="/products">Wróć do katalogu</Link>
    </main>
  );
}
