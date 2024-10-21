import { expect, describe, it, beforeAll, afterAll } from "vitest";
import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { Server } from "./Server";

describe("Server", () => {
  beforeAll(PlatformTest.bootstrap(Server));
  afterAll(PlatformTest.reset);

  it("should call GET /rest", async () => {
     const request = SuperTest(PlatformTest.callback());
     const response = await request.get("/rest").expect(404);

     expect(response.body).toEqual({
       errors: [],
       message: 'Resource "/rest" not found',
       name: "NOT_FOUND",
       status: 404,
     });
  });
});
