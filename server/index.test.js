const request = require("supertest");
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("API Running"));

test("GET / should return API Running", async () => {
  const res = await request(app).get("/");
  expect(res.text).toBe("API Running");
});
