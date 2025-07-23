# GuardianAI Backend

Detta är backend-delen av GuardianAI-projektet, byggd med FastAPI och Python.

## Installation

1. Skapa ett virtuellt miljö (valfritt men rekommenderat):
   ```bash
   python -m venv venv
   source venv/bin/activate  # På Windows: venv\Scripts\activate
   ```

2. Installera beroenden:
   ```bash
   pip install -r requirements.txt
   ```

3. Starta servern:
   ```bash
   uvicorn app:app --reload
   ```

## API

- `POST /analyze` - Tar emot text och returnerar en analys
- `GET /` - Test-endpoint (returnerar "API är igång!")

## Projektstruktur

- `app.py` - Huvudfilen med API-logiken

## Miljövariabler

Skapa en `.env`-fil för känslig data om du lägger till t.ex. API-nycklar.

