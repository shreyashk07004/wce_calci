import React, { useState, useMemo } from 'react';
import { checkAttendancePenalty } from '../utils/gradeCalculations';
import type { AttendancePenaltyResult } from '../types/grade';
import { saveHistoryItem } from '../utils/storage';
import { Clock, ShieldCheck, AlertTriangle, XCircle, CheckCircle2, Save, Copy } from 'lucide-react';

interface Props {
  onHistoryUpdate: () => void;
}

export const AttendanceChecker: React.FC<Props> = ({ onHistoryUpdate }) => {
  const [attendanceInput, setAttendanceInput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const validationState = useMemo(() => {
    const trimmed = attendanceInput.trim();
    if (trimmed === '') {
      return { isValid: false, errorMessage: '' };
    }
    const num = Number(trimmed);
    if (isNaN(num)) {
      return { isValid: false, errorMessage: 'Please enter a valid numeric percentage (0 to 100).' };
    }
    if (num < 0 || num > 100) {
      return { isValid: false, errorMessage: 'Attendance percentage must be between 0% and 100%.' };
    }
    return { isValid: true, errorMessage: '', numValue: num };
  }, [attendanceInput]);

  const penaltyResult: AttendancePenaltyResult | null = useMemo(() => {
    if (!validationState.isValid || validationState.numValue === undefined) {
      return null;
    }
    try {
      return checkAttendancePenalty(validationState.numValue);
    } catch (e) {
      return null;
    }
  }, [validationState]);

  const handlePreset = (val: number) => {
    setAttendanceInput(val.toString());
    setSavedSuccess(false);
  };

  const handleSaveToHistory = () => {
    if (!penaltyResult) return;
    saveHistoryItem({
      type: 'attendance',
      title: 'Attendance Grade Penalty',
      summary: `${penaltyResult.attendancePercentage}% Attendance → Cap: ${penaltyResult.maxAchievableGrade}`,
      details: penaltyResult.explanation,
    });
    onHistoryUpdate();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleCopy = () => {
    if (!penaltyResult) return;
    const textToCopy = `WCE Attendance Penalty Check:\nAttendance: ${penaltyResult.attendancePercentage}%\nMax Achievable Grade: ${penaltyResult.maxAchievableGrade} (${penaltyResult.maxPoints} pts)\nStatus: ${penaltyResult.explanation}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30 mb-2">
            <Clock className="w-3.5 h-3.5" />
            WCE Academic RR Section 04.04
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Attendance Grade-Penalty Checker</h2>
          <p className="text-slate-300 text-xs mt-1">
            Check official grade capping rules based on theory course attendance percentage.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-6 space-y-6 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md">
          <div>
            <label htmlFor="attendance-input" className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
              Course Attendance Percentage (%)
            </label>
            <div className="relative">
              <input
                id="attendance-input"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={attendanceInput}
                onChange={(e) => {
                  setAttendanceInput(e.target.value);
                  setSavedSuccess(false);
                }}
                placeholder="e.g. 68"
                className="w-full px-4 py-3.5 text-2xl font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg font-bold pointer-events-none">
                %
              </span>
            </div>

            {!validationState.isValid && validationState.errorMessage !== '' && (
              <div className="mt-3 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-3 rounded-lg border border-rose-200 dark:border-rose-900">
                {validationState.errorMessage}
              </div>
            )}
          </div>

          {/* Quick Presets */}
          <div>
            <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              Test Official Boundary Thresholds:
            </span>
            <div className="flex flex-wrap gap-2">
              {[80, 75, 72, 65, 55, 45].map((val) => (
                <button
                  key={val}
                  onClick={() => handlePreset(val)}
                  type="button"
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    validationState.numValue === val
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>

          {/* Thresholds Table Reference */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
            <span className="font-bold text-slate-900 dark:text-slate-200 block">
              Official Threshold Matrix (Section 04.04):
            </span>
            <div className="space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>≥ 75%</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">No Penalty (Cap: AA, 10 pts)</span>
              </div>
              <div className="flex justify-between">
                <span>70% to &lt;75%</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">Max Grade: BB (8 pts)</span>
              </div>
              <div className="flex justify-between">
                <span>60% to &lt;70%</span>
                <span className="font-bold text-orange-600 dark:text-orange-400">Max Grade: BC (7 pts)</span>
              </div>
              <div className="flex justify-between">
                <span>50% to &lt;60%</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">Max Grade: CC (6 pts)</span>
              </div>
              <div className="flex justify-between">
                <span>&lt; 50%</span>
                <span className="font-bold text-red-600 dark:text-red-400">XX Grade — Course Ineligible (0 pts)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Penalty Result */}
        <div className="lg:col-span-6">
          {penaltyResult ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Penalty Evaluation
                </h3>
                <span
                  className={`px-3 py-1 text-xs font-extrabold rounded-full border ${
                    !penaltyResult.hasPenalty
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300'
                      : penaltyResult.maxAchievableGrade === 'XX'
                      ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300'
                  }`}
                >
                  {!penaltyResult.hasPenalty ? 'NO PENALTY' : `GRADE CAPPED AT ${penaltyResult.maxAchievableGrade}`}
                </span>
              </div>

              {/* Big Result Grade Display */}
              <div className="text-center py-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-center gap-2">
                  {!penaltyResult.hasPenalty ? (
                    <ShieldCheck className="w-8 h-8 text-emerald-500" />
                  ) : penaltyResult.maxAchievableGrade === 'XX' ? (
                    <XCircle className="w-8 h-8 text-red-500" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-amber-500" />
                  )}
                  <span className="text-5xl font-black text-slate-900 dark:text-white">
                    {penaltyResult.maxAchievableGrade}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Maximum Achievable Grade ({penaltyResult.maxPoints} points)
                </div>
              </div>

              {/* Explanation Box */}
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs leading-relaxed font-medium text-slate-800 dark:text-slate-200">
                {penaltyResult.explanation}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={handleCopy}
                  type="button"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Result'}</span>
                </button>

                <button
                  onClick={handleSaveToHistory}
                  type="button"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white transition-all shadow-sm"
                >
                  {savedSuccess ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : <Save className="w-3.5 h-3.5" />}
                  <span>{savedSuccess ? 'Saved' : 'Save to History'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-8 text-center bg-slate-50/50 dark:bg-slate-800/20">
              <Clock className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3" />
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">Enter Attendance</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-1">
                Enter your percentage on the left to evaluate any applicable WCE grade cap.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
