import React, { useState, useEffect } from 'react';
import type { CalculationHistoryItem } from '../types/grade';
import { getHistory, clearHistory, isLocalStorageAvailable } from '../utils/storage';
import { History, Trash2, Calendar, AlertCircle, Copy, CheckCircle2 } from 'lucide-react';

interface Props {
  onHistoryChanged: () => void;
}

export const HistoryPanel: React.FC<Props> = ({ onHistoryChanged }) => {
  const [historyItems, setHistoryItems] = useState<CalculationHistoryItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const isAvailable = isLocalStorageAvailable();

  useEffect(() => {
    setHistoryItems(getHistory());
  }, []);

  const handleClear = () => {
    if (confirm('Are you sure you want to clear your calculation history?')) {
      clearHistory();
      setHistoryItems([]);
      onHistoryChanged();
    }
  };

  const handleCopyItem = (item: CalculationHistoryItem) => {
    const text = `${item.title}: ${item.summary}\n${item.details || ''}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return isoStr;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-1 sm:px-0 font-sans">
      {/* Editorial Page Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800 space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-[#8D5B0F] dark:text-[#DE9F42] font-sans font-medium">
            Saved Client-Side Calculations (Browser localStorage)
          </div>
          {historyItems.length > 0 && (
            <button
              onClick={handleClear}
              type="button"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1 min-h-[30px] rounded-sm text-xs font-medium text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800/80 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5 shrink-0" />
              <span>Clear History</span>
            </button>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Calculation History
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Your recent calculations saved locally on your device. No data ever leaves your browser.
        </p>
      </div>

      {!isAvailable && (
        <div className="p-3.5 rounded-sm bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-900 text-red-900 dark:text-red-200 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
          <span>
            LocalStorage is unavailable in your browser or private mode. Calculations will not persist across page reloads.
          </span>
        </div>
      )}

      {historyItems.length === 0 ? (
        <div className="bg-white dark:bg-[#242933] rounded-sm p-8 sm:p-12 border border-slate-200 dark:border-slate-700/80 text-center space-y-3 font-sans">
          <History className="w-8 h-8 text-slate-400 dark:text-slate-500 mx-auto" />
          <h2 className="text-base font-serif font-bold text-slate-800 dark:text-slate-200">No Calculations Saved Yet</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            Use the CGPA to Percentage Converter and click "Save" to keep track of your calculations.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {historyItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#242933] rounded-sm p-4 border border-slate-200 dark:border-slate-700/80 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 font-sans"
            >
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-sm text-xs font-semibold bg-amber-50 dark:bg-[#1B1F27] text-[#8D5B0F] dark:text-[#DE9F42] border border-[#8D5B0F]/30 dark:border-[#DE9F42]/30 shrink-0">
                    {item.title}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-sans flex items-center gap-1 shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(item.timestamp)}
                  </span>
                </div>
                <div className="text-sm sm:text-base font-mono font-bold text-slate-900 dark:text-white truncate">
                  {item.summary}
                </div>
                {item.details && (
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 break-all">
                    {item.details}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-700">
                <button
                  onClick={() => handleCopyItem(item)}
                  type="button"
                  className="px-3 py-1.5 min-h-[34px] rounded-sm bg-white dark:bg-[#1B1F27] hover:bg-slate-50 dark:hover:bg-[#2A303C] text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-colors w-full sm:w-auto"
                >
                  {copiedId === item.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <Copy className="w-3.5 h-3.5 shrink-0" />}
                  <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
