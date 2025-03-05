"use strict";

if (!process.env.NO_CLUSTERS && cluster.isPrimary) {
  const numClusters = process.env.CLUSTERS || (os.availableParallelism ? os.availableParallelism() : (os.cpus().length || 2))

  console.log(`Primary ${process.pid} is running. Will fork ${numClusters} clusters.`);

  // Fork workers.
  for (let i = 0; i < numClusters; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking another one....`);
    cluster.fork();
  });
  
  return true;
}

import express from "express";
import cluster from "cluster";
import os from "os";
import compression from "compression";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import toolsRouter from "./routes/tools.js";
import blogRouter from "./routes/blog.js";
import wktRouter from "./routes/wakametube.js";
import gameRouter from "./routes/game.js";
import sandboxRouter from "./routes/sandbox.js";

import YouTubeJS from "youtubei.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const numClusters = os.cpus().length;



  const app = express();

  app.use(compression());
  app.use(express.static(path.join(__dirname, "public")));
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.set("trust proxy", 1);
  
  let client;

  app.get("/", (req, res) => {
    res.render("home/index");
  });

  app.get("/app", (req, res) => {
    res.render("app/list");
  });

  app.use("/tools", toolsRouter);
  app.use("/blog", blogRouter);
  app.use("/wkt", wktRouter);
  app.use("/game", gameRouter);

  app.get("/watch", (req, res) => {
    const videoId = req.query.v;
    res.redirect(videoId ? `/wkt/watch/${videoId}` : "/wkt/trend");
  });
  app.get("/channel/:id", (req, res) => {
    res.redirect(`/wkt/c/${req.params.id}`);
  });
  app.get("/channel/:id/join", (req, res) => {
    res.redirect(`/wkt/c/${req.params.id}`);
  });
  app.get("/hashtag/:des", (req, res) => {
    res.redirect(`/wkt/s?q=${req.params.des}`);
  });
  app.use("/sandbox", sandboxRouter);
  
async function initInnerTube() {
  try {
    client = await YouTubeJS.Innertube.create({ location: process.env.GEOLOCATION || "US", cache: new YouTubeJS.UniversalCache(true, process.env.CACHE_DIR || "./.cache") });

    const listener = app.listen(process.env.PORT || 3000, () => {
      console.log(process.pid, "-- Ready. ytmous is now listening on port", listener.address().port);
    });
  } catch (e) {
    console.error(process.pid, "--- Failed to initialize InnerTube. Trying again in 10 seconds....");
    console.error(e);

    setTimeout(initInnerTube, 10000);
  };
};

// Handle any unhandled promise rejection.
process.on("unhandledRejection", console.error);

initInnerTube();