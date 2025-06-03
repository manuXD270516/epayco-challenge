import { useState, useEffect } from "react";
import { api } from "../api/axiosInstance";
import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import AlertMessage from "../components/AlertMessage";
import { useForm } from "../hooks/useForm";

export default function Pay() {
  const { form, handleChange, resetForm } = useForm({
    document: "",
    phone: "",
    amount: ""
  });

  const [message, setMessage] = useState<{ type: "success" | "danger"; text: string } | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showTokenTooltip, setShowTokenTooltip] = useState(false);
  const [timer, setTimer] = useState(300);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (showTokenTooltip && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowTokenTooltip(false);
      setToken(null);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showTokenTooltip, timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setToken(null);
    setSessionId(null);
    setShowTokenTooltip(false);
    setTimer(300);

    try {
      const { data } = await api.post("/wallet/pay", form);

      if (data.code === "SUCCESS" && data.sessionId && data.token) {
        setSessionId(data.sessionId);
        setToken(data.token);
        setShowTokenTooltip(true);
        setMessage({ type: "success", text: data.message });
        resetForm();
      } else {
        setMessage({ type: "danger", text: data.message });
      }
    } catch (err: any) {
      const fallback = err?.response?.data?.message || "Error al generar token.";
      setMessage({ type: "danger", text: fallback });
    }
  };

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  const handleCopy = async (text: string, label: "token" | "session") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("No se pudo copiar al portapapeles.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 80px)" }}>
        <div className="form-container">
          <h2 className="text-center mb-4">Iniciar Pago</h2>
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
            <InputField name="document" value={form.document} onChange={handleChange} placeholder="Documento" />
            <InputField name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" />
            <InputField name="amount" value={form.amount} onChange={handleChange} placeholder="Monto" />
            <button className="btn btn-dark w-100">Generar Token</button>

            {message && <AlertMessage type={message.type} message={message.text} />}

            {showTokenTooltip && token && (
              <div className="alert alert-info mt-3 text-center position-relative">
                <div className="d-flex justify-content-between align-items-center">
                  <strong>Token generado:</strong>
                  <span>{token}</span>
                  <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => handleCopy(token, "token")}>
                    {copied === "token" ? "Copiado" : "Copiar"}
                  </button>
                </div>
                <small className="text-muted d-block mt-2">Expira en {formatTime(timer)}</small>
              </div>
            )}

            {sessionId && (
              <div className="alert alert-secondary mt-2 text-center">
                <div className="d-flex justify-content-between align-items-center">
                  <strong>Session ID:</strong>
                  <span className="ms-2">{sessionId}</span>
                  <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => handleCopy(sessionId, "session")}>
                    {copied === "session" ? "Copiado" : "Copiar"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
