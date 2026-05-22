import { formatNumber } from '@/lib/utils';

interface ProgressMeterProps {
  current: number;
  goal: number;
}

export default function ProgressMeter({ current, goal }: ProgressMeterProps) {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-foreground">
          {formatNumber(current)} <span className="text-muted-foreground font-normal">cheer votes</span>
        </span>
        <span className="text-sm font-semibold text-yellow-700">
          Goal: {formatNumber(goal)}
        </span>
      </div>
      <div className="relative w-full h-3 bg-yellow-100 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 gradient-yellow rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="absolute inset-y-0 left-0 gradient-yellow rounded-full opacity-50 blur-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1.5 text-center">
        {percentage.toFixed(1)}% of goal reached • Support votes on this website
      </p>
    </div>
  );
}
