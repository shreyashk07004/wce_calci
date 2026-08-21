import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { CgpaToPercentageCalculator } from './components/CgpaToPercentageCalculator';
import { SgpaCalculator } from './components/SgpaCalculator';
import { MultiSemesterCgpaCalculator } from './components/MultiSemesterCgpaCalculator';
import { AttendanceChecker } from './components/AttendanceChecker';
import { HowItsCalculated } from './components/HowItsCalculated';
import { HistoryPanel } from './components/HistoryPanel';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { AboutUs } from './pages/AboutUs';
import { TermsOfUse } from './pages/TermsOfUse';
import { ContactUs } from './pages/ContactUs';
import { Footer } from './components/Footer';
import { getHistory } from './utils/storage';

// Helper component to auto scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const [historyCount, setHistoryCount] = useState<number>(0);

  const refreshHistoryCount = () => {
    setHistoryCount(getHistory().length);
  };

  useEffect(() => {
    refreshHistoryCount();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 font-sans transition-colors">
      <ScrollToTop />
      <Analytics />
      {/* Persistent Navigation Header */}
      <Navbar historyCount={historyCount} />

      {/* Main Content Area with React Router Routes */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          {/* Home Route — CGPA to Percentage Calculator */}
          <Route
            path="/"
            element={<CgpaToPercentageCalculator onHistoryUpdate={refreshHistoryCount} />}
          />
          {/* Dedicated Calculator Routes for SEO */}
          <Route
            path="/sgpa-calculator"
            element={<SgpaCalculator onHistoryUpdate={refreshHistoryCount} />}
          />
          <Route
            path="/multi-semester-cgpa-calculator"
            element={<MultiSemesterCgpaCalculator onHistoryUpdate={refreshHistoryCount} />}
          />
          <Route
            path="/attendance-checker"
            element={<AttendanceChecker onHistoryUpdate={refreshHistoryCount} />}
          />
          <Route
            path="/how-its-calculated"
            element={<HowItsCalculated />}
          />
          <Route
            path="/history"
            element={<HistoryPanel onHistoryChanged={refreshHistoryCount} />}
          />

          {/* Google AdSense Eligibility Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Fallback Route */}
          <Route
            path="*"
            element={<CgpaToPercentageCalculator onHistoryUpdate={refreshHistoryCount} />}
          />
        </Routes>
      </main>

      {/* Persistent Site-Wide Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
