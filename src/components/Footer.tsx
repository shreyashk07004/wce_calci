import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, AlertCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Persistent Site-Wide Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 text-xs text-slate-300 space-y-1.5 leading-relaxed shadow-inner">
          <div className="flex items-center gap-2 font-bold text-amber-400">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>Disclaimer & Legal Notice</span>
          </div>
          <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed">
            This is an independent, unofficial tool built by a student for the convenience of WCE Sangli students. It is not affiliated with, endorsed by, or an official product of Walchand College of Engineering. Calculations are based on the published WCE Academic and Examination Rules and Regulations 2023-24. Always verify your official CGPA, SGPA, and grades with the WCE Examination Section or your official grade card.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                WCE
              </div>
              <span className="font-bold text-white text-base">
                WCE CGPA to Percent Calculator
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Free CGPA to percentage converter and academic grade tools for Walchand College of Engineering, Sangli.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Client-Side • Zero Backend • No Tracking
            </div>
          </div>

          {/* Tools Quick Links */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Calculators & Tools
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  CGPA to Percentage Converter
                </Link>
              </li>
              <li>
                <Link to="/sgpa-calculator" className="hover:text-white transition-colors">
                  SGPA Calculator
                </Link>
              </li>
              <li>
                <Link to="/multi-semester-cgpa-calculator" className="hover:text-white transition-colors">
                  Multi-Semester CGPA Calculator
                </Link>
              </li>
              <li>
                <Link to="/attendance-checker" className="hover:text-white transition-colors">
                  Attendance Grade Penalty Checker
                </Link>
              </li>
              <li>
                <Link to="/how-its-calculated" className="hover:text-white transition-colors">
                  Official WCE Formula Breakdown
                </Link>
              </li>
            </ul>
          </div>

          {/* AdSense Legal & Info Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Legal & Information
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Use & Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Footer Links */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-400">
            <span>© {new Date().getFullYear()} WCE CGPA to Percent Calculator</span>
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
