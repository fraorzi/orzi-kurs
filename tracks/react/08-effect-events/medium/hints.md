## Hint 1

Konfiguracją połączenia jest `roomId`, ale wyświetlenie powiadomienia jest zdarzeniem
pochodzącym z połączenia.

## Hint 2

Effect Event może czytać najnowsze `muted` i `onNotify` bez dodawania ich do zależności.

## Hint 3

Przekaż do `chat.connect` mały callback wywołujący Effect Event z `roomId`.
