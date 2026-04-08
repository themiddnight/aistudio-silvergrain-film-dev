import { motion } from 'motion/react';
import { Droplets } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn, formatTime } from '@/lib/utils';

interface TimerDisplayProps {
  seconds: number;
  totalSeconds: number;
  label: string;
  isAgitating: boolean;
}

export const TimerDisplay = ({ seconds, totalSeconds, label, isAgitating }: TimerDisplayProps) => {
  const progress = (seconds / totalSeconds) * 100;
  
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-hardware-panel rounded-2xl border border-white/10 shadow-2xl">
      <div className="text-sm font-mono uppercase tracking-widest text-hardware-muted">{label}</div>
      <div className={cn(
        "text-7xl font-mono font-bold tracking-tighter transition-colors duration-300",
        isAgitating ? "text-hardware-accent" : "text-white"
      )}>
        {formatTime(seconds)}
      </div>
      <div className="w-full max-w-xs space-y-2">
        <Progress value={progress} className="h-2 bg-white/5" />
        <div className="flex justify-between text-[10px] font-mono text-hardware-muted uppercase tracking-tighter">
          <span>0:00</span>
          <span>{formatTime(totalSeconds)}</span>
        </div>
      </div>
      {isAgitating && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-1 bg-hardware-accent/20 border border-hardware-accent/30 rounded-full"
        >
          <Droplets className="w-3 h-3 text-hardware-accent animate-pulse" />
          <span className="text-[10px] font-bold uppercase text-hardware-accent">Agitate Now</span>
        </motion.div>
      )}
    </div>
  );
};
