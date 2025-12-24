"use client";

import React from "react";
import FieldBase from "@/app/components/ui/FieldBase";

type NumberFieldProps = {
  label: string;
  value: number | string;
  onChange: (value: number | string) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  disabled?: boolean;
};

export default function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  placeholder = "",
  disabled = false,
}: NumberFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    // Allow empty string (so the user can delete to re‑type)
    if (raw === "") {
      onChange("");
      return;
    }

    const numeric = Number(raw);
    if (!isNaN(numeric)) {
      onChange(numeric);
    }
  };

  return (
    <FieldBase label={label}>
      <input
        type="number"
        value={value ?? ""}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full"
      />
    </FieldBase>
  );
}
