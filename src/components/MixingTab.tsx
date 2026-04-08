import { Plus, Settings2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MixingRecipe, TankType } from '../types';
import { RecipeCard } from './RecipeCard';
import { MixingSessionView } from './MixingSessionView';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useStore } from '../store/useStore';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const MixingTab = () => {
  const {
    recipes,
    activeMixingSession,
    mixingFilter,
    tankType,
    rollCount,
    setMixingFilter,
    setActiveMixingSession,
    setTankType,
    setRollCount,
    setActiveTab,
    addInventoryItem
  } = useStore();

  const [isConfigOpen, setIsConfigOpen] = useState(false);

  useEffect(() => {
    if (activeMixingSession) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeMixingSession]);

  const filteredRecipes = recipes.filter(r => mixingFilter === 'all' || r.type === mixingFilter);

  const startMixingSession = (recipe: MixingRecipe) => {
    setActiveMixingSession({
      recipe,
      targetVolume: 1000,
      prepChecks: {},
      stepChecks: new Array(recipe.steps.length).fill(false),
      tankType,
      rollCount
    });
  };

  const handleCustomRecipe = () => {
    const customRecipe: MixingRecipe = {
      id: 'custom-' + Math.random().toString(36).substr(2, 9),
      name: 'Custom Solution',
      type: 'developer',
      form: 'ready',
      description: 'Custom user-defined mixing session.',
      baseVolume: 1000,
      chemicals: [
        { id: '1', name: 'Part A / Concentrate', quantity: 100, unit: 'ml' },
        { id: '2', name: 'Water', quantity: 900, unit: 'ml' }
      ],
      steps: [
        'Add 800ml water to vessel.',
        'Add concentrate and stir well.',
        'Top up to final volume with water.'
      ],
      expiryDays: 30
    };
    startMixingSession(customRecipe);
  };

  const handleMix = (recipe: MixingRecipe, volume: number) => {
    const expiryDate = recipe.expiryDays 
      ? new Date(Date.now() + recipe.expiryDays * 24 * 60 * 60 * 1000).toISOString()
      : undefined;
      
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      recipeId: recipe.id,
      name: recipe.name,
      type: recipe.type,
      form: recipe.form,
      dateMixed: new Date().toISOString(),
      expiryDate,
      totalVolume: volume,
      remainingVolume: volume,
      usageCount: 0
    };
    
    addInventoryItem(newItem);
    setActiveMixingSession(null);
    setActiveTab('inventory');
  };

  if (activeMixingSession) {
    return (
      <MixingSessionView 
        session={activeMixingSession}
        onUpdateSession={setActiveMixingSession}
        onComplete={handleMix}
        onCancel={() => setActiveMixingSession(null)}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Lab Configuration */}
      <div className="bg-hardware-panel rounded-2xl border border-white/5 overflow-hidden">
        <button 
          onClick={() => setIsConfigOpen(!isConfigOpen)}
          className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2 text-hardware-accent">
            <Settings2 className="w-4 h-4" />
            <h3 className="text-[10px] font-mono uppercase tracking-widest">Lab Configuration</h3>
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
                  <Label className="text-[10px] font-mono uppercase text-hardware-muted tracking-widest">Tank System</Label>
                  <Select value={tankType} onValueChange={(v) => setTankType(v as TankType)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl">
                      <SelectValue>
                        {tankType === 'paterson' && 'Paterson (Plastic)'}
                        {tankType === 'jobo' && 'Jobo (Rotary)'}
                        {tankType === 'stainless' && 'Stainless Steel'}
                        {tankType === 'custom' && 'Custom / Other'}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-hardware-panel border-white/10 text-white">
                      <SelectItem value="paterson">Paterson (Plastic)</SelectItem>
                      <SelectItem value="jobo">Jobo (Rotary)</SelectItem>
                      <SelectItem value="stainless">Stainless Steel</SelectItem>
                      <SelectItem value="custom">Custom / Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1 min-w-[200px] space-y-3">
                  <Label className="text-[10px] font-mono uppercase text-hardware-muted tracking-widest">Roll Count (35mm eq.)</Label>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map(n => (
                      <Button 
                        key={n} 
                        variant={rollCount === n ? "hardware-accent" : "hardware"} 
                        size="hardware-sm"
                        className="flex-1 h-12"
                        onClick={() => setRollCount(n)}
                      >
                        {n}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-hardware-muted italic font-mono">
                Required volumes will be automatically calculated based on your tank and roll count.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
            {['all', 'developer', 'stop', 'fixer', 'wetting'].map((type) => (
              <Button
                key={type}
                variant={mixingFilter === type ? "hardware-accent" : "hardware-ghost"}
                size="hardware-sm"
                className="rounded-full"
                onClick={() => setMixingFilter(type as any)}
              >
                {type}
              </Button>
            ))}
          </div>
          <Button 
            variant="hardware-accent" 
            size="hardware-sm" 
            className="px-4 rounded-lg"
            onClick={handleCustomRecipe}
          >
            <Plus className="w-3 h-3 mr-2" />
            Custom Recipe
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onStartMixing={startMixingSession} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
