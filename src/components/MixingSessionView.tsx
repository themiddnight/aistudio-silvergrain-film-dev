import { MixingSession, MixingRecipe } from '../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, CheckCircle2, Beaker, Settings2, Info } from 'lucide-react';
import { cn, calculateRequiredVolume } from '@/lib/utils';
import { useState, useMemo, useEffect } from 'react';

interface MixingSessionViewProps {
  session: MixingSession;
  onUpdateSession: (session: MixingSession) => void;
  onCancel: () => void;
  onComplete: (recipe: MixingRecipe, volume: number) => void;
}

export function MixingSessionView({ session, onUpdateSession, onCancel, onComplete }: MixingSessionViewProps) {
  const { recipe, targetVolume, prepChecks, stepChecks, tankType, rollCount } = session;
  const [isAdjustingVolume, setIsAdjustingVolume] = useState(false);

  // Automatically calculate volume if tank settings are present
  useEffect(() => {
    if (tankType && rollCount) {
      const calculatedVolume = calculateRequiredVolume(tankType, rollCount);
      if (calculatedVolume !== targetVolume) {
        onUpdateSession({
          ...session,
          targetVolume: calculatedVolume
        });
      }
    }
  }, [tankType, rollCount, session, targetVolume, onUpdateSession]);

  const togglePrep = (id: string) => {
    onUpdateSession({
      ...session,
      prepChecks: { ...prepChecks, [id]: !prepChecks[id] }
    });
  };

  const toggleStep = (index: number) => {
    const newSteps = [...stepChecks];
    newSteps[index] = !newSteps[index];
    onUpdateSession({ ...session, stepChecks: newSteps });
  };

  const updateVolume = (v: number) => {
    onUpdateSession({
      ...session,
      targetVolume: v
    });
    setIsAdjustingVolume(false);
  };

  const prepProgress = useMemo(() => 
    (Object.values(prepChecks).filter(Boolean).length / recipe.chemicals.length) * 100
  , [prepChecks, recipe.chemicals.length]);

  const stepProgress = useMemo(() => 
    (stepChecks.filter(Boolean).length / recipe.steps.length) * 100
  , [stepChecks, recipe.steps.length]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onCancel} className="text-hardware-muted hover:text-white -ml-2">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Cancel Mixing
        </Button>
        <div className="text-right">
          <h2 className="text-lg font-bold text-white">{recipe.name}</h2>
          <div className="flex items-center justify-end gap-2">
            <p className="text-[10px] font-mono uppercase text-hardware-muted">Target: {targetVolume}ml</p>
            <Button variant="ghost" size="icon" className="h-5 w-5 text-hardware-muted hover:text-hardware-accent" onClick={() => setIsAdjustingVolume(!isAdjustingVolume)}>
              <Settings2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {tankType && rollCount && (
        <div className="flex items-center gap-2 p-3 bg-hardware-accent/5 border border-hardware-accent/10 rounded-xl">
          <Info className="w-3 h-3 text-hardware-accent" />
          <p className="text-[10px] font-mono text-hardware-accent uppercase tracking-wider">
            Optimized for {rollCount} roll{rollCount > 1 ? 's' : ''} in {tankType} tank
          </p>
        </div>
      )}

      {isAdjustingVolume && (
        <Card className="bg-hardware-accent/10 border-hardware-accent/20 animate-in slide-in-from-top-2 duration-200">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-[10px] font-mono uppercase text-hardware-accent">Manual Volume Override</Label>
              <span className="text-sm font-mono font-bold text-white">{targetVolume}ml</span>
            </div>
            <div className="flex gap-2">
              {[250, 500, 1000, 2000].map(v => (
                <Button 
                  key={v} 
                  variant={targetVolume === v ? "hardware-accent" : "hardware"} 
                  size="hardware-sm"
                  className="flex-1"
                  onClick={() => updateVolume(v)}
                >
                  {v}ml
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="prep" className="w-full">
        <TabsList className="w-full bg-white/5 border border-white/5 p-1 rounded-xl h-12">
          <TabsTrigger value="prep" className="flex-1 rounded-lg data-[state=active]:bg-hardware-accent data-[state=active]:text-white text-white/60">
            1. Prep
          </TabsTrigger>
          <TabsTrigger value="mix" className="flex-1 rounded-lg data-[state=active]:bg-hardware-accent data-[state=active]:text-white text-white/60">
            2. Mix
          </TabsTrigger>
        </TabsList>

        <TabsContent value="prep" className="mt-6 space-y-6 outline-none">
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <h3 className="text-sm font-mono uppercase text-hardware-accent">Preparation Checklist</h3>
              <span className="text-[10px] font-mono text-hardware-muted">{Math.round(prepProgress)}% Complete</span>
            </div>
            <Progress value={prepProgress} className="h-1 bg-white/5" />
            
            <div className="grid gap-3">
              {recipe.chemicals.map((c) => {
                const scaledQty = (c.quantity * targetVolume) / recipe.baseVolume;
                return (
                  <div 
                    key={c.id} 
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer",
                      prepChecks[c.id] ? "bg-green-500/5 border-green-500/20" : "bg-white/5 border-white/5 hover:border-white/10"
                    )}
                    onClick={() => togglePrep(c.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox checked={!!prepChecks[c.id]} onCheckedChange={() => togglePrep(c.id)} />
                      <div className="space-y-0.5">
                        <Label className={cn("text-sm cursor-pointer", prepChecks[c.id] && "text-hardware-muted line-through")}>
                          {c.name}
                        </Label>
                        <p className="text-[10px] font-mono text-hardware-muted uppercase">Required Amount</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-mono font-bold text-white">
                        {scaledQty.toFixed(scaledQty < 1 ? 2 : 1)}
                        <span className="text-xs font-normal text-hardware-muted ml-1">{c.unit}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {prepProgress === 100 && (
            <div className="bg-hardware-accent/10 border border-hardware-accent/20 rounded-xl p-4 flex items-center gap-3 animate-in zoom-in-95 duration-300">
              <CheckCircle2 className="w-5 h-5 text-hardware-accent" />
              <p className="text-xs text-hardware-accent font-medium">All chemicals prepared. Ready to mix!</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="mix" className="mt-6 space-y-6 outline-none">
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <h3 className="text-sm font-mono uppercase text-hardware-accent">Mixing Steps</h3>
              <span className="text-[10px] font-mono text-hardware-muted">{Math.round(stepProgress)}% Complete</span>
            </div>
            <Progress value={stepProgress} className="h-1 bg-white/5" />

            <div className="space-y-3">
              {recipe.steps.map((step, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex gap-4 p-4 rounded-xl border transition-all cursor-pointer",
                    stepChecks[i] ? "bg-green-500/5 border-green-500/20" : "bg-white/5 border-white/5 hover:border-white/10"
                  )}
                  onClick={() => toggleStep(i)}
                >
                  <Checkbox checked={!!stepChecks[i]} onCheckedChange={() => toggleStep(i)} className="mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-hardware-muted uppercase">Step {i + 1}</span>
                    <p className={cn("text-sm leading-relaxed", stepChecks[i] && "text-hardware-muted line-through")}>
                      {step.replace('final volume', `${targetVolume}ml`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button 
            disabled={stepProgress < 100} 
            onClick={() => onComplete(recipe, targetVolume)}
            variant="hardware-accent"
            size="hardware"
            className="w-full"
          >
            <Beaker className="w-4 h-4 mr-2" />
            Complete Mixing
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
