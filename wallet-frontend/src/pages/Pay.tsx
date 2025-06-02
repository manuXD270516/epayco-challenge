import { useState } from 'react';
import { api } from '../api/axiosInstance';

export default function Pay() {
  const [form, setForm] = useState({ document: '', phone: '', amount: 0 });
  const [sessionId, setSessionId] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.post('/wallet/pay', { ...form, amount: Number(form.amount) });
    setMessage(res.data.message);
    setSessionId(res.data.sessionId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Pago</h2>
      <input name="document" placeholder="Documento" onChange={handleChange} required />
      <input name="phone" placeholder="Teléfono" onChange={handleChange} required />
      <input name="amount" type="number" placeholder="Monto" onChange={handleChange} required />
      <button type="submit">Generar Token</button>
      <p>{message}</p>
      {sessionId && <p>sessionId: {sessionId}</p>}
    </form>
  );
}
