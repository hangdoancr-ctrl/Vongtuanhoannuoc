import React, { useState } from 'react';
import { Play, User, GraduationCap, Timer, Award, HelpCircle, ShieldCheck, Sparkles } from 'lucide-react';

interface StartScreenProps {
  onStartGame: (name: string, className: string) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const quickClasses = ['4A', '4B', '4C', '4/1', '4/2', '4/3'];

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage('Vui lòng nhập Họ và tên của em nhé!');
      return;
    }
    if (!className.trim()) {
      setErrorMessage('Vui lòng nhập Lớp học của em nhé!');
      return;
    }

    setErrorMessage('');
    // Lock start button for 300ms immediately to prevent double click
    setIsSubmitDisabled(true);

    setTimeout(() => {
      onStartGame(name.trim(), className.trim());
    }, 300);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-blue-100 overflow-hidden transition-all">
      {/* Top Banner Hero */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-500 p-6 text-white text-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-sky-300/20 rounded-full blur-xl pointer-events-none" />

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-3 border border-white/20 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          Môn Khoa Học Lớp 4
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          AI SMART STUDENT
        </h2>

        <p className="text-blue-100 text-sm font-medium leading-relaxed max-w-xs mx-auto">
          Thử thách kiến thức về Vòng tuần hoàn của nước và sử dụng AI thông minh, an toàn, trung thực!
        </p>
      </div>

      {/* Info Pills */}
      <div className="grid grid-cols-3 gap-2 p-4 bg-blue-50/60 border-b border-blue-100/60 text-center">
        <div className="bg-white p-2.5 rounded-2xl border border-blue-100/80 shadow-xs flex flex-col items-center justify-center">
          <Timer className="w-5 h-5 text-blue-600 mb-1" />
          <span className="text-[11px] font-bold text-slate-500">Thời gian</span>
          <span className="text-xs font-black text-slate-800">2 Phút</span>
        </div>

        <div className="bg-white p-2.5 rounded-2xl border border-blue-100/80 shadow-xs flex flex-col items-center justify-center">
          <HelpCircle className="w-5 h-5 text-indigo-600 mb-1" />
          <span className="text-[11px] font-bold text-slate-500">Số câu hỏi</span>
          <span className="text-xs font-black text-slate-800">10 Câu</span>
        </div>

        <div className="bg-white p-2.5 rounded-2xl border border-blue-100/80 shadow-xs flex flex-col items-center justify-center">
          <Award className="w-5 h-5 text-amber-500 mb-1" />
          <span className="text-[11px] font-bold text-slate-500">Điểm tối đa</span>
          <span className="text-xs font-black text-slate-800">10 Điểm</span>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleStart} className="p-5 sm:p-6 space-y-4">
        {errorMessage && (
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-shake">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            {errorMessage}
          </div>
        )}

        {/* Name Input */}
        <div>
          <label className="block text-xs font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-4 h-4 text-blue-600" />
            Họ và tên học sinh <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Nguyễn Văn An"
            className="w-full h-12 px-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-slate-50 focus:bg-white text-slate-800 font-bold placeholder:font-normal placeholder:text-slate-400 transition-all outline-hidden text-base"
            maxLength={40}
          />
        </div>

        {/* Class Input */}
        <div>
          <label className="block text-xs font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            Lớp học <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Ví dụ: 4A hoặc 4/1"
            className="w-full h-12 px-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 bg-slate-50 focus:bg-white text-slate-800 font-bold placeholder:font-normal placeholder:text-slate-400 transition-all outline-hidden text-base"
            maxLength={15}
          />

          {/* Quick select buttons */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="text-[11px] font-semibold text-slate-400 mr-1">Chọn nhanh:</span>
            {quickClasses.map((cls) => (
              <button
                key={cls}
                type="button"
                onClick={() => setClassName(cls)}
                className={`px-2.5 py-1 text-xs rounded-xl font-extrabold transition-all ${
                  className === cls
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Guide Notice */}
        <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200/80 text-amber-900 text-xs leading-relaxed flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-extrabold mb-0.5">Quy định chơi:</p>
            <p className="text-[12px] font-medium text-amber-800">
              Mỗi câu trả lời đúng được <strong>1 điểm</strong> (hoặc 0.5 điểm/câu). Ngay sau khi chọn đáp án, em sẽ nhận được giải thích ngắn gọn để ghi nhớ kiến thức nhé!
            </p>
          </div>
        </div>

        {/* Start Game Button */}
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`w-full min-h-[52px] rounded-2xl font-black text-lg text-white shadow-lg transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer active:scale-98 ${
            isSubmitDisabled
              ? 'bg-slate-300 shadow-none cursor-not-allowed opacity-70'
              : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 hover:brightness-105 shadow-blue-500/25'
          }`}
        >
          <Play className="w-5 h-5 fill-current" />
          <span>BẮT ĐẦU CHƠI GAME</span>
        </button>
      </form>
    </div>
  );
};
