const express = require("express");
const cors = require("cors");
const snapsave = require("./snapsave-downloader/index");

const app = express();
app.use(cors()); // ✅ Allow frontend to access API

const port = process.env.PORT || 3000;

// Test route
app.get("/", (req, res) => {
  res.json({ message: "✅ Instagram Downloader API is running!" });
});

// Instagram Downloader Route
app.get("/igdl", async (req, res) => {
  try {
    const url = req.query.url;

    if (!url) {
      return res.status(400).json({ error: "URL parameter is missing" });
    }

    // 🔹 Call Snapsave
    const downloadedData = await snapsave(url);
    console.log("Snapsave raw result:", downloadedData);

    // 🔹 Wrap response properly so frontend can read it
    res.json({
      url: {
        data: downloadedData.data
      }
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
