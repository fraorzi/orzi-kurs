# Zlokalizuj draft po pomiarze Profilerem

Profiler wykazał, że lista zgłoszeń commitowała przy każdej literze prywatnej
notatki, mimo że nie czyta tego stanu.

Zrefaktoryzuj `TicketWorkspace`: przenieś stan `Notatka wewnętrzna` do małego
komponentu właściciela pola. Wpisywanie nie może renderować `TicketList`.

Nie używaj `memo`, `useMemo` ani `useCallback`. Zachowaj publiczny interfejs i
instrumentację `onTicketListRender`.

