import { expect, describe, it, afterAll, beforeAll } from "vitest";
import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { PublicController } from "./PublicController";
import { Server } from "../../../Server";

describe("PublicController", () => {
  beforeAll(
    PlatformTest.bootstrap(Server, {
      mount: {
        "/": [PublicController],
      },
    })
  );
  afterAll(PlatformTest.reset);

  it("should call GET /rest/public", async () => {
    const request = SuperTest(PlatformTest.callback());
    const response = await request.get("/rest/public").expect(200);
    expect(response.text).toEqual(
      "Hello, Guest! This route is open for everyone."
    );
  });
});
