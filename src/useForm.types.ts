import { z } from "zod";

export interface IForm<T extends Record<string, string>> {
  defaultValues: T;
  validation?: (inputs: T, errors: T) => void;
  handleSubmit: (inputs: T, ev: React.FormEvent<HTMLFormElement>) => void;
  schema?: z.Schema;
}
