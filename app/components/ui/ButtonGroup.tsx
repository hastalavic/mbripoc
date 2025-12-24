"use client";

import React from "react";

export default function ButtonGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full gap-2">{children}</div>;
}
