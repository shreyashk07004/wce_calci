import React, { useState, useMemo } from 'react';
import type { Semester } from '../types/grade';
import { calculateMultiSemesterCgpa, calculateCgpaToPercentage } from '../utils/gradeCalculations';
import { saveHistoryItem } from '../utils/storage';
import { exportElementAsPdf, exportElementAsPng } from '../utils/pdfExport';
import { Award, Plus, Trash2, Save, Copy, FileSpreadsheet, Download, RotateCcw, CheckCircle2, Info } from 'lucide-react';

interface Props {
  onHistoryUpdate: () => void;
}

interface SemesterRow {
  id: string;
  name: string;
  sgpa: number | '';
  credits: number | '';
}

const DEFAULT_SEMESTERS: SemesterRow[] = [
  { id: '1', name: 'Semester 1', sgpa: '', credits: '' },
  { id: '2', name: 'Semester 2', sgpa: '', credits: '' },
  { id: '3', name: 'Semester 3', sgpa: '', credits: '' },
  { id: '4', name: 'Semester 4', sgpa: '', credits: '' },
];

export const MultiSemesterCgpaCalculator: React.FC<Props> = ({ onHistoryUpdate }) => {
  const [semesters, setSemesters] = useState<SemesterRow[]>(DEFAULT_SEMESTERS);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const validSemesters: Semester[] = useMemo(() => {
    return semesters
      .filter(
        (s) =>
          typeof s.sgpa === 'number' &&
          s.sgpa >= 0 &&
          s.sgpa <= 10 &&
          typeof s.credits === 'number' &&
          s.credits > 0
      )
      .map((s) => ({
        id: s.id,
        name: s.name,
        sgpa: s.sgpa as number,
        credits: s.credits as number,
      }));
  }, [semesters]);

  const { cgpa, totalCredits } = useMemo(
    () => calculateMultiSemesterCgpa(validSemesters),
    [validSemesters]
  );

  const hasCalculatedResult = validSemesters.length > 0 && totalCredits > 0;

  const percentageResult = useMemo(() => {
    if (hasCalculatedResult && cgpa > 0) {
      try {
        return calculateCgpaToPercentage(cgpa);
      } catch (e) {
        return null;
      }
    }
    return null;
  }, [hasCalculatedResult, cgpa]);

  const handleAddSemester = () => {
    const newSem: SemesterRow = {
      id: Date.now().toString(),
      name: `Semester ${semesters.length + 1}`,
      sgpa: '',
      credits: '',
    };
    setSemesters([...semesters, newSem]);
  };

  const handleRemoveSemester = (id: string) => {
    if (semesters.length <= 1) {
      alert('You must keep at least one semester.');
      return;
    }
    setSemesters(semesters.filter((s) => s.id !== id));
  };

  const handleSemesterChange = (id: string, field: keyof SemesterRow, value: string | number) => {
    setSemesters(
      semesters.map((s) => {
        if (s.id === id) {
          return { ...s, [field]: value };
        }
        return s;
      })
    );
  };

  const handleReset = () => {
    setSemesters([
      { id: Date.now().toString() + '-1', name: 'Semester 1', sgpa: '', credits: '' },
      { id: Date.now().toString() + '-2', name: 'Semester 2', sgpa: '', credits: '' },
      { id: Date.now().toString() + '-3', name: 'Semester 3', sgpa: '', credits: '' },
      { id: Date.now().toString() + '-4', name: 'Semester 4', sgpa: '', credits: '' },
    ]);
  };

  const handleSaveToHistory = () => {
    if (!hasCalculatedResult) return;
    saveHistoryItem({
      type: 'multisem_cgpa',
      title: 'Multi-Semester CGPA',
      summary: `CGPA ${cgpa.toFixed(2)} across ${validSemesters.length} semesters (${totalCredits} credits)`,
      cgpa,
      percentage: percentageResult?.percentage,
      details: `${validSemesters.length} semesters completed`,
    });
    onHistoryUpdate();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleCopy = () => {
    if (!hasCalculatedResult) return;
    const textToCopy = `WCE Cumulative Grade Point Average (CGPA):\nCGPA: ${cgpa.toFixed(2)}\nPercentage: ${percentageResult ? percentageResult.percentage.toFixed(2) + '%' : 'N/A'}\nTotal Credits: ${totalCredits}\nSemesters: ${validSemesters.length}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleExportPng = async () => {
    if (!hasCalculatedResult) return;
    setIsExporting(true);
    await exportElementAsPng('multisem-report-card', `WCE_MultiSem_CGPA_${cgpa.toFixed(2)}`);
    setIsExporting(false);
  };

  const handleExportPdf = async () => {
    if (!hasCalculatedResult) return;
    setIsExporting(true);
    await exportElementAsPdf('multisem-report-card', `WCE_MultiSem_CGPA_${cgpa.toFixed(2)}`);
    setIsExporting(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-sky-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-400/30 mb-2">
            <Award className="w-3.5 h-3.5" />
            WCE Academic RR Section 16
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Multi-Semester CGPA Calculator</h2>
          <p className="text-slate-300 text-xs mt-1">
            Calculate your cumulative CGPA across all completed semesters weighted by respective credits.
          </p>
        </div>
      </div>

      {/* Grade Entry Reminder Callout */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-800 dark:text-blue-300">
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
        <span className="font-semibold">
          Enter your official grade/SGPA as shown on your WCE grade card — not an estimate.
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Semester Inputs List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Completed Semesters ({semesters.length})
              </h3>
              <button
                onClick={handleReset}
                type="button"
                className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1 px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear All
              </button>
            </div>

            <div className="space-y-3">
              {semesters.map((sem, index) => (
                <div
                  key={sem.id}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 transition-all hover:border-sky-300 dark:hover:border-sky-700"
                >
                  <span className="text-xs font-bold text-slate-400 w-5 shrink-0 self-center hidden sm:inline">
                    #{index + 1}
                  </span>

                  <input
                    type="text"
                    value={sem.name}
                    onChange={(e) => handleSemesterChange(sem.id, 'name', e.target.value)}
                    placeholder={`Semester ${index + 1}`}
                    className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-slate-400"
                  />

                  <div className="flex items-center gap-2">
                    {/* SGPA Input */}
                    <div className="w-28 shrink-0">
                      <label className="text-[10px] text-slate-400 font-bold block mb-0.5">SGPA</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.01"
                        value={sem.sgpa}
                        onChange={(e) => {
                          const val = e.target.value;
                          handleSemesterChange(sem.id, 'sgpa', val === '' ? '' : parseFloat(val) || '');
                        }}
                        placeholder="e.g. 8.50"
                        className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-center placeholder-slate-400"
                      />
                    </div>

                    {/* Credits Input */}
                    <div className="w-24 shrink-0">
                      <label className="text-[10px] text-slate-400 font-bold block mb-0.5">Credits</label>
                      <input
                        type="number"
                        min="1"
                        max="40"
                        step="0.5"
                        value={sem.credits}
                        onChange={(e) => {
                          const val = e.target.value;
                          handleSemesterChange(sem.id, 'credits', val === '' ? '' : parseFloat(val) || '');
                        }}
                        placeholder="e.g. 20"
                        className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-center placeholder-slate-400"
                      />
                    </div>

                    <button
                      onClick={() => handleRemoveSemester(sem.id)}
                      type="button"
                      aria-label="Remove Semester"
                      className="p-2 mt-4 sm:mt-0 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddSemester}
              type="button"
              className="mt-4 w-full py-3 rounded-xl border-2 border-dashed border-sky-300 dark:border-sky-800 hover:border-sky-500 text-sky-600 dark:text-sky-400 font-semibold text-xs flex items-center justify-center gap-2 transition-all bg-sky-50/50 dark:bg-slate-800/30"
            >
              <Plus className="w-4 h-4" />
              Add Completed Semester
            </button>
          </div>
        </div>

        {/* CGPA Output Card */}
        <div className="lg:col-span-5">
          {hasCalculatedResult ? (
            <div
              id="multisem-report-card"
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Overall Result
                  </h3>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Cumulative Grade Point Average
                  </p>
                </div>
                <span className="px-2.5 py-1 text-[11px] font-bold bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 rounded-md">
                  Multi-Semester
                </span>
              </div>

              {/* Big Result Display */}
              <div className="text-center py-4 bg-gradient-to-b from-sky-50 to-blue-50/50 dark:from-slate-800/80 dark:to-slate-800/40 rounded-2xl border border-sky-100 dark:border-slate-700">
                <div className="text-6xl font-black text-sky-600 dark:text-sky-400 tracking-tight">
                  {cgpa.toFixed(2)}
                </div>
                <div className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-2">
                  Cumulative CGPA
                </div>
                {percentageResult && (
                  <div className="inline-block mt-2 px-3 py-1 bg-white dark:bg-slate-900 rounded-full border border-sky-200 dark:border-sky-800 text-xs font-extrabold text-blue-700 dark:text-blue-400">
                    Equivalent to {percentageResult.percentage.toFixed(2)}%
                  </div>
                )}
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Semesters</span>
                  <span className="text-lg font-black text-slate-900 dark:text-white">{validSemesters.length}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Credits</span>
                  <span className="text-lg font-black text-slate-900 dark:text-white">{totalCredits}</span>
                </div>
              </div>

              {/* Formula Explanation */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <span className="font-bold text-slate-900 dark:text-white">CGPA Formula (Section 16):</span>
                <p className="font-mono text-slate-600 dark:text-slate-300 text-[11px]">
                  CGPA = Σ(Semester SGPA × Semester Credits) / Σ(Total Credits)
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={handleCopy}
                  type="button"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleSaveToHistory}
                  type="button"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all"
                >
                  {savedSuccess ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Save className="w-3.5 h-3.5" />}
                  <span>{savedSuccess ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={handleExportPng}
                  disabled={isExporting}
                  type="button"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-blue-500" />
                  <span>PNG</span>
                </button>

                <button
                  onClick={handleExportPdf}
                  disabled={isExporting}
                  type="button"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-8 text-center bg-slate-50/50 dark:bg-slate-800/20">
              <Award className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3" />
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Ready to Calculate
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-1">
                Enter semester SGPAs and credits on the left to calculate your cumulative CGPA.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
