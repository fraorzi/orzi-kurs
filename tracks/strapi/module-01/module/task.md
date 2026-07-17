# Dostarcz pionowy feature publikacji artykułu

Uzupełnij `src/backend.ts`. Endpoint ma:

1. dopuścić wyłącznie editor/admin,
2. zwalidować `documentId`, locale i title,
3. opcjonalnie zapisać media,
4. zaktualizować draft i opublikować dokument,
5. sanitizować odpowiedź i wysłać webhook po sukcesie,
6. usunąć zapisane media przy częściowym błędzie,
7. nie ujawniać szczegółów błędu w odpowiedzi 500.

Nie uruchamiaj panelu admin. Zależności odpowiadają rzeczywistym granicom Strapi 5 i są wstrzyknięte, aby test integracyjny był szybki i deterministyczny.

