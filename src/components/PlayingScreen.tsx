import React, { useState, useEffect } from 'react';
import { Timer, CheckCircle2, XCircle, Sparkles, BookOpen, AlertCircle } from 'lucide-react';
import { Question, UserAnswer } from '../types';
import { soundManager } from '../utils/audio';
import { ExplanationModal } from './ExplanationModal';

interface PlayingScreenProps {
  studentName: string;
  studentClass: string;
  questions: Question[];
  onFinishGame: (userAnswers: UserAnswer[], timeSpentSeconds: number) => void;
}

export const PlayingScreen: React.FC<PlayingScreenProps> = ({
  studentName,
  studentClass,
  questions,
  onFinishGame,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes = 120s
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isOptionLocked, setIsOptionLocked] = useState(false);
  const [flashEffect, setFlashEffect] = useState<'success' | 'error' | null>(null);
  const [activeExplanation, setActiveExplanation] = useState<UserAnswer | null>(null);

  const currentQuestion = questions[currentIndex];
  const optionPrefixes = ['A', 'B', 'C', 'D'];

  // 120-second Countdown Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      // Time up! End game automatically with whatever answered so far
      onFinishGame(userAnswers, 120);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, userAnswers, onFinishGame]);

  // Format time (e.g. 01:45)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle Option Selection
  const handleSelectOption = (index: number) => {
    if (isOptionLocked) return;

    // Lock choices immediately to prevent double tapping
    setIsOptionLocked(true);
    setSelectedOptionIndex(index);

    const isCorrect = index === currentQuestion.correctIndex;

    // Sound effect trigger via Web Audio API
    if (isCorrect) {
      soundManager.playCorrectSound();
      setFlashEffect('success');
    } else {
      soundManager.playWrongSound();
      setFlashEffect('error');
    }

    const answerRecord: UserAnswer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      selectedOptionIndex: index,
      selectedOptionText: currentQuestion.options[index],
      correctOptionIndex: currentQuestion.correctIndex,
      correctOptionText: currentQuestion.options[currentQuestion.correctIndex],
      isCorrect,
      explanation: currentQuestion.explanation,
    };

    const updatedAnswers = [...userAnswers, answerRecord];
    setUserAnswers(updatedAnswers);

    // After brief flash delay (400ms), show explanation modal
    setTimeout(() => {
      setFlashEffect(null);
      setActiveExplanation(answerRecord);
    }, 450);
  };

  // Advance to next question after reviewing explanation
  const handleNextFromExplanation = () => {
    setActiveExplanation(null);
    setSelectedOptionIndex(null);
    setIsOptionLocked(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // All 10 questions answered -> finish game!
      const timeSpent = 120 - timeLeft;
      onFinishGame(userAnswers, timeSpent);
    }
  };

  const isLowTime = timeLeft <= 30;

  return (
    <div
      className={`w-full max-w-lg mx-auto bg-white rounded-3xl shadow-xl border transition-all duration-300 relative overflow-hidden ${
        flashEffect === 'success'
          ? 'animate-flash-success border-emerald-400 ring-4 ring-emerald-100'
          : flashEffect === 'error'
          ? 'animate-flash-error border-rose-400 ring-4 ring-rose-100'
          : 'border-blue-100'
      }`}
    >
      {/* Game Header Bar */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
        {/* Student Name & Class */}
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
            {studentClass}
          </div>
          <div className="truncate">
            <h3 className="font-extrabold text-sm truncate">{studentName}</h3>
            <p className="text-[11px] text-slate-400 font-semibold">Lớp {studentClass}</p>
          </div>
        </div>

        {/* Timer Badge */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-black text-sm transition-all ${
            isLowTime
              ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
              : 'bg-slate-800 text-amber-400 border border-slate-700'
          }`}
        >
          <Timer className={`w-4 h-4 ${isLowTime ? 'animate-spin' : ''}`} />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress Bar & Topic Banner */}
      <div className="bg-blue-50/80 px-4 py-3 border-b border-blue-100 flex items-center justify-between gap-3">
        {/* Question Counter */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs font-black text-blue-700 bg-blue-200/80 px-2.5 py-1 rounded-xl">
            Câu {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Visual Topic Tag */}
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-white px-2.5 py-1 rounded-xl border border-blue-100 truncate">
          <BookOpen className="w-3.5 h-3.5 text-blue-500" />
          <span className="truncate">{currentQuestion.topicName}</span>
        </span>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full bg-slate-100 h-2">
        <div
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 h-2 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Main Question Body */}
      <div className="p-5 sm:p-6 space-y-5">
        {/* Question Text (Minimum 18px size) */}
        <div className="min-h-[80px] flex items-center">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 leading-snug tracking-tight">
            {currentQuestion.question}
          </h2>
        </div>

        {/* 4 Answer Options (Minimum 16px text, 48px height touch target) */}
        <div className="space-y-3">
          {currentQuestion.options.map((optionText, idx) => {
            const isSelected = selectedOptionIndex === idx;
            const isCorrectOption = idx === currentQuestion.correctIndex;

            let buttonClass =
              'border-2 border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-400 hover:bg-blue-50/50';

            if (isOptionLocked) {
              if (isSelected) {
                if (isCorrectOption) {
                  buttonClass = 'border-2 border-emerald-500 bg-emerald-50 text-emerald-900 shadow-md shadow-emerald-500/10';
                } else {
                  buttonClass = 'border-2 border-rose-500 bg-rose-50 text-rose-900 shadow-md shadow-rose-500/10';
                }
              } else if (isCorrectOption && isOptionLocked) {
                // Highlight correct option if student chose wrong
                buttonClass = 'border-2 border-emerald-400 bg-emerald-50/60 text-emerald-900';
              } else {
                buttonClass = 'border-2 border-slate-100 bg-slate-50/50 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isOptionLocked}
                onClick={() => handleSelectOption(idx)}
                className={`w-full min-h-[56px] p-3.5 rounded-2xl text-left font-bold transition-all flex items-center justify-between gap-3 text-base cursor-pointer ${buttonClass}`}
              >
                <div className="flex items-center gap-3">
                  {/* Option Badge A, B, C, D */}
                  <span
                    className={`w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center shrink-0 ${
                      isSelected && isCorrectOption
                        ? 'bg-emerald-600 text-white'
                        : isSelected && !isCorrectOption
                        ? 'bg-rose-600 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 shadow-xs'
                    }`}
                  >
                    {optionPrefixes[idx]}
                  </span>
                  <span className="leading-snug">{optionText}</span>
                </div>

                {/* Selected Status Icon */}
                {isOptionLocked && isSelected && (
                  <div className="shrink-0">
                    {isCorrectOption ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-600" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Subtle timer tip */}
        {isLowTime && (
          <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 text-rose-700 text-xs font-bold flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Sắp hết thời gian! Hãy nhanh tay chọn đáp án nhé!</span>
          </div>
        )}
      </div>

      {/* Explanation Popup Modal */}
      {activeExplanation && (
        <ExplanationModal
          answer={activeExplanation}
          isLastQuestion={currentIndex === questions.length - 1}
          onNext={handleNextFromExplanation}
        />
      )}
    </div>
  );
};
