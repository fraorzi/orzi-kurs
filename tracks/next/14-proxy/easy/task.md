# Ogranicz uruchamianie Proxy matcherem

Uzupełnij eksport `config`, aby Proxy uruchamiało się dla tras aplikacji, ale nie
dla `/api`, `/_next/static`, `/_next/image`, `/favicon.ico`, `/sitemap.xml` ani
`/robots.txt`. Matcher ma być stałym literałem możliwym do analizy podczas buildu.
