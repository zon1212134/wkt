// const { Innertube } = require('youtubei.js');
import { Innertube } from 'youtubei.js';
const innertube = new Innertube.create(/* options */);

async function getVideoInfo() {
  try {
    const info = await innertube.getInfo("dQw4w9WgXcQ");
    return info;
  } catch (error) {
    console.error("Failed to get video info:", error);
    throw new Error("Failed to fetch video information.");
  }
}

export { getVideoInfo };
