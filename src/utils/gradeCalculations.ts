// ============================================================================
// WCE CGPA & SGPA AUTHORITATIVE FORMULAS ENGINE
// Source: Walchand College of Engineering, Sangli (Maharashtra, India)
// "Academic and Examination Rules and Regulations 2023-24", Section 12 & 16
// ============================================================================

import type { GradeLetter, GradeDefinition, Course, Semester, PercentageResult, AttendancePenaltyResult } from '../types/grade';

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
  // Validate range
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

/**
 * Per WCE Academic RR 2023-24, Section 16 — SGPA Calculation
 * SGPA = Σ(Ci × Gi) / Σ(Ci)
 * where Ci = credits of the i-th course, Gi = grade points of the i-th course.
 */
export const calculateSgpa = (courses: Course[]): { sgpa: number; totalCredits: number; totalPoints: number } => {
  if (!courses || courses.length === 0) {
    return { sgpa: 0, totalCredits: 0, totalPoints: 0 };
  }

  let totalCredits = 0;
  let totalPoints = 0;

  for (const course of courses) {
    const credits = Number(course.credits);
    if (isNaN(credits) || credits <= 0) continue;
    const gradePoints = GRADE_POINT_MAP[course.grade] ?? 0;

    totalCredits += credits;
    totalPoints += credits * gradePoints;
  }

  if (totalCredits === 0) {
    return { sgpa: 0, totalCredits: 0, totalPoints: 0 };
  }

  const rawSgpa = totalPoints / totalCredits;
  const sgpa = roundToTwoDecimals(rawSgpa);

  return { sgpa, totalCredits, totalPoints };
};

/**
 * Per WCE Academic RR 2023-24, Section 16 — Multi-Semester CGPA Calculation
 * CGPA = ΣΣ(Cij × Gij) / ΣΣ(Cij)
 * Weighted average of SGPAs weighted by respective semester credits.
 * CGPA = Σ(Semester SGPA × Semester Credits) / Σ(Semester Credits)
 */
export const calculateMultiSemesterCgpa = (semesters: Semester[]): { cgpa: number; totalCredits: number } => {
  if (!semesters || semesters.length === 0) {
    return { cgpa: 0, totalCredits: 0 };
  }

  let totalCredits = 0;
  let weightedPointsSum = 0;

  for (const sem of semesters) {
    const credits = Number(sem.credits);
    const sgpa = Number(sem.sgpa);

    if (isNaN(credits) || credits <= 0 || isNaN(sgpa)) continue;

    totalCredits += credits;
    weightedPointsSum += sgpa * credits;
  }

  if (totalCredits === 0) {
    return { cgpa: 0, totalCredits: 0 };
  }

  const rawCgpa = weightedPointsSum / totalCredits;
  const cgpa = roundToTwoDecimals(rawCgpa);

  return { cgpa, totalCredits };
};

/**
 * Per WCE Academic RR 2023-24, Section 04.04 — Attendance Grade-Penalty Thresholds (Theory Courses)
 * Thresholds:
 * - Attendance ≥ 75%: No penalty, no cap on grade.
 * - 70% ≤ Attendance < 75%: Maximum achievable grade capped at BB.
 * - 60% ≤ Attendance < 70%: Maximum achievable grade capped at BC.
 * - 50% ≤ Attendance < 60%: Maximum achievable grade capped at CC.
 * - Attendance < 50%: Direct XX grade (Result becomes FF unless re-exam).
 */
export const checkAttendancePenalty = (attendancePercentage: number): AttendancePenaltyResult => {
  if (isNaN(attendancePercentage) || attendancePercentage < 0 || attendancePercentage > 100) {
    throw new Error('Attendance percentage must be between 0 and 100.');
  }

  if (attendancePercentage >= 75) {
    return {
      attendancePercentage,
      maxAchievableGrade: 'AA',
      maxPoints: 10,
      hasPenalty: false,
      explanation: `With ${attendancePercentage}% attendance (≥ 75%), you have NO attendance penalty. You can achieve up to an AA grade (10 points).`,
      badgeColor: 'emerald',
    };
  } else if (attendancePercentage >= 70) {
    return {
      attendancePercentage,
      maxAchievableGrade: 'BB',
      maxPoints: 8,
      hasPenalty: true,
      explanation: `With ${attendancePercentage}% attendance (70% to 74.99%), your maximum achievable grade is capped at BB (8 points), even if your marks qualify for AA or AB.`,
      badgeColor: 'amber',
    };
  } else if (attendancePercentage >= 60) {
    return {
      attendancePercentage,
      maxAchievableGrade: 'BC',
      maxPoints: 7,
      hasPenalty: true,
      explanation: `With ${attendancePercentage}% attendance (60% to 69.99%), your maximum achievable grade is capped at BC (7 points), even if your marks qualify for a higher grade.`,
      badgeColor: 'orange',
    };
  } else if (attendancePercentage >= 50) {
    return {
      attendancePercentage,
      maxAchievableGrade: 'CC',
      maxPoints: 6,
      hasPenalty: true,
      explanation: `With ${attendancePercentage}% attendance (50% to 59.99%), your maximum achievable grade is capped at CC (6 points), even if your marks qualify for a higher grade.`,
      badgeColor: 'rose',
    };
  } else {
    return {
      attendancePercentage,
      maxAchievableGrade: 'XX',
      maxPoints: 0,
      hasPenalty: true,
      explanation: `Attendance below 50% — XX grade awarded for this course. You are not eligible to appear for the End-Semester Examination (ESE) in this course.`,
      badgeColor: 'red',
    };
  }
};
