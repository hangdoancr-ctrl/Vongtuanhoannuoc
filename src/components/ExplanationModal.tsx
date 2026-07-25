import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { UserAnswer } from '../types';

interface ExplanationModalProps {
  answer: UserAnswer;
  isLastQuestion: boolean;
  onNext: () => void;
}

export const ExplanationModal: React.FC<ExplanationModalProps> = ({
  answer,
  isLastQuestion,
  onNext,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-scale-up">
        {/* Header feedback banner */}
        <div
          className={`p-5 text-white flex items-center gap-3 ${
            answer.isCorrect
              ? 'bg-gradient-to-r from-emerald-500 to-green-600'
              : 'bg-gradient-to-r from-rose-500 to-red-600'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
            {answer.isCorrect ? (
              <CheckCircle2 className="w-7 h-7 text-white" />
            ) : (
              <XCircle className="w-7 h-7 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-black">
              {answer.isCorrect ? 'CHÍNH XÁC! HOÀN HẢO 🎉' : 'TIẾC QUÁ, CHƯA ĐÚNG! 💡'}
            </h3>
            <p className="text-xs text-white/90 font-semibold">
              {answer.isCorrect
                ? 'Em đã chọn đáp án hoàn toàn chính xác!'
                : 'Hãy cùng xem giải thích để nhớ lâu hơn nhé!'}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          {/* Question repeat */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block mb-1">
              Câu hỏi:
            </span>
            <p className="text-sm font-bold text-slate-800 leading-snug">
              {answer.questionText}
            </p>
          </div>

          {/* User selection & correct option */}
          {!answer.isCorrect && (
            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200/80 space-y-1">
              <span className="text-[11px] font-extrabold uppercase text-rose-500 tracking-wider block">
                Đáp án em đã chọn:
              </span>
              <p className="text-sm font-extrabold text-rose-800">
                ❌ {answer.selectedOptionText}
              </p>
            </div>
          )}

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/80 space-y-1">
            <span className="text-[11px] font-extrabold uppercase text-emerald-600 tracking-wider block">
              Đáp án đúng chuẩn:
            </span>
            <p className="text-sm font-extrabold text-emerald-800">
              ✅ {answer.correctOptionText}
            </p>
          </div>

          {/* Explanation Box */}
          <div className="p-4 bg-amber-50/90 rounded-2xl border border-amber-200/90 text-amber-950 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-700 font-extrabold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 fill-amber-400 text-amber-600" />
              <span>Giải thích chi tiết:</span>
            </div>
            <p className="text-sm font-semibold leading-relaxed text-slate-700">
              {answer.explanation}
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={onNext}
            className="w-full min-h-[50px] rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 hover:brightness-105 text-white font-black text-base shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>{isLastQuestion ? 'XEM KẾT QUẢ CUỐI CÙNG' : 'CÂU TIẾP THEO'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
