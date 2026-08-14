import { describe, it, expect } from 'vitest';
import {
  calculateCgpaToPercentage,
  calculateSgpa,
  calculateMultiSemesterCgpa,
  checkAttendancePenalty,
  roundToTwoDecimals,
} from './gradeCalculations';
import type { Course, Semester } from '../types/grade';

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
      // Worked Example from Prompt Section 6.6:
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

  describe('SGPA Calculation (Section 3.2)', () => {
    it('calculates SGPA correctly for sample semester courses', () => {
      const sampleCourses: Course[] = [
        { id: '1', name: 'Mathematics I', credits: 4, grade: 'AA' }, // 4 * 10 = 40
        { id: '2', name: 'Physics', credits: 3, grade: 'AB' },        // 3 * 9 = 27
        { id: '3', name: 'Basic EE', credits: 3, grade: 'BB' },       // 3 * 8 = 24
        { id: '4', name: 'Programming Lab', credits: 2, grade: 'AA' },// 2 * 10 = 20
      ];
      // Total Credits = 4+3+3+2 = 12
      // Total Points = 40+27+24+20 = 111
      // SGPA = 111 / 12 = 9.25
      const { sgpa, totalCredits, totalPoints } = calculateSgpa(sampleCourses);
      expect(totalCredits).toBe(12);
      expect(totalPoints).toBe(111);
      expect(sgpa).toBe(9.25);
    });

    it('returns 0 SGPA for empty courses list', () => {
      expect(calculateSgpa([]).sgpa).toBe(0);
    });
  });

  describe('Multi-Semester CGPA Calculation (Section 3.3)', () => {
    it('calculates weighted CGPA across multiple semesters', () => {
      const semList: Semester[] = [
        { id: '1', name: 'Sem 1', sgpa: 8.50, credits: 20 }, // 8.50 * 20 = 170
        { id: '2', name: 'Sem 2', sgpa: 9.00, credits: 20 }, // 9.00 * 20 = 180
      ];
      // Total Credits = 40, Total Points = 350
      // CGPA = 350 / 40 = 8.75
      const { cgpa, totalCredits } = calculateMultiSemesterCgpa(semList);
      expect(totalCredits).toBe(40);
      expect(cgpa).toBe(8.75);
    });
  });

  describe('Attendance Grade-Penalty Thresholds (Section 3.6)', () => {
    it('evaluates correct grade caps for exact boundary conditions', () => {
      expect(checkAttendancePenalty(80).maxAchievableGrade).toBe('AA');
      expect(checkAttendancePenalty(75).hasPenalty).toBe(false);

      expect(checkAttendancePenalty(74.9).maxAchievableGrade).toBe('BB');
      expect(checkAttendancePenalty(70).maxAchievableGrade).toBe('BB');

      expect(checkAttendancePenalty(68).maxAchievableGrade).toBe('BC');
      expect(checkAttendancePenalty(60).maxAchievableGrade).toBe('BC');

      expect(checkAttendancePenalty(55).maxAchievableGrade).toBe('CC');
      expect(checkAttendancePenalty(50).maxAchievableGrade).toBe('CC');

      expect(checkAttendancePenalty(49.9).maxAchievableGrade).toBe('XX');
      expect(checkAttendancePenalty(30).maxAchievableGrade).toBe('XX');
      expect(checkAttendancePenalty(45).explanation).toBe(
        'Attendance below 50% — XX grade awarded for this course. You are not eligible to appear for the End-Semester Examination (ESE) in this course.'
      );
    });
  });
});
