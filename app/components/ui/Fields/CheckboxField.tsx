"use client";

import React from "react";

type CheckboxFieldProps = {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  description?: string;
};

export default function CheckboxField({
  label,
  checked,
  onChange,
  description,
}: CheckboxFieldProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 rounded border-zinc-400 dark:border-zinc-600 
                   checked:bg-black checked:hover:bg-black
                   dark:checked:bg-white dark:checked:hover:bg-white"
      />

      {/* Label + optional description */}
      <div className="flex flex-col">
        <span className="text-sm font-medium">{label}</span>
        {description && (
          <span className="text-xs text-zinc-500 dark:text-zinc-400 leading-tight">
            {description}
          </span>
        )}
      </div>
    </label>
  );
}
