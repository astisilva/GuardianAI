# GuardianAI Frontend

Detta är frontend-delen av GuardianAI-projektet, byggd med Vite och React.

## Installation

1. Navigera till frontend-mappen:
   ```bash
   cd frontend
   ```

2. Installera beroenden:
   ```bash
   npm install
   ```

3. Starta utvecklingsservern:
   ```bash
   npm run dev
   ```

## Miljövariabler

Skapa en `.env`-fil i denna mapp och lägg till följande:

```env
VITE_API_URL=http://localhost:8000
```

## Projektstruktur

- `src/` - Innehåller alla komponenter och vyer
- `main.jsx` - Ingångspunkt för appen
- `App.jsx` - Huvudkomponenten

## Funktioner

- Användare kan skriva meddelanden och skicka dem till backend för analys.
- Analysresultatet visas på sidan.

