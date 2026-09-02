import React from 'react';
import { Mail, MessageSquare, ShieldCheck } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const contactEmail = 'kshreyash004@gmail.com';

  return (
    <div className="space-y-6 max-w-3xl mx-auto px-1 sm:px-0 font-sans">
      {/* Editorial Page Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800 space-y-1.5">
        <div className="text-xs text-rose-900 dark:text-rose-300 font-sans font-medium">
          Feedback & Support
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Contact Us
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Have feedback, questions, or suggestions for the WCE CGPA Converter?
        </p>
      </div>

      {/* Main Contact Card */}
      <div className="bg-white dark:bg-[#151921] rounded-md p-5 sm:p-7 border border-slate-200 dark:border-slate-800 space-y-5 text-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-md bg-rose-50/60 dark:bg-rose-950/40 text-rose-900 dark:text-rose-300 flex items-center justify-center mx-auto border border-rose-200 dark:border-rose-900 shrink-0">
          <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white">Email Contact</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            For questions about calculations, privacy concerns, or feedback on how to improve this tool for WCE students, please send an email to:
          </p>
        </div>

        <div className="py-2 sm:py-3">
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-2.5 min-h-[42px] rounded-sm bg-rose-900 hover:bg-rose-800 text-white font-semibold text-xs sm:text-sm transition-colors max-w-full truncate"
          >
            <Mail className="w-4 h-4 shrink-0" />
            <span className="truncate">{contactEmail}</span>
          </a>
        </div>

        <div className="p-3.5 sm:p-4 rounded-md bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>100% Backend-Free</span>
          </div>
          <p className="leading-relaxed">
            This site has no backend server or database form handlers. Clicking the button above directly opens your email client.
          </p>
        </div>
      </div>
    </div>
  );
};
