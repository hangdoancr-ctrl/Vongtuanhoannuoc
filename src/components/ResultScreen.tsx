import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Award,
  RotateCcw,
  Send,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  FileSpreadsheet,
  AlertCircle,
  Sparkles,
  BookOpenCheck,
  Check
} from 'lucide-react';
import { UserAnswer, GameResultPayload } from '../types';
import { sendResultToGoogleSheet } from '../utils/googleSheets';
import { saveResultToHistory } from '../utils/storage';
import { soundManager } from '../utils/audio';

interface ResultScreenProps {
  studentName: string;
  studentClass: string;
  userAnswers: UserAnswer[];
  timeSpentSeconds: number;
  onPlayAgain: () => void;
  onOpenSettings: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  studentName,
  studentClass,
  userAnswers,
  timeSpentSeconds,
  onPlayAgain,
  onOpenSettings
}) => {
  const totalQuestions = userAnswers.length || 10;
  const correctCount = userAnswers.filter((a) => a.isCorrect).length;

  // Each correct answer = 1.0 point (Max 10 points)
  const score = Number((correctCount * 1.0).toFixed(1));

  const wrongAnswers = userAnswers.filter((a) => !a.isCorrect);

  const [needSupport, setNeedSupport] = useState(false);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
  }>({
    submitted: false,
    success: false,
    message: ''
  });

  // Play fanfare sound if high score
  useEffect(() => {
    if (score >= 8.0) {
      soundManager.playFanfareSound();
    }
  }, [score]);

  // Construct formatted wrong list for payload
  const formatWrongListString = () => {
    if (wrongAnswers.length === 0) return 'Không làm sai câu nào (Đạt 10/10)';
    return wrongAnswers
      .map(
        (w, i) =>
          `[Câu ${w.questionId}] Chọn sai: "${w.selectedOptionText}" | Đúng: "${w.correctOptionText}"`
      )
      .join(' ; ');
  };

  const handleSendResult = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const nowStr = new Date().toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const payload: GameResultPayload = {
      timestamp: nowStr,
      name: studentName,
      className: studentClass,
      correct: correctCount,
      total: totalQuestions,
      score: score,
      wrongList: formatWrongListString(),
      needSupport: needSupport,
      comment: comment.trim()
    };

    // Save locally
    saveResultToHistory(payload);

    // Send to Google Sheet Webhook
    const res = await sendResultToGoogleSheet(payload);

    setIsSubmitting(false);
    setSubmitStatus({
      submitted: true,
      success: res.success,
      message: res.message
    });
  };

  // Evaluation badges
  let ratingBadge = {
    title: 'XUẤT SẮC! HỌC SINH AI THÔNG THÁI 🌟',
    desc: 'Em nắm vững tuyệt đối kiến thức Khoa học và Quy tắc sử dụng AI an toàn!',
    color: 'from-amber-500 via-orange-500 to-yellow-500',
    iconColor: 'text-amber-500'
  };

  if (score < 5.0) {
    ratingBadge = {
      title: 'CẦN CỐ GẮNG HƠN NHÉ! 💪',
      desc: 'Hãy đọc lại giải thích ở các câu sai để ôn lại bài nhé!',
      color: 'from-sky-500 via-blue-600 to-indigo-600',
      iconColor: 'text-blue-500'
    };
  } else if (score < 8.0) {
    ratingBadge = {
      title: 'RẤT TỐT! CỐ GẮNG THÊM NHA 👏',
      desc: 'Em đã trả lời đúng nhiều câu hỏi, tiếp tục phát huy nhé!',
      color: 'from-emerald-500 via-teal-600 to-green-600',
      iconColor: 'text-emerald-500'
    };
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden transition-all space-y-0">
      {/* Top Victory Card Header */}
      <div
        className={`bg-gradient-to-br ${ratingBadge.color} p-6 text-white text-center relative overflow-hidden`}
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

        <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
          <Trophy className="w-9 h-9 text-yellow-300 drop-shadow-md" />
        </div>

        <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-1">
          KẾT QUẢ GAME AI SMART STUDENT
        </h2>

        <p className="text-xs font-semibold text-white/90 max-w-xs mx-auto leading-relaxed">
          {ratingBadge.desc}
        </p>
      </div>

      {/* Score & Metrics Dashboard */}
      <div className="p-5 bg-blue-50/50 border-b border-blue-100 grid grid-cols-2 gap-3 text-center">
        {/* Total Score */}
        <div className="bg-white p-3.5 rounded-2xl border border-blue-100 shadow-xs flex flex-col items-center">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">
            Điểm số đạt được
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-blue-600">{score}</span>
            <span className="text-xs font-bold text-slate-400">/ 10.0</span>
          </div>
          <span className="text-[11px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg mt-1">
            {correctCount} / {totalQuestions} câu đúng
          </span>
        </div>

        {/* Time spent */}
        <div className="bg-white p-3.5 rounded-2xl border border-blue-100 shadow-xs flex flex-col items-center">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">
            Thời gian hoàn thành
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-indigo-600">{timeSpentSeconds}</span>
            <span className="text-xs font-bold text-slate-400">giây</span>
          </div>
          <span className="text-[11px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-lg mt-1">
            Lớp: {studentClass}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Wrong Questions Review List */}
        {wrongAnswers.length > 0 ? (
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpenCheck className="w-4 h-4 text-rose-500" />
              <span>Ôn tập các câu cần rút kinh nghiệm ({wrongAnswers.length}):</span>
            </h3>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {wrongAnswers.map((w, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-rose-50/70 rounded-2xl border border-rose-200/80 text-xs space-y-1"
                >
                  <p className="font-extrabold text-slate-800">
                    Câu {w.questionId}: {w.questionText}
                  </p>
                  <p className="font-semibold text-rose-700">
                    ❌ Em chọn: {w.selectedOptionText}
                  </p>
                  <p className="font-bold text-emerald-700">
                    ✅ Đáp án đúng: {w.correctOptionText}
                  </p>
                  <p className="text-[11px] text-slate-600 bg-white p-2 rounded-xl border border-rose-100 italic">
                    💡 {w.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-1">
            <Sparkles className="w-6 h-6 text-emerald-600 mx-auto" />
            <h4 className="font-black text-emerald-800 text-sm">
              HOÀN HẢO! EM KHÔNG SAI CÂU NÀO!
            </h4>
            <p className="text-xs font-semibold text-emerald-700">
              Em đã trả lời đúng 100% tất cả các câu hỏi về Vòng tuần hoàn của nước và AI!
            </p>
          </div>
        )}

        {/* Student Feedback & Need Support Inputs */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
          {/* Checkbox: Need Support */}
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={needSupport}
              onChange={(e) => setNeedSupport(e.target.checked)}
              className="mt-0.5 w-5 h-5 rounded-md border-2 border-blue-500 text-blue-600 focus:ring-blue-400 accent-blue-600"
            />
            <span className="text-xs font-bold text-slate-700 leading-snug">
              Em chưa hiểu rõ bài và cần thầy/cô giáo hỗ trợ thêm.
            </span>
          </label>

          {/* Textarea: Comment */}
          <div>
            <label className="block text-xs font-extrabold text-slate-600 mb-1 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
              <span>Ý kiến hoặc cảm nghĩ của em (không bắt buộc):</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ví dụ: Game rất hay, em đã hiểu nguyên nhân mưa bốc hơi và cách dùng AI tự học..."
              className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-hidden resize-none h-16"
              maxLength={200}
            />
          </div>
        </div>

        {/* Submit Notification Status */}
        {submitStatus.submitted && (
          <div
            className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2 ${
              submitStatus.success
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-amber-50 border border-amber-200 text-amber-800'
            }`}
          >
            {submitStatus.success ? (
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <span>{submitStatus.message}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          {/* Send result button */}
          <button
            onClick={handleSendResult}
            disabled={isSubmitting || submitStatus.submitted}
            className={`w-full min-h-[50px] rounded-2xl font-black text-base text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
              submitStatus.submitted
                ? 'bg-emerald-600 shadow-none cursor-default'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-105 shadow-emerald-500/20'
            }`}
          >
            {isSubmitting ? (
              <span>ĐANG GỬI KẾT QUẢ...</span>
            ) : submitStatus.submitted ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>ĐÃ GỬI CHO GIÁO VIÊN</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>GỬI KẾT QUẢ CHO GIÁO VIÊN</span>
              </>
            )}
          </button>

          {/* Replay Game Button */}
          <button
            onClick={onPlayAgain}
            className="w-full min-h-[48px] rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <RotateCcw className="w-4 h-4 text-blue-600" />
            <span>CHƠI LẠI LƯỢT MỚI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
