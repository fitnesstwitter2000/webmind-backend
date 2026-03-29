const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory signal store (MVP level)
let signals = [];

/**
 * POST /signal
 * Add a new trading signal
 * body: { confidence: number }
 */
app.post("/signal", (req, res) => {
  const { confidence } = req.body;

  // basic validation
  if (typeof confidence !== "number") {
    return res.status(400).json({ error: "confidence must be a number" });
  }

  signals.push({ confidence, timestamp: Date.now() });

  res.json({
    ok: true,
    message: "signal added"
  });
});

/**
 * GET /aggregate
 * Returns average probability from all signals
 */
app.get("/aggregate", (req, res) => {
  if (signals.length === 0) {
    return res.json({
      probability: 0,
      totalSignals: 0
    });
  }

  const total = signals.reduce((sum, s) => sum + s.confidence, 0);
  const avg = total / signals.length;

  res.json({
    probability: avg,
    totalSignals: signals.length
  });
});

/**
 * Health check route (useful for Render)
 */
app.get("/", (req, res) => {
  res.json({
    status: "WebMind backend running",
    endpoints: ["/signal (POST)", "/aggregate (GET)"]
  });
});

// ✅ FIXED PORT FOR RENDER DEPLOYMENT
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});