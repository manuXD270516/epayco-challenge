import { useState } from 'react';
import { api } from '../api/axiosInstance';

export default function Register() {
  const [form, setForm] = useState({ document: '', fullName: '', email: '', phone: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.post('/clients', form);
    setMessage(res.data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro de Cliente</h2>
      <input name="document" placeholder="Documento" onChange={handleChange} required />
      <input name="fullName" placeholder="Nombre completo" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="phone" placeholder="Teléfono" onChange={handleChange} required />
      <button type="submit">Registrar</button>
      <p>{message}</p>
    </form>
  );
}
