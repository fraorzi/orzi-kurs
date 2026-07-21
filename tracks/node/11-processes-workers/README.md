# Procesy potomne i worker threads

Node jest jednowątkowy dla JS, ale nie dla systemu. Dwa mechanizmy pracy poza
głównym wątkiem rozwiązują **różne** problemy:

- **`child_process`** — uruchamianie zewnętrznych programów. Osobny proces,
  osobna pamięć, komunikacja przez stdio/IPC.
- **`worker_threads`** — ciężkie obliczenia JS/WASM. Wątek w tym samym
  procesie, komunikacja przez `postMessage` (structured clone), opcjonalnie
  współdzielony `SharedArrayBuffer`.

Sieciowe I/O nie potrzebuje żadnego z nich — event loop obsługuje je
współbieżnie w wątku głównym; przenoszenie I/O do workera to czysty narzut.

## Shell injection

Największy pojedynczy błąd bezpieczeństwa przy procesach potomnych: sklejenie
komendy w string i `exec(cmd)`. Wtedy shell interpretuje `;`, `|`, `$()` —
także w danych od użytkownika. Kontrakt bezpieczny:

- program + **tablica argumentów** (`execFile`/`spawn`), nigdy interpolacja,
- `shell: false`,
- walidacja wejścia allow-listą (format pliku, znaki w ścieżce) — nie dlatego,
  że tablica nie chroni, tylko żeby błędne dane odrzucać wcześnie i jawnie.

## Korelacja request/response

Komunikacja z workerem/procesem jest asynchroniczna i przeplata odpowiedzi.
Standardowy wzorzec: każdemu żądaniu nadaj **unikalne id**, trzymaj mapę
`id → {resolve, reject}`, odpowiedź dopasuj po id. Do tego dwa twarde
wymagania produkcyjne: **limit in-flight** (pula nie może rosnąć bez końca)
i **odrzucenie wszystkich oczekujących**, gdy worker umrze — inaczej
requesty wiszą wiecznie.

## Kiedy używać

- `child_process`: CLI narzędzia (git, ffmpeg, imagemagick), izolacja crashy.
- `worker_threads`: parsowanie/kompresja/krypto w JS dłuższe niż pojedyncze
  milisekundy, gdy blokują one obsługę żądań.
- Manager korelacji: każdy własny protokół request/response po message passing.

## Kiedy unikać

- Nie używaj workerów do I/O — event loop robi to lepiej i taniej.
- Nie spawnuj procesu na każde żądanie, gdy wystarczy pula.
- Krótkie obliczenia (< kilka ms) zostaw w wątku głównym — koszt serializacji
  zje zysk.

## Pułapki

- `exec` z interpolowanym stringiem = shell injection; `execFile`/`spawn`
  z tablicą argumentów.
- `postMessage` kopiuje dane (structured clone) — duże bufory przenoś przez
  transfer list albo SharedArrayBuffer.
- Po `worker.on("error"/"exit")` każde oczekujące żądanie musi zostać
  odrzucone — mapa korelacji nie może przeżywać workera.
- Zombie: procesy potomne bez obsługi `exit` i bez `kill` przy shutdownie.

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [Child process](https://nodejs.org/download/release/latest-v24.x/docs/api/child_process.html)
- [Worker threads](https://nodejs.org/download/release/latest-v24.x/docs/api/worker_threads.html)
