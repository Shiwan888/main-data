const express = require("express");
const cors = require("cors");
const snapsave = require("./snapsave-downloader/src/index");

const app = express();

// ✅ CORS - Allow ALL origins (this fixes your issue)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

app.use(express.json());

const port = process.env.PORT || 3000;

// Health check
app.get("/", (req, res) => {
  res.json({ 
    status: "ok",
    message: "SnInstaDownloader API is running",
    timestamp: new Date().toISOString()
  });
});

// Instagram Downloader
app.get("/igdl", async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: "URL parameter is missing" });
    }
    
    console.log("Processing URL:", url);
    const result = await snapsave(url);
    console.log("Success! Items:", result.data?.length || 0);
    
    res.json(result.data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ 
      error: "Internal Server Error",
      message: err.message 
    });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`CORS enabled for all origins`);
});
