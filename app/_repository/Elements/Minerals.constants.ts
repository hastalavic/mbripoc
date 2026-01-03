// app/_repository/data/Minerals.constants.ts

/* BVT 系統中央元素清單 (SSOT) */

/* =========================
 * 4. 礦物質 (Minerals)
 * ========================= */
export const MIN_ELEMENTS = {
  MIN_K:  {
    DisplayName: "鉀",
    Standard_Unit: "mg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 3500,
    DefaultHalfLife_hr: 6,
    Category: "Minerals"
  },
  MIN_SE: {
    DisplayName: "硒",
    Standard_Unit: "mcg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 55,
    DefaultHalfLife_hr: 24,
    Category: "Minerals"
  },
  MIN_MG: {
    DisplayName: "鎂",
    Standard_Unit: "mg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 320,
    DefaultHalfLife_hr: 12,
    Category: "Minerals"
  },
  MIN_ZN: {
    DisplayName: "鋅",
    Standard_Unit: "mg",
    isAIRequired: true,
    isVisible: true,
    DefaultTarget: 10,
    DefaultHalfLife_hr: 12,
    Category: "Minerals"
  },
} as const;