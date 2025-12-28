// app/_engine/computes/MBF/OXL.compute.ts

import { OXL_FC_FACTOR, OXL_TS_FACTOR } from "./OXLFactorMap.data";

export function computeOXL(
  fatMass: number,
  fac_mbf_oxl_fc?: keyof typeof OXL_FC_FACTOR,
  fac_mbf_oxl_ts?: keyof typeof OXL_TS_FACTOR
) {
  const fc = fac_mbf_oxl_fc ? OXL_FC_FACTOR[fac_mbf_oxl_fc] : 1;
  const ts = fac_mbf_oxl_ts ? OXL_TS_FACTOR[fac_mbf_oxl_ts] : 1;

  return fatMass * fc * ts;
}