("use strict");
const path = require("path");
const router = require("express").Router();
const httpProxy = require("../proxy");
const { error, debug, success } = require("util-box");
const INVALID_REGISTRY_ERROR = "Invalid Registry Endpoint";

module.exports = () => {
  /**
   * This is used internally to validate if the request parameters point to the right registry endpoint.
   * Return an Error if any other urls are provided
   */
  _validateParams = (params, callback) => {
    let paramsLen = Object.keys(params).length;
    if (paramsLen > 1 && !/registry\.npmjs\.org/.test(`${params[1]}`))
      callback(new Error(INVALID_REGISTRY_ERROR));
    else if (!/registry\.npmjs\.org/.test(`${params[0]}`))
      callback(new Error(INVALID_REGISTRY_ERROR));
    else callback(null, params);
  };

  router.get("/", (req, res, next) => {
    res.status(200).send("Welcome to npm registry proxy! 🌎");
  });

  /**
   * proxy endpoint for registry.npmjs.org
   * Usage : GET /proxy/registry.npmjs.org/<package-name>
   */
  router.get("/proxy/*", (req, res, next) => {
    _validateParams(req.params, (err, params) => {
      if (!err) {
        req.params = params;
        // Strip '/proxy' from the front of the URL, else the proxy won't work.
        req.url = req.url.replace("/proxy/", "/");
        debug("Input request url and params: ", req.url, req.params);
        httpProxy.emit("request", req, res);
      } else {
        error("Unexpected Error occured during GET /proxy - ERROR: ", err.message);
        res.status(400).send("Unexpected Server Error (Code: INVALID_REGISTRY)}");
      }
    });
  });

  router.get("/ping", (req, res, next) => {
    res.status(200).json({ message: "pong" });
  });

  return router;
};
