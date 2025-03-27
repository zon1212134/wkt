const { fetch } = require("undici");
const express = require("express");
const router = express.Router();
const path = require("path");
const http = require('http');

router.get("/", async (req, res) => {
  try {
    const response = await fetch("https://wataamee.glitch.me/topvideos/apiv2");
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const topVideos = await response.json();
    res.render("tube/trend.ejs", { topVideos });
  } catch (error) {
    console.error('エラーが発生しました:', error);
    res.render("tube/trend", { topVideos: [] });
  }
});

module.exports = router;