var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
import http from "http";
var mongoose = require("mongoose");
require("custom-env").env(process.env.NODE_ENV);
require("dotenv").config();
import index from "./routes/index";
import { initBaseData } from "./seeds/seeds";
import { initScanEmailQueueJob } from "./jobs/email-queue.job";

import { logger as appLogger } from "./helpers/logger";

var app = express();
const server = http.createServer(app);
const port = process.env.PORT || 7001;

global.ROOT_DIR = path.resolve(__dirname, "../");
console.log(global.ROOT_DIR);

mongoose.connect(process.env.DB_URL, {useMongoClient:true, useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "---FAILED to connect to mongoose"));
db.once('open', function() {
  initBaseData();
  console.log("+++Connected to mongoose");
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.use(function(req, res, next) {
  // allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // request methods allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Headers", "contentType, Content-Type, *");
  next();
});

const router = express.Router();
index(router);
app.use("/api/v1", router);

app.use(function(req, res, next) {
  var err = new Error("route is not found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  appLogger.error(err);
  res.json({ error: err.message });
});

// init cron job
initScanEmailQueueJob.start();

server.listen(port, async () => {
  console.log("Server is running port " + port);
});
