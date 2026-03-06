/**
 * src/lib/settlement-algorithm.ts
 * 
 * This library provides the valuation logic for the "Fair Offer" Calculator.
 * It uses a deterministic, table-based model derived from 2025/2026 legal data.
 */

export type InjurySeverity = 'minor' | 'moderate' | 'severe' | 'catastrophic' | 'fatal';

export interface SettlementInput {
  severity: InjurySeverity;
  medicalBills: number;
  lostWages: number;
  isCommercialTruck: boolean;
  state?: string;
}

export interface SettlementEstimate {
  min: number;
  max: number;
  average: number;
  fairOfferBenchmark: number;
  multiplier: number;
  caseStrength: 'Low' | 'Moderate' | 'High' | 'Very High';
}

const SEVERITY_BASE_VALUES: Record<InjurySeverity, { min: number; max: number; avg: number }> = {
  minor: { min: 10000, max: 100000, avg: 55000 },
  moderate: { min: 100000, max: 500000, avg: 250000 },
  severe: { min: 500000, max: 2000000, avg: 1000000 },
  catastrophic: { min: 2000000, max: 10000000, avg: 5000000 },
  fatal: { min: 1000000, max: 20000000, avg: 4500000 },
};

// Standard car accident average for comparison (The "Viral" hook)
const STANDARD_CAR_ACCIDENT_AVG = 30416;

/**
 * Calculates an estimated settlement range based on injury severity and economic losses.
 */
export const calculateSettlement = (input: SettlementInput): SettlementEstimate => {
  const base = SEVERITY_BASE_VALUES[input.severity];
  
  // Basic multiplier method: (Medical Bills + Lost Wages) * Multiplier + Pain/Suffering Base
  // Multipliers range from 1.5x (minor) to 5x+ (catastrophic)
  let multiplier = 1.5;
  if (input.severity === 'moderate') multiplier = 3;
  if (input.severity === 'severe') multiplier = 4.5;
  if (input.severity === 'catastrophic' || input.severity === 'fatal') multiplier = 6;

  const economicLoss = input.medicalBills + input.lostWages;
  const calculatedMin = Math.max(base.min, economicLoss * multiplier);
  const calculatedMax = Math.max(base.max, economicLoss * (multiplier + 1));
  const calculatedAvg = (calculatedMin + calculatedMax) / 2;

  // Case strength determination
  let caseStrength: SettlementEstimate['caseStrength'] = 'Moderate';
  if (input.isCommercialTruck) caseStrength = 'High';
  if (input.isCommercialTruck && input.severity !== 'minor') caseStrength = 'Very High';

  // Fair Offer Benchmark
  // For commercial trucks, the "Fair Offer" is significantly higher than a standard car offer.
  const fairOfferBenchmark = input.isCommercialTruck 
    ? calculatedAvg * 0.85 // Commercial benchmark is high
    : STANDARD_CAR_ACCIDENT_AVG;

  return {
    min: Math.round(calculatedMin),
    max: Math.round(calculatedMax),
    average: Math.round(calculatedAvg),
    fairOfferBenchmark: Math.round(fairOfferBenchmark),
    multiplier,
    caseStrength,
  };
};

/**
 * Formats a number as USD currency.
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};
