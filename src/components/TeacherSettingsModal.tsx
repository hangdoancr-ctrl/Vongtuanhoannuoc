import React, { useState } from 'react';
import { X, Save, Copy, Check, FileSpreadsheet, Settings, ExternalLink, ShieldCheck } from 'lucide-react';
import { getWebhookUrl, setWebhookUrl, GOOGLE_APPS_SCRIPT_CODE } from '../utils/googleSheets';

interface TeacherSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherSettingsModal: React.FC<TeacherSettingsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [url, setUrl] = useState(getWebhookUrl());
  const [copiedScript, setCopiedScript] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setWebhookUrl(url);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 800);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-300" />
            <h3 className="font-extrabold text-base">Cấu Hình Google Sheet Cho Giáo Viên</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Webhook Input */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4 text-purple-600" />
              <span>URL Webhook Google Apps Script:</span>
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/.../exec"
              className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-xs font-mono text-slate-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-hidden"
            />
            <p className="text-[11px] text-slate-500 font-semibold mt-1">
              Nhập link Web App sau khi triển khai Apps Script trên Google Sheet của thầy/cô.
            </p>
          </div>

          {/* Quick Guide to Setup Google Apps Script */}
          <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200/80 text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-purple-900 font-extrabold">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>Hướng dẫn 3 bước tạo Google Sheet nhận kết quả:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-700 font-semibold text-[11px] leading-relaxed">
              <li>Mở Google Sheet mới &rarr; Vào menu <strong>Extensions (Tiện ích mở rộng)</strong> &rarr; <strong>Apps Script</strong>.</li>
              <li>Dán mã code bên dưới vào Apps Script và lưu lại.</li>
              <li>Bấm <strong>Deploy (Triển khai)</strong> &rarr; <strong>New deployment (Triển khai mới)</strong> &rarr; Chọn Web App, cấp quyền và copy link Web app dán vào ô trên!</li>
            </ol>

            {/* Copy code button */}
            <button
              onClick={handleCopyScript}
              className="w-full py-2 px-3 bg-white hover:bg-purple-100 text-purple-700 font-extrabold text-xs rounded-xl border border-purple-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copiedScript ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>ĐÃ COPY MÃ CÂU LỆNH APPS SCRIPT!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-purple-600" />
                  <span>SAO CHÉP MÃ CODE GOOGLE APPS SCRIPT</span>
                </>
              )}
            </button>
          </div>

          {/* Apps Script code preview block */}
          <div className="relative">
            <span className="text-[10px] font-bold text-slate-400 block mb-1">Mẫu Code Apps Script:</span>
            <pre className="p-3 bg-slate-900 text-emerald-400 text-[10px] font-mono rounded-xl max-h-36 overflow-y-auto leading-relaxed">
              {GOOGLE_APPS_SCRIPT_CODE}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300 transition-all cursor-pointer"
          >
            Đóng
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>ĐÃ LƯU!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>LƯU CẤU HÌNH</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
