import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { calculateCgpaToPercentage } from '../utils/gradeCalculations';
import type { PercentageResult } from '../types/grade';
import { saveHistoryItem } from '../utils/storage';
import { exportElementAsPdf, exportElementAsPng } from '../utils/pdfExport';
import { Calculator, CheckCircle2, AlertTriangle, Copy, FileSpreadsheet, Download, Sparkles, HelpCircle, Save } from 'lucide-react';

interface Props {
  onHistoryUpdate: () => void;
}

export const CgpaToPercentageCalculator: React.FC<Props> = ({ onHistoryUpdate }) => {
  const [cgpaInput, setCgpaInput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Validation & Calculation logic
  const validationState = useMemo(() => {
    const trimmed = cgpaInput.trim();
    if (trimmed === '') {
      return { isValid: false, errorMessage: '' };
    }
    const num = Number(trimmed);
    if (isNaN(num)) {
      return { isValid: false, errorMessage: 'Invalid input. Please enter a numerical value (e.g., 8.36).' };
    }
    if (num < 0) {
      return { isValid: false, errorMessage: 'CGPA cannot be negative. Grade points range from 0.00 to 10.00.' };
    }
    if (num > 10.00) {
      return { isValid: false, errorMessage: 'CGPA cannot exceed 10.00. WCE maximum grade point is 10.00.' };
    }
    return { isValid: true, errorMessage: '', numValue: num };
  }, [cgpaInput]);

  const calculationResult: PercentageResult | null = useMemo(() => {
    if (!validationState.isValid || validationState.numValue === undefined) {
      return null;
    }
    try {
      return calculateCgpaToPercentage(validationState.numValue);
    } catch (e) {
      return null;
    }
  }, [validationState]);

  const handlePresetClick = (preset: number) => {
    setCgpaInput(preset.toFixed(2));
    setSavedSuccess(false);
  };

  const handleCopy = () => {
    if (!calculationResult) return;
    const textToCopy = `WCE Official Conversion:\nCGPA: ${calculationResult.cgpa.toFixed(2)}\nPercentage: ${calculationResult.percentage.toFixed(2)}%\nFormula: ${calculationResult.formula}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveToHistory = () => {
    if (!calculationResult) return;
    saveHistoryItem({
      type: 'cgpa_to_percentage',
      title: 'CGPA to Percentage',
      summary: `CGPA ${calculationResult.cgpa.toFixed(2)} → ${calculationResult.percentage.toFixed(2)}%`,
      cgpa: calculationResult.cgpa,
      percentage: calculationResult.percentage,
      details: calculationResult.formula,
    });
    onHistoryUpdate();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportPng = async () => {
    setIsExporting(true);
    await exportElementAsPng('cgpa-report-card', `WCE_CGPA_Conversion_${calculationResult?.cgpa.toFixed(2)}`);
    setIsExporting(false);
  };

  const handleExportPdf = async () => {
    setIsExporting(true);
    await exportElementAsPdf('cgpa-report-card', `WCE_CGPA_Conversion_${calculationResult?.cgpa.toFixed(2)}`);
    setIsExporting(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner / Headline */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              WCE Official Formula (Section 16)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              CGPA to Percentage Converter
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Calculate your exact percentage using the official formula defined in WCE’s Academic & Examination Rules and Regulations.
            </p>
          </div>
          <Link
            to="/how-its-calculated"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-all backdrop-blur-md border border-white/20"
          >
            <HelpCircle className="w-4 h-4 text-blue-300" />
            View Official Formula
          </Link>
        </div>
      </div>

      {/* Main Calculator Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Form */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <label htmlFor="cgpa-input" className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                Enter your CGPA (0.00 - 10.00) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="cgpa-input"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={cgpaInput}
                  onChange={(e) => {
                    setCgpaInput(e.target.value);
                    setSavedSuccess(false);
                  }}
                  placeholder="e.g. 8.36"
                  className={`w-full px-4 py-3.5 text-2xl font-bold rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    !validationState.isValid
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold pointer-events-none">
                  / 10.00
                </div>
              </div>

              {/* Error Message */}
              {!validationState.isValid && validationState.errorMessage !== '' && (
                <div className="mt-3 flex items-start gap-2 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-3 rounded-lg border border-rose-200 dark:border-rose-900">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{validationState.errorMessage}</span>
                </div>
              )}
            </div>

            {/* Quick Presets (Official Verification Table Values + Common CGPAs) */}
            <div>
              <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Quick Test Values (Official WCE Verification Table):
              </span>
              <div className="flex flex-wrap gap-2">
                {[6.25, 6.75, 7.25, 7.75, 8.25, 8.50, 9.00].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handlePresetClick(preset)}
                    type="button"
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                      validationState.numValue === preset
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {preset.toFixed(2)}
                  </button>
                ))}
              </div>
            </div>

            {/* Formula Reference Box */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-200">Official WCE Formula (Section 16):</span>
              <p className="font-mono text-blue-700 dark:text-blue-400 font-semibold text-sm">
                Percentage = (10.00 × CGPA) − 7.50
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Valid officially for CGPA ≥ 5.00. Rounded to 2 decimal places.
              </p>
            </div>
          </div>

          {/* Right Column: Live Output Report Card */}
          <div className="lg:col-span-6">
            {calculationResult ? (
              <div
                id="cgpa-report-card"
                className="bg-gradient-to-b from-slate-50 to-blue-50/40 dark:from-slate-800/80 dark:to-slate-800/40 rounded-2xl p-6 border border-blue-200/80 dark:border-slate-700 shadow-inner space-y-6"
              >
                {/* Result Header */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                      %
                    </div>
                    <div>
                      <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Calculated Percentage
                      </h2>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        WCE Grade Conversion Result
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-md border border-emerald-200 dark:border-emerald-800">
                    Live Validated
                  </span>
                </div>

                {/* Big Result Display */}
                <div className="text-center py-2 space-y-1">
                  <div className="text-5xl sm:text-6xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
                    {calculationResult.percentage.toFixed(2)}%
                  </div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Equivalent percentage for CGPA <span className="font-bold text-slate-900 dark:text-white">{calculationResult.cgpa.toFixed(2)}</span>
                  </div>
                </div>

                {/* Substituted Formula Breakdown */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Formula Substitution:
                  </span>
                  <div className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 overflow-x-auto text-center">
                    {calculationResult.formula}
                  </div>
                </div>

                {/* Warning note if CGPA < 5.00 */}
                {calculationResult.isBelowValidRange && (
                  <div className="flex items-start gap-2 text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 p-3.5 rounded-xl border border-amber-200 dark:border-amber-800">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                    <span>{calculationResult.warningNote}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={handleCopy}
                    type="button"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all shadow-sm"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handleSaveToHistory}
                    type="button"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all shadow-sm"
                  >
                    {savedSuccess ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{savedSuccess ? 'Saved!' : 'Save'}</span>
                  </button>

                  <button
                    onClick={handleExportPng}
                    disabled={isExporting}
                    type="button"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all shadow-sm"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-blue-500" />
                    <span>PNG</span>
                  </button>

                  <button
                    onClick={handleExportPdf}
                    disabled={isExporting}
                    type="button"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-8 text-center bg-slate-50/50 dark:bg-slate-800/20">
                <Calculator className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3" />
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Ready to Calculate
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-1">
                  Enter a valid CGPA between 0.00 and 10.00 on the left to see your instant percentage result and conversion formula.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
