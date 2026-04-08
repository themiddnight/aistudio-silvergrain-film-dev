import { useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { MixingRecipe, DevPreset, DevStep, AgitationMethod, InventoryItem } from './types';
import { Sidebar } from './components/Sidebar';
import { MobileHeader } from './components/MobileHeader';
import { MobileNav } from './components/MobileNav';
import { MixingTab } from './components/MixingTab';
import { InventoryTab } from './components/InventoryTab';
import { DevelopTab } from './components/DevelopTab';
import { useStore } from './store/useStore';

export default function App() {
  const {
    recipes,
    inventory,
    kits,
    presets,
    activeTab,
    activeMixingSession,
    tankType,
    agitationMethod,
    pushPull,
    rollCount,
    selectedDeveloperId,
    mixingFilter,
    inventoryFilter,
    activePreset,
    selectedTemp,
    currentStepIndex,
    timeLeft,
    isRunning,
    isFinished,
    setActiveTab,
    setInventory,
    addInventoryItem,
    deleteInventoryItem,
    addKit,
    deleteKit,
    setTankType,
    setAgitationMethod,
    setPushPull,
    setRollCount,
    setSelectedDeveloperId,
    setSelectedTemp,
    setMixingFilter,
    setInventoryFilter,
    setActiveMixingSession,
    setActivePreset,
    setCurrentStepIndex,
    setTimeLeft,
    setIsRunning,
    setIsFinished,
    tick,
    startTimer,
    resetTimer: storeResetTimer
  } = useStore();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, tick]);

  return (
    <div className="flex h-screen bg-hardware-bg text-white overflow-hidden font-sans selection:bg-hardware-accent/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0 relative">
        <MobileHeader />

        <main className="flex-1 min-h-0 relative flex flex-col">
          <Tabs value={activeTab} className="flex-1 flex flex-col min-h-0">
            <ScrollArea className="flex-1 h-full">
              <div className="p-6 md:p-12 pb-32 md:pb-12 max-w-7xl mx-auto w-full">
                <AnimatePresence mode="wait">
                  <TabsContent key={activeTab} value={activeTab} className="m-0 outline-none">
                    {activeTab === 'mixing' && <MixingTab />}
                    {activeTab === 'inventory' && <InventoryTab />}
                    {activeTab === 'develop' && <DevelopTab />}
                  </TabsContent>
                </AnimatePresence>
              </div>
            </ScrollArea>
          </Tabs>
        </main>

        <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
