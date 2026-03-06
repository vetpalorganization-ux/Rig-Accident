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

// Base pain/suffering floor to prevent zero results when economic losses are small
const SEVERITY_BASE_PAIN: Record<InjurySeverity, number> = {
  minor: 3000,
  moderate: 25000,
  severe: 150000,
  catastrophic: 500000,
  fatal: 750000,
};

// Base multiplier by severity; dynamic adjustments are applied on top
const SEVERITY_BASE_MULTIPLIER: Record<InjurySeverity, number> = {
  minor: 1.5,
  moderate: 2.5,
  severe: 4.0,
  catastrophic: 6.0,
  fatal: 7.0,
};

/**
 * Calculates an estimated settlement range based on injury severity and economic losses.
 */
export const calculateSettlement = (input: SettlementInput): SettlementEstimate => {
  // Economic loss
  const economicLoss = Math.max(0, (input.medicalBills || 0) + (input.lostWages || 0));

  // Compute multiplier responsive to economic loss and truck involvement
  let multiplier = SEVERITY_BASE_MULTIPLIER[input.severity];
  if (input.isCommercialTruck) multiplier += 1.0;
  if (economicLoss > 50000) multiplier += 0.5;
  if (economicLoss > 200000) multiplier += 1.0;
  if (economicLoss > 500000) multiplier += 1.0;
  multiplier = Math.min(Math.max(multiplier, 1.5), 9.0);

  const basePain = SEVERITY_BASE_PAIN[input.severity];

  // Calculate a responsive range
  const variableMin = economicLoss * (multiplier * 0.8);
  const variableMax = economicLoss * (multiplier * 1.2);
  const calculatedMin = Math.round(variableMin + basePain);
  const calculatedMax = Math.round(Math.max(calculatedMin + 1, variableMax + basePain * 1.5));
  const calculatedAvg = Math.round((calculatedMin + calculatedMax) / 2);

  // Case strength determination
  let caseStrength: SettlementEstimate['caseStrength'] = 'Moderate';
  if (input.isCommercialTruck) caseStrength = 'High';
  if (input.isCommercialTruck && input.severity !== 'minor') caseStrength = 'Very High';

  // Fair Offer Benchmark based on calculated average
  const fairOfferBenchmark = Math.round(
    input.isCommercialTruck ? calculatedAvg * 0.85 : calculatedAvg * 0.6
  );

  return {
    min: calculatedMin,
    max: calculatedMax,
    average: calculatedAvg,
    fairOfferBenchmark,
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
