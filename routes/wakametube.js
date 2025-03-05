import express from "express";
import ytsr from "ytsr";
import getVideo from "../controllers/tube/getvideo.js";
import backController from "../controllers/tube/back.js";
import trendController from "../controllers/tube/trend.js";

const router = express.Router();
const limit = process.env.LIMIT || 50;

router.use("/watch", getVideo);
router.use("/w", getVideo);

router.get("/", (req, res) => {
  res.render("tube/home");
});

router.get("/s", async (req, res) => {
  let query = req.query.q;
  let page = Number(req.query.p || 2);
  try {
    res.render("tube/search.ejs", {
      res: await ytsr(query, { limit, pages: page }),
      query: query,
      page
    });
  } catch (error) {
    console.error(error);
    try {
      res.status(500).render("error.ejs", {
        title: "ytsr Error",
        content: error
      });
    } catch (error) {
      console.error(error);
    }
  }
});

router.use("/back", backController);
router.use("/trend", trendController);

export default router;