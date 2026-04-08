import { Thermometer, Clock, Droplets, CheckCircle2, RotateCcw, Pause, Play, ChevronRight, Timer as TimerIcon, Settings2, Beaker, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { DevPreset, AgitationMethod, TankType } from '../types';
import { cn, formatTime, getAdjustedTime } from '@/lib/utils';
import { TimerDisplay } from './TimerDisplay';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store/useStore';
import { useState } from 'react';

export const DevelopTab = () => {
  const {
    presets,
    activePreset,
    selectedTemp,
    setSelectedTemp,
    currentStepIndex,
    timeLeft,
    isRunning,
    isFinished,
    pushPull,
    setPushPull,
    agitationMethod,
    setAgitationMethod,
    tankType,
    setTankType,
    inventory,
    kits,
    selectedDeveloperId,
    setSelectedDeveloperId,
    selectedKitId,
    setSelectedKitId,
    setActivePreset,
    setCurrentStepIndex,
    setTimeLeft,
    setIsRunning,
    setIsFinished,
    completeDevelopment
  } = useStore();

  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const selectedDevItem = selectedKitId 
    ? inventory.find(i => i.id === kits.find(k => k.id === selectedKitId)?.developerId)
    : (selectedDeveloperId ? inventory.find(i => i.id === selectedDeveloperId) : undefined);

  const startDevelopment = (preset: DevPreset) => {
    setActivePreset(preset);
    setCurrentStepIndex(0);
    
    const initialTime = getAdjustedTime(preset, preset.steps[0], selectedTemp, pushPull, agitationMethod, selectedDevItem);
    
    setTimeLeft(initialTime);
    setIsRunning(true);
    setIsFinished(false);
  };

  const toggleTimer = () => setIsRunning((prev: boolean) => !prev);
  
  const resetTimer = () => {
    if (activePreset) {
      setCurrentStepIndex(0);
      const initialTime = getAdjustedTime(activePreset, activePreset.steps[0], selectedTemp, pushPull, agitationMethod, selectedDevItem);
      setTimeLeft(initialTime);
      setIsRunning(false);
      setIsFinished(false);
    }
  };

  const handleFinish = () => {
    completeDevelopment();
    resetTimer();
  };

  return (
    <div className="space-y-8">
      {!activePreset ? (
        <div className="space-y-8">
          {/* Lab Configuration */}
          <div className="bg-hardware-panel rounded-2xl border border-white/5 overflow-hidden">
            <button 
              onClick={() => setIsConfigOpen(!isConfigOpen)}
              className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-2 text-hardware-accent">
                <Settings2 className="w-4 h-4" />
                <h3 className="text-[10px] font-mono uppercase tracking-widest">Process Configuration</h3>
              </div>
              {isConfigOpen ? <ChevronUp className="w-4 h-4 text-hardware-muted" /> : <ChevronDown className="w-4 h-4 text-hardware-muted" />}
            </button>
            
            <AnimatePresence>
              {isConfigOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 space-y-6"
                >
                  <div className="flex flex-wrap gap-6">
                    <div className="flex-1 min-w-[200px] space-y-3">
                      <Label className="text-[10px] font-mono uppercase text-hardware-muted tracking-widest">Push/Pull Stops</Label>
                      <div className="flex flex-wrap gap-1">
                        {[-1, 0, 1, 2, 3].map(v => (
                          <Button 
                            key={v} 
                            variant={pushPull === v ? "hardware-accent" : "hardware"} 
                            size="hardware-sm"
                            className="flex-1 h-10 text-[10px]"
                            onClick={() => setPushPull(v)}
                          >
                            {v > 0 ? `+${v}` : v === 0 ? 'Normal' : v}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex-1 min-w-[200px] space-y-3">
                      <Label className="text-[10px] font-mono uppercase text-hardware-muted tracking-widest">Agitation Method</Label>
                      <Select value={agitationMethod} onValueChange={(v) => setAgitationMethod(v as AgitationMethod)}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white h-10 rounded-xl text-xs">
                          <SelectValue>
                            {agitationMethod === 'inversion' && 'Manual Inversion'}
                            {agitationMethod === 'rotary' && 'Rotary (Jobo)'}
                            {agitationMethod === 'continuous' && 'Continuous'}
                            {agitationMethod === 'stand' && 'Stand'}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-hardware-panel border-white/10 text-white">
                          <SelectItem value="inversion">Manual Inversion</SelectItem>
                          <SelectItem value="rotary">Rotary (Jobo)</SelectItem>
                          <SelectItem value="continuous">Continuous</SelectItem>
                          <SelectItem value="stand">Stand</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex-1 min-w-[200px] space-y-3">
                      <Label className="text-[10px] font-mono uppercase text-hardware-muted tracking-widest">Tank System</Label>
                      <Select value={tankType} onValueChange={(v) => setTankType(v as TankType)}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white h-10 rounded-xl text-xs">
                          <SelectValue>
                            {tankType === 'paterson' && 'Paterson'}
                            {tankType === 'jobo' && 'Jobo'}
                            {tankType === 'stainless' && 'Stainless'}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-hardware-panel border-white/10 text-white">
                          <SelectItem value="paterson">Paterson</SelectItem>
                          <SelectItem value="jobo">Jobo</SelectItem>
                          <SelectItem value="stainless">Stainless</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                    <Thermometer className="w-4 h-4 text-hardware-accent" />
                    <div className="flex-1 flex gap-2 overflow-x-auto scrollbar-hide">
                      {[18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(t => (
                        <Button 
                          key={t} 
                          variant={selectedTemp === t ? "hardware-accent" : "hardware-ghost"} 
                          size="hardware-sm"
                          className="min-w-[40px] h-8 text-[10px]"
                          onClick={() => setSelectedTemp(t)}
                        >
                          {t}°
                        </Button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!selectedKitId ? (
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-sm font-mono uppercase tracking-widest text-hardware-muted">Step 1: Chemistry</h2>
                <div className="text-2xl font-bold text-white">Select Mixing Kit</div>
              </div>
              
              {kits.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {kits.map(kit => (
                    <Card 
                      key={kit.id}
                      className="group bg-hardware-panel border-white/5 hover:border-hardware-accent/30 transition-all cursor-pointer overflow-hidden"
                      onClick={() => setSelectedKitId(kit.id)}
                    >
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-hardware-accent/10 flex items-center justify-center group-hover:bg-hardware-accent/20 transition-colors">
                          <Beaker className="w-6 h-6 text-hardware-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-lg font-bold text-white truncate">{kit.name}</div>
                          <div className="text-[10px] font-mono text-hardware-muted uppercase tracking-widest">Ready for Process</div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-hardware-muted group-hover:text-hardware-accent transition-colors" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                  <Beaker className="w-12 h-12 text-hardware-muted mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No Kits Available</h3>
                  <p className="text-xs text-hardware-muted mb-8 text-center max-w-xs">
                    You need to create a kit in the Inventory tab before you can start a development session.
                  </p>
                  <Button onClick={() => useStore.getState().setActiveTab('inventory')} variant="hardware" size="hardware">
                    Go to Inventory
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <h2 className="text-sm font-mono uppercase tracking-widest text-hardware-muted">Step 2: Process</h2>
                  <div className="text-2xl font-bold text-white">Select Preset</div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedKitId(null)}
                  className="text-hardware-muted hover:text-white"
                >
                  Change Kit: <span className="text-hardware-accent ml-1">{kits.find(k => k.id === selectedKitId)?.name}</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {presets.map((preset) => (
                  <Card 
                    key={preset.id} 
                    className="group bg-hardware-panel border-white/5 hover:border-hardware-accent/30 transition-all cursor-pointer overflow-hidden"
                    onClick={() => startDevelopment(preset)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-hardware-accent/10 text-[9px] font-mono text-hardware-accent uppercase tracking-wider">
                              {preset.filmType}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-mono text-hardware-muted uppercase tracking-wider">
                              {preset.dilution}
                            </span>
                          </div>
                          <CardTitle className="text-lg text-white group-hover:text-hardware-accent transition-colors">{preset.name}</CardTitle>
                          <CardDescription className="text-xs text-hardware-muted">Using {preset.developerName}</CardDescription>
                        </div>
                        <TimerIcon className="w-5 h-5 text-hardware-muted group-hover:text-hardware-accent transition-colors" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Thermometer className="w-4 h-4 text-hardware-muted" />
                          <span className="text-sm font-mono text-white">{selectedTemp}°C</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-hardware-muted" />
                          <span className="text-sm font-mono text-white">
                            {formatTime(preset.steps.reduce((acc, s) => acc + getAdjustedTime(preset, s, selectedTemp, pushPull, agitationMethod, selectedDevItem), 0))} Total
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 xl:grid-cols-2 gap-8"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => { resetTimer(); setIsRunning(false); }}
                className="text-hardware-muted hover:text-white"
              >
                ← Back to Presets
              </Button>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                <div className="w-2 h-2 rounded-full bg-hardware-accent animate-pulse" />
                <span className="text-[10px] font-mono text-white uppercase tracking-widest">Session Active</span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white tracking-tight">{activePreset.name}</h2>
              <div className="flex flex-wrap gap-2">
                <span className="text-hardware-muted text-sm">{activePreset.filmType} • {activePreset.developerName} • {activePreset.dilution}</span>
                {pushPull !== 0 && (
                  <span className="px-2 py-0.5 rounded bg-hardware-accent/20 text-hardware-accent text-[10px] font-mono uppercase">
                    {pushPull > 0 ? `Push +${pushPull}` : `Pull ${pushPull}`}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded bg-white/5 text-hardware-muted text-[10px] font-mono uppercase">
                  {agitationMethod}
                </span>
              </div>
            </div>

            <div className="relative">
              <AnimatePresence mode="wait">
                {isFinished ? (
                  <motion.div 
                    key="finished"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 bg-green-500/5 border border-green-500/20 rounded-3xl space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-bold text-white">Process Complete</h3>
                      <p className="text-hardware-muted">Your film is ready for washing.</p>
                    </div>
                    <Button onClick={handleFinish} variant="hardware" size="hardware">
                      Log Session & Reset
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div key="timer" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <TimerDisplay 
                      seconds={timeLeft} 
                      totalSeconds={getAdjustedTime(activePreset, activePreset.steps[currentStepIndex], selectedTemp, pushPull, agitationMethod, selectedDevItem)}
                      label={activePreset.steps[currentStepIndex].name}
                      isAgitating={isRunning && timeLeft % (activePreset.steps[currentStepIndex].agitationInterval || 60) < (activePreset.steps[currentStepIndex].agitationDuration || 5)}
                    />
                    
                    <div className="mt-8">
                      <div className="flex gap-4">
                        <Button onClick={resetTimer} variant="hardware" className="flex-1">
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Reset
                        </Button>
                        <Button 
                          onClick={toggleTimer} 
                          variant={isRunning ? "hardware" : "hardware-accent"}
                          className="flex-[2] h-12"
                        >
                          {isRunning ? (
                            <><Pause className="w-5 h-5 mr-2" /> Pause</>
                          ) : (
                            <><Play className="w-5 h-5 mr-2" /> Start Timer</>
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-hardware-panel/50 rounded-3xl border border-white/5 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
              <h3 className="text-sm font-mono uppercase tracking-widest text-white">Process Timeline</h3>
              <div className="flex items-center gap-2 text-[10px] font-mono text-hardware-muted">
                <Clock className="w-3 h-3" />
                <span>{formatTime(activePreset.steps.reduce((acc, s) => acc + getAdjustedTime(activePreset, s, selectedTemp, pushPull, agitationMethod, selectedDevItem), 0))} Total</span>
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-4">
                {activePreset.steps.map((step, i) => {
                  const adjustedDuration = getAdjustedTime(activePreset, step, selectedTemp, pushPull, agitationMethod, selectedDevItem);
                  return (
                    <div 
                      key={step.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border transition-all duration-300",
                        i === currentStepIndex 
                          ? "bg-hardware-accent/10 border-hardware-accent/30 shadow-lg shadow-hardware-accent/5" 
                          : i < currentStepIndex 
                            ? "bg-white/5 border-transparent opacity-50" 
                            : "bg-transparent border-white/5"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold",
                          i === currentStepIndex ? "bg-hardware-accent text-white" : "bg-white/10 text-hardware-muted"
                        )}>
                          {i + 1}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{step.name}</div>
                          <div className="text-[10px] font-mono text-hardware-muted uppercase">{formatTime(adjustedDuration)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {i < currentStepIndex && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        {i === currentStepIndex && isRunning && <div className="w-2.5 h-2.5 rounded-full bg-hardware-accent animate-ping" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            <div className="fixed bottom-24 md:bottom-12 left-0 right-0 md:left-auto md:right-12 px-6 flex justify-center md:justify-end gap-4 z-50">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={resetTimer}
                className="w-16 h-16 rounded-full border-white/10 bg-hardware-panel shadow-xl hover:bg-white/5"
              >
                <RotateCcw className="w-6 h-6" />
              </Button>
              <Button 
                size="lg" 
                onClick={toggleTimer}
                className={cn(
                  "w-20 h-20 rounded-full shadow-2xl transition-all",
                  isRunning ? "bg-white text-black hover:bg-white/90" : "bg-hardware-accent text-white hover:bg-hardware-accent/90"
                )}
              >
                {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => {
                  if (currentStepIndex < activePreset.steps.length - 1) {
                    const nextIndex = currentStepIndex + 1;
                    setCurrentStepIndex(nextIndex);
                    const nextTime = getAdjustedTime(activePreset, activePreset.steps[nextIndex], selectedTemp, pushPull, agitationMethod, selectedDevItem);
                    setTimeLeft(nextTime);
                  } else {
                    setIsFinished(true);
                    setIsRunning(false);
                  }
                }}
                className="w-16 h-16 rounded-full border-white/10 bg-hardware-panel shadow-xl hover:bg-white/5"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
