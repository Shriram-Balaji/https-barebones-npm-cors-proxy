const path = require("path");
const corsProxy = require("cors-anywhere");

const proxy = corsProxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ["origin", "x-requested-with"], // mandate headers, throws 400 without them
  removeHeaders: ["cookie", "cookie2"],
  helpFile: "helpText.txt" // alternate helpText file
});

module.exports = proxy;
