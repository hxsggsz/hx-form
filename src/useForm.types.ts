import { z } from "zod";

export type FormInputTypes = string | number | boolean;

export interface IForm<T extends Record<string, FormInputTypes>> {
  defaultValues: T;
  validation?: (inputs: T, errors: Record<keyof T, string>) => void;
  handleSubmit: (inputs: T, ev: React.FormEvent<HTMLFormElement>) => void;
  schema?: z.Schema;
}
