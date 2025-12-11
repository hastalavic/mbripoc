// app/_engine/homeostasis.ts
import { HomeostasisState } from "../types/HomeostasisState_types";

export const HomeostasisEngine = {

  /* -------------------- 水分模型 -------------------- */
  applyWaterIntake(state: HomeostasisState, ml: number) {
    const delta = ml / 150;
    return {
      ...state,
      hydration: Math.min(100, state.hydration + delta),
    };
  },

  tickWater(state: HomeostasisState, hours: number, modifiers: { caffeine?: boolean; heat?: boolean } = {}) {
    const baseLoss = 1.0;   // 每小時流失 1%
    const caffeineBoost = modifiers.caffeine ? 0.5 : 0;
    const heatBoost = modifiers.heat ? 0.8 : 0;

    const loss = hours * (baseLoss + caffeineBoost + heatBoost);

    return {
      ...state,
      hydration: Math.max(0, state.hydration - loss),
    };
  },

  /* -------------------- 熱量模型 -------------------- */
  computeCalorieBurn(BMR: number, activityFactor: number, hours: number) {
    return BMR * activityFactor * hours;
  },

  /* -------------------- 鈉平衡（POC 版本） -------------------- */
  applySodiumIntake(state: HomeostasisState, mg: number) {
    const delta = mg / 500;
    return {
      ...state,
      sodium_load: Math.min(10, state.sodium_load + delta),
    };
  },

  tickSodium(state: HomeostasisState, hours: number) {
    const recoveryRate = 0.5; // 每小時降 0.5
    return {
      ...state,
      sodium_load: Math.max(0, state.sodium_load - hours * recoveryRate),
    };
  },

  /* -------------------- 血糖（POC 版本） -------------------- */
  applyCarbs(state: HomeostasisState, grams: number) {
    const spike = grams * 1.2;
    return { ...state, glucose: state.glucose + spike };
  },

  tickGlucose(state: HomeostasisState, hours: number) {
    return {
      ...state,
      glucose: Math.max(70, state.glucose - hours * 25),
    };
  },
};

export default HomeostasisEngine;