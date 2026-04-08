import React from 'react';
import { Beaker, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MixingRecipe } from '../types';

interface RecipeCardProps {
  recipe: MixingRecipe;
  onStartMixing: (recipe: MixingRecipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onStartMixing }) => {
  return (
    <Card className="group bg-hardware-panel border-white/5 hover:border-hardware-accent/30 transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-mono text-hardware-muted uppercase tracking-wider">
                {recipe.type}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-hardware-accent/10 text-[9px] font-mono text-hardware-accent uppercase tracking-wider">
                {recipe.form}
              </span>
            </div>
            <CardTitle className="text-lg text-white">{recipe.name}</CardTitle>
            <CardDescription className="text-xs text-hardware-muted">{recipe.description}</CardDescription>
          </div>
          <Beaker className="w-5 h-5 text-hardware-muted group-hover:text-hardware-accent transition-colors" />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-mono text-hardware-muted uppercase">
            <Info className="w-3 h-3" />
            <span>Base Yield: {recipe.baseVolume}ml</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {recipe.chemicals.slice(0, 4).map(c => (
              <div key={c.id} className="text-[11px] flex justify-between border-b border-white/5 pb-1">
                <span className="text-hardware-muted truncate mr-2">{c.name}</span>
                <span className="font-mono text-white">{c.quantity}{c.unit}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-white/5 p-4 flex gap-2 border-t border-[#787878]">
        <Button 
          variant="hardware"
          size="hardware-sm"
          className="flex-1 p-4" 
          onClick={() => onStartMixing(recipe)}
        >
          Start Mixing Session
        </Button>
      </CardFooter>
    </Card>
  );
};
