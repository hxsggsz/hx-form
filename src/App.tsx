import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { z } from "zod";

export interface IForm<T extends Record<string, string>> {
  defaultValues: T;
  validation?: (inputs: T, errors: T) => void;
  handleSubmit: (inputs: T, ev: React.FormEvent<HTMLFormElement>) => void;
  schema: z.Schema;
}

export function useForm<T extends Record<string, string>>({
  defaultValues,
  validation,
  handleSubmit,
  schema,
}: IForm<T>) {
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

    const result = schema.safeParse(inputs);
    if (!result.success) {
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
      const isErrors = validationValues(inputs);

      if (!isErrors) {
        handleSubmit(inputs, ev);
      }
    },
  };
}

function App() {
  const schema = z.object({
    teste: z.string().max(3, "teste validaçao zod"),
    teste2: z.string().max(3, "teste validaçao zod multiplos inputs"),
  });
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      teste: "",
      teste2: "",
    },
    validation: (inputs, errors) => {
      if (inputs.teste.includes("1")) {
        errors.teste = "teste validaçao padrao";
      }
    },
    handleSubmit: (inputs) => console.log(inputs),
    schema,
  });

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <form onSubmit={form.onSubmit} className="card">
        <input
          value={form.inputs.teste}
          onChange={form.handleChange}
          name="teste"
        />
        {form.errors?.teste && <span>{form.errors.teste}</span>}
        <input
          value={form.inputs.teste2}
          onChange={form.handleChange}
          name="teste2"
        />
        {form.errors?.teste2 && <span>{form.errors.teste2}</span>}
        <button type="submit">teste</button>
      </form>
    </>
  );
}

export default App;
