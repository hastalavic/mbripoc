// FieldBase.tsx (使用 React.cloneElement 注入樣式)
"use client";

import React, { cloneElement, isValidElement } from "react";

type FieldBaseProps = {
  label: string;
  children: React.ReactNode;
};

// 統一的表單元素樣式，包含邊框、內距和聚焦效果
const inputClassName = `
  w-full
  border border-zinc-600
  rounded-md
  px-3 py-2
  dark:border-zinc-700
  bg-transparent
  focus:outline-none
  focus:border-blue-500
  focus:ring-2 focus:ring-blue-500/30
`;

export default function FieldBase({ label, children }: FieldBaseProps) {
  let renderedChildren = children;
    if (isValidElement(children)) {
      const element = children as React.ReactElement<any>;
      renderedChildren = cloneElement(element, {
      className: `${element.props.className || ''} ${inputClassName}`,
      });
    }
  
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium">{label}</label>

      {/* 外部 div 不再需要 border, px, py，只負責容器 */}
      <div
        className="
          w-full rounded-md text-sm bg-white dark:bg-zinc-900 
        "
      >
        {renderedChildren} {/* 渲染被注入樣式的 children */}
      </div>
    </div>
  );
}