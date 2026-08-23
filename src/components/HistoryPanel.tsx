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
    <div className="space-y-6 max-w-4xl mx-auto px-1 sm:px-0">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-900 rounded-2xl p-4 sm:p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-700 text-slate-200 mb-2">
            <History className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>Browser Local Storage Only</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Calculation History</h2>
          <p className="text-slate-400 text-xs mt-1 leading-relaxed">
            Your recent calculations saved locally on your device. No data ever leaves your browser.
          </p>
        </div>
        {historyItems.length > 0 && (
          <button
            onClick={handleClear}
            type="button"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[40px] rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-semibold text-white transition-all shadow-sm shrink-0 w-full sm:w-auto"
          >
            <Trash2 className="w-4 h-4 shrink-0" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {!isAvailable && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>
            LocalStorage is unavailable in your browser or private mode. Calculations will not persist across page reloads.
          </span>
        </div>
      )}

      {historyItems.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 text-center space-y-3 shadow-sm">
          <History className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200">No Calculations Saved Yet</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            Use the CGPA to Percentage Converter and click "Save" to keep track of your calculations.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {historyItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
            >
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 uppercase tracking-wider shrink-0">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 shrink-0">
                    <Calendar className="w-3 h-3" />
                    {formatDate(item.timestamp)}
                  </span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white truncate">
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
                  className="px-3.5 py-2 min-h-[40px] rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors w-full sm:w-auto"
                >
                  {copiedId === item.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> : <Copy className="w-3.5 h-3.5 shrink-0" />}
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
