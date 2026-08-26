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
      {/* Header Banner */}
      <div className="bg-slate-900 dark:bg-[#151921] rounded-xl p-5 sm:p-7 text-white border-l-4 border-rose-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-sans text-slate-300 bg-slate-800 border border-slate-700 mb-2">
            <History className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span>Browser Local Storage Only</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white">Calculation History</h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
            Your recent calculations saved locally on your device. No data ever leaves your browser.
          </p>
        </div>
        {historyItems.length > 0 && (
          <button
            onClick={handleClear}
            type="button"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[38px] rounded-md bg-amber-700 hover:bg-amber-800 text-xs font-semibold text-white transition-colors shrink-0 w-full sm:w-auto"
          >
            <Trash2 className="w-4 h-4 shrink-0" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {!isAvailable && (
        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-amber-700 dark:text-amber-400" />
          <span>
            LocalStorage is unavailable in your browser or private mode. Calculations will not persist across page reloads.
          </span>
        </div>
      )}

      {historyItems.length === 0 ? (
        <div className="bg-white dark:bg-[#151921] rounded-xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 text-center space-y-3 font-sans">
          <History className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto" />
          <h3 className="text-base font-serif font-bold text-slate-800 dark:text-slate-200">No Calculations Saved Yet</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            Use the CGPA to Percentage Converter and click "Save" to keep track of your calculations.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {historyItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#151921] rounded-xl p-4 border border-slate-200 dark:border-slate-800 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 font-sans"
            >
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-900 shrink-0">
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

              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleCopyItem(item)}
                  type="button"
                  className="px-3.5 py-2 min-h-[38px] rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors w-full sm:w-auto"
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
