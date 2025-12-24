"use client";

import React from "react";
import FieldBase from "@/app/components/ui/FieldBase";

type InputFieldProps = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
};

export default function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
}: InputFieldProps) {
  return (
    // ⭐ 1. 使用 FieldBase 來處理 label 和外部結構
    <FieldBase label={label}>
      {/* ⭐ 2. 只保留 input 元素。
           - 所有的外觀樣式 (border, px, py, focus) 都由 FieldBase 注入。
           - 這裡只需要保留邏輯相關的屬性，以及必要的 w-full 類別。
      */}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        // 3. 關鍵：移除所有外觀樣式，只保留 w-full (如果需要的話)
        className="w-full"
      />
    </FieldBase>
  );
}