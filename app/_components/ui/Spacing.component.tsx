"use client";

import React from "react";

interface SpacingProps {
  size?: number; // px 單位
}

export default function Spacing({ size = 0 }: SpacingProps) {
  return <div style={{ height: size }} />;
}