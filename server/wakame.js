const axios = require('axios');
const bodyParser = require('body-parser');

let apis = null;
const MAX_API_WAIT_TIME = 3000; 
const MAX_TIME = 10000;

async function getapis() {
    try {
        const response = await axios.get('https://wtserver.glitch.me/apis');
        apis = response.data;
        console.log('データを取得しました:', apis);
    } catch (error) {
        console.error('データの取得に失敗しました:', error);
    }
}

async function ggvideo(videoId) {
  const startTime = Date.now();
  const instanceErrors = new Set();
  for (let i = 0; i < 20; i++) {
    if (Math.floor(Math.random() * 14) === 0) {
        await getapis();
    }
  }
  if(!apis){
    await getapis();
  }
  for (const instance of apis) {
    try {
      const response = await axios.get(`${instance}/api/v1/videos/${videoId}`, { timeout: MAX_API_WAIT_TIME });
      console.log(`使ってみたURL: ${instance}/api/v1/videos/${videoId}`);
      
      if (response.data && response.data.formatStreams) {
        return response.data; 
      } else {
        console.error(`formatStreamsが存在しない: ${instance}`);
      }
    } catch (error) {
      console.error(`エラーだよ: ${instance} - ${error.message}`);
      instanceErrors.add(instance);
    }

    if (Date.now() - startTime >= MAX_TIME) {
      throw new Error("接続がタイムアウトしました");
    }
  }
  throw new Error("動画を取得する方法が見つかりません");
}

module.exports = { 
  ggvideo, 
  getapis,
};