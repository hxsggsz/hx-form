import { useState } from "react";
import { FormInputTypes, IForm } from "./useForm.types";
import { zodValidation } from "./utils/zodValidation";

/**
 * @param defaultValues - the default values of the inputs that this hook will handle
 * @param validation - a function that will validate the inputs and add message errors to you application
 * @param handleSubmit - a function that will run when you submit a form
 * @param schema - a zod schema for validations with zod
 */
export function useForm<T extends Record<string, FormInputTypes>>({
  defaultValues,
  validation,
  handleSubmit,
  schema,
}: IForm<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputs, setInputs] = useState(defaultValues);
  const [errors, setErrors] = useState<Record<keyof T, string> | null>(null);

  const validationValues = (inputs: T) => {
    const errors = {} as unknown as Record<keyof T, string>;

    schema && zodValidation(schema, inputs, errors);

    validation && validation(inputs, errors);

    const checkErrors = Object.values(errors).some((error) => error.length > 0);
    const hasErrors = checkErrors ? errors : null;

    setErrors(hasErrors);
    return hasErrors;
  };

  //TODO: add tests when input is boolean and number
  return {
    errors,
    inputs,
    isSubmitting,
    handleChange: (ev: React.FormEvent<HTMLInputElement>) => {
      const name = ev.currentTarget.name;
      const value =
        typeof inputs[name] === "string" || typeof inputs[name] === "number"
          ? ev.currentTarget.value
          : ev.currentTarget.checked;

      setInputs({
        ...inputs,
        [name]: typeof inputs[name] === "number" ? Number(value) : value,
      });
    },

    onSubmit: (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      setIsSubmitting(true);
      const isErrors = validationValues(inputs);

      if (!isErrors) {
        handleSubmit(inputs, ev);
      }
      setIsSubmitting(false);
    },
  };
}
