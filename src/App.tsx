import React, { useEffect, useRef, useState } from 'react';
import { Clock } from './components/Clock';
import { AlarmControls } from './components/AlarmControls';
import { NightMode } from './components/NightMode';
import { useAlarmStore } from './store/alarmStore';

export default function App() {
  const { isNightMode, isAlarmSet, alarmTime, selectedSound, volume } = useAlarmStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const [lastAlarmDate, setLastAlarmDate] = useState<string | null>(null);

  useEffect(() => {
    if (!isAlarmSet) return;

    const checkAlarm = () => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // Format: "HH:mm"
      const today = now.toDateString();

      // Prevent multiple triggers within the same day and minute
      if (currentTime === alarmTime && today !== lastAlarmDate) {
        if (audioRef.current) {
          audioRef.current.volume = volume / 100;
          audioRef.current.play().catch((error) => {
            console.error('Error playing audio:', error);
          });
          setIsAlarmPlaying(true);
          setLastAlarmDate(today);
        }
      }
    };

    const timer = setInterval(checkAlarm, 1000);

    return () => clearInterval(timer);
  }, [isAlarmSet, alarmTime, selectedSound, volume, lastAlarmDate]);

  const handleStopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsAlarmPlaying(false);
    setLastAlarmDate(null);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 md:p-8 transition-all duration-1000 ${
        isNightMode
          ? 'bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-slate-900/95 text-slate-200'
          : 'bg-gradient-to-b from-sky-50/95 via-slate-50/95 to-sky-50/95 text-slate-600'
      }`}
    >
      <NightMode />
      <div className="space-y-16 p-8 md:p-16 rounded-[3rem] w-full max-w-md md:max-w-2xl transition-all duration-700">
        <Clock />
        <AlarmControls />
      </div>
      {isAlarmPlaying && (
        <div className="fixed bottom-4 right-4 p-4 bg-gray-800 bg-opacity-75 rounded-lg">
          <p className="text-white mb-2">Alarm is ringing!</p>
          <button
            onClick={handleStopAlarm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Stop Alarm
          </button>
        </div>
      )}
      <audio ref={audioRef} src={`/sounds/${selectedSound}.mp3`} loop preload="auto" />
    </div>
  );
}