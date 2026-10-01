import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import { app } from "../index.js";
import { validateEnvironment } from "../src/config/env.js";

test("liveness endpoint responds without a database connection", async () => {
  const response = await request(app).get("/api/health/live");
  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { success: true, status: "live" });
  assert.equal(response.headers["x-powered-by"], undefined);
  assert.equal(response.headers["x-content-type-options"], "nosniff");
});

test("readiness endpoint reports unavailable until MongoDB is connected", async () => {
  const response = await request(app).get("/api/health/ready");
  assert.equal(response.status, 503);
  assert.equal(response.body.success, false);
});

test("coupon validation route is correctly spelled and protected", async () => {
  const response = await request(app)
    .post("/api/admin/coupons/validate")
    .send({ code: "TEST", amount: 100 });
  assert.equal(response.status, 401);
});

test("the former public refund endpoint is not exposed", async () => {
  const response = await request(app)
    .post("/api/payments/razorpay/refund")
    .send({ paymentReference: "507f1f77bcf86cd799439011" });
  assert.equal(response.status, 404);
});

test("unapproved browser origins are rejected", async () => {
  const response = await request(app)
    .get("/api/health/live")
    .set("Origin", "https://attacker.example");
  assert.equal(response.status, 403);
});

test("production environment validation rejects weak configuration", () => {
  const previous = {
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    CORS_ORIGINS: process.env.CORS_ORIGINS,
    PUBLIC_SERVER_URL: process.env.PUBLIC_SERVER_URL,
  };

  process.env.NODE_ENV = "production";
  process.env.JWT_SECRET = "too-short";
  process.env.CORS_ORIGINS = "";
  process.env.PUBLIC_SERVER_URL = "http://example.com";

  assert.throws(() => validateEnvironment(), /Invalid environment configuration/);

  for (const [key, value] of Object.entries(previous)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

