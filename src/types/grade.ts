// Types for WCE Grade & CGPA Converter

export type GradeLetter = 'AA' | 'AB' | 'BB' | 'BC' | 'CC' | 'CD' | 'DD' | 'FF' | 'XX';

export interface GradeDefinition {
  grade: GradeLetter;
  points: number;
  description: string;
}

export interface CalculationHistoryItem {
  id: string;
  timestamp: string; // ISO string
  type: 'cgpa_to_percentage';
  title: string;
  summary: string;
  cgpa?: number;
  percentage?: number;
  details?: string;
}

export interface PercentageResult {
  cgpa: number;
  percentage: number;
  formula: string;
  isBelowValidRange: boolean;
  warningNote?: string;
}
