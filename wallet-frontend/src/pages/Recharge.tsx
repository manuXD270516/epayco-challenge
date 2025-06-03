import { useState } from "react";
import { api } from "../api/axiosInstance";
import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import AlertMessage from "../components/AlertMessage";
import { useForm } from "../hooks/useForm";

interface ApiResponse {
  code: string;
  message: string;
}

export default function Recharge() {
  const { form, handleChange, resetForm } = useForm({
    document: "",
    phone: "",
    amount: ""
  });

  const [message, setMessage] = useState<{ type: "success" | "danger"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const { data }: { data: ApiResponse } = await api.post("/wallet/recharge", form);

      if (data.code === "SUCCESS") {
        setMessage({ type: "success", text: data.message });
        resetForm();
      } else {
        setMessage({ type: "danger", text: data.message });
      }
    } catch (err: any) {
      const fallback = err?.response?.data?.message || "Error en la recarga.";
      setMessage({ type: "danger", text: fallback });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 80px)" }}>
        <div className="form-container">
          <h2 className="text-center mb-4">Recargar Billetera</h2>
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
            <InputField name="document" value={form.document} onChange={handleChange} placeholder="Documento" />
            <InputField name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" />
            <InputField name="amount" value={form.amount} onChange={handleChange} placeholder="Monto" />
            <button type="submit" className="btn btn-dark w-100">Recargar</button>
            {message && <AlertMessage type={message.type} message={message.text} />}
          </form>
        </div>
      </div>
    </>
  );
}
