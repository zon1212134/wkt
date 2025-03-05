import { Innertube, UniversalCache } from "youtubei.js";

// YouTubeクライアントの初期化
let yt = null;

// Innertubeを初期化する関数
async function initInnerTube() {
  try {
    console.log("Initializing Innertube...");
    yt = await Innertube.create({
      location: "JP"
    });
    console.log("Innertube initialized successfully.");
  } catch (e) {
    yt = null;
    console.error("Error during Innertube initialization:", e);
    throw new Error("Failed to initialize Innertube.");
  }
}

// 動画情報を取得する関数
async function getVideoInfo(videoId) {
  if (!yt) {
    await initInnerTube();  // クライアントが初期化されていない場合は初期化を試みる
  }

  try {
    const info = await yt.getInfo(videoId);
    return {
      title: info.basic_info.title,
      author: info.basic_info.author,
      lengthSeconds: info.basic_info.duration,
      views: info.basic_info.view_count,
      likes: info.basic_info.likes,
      description: info.basic_info.short_description,
      thumbnail: info.basic_info.thumbnail?.[0]?.url,
      uploadDate: info.basic_info.upload_date,
    };
  } catch (error) {
    console.error("Failed to get video info:", error);
    throw new Error("Failed to fetch video information.");
  }
}

export { getVideoInfo };
