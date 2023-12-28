import { addValueToObject } from "../utils/addValueToObject";

describe("addValueToObject()", () => {
  beforeEach(() => {});
  describe("when pass a value to an existing key", () => {
    it("adds the value to object correctly", () => {
      const test = {
        testKey: "testValue",
      };
      addValueToObject(test, "testKey", "new value");

      expect(test.testKey).toBe("new value");
      expect(test.testKey).not.toBe("testValue");
    });
  });

  describe("when pass a value to a key that not exists", () => {
    it("creates a new key and add the value", () => {
      const test = {
        testKey: "testValue",
      };
      addValueToObject(test, "notExistsKey", "test");
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      expect(test.notExistsKey).toBe("test");
    });
  });
});
