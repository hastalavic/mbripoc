// app/_engine/computes/MBF/MetabolicBurdenFlow.compute.ts

/**
 * MetabolicBurdenFlow.compute.ts
 *
 * Purpose:
 * Unified computation model for:
 *   L1: Substance burden (material presence)
 *   L2: Metabolic / inflammatory stress
 *   L3: Systemic risk accumulation
 *
 * Design principles:
 * 1. No threshold assumption — any intake produces stress.
 * 2. Time-dependent dynamics using half-life kinetics.
 * 3. Parameters are replaceable; structure is stable.
 * 4. Suitable for BVT / N-of-1 / simulation-first validation.
 */

/* ============================================================
 *  Types
 * ============================================================ */

/**
 * Fixed parameters for a single MBF
 */
export interface MBFParams {
  id: string;

  /* ---------- L1 : Substance ---------- */
  halfLifeHours: number;        // Elimination half-life of substance
  absorptionRatio: number;      // Fraction entering systemic circulation (0~1)

  /* ---------- L1 -> L2 : Stress ---------- */
  l2GenerationFactor: number;   // Stress generated per unit L1 per hour
  l2RecoveryHalfLifeHours: number; // Natural recovery half-life of L2

  /* ---------- L2 -> L3 : Risk ---------- */
  l3AccumulationFactor: number; // Risk accumulation per unit L2 per hour
  l3RecoveryHalfLifeHours?: number; // Optional recovery of L3 (often very long)
}

/**
 * Dynamic state at a given time point
 */
export interface MBFState {
  time: number; // hours since simulation start
  L1: number;   // Remaining substance burden
  L2: number;   // Metabolic / inflammatory stress
  L3: number;   // Accumulated systemic risk
}

/* ============================================================
 *  Math Utilities
 * ============================================================ */

/**
 * Generic exponential decay using half-life
 */
function decay(
  value: number,
  halfLifeHours: number,
  deltaHours: number
): number {
  if (halfLifeHours <= 0) return value;
  const k = Math.log(2) / halfLifeHours;
  return value * Math.exp(-k * deltaHours);
}

/* ============================================================
 *  L1 Computation
 * ============================================================ */

/**
 * L1: Substance burden
 * - No threshold
 * - Any intake adds work to the system
 */
function computeL1(
  previousL1: number,
  intake: number,
  params: MBFParams,
  deltaHours: number
): number {
  const absorbed = intake * params.absorptionRatio;
  const remaining = decay(previousL1, params.halfLifeHours, deltaHours);
  return remaining + absorbed;
}

/* ============================================================
 *  L2 Computation
 * ============================================================ */

/**
 * L2: Metabolic / inflammatory stress
 * - Always generated if L1 > 0
 * - Can recover, but not instantly
 */
function computeL2(
  previousL2: number,
  currentL1: number,
  params: MBFParams,
  deltaHours: number
): number {
  const generatedStress = currentL1 * params.l2GenerationFactor * deltaHours;
  const recovered = decay(
    previousL2,
    params.l2RecoveryHalfLifeHours,
    deltaHours
  );
  return recovered + generatedStress;
}

/* ============================================================
 *  L3 Computation
 * ============================================================ */

/**
 * L3: Systemic risk
 * - Accumulates from L2
 * - Recovery optional and typically slow
 */
function computeL3(
  previousL3: number,
  currentL2: number,
  params: MBFParams,
  deltaHours: number
): number {
  const addedRisk = currentL2 * params.l3AccumulationFactor * deltaHours;

  if (!params.l3RecoveryHalfLifeHours) {
    return previousL3 + addedRisk;
  }

  const recovered = decay(
    previousL3,
    params.l3RecoveryHalfLifeHours,
    deltaHours
  );

  return recovered + addedRisk;
}

/* ============================================================
 *  Main Simulation Engine
 * ============================================================ */

/**
 * Run full L1 -> L2 -> L3 simulation on a time axis
 *
 * @param initialState  Starting state (usually all zeros)
 * @param params        MBF-specific parameters
 * @param timeline      Array of time points (hours, ascending)
 * @param intakeSchedule Mapping: time -> intake amount
 */
export function runMBFFlow(
  initialState: MBFState,
  params: MBFParams,
  timeline: number[],
  intakeSchedule: Record<number, number>
): MBFState[] {
  if (timeline.length < 2) {
    throw new Error("Timeline must contain at least two points.");
  }

  const results: MBFState[] = [];
  let state: MBFState = { ...initialState };

  for (let i = 1; i < timeline.length; i++) {
    const currentTime = timeline[i];
    const deltaHours = currentTime - timeline[i - 1];

    if (deltaHours <= 0) {
      throw new Error("Timeline must be strictly increasing.");
    }

    const intake = intakeSchedule[currentTime] ?? 0;

    const L1 = computeL1(state.L1, intake, params, deltaHours);
    const L2 = computeL2(state.L2, L1, params, deltaHours);
    const L3 = computeL3(state.L3, L2, params, deltaHours);

    state = {
      time: currentTime,
      L1,
      L2,
      L3,
    };

    results.push(state);
  }

  return results;
}

/* ============================================================
 *  Default Initial State Helper
 * ============================================================ */

export function createInitialState(): MBFState {
  return {
    time: 0,
    L1: 0,
    L2: 0,
    L3: 0,
  };
}