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
    if (!calculationResult) return;
    setIsExporting(true);
    await exportElementAsPng('cgpa-export-report-card', `WCE_CGPA_Conversion_${calculationResult.cgpa.toFixed(2)}`);
    setIsExporting(false);
  };

  const handleExportPdf = async () => {
    if (!calculationResult) return;
    setIsExporting(true);
    await exportElementAsPdf('cgpa-export-report-card', `WCE_CGPA_Conversion_${calculationResult.cgpa.toFixed(2)}`);
    setIsExporting(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-1 sm:px-0">
      {/* Top Banner / Headline */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-4 sm:p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-300 shrink-0" />
              WCE Official Formula (Section 16)
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              WCE CGPA to Percentage Converter
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Official WCE grade conversion & percentage calculator for Walchand College of Engineering, Sangli students based on Section 16 of the Academic Rules.
            </p>
          </div>
          <Link
            to="/how-its-calculated"
            className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-all backdrop-blur-md border border-white/20 shrink-0"
          >
            <HelpCircle className="w-4 h-4 text-blue-300 shrink-0" />
            <span>View Official Formula</span>
          </Link>
        </div>
      </div>

      {/* Main Calculator Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Input Form */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <label htmlFor="cgpa-input" className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-2">
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
                  className={`w-full pl-4 pr-16 py-3 sm:py-3.5 text-xl sm:text-2xl font-bold rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    !validationState.isValid
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs sm:text-sm font-bold pointer-events-none select-none">
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
              <div className="grid grid-cols-4 sm:flex sm:flex-wrap gap-2">
                {[6.25, 6.75, 7.25, 7.75, 8.25, 8.50, 9.00].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handlePresetClick(preset)}
                    type="button"
                    className={`px-2.5 sm:px-3 py-2 min-h-[40px] rounded-lg text-xs font-semibold transition-colors border flex items-center justify-center ${
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
              <p className="font-mono text-blue-700 dark:text-blue-400 font-semibold text-xs sm:text-sm break-all">
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
                className="bg-gradient-to-b from-slate-50 to-blue-50/40 dark:from-slate-800/80 dark:to-slate-800/40 rounded-2xl p-4 sm:p-6 border border-blue-200/80 dark:border-slate-700 shadow-inner space-y-5 sm:space-y-6"
              >
                {/* Result Header */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0">
                      %
                    </div>
                    <div>
                      <h2 className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Calculated Percentage
                      </h2>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        WCE Grade Conversion Result
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-md border border-emerald-200 dark:border-emerald-800 shrink-0">
                    Live Validated
                  </span>
                </div>

                {/* Big Result Display */}
                <div className="text-center py-2 space-y-2">
                  <div className="text-4xl sm:text-6xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
                    {calculationResult.percentage.toFixed(2)}%
                  </div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5 flex-wrap">
                    <span>Equivalent percentage for CGPA</span>
                    <span className="font-extrabold text-slate-900 dark:text-white px-2 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-700/80">
                      {calculationResult.cgpa.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Substituted Formula Breakdown */}
                <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 sm:p-4 border border-slate-200 dark:border-slate-700 shadow-sm space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Formula Substitution:
                  </span>
                  <div className="font-mono text-xs sm:text-base font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 overflow-x-auto text-center break-words">
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
                <div className="grid grid-cols-4 gap-1.5 sm:gap-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={handleCopy}
                    type="button"
                    title="Copy calculation summary to clipboard"
                    className="flex flex-col items-center justify-center gap-1.5 p-2 sm:p-2.5 min-h-[56px] w-full rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all shadow-sm active:scale-95 text-center leading-none"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> : <Copy className="w-4 h-4 shrink-0" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handleSaveToHistory}
                    type="button"
                    title="Save calculation to browser history"
                    className="flex flex-col items-center justify-center gap-1.5 p-2 sm:p-2.5 min-h-[56px] w-full rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all shadow-sm active:scale-95 text-center leading-none"
                  >
                    {savedSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> : <Save className="w-4 h-4 shrink-0" />}
                    <span>{savedSuccess ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    onClick={handleExportPng}
                    disabled={isExporting}
                    type="button"
                    title="Download clean report image (PNG)"
                    className="flex flex-col items-center justify-center gap-1.5 p-2 sm:p-2.5 min-h-[56px] w-full rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all shadow-sm active:scale-95 text-center leading-none"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>Image</span>
                  </button>

                  <button
                    onClick={handleExportPdf}
                    disabled={isExporting}
                    type="button"
                    title="Download clean report document (PDF)"
                    className="flex flex-col items-center justify-center gap-1.5 p-2 sm:p-2.5 min-h-[56px] w-full rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 transition-all shadow-sm active:scale-95 text-center leading-none"
                  >
                    <Download className="w-4 h-4 shrink-0" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[250px] sm:min-h-[300px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-center bg-slate-50/50 dark:bg-slate-800/20">
                <Calculator className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 dark:text-slate-700 mb-3" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                  Ready to Calculate
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-1 leading-relaxed">
                  Enter a valid CGPA between 0.00 and 10.00 on the left to see your instant percentage result and conversion formula.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Off-Screen Dedicated PDF/PNG Export Template (Captured by html2canvas) */}
      {calculationResult && (
        <div
          id="cgpa-export-report-card"
          className="fixed -left-[9999px] top-0 w-[800px] bg-white text-slate-900 p-8 space-y-6 font-sans border border-slate-200 shadow-none"
          style={{ backgroundColor: '#ffffff', color: '#0f172a' }}
        >
          {/* 1. Header Section */}
          <div className="flex items-center justify-between border-b-2 border-blue-600 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center font-black text-xl tracking-tighter shrink-0">
                WCE
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  WCE CGPA to Percentage Converter
                </h1>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  Official Grade Conversion Report • Walchand College of Engineering, Sangli
                </p>
              </div>
            </div>
            <div className="flex items-center shrink-0">
              <span className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-800 text-xs font-bold rounded-lg border border-blue-200/80">
                Official RR 2023-24
              </span>
            </div>
          </div>

          {/* 2. Core Result Section */}
          <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 text-center space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">
              Grade Conversion Summary
            </span>
            <div className="flex items-center justify-center gap-4 py-1">
              {/* CGPA Box */}
              <div className="flex flex-col items-center justify-center border-2 border-slate-300 rounded-xl p-4 bg-white min-w-[200px] min-h-[96px] shadow-sm">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Cumulative CGPA
                </span>
                <span className="text-3xl font-black text-slate-900 leading-none">
                  {calculationResult.cgpa.toFixed(2)}
                </span>
              </div>

              {/* Centered Separator Arrow */}
              <div className="flex items-center justify-center text-3xl font-black text-blue-600 px-2 shrink-0 select-none">
                →
              </div>

              {/* Percentage Box */}
              <div className="flex flex-col items-center justify-center border-2 border-blue-400 rounded-xl p-4 bg-blue-50/80 min-w-[200px] min-h-[96px] shadow-sm">
                <span className="text-[11px] font-bold text-blue-800/80 uppercase tracking-wider block mb-1">
                  Calculated Percentage
                </span>
                <span className="text-3xl font-black text-blue-700 leading-none">
                  {calculationResult.percentage.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          {/* 3. Formula Breakdown Section */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Official Formula & Substitution Breakdown:
            </span>
            <div className="font-mono text-base font-bold text-slate-900 bg-slate-100 p-4 rounded-xl border border-slate-200 text-center">
              {calculationResult.formula}
            </div>
          </div>

          {/* 4. Citation Line */}
          <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 text-xs text-slate-700 space-y-1.5">
            <span className="font-bold text-blue-900 block text-xs uppercase tracking-wider">
              Official Regulation Citation:
            </span>
            <p className="text-slate-600 leading-relaxed text-xs">
              Calculated using the official formula defined in Section 16 of the Walchand College of Engineering (WCE), Sangli <i>Academic and Examination Rules and Regulations 2023-24</i>.
            </p>
          </div>

          {/* 5. Footer Section */}
          <div className="pt-5 border-t border-slate-200 space-y-3 text-xs text-slate-500">
            <div className="flex items-center justify-between font-medium">
              <span>Report Generated: {new Date().toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</span>
              <span className="font-bold text-blue-700">wce-cgpa-to-percentage.vercel.app</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <b>Disclaimer:</b> This is an unofficial, independently built student tool. Not affiliated with or endorsed by Walchand College of Engineering, Sangli. Always verify official results and transcripts with the WCE Examination Section.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
