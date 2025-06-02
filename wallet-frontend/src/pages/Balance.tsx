import { useState } from 'react';
import { api } from '../api/axiosInstance';

export default function Balance() {
  const [form, setForm] = useState({ document: '', phone: '' });
  const [balance, setBalance] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.post('/wallet/balance', form);
    setBalance(res.data.data.balance);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Consultar Saldo</h2>
      <input name="document" placeholder="Documento" onChange={handleChange} required />
      <input name="phone" placeholder="Teléfono" onChange={handleChange} required />
      <button type="submit">Consultar</button>
      {balance !== null && <p>Saldo actual: ${balance}</p>}
    </form>
  );
}
