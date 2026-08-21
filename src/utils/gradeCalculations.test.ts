import { describe, it, expect } from 'vitest';
import {
  calculateCgpaToPercentage,
  roundToTwoDecimals,
} from './gradeCalculations';

describe('WCE Grade Calculations Engine', () => {
  describe('Rounding Utility', () => {
    it('rounds standard decimals to 2 places', () => {
      expect(roundToTwoDecimals(7.777)).toBe(7.78);
      expect(roundToTwoDecimals(6.25)).toBe(6.25);
      expect(roundToTwoDecimals(7.001)).toBe(7.00);
    });
  });

  describe('CGPA to Percentage Conversion (Section 3.5 Verification Table)', () => {
    it('matches official WCE verification table exactly', () => {
      // Verification Table from WCE Academic RR Section 16:
      // CGPA 6.25 → 55%
      // CGPA 6.75 → 60%
      // CGPA 7.25 → 65%
      // CGPA 7.75 → 70%
      // CGPA 8.25 → 75%
      expect(calculateCgpaToPercentage(6.25).percentage).toBe(55.00);
      expect(calculateCgpaToPercentage(6.75).percentage).toBe(60.00);
      expect(calculateCgpaToPercentage(7.25).percentage).toBe(65.00);
      expect(calculateCgpaToPercentage(7.75).percentage).toBe(70.00);
      expect(calculateCgpaToPercentage(8.25).percentage).toBe(75.00);
    });

    it('handles worked example CGPA 7.80 accurately', () => {
      // Worked Example:
      // (10.00 * 7.80) - 7.50 = 78.00 - 7.50 = 70.50%
      const result = calculateCgpaToPercentage(7.80);
      expect(result.percentage).toBe(70.50);
      expect(result.formula).toBe('Percentage = (10.00 × 7.80) − 7.50 = 70.50%');
      expect(result.isBelowValidRange).toBe(false);
    });

    it('shows warning note for CGPA < 5.00', () => {
      const result = calculateCgpaToPercentage(4.50);
      expect(result.percentage).toBe(37.50);
      expect(result.isBelowValidRange).toBe(true);
      expect(result.warningNote).toBeDefined();
      expect(result.warningNote).toContain('CGPA ≥ 5.00');
    });

    it('throws error for out-of-range CGPA inputs', () => {
      expect(() => calculateCgpaToPercentage(-1)).toThrow();
      expect(() => calculateCgpaToPercentage(10.5)).toThrow();
      expect(() => calculateCgpaToPercentage(NaN)).toThrow();
    });
  });
});
