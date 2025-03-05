const axios = require("axios");
const express = require("express");
const router = express.Router();
const path = require("path");

router.get('/history', (req, res) => {
    res.render('tube/cl/history.ejs');
});

module.exports = router;