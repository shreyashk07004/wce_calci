import React from 'react';
import { Lock, Database, EyeOff, Mail } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  const lastUpdatedDate = 'August 15, 2026';
  const contactEmail = 'kshreyash004@gmail.com';

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-1 sm:px-0 font-sans">
      {/* Editorial Page Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800 space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-[#8D5B0F] dark:text-[#DE9F42] font-sans font-medium">
            Data Privacy & Client-Side Execution Guarantee
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-sans">
            Last updated: {lastUpdatedDate}
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Privacy Policy
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
          How WCE CGPA to Percentage Converter handles user privacy and browser data storage.
        </p>
      </div>

      {/* Main Content Sections */}
      <div className="bg-white dark:bg-[#242933] rounded-sm p-5 sm:p-7 border border-slate-200 dark:border-slate-700/80 space-y-6 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
        
        {/* Section 1: Zero Backend & Client-Side Execution */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#8D5B0F] dark:text-[#DE9F42] shrink-0" />
            <span>1. Client-Side Execution & Zero Backend Server</span>
          </h2>
          <p>
            <strong>WCE CGPA to Percentage Converter</strong> operates as a 100% client-side web application. All calculations (including CGPA to percentage conversions, SGPA computations, and attendance penalty evaluations) are executed entirely inside your browser. No data, inputs, or calculation results are ever transmitted to or stored on an external backend server or database.
          </p>
        </section>

        {/* Section 2: Browser LocalStorage Usage */}
        <section className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-700">
          <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-[#8D5B0F] dark:text-[#DE9F42] shrink-0" />
            <span>2. Local Browser Storage (localStorage)</span>
          </h2>
          <p>
            To enhance your user experience, this application uses your browser's standard <code className="font-mono bg-slate-100 dark:bg-[#1B1F27] px-1.5 py-0.5 rounded text-[#8D5B0F] dark:text-[#DE9F42]">localStorage</code> for two specific features:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
            <li><strong>Calculation History:</strong> Temporarily saving past calculations locally on your device if you click "Save".</li>
            <li><strong>Theme Preference:</strong> Remembering your Dark or Light theme choice across page visits.</li>
          </ul>
          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
            This data remains strictly on your personal device and is never sent across any network. You can clear this data at any time via your browser settings or by clicking "Clear History" in the application.
          </p>
        </section>

        {/* Section 3: Personal Information */}
        <section className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-700">
          <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-[#8D5B0F] dark:text-[#DE9F42] shrink-0" />
            <span>3. No Personal Data Collection</span>
          </h2>
          <p>
            No personally identifiable information (such as your name, email address, student PRN number, or IP logs) is requested, collected, stored, or shared by this site.
          </p>
        </section>

        {/* Section 4: Privacy Contact */}
        <section className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-700">
          <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#8D5B0F] dark:text-[#DE9F42] shrink-0" />
            <span>4. Contact Information</span>
          </h2>
          <p>
            If you have any questions or concerns regarding this Privacy Policy, please contact us via email at:{' '}
            <a href={`mailto:${contactEmail}`} className="font-mono text-[#8D5B0F] dark:text-[#DE9F42] underline hover:text-[#6F4506] break-all font-semibold">
              {contactEmail}
            </a>
          </p>
        </section>

      </div>
    </div>
  );
};
