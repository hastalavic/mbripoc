// app/_engine/computes/MitigationFormulas/PurineMitigation.compute.ts

/**
 * @file PurineMitigation.compute.ts
 * @version 2.1 (B-Scheme: Synergy Path Model - FD1 Aligned)
 * @description 模擬生化連動路徑。
 * 核心邏輯：1 - (未抑制生成 * 未輔助排泄 / 環境增益係數)
 * 數據命名已完全對齊 app/_engine/registry/FD1.registry.ts
 */

export interface PurineIntakeParams {
  BM_VIT_C: number;         // 緩解所需維生素 C (mg)
  BM_PHY_CYANIDIN: number;  // 緩解所需矢車菊素 (mg)
  BM_MIN_K: number;         // 緩解所需鉀離子 (mg)
}

export class PurineMitigationEngine {
  // --- 核心物理常數 ---
  private static readonly MAX_ALVI_POWER = 0.45; // 單項生化路徑的生理攔截極限
  private static readonly SYSTEM_LAMBDA = 0.70;  // 實戰損耗係數 (考慮吸收差、代謝競爭、基礎賦稅)

  // --- 救援配比 (每 1mg MBF_PUR 對應所需之元素量) ---
  // 基於生理閾值與競爭排泄模型推算
  private static readonly TARGET_RATIO = {
    VIT_C: 5.0,           // 競爭 URAT1 轉運體所需之高濃度配比
    PHY_CYANIDIN: 0.27,   // 抑制 XO 酵素活性位點之有效濃度配比
    MIN_K: 11.6           // 鹼化尿液並維持滲透壓平衡之建議配比
  };

  /**
   * 核心計算引擎
   * @param purineLoadMg 對應 MBF_PUR 的攝取量 (mg)
   * @param intake 來自 FoodNutrientState 的實測攝取量
   */
  static compute(purineLoadMg: number, intake: PurineIntakeParams) {
    // 1. 安全檢查：避免除以零
    const safeLoad = Math.max(purineLoadMg, 0.1);

    // 2. 計算各生化通道達成率 (0.0 ~ 1.0)
    // 反映資源投放是否達到生理預期的「防禦密度」
    const getAchieve = (val: number, target: number) => Math.min(val / target, 1);

    const vAchieve = getAchieve(intake.BM_VIT_C, safeLoad * this.TARGET_RATIO.VIT_C);
    const cAchieve = getAchieve(intake.BM_PHY_CYANIDIN, safeLoad * this.TARGET_RATIO.PHY_CYANIDIN);
    const kAchieve = getAchieve(intake.BM_MIN_K, safeLoad * this.TARGET_RATIO.MIN_K);

    // 3. 轉換為實際路徑效能 (Path Efficiency)
    // excretionEff: 腎臟出口的排泄增強率
    // productionEff: 肝臟端的生成抑制率
    // envBoost: 尿液環境對溶解度的貢獻 (1.0x ~ 1.3x)
    const excretionEff = vAchieve * this.MAX_ALVI_POWER;
    const productionEff = cAchieve * this.MAX_ALVI_POWER;
    const envBoost = 1 + (kAchieve * 0.3);

    // 4. B-Scheme 乘法核心：計算「穿透防線的殘留風險」
    // 邏輯：(未被攔截的生成量) * (未被輔助的留存率) / 環境溶解增益
    const residualRisk = ((1 - productionEff) * (1 - excretionEff)) / envBoost;

    // 5. 實戰緩解率折減
    // 先算理論緩解能力 (1 - 餘量)，再套用 SYSTEM_LAMBDA 模擬真實世界的傷痕與流失
    const theoreticalMitigation = 1 - residualRisk;
    const actualMitigation = theoreticalMitigation * this.SYSTEM_LAMBDA;

    // 6. 計算淨餘壓力 (Net Stress)
    const netStressIndex = safeLoad * (1 - actualMitigation);

    return {
      // 顯示於 UI 的對沖成功率
      score: (actualMitigation * 100).toFixed(1) + "%",
      
      // 最終殘留在系統內的代謝負擔指數 (mg)
      stressIndex: netStressIndex.toFixed(1),
      
      // 生化路徑細節 (用於白皮書或進階儀表板)
      pathways: {
        excretion: (excretionEff * 100).toFixed(0) + "%",
        production: (productionEff * 100).toFixed(0) + "%",
        solubility: envBoost.toFixed(2) + "x"
      },
      
      // 救援物資缺口 (Gaps)
      // 這是 Enbryt 給出「最佳補充路徑」的計算基準
      gaps: {
        VIT_C: Math.max(0, (safeLoad * this.TARGET_RATIO.VIT_C) - intake.BM_VIT_C),
        PHY_CYANIDIN: Math.max(0, (safeLoad * this.TARGET_RATIO.PHY_CYANIDIN) - intake.BM_PHY_CYANIDIN),
        MIN_K: Math.max(0, (safeLoad * this.TARGET_RATIO.MIN_K) - intake.BM_MIN_K)
      },

      // 執行建議：將總缺口轉化為分時指令 (Bvt v1.0 核心)
      executionStrategy: {
        vitCStaggeredMg: 500, // 以主流 500mg 為單位
        staggeredRounds: Math.ceil(Math.max(0, (safeLoad * this.TARGET_RATIO.VIT_C) - intake.BM_VIT_C) / 500)
      }
    };
  }
}