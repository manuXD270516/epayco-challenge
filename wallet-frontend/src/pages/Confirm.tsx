import { useState } from 'react';
import { api } from '../api/axiosInstance';

export default function Confirm() {
  const [form, setForm] = useState({ sessionId: '', token: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.post('/wallet/confirm', form);
    setMessage(res.data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Confirmar Pago</h2>
      <input name="sessionId" placeholder="Session ID" onChange={handleChange} required />
      <input name="token" placeholder="Token (6 dígitos)" onChange={handleChange} required />
      <button type="submit">Confirmar</button>
      <p>{message}</p>
    </form>
  );
}
