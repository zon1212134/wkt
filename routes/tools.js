import express from "express";
import invController from "../controllers/tool/src/inv.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("tools/home");
});

router.get("/tool/:id", (req, res) => {
  res.render(`tools/tool/${req.params.id}`);
});

router.use("/inv", invController);

export default router;