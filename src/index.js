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

// const express = require("express");
// const corsProxy = require("cors-anywhere");
// const app = express();

// const host = process.env.HOST || "0.0.0.0";
// // Listen on a specific port via the PORT environment constiable
// const port = process.env.PORT || 4231;

// app.get("/ping", (req, res, next) => {
//   res.status(200).json({ message: "pong" });
// });

// app.get("/proxy", req, res, next) => {
//   corsProxy
//   .createServer({
//     originWhitelist: [], // Allow all origins
//     requireHeader: ["origin", "x-requested-with"],
//     removeHeaders: ["cookie", "cookie2"],
//     helpFile: "helpText.txt"
//   })
//   .listen(port, host, function(req) {
//     console.log("Running CORS Anywhere on " + host + ":" + port);
//   });
// }
