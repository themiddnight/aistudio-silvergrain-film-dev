import { Beaker, Database, Timer as TimerIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileNav = ({ activeTab, setActiveTab }: MobileNavProps) => {
  const navItems = [
    { id: 'mixing', label: 'Mixing', icon: Beaker },
    { id: 'inventory', label: 'Stock', icon: Database },
    { id: 'develop', label: 'Develop', icon: TimerIcon },
  ];

  return (
    <nav className="md:hidden h-[67px] border-t border-white/5 bg-hardware-panel/80 backdrop-blur-xl fixed bottom-0 left-0 right-0 px-6 flex items-center justify-between z-50">
      {navItems.map((item) => (
        <button 
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            activeTab === item.id ? "text-hardware-accent" : "text-white hover:text-white/80"
          )}
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[10px] font-mono uppercase font-bold">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
