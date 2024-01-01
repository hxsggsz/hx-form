import { z } from "zod";
import { useForm } from "../useForm";

function ZodExample() {
  const inputSchema = z.object({
    name: z.string().max(15),
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof inputSchema>>({
    defaultValues: {
      name: "",
      email: "",
    },
    handleSubmit: (inputs) => console.log(inputs),
    schema: inputSchema,
  });
  return (
    <form style={{ display: "flex", flexDirection: 'column', maxWidth: "30%", gap: '0.2rem' }} onSubmit={form.onSubmit}>
      <input onChange={form.handleChange} name="name" />
      {form.errors?.name && <span>{form.errors.name}</span>}

      <input onChange={form.handleChange} name="email" />
      {form.errors?.email && <span>{form.errors.email}</span>}

      <button type="submit">teste</button>
    </form>
  );
}

export default ZodExample;
