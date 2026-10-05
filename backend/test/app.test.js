import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import { app } from "../index.js";
import { validateEnvironment } from "../src/config/env.js";
import Coupon from "../src/models/coupons.js";
import User from "../src/models/user.js";
import Medicine from "../src/models/medicine.js";

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

test("customer coupon discovery endpoint is protected", async () => {
  const response = await request(app).get("/api/coupons");
  assert.equal(response.status, 401);
});

test("coupon schema uses the fields enforced by checkout", () => {
  assert.ok(Coupon.schema.path("minOrder"));
  assert.ok(Coupon.schema.path("maxUsagePerUser"));
  assert.ok(Coupon.schema.path("expiryDate"));
});

test("new records do not receive fabricated ratings or package details", () => {
  const account = new User({ name: "Schema check", password: "not-a-real-password" });
  const medicine = new Medicine({ name: "Schema check", ownerId: "507f1f77bcf86cd799439011", ownerRole: "shopkeeper", expiry: new Date("2030-01-01") });
  assert.equal(account.rating, 0);
  assert.equal(account.reviewsCount, 0);
  assert.equal(medicine.packSize, null);
  assert.equal(medicine.packType, "");
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
