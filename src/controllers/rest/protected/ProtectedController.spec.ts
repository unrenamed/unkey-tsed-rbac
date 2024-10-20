import { expect, describe, it, beforeEach, afterEach } from "vitest";
import { PlatformTest } from "@tsed/common";
import { ProtectedController } from "./ProtectedController";

describe("ProtectedController", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<ProtectedController>(ProtectedController);
    expect(instance).toBeInstanceOf(ProtectedController);
  });
});
