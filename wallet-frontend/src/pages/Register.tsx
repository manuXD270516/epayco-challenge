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

export default function Register() {
  const { form, handleChange, resetForm } = useForm({
    document: "",
    fullName: "",
    email: "",
    phone: ""
  });

  const [message, setMessage] = useState<{ type: "success" | "danger"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const { data }: { data: ApiResponse } = await api.post("/clients", form);

      if (data.code === "SUCCESS") {
        setMessage({ type: "success", text: data.message });
        resetForm();
      } else {
        setMessage({ type: "danger", text: data.message });
      }

    } catch (err: any) {
      const fallback = err?.response?.data?.message || "Error de conexión o servidor.";
      setMessage({ type: "danger", text: fallback });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 80px)" }}>
        <div className="form-container">
          <h2 className="text-center mb-4">Registro de Cliente</h2>
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
            <InputField name="document" value={form.document} onChange={handleChange} placeholder="Documento" />
            <InputField name="fullName" value={form.fullName} onChange={handleChange} placeholder="Nombre completo" />
            <InputField name="email" value={form.email} onChange={handleChange} placeholder="Email" />
            <InputField name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" />

            <button type="submit" className="btn btn-dark w-100">Registrar</button>

            {message && <AlertMessage type={message.type} message={message.text} />}
          </form>
        </div>
      </div>
    </>
  );
}
