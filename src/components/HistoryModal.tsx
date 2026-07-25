import React, { useState } from 'react';
import { X, Trophy, Download, Trash2, History as HistoryIcon, HelpCircle } from 'lucide-react';
import { StoredResult } from '../types';
import { getHistory, clearHistory, exportHistoryToCSV } from '../utils/storage';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose }) => {
  const [historyList, setHistoryList] = useState<StoredResult[]>(getHistory());

  if (!isOpen) return null;

  const handleExportCSV = () => {
    exportHistoryToCSV(historyList);
  };

  const handleClearHistory = () => {
    if (window.confirm('Em/Thầy cô có chắc chắn muốn xóa tất cả lịch sử làm bài trên máy này?')) {
      clearHistory();
      setHistoryList([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-200" />
            <h3 className="font-extrabold text-base">Lịch Sử & Bảng Kết Quả Học Sinh</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="p-3 bg-amber-50/60 border-b border-amber-100 flex items-center justify-between gap-2 shrink-0">
          <span className="text-xs font-bold text-amber-900">
            Tổng lượt chơi: {historyList.length}
          </span>
          <div className="flex items-center gap-2">
            {historyList.length > 0 && (
              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1 shadow-xs transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải CSV Excel</span>
              </button>
            )}
            {historyList.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="px-2.5 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 font-extrabold text-xs rounded-xl flex items-center gap-1 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa</span>
              </button>
            )}
          </div>
        </div>

        {/* History List */}
        <div className="p-4 space-y-2.5 overflow-y-auto flex-1">
          {historyList.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <HistoryIcon className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-xs font-bold">Chưa có lượt làm bài nào được ghi nhận trên thiết bị này.</p>
            </div>
          ) : (
            historyList.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs flex items-center justify-between gap-3 hover:bg-white transition-all"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-slate-800 text-sm truncate">
                      {item.name}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md font-bold text-[10px]">
                      Lớp {item.className}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-semibold">{item.timestamp}</p>
                  {item.needSupport && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md">
                      <HelpCircle className="w-3 h-3" /> Cần hỗ trợ bài học
                    </span>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base font-black text-amber-600">
                    {item.score} <span className="text-[10px] text-slate-400 font-normal">/10đ</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold">
                    {item.correct}/{item.total} câu đúng
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-right shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-all cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
