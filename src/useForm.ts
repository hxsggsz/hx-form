import { useState } from "react";
import { IForm } from "./useForm.types";

/**
 *
 * @param defaultValues - the default values of the inputs that this hook wil handle
 * @param validation - a function that will validate the inputs and add message errors to you application
 * @param handleSubmit - a function that will run when you submit a form
 * @param schema - a zod schema for validations with zod
 */
export function useForm<T extends Record<string, string>>({
  defaultValues,
  validation,
  handleSubmit,
  schema,
}: IForm<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState(defaultValues);
  const [errors, setErrors] = useState<T | null>(null);

  function addValueToObject(
    object: Record<string, string>,
    key: string,
    value: string
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [mainKey, _] of Object.entries(object)) {
      if (mainKey === key) {
        object[mainKey] = value;
        return;
      }
    }
    object[key] = value;
  }

  const validationValues = (inputs: T) => {
    const errors = {} as unknown as T;

    const result = schema && schema.safeParse(inputs);
    if (result && !result.success) {
      result.error.issues.map((zodErrors) => {
        const errorKey = zodErrors.path[0].toString();
        const errorValue = zodErrors.message;

        addValueToObject(errors, errorKey, errorValue);
      });
    }

    validation && validation(inputs, errors);

    const checkErrors = Object.values(errors).some((error) => error.length > 0);
    const hasErrors = checkErrors ? errors : null;

    setErrors(hasErrors);
    return hasErrors;
  };

  return {
    errors,
    inputs,
    isLoading,
    handleChange: (ev: React.FormEvent<HTMLInputElement>) => {
      const value = ev.currentTarget.value ?? ev.currentTarget.checked;
      const name = ev.currentTarget.name;

      setInputs({
        ...inputs,
        [name]: value,
      });
    },

    onSubmit: (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      setIsLoading(true);
      const isErrors = validationValues(inputs);

      if (!isErrors) {
        handleSubmit(inputs, ev);
      }
      setIsLoading(false);
    },
  };
}
