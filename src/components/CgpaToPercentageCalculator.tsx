import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { calculateCgpaToPercentage } from '../utils/gradeCalculations';
import type { PercentageResult } from '../types/grade';
import { saveHistoryItem } from '../utils/storage';
import { exportElementAsPdf, exportElementAsPng } from '../utils/pdfExport';
import { CheckCircle2, AlertTriangle, Copy, FileSpreadsheet, Download, Save } from 'lucide-react';

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
    <div className="space-y-6 max-w-4xl mx-auto px-1 sm:px-0 font-sans">
      {/* Official Ledger Reference & Editorial Page Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800 space-y-1.5">
        <div className="text-[11px] text-[#8D5B0F] dark:text-[#DE9F42] font-sans font-medium tracking-wide">
          DOCUMENT REF: WCE-RR-2023-24 // SECTION 16 // GRADE CONVERSION
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          CGPA to Percentage Converter
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Official grade conversion calculator for Walchand College of Engineering, Sangli students.
        </p>
      </div>

      {/* Main Conversion Section */}
      <div className="pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Form & Presets */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <label htmlFor="cgpa-input" className="block text-xs sm:text-sm font-sans font-bold text-slate-900 dark:text-white mb-2">
                Enter your CGPA (0.00 – 10.00) <span className="text-[#8D5B0F] dark:text-[#DE9F42]">*</span>
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
                  className={`w-full pl-4 pr-16 py-3 text-xl sm:text-2xl font-mono font-bold rounded-sm border bg-white dark:bg-[#242933] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-colors ${
                    !validationState.isValid
                      ? 'border-red-500 dark:border-red-600 focus:ring-1 focus:ring-red-500/40 bg-red-50/30 dark:bg-red-950/20'
                      : 'border-slate-300 dark:border-slate-700 focus:border-[#8D5B0F] dark:focus:border-[#DE9F42] focus:ring-1 focus:ring-[#8D5B0F]/20'
                  }`}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs sm:text-sm font-mono font-semibold pointer-events-none select-none">
                  / 10.00
                </div>
              </div>

              {/* Input Error Message: Distinct Red alert distinct from Ochre brand */}
              {!validationState.isValid && validationState.errorMessage !== '' && (
                <div className="mt-3 flex items-start gap-2.5 text-xs font-sans text-red-900 dark:text-red-200 bg-red-50 dark:bg-red-950/60 p-3 rounded-sm border border-red-300 dark:border-red-800">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
                  <span className="leading-normal">{validationState.errorMessage}</span>
                </div>
              )}
            </div>

            {/* Quick Presets */}
            <div>
              <span className="block text-xs font-sans font-semibold text-slate-600 dark:text-slate-400 mb-2">
                Quick Test Values (Official WCE Verification Table):
              </span>
              <div className="grid grid-cols-4 sm:flex sm:flex-wrap gap-2">
                {[6.25, 6.75, 7.25, 7.75, 8.25, 8.50, 9.00].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handlePresetClick(preset)}
                    type="button"
                    className={`px-3 py-1.5 min-h-[36px] rounded-sm text-xs font-mono font-semibold transition-colors border flex items-center justify-center ${
                      validationState.numValue === preset
                        ? 'bg-[#8D5B0F] dark:bg-[#DE9F42] text-white dark:text-[#1B1F27] border-[#8D5B0F] dark:border-[#DE9F42]'
                        : 'bg-transparent text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-[#242933]'
                    }`}
                  >
                    {preset.toFixed(2)}
                  </button>
                ))}
              </div>
            </div>

            {/* Marginalia / Rule Note */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs font-sans space-y-1.5 text-slate-500 dark:text-slate-400">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Section 16 Statutory Note:</span>
                <Link
                  to="/how-its-calculated"
                  className="text-[#8D5B0F] dark:text-[#DE9F42] hover:underline font-medium"
                >
                  Full regulations →
                </Link>
              </div>
              <p className="leading-relaxed text-[11.5px]">
                Valid for degree candidates with CGPA ≥ 5.00 (Section 09.01). Converted percentages are calculated to two decimal places.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Mathematical Centerpiece & Live Result */}
          <div className="lg:col-span-6">
            {calculationResult ? (
              <div
                id="cgpa-report-card"
                className="bg-slate-50/70 dark:bg-[#242933] rounded-sm p-5 sm:p-6 border border-slate-200 dark:border-slate-700/80 space-y-5 font-sans"
              >
                {/* Mathematical Plate Centerpiece */}
                <div className="space-y-2 border-b border-slate-200 dark:border-slate-700/80 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-sans font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Section 16 Evaluation Plate
                    </span>
                    <span className="text-[11px] font-sans text-emerald-800 dark:text-emerald-300">
                      ● Active
                    </span>
                  </div>

                  {/* Interactive Dynamic Formula Expression */}
                  <div className="bg-white dark:bg-[#1B1F27] p-3.5 rounded-sm border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center leading-loose">
                    <div className="text-slate-500 dark:text-slate-400 text-xs pb-1">
                      Percentage = (10.00 × CGPA) − 7.50
                    </div>
                    <div className="text-slate-900 dark:text-slate-100 font-bold text-sm sm:text-base pt-0.5">
                      = (10.00 × <span className="text-[#8D5B0F] dark:text-[#DE9F42] underline decoration-[#8D5B0F]/40 dark:decoration-[#DE9F42]/40 decoration-2">{calculationResult.cgpa.toFixed(2)}</span>) − 7.50
                    </div>
                  </div>
                </div>

                {/* Primary Equivalent Result */}
                <div className="text-center py-1 space-y-0.5">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                    Calculated Percentage Equivalent
                  </span>
                  <div className="text-4xl sm:text-5xl font-mono font-bold text-[#8D5B0F] dark:text-[#DE9F42] tracking-tight">
                    {calculationResult.percentage.toFixed(2)}%
                  </div>
                </div>

                {/* Warning note if CGPA < 5.00 */}
                {calculationResult.isBelowValidRange && (
                  <div className="flex items-start gap-2.5 text-xs text-red-900 dark:text-red-200 bg-red-50 dark:bg-red-950/60 p-3 rounded-sm border border-red-300 dark:border-red-800">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
                    <span>{calculationResult.warningNote}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700/80">
                  <button
                    onClick={handleCopy}
                    type="button"
                    title="Copy calculation summary to clipboard"
                    className="flex flex-col items-center justify-center gap-1 p-2 min-h-[46px] w-full rounded-sm text-xs font-semibold bg-white dark:bg-[#1B1F27] hover:bg-slate-100 dark:hover:bg-[#2A303C] text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors text-center leading-none"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <Copy className="w-3.5 h-3.5 shrink-0" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handleSaveToHistory}
                    type="button"
                    title="Save calculation to browser history"
                    className="flex flex-col items-center justify-center gap-1 p-2 min-h-[46px] w-full rounded-sm text-xs font-semibold bg-white dark:bg-[#1B1F27] hover:bg-slate-100 dark:hover:bg-[#2A303C] text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors text-center leading-none"
                  >
                    {savedSuccess ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <Save className="w-3.5 h-3.5 shrink-0" />}
                    <span>{savedSuccess ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    onClick={handleExportPng}
                    disabled={isExporting}
                    type="button"
                    title="Download clean report image (PNG)"
                    className="flex flex-col items-center justify-center gap-1 p-2 min-h-[46px] w-full rounded-sm text-xs font-semibold bg-white dark:bg-[#1B1F27] hover:bg-slate-100 dark:hover:bg-[#2A303C] text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors text-center leading-none"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-[#8D5B0F] dark:text-[#DE9F42] shrink-0" />
                    <span>Image</span>
                  </button>

                  <button
                    onClick={handleExportPdf}
                    disabled={isExporting}
                    type="button"
                    title="Download clean report document (PDF)"
                    className="flex flex-col items-center justify-center gap-1 p-2 min-h-[46px] w-full rounded-sm text-xs font-semibold bg-[#8D5B0F] hover:bg-[#6F4506] dark:bg-[#DE9F42] dark:hover:bg-[#C98A2C] text-white dark:text-[#1B1F27] border border-[#8D5B0F] dark:border-[#DE9F42] transition-colors text-center leading-none"
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 sm:py-16 text-slate-500 dark:text-slate-400 font-sans space-y-2 border-l-2 border-slate-200 dark:border-slate-800 pl-6 sm:pl-8">
                <p className="text-xs sm:text-sm font-serif italic text-slate-700 dark:text-slate-300">
                  "Enter a CGPA value on the left to compute the official percentage and step-by-step formula breakdown."
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  Formula is evaluated automatically in real time in accordance with WCE examination rules.
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
          <div className="flex items-center justify-between border-b-2 border-[#8D5B0F] pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-fit min-w-[56px] h-12 px-3.5 py-2 rounded-sm bg-[#8D5B0F] text-white flex items-center justify-center text-center font-serif font-bold text-lg leading-none shrink-0 select-none">
                WCE
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-[11px] font-sans font-medium text-[#8D5B0F] tracking-wide">
                  DOCUMENT REF: WCE-RR-2023-24 // SECTION 16
                </div>
                <h1 className="text-xl font-serif font-bold text-slate-900 tracking-tight leading-snug">
                  Official Grade Conversion Report
                </h1>
                <p className="text-xs text-slate-500 font-sans mt-0.5 leading-normal">
                  Walchand College of Engineering, Sangli
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center shrink-0">
              <span className="text-xs font-sans text-[#8D5B0F] font-semibold border-b border-[#8D5B0F]/40 pb-0.5">
                Regulation 2023-24
              </span>
            </div>
          </div>

          {/* 2. Core Result Section */}
          <div className="bg-slate-50 rounded-sm p-6 border border-slate-200 text-center space-y-4 font-sans">
            <span className="text-xs font-bold text-slate-600 block">
              Grade Conversion Summary
            </span>
            <div className="flex items-center justify-center gap-4 py-1">
              {/* CGPA Box */}
              <div className="flex flex-col items-center justify-center border border-slate-300 rounded-sm p-4 bg-white min-w-[200px] min-h-[96px] text-center">
                <span className="text-xs font-medium text-slate-500 block mb-1">
                  Cumulative CGPA
                </span>
                <span className="text-3xl font-mono font-bold text-slate-900 leading-none">
                  {calculationResult.cgpa.toFixed(2)}
                </span>
              </div>

              {/* Centered Separator Arrow */}
              <div className="flex items-center justify-center text-2xl font-bold text-[#8D5B0F] px-2 shrink-0 select-none leading-none">
                →
              </div>

              {/* Percentage Box */}
              <div className="flex flex-col items-center justify-center border border-[#8D5B0F]/40 rounded-sm p-4 bg-amber-50/40 min-w-[200px] min-h-[96px] text-center">
                <span className="text-xs font-medium text-[#8D5B0F] block mb-1">
                  Calculated Percentage
                </span>
                <span className="text-3xl font-mono font-bold text-[#8D5B0F] leading-none">
                  {calculationResult.percentage.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          {/* 3. Formula Breakdown Section */}
          <div className="bg-white rounded-sm p-6 border border-slate-200 space-y-3 font-sans">
            <span className="text-xs font-bold text-slate-700 block">
              Official Formula & Substitution Breakdown:
            </span>
            <div className="font-mono text-base font-bold text-slate-900 bg-slate-50 p-4 rounded-sm border border-slate-200 text-center">
              {calculationResult.formula}
            </div>
          </div>

          {/* 4. Citation Line */}
          <div className="bg-slate-50 rounded-sm p-5 border border-slate-200 text-xs text-slate-700 space-y-1 font-sans">
            <span className="font-bold text-slate-900 block text-xs">
              Official Regulation Citation:
            </span>
            <p className="text-slate-600 leading-relaxed text-xs">
              Calculated using the official formula defined in Section 16 of the Walchand College of Engineering (WCE), Sangli <i>Academic and Examination Rules and Regulations 2023-24</i>.
            </p>
          </div>

          {/* 5. Footer Section */}
          <div className="pt-5 border-t border-slate-200 space-y-3 text-xs text-slate-500 font-sans">
            <div className="flex items-center justify-between font-medium">
              <span>Report Generated: {new Date().toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</span>
              <span className="font-semibold text-[#8D5B0F]">wce-cgpa-to-percentage.vercel.app</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 bg-slate-50 p-3.5 rounded-sm border border-slate-200">
              <b>Disclaimer:</b> This is an unofficial, independently built student tool. Not affiliated with or endorsed by Walchand College of Engineering, Sangli. Always verify official results and transcripts with the WCE Examination Section.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
