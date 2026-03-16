import { useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  timeRemaining: number;
  onTick: (newTime: number) => void;
  onTimeUp: () => void;
}

export const Timer = ({ timeRemaining, onTick, onTimeUp }: TimerProps) => {
  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      const newTime = timeRemaining - 1;
      onTick(newTime);
      if (newTime <= 0) {
        onTimeUp();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, onTick, onTimeUp]);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const isWarning = timeRemaining < 600;

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-semibold ${
      isWarning ? 'bg-red-100 text-red-700' : 'bg-blue-50 text-blue-900'
    }`}>
      <Clock className="w-5 h-5" />
      <span>
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};
