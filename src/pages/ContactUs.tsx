import React from 'react';
import { Mail, MessageSquare, ShieldCheck } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const contactEmail = 'kshreyash004@gmail.com';

  return (
    <div className="space-y-6 sm:space-y-8 max-w-3xl mx-auto px-1 sm:px-0">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-2xl p-4 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-3">
          <Mail className="w-3.5 h-3.5 shrink-0" />
          <span>Get In Touch</span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">Contact Us</h1>
        <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
          Have feedback, questions, or suggestions for the WCE CGPA to Percentage Converter?
        </p>
      </div>

      {/* Main Contact Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-5 sm:space-y-6 text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto border border-blue-200 dark:border-blue-800 shadow-inner shrink-0">
          <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Email Contact</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            For questions about calculations, privacy concerns, or feedback on how to improve this tool for WCE students, please send an email to:
          </p>
        </div>

        <div className="py-2 sm:py-3">
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 min-h-[44px] rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-base transition-all shadow-md shadow-blue-500/20 max-w-full truncate"
          >
            <Mail className="w-4 h-4 shrink-0" />
            <span className="truncate">{contactEmail}</span>
          </a>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
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
