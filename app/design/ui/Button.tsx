"use client";

import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  full?: boolean;
  className?: string;   // ⭐ 讓 Button 接受自訂 className
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  children,
  variant = "primary",
  full = false,
  className,
  onClick,
  disabled,
  type = "button",
  ...rest
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...rest}
      className={clsx(
        "h-10 px-4 rounded-lg text-sm font-medium flex items-center justify-center transition-all active:scale-95",
        full && "w-full",
        variant === "primary" &&
          "bg-black text-white dark:bg-white dark:text-black",
        variant === "outline" &&
          "bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        !disabled && "hover:opacity-80",
        className // ⭐ 最後合併傳入的 className
      )}
    >
      {children}
    </button>
  );
}