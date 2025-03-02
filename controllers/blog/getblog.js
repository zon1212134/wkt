const axios = require("axios");
const express = require("express");
const router = express.Router();
const path = require("path");
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

async function Getblog(blogId, part) {
  const cachedData = cache.get(blogId);
  if (cachedData) {
    return cachedData;
  }
  try {
    const response = await axios.get(`https://wakameblog.glitch.me/${part}/${blogId}.html`);
    cache.set(blogId, response.data);
    return response.data;
  } catch (error) {
    return null;
  }
}

async function GetblogList(part) {
  const cachedData = cache.get(`list-${part}`);
  if (cachedData) {
    return cachedData;
  }
  try {
    const response = await axios.get(`https://wakameblog.glitch.me/${part}.html`);
    cache.set(`list-${part}`, response.data);
    return response.data;
  } catch (error) {
    return null;
  }
}

router.get('/blog/:id', async (req, res) => {
  const blogId = req.params.id;
  const blogData = await Getblog(blogId, "blog");
  if (blogData) {
    res.send(blogData);
  } else {
    res.status(500).send('ブログ記事の取得に失敗しました');
  }
});

router.get('/l/:id', async (req, res) => {
  const part = req.params.id;
  const blogData = await GetblogList(part);
  if (blogData) {
    res.send(blogData);
  } else {
    res.status(500).send('ブログ記事の取得に失敗しました');
  }
});

module.exports = router;