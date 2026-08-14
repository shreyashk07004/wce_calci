// Types for WCE Grade & CGPA Calculator

export type GradeLetter = 'AA' | 'AB' | 'BB' | 'BC' | 'CC' | 'CD' | 'DD' | 'FF' | 'XX';

export interface GradeDefinition {
  grade: GradeLetter;
  points: number;
  description: string;
}

export interface Course {
  id: string;
  name: string;
  credits: number;
  grade: GradeLetter;
}

export interface Semester {
  id: string;
  name: string; // e.g. "Semester 1", "FY Sem 1"
  sgpa: number;
  credits: number;
}

export interface CalculationHistoryItem {
  id: string;
  timestamp: string; // ISO string
  type: 'cgpa_to_percentage' | 'sgpa' | 'multisem_cgpa' | 'attendance';
  title: string;
  summary: string;
  cgpa?: number;
  percentage?: number;
  details?: string;
}

export interface AttendancePenaltyResult {
  attendancePercentage: number;
  maxAchievableGrade: GradeLetter;
  maxPoints: number;
  hasPenalty: boolean;
  explanation: string;
  badgeColor: string;
}

export interface PercentageResult {
  cgpa: number;
  percentage: number;
  formula: string;
  isBelowValidRange: boolean;
  warningNote?: string;
}
