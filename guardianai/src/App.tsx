import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // State för att lagra resultatet från analysen
  const [result, setResult] = useState('');
  // State för att lagra användarens inmatade text
  const [text, setText] = useState('');

  // Den här funktionen körs när användaren klickar på "Analysera"
  const handleAnalyze = async () => {
    // Kontroll: trim() Om texten bara är tomma mellanslag – visa ett meddelande
    if (!text.trim()) {
      setResult('Skriv något att analysera.');
      return;
    }

    // Kontroll: Om texten är för kort – visa ett meddelande
    if (text.trim().length < 3) {
      setResult('Texten måste innehålla minst 3 tecken.');
      return;
    }

    try {
      // Skickar en POST-förfrågan till backend på http://127.0.0.1:8000/analyze/
      // och skickar med texten som användaren skrev in
      const response = await axios.post('http://127.0.0.1:8000/analyze/', { text });

      // När svaret kommer tillbaka, plocka ut informationen från svaret
      // och uppdatera resultatet som visas för användaren
      setResult(
        `Ton: ${response.data.tone}, Sentiment: ${response.data.sentiment}, Risknivå: ${response.data.riskLevel}`
      );
    } catch (error) {
      // Om något går fel vid anropet, logga felet och visa ett felmeddelande
      console.error('Error analyzing text', error);
      setResult('Något gick fel');
    }
  };

  return (
    <div className="container">
      <h1>GuardianAI - Textanalys</h1>
      <textarea
        placeholder="Skriv text här"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
      />
      {/* När knappen klickas anropas handleAnalyze */}
      <button onClick={handleAnalyze}>Analysera</button>

      {/* Visar resultatet från analysen */}
      <p>Resultat: {result}</p>
    </div>
  );
}

export default App;
