"use client";

import Button from "../ui/Button";
import ButtonGroup from "../ui/ButtonGroup";

export default function FeatureNav() {
  return (
    <div className="w-full mb-6">
      <h2 className="text-lg font-semibold mb-2">Features</h2>

      <ButtonGroup>
        <Button full onClick={() => (window.location.href = "/add")}>
          ＋ 新增
        </Button>

        <Button full onClick={() => (window.location.href = "/elements")}>
          全元素
        </Button>

        <Button full onClick={() => (window.location.href = "/foods")}>
          攝取物
        </Button>

        <Button full onClick={() => (window.location.href = "/settings")}>
          設定
        </Button>
      </ButtonGroup>
    </div>
  );
}
