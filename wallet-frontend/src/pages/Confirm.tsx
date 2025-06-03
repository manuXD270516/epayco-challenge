import { useState } from "react";
import { api } from "../api/axiosInstance";
import Navbar from "../components/Navbar";

export default function Confirm() {
  const [form, setForm] = useState({ sessionId: "", token: "" });
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    try {
      await api.post("/wallet/confirm", form);
      setMessage({ type: "success", text: "Pago confirmado correctamente." });
      setForm({ sessionId: "", token: "" });
    } catch (err: any) {
      setMessage({ type: "danger", text: err?.response?.data?.message || "Error al confirmar pago." });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 80px)" }}>
        <div className="form-container">
          <h2 className="text-center mb-4">Confirmar Pago</h2>
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
            <input className="form-control mb-3" name="sessionId" value={form.sessionId} onChange={handleChange} placeholder="Session ID" required />
            <input className="form-control mb-3" name="token" value={form.token} onChange={handleChange} placeholder="Token (6 dígitos)" required />
            <button className="btn btn-dark w-100">Confirmar</button>
            {message.text && <div className={`alert alert-${message.type} mt-3`}>{message.text}</div>}
          </form>
        </div>
      </div>
    </>
  );
}
