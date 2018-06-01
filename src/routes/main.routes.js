("use strict");
const path = require("path");
const router = require("express").Router();
const httpProxy = require("../proxy");
const { error, debug, success } = require("util-box");
const INVALID_REGISTRY_ERROR = "Invalid Registry Endpoint";
module.exports = () => {
  _validateParams = (params, callback) => {
    let paramsLen = Object.keys(params).length;
    console.log(!/registry\.npmjs\.org/.test(`${params[0]}`));
    if (paramsLen > 1) {
      success("more than one request parameter", params);
      if (!/registry\.npmjs\.org/.test(`${params[1]}`)) {
        callback(new Error(INVALID_REGISTRY_ERROR));
      }
    } else if (!/registry\.npmjs\.org/.test(`${params[0]}`))
      callback(new Error(INVALID_REGISTRY_ERROR));
    else {
      callback(null, params);
    }
  };

  router.get("/", (req, res, next) => {
    res.status(200).send("Welcome to npm registry proxy! 🌎");
  });

  router.get("/proxy/*", (req, res, next) => {
    _validateParams(req.params, (err, params) => {
      if (!err) {
        req.params = params;
        req.url = req.url.replace("/proxy/", "/"); // Strip '/proxy' from the front of the URL, else the proxy won't work.
        httpProxy.emit("request", req, res);
      } else {
        res.status(400).send(`Unexpected Server Error: ${err.message}`);
      }
    });
  });

  router.get("/ping", (req, res, next) => {
    res.status(200).json({ message: "pong" });
  });

  return router;
};
