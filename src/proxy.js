const path = require("path");
const HOMEDIR = path.join(__dirname, "..");
const { error, debug, success } = require("util-box");
const corsProxy = require("cors-anywhere");

const proxy = corsProxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ["origin", "x-requested-with"],
  removeHeaders: ["cookie", "cookie2"],
  helpFile: "helpText.txt"
});

module.exports = proxy;
