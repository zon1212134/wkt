const axios = require("axios");
const express = require("express");
const router = express.Router();
const path = require("path");
const http = require('http');
const serverYt = require("/app/server/youtube.js");

router.get('/edu/:id', async (req, res) => {
  const videoId = req.params.id;
  try {
    const videoInfo = "";
    const ytinfo = await axios.get("https://wktedutube.glitch.me");
    const src = `https://www.youtubeeducation.com/embed/${videoId}${ytinfo.data}`;
    
    const templateData = {
      videoId: videoId,
      channelId: videoInfo.channelId,
      channelName: videoInfo.channelName,
      channelImage: videoInfo.channelImage,
      videoTitle: videoInfo.videoTitle,
      videoDes: videoInfo.videoDes,
      videoViews: videoInfo.videoViews,
      likeCount: videoInfo.likeCount,
      Videosrc: src
    };
          
    res.render('tube/umekomi.ejs', templateData);
  } catch (error) {
     res.status(500).render('matte', { 
      videoId, 
      error: '動画を取得できません', 
      details: error.message 
    });
  }
});

module.exports = router;