import { Clock } from './components/Clock';
import { AlarmControls } from './components/AlarmControls';
import { NightMode } from './components/NightMode';
import { useAlarmStore } from './store/alarmStore';

export default function App() {
  const { isNightMode } = useAlarmStore();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 md:p-8 transition-all duration-1000 ${
      isNightMode 
        ? 'bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-slate-900/95 text-slate-200' 
        : 'bg-gradient-to-b from-sky-50/95 via-slate-50/95 to-sky-50/95 text-slate-600'
    }`}>
      <NightMode />
      <div className="space-y-16 p-8 md:p-16 rounded-[3rem] w-full max-w-md md:max-w-2xl transition-all duration-700">
        <Clock />
        <AlarmControls />
      </div>
    </div>
  );
}