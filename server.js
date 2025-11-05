const express = require("express");
const cors = require("cors");
const snapsave = require("./snapsave-downloader/index");

const app = express();

// CORS - Allow your frontend domain
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// Use Render's PORT environment variable
const port = process.env.PORT || 3000;

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    status: "ok",
    message: "SnInstaDownloader API is running",
    timestamp: new Date().toISOString()
  });
});

// Instagram Downloader Route
app.get("/igdl", async (req, res) => {
  try {
    const url = req.query.url;

    if (!url) {
      return res.status(400).json({ error: "URL parameter is missing" });
    }

    console.log("Processing URL:", url);
    const result = await snapsave(url);
    console.log("Snapsave result received");

    // Send only the data array to frontend
    res.json(result.data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ 
      error: "Internal Server Error",
      message: err.message 
    });
  }
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
