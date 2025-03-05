import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("game/home");
});

router.get("/games/:id", async (req, res) => {
  const Id = req.params.id;
  res.render(`game/games/${Id}`);
});

export default router;