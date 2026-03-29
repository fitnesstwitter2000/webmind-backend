const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let signals = [];

app.post("/signal", (req, res) => {
  signals.push(req.body);
  res.json({ ok: true });
});

app.get("/aggregate", (req, res) => {
  const total = signals.reduce((sum, s) => sum + s.confidence, 0);
  const avg = total / (signals.length || 1);

  res.json({
    probability: avg,
    totalSignals: signals.length
  });
});

app.listen(3001, () => console.log("Backend running"));