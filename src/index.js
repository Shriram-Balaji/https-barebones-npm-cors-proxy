("use strict");
const path = require("path");
const express = require("express");
const logger = require("morgan");
const port = process.env.PORT || 4231;
const HOMEDIR = path.join(__dirname, ".");
const routes = require(path.join(HOMEDIR, "routes", "main.routes"));
const app = express();
const Server = require("./server");

app.set("port", port);
app.use(logger("combined"));
app.use("/", routes());

// start Server
Server.initialize(app);

module.exports = app;
