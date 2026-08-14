import React from 'react';
import { Info, GraduationCap, Calculator, ShieldCheck } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-3">
          <Info className="w-3.5 h-3.5" />
          About This Tool
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">About WCE CGPA to Percent Calculator</h1>
        <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
          An independent academic tool designed to help Walchand College of Engineering, Sangli students calculate CGPA, SGPA, percentage, and attendance penalties quickly and accurately.
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
        
        {/* Section 1: Purpose & Mission */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            Why This Tool Was Built
          </h2>
          <p>
            <strong>WCE CGPA to Percent Calculator</strong> was created by a student to provide Walchand College of Engineering (WCE), Sangli students with a clean, fast, and 100% accurate online tool for grade conversions and academic calculations.
          </p>
          <p>
            Students frequently need to convert their CGPA to percentage for higher education applications, job interviews, campus placements, and scholarship forms. This utility eliminates guesswork by applying WCE's exact published mathematical formulas.
          </p>
        </section>

        {/* Section 2: Core Tools Provided */}
        <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            What This Tool Provides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">1. CGPA to Percentage Converter</span>
              <p className="text-slate-600 dark:text-slate-300">
                Instant percentage calculation using WCE's official formula: <code className="font-mono text-blue-600 dark:text-blue-400 font-bold">(10.00 × CGPA) − 7.50</code>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">2. SGPA Calculator</span>
              <p className="text-slate-600 dark:text-slate-300">
                Compute single-semester SGPA dynamically using course credits and official letter grade point values.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">3. Multi-Semester CGPA</span>
              <p className="text-slate-600 dark:text-slate-300">
                Calculate cumulative CGPA across all completed semesters weighted by credits per semester.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">4. Attendance Penalty Checker</span>
              <p className="text-slate-600 dark:text-slate-300">
                Check theory course attendance percentage against official grade caps (BB, BC, CC, XX).
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Official Rule Citation */}
        <section className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            Official Source Citation
          </h2>
          <p>
            All mathematical formulas, grade point values (AA=10, AB=9, BB=8, etc.), and attendance penalty rules used in this application are directly derived from Section 04.04, Section 12, and Section 16 of the official document:
          </p>
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 font-semibold text-blue-900 dark:text-blue-300 text-xs">
            Walchand College of Engineering, Sangli — "Academic and Examination Rules and Regulations 2023-24"
          </div>
        </section>

        {/* Section 4: Independent Status */}
        <section className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
          <span className="font-bold text-amber-800 dark:text-amber-300 block">Independent Unofficial Notice:</span>
          <p>
            This website is an independent, student-built utility. It is not affiliated with, authorized by, endorsed by, or an official product of Walchand College of Engineering (WCE), Sangli.
          </p>
        </section>

      </div>
    </div>
  );
};
