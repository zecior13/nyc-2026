# NYC 2026 · Nasz Nowy Jork

Rodzinny, instalowalny przewodnik po Nowym Jorku na 22–30 sierpnia 2026. Aplikacja działa na telefonie także bez internetu po pierwszym uruchomieniu online.

## Instalacja na iPhonie

1. Otwórz adres aplikacji w **Safari**.
2. Dotknij przycisku **Udostępnij** (kwadrat ze strzałką).
3. Wybierz **Do ekranu początkowego**, a następnie **Dodaj**.
4. Uruchom ikonę **NYC 2026** jeszcze podczas połączenia z internetem.
5. Po pierwszym pełnym uruchomieniu przewodnik jest dostępny offline. Zewnętrzne mapy, Spotify, strony rezerwacyjne i inne witryny nadal wymagają internetu.

Dokładny scenariusz testu znajduje się w pliku `GOSIA-TEST.md`.

## Najprostsze uruchomienie na Macu

1. Kliknij dwukrotnie plik `Uruchom aplikacje.command`.
2. Jeśli macOS zablokuje pierwsze uruchomienie, kliknij plik prawym przyciskiem, wybierz **Otwórz**, a następnie ponownie **Otwórz**.
3. Zostaw otwarte okno Terminala podczas korzystania z aplikacji.
4. Aby zakończyć podgląd, wróć do Terminala i naciśnij `Control+C`.

Aplikacja otworzy się pod adresem `http://localhost:4174`.

## Uruchomienie lokalne

Aplikację należy otwierać przez prosty lokalny serwer HTTP, ponieważ service worker nie działa po bezpośrednim otwarciu pliku `index.html`.

## Założenia

- działanie offline;
- mobilny ekran „Dzisiaj”;
- pełny plan z rezerwacjami i wariantami elastycznymi;
- osobne treści dla miejsc, muzeów, filmów i muzyki;
- brak przechowywania wrażliwych danych;
- publikacja docelowa przez GitHub Pages.
- polski lektor wykorzystujący głos dostępny w telefonie lub komputerze, również bez przesyłania treści do aplikacji.
- niezależny słownik wymowy nazw angielskich: oryginalna pisownia na ekranie, fonetyczna wymowa tylko w lektorze.
