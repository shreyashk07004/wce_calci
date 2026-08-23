import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { Calculator, ShieldCheck, History, BookOpen } from 'lucide-react';

interface NavbarProps {
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ historyCount }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', label: 'CGPA → %', icon: <Calculator className="w-4 h-4 shrink-0" /> },
    { path: '/how-its-calculated', label: "How It's Calculated", icon: <BookOpen className="w-4 h-4 shrink-0" /> },
    { path: '/history', label: `History (${historyCount})`, icon: <History className="w-4 h-4 shrink-0" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand Header */}
          <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3 group min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 font-black text-lg sm:text-xl tracking-tighter group-hover:scale-105 transition-transform shrink-0">
              WCE
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
                <span className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm md:text-base leading-tight tracking-tight truncate">
                  WCE CGPA to Percentage Converter
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shrink-0">
                  <ShieldCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  Official RR 2023-24
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                Walchand College of Engineering, Sangli
              </p>
            </div>
          </Link>

          {/* Theme Toggle */}
          <div className="flex items-center shrink-0">
            <ThemeToggle />
          </div>
        </div>

        {/* Navigation Bar Menu */}
        <nav
          className="flex items-center space-x-1.5 sm:space-x-3 overflow-x-auto no-scrollbar py-2 -mx-3 px-3 sm:mx-0 sm:px-0 border-t border-slate-100 dark:border-slate-800/60"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 min-h-[40px] rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
