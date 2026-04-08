import React from 'react';
import { Trash2, Package } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MixingKit, InventoryItem } from '../types';

interface KitCardProps {
  kit: MixingKit;
  inventory: InventoryItem[];
  onDelete: (id: string) => void;
}

export const KitCard: React.FC<KitCardProps> = ({ kit, inventory, onDelete }) => {
  const getChemicalName = (id?: string, type?: string) => {
    if (!id) {
      if (type === 'stop') return 'Water (Default)';
      return 'Not assigned';
    }
    return inventory.find(i => i.id === id)?.name || 'Missing';
  };

  return (
    <Card className="bg-hardware-panel border-white/5 hover:border-white/10 transition-all overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-hardware-accent/10 text-[9px] font-mono text-hardware-accent uppercase">
                Kit
              </span>
            </div>
            <CardTitle className="text-base text-white">{kit.name}</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="icon-xs" 
            className="text-hardware-muted hover:text-red-500 hover:bg-red-500/10"
            onClick={() => onDelete(kit.id)}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {[
          { label: 'Developer', name: getChemicalName(kit.developerId) },
          { label: 'Stop Bath', name: getChemicalName(kit.stopId, 'stop') },
          { label: 'Fixer', name: getChemicalName(kit.fixerId) },
        ].map((chem, idx) => (
          <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
            <span className="text-[10px] font-mono text-hardware-muted uppercase">{chem.label}</span>
            <span className="text-xs text-white font-medium">{chem.name}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
