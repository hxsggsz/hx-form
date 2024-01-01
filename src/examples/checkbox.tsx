import { useEffect } from "react"
import { useForm } from "../useForm"

function Checkbox() {
  const form = useForm({
    defaultValues: {
      checkbox: false
    },
    handleSubmit: () => { }
  })

  useEffect(() => {
    console.log(form.inputs.checkbox)
  }, [form.inputs.checkbox])
  return (
    <input type="checkbox" name="checkbox" onChange={form.handleChange} />
  )
}

export default Checkbox

