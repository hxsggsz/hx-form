import { useState } from "react";
import { IForm } from "./useForm.types";
import { zodValidation } from "./utils/zodValidation";

/**
 * @param defaultValues - the default values of the inputs that this hook will handle
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputs, setInputs] = useState(defaultValues);
  const [errors, setErrors] = useState<T | null>(null);

  const validationValues = (inputs: T) => {
    const errors = {} as unknown as T;

    schema && zodValidation(schema, inputs, errors);

    validation && validation(inputs, errors);

    const checkErrors = Object.values(errors).some((error) => error.length > 0);
    const hasErrors = checkErrors ? errors : null;

    setErrors(hasErrors);
    return hasErrors;
  };

  return {
    errors,
    inputs,
    isSubmitting,
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
      setIsSubmitting(true);
      const isErrors = validationValues(inputs);

      if (!isErrors) {
        handleSubmit(inputs, ev);
      }
      setIsSubmitting(false);
    },
  };
}
