const host = process.env.HOST || "0.0.0.0";
// Listen on a specific port via the PORT environment constiable
const port = process.env.PORT || 4231;

const corsProxy = require("cors-anywhere");
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
