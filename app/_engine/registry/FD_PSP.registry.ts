// app/_engine/registry/FD_PSP.registry.ts

/* ==================================================
 * FD1 – Various State Definition (Read Model)
 * ================================================== */

export interface RegistryState_Food {
  /** 個人基本資料 */
  individual?: IndividualState;

  /** 生理 / 系統層狀態 */
  physio?: PhysioState;

  /** 狀態時間戳 */
  timestamp?: number;
}

/* ==================================================
 * Individual State (個人生理特徵)
 * ================================================== */
export interface IndividualState {
  bmi?: number;
  age?: number;
  heightCm?: number;
  bodyWeight?: number;
  bodyFatRatio?: number;
  sex?: string;
  /** 心理/生理壓力負荷 */
  stressLoad?: number;
  /** 每日活動度指數 */
  activityIndex?: number;
  /** 睡眠品質指數 */
  sleepQualityIndex?: number;
  /** 肝功能評估指標 */
  liverFunctionIndex?: number;
  /** 腎功能評估指標 (尿酸排泄的關鍵) */
  kidneyFunctionIndex?: number;
}

/* ==================================================
 * Physio State (系統層應激狀態)
 * ================================================== */
export interface PhysioState {
  /** 胰島素負荷 */
  insulinLoad?: number;
  /** 胰臟應激壓 */
  pancreaticStress?: number;
  /** 肝臟應激壓 */
  hepaticStress?: number;
}



export interface FD_PSP_RegistryState {
  /** * 1. 原始輸入快照 (平鋪資料，不依賴外部 Type) 
   */
  profileSnapshot: {
    age: number;
    weightKg: number;
    heightCm: number;
    gender: string;
    activityLevel: number;
    [key: string]: any; // 保持彈性
  };

  /** * 2. 理想需求基準 (純數值矩陣)
   */
  targets: {
    macros: {
      protein: number;
      fat: number;
      carbs: number;
      hydration: number;
    };
    fatAcids: Record<string, number>;
    micros: Record<string, {
      RI: number | null;
      UL: number | null;
      unit: string;
    }>;
  };

  /** * 3. 初始推估存量 (RI * 0.7 的結果)
   */
  initialPool: Record<string, {
    elementId: string;
    amount: number;
    unit: string;
  }>;

  /** * 4. 檔案資訊
   */
  meta: {
    pspId: string;
    createdAt: number;
  };
}

export const EMPTY_PSP_STATE: FD_PSP_RegistryState | null = null;