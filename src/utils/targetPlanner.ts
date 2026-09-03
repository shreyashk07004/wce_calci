/**
 * Target SGPA / CGPA Needed Planner Calculation Utility
 * Derived strictly from Section 16 of the WCE Academic & Examination Rules and Regulations (RR 2023-24):
 *
 * CGPA = (Current_CGPA * Credits_so_far + SGPA_next * Credits_next_sem) / (Credits_so_far + Credits_next_sem)
 * Solving for SGPA_next:
 * SGPA_needed = (Target_CGPA * (Credits_so_far + Credits_next_sem) - Current_CGPA * Credits_so_far) / Credits_next_sem
 */

export interface TargetPlannerInput {
  currentCgpa: number;
  creditsSoFar: number;
  creditsNextSem: number;
  targetCgpa: number;
}

export type TargetPlannerStatus =
  | 'INVALID_INPUT'
  | 'TARGET_ALREADY_MET'
  | 'ACHIEVABLE_STANDARD'
  | 'EASILY_SECURED_BELOW_PASSING'
  | 'NOT_ACHIEVABLE_THIS_SEM';

export interface TargetPlannerResult {
  status: TargetPlannerStatus;
  sgpaNeeded: number | null;
  maxPossibleCgpa: number | null;
  totalCumulativeCredits: number;
  creditsSoFar: number;
  creditsNextSem: number;
  currentCgpa: number;
  targetCgpa: number;
  totalGradePointsNeeded: number;
  currentGradePoints: number;
  deltaGradePointsNeeded: number;
  errorMessage?: string;
  notes: string[];
}

export function calculateTargetSgpa(input: TargetPlannerInput): TargetPlannerResult {
  const { currentCgpa, creditsSoFar, creditsNextSem, targetCgpa } = input;

  // 1. Validation of inputs
  if (
    isNaN(currentCgpa) ||
    isNaN(creditsSoFar) ||
    isNaN(creditsNextSem) ||
    isNaN(targetCgpa)
  ) {
    return {
      status: 'INVALID_INPUT',
      sgpaNeeded: null,
      maxPossibleCgpa: null,
      totalCumulativeCredits: 0,
      creditsSoFar: 0,
      creditsNextSem: 0,
      currentCgpa: 0,
      targetCgpa: 0,
      totalGradePointsNeeded: 0,
      currentGradePoints: 0,
      deltaGradePointsNeeded: 0,
      errorMessage: 'All four input fields are mandatory and must be valid numbers.',
      notes: [],
    };
  }

  if (currentCgpa < 0 || currentCgpa > 10.0) {
    return {
      status: 'INVALID_INPUT',
      sgpaNeeded: null,
      maxPossibleCgpa: null,
      totalCumulativeCredits: 0,
      creditsSoFar,
      creditsNextSem,
      currentCgpa,
      targetCgpa,
      totalGradePointsNeeded: 0,
      currentGradePoints: 0,
      deltaGradePointsNeeded: 0,
      errorMessage: 'Current CGPA must be between 0.00 and 10.00.',
      notes: [],
    };
  }

  if (targetCgpa < 0 || targetCgpa > 10.0) {
    return {
      status: 'INVALID_INPUT',
      sgpaNeeded: null,
      maxPossibleCgpa: null,
      totalCumulativeCredits: 0,
      creditsSoFar,
      creditsNextSem,
      currentCgpa,
      targetCgpa,
      totalGradePointsNeeded: 0,
      currentGradePoints: 0,
      deltaGradePointsNeeded: 0,
      errorMessage: 'Target CGPA must be between 0.00 and 10.00.',
      notes: [],
    };
  }

  if (creditsSoFar <= 0) {
    return {
      status: 'INVALID_INPUT',
      sgpaNeeded: null,
      maxPossibleCgpa: null,
      totalCumulativeCredits: 0,
      creditsSoFar,
      creditsNextSem,
      currentCgpa,
      targetCgpa,
      totalGradePointsNeeded: 0,
      currentGradePoints: 0,
      deltaGradePointsNeeded: 0,
      errorMessage: 'Total credits earned so far must be greater than 0.',
      notes: [],
    };
  }

  if (creditsNextSem <= 0) {
    return {
      status: 'INVALID_INPUT',
      sgpaNeeded: null,
      maxPossibleCgpa: null,
      totalCumulativeCredits: 0,
      creditsSoFar,
      creditsNextSem,
      currentCgpa,
      targetCgpa,
      totalGradePointsNeeded: 0,
      currentGradePoints: 0,
      deltaGradePointsNeeded: 0,
      errorMessage: 'Upcoming semester credits must be greater than 0.',
      notes: [],
    };
  }

  const totalCumulativeCredits = creditsSoFar + creditsNextSem;
  const currentGradePoints = currentCgpa * creditsSoFar;
  const totalGradePointsNeeded = targetCgpa * totalCumulativeCredits;
  const deltaGradePointsNeeded = totalGradePointsNeeded - currentGradePoints;

  const rawSgpaNeeded = deltaGradePointsNeeded / creditsNextSem;
  // Maximum possible CGPA if student scores a perfect 10.00 SGPA next semester
  const maxPossibleCgpa = (currentGradePoints + 10.0 * creditsNextSem) / totalCumulativeCredits;

  const notes: string[] = [];

  // Edge Case 1: Target is not achievable in one semester (SGPA needed > 10.00)
  if (rawSgpaNeeded > 10.0) {
    notes.push(
      `Not achievable in one semester alone — maximum possible CGPA after this semester at a perfect 10.00 SGPA would be ${maxPossibleCgpa.toFixed(2)}.`
    );
    return {
      status: 'NOT_ACHIEVABLE_THIS_SEM',
      sgpaNeeded: rawSgpaNeeded,
      maxPossibleCgpa,
      totalCumulativeCredits,
      creditsSoFar,
      creditsNextSem,
      currentCgpa,
      targetCgpa,
      totalGradePointsNeeded,
      currentGradePoints,
      deltaGradePointsNeeded,
      notes,
    };
  }

  // Edge Case 2: Target is <= Current CGPA or SGPA <= 0.00 (already secured)
  if (targetCgpa <= currentCgpa || rawSgpaNeeded <= 0.0) {
    notes.push(
      'Target CGPA is already met or mathematically secured. Even with minimal or passing performance, your cumulative score meets this goal.'
    );
    return {
      status: 'TARGET_ALREADY_MET',
      sgpaNeeded: Math.max(0, rawSgpaNeeded),
      maxPossibleCgpa,
      totalCumulativeCredits,
      creditsSoFar,
      creditsNextSem,
      currentCgpa,
      targetCgpa,
      totalGradePointsNeeded,
      currentGradePoints,
      deltaGradePointsNeeded,
      notes,
    };
  }

  // Edge Case 3: SGPA needed is between 0.00 and 4.00 (below minimum passing grade point DD=4)
  if (rawSgpaNeeded > 0.0 && rawSgpaNeeded <= 4.0) {
    notes.push(
      `The mathematically required SGPA is ${rawSgpaNeeded.toFixed(2)}. Since the minimum passing grade point at WCE is DD (4.00), merely passing all registered courses will automatically clear and exceed your target CGPA.`
    );
    return {
      status: 'EASILY_SECURED_BELOW_PASSING',
      sgpaNeeded: rawSgpaNeeded,
      maxPossibleCgpa,
      totalCumulativeCredits,
      creditsSoFar,
      creditsNextSem,
      currentCgpa,
      targetCgpa,
      totalGradePointsNeeded,
      currentGradePoints,
      deltaGradePointsNeeded,
      notes,
    };
  }

  // Standard Achievable Case: 4.00 < SGPA needed <= 10.00
  notes.push(
    `You need an average SGPA of ${rawSgpaNeeded.toFixed(2)} across your ${creditsNextSem} registered credits to achieve a CGPA of ${targetCgpa.toFixed(2)}.`
  );

  return {
    status: 'ACHIEVABLE_STANDARD',
    sgpaNeeded: rawSgpaNeeded,
    maxPossibleCgpa,
    totalCumulativeCredits,
    creditsSoFar,
    creditsNextSem,
    currentCgpa,
    targetCgpa,
    totalGradePointsNeeded,
    currentGradePoints,
    deltaGradePointsNeeded,
    notes,
  };
}
