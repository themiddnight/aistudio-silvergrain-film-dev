import { Beaker, Database, Timer as TimerIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const navItems = [
    { id: 'mixing', label: 'Mixing Recipes', icon: Beaker },
    { id: 'inventory', label: 'Chemical Stock', icon: Database },
    { id: 'develop', label: 'Development', icon: TimerIcon },
  ];

  return (
    <aside className="hidden md:flex w-72 bg-hardware-panel border-r border-white/5 flex-col p-8 shrink-0">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-2xl bg-hardware-accent flex items-center justify-center shadow-lg shadow-hardware-accent/20">
          <Beaker className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">SilverGrain</h1>
          <p className="text-[10px] font-mono text-hardware-muted uppercase tracking-widest">Lab Companion</p>
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-mono text-xs uppercase tracking-widest border",
              activeTab === item.id 
                ? "bg-hardware-accent text-white border-hardware-accent shadow-lg shadow-hardware-accent/20" 
                : "text-hardware-muted border-transparent hover:bg-white/5 hover:text-white hover:border-white/10"
            )}
          >
            <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-white" : "text-hardware-muted")} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          <span className="text-[10px] font-mono text-hardware-muted uppercase tracking-widest">System Operational</span>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[9px] text-hardware-muted font-mono leading-relaxed">
            PRECISION FILM PROCESSING UNIT v2.4.0<br/>
            LAB STATUS: OPTIMAL
          </p>
        </div>
      </div>
    </aside>
  );
};
