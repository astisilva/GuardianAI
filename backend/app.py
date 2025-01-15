from fastapi import FastAPI
from pydantic import BaseModel

#skapa FastAPI/applikation
app = FastAPI()

#Pydantic-modell för att emot textdata
class TextInput(BaseModel):
  text: str

# POST-endpoint för att analysera text
@app.post('/analyze/')
async def analyze_text(input: TextInput):
  #Dummy-analys för att visa hur det fungerar
  text_length = len(input.text)
  return{'message': 'Text received','length': text_length}

@app.get("/")
async def root():
    return {"message": "Welcome to my FastAPI app!"}
