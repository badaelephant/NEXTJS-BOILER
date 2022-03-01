/**
 * CONFIGURATION
 *
 * **/

const env = process.env.NODE_ENV || "local";
console.log("env", process.env.NODE_ENV);
if (env === "production") {
  require("dotenv").config({ path: "./.env.production" });
} else if (env === "dev") {
  require("dotenv").config({ path: "./.env.dev" });
} else {
  require("dotenv").config({ path: "./.env.local" });
}

// server.js
const { parse } = require("url");
// const socketLib = require('./lib/socket.lib')
const next = require("next");
// const socketIO = require('socket.io')
const fs = require("fs");
const express = require("express");
const express_server = express();
const cors = require("cors");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const http = require("http");

const http_port = process.env.HTTP_PORT || 3000;
const apiRouter = require("./middleware/route");

app.prepare().then(() => {
  console.log(` NODE_ENV = ${process.env.NODE_ENV}`);
  express_server.use("/api", apiRouter);
  express_server.all("*", cors());
  express_server.all("*", (req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.

    const parsedUrl = parse(req.url, true);

    handle(req, res, parsedUrl);
  });

  const http_server = http
    .createServer(express_server)
    .listen(http_port, (err) => {
      if (err) throw err;
      console.log("> Ready on http:" + http_port);
    });
});
