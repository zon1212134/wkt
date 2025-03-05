const axios = require("axios");
const express = require("express");
const router = express.Router();
const path = require("path");

router.get('/history', (req, res) => {
    let favorites = [];
    const cookie = req.headers.cookie
        .split('; ')
        .find(row => row.startsWith('wakametubehistory='));
    if (cookie) {
        try {
            favorites = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
        } catch (error) {
            console.error('Error parsing cookie:', error);
        }
    }
    res.render('tube/cl/history.ejs', { tracks: favorites });
});

module.exports = router;