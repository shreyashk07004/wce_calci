// ============================================================================
// WCE CGPA AUTHORITATIVE FORMULA ENGINE
// Source: Walchand College of Engineering, Sangli (Maharashtra, India)
// "Academic and Examination Rules and Regulations 2023-24", Section 12 & 16
// ============================================================================

import type { GradeLetter, GradeDefinition, PercentageResult } from '../types/grade';

/**
 * Section 12.01, Table 16.1 - Official Grade Point Mapping
 * Grade Point scale from 0 to 10
 */
export const GRADE_POINT_MAP: Record<GradeLetter, number> = {
  AA: 10,
  AB: 9,
  BB: 8,
  BC: 7,
  CC: 6,
  CD: 5,
  DD: 4,
  FF: 0,
  XX: 0,
};

export const GRADE_DEFINITIONS: GradeDefinition[] = [
  { grade: 'AA', points: 10, description: 'Excellent' },
  { grade: 'AB', points: 9, description: 'Very Good' },
  { grade: 'BB', points: 8, description: 'Good' },
  { grade: 'BC', points: 7, description: 'Above Average' },
  { grade: 'CC', points: 6, description: 'Average' },
  { grade: 'CD', points: 5, description: 'Below Average' },
  { grade: 'DD', points: 4, description: 'Marginal Pass' },
  { grade: 'FF', points: 0, description: 'Fail / Unsatisfactory' },
  { grade: 'XX', points: 0, description: 'Course Ineligible (Attendance < 50%)' },
];

/**
 * Per WCE Academic RR 2023-24 Section 16
 * Helper function for standard rounding to exactly 2 decimal places.
 */
export const roundToTwoDecimals = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

/**
 * Per WCE Academic RR 2023-24, Section 16 — CGPA to Percentage Conversion
 * Formula: Percentage = (10.00 × CGPA) − 7.50
 * Valid Range: CGPA >= 5.00 (values < 5.00 carry an explicit note)
 */
export const calculateCgpaToPercentage = (cgpa: number): PercentageResult => {
  if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
    throw new Error('CGPA must be a valid number between 0.00 and 10.00');
  }

  const rawPercentage = (10.00 * cgpa) - 7.50;
  const percentage = roundToTwoDecimals(rawPercentage);
  const formattedCgpa = cgpa.toFixed(2);
  const formattedPercentage = percentage.toFixed(2);

  const formula = `Percentage = (10.00 × ${formattedCgpa}) − 7.50 = ${formattedPercentage}%`;
  const isBelowValidRange = cgpa < 5.00;

  return {
    cgpa,
    percentage,
    formula,
    isBelowValidRange,
    warningNote: isBelowValidRange
      ? 'This formula is officially defined by WCE for CGPA ≥ 5.00. Values below 5.00 are shown for reference only and may not reflect official conversion policy.'
      : undefined,
  };
};
