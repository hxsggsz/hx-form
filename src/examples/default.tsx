import { useForm } from "../useForm";

function Default() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    validation: (inputs, errors) => {
      if (inputs.name.length <= 15) {
        errors.name = "name is too long!";
      }

      if (!inputs.email.includes('@')) {
        errors.email = "email is not valid!";
      }
    },
    handleSubmit: (inputs) => console.log(inputs),
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

export default Default;
