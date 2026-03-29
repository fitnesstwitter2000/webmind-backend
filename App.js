import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({ probability: 0, totalSignals: 0 });

  useEffect(() => {
    fetch("http://localhost:3001/aggregate")
      .then(res => res.json())
      .then(setData);
  }, []);

  const sendSignal = () => {
    fetch("http://localhost:3001/signal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        confidence: Math.floor(Math.random() * 100)
      })
    }).then(() => window.location.reload());
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>🕸️ WebMind</h1>

      <h2>Swarm Prediction: {data.probability.toFixed(2)}%</h2>
      <p>Total Signals: {data.totalSignals}</p>

      <button onClick={sendSignal}>
        Submit Signal
      </button>
    </div>
  );
}

export default App;