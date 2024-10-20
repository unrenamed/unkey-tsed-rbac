import { expect, describe, it, afterAll, beforeAll } from "vitest";
import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { ProtectedController } from "./ProtectedController";
import { Server } from "../../../Server";

describe("ProtectedController", () => {
  beforeAll(
    PlatformTest.bootstrap(Server, {
      mount: {
        "/": [ProtectedController],
      },
    })
  );
  afterAll(PlatformTest.reset);

  describe("GET /rest/protected", async () => {
    it("should return 401 when auth header is missing", async () => {
      const request = SuperTest(PlatformTest.callback());
      const response = await request.get("/rest/protected").expect(401);
      expect(response.body).toEqual({
        name: "UNAUTHORIZED",
        message: "Unauthorized",
        status: 401,
        errors: [],
      });
    });

    it("should return 403 when token is invalid", async () => {
      const request = SuperTest(PlatformTest.callback());
      const response = await request
        .get("/rest/protected")
        .set("Authorization", `Bearer invalid_token`)
        .expect(403);

      expect(response.body).toEqual({
        name: "FORBIDDEN",
        message:
          "The token is either invalid, expired, or lacks sufficient permissions.",
        status: 403,
        errors: [],
      });
    });

    it("should contain success response", async () => {
      const request = SuperTest(PlatformTest.callback());
      const response = await request
        .get("/rest/protected")
        .set("Authorization", `Bearer ${process.env.UNKEY_AUTH_KEY}`)
        .expect(200);

      expect(response.text).toContain("Hi, Anonymous!");
      expect(response.text).toContain("You've accessed the protected area.");
    });
  });

  describe("POST /rest/protected", async () => {
    it("should return 401 when auth header is missing", async () => {
      const request = SuperTest(PlatformTest.callback());
      const response = await request.post("/rest/protected").expect(401);
      expect(response.body).toEqual({
        name: "UNAUTHORIZED",
        message: "Unauthorized",
        status: 401,
        errors: [],
      });
    });

    it("should return 403 when token is invalid", async () => {
      const request = SuperTest(PlatformTest.callback());
      const response = await request
        .post("/rest/protected")
        .set("Authorization", `Bearer invalid_token`)
        .expect(403);

      expect(response.body).toEqual({
        name: "FORBIDDEN",
        message:
          "The token is either invalid, expired, or lacks sufficient permissions.",
        status: 403,
        errors: [],
      });
    });

    it("should contain success response", async () => {
      const request = SuperTest(PlatformTest.callback());
      const response = await request
        .post("/rest/protected")
        .set("Authorization", `Bearer ${process.env.UNKEY_AUTH_KEY}`)
        .expect(200);

      expect(response.text).toContain("Hi, Anonymous!");
      expect(response.text).toContain("You can now modify data.");
    });
  });

  describe("DELETE /rest/protected", async () => {
    it("should return 401 when auth header is missing", async () => {
      const request = SuperTest(PlatformTest.callback());
      const response = await request.delete("/rest/protected").expect(401);
      expect(response.body).toEqual({
        name: "UNAUTHORIZED",
        message: "Unauthorized",
        status: 401,
        errors: [],
      });
    });

    it("should return 403 when token is invalid", async () => {
      const request = SuperTest(PlatformTest.callback());
      const response = await request
        .delete("/rest/protected")
        .set("Authorization", `Bearer invalid_token`)
        .expect(403);

      expect(response.body).toEqual({
        name: "FORBIDDEN",
        message:
          "The token is either invalid, expired, or lacks sufficient permissions.",
        status: 403,
        errors: [],
      });
    });

    it("should contain success response", async () => {
      const request = SuperTest(PlatformTest.callback());
      const response = await request
        .delete("/rest/protected")
        .set("Authorization", `Bearer ${process.env.UNKEY_AUTH_KEY}`)
        .expect(200);

      expect(response.text).toContain("Hi, Anonymous!");
      expect(response.text).toContain("You can delete data.");
    });
  });
});
