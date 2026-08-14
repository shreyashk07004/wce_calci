import React, { useState, useMemo } from 'react';
import type { Course, GradeLetter } from '../types/grade';
import { calculateSgpa, GRADE_DEFINITIONS } from '../utils/gradeCalculations';
import { saveHistoryItem } from '../utils/storage';
import { exportElementAsPdf, exportElementAsPng } from '../utils/pdfExport';
import { Plus, Trash2, GraduationCap, ChevronDown, ChevronUp, Save, Copy, Download, FileSpreadsheet, RotateCcw, CheckCircle2 } from 'lucide-react';

interface Props {
  onHistoryUpdate: () => void;
}

const DEFAULT_COURSES: Course[] = [
  { id: '1', name: 'Course 1 (Theory)', credits: 4, grade: 'AA' },
  { id: '2', name: 'Course 2 (Theory)', credits: 3, grade: 'AB' },
  { id: '3', name: 'Course 3 (Theory)', credits: 3, grade: 'BB' },
  { id: '4', name: 'Course 4 (Lab)', credits: 2, grade: 'AA' },
];

export const SgpaCalculator: React.FC<Props> = ({ onHistoryUpdate }) => {
  const [courses, setCourses] = useState<Course[]>(DEFAULT_COURSES);
  const [showGradeTable, setShowGradeTable] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const { sgpa, totalCredits, totalPoints } = useMemo(() => calculateSgpa(courses), [courses]);

  const handleAddCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: `Course ${courses.length + 1}`,
      credits: 3,
      grade: 'AA',
    };
    setCourses([...courses, newCourse]);
  };

  const handleRemoveCourse = (id: string) => {
    if (courses.length <= 1) {
      alert('You must keep at least one course.');
      return;
    }
    setCourses(courses.filter((c) => c.id !== id));
  };

  const handleCourseChange = (id: string, field: keyof Course, value: string | number) => {
    setCourses(
      courses.map((c) => {
        if (c.id === id) {
          return { ...c, [field]: value };
        }
        return c;
      })
    );
  };

  const handleReset = () => {
    setCourses(DEFAULT_COURSES);
  };

  const handleSaveToHistory = () => {
    saveHistoryItem({
      type: 'sgpa',
      title: 'SGPA Calculation',
      summary: `SGPA ${sgpa.toFixed(2)} (${totalCredits} credits)`,
      cgpa: sgpa,
      details: `${courses.length} courses, Total Points: ${totalPoints}/${totalCredits * 10}`,
    });
    onHistoryUpdate();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleCopy = () => {
    const summaryStr = courses
      .map((c) => `${c.name || 'Course'}: ${c.credits} credits [${c.grade}]`)
      .join('\n');
    const fullText = `WCE Semester Grade Point Average (SGPA):\nSGPA: ${sgpa.toFixed(2)}\nTotal Credits: ${totalCredits}\nTotal Points: ${totalPoints}\n\nCourses:\n${summaryStr}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleExportPng = async () => {
    setIsExporting(true);
    await exportElementAsPng('sgpa-report-card', `WCE_SGPA_Report_${sgpa.toFixed(2)}`);
    setIsExporting(false);
  };

  const handleExportPdf = async () => {
    setIsExporting(true);
    await exportElementAsPdf('sgpa-report-card', `WCE_SGPA_Report_${sgpa.toFixed(2)}`);
    setIsExporting(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            WCE Academic RR Section 16
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Semester Grade Point Average (SGPA)</h2>
          <p className="text-slate-300 text-xs mt-1">
            Calculate your semester SGPA using course credits and official WCE grade points.
          </p>
        </div>
        <button
          onClick={() => setShowGradeTable(!showGradeTable)}
          type="button"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all backdrop-blur-md border border-white/20"
        >
          <span>{showGradeTable ? 'Hide Grade Table' : 'View Grade Point Scale'}</span>
          {showGradeTable ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Collapsible Reference Grade Table */}
      {showGradeTable && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-md">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            WCE Official Grade Point Scale (Table 16.1)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-9 gap-2">
            {GRADE_DEFINITIONS.map((def) => (
              <div
                key={def.grade}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center"
              >
                <div className="text-sm font-black text-blue-600 dark:text-blue-400">{def.grade}</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">{def.points} pts</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{def.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main SGPA Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Course Inputs List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Semester Courses ({courses.length})</span>
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  type="button"
                  className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1 px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
            </div>

            {/* Courses Table / List */}
            <div className="space-y-3">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 transition-all hover:border-blue-300 dark:hover:border-blue-700"
                >
                  <span className="text-xs font-bold text-slate-400 w-5 shrink-0 self-center hidden sm:inline">
                    #{index + 1}
                  </span>
                  
                  {/* Course Name */}
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => handleCourseChange(course.id, 'name', e.target.value)}
                    placeholder="Course name (optional)"
                    className="flex-1 px-3 py-2 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <div className="flex items-center gap-2">
                    {/* Credits Input */}
                    <div className="w-24 shrink-0">
                      <label className="sr-only">Credits</label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0.5"
                          max="10"
                          step="0.5"
                          value={course.credits}
                          onChange={(e) => handleCourseChange(course.id, 'credits', parseFloat(e.target.value) || 0)}
                          className="w-full px-2.5 py-2 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-semibold pointer-events-none">
                          cr
                        </span>
                      </div>
                    </div>

                    {/* Grade Selector */}
                    <div className="w-28 shrink-0">
                      <select
                        value={course.grade}
                        onChange={(e) => handleCourseChange(course.id, 'grade', e.target.value as GradeLetter)}
                        className="w-full px-2.5 py-2 text-xs font-extrabold rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-slate-800 text-blue-800 dark:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      >
                        {GRADE_DEFINITIONS.map((def) => (
                          <option key={def.grade} value={def.grade}>
                            {def.grade} ({def.points} pts)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Delete Course Button */}
                    <button
                      onClick={() => handleRemoveCourse(course.id)}
                      type="button"
                      aria-label="Remove Course"
                      className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Course Button */}
            <button
              onClick={handleAddCourse}
              type="button"
              className="mt-4 w-full py-3 rounded-xl border-2 border-dashed border-blue-300 dark:border-blue-800 hover:border-blue-500 text-blue-600 dark:text-blue-400 font-semibold text-xs flex items-center justify-center gap-2 transition-all bg-blue-50/50 dark:bg-slate-800/30"
            >
              <Plus className="w-4 h-4" />
              Add Another Course
            </button>
          </div>
        </div>

        {/* Live SGPA Calculation Card */}
        <div className="lg:col-span-5">
          <div
            id="sgpa-report-card"
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Semester Result
                </h3>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  WCE Section 16 Formula
                </p>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 rounded-md">
                Live SGPA
              </span>
            </div>

            {/* Big SGPA Display */}
            <div className="text-center py-4 bg-gradient-to-b from-blue-50 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-800/40 rounded-2xl border border-blue-100 dark:border-slate-700">
              <div className="text-6xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
                {sgpa.toFixed(2)}
              </div>
              <div className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-2">
                Semester Grade Point Average
              </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Credits</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">{totalCredits}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Grade Points</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">{totalPoints}</span>
              </div>
            </div>

            {/* Formula Explanation */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-white">Math Breakdown:</span>
              <p className="font-mono text-slate-600 dark:text-slate-300 text-[11px]">
                SGPA = Σ(Credits × Grade Points) / Σ(Credits)
              </p>
              <p className="font-mono text-blue-600 dark:text-blue-400 font-semibold text-[11px]">
                = {totalPoints} / {totalCredits} = {sgpa.toFixed(2)}
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
        </div>
      </div>
    </div>
  );
};
