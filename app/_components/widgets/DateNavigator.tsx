"use client";

import Button from "../ui/Button";
import ButtonGroup from "../ui/ButtonGroup";

export default function DateNavigator({
  selectedDate,
  onPrev,
  onToday,
  onNext,
  onChange,
}) {
  return (
    <div className="w-full mb-6">
      <h2 className="text-lg font-semibold mb-2">Date Navigator</h2>

      <ButtonGroup>
        <Button variant="outline" full onClick={onPrev}>
          ←
        </Button>

        <Button variant="outline" full onClick={onToday}>
          Today
        </Button>

        <Button variant="outline" full onClick={onNext}>
          →
        </Button>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 h-10 px-3 rounded-lg border bg-white dark:bg-zinc-900 text-sm text-black dark:text-white"
        />
      </ButtonGroup>
    </div>
  );
}
