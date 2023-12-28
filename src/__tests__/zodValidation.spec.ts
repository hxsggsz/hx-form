import { z } from "zod";
import { zodValidation } from "../utils/zodValidation";

describe("zodValidation()", () => {
  describe("when breaks a zod schema", () => {
    it("adds the error message to object correctly", () => {
      const schema = z.object({
        test: z.string().max(5, "my custom message error"),
      });

      const inputs = {
        test: "fail schema value",
      };

      const errors = {
        test: "",
      };

      zodValidation(schema, inputs, errors);

      expect(errors.test).not.toBe("");
      expect(errors.test).toBe("my custom message error");
    });
  });

  describe("when input need to be number", () => {
    it("adds the errors message when input is a string", () => {
      const schema = z.object({
        numberField: z.number(),
      });

      const inputs = {
        numberField: "pass",
      };

      const errors = {
        numberField: "",
      };

      zodValidation(schema, inputs, errors);

      expect(errors.numberField).not.toBe("");
      expect(errors.numberField).toBe("Expected number, received string");
    });
  });

  describe("when not breaks the zod schema", () => {
    it("keeps the errors object empty", () => {
      const schema = z.object({
        test: z.string().max(5, "my custom message error"),
      });

      const inputs = {
        test: "pass",
      };

      const errors = {
        test: "",
      };

      zodValidation(schema, inputs, errors);

      expect(errors.test).toBe("");
      expect(errors.test).not.toBe("my custom message error");
    });
  });
});
