
"use client";

import { create } from "zustand";

export const useTimeline = create((set) => ({
  now: new Date(),

  setNow: (d: Date) => set({ now: d }),

  tick: () => set((s: any) => ({
    now: new Date(s.now.getTime() + 1000),
  })),
}));