from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
import os
from dotenv import load_dotenv
from deep_translator import GoogleTranslator
from langdetect import detect



# Ladda miljövariabler från .env-filen
load_dotenv()

# Hämta HuggingFace API-nyckel
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")

# Kontrollera att nyckeln finns
if not HUGGINGFACE_API_KEY:
    raise ValueError("HUGGINGFACE_API_KEY saknas i .env-filen eller kunde inte läsas")

# Skapa sentiment-analys pipeline från Hugging Face (med autentisering)
sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english",
    token=HUGGINGFACE_API_KEY
)


# Skapa FastAPI-app
app = FastAPI()

# Tillåt alla ursprung (CORS) – anpassa gärna i produktion
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "API är igång!"}

@app.post("/analyze/")
async def analyze_text(data: dict):
    try:
        input_text = data.get("text", "")
        input_language = detect(input_text)  # auto-detektera språk

        # Om texten är på svenska, översätt till engelska
        if input_language.lower() == "sv" and input_text:
            translated_text = GoogleTranslator(source='sv', target='en').translate(input_text)
        else:
            translated_text = input_text

        # Analysera med HuggingFace
        result = sentiment_pipeline(translated_text)[0]  # ta första resultatet

        # Tolka resultatet på svenska för frontend
        label = result['label']
        score = result['score']

        if label == "NEGATIVE":
            tone = "Aggressiv"
            sentiment = "Negativ"
            riskLevel = "Hög" if score > 0.8 else "Medium"
        else:
            tone = "Neutral"
            sentiment = "Positiv"
            riskLevel = "Låg"

        return {
            "original_text": input_text,
            "translated_text": translated_text,
            "tone": tone,
            "sentiment": sentiment,
            "riskLevel": riskLevel,
            "score": score
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Något gick fel: {str(e)}")
