const path = require("path");
const test = require("ava");
const request = require("supertest");
const BASE_URL = "http://localhost:4231";
const { error, debug, success } = require("util-box");

test("GET /ping", async t => {
  const response = await request(BASE_URL).get("/ping");
  t.is(response.status, 200);
  t.is(response.body.message, "pong");
});

test("GET /proxy proxies registry response for specified package", async t => {
  const response = await request(BASE_URL)
    .get("/proxy/registry.npmjs.org/gulp/")
    .set("Origin", "x-requested-with");
  t.is(response.status, 200);
});

test("GET /proxy throws an error while trying to proxy other endpoints", async t => {
  const response = await request(BASE_URL)
    .get("/proxy/google.com")
    .set("Origin", "x-requested-with");
  t.is(response.status, 400);
});

test("GET /proxy throws an error when invalid (or) no headers are provided", async t => {
  const response = await request(BASE_URL).get(
    "/proxy/registry.npmjs.org/gulp/"
  );
  t.is(response.status, 400);
});
