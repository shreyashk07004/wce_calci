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
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#151921]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand Header */}
          <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3 group min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-rose-900 dark:bg-rose-800 flex items-center justify-center text-white font-serif font-bold text-base sm:text-lg tracking-normal shrink-0 select-none shadow-sm">
              WCE
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <span className="font-serif font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base leading-tight truncate">
                  WCE CGPA Converter
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs text-rose-900 bg-rose-50 border border-rose-200 dark:bg-rose-950/80 dark:text-rose-200 dark:border-rose-900 shrink-0 font-sans">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-800 dark:text-rose-300" />
                  Official RR 2023-24
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans truncate">
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
          className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-2 -mx-3 px-3 sm:mx-0 sm:px-0 border-t border-slate-100 dark:border-slate-800/80"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3.5 py-2 min-h-[38px] rounded-md text-xs font-semibold whitespace-nowrap transition-colors font-sans ${
                  isActive
                    ? 'bg-rose-900 dark:bg-rose-800 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
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
