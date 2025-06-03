 import React from "react";

interface InputProps {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({ name, value, placeholder, onChange }: InputProps) {
  return (
    <input
      className="form-control mb-3"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  );
}
