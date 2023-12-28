import { z } from "zod";
import { addValueToObject } from "./addValueToObject";

export function zodValidation(
  schema: z.Schema,
  inputs: Record<string, string>,
  errors: Record<string, string>
) {
  const result = schema && schema.safeParse(inputs);
  if (result && !result.success) {
    result.error.issues.map((zodErrors) => {
      const errorKey = zodErrors.path[0].toString();
      const errorValue = zodErrors.message;

      addValueToObject(errors, errorKey, errorValue);
    });
  }
}
