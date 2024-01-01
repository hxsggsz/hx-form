import { z } from "zod";

export interface IForm<T extends Record<string, string | number | boolean>> {
  defaultValues: T;
  validation?: (inputs: T, errors: Record<keyof T, string>) => void;
  handleSubmit: (inputs: T, ev: React.FormEvent<HTMLFormElement>) => void;
  schema?: z.Schema;
}
