import React from 'react';
import { Trash2, AlertCircle, Droplets, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { InventoryItem } from '../types';
import { cn, getExpiryStatus } from '@/lib/utils';

interface InventoryCardProps {
  item: InventoryItem;
  onDelete: (id: string) => void;
  onUse: (id: string, amount: number) => void;
}

export const InventoryCard: React.FC<InventoryCardProps> = ({ item, onDelete, onUse }) => {
  const expiryStatus = getExpiryStatus(item.expiryDate);
  const remainingPercent = (item.remainingVolume / item.totalVolume) * 100;

  return (
    <Card className="bg-hardware-panel border-white/5 hover:border-white/10 transition-all overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-mono text-hardware-muted uppercase">
                {item.type}
              </span>
              {expiryStatus === 'expired' && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-[9px] font-mono text-red-500 uppercase">
                  <AlertCircle className="w-2 h-2" /> Expired
                </span>
              )}
            </div>
            <CardTitle className="text-base text-white">{item.name}</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="icon-xs" 
            className="text-hardware-muted hover:text-red-500 hover:bg-red-500/10"
            onClick={() => onDelete(item.id)}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-mono uppercase">
            <span className="text-hardware-muted">Remaining Volume</span>
            <span className={cn(
              "font-bold",
              remainingPercent < 20 ? "text-hardware-accent" : "text-white"
            )}>
              {item.remainingVolume}ml / {item.totalVolume}ml
            </span>
          </div>
          <Progress value={remainingPercent} className="h-1.5 bg-white/5" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-hardware-muted uppercase">
              <Clock className="w-3 h-3" /> Mixed
            </div>
            <div className="text-[11px] text-white font-mono">
              {new Date(item.dateMixed).toLocaleDateString()}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-hardware-muted uppercase">
              <Droplets className="w-3 h-3" /> Usage
            </div>
            <div className="text-[11px] text-white font-mono">
              {item.usageCount} rolls processed
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-white/5 p-4 border-t border-[#787878]">
        <Button 
          variant="hardware" 
          size="hardware-sm" 
          className="w-full"
          onClick={() => onUse(item.id, 250)}
          disabled={item.remainingVolume < 250}
        >
          Use 250ml
        </Button>
      </CardFooter>
    </Card>
  );
};
