import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { z } from "zod";
import { useForm } from "./useForm";

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
        <input onChange={form.handleChange} name="teste" />
        {form.errors?.teste && <span>{form.errors.teste}</span>}
        <input onChange={form.handleChange} name="teste2" />
        {form.errors?.teste2 && <span>{form.errors.teste2}</span>}
        <button type="submit">teste</button>
      </form>
    </>
  );
}

export default App;
