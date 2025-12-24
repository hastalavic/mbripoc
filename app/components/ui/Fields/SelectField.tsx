"use client";

import React from "react";
import FieldBase from "@/app/components/ui/FieldBase";

type Option = {
  label: string;
  value: string | number;
};

type SelectFieldProps = {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  options: Option[];
  note?: string;
  disabled?: boolean;
  className?: string;
};

export default function SelectField({
  label,
  value,
  onChange,
  options,
  note,
  disabled = false,
  className = "",
}: SelectFieldProps) {
  return (
    // ⭐ 1. 外層結構使用 FieldBase
    <FieldBase label={label}>
      <div className={`w-full ${className}`}>
        <select
          value={value === "" ? "" : value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          // ⭐ 2. 移除所有外觀樣式！只保留 w-full 和 disabled 的邏輯樣式。
          // 所有的 border, px, py, focus 樣式都由 FieldBase 注入。
          className="w-full disabled:opacity-50" 
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        
        {/* Note 放在 select 內部，讓 FieldBase 的邊框不包含它 (如果 FieldBase 沒有內層 div)。
            但更安全的做法是將 note 放在 FieldBase 外部。
            
            如果 FieldBase 外部沒有提供額外包裝，我們暫時保持這個 div 結構來包含 note。
        */}
        {note && <p className="text-xs text-zinc-500">{note}</p>}
      </div>
    </FieldBase>
  );
}
