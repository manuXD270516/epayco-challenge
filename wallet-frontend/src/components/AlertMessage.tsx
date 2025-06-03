interface AlertProps {
  type: "success" | "danger";
  message: string;
}

export default function AlertMessage({ type, message }: AlertProps) {
  return <div className={`alert alert-${type} mt-3`}>{message}</div>;
}
