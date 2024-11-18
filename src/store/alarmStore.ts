import { create } from 'zustand';

interface AlarmState {
  alarmTime: string;
  isAlarmSet: boolean;
  volume: number;
  isNightMode: boolean;
  selectedSound: string;
  setAlarmTime: (time: string) => void;
  toggleAlarm: () => void;
  setVolume: (volume: number) => void;
  toggleNightMode: () => void;
  setSelectedSound: (sound: string) => void;
}

export const useAlarmStore = create<AlarmState>((set) => ({
  alarmTime: '07:00',
  isAlarmSet: false,
  volume: 50,
  isNightMode: false,
  selectedSound: 'gentle-chimes',
  setAlarmTime: (time) => set({ alarmTime: time }),
  toggleAlarm: () => set((state) => ({ isAlarmSet: !state.isAlarmSet })),
  setVolume: (volume) => set({ volume }),
  toggleNightMode: () => set((state) => ({ isNightMode: !state.isNightMode })),
  setSelectedSound: (sound) => set({ selectedSound: sound }),
}));