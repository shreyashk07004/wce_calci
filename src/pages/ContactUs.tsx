import React from 'react';
import { Mail, MessageSquare, ShieldCheck } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const contactEmail = 'kshreyash004@gmail.com';

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-3">
          <Mail className="w-3.5 h-3.5" />
          Get In Touch
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Contact Us</h1>
        <p className="text-slate-300 text-xs sm:text-sm mt-1">
          Have feedback, questions, or suggestions for the WCE CGPA to Percentage Converter?
        </p>
      </div>

      {/* Main Contact Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto border border-blue-200 dark:border-blue-800 shadow-inner">
          <MessageSquare className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Email Contact</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            For questions about calculations, privacy concerns, or feedback on how to improve this tool for WCE students, please send an email to:
          </p>
        </div>

        <div className="py-3">
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base transition-all shadow-md shadow-blue-500/20"
          >
            <Mail className="w-4 h-4" />
            <span>{contactEmail}</span>
          </a>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>100% Backend-Free</span>
          </div>
          <p>
            This site has no backend server or database form handlers. Clicking the button above directly opens your email client.
          </p>
        </div>
      </div>
    </div>
  );
};
