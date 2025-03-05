import express from "express";
import path from "path";
import getBlog from "../controllers/blog/getblog.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("tools/home");
});

router.use("/n", getBlog);

export default router;