import React, { useState } from 'react';
import { Volume2, VolumeX, Settings, History, Sparkles, Droplet } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenHistory: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings, onOpenHistory }) => {
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());

  const toggleMute = () => {
    const nextState = !isMuted;
    soundManager.setMuted(nextState);
    setIsMuted(nextState);
  };

  return (
    <header className="w-full max-w-lg mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-blue-100 p-3 mb-3 flex items-center justify-between">
      {/* Brand logo & title */}
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
          <Droplet className="w-5 h-5 fill-current" />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <h1 className="font-extrabold text-lg leading-tight tracking-tight text-slate-800">
              AI SMART <span className="text-blue-600">STUDENT</span>
            </h1>
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
          </div>
          <p className="text-[11px] font-semibold text-slate-500">
            Khoa học lớp 4 • Vòng tuần hoàn & AI
          </p>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={toggleMute}
          title={isMuted ? 'Mở âm thanh' : 'Tắt âm thanh'}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
            isMuted
              ? 'bg-slate-100 text-slate-400 hover:bg-slate-200'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={onOpenHistory}
          title="Bảng xếp hạng & Lịch sử"
          className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 flex items-center justify-center transition-all"
        >
          <History className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenSettings}
          title="Cấu hình Google Sheet"
          className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 flex items-center justify-center transition-all"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
