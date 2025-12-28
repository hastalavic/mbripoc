// app/_engine/computes/MBF/OXLFactorMap.data.ts

// OXLFactorMap.data.ts
export const OXL_FC_FACTOR = {
  anml_L: 1.0,
  anml_S: 1.5,
  fish: 8.0,
  seafood: 4.0,
  proc_NP: 0.5,
  proc_P: 6.0,
  unknown: 1.0,
} as const;

export const OXL_TS_FACTOR = {
  raw: 0.1,
  steam: 1.0,
  stew: 1.1,
  stir: 15.0,
  roast: 50.0,
  fry: 100.0,
  unknown: 1.0,
} as const;