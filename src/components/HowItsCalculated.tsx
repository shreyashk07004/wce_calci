import React from 'react';
import { GRADE_DEFINITIONS } from '../utils/gradeCalculations';
import { CheckCircle2, Info } from 'lucide-react';

export const HowItsCalculated: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto px-1 sm:px-0 font-sans">
      {/* Editorial Page Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800 space-y-1.5">
        <div className="text-xs text-[#8D5B0F] dark:text-[#DE9F42] font-sans font-medium">
          Official WCE Academic & Examination Regulations 2023-24 (Sections 12 & 16)
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-slate-900 dark:text-slate-100">
          How CGPA Percentage is Calculated at WCE
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Complete guide to WCE grade conversion, SGPA, CGPA, and official conversion formulas for Walchand College of Engineering, Sangli students.
        </p>
      </div>

      {/* Section 1: Official Citation & Grade Point Table */}
      <div className="space-y-4 pt-1">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white">
            1. Official WCE Grade Point Table
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Cited from WCE Academic and Examination Rules and Regulations 2023-24, Section 12.01 (Table 16.1)
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          At WCE, every course is awarded a letter grade based on evaluation. Each letter grade carries a numerical grade point value on a 10-point scale:
        </p>

        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full text-left text-xs border-collapse min-w-[340px]">
            <thead>
              <tr className="bg-slate-100 dark:bg-[#242933] text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                <th className="py-2.5 px-3 sm:px-4 font-bold">Letter Grade</th>
                <th className="py-2.5 px-3 sm:px-4 font-bold">Grade Points</th>
                <th className="py-2.5 px-3 sm:px-4 font-bold">Performance Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/80">
              {GRADE_DEFINITIONS.map((row) => (
                <tr key={row.grade} className="hover:bg-slate-50 dark:hover:bg-[#242933]/50 transition-colors">
                  <td className="py-2.5 px-3 sm:px-4 font-mono font-bold text-[#8D5B0F] dark:text-[#DE9F42]">{row.grade}</td>
                  <td className="py-2.5 px-3 sm:px-4 font-mono font-bold text-slate-900 dark:text-white">{row.points}</td>
                  <td className="py-2.5 px-3 sm:px-4 text-slate-600 dark:text-slate-300">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Relative Grading Clarification Callout */}
        <div className="mt-4 p-4 rounded-sm bg-amber-50/70 dark:bg-[#242933] border border-amber-300/80 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
          <div className="flex items-center gap-2 font-bold text-[#8D5B0F] dark:text-[#DE9F42]">
            <Info className="w-4 h-4 text-[#8D5B0F] dark:text-[#DE9F42] shrink-0" />
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
      <div className="bg-white dark:bg-[#242933] rounded-sm p-5 sm:p-7 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-700/80 pb-3">
          <div className="w-6 h-6 rounded-sm bg-[#8D5B0F] dark:bg-[#DE9F42] text-white dark:text-[#1B1F27] flex items-center justify-center font-serif font-bold text-xs shrink-0">
            2
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white">
              SGPA Formula (Semester Grade Point Average)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Per WCE Academic RR 2023-24, Section 16
            </p>
          </div>
        </div>

        <div className="p-4 rounded-sm bg-slate-50 dark:bg-[#1B1F27] border border-slate-200 dark:border-slate-700 space-y-2">
          <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Formula:</span>
          <div className="font-mono text-sm sm:text-base font-bold text-[#8D5B0F] dark:text-[#DE9F42] break-words">
            SGPA = Σ(Ci × Gi) / Σ(Ci)
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            where <code className="font-mono font-bold">Ci</code> is the number of credits for course <i>i</i>, and <code className="font-mono font-bold">Gi</code> is the grade point earned in course <i>i</i>. Summed across all courses in that semester.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-sm bg-slate-50 dark:bg-[#1B1F27] border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">What are Credits (Ci)?</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Credits measure the academic weight or hours assigned to a course (for example, a theory subject might have 3 or 4 credits, while a lab might have 1 or 2 credits).
            </p>
          </div>
          <div className="p-3.5 rounded-sm bg-slate-50 dark:bg-[#1B1F27] border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">What are Grade Points (Gi)?</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Grade points are the numerical values corresponding to the letter grade you score in a course (for instance, AA = 10 points, AB = 9 points).
            </p>
          </div>
        </div>
      </div>

      {/* Card 3: CGPA Explanation */}
      <div className="bg-white dark:bg-[#242933] rounded-sm p-5 sm:p-7 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-700/80 pb-3">
          <div className="w-6 h-6 rounded-sm bg-[#8D5B0F] dark:bg-[#DE9F42] text-white dark:text-[#1B1F27] flex items-center justify-center font-serif font-bold text-xs shrink-0">
            3
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white">
              CGPA Formula (Cumulative Grade Point Average)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Per WCE Academic RR 2023-24, Section 16
            </p>
          </div>
        </div>

        <div className="p-4 rounded-sm bg-slate-50 dark:bg-[#1B1F27] border border-slate-200 dark:border-slate-700 space-y-2">
          <span className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Formula:</span>
          <div className="font-mono text-sm sm:text-base font-bold text-[#8D5B0F] dark:text-[#DE9F42] break-words">
            CGPA = ΣΣ(Cij × Gij) / ΣΣ(Cij)
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          CGPA is calculated using the exact same idea as SGPA, but averaged across every semester you have completed so far, not just one. It represents your cumulative overall academic performance weighted by course credits. Both SGPA and CGPA are rounded to <b>2 decimal places</b>.
        </p>
      </div>

      {/* Card 4: CGPA to Percentage Formula */}
      <div className="bg-white dark:bg-[#242933] rounded-sm p-5 sm:p-7 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-700/80 pb-3">
          <div className="w-6 h-6 rounded-sm bg-[#8D5B0F] dark:bg-[#DE9F42] text-white dark:text-[#1B1F27] flex items-center justify-center font-serif font-bold text-xs shrink-0">
            4
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white">
              CGPA to Percentage Conversion Formula
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cited directly from WCE Academic and Examination Rules and Regulations 2023-24, Section 16
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-sm bg-amber-50/50 dark:bg-[#1B1F27] border border-[#8D5B0F]/30 dark:border-[#DE9F42]/30 text-center space-y-1">
          <span className="text-xs font-semibold text-[#8D5B0F] dark:text-[#DE9F42] block">
            Official WCE Conversion Formula
          </span>
          <div className="font-mono text-xl sm:text-2xl font-bold text-[#8D5B0F] dark:text-[#DE9F42] break-words">
            Percentage = (10.00 × CGPA) − 7.50
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
            Valid for CGPA ≥ 5.00. Result is rounded to 2 decimal places.
          </p>
        </div>

        {/* Step-by-Step Worked Example */}
        <div className="bg-slate-50 dark:bg-[#1B1F27] rounded-sm p-4 sm:p-6 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Worked Step-by-Step Example:</span>
          </div>

          <div className="bg-white dark:bg-[#242933] rounded-sm p-3.5 sm:p-4 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-mono space-y-2 text-slate-800 dark:text-slate-200 break-words">
            <p className="font-sans text-slate-600 dark:text-slate-300">
              Suppose a student has a CGPA of <b>7.80</b>.
            </p>
            <div className="flex items-start gap-2 pt-1">
              <span className="font-bold text-[#8D5B0F] dark:text-[#DE9F42] shrink-0">Step 1:</span>
              <span>Take formula → <b>Percentage = (10.00 × CGPA) − 7.50</b></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-[#8D5B0F] dark:text-[#DE9F42] shrink-0">Step 2:</span>
              <span>Substitute → <b>Percentage = (10.00 × 7.80) − 7.50</b></span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-[#8D5B0F] dark:text-[#DE9F42] shrink-0">Step 3:</span>
              <span>Calculate → <b>Percentage = 78.00 − 7.50 = 70.50%</b></span>
            </div>
            <div className="pt-2 font-sans font-bold text-[#8D5B0F] dark:text-[#DE9F42]">
              So a CGPA of 7.80 is equivalent to 70.50%.
            </div>
          </div>
        </div>
      </div>

      {/* Card 5: Quick Reference Lookup Table */}
      <div className="bg-white dark:bg-[#242933] rounded-sm p-5 sm:p-7 border border-slate-200 dark:border-slate-700/80 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-700/80 pb-3">
          <div className="w-6 h-6 rounded-sm bg-[#8D5B0F] dark:bg-[#DE9F42] text-white dark:text-[#1B1F27] flex items-center justify-center font-serif font-bold text-xs shrink-0">
            5
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white">
              CGPA to Percentage Quick Reference Table
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pre-calculated percentage values in 0.25 CGPA increments from 5.00 to 10.00 using formula: (10.00 × CGPA) − 7.50
            </p>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full text-left text-xs border-collapse min-w-[360px]">
            <thead>
              <tr className="bg-slate-100 dark:bg-[#1B1F27] text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                <th className="py-2.5 px-4 font-bold">WCE CGPA</th>
                <th className="py-2.5 px-4 font-bold">Official Calculation</th>
                <th className="py-2.5 px-4 font-bold">Equivalent Percentage</th>
                <th className="py-2.5 px-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/80">
              {[
                { cgpa: '5.00', calc: '(10.00 × 5.00) − 7.50', per: '42.50%', note: 'Minimum Degree Eligibility (Section 09.01)' },
                { cgpa: '5.25', calc: '(10.00 × 5.25) − 7.50', per: '45.00%', note: 'Calculated Value' },
                { cgpa: '5.50', calc: '(10.00 × 5.50) − 7.50', per: '47.50%', note: 'Calculated Value' },
                { cgpa: '5.75', calc: '(10.00 × 5.75) − 7.50', per: '50.00%', note: 'Calculated Value' },
                { cgpa: '6.00', calc: '(10.00 × 6.00) − 7.50', per: '52.50%', note: 'Calculated Value' },
                { cgpa: '6.25', calc: '(10.00 × 6.25) − 7.50', per: '55.00%', note: 'Official WCE Verification Table Value' },
                { cgpa: '6.50', calc: '(10.00 × 6.50) − 7.50', per: '57.50%', note: 'Calculated Value' },
                { cgpa: '6.75', calc: '(10.00 × 6.75) − 7.50', per: '60.00%', note: 'Official WCE Verification Table Value' },
                { cgpa: '7.00', calc: '(10.00 × 7.00) − 7.50', per: '62.50%', note: 'Calculated Value' },
                { cgpa: '7.25', calc: '(10.00 × 7.25) − 7.50', per: '65.00%', note: 'Official WCE Verification Table Value' },
                { cgpa: '7.50', calc: '(10.00 × 7.50) − 7.50', per: '67.50%', note: 'Calculated Value' },
                { cgpa: '7.75', calc: '(10.00 × 7.75) − 7.50', per: '70.00%', note: 'Official WCE Verification Table Value' },
                { cgpa: '8.00', calc: '(10.00 × 8.00) − 7.50', per: '72.50%', note: 'Calculated Value' },
                { cgpa: '8.25', calc: '(10.00 × 8.25) − 7.50', per: '75.00%', note: 'Official WCE Verification Table Value' },
                { cgpa: '8.50', calc: '(10.00 × 8.50) − 7.50', per: '77.50%', note: 'Calculated Value' },
                { cgpa: '8.75', calc: '(10.00 × 8.75) − 7.50', per: '80.00%', note: 'Calculated Value' },
                { cgpa: '9.00', calc: '(10.00 × 9.00) − 7.50', per: '82.50%', note: 'Calculated Value' },
                { cgpa: '9.25', calc: '(10.00 × 9.25) − 7.50', per: '85.00%', note: 'Calculated Value' },
                { cgpa: '9.50', calc: '(10.00 × 9.50) − 7.50', per: '87.50%', note: 'Calculated Value' },
                { cgpa: '9.75', calc: '(10.00 × 9.75) − 7.50', per: '90.00%', note: 'Calculated Value' },
                { cgpa: '10.00', calc: '(10.00 × 10.00) − 7.50', per: '92.50%', note: 'Calculated Value' },
              ].map((row) => (
                <tr key={row.cgpa} className="hover:bg-slate-50 dark:hover:bg-[#1B1F27]/50 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-bold text-[#8D5B0F] dark:text-[#DE9F42]">{row.cgpa}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-600 dark:text-slate-300">{row.calc}</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900 dark:text-white">{row.per}</td>
                  <td className="py-2.5 px-4 text-slate-500 dark:text-slate-400 text-xs">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card 6: Frequently Asked Questions (FAQ) */}
      <div className="bg-white dark:bg-[#242933] rounded-sm p-5 sm:p-7 border border-slate-200 dark:border-slate-700/80 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-700/80 pb-3">
          <div className="w-6 h-6 rounded-sm bg-[#8D5B0F] dark:bg-[#DE9F42] text-white dark:text-[#1B1F27] flex items-center justify-center font-serif font-bold text-xs shrink-0">
            6
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Common questions answered using official WCE Academic and Examination Rules and Regulations 2023-24.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          {/* Q1 */}
          <div className="p-4 rounded-sm bg-slate-50 dark:bg-[#1B1F27] border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-serif font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              What percentage is a 7 CGPA at WCE?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              A 7.00 CGPA at Walchand College of Engineering (WCE), Sangli is equivalent to <strong>62.50%</strong>. This is calculated using the official WCE formula: <code className="font-mono bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-[#8D5B0F] dark:text-[#DE9F42]">(10.00 × 7.00) − 7.50 = 62.50%</code>.
            </p>
          </div>

          {/* Q2 */}
          <div className="p-4 rounded-sm bg-slate-50 dark:bg-[#1B1F27] border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-serif font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              What percentage is an 8 CGPA at WCE?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              An 8.00 CGPA at WCE Sangli is equivalent to <strong>72.50%</strong>. According to Section 16 of the Academic Rules, applying the official formula yields: <code className="font-mono bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-[#8D5B0F] dark:text-[#DE9F42]">(10.00 × 8.00) − 7.50 = 72.50%</code>.
            </p>
          </div>

          {/* Q3 */}
          <div className="p-4 rounded-sm bg-slate-50 dark:bg-[#1B1F27] border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-serif font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              What is the minimum CGPA required to pass at WCE?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              As per WCE Academic & Examination Regulations Section 09.01, a student must maintain a minimum Cumulative Grade Point Average of <strong>CGPA ≥ 5.00</strong> to qualify for the award of an undergraduate degree. Values below 5.00 do not satisfy minimum degree eligibility criteria.
            </p>
          </div>

          {/* Q4 */}
          <div className="p-4 rounded-sm bg-slate-50 dark:bg-[#1B1F27] border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-serif font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              Does this formula work for all WCE CGPA values?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The conversion formula <code className="font-mono bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-[#8D5B0F] dark:text-[#DE9F42]">Percentage = (10.00 × CGPA) − 7.50</code> is officially defined by WCE for all CGPA values greater than or equal to <strong>5.00</strong>. For CGPA values below 5.00, converted percentages are displayed for mathematical reference only.
            </p>
          </div>

          {/* Q5 */}
          <div className="p-4 rounded-sm bg-slate-50 dark:bg-[#1B1F27] border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-serif font-bold text-slate-900 dark:text-white text-sm sm:text-base">
              Is this an official WCE website?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              No, this application is an independent, student-built utility. It is not an official product of or endorsed by Walchand College of Engineering (WCE), Sangli. For official transcripts or grade cards, please contact the WCE Examination Section.
            </p>
          </div>
        </div>
      </div>

      {/* Official Legal Disclaimer */}
      <div className="bg-slate-100 dark:bg-[#242933] rounded-sm p-4 sm:p-5 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
          <Info className="w-4 h-4 text-[#8D5B0F] dark:text-[#DE9F42] shrink-0" />
          <span>Notice & Legal Disclaimer</span>
        </div>
        <p className="leading-relaxed">
          This tool is independently built for the convenience of WCE students based on the published Academic and Examination Rules and Regulations. Always verify your official grade card and results with the WCE Examination Section for any official or legal purpose.
        </p>
      </div>
    </div>
  );
};
