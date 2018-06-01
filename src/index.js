const express = require("express");
const corsProxy = require("cors-anywhere");
const app = express();

const host = process.env.HOST || "0.0.0.0";
// Listen on a specific port via the PORT environment constiable
const port = process.env.PORT || 4231;

app.get("/ping", (req, res, next) => {
  res.status(200).json({ message: "pong" });
});

corsProxy
  .createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ["origin", "x-requested-with"],
    removeHeaders: ["cookie", "cookie2"],
    helpFile: "helpText.txt"
  })
  .listen(port, host, function(req) {
    console.log("Running CORS Anywhere on " + host + ":" + port);
  });
