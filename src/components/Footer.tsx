import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, AlertCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 dark:bg-[#0A0D12] text-slate-400 py-8 sm:py-10 border-t border-slate-800 transition-colors mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Persistent Site-Wide Disclaimer Banner */}
        <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 space-y-1.5 leading-relaxed">
          <div className="flex items-center gap-2 font-bold text-amber-400">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>Disclaimer & Legal Notice</span>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">
            This is an independent, unofficial tool built by a student for the convenience of WCE Sangli students. It is not affiliated with, endorsed by, or an official product of Walchand College of Engineering. Calculations are based on the published WCE Academic and Examination Rules and Regulations 2023-24. Always verify your official CGPA and percentage with the WCE Examination Section or your official grade card.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 pt-2">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-fit min-w-[42px] h-8 sm:h-9 px-2.5 py-1 rounded-sm bg-rose-900 text-white flex items-center justify-center font-serif font-bold text-xs sm:text-sm tracking-normal shrink-0 select-none">
                WCE
              </div>
              <span className="font-serif font-bold text-white text-base">
                WCE CGPA Converter
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Free CGPA to percentage converter tool for Walchand College of Engineering, Sangli.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs text-slate-300 bg-slate-800/80 border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>100% Client-Side • Zero Backend • No Tracking</span>
            </div>
          </div>

          {/* Tools Quick Links */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors py-0.5 inline-block">
                  CGPA to Percentage Converter
                </Link>
              </li>
              <li>
                <Link to="/how-its-calculated" className="hover:text-white transition-colors py-0.5 inline-block">
                  Official WCE Formula Breakdown
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-white transition-colors py-0.5 inline-block">
                  Saved Calculation History
                </Link>
              </li>
            </ul>
          </div>

          {/* AdSense Legal & Info Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider">
              Legal & Information
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors py-0.5 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors py-0.5 inline-block">
                  Terms of Use & Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors py-0.5 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors py-0.5 inline-block">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Footer Links */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1.5 text-slate-400 text-center sm:text-left">
            <span>© {new Date().getFullYear()} WCE CGPA to Percentage Converter</span>
            <span className="hidden sm:inline">•</span>
            <Link to="/privacy-policy" className="hover:text-white underline transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-white underline transition-colors">
              Terms of Use
            </Link>
            <span>|</span>
            <Link to="/about" className="hover:text-white underline transition-colors">
              About
            </Link>
            <span>|</span>
            <Link to="/contact" className="hover:text-white underline transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for WCE Sangli</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
