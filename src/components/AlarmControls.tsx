import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import * as Slider from '@radix-ui/react-slider';
import { useAlarmStore } from '../store/alarmStore';

export const AlarmControls: React.FC = () => {
  const { 
    alarmTime, 
    isAlarmSet, 
    volume, 
    selectedSound,
    setAlarmTime,
    toggleAlarm,
    setVolume,
    setSelectedSound,
    isNightMode
  } = useAlarmStore();

  const sounds = [
    { id: 'gentle-chimes', name: 'Gentle Chimes' },
    { id: 'forest-birds', name: 'Forest Birds' },
    { id: 'ocean-waves', name: 'Ocean Waves' },
  ];

  const baseControlClass = `
    backdrop-blur-sm transition-all duration-500
    ${isNightMode 
      ? 'bg-white/5 hover:bg-white/10 border-white/10' 
      : 'bg-black/5 hover:bg-black/10 border-black/10'}
    border rounded-2xl
  `;

  return (
    <div className="space-y-8 w-full max-w-md md:max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <input
          type="time"
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value)}
          className={`${baseControlClass} px-4 md:px-6 py-3 md:py-4 text-lg font-light tracking-wide w-full md:w-auto`}
        />
        <Switch.Root
          checked={isAlarmSet}
          onCheckedChange={toggleAlarm}
          className={`mt-4 md:mt-0 md:ml-4 w-14 h-7 rounded-full transition-all duration-500 
            ${isNightMode 
              ? 'bg-white/10' 
              : 'bg-black/10'} 
            data-[state=checked]:bg-teal-400/50`}
        >
          <Switch.Thumb className={`block w-6 h-6 rounded-full shadow-sm transition-all duration-500 translate-x-0.5 
            ${isNightMode 
              ? 'bg-white/90' 
              : 'bg-white'} 
            will-change-transform data-[state=checked]:translate-x-[22px]`} />
        </Switch.Root>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-light opacity-60">Volume</label>
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-6"
          value={[volume]}
          onValueChange={([v]) => setVolume(v)}
          max={100}
          step={1}
        >
          <Slider.Track className={`relative grow rounded-full h-1 transition-all duration-500
            ${isNightMode ? 'bg-white/10' : 'bg-black/10'}`}>
            <Slider.Range className="absolute bg-teal-400/50 rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb className={`block w-5 h-5 rounded-full shadow-sm transition-all duration-500
            ${isNightMode 
              ? 'bg-white/90 hover:bg-white' 
              : 'bg-white hover:shadow-md'}`} />
        </Slider.Root>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-light opacity-60">Wake-up Sound</label>
        <select
          value={selectedSound}
          onChange={(e) => setSelectedSound(e.target.value)}
          className={`${baseControlClass} w-full px-4 md:px-6 py-3 md:py-4 text-lg font-light appearance-none`}
        >
          {sounds.map((sound) => (
            <option key={sound.id} value={sound.id} 
              className={isNightMode ? 'text-slate-200 bg-slate-800' : 'text-slate-600 bg-white'}>
              {sound.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};