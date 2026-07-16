#!/bin/zsh

cd "$(dirname "$0")"

PORT=4174
URL="http://localhost:${PORT}"

echo ""
echo "NYC 2026"
echo "Aplikacja jest dostępna pod adresem: ${URL}"
echo "Aby ją zatrzymać, wróć do tego okna i naciśnij Control+C."
echo ""

(sleep 1; open "$URL") &
python3 -m http.server "$PORT"
