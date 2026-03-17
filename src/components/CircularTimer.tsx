import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface CircularTimerProps {
  timeRemaining: number;
  totalTime: number;
  onTimeUp?: () => void;
}

export const CircularTimer = ({ timeRemaining, totalTime, onTimeUp }: CircularTimerProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const percentage = (timeRemaining / totalTime) * 100;
  const isLowTime = percentage < 20;
  const isCritical = percentage < 10;

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (isCritical) return '#ef4444';
    if (isLowTime) return '#f97316';
    return '#06b6d4';
  };

  const getIcon = () => {
    if (isCritical) return <AlertCircle className="w-4 h-4" />;
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(148, 163, 184, 0.2)"
            strokeWidth="3"
          />
          {mounted && (
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={getColor()}
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`transition-all ${isCritical ? 'animate-pulse' : ''}`}
            />
          )}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-2xl font-bold text-white">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          {getIcon() && (
            <div className="mt-1" style={{ color: getColor() }}>
              {getIcon()}
            </div>
          )}
        </div>
      </div>

      {isLowTime && (
        <p className={`text-xs font-semibold mt-3 ${isCritical ? 'text-red-400' : 'text-orange-400'}`}>
          {isCritical ? 'Critical!' : 'Low time'}
        </p>
      )}
    </div>
  );
};
