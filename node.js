import fs from "fs";
import fetch from "node-fetch";

async function downloadInstagramVideo() {
  try {
    // API call karo
    const response = await fetch("http://localhost:3000/igdl?url=<INSTAGRAM_POST_URL>");
    const data = await response.json();

    // Video URL nikaalo
    const videoUrl = data.url.data[0].url;
    const thumbnail = data.url.data[0].thumbnail;

    console.log("Thumbnail:", thumbnail);
    console.log("Video URL:", videoUrl);

    // Video download karo
    const videoResponse = await fetch(videoUrl);
    const buffer = await videoResponse.arrayBuffer();

    fs.writeFileSync("instagram_video.mp4", Buffer.from(buffer));
    console.log("✅ Video saved as instagram_video.mp4");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

downloadInstagramVideo();
