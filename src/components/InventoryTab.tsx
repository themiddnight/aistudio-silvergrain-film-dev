import { Plus, Package, Database } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MixingKit } from '../types';
import { InventoryCard } from './InventoryCard';
import { KitCard } from './KitCard';
import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export const InventoryTab = () => {
  const {
    inventory,
    kits,
    inventoryFilter,
    setInventoryFilter,
    deleteInventoryItem,
    setInventory,
    addKit,
    deleteKit,
    setActiveTab,
    setMixingFilter
  } = useStore();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newKitName, setNewKitName] = useState('');
  const [selectedDev, setSelectedDev] = useState<string>('');
  const [selectedStop, setSelectedStop] = useState<string>('');
  const [selectedFix, setSelectedFix] = useState<string>('');

  const filteredInventory = inventory.filter(item => inventoryFilter === 'all' || item.type === inventoryFilter);

  const handleCreateKit = (name: string, devId?: string, stopId?: string, fixId?: string) => {
    const newKit: MixingKit = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      developerId: devId,
      stopId,
      fixerId: fixId
    };
    addKit(newKit);
  };

  const handleUseItem = (id: string, amount: number) => {
    setInventory(prev => prev.map(i => 
      i.id === id ? { ...i, remainingVolume: Math.max(0, i.remainingVolume - amount), usageCount: i.usageCount + 1 } : i
    ));
  };

  return (
    <Tabs defaultValue="stock" className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <TabsList className="bg-white/5 border border-white/5 p-1 rounded-xl h-9">
          <TabsTrigger value="stock" className="text-[10px] font-mono uppercase px-4 rounded-lg data-[state=active]:bg-hardware-accent data-[state=active]:text-white text-white/60">Stock</TabsTrigger>
          <TabsTrigger value="kits" className="text-[10px] font-mono uppercase px-4 rounded-lg data-[state=active]:bg-hardware-accent data-[state=active]:text-white text-white/60">Kits</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stock" className="m-0">
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
            {['all', 'developer', 'stop', 'fixer', 'wetting'].map((type) => (
              <Button
                key={type}
                variant={inventoryFilter === type ? "hardware-accent" : "hardware-ghost"}
                size="hardware-sm"
                className="rounded-full"
                onClick={() => setInventoryFilter(type as any)}
              >
                {type}
              </Button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="kits" className="m-0">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hardware-accent" size="hardware-sm" className="px-4 rounded-lg">
                <Plus className="w-3 h-3 mr-2" />
                Create Kit
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-hardware-panel border-white/10 text-white max-w-[calc(100%-2rem)] sm:max-w-sm mx-auto">
              <DialogHeader>
                <DialogTitle className="text-white">Create Mixing Kit</DialogTitle>
                <DialogDescription className="text-hardware-muted">Group chemicals for a development session.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="kit-name" className="text-xs uppercase font-mono text-hardware-muted">Kit Name</Label>
                  <Input 
                    id="kit-name" 
                    placeholder="e.g. B&W Standard Kit" 
                    className="bg-white/5 border-white/10"
                    value={newKitName}
                    onChange={(e) => setNewKitName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-mono text-hardware-muted">Developer</Label>
                  <Select value={selectedDev} onValueChange={setSelectedDev}>
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue>
                        {inventory.find(i => i.id === selectedDev)?.name || "Select Developer"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-hardware-panel border-white/10 text-white">
                      {inventory.filter(i => i.type === 'developer').map(i => (
                        <SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-mono text-hardware-muted">Stop Bath</Label>
                  <Select value={selectedStop} onValueChange={setSelectedStop}>
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue>
                        {inventory.find(i => i.id === selectedStop)?.name || "Select Stop Bath"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-hardware-panel border-white/10 text-white">
                      {inventory.filter(i => i.type === 'stop').map(i => (
                        <SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-mono text-hardware-muted">Fixer</Label>
                  <Select value={selectedFix} onValueChange={setSelectedFix}>
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue>
                        {inventory.find(i => i.id === selectedFix)?.name || "Select Fixer"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-hardware-panel border-white/10 text-white">
                      {inventory.filter(i => i.type === 'fixer').map(i => (
                        <SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="hardware-accent" 
                  className="w-full"
                  onClick={() => {
                    handleCreateKit(newKitName, selectedDev, selectedStop, selectedFix);
                    setNewKitName('');
                    setSelectedDev('');
                    setSelectedStop('');
                    setSelectedFix('');
                    setIsCreateDialogOpen(false);
                  }}
                >
                  Create Kit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </div>

      <TabsContent value="stock" className="m-0">
        {filteredInventory.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInventory.map((item) => (
              <InventoryCard 
                key={item.id} 
                item={item} 
                onDelete={deleteInventoryItem}
                onUse={handleUseItem}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
              <Database className="w-8 h-8 text-hardware-muted" />
            </div>
            <div className="text-center space-y-2 mb-8">
              <h3 className="text-lg font-medium text-white">Stock Empty</h3>
              <p className="text-xs text-hardware-muted">No chemicals found for this filter.</p>
            </div>
            <Button 
              onClick={() => { setMixingFilter(inventoryFilter === 'all' ? 'all' : inventoryFilter); setActiveTab('mixing'); }} 
              variant="hardware" 
              size="hardware"
            >
              Go to Mixing
            </Button>
          </div>
        )}
      </TabsContent>

      <TabsContent value="kits" className="m-0">
        {kits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kits.map((kit) => (
              <KitCard 
                key={kit.id} 
                kit={kit} 
                inventory={inventory}
                onDelete={deleteKit}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
              <Package className="w-8 h-8 text-hardware-muted" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium text-white">No Kits Created</h3>
              <p className="text-xs text-hardware-muted">Combine chemicals for faster sessions.</p>
            </div>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};
