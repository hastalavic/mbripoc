"use client";

import { useState } from "react";
import { toLocalDateTime, localToISO } from "@/app/_store/TimeConverter.utils";

interface DateTimePickerProps {
  value?: string; // ISO string
  onChange?: (val: string) => void;
  label?: string;
}

export default function DateTimePicker({
  value,
  onChange,
  label = "日期與時間"
}: DateTimePickerProps) {
  // Convert incoming ISO to local date + time
  const initial = value ? toLocalDateTime(value) : toLocalDateTime(new Date().toISOString());

  const [date, setDate] = useState<string>(initial.date);
  const [time, setTime] = useState<string>(initial.time);

  const emit = (d: string, t: string) => {
    if (!onChange) return;
    onChange(localToISO(d, t));
  };

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = e.target.value;
    setDate(d);
    emit(d, time);
  };

  const handleTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = e.target.value;
    setTime(t);
    emit(date, t);
  };

  return (
    <div className="space-y-1">
      <label className="text-sm text-zinc-600 dark:text-zinc-300">{label}</label>
      <div className="flex items-center gap-3">
        <input
          type="date"
          value={date}
          onChange={handleDate}
          className="rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-2 py-1 text-sm"
        />
        <input
          type="time"
          value={time}
          onChange={handleTime}
          className="rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-2 py-1 text-sm"
        />
      </div>
    </div>
  );
}