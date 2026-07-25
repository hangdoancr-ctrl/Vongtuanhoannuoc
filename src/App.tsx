import React, { useState } from 'react';
import { GameScreen, UserAnswer, Question } from './types';
import { QUESTIONS } from './data/questions';
import { Header } from './components/Header';
import { StartScreen } from './components/StartScreen';
import { PlayingScreen } from './components/PlayingScreen';
import { ResultScreen } from './components/ResultScreen';
import { TeacherSettingsModal } from './components/TeacherSettingsModal';
import { HistoryModal } from './components/HistoryModal';

export default function App() {
  const [screen, setScreen] = useState<GameScreen>('START');
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Helper to shuffle questions & choices for fresh gameplay
  const prepareQuestions = (): Question[] => {
    const questionsCopy = [...QUESTIONS];
    // Fisher-Yates shuffle
    for (let i = questionsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questionsCopy[i], questionsCopy[j]] = [questionsCopy[j], questionsCopy[i]];
    }
    return questionsCopy;
  };

  const handleStartGame = (name: string, className: string) => {
    setStudentName(name);
    setStudentClass(className);
    setUserAnswers([]);
    setTimeSpentSeconds(0);
    setShuffledQuestions(prepareQuestions());
    setScreen('PLAYING');
  };

  const handleFinishGame = (answers: UserAnswer[], timeSpent: number) => {
    setUserAnswers(answers);
    setTimeSpentSeconds(timeSpent);
    setScreen('RESULT');
  };

  const handlePlayAgain = () => {
    setUserAnswers([]);
    setTimeSpentSeconds(0);
    setScreen('START');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-3 sm:p-6 flex flex-col justify-between selection:bg-blue-200">
      <div className="w-full max-w-lg mx-auto">
        {/* Header navigation bar */}
        <Header
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenHistory={() => setIsHistoryOpen(true)}
        />

        {/* Dynamic Game Screens */}
        <main className="w-full">
          {screen === 'START' && (
            <StartScreen onStartGame={handleStartGame} />
          )}

          {screen === 'PLAYING' && (
            <PlayingScreen
              studentName={studentName}
              studentClass={studentClass}
              questions={shuffledQuestions}
              onFinishGame={handleFinishGame}
            />
          )}

          {screen === 'RESULT' && (
            <ResultScreen
              studentName={studentName}
              studentClass={studentClass}
              userAnswers={userAnswers}
              timeSpentSeconds={timeSpentSeconds}
              onPlayAgain={handlePlayAgain}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Footer copyright */}
      <footer className="w-full max-w-lg mx-auto text-center mt-6 text-xs text-slate-400 font-semibold space-y-1">
        <p>AI SMART STUDENT • Game Thực Hành Khoa Học Lớp 4</p>
        <p className="text-[11px] text-slate-400/80">Sử dụng Trí tuệ nhân tạo Thông minh - An toàn - Trung thực trong học tập</p>
      </footer>

      {/* Settings & History Modals */}
      <TeacherSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </div>
  );
}
