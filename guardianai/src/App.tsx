import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [result, setResult] = useState<string>('');
  const [text, setText] = useState<string>('');

  const handleAnalyze = async (): Promise<void> => {
    if (!text.trim()) {
      setResult('Skriv något att analysera.');
      return;
    }
    if (text.trim().length < 3) {
      setResult('Texten måste innehålla minst 3 tecken.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/analyze/', { text });
      setResult(`${response.data.label} (Confidence: ${response.data.score.toFixed(2)})`);
    } catch (error) {
      console.error('Error analyzing text', error);
      setResult('Något gick fel');
    }
  };

  return (
    <>
      <div>
        <h1>GuardianAI - Textanalys</h1>
        <textarea
          placeholder="Skriv text här"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />
        <button onClick={handleAnalyze}>Analysera</button>

        <p>Resultat:{result}</p>
      </div>
    </>
  );
}

export default App;
