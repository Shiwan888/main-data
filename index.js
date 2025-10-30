const express = require("express");
const cors = require("cors"); // CORS enable
const snapsave = require("./snapsave-downloader/src/index");

const app = express();
app.use(cors());

const port = 3000;

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Instagram Downloader Route
app.get("/igdl", async (req, res) => {
  try {
    const url = req.query.url;

    if (!url) {
      return res.status(400).json({ error: "URL parameter is missing" });
    }

    const result = await snapsave(url);

    console.log("Snapsave raw result:", result);

    // ✅ Send only the data array to frontend
    res.json(result.data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
