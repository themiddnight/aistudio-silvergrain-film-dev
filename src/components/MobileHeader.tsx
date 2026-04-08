import { Beaker } from 'lucide-react';

export const MobileHeader = () => {
  return (
    <header className="md:hidden h-[76px] py-4 px-6 border-b border-white/5 bg-hardware-panel/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-hardware-accent flex items-center justify-center shadow-lg shadow-hardware-accent/20">
            <Beaker className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">SilverGrain</h1>
            <p className="text-[9px] font-mono text-hardware-muted uppercase tracking-widest">Lab Companion</p>
          </div>
        </div>
      </div>
    </header>
  );
};
