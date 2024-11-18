import React from 'react';
import { useAlarmStore } from '../store/alarmStore';

export const NightMode: React.FC = () => {
  const { isNightMode, toggleNightMode } = useAlarmStore();

  return (
    <button
      onClick={toggleNightMode}
      className={`
        fixed top-4 right-4 md:top-8 md:right-8 p-3 md:p-5 rounded-full
        transition-all duration-700
        backdrop-blur-sm border
        ${isNightMode 
          ? 'bg-white/5 hover:bg-white/10 border-white/10 text-yellow-200/90' 
          : 'bg-black/5 hover:bg-black/10 border-black/10 text-blue-400/90'}
      `}
    >
      {isNightMode ? '☀️' : '🌙'}
    </button>
  );
};