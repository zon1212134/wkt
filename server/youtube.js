import { Innertube } from 'youtubei.js';

async function initYT() {
  return await Innertube.create({
    lang: "ja",
    location: "JP"
  });
}

const ytPromise = initYT();

async function infoGet(id) {
  const yt = await ytPromise;
  return await yt.getInfo(id);
}

module.exports = infoGet;