import { useState } from "react";
import { api } from "../api/axiosInstance";
import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import AlertMessage from "../components/AlertMessage";
import { useForm } from "../hooks/useForm";

interface BalanceResponse {
  code: string;
  message: string;
  data?: { balance: number };
}

export default function Balance() {
  const { form, handleChange, resetForm } = useForm({
    document: "",
    phone: ""
  });

  const [message, setMessage] = useState<{ type: "success" | "danger"; text: string } | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBalance(null);
    setMessage(null);
    try {
      const { data }: { data: BalanceResponse } = await api.post("/wallet/balance", form);

      if (data.code === "SUCCESS" && data.data?.balance !== undefined) {
        setBalance(data.data.balance);
        setMessage({ type: "success", text: data.message });
      } else {
        setMessage({ type: "danger", text: data.message });
      }
    } catch (err: any) {
      const fallback = err?.response?.data?.message || "Error al consultar saldo.";
      setMessage({ type: "danger", text: fallback });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 80px)" }}>
        <div className="form-container">
          <h2 className="text-center mb-4">Consultar Saldo</h2>
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
            <InputField name="document" value={form.document} onChange={handleChange} placeholder="Documento" />
            <InputField name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" />
            <button className="btn btn-dark w-100">Consultar</button>

            {message && <AlertMessage type={message.type} message={message.text} />}
            {balance !== null && (
              <div className="alert alert-info mt-3 text-center">
                <strong>Saldo disponible:</strong> {balance}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
