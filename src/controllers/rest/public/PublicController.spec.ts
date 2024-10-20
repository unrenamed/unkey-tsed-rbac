import { expect, describe, it, beforeEach, afterEach } from "vitest";
import { PlatformTest } from "@tsed/common";
import { PublicController } from "./PublicController";

describe("PublicController", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<PublicController>(PublicController);
    expect(instance).toBeInstanceOf(PublicController);
  });
});
