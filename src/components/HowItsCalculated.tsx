import React from 'react';
import { GRADE_DEFINITIONS } from '../utils/gradeCalculations';
import { ShieldCheck, CheckCircle2, Info } from 'lucide-react';

export const HowItsCalculated: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto px-1 sm:px-0">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-2xl p-4 sm:p-6 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span>Official WCE Academic & Examination Regulations 2023-24</span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
          How to Calculate CGPA Percentage at WCE
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
          Complete guide to WCE grade conversion, SGPA, CGPA, and official conversion formulas for Walchand College of Engineering, Sangli students as published in Section 12 & 16 of the Academic Rules.
        </p>
      </div>

      {/* Card 1: Official Citation & Grade Point Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
            1
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              Official WCE Grade Point Table
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cited from WCE Academic and Examination Rules and Regulations 2023-24, Section 12.01 (Table 16.1)
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          At WCE, every course is awarded a letter grade based on evaluation. Each letter grade carries a numerical grade point value on a 10-point scale:
        </p>

        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full text-left text-xs border-collapse min-w-[340px]">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                <th className="py-2.5 px-3 sm:px-4 font-bold">Letter Grade</th>
                <th className="py-2.5 px-3 sm:px-4 font-bold">Grade Points</th>
                <th className="py-2.5 px-3 sm:px-4 font-bold">Performance Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {GRADE_DEFINITIONS.map((row) => (
                <tr key={row.grade} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 sm:px-4 font-black text-blue-600 dark:text-blue-400">{row.grade}</td>
                  <td className="py-2.5 px-3 sm:px-4 font-bold text-slate-900 dark:text-white">{row.points}</td>
                  <td className="py-2.5 px-3 sm:px-4 text-slate-600 dark:text-slate-300">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Relative Grading Clarification Callout */}
        <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1.5 leading-relaxed">
          <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Note on Relative Grading vs. Fixed Formulas</span>
          </div>
          <p>
            WCE converts your raw exam marks into a letter grade (like AB or BB) using a <b>relative grading</b> system, which compares your marks to your classmates' average and spread of marks for that specific course. This step is done internally by the college and isn't something this converter can replicate.
          </p>
          <p>
            This converter starts <b>AFTER</b> that step — once your official letter grades or CGPA are already on your grade card, the SGPA/CGPA/percentage formulas below are fixed and apply the same way to every student, so your results here are fully accurate as long as you enter your official grades correctly.
          </p>
        </div>
      </div>

      {/* Card 2: SGPA Explanation */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
            2
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              SGPA Formula (Semester Grade Point Average)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Per WCE Academic RR 2023-24, Section 16
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Formula:</span>
          <div className="font-mono text-sm sm:text-base font-extrabold text-indigo-600 dark:text-indigo-400 break-words">
            SGPA = Σ(Ci × Gi) / Σ(Ci)
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            where <code className="font-bold">Ci</code> is the number of credits for course <i>i</i>, and <code className="font-bold">Gi</code> is the grade point earned in course <i>i</i>. Summed across all courses in that semester.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-slate-800/80 border border-blue-100 dark:border-slate-700">
            <span className="font-bold text-blue-900 dark:text-blue-300 block mb-1">What are Credits (Ci)?</span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Credits measure the academic weight or hours assigned to a course (for example, a theory subject might have 3 or 4 credits, while a lab might have 1 or 2 credits).
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700">
            <span className="font-bold text-indigo-900 dark:text-indigo-300 block mb-1">What are Grade Points (Gi)?</span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Grade points are the numerical values corresponding to the letter grade you score in a course (for instance, AA = 10 points, AB = 9 points).
            </p>
          </div>
        </div>
      </div>

      {/* Card 3: CGPA Explanation */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
            3
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              CGPA Formula (Cumulative Grade Point Average)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Per WCE Academic RR 2023-24, Section 16
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Formula:</span>
          <div className="font-mono text-sm sm:text-base font-extrabold text-sky-600 dark:text-sky-400 break-words">
            CGPA = ΣΣ(Cij × Gij) / ΣΣ(Cij)
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          CGPA is calculated using the exact same idea as SGPA, but averaged across every semester you have completed so far, not just one. It represents your cumulative overall academic performance weighted by course credits. Both SGPA and CGPA are rounded to <b>2 decimal places</b>.
        </p>
      </div>

      {/* Card 4: CGPA to Percentage Formula */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
            4
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              CGPA to Percentage Conversion Formula
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cited directly from WCE Academic and Examination Rules and Regulations 2023-24, Section 16
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-center space-y-1">
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
            Official WCE Conversion Formula
          </span>
          <div className="font-mono text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 break-words">
            Percentage = (10.00 × CGPA) − 7.50
          </div>
          <p className="text-xs text-emerald-700 dark:text-emerald-400 pt-1">
            Valid for CGPA ≥ 5.00. Result is rounded to 2 decimal places.
          </p>
        </div>

        {/* Step-by-Step Worked Example */}
        <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Worked Step-by-Step Example:</span>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 sm:p-4 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-mono space-y-2 text-slate-800 dark:text-slate-200 break-words">
            <p className="font-sans font-medium text-slate-600 dark:text-slate-300">
              Suppose a student has a CGPA of <b>7.80</b>.
            </p>
            <div className="flex items-start gap-2 pt-1">
              <span className="font-bold text-blue-600 shrink-0">Step 1:</span>
              <span>Take formula → <b>Percentage = (10.00 × CGPA) − 7.50</b></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-blue-600 shrink-0">Step 2:</span>
              <span>Substitute → <b>Percentage = (10.00 × 7.80) − 7.50</b></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-blue-600 shrink-0">Step 3:</span>
              <span>Calculate → <b>Percentage = 78.00 − 7.50 = 70.50%</b></span>
            </div>
            <div className="pt-2 font-sans font-bold text-emerald-600 dark:text-emerald-400">
              So a CGPA of 7.80 is equivalent to 70.50%.
            </div>
          </div>
        </div>
      </div>

      {/* Official Legal Disclaimer */}
      <div className="bg-slate-100 dark:bg-slate-800/60 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>Notice & Legal Disclaimer</span>
        </div>
        <p className="leading-relaxed">
          This tool is independently built for the convenience of WCE students based on the published Academic and Examination Rules and Regulations. Always verify your official grade card and results with the WCE Examination Section for any official or legal purpose.
        </p>
      </div>
    </div>
  );
};
