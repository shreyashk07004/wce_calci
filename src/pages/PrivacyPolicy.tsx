import React from 'react';
import { ShieldCheck, Lock, Database, EyeOff, Mail, Calendar } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  const lastUpdatedDate = 'August 15, 2026';
  const contactEmail = 'kshreyash004@gmail.com';

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto px-1 sm:px-0">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-2xl p-4 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span>Transparency & Security</span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">Privacy Policy</h1>
        <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
          How WCE CGPA to Percentage Converter handles user privacy and browser data storage.
        </p>
        <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>Last updated: {lastUpdatedDate}</span>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
        
        {/* Section 1: Zero Backend & Client-Side Execution */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>1. Client-Side Execution & Zero Backend Server</span>
          </h2>
          <p>
            <strong>WCE CGPA to Percentage Converter</strong> operates as a 100% client-side web application. All calculations (including CGPA to percentage conversions, SGPA computations, and attendance penalty evaluations) are executed entirely inside your browser. No data, inputs, or calculation results are ever transmitted to or stored on an external backend server or database.
          </p>
        </section>

        {/* Section 2: Browser LocalStorage Usage */}
        <section className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>2. Local Browser Storage (localStorage)</span>
          </h2>
          <p>
            To enhance your user experience, this application uses your browser's standard <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400">localStorage</code> for two specific features:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
            <li><strong>Calculation History:</strong> Temporarily saving past calculations locally on your device if you click "Save".</li>
            <li><strong>Theme Preference:</strong> Remembering your Dark or Light theme choice across page visits.</li>
          </ul>
          <p className="text-xs text-slate-500 dark:text-slate-400 italic">
            This data remains strictly on your personal device and is never sent across any network. You can clear this data at any time via your browser settings or by clicking "Clear History" in the application.
          </p>
        </section>

        {/* Section 3: Third-Party Advertising & Analytics Disclosure */}
        <section className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
            <span>3. Advertising & Third-Party Services</span>
          </h2>
          <p>
            This site currently does not use any advertising or third-party tracking services. If this changes in the future, this policy will be updated accordingly, and any such services (e.g., Google AdSense or Google Analytics) may use cookies or web beacons to serve relevant ads or gather anonymized usage analytics as governed by Google's own Privacy Policy and Terms of Service.
          </p>
        </section>

        {/* Section 4: Personal Information */}
        <section className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            4. Personal Information
          </h2>
          <p>
            No personally identifiable information (such as your name, email address, student registration number, or IP logs) is requested, collected, stored, or shared by this site.
          </p>
        </section>

        {/* Section 5: Privacy Contact */}
        <section className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>5. Contact Information</span>
          </h2>
          <p>
            If you have any questions or concerns regarding this Privacy Policy, please contact us via email at:{' '}
            <a href={`mailto:${contactEmail}`} className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-800 break-all">
              {contactEmail}
            </a>
          </p>
        </section>

      </div>
    </div>
  );
};
