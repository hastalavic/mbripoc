import type { IntakeAnalysis } from "@/app/_ai/types/IntakeAnalysisSchema.type";
import { ElementKnowledgeBase } from "@/app/_repository/data/ElementBase.constants";

/**
 * ActualIntake
 * ----------------------------
 * 已還原為「實際攝取量」的 IntakeAnalysis。
 *
 * 規則：
 * - 只縮放「元素欄位」（營養素 / MBF / phytochemical）
 * - 不動語意欄位、enum、factor、unknown list
 */
export type ActualIntake = IntakeAnalysis & {
  __unit: "actual";
};

export function deriveActualIntake(
  analysis: IntakeAnalysis
): ActualIntake {
  const factor = analysis.serving_weight / 100;

  // 保留原始結構
  const result: any = { ...analysis };

  /**
   * 只針對 ElementKnowledgeBase 中定義的元素欄位做縮放
   * 這是「唯一正確的邊界」
   */
  Object.keys(ElementKnowledgeBase).forEach((key) => {
    if (key in result && typeof result[key] === "number") {
      result[key] = result[key] * factor;
    }
  });

  // 單位語意標記
  result.__unit = "actual";

  return result;
}