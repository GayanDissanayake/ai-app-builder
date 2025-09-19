import request from "supertest";
import express from "express";

const app = express();
app.get("/", (_req, res) => res.send("API Running"));

describe("GET /", () => {
  it("should return API Running", async () => {
    const res = await request(app).get("/");
    expect(res.text).toBe("API Running");
  });
});
