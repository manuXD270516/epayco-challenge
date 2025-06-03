import { useState } from "react";

export function useForm<T>(initialState: T) {
  const [form, setForm] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => setForm(initialState);

  return { form, handleChange, resetForm };
}
