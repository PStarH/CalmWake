import React from 'react';
import { format } from 'date-fns';
import { useAlarmStore } from '../store/alarmStore';

export const Clock: React.FC = () => {
  const [time, setTime] = React.useState(new Date());
  const { isNightMode } = useAlarmStore();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`text-6xl md:text-8xl font-extralight tracking-tighter transition-all duration-1000 ${
      isNightMode ? 'text-slate-100/90' : 'text-slate-600/90'
    } text-center`}>
      {format(time, 'HH:mm')}
      <span className="text-2xl md:text-4xl opacity-40 ml-2">
        {format(time, 'ss')}
      </span>
    </div>
  );
};