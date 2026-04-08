import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  MixingRecipe, 
  InventoryItem, 
  MixingKit, 
  DevPreset, 
  ChemicalType, 
  MixingSession, 
  TankType, 
  AgitationMethod 
} from '../types';
import { DEFAULT_RECIPES, DEFAULT_PRESETS } from '../constants';

interface AppState {
  // Data
  recipes: MixingRecipe[];
  inventory: InventoryItem[];
  kits: MixingKit[];
  presets: DevPreset[];
  
  // Pro Settings (Persisted)
  tankType: TankType;
  agitationMethod: AgitationMethod;
  pushPull: number;
  rollCount: number;
  selectedDeveloperId: string | null;
  selectedKitId: string | null;
  selectedTemp: number;
  
  // UI State
  activeTab: string;
  mixingFilter: ChemicalType | 'all';
  inventoryFilter: ChemicalType | 'all';
  activeMixingSession: MixingSession | null;
  activePreset: DevPreset | null;
  currentStepIndex: number;
  timeLeft: number;
  isRunning: boolean;
  isFinished: boolean;
  
  // Actions
  setInventory: (inventory: InventoryItem[] | ((prev: InventoryItem[]) => InventoryItem[])) => void;
  addInventoryItem: (item: InventoryItem) => void;
  deleteInventoryItem: (id: string) => void;
  setKits: (kits: MixingKit[] | ((prev: MixingKit[]) => MixingKit[])) => void;
  addKit: (kit: MixingKit) => void;
  deleteKit: (id: string) => void;
  
  setTankType: (type: TankType) => void;
  setAgitationMethod: (method: AgitationMethod) => void;
  setPushPull: (val: number) => void;
  setRollCount: (count: number) => void;
  setSelectedDeveloperId: (id: string | null) => void;
  setSelectedKitId: (id: string | null) => void;
  setSelectedTemp: (temp: number) => void;
  
  setActiveTab: (tab: string) => void;
  setMixingFilter: (filter: ChemicalType | 'all') => void;
  setInventoryFilter: (filter: ChemicalType | 'all') => void;
  setActiveMixingSession: (session: MixingSession | null) => void;
  setActivePreset: (preset: DevPreset | null) => void;
  setCurrentStepIndex: (index: number) => void;
  setTimeLeft: (time: number | ((prev: number) => number)) => void;
  setIsRunning: (running: boolean | ((prev: boolean) => boolean)) => void;
  setIsFinished: (finished: boolean) => void;
  
  // Timer Actions
  tick: () => void;
  startTimer: (preset: DevPreset, temp: number, push: number, agitation: AgitationMethod, devItem?: InventoryItem) => void;
  resetTimer: () => void;
  completeDevelopment: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // ... (existing state)
      recipes: DEFAULT_RECIPES,
      inventory: [],
      kits: [],
      presets: DEFAULT_PRESETS,
      
      tankType: 'paterson',
      agitationMethod: 'inversion',
      pushPull: 0,
      rollCount: 1,
      selectedDeveloperId: null,
      selectedKitId: null,
      selectedTemp: 20,
      
      activeTab: 'develop',
      mixingFilter: 'all',
      inventoryFilter: 'all',
      activeMixingSession: null,
      activePreset: null,
      currentStepIndex: 0,
      timeLeft: 0,
      isRunning: false,
      isFinished: false,
      
      // Actions
      setInventory: (inventory) => set((state) => ({ 
        inventory: typeof inventory === 'function' ? inventory(state.inventory) : inventory 
      })),
      addInventoryItem: (item) => set((state) => ({ inventory: [item, ...state.inventory] })),
      deleteInventoryItem: (id) => set((state) => ({ inventory: state.inventory.filter(i => i.id !== id) })),
      
      setKits: (kits) => set((state) => ({ 
        kits: typeof kits === 'function' ? kits(state.kits) : kits 
      })),
      addKit: (kit) => set((state) => ({ kits: [...state.kits, kit] })),
      deleteKit: (id) => set((state) => ({ kits: state.kits.filter(k => k.id !== id) })),
      
      setTankType: (tankType) => set({ tankType }),
      setAgitationMethod: (agitationMethod) => set({ agitationMethod }),
      setPushPull: (pushPull) => set({ pushPull }),
      setRollCount: (rollCount) => set({ rollCount }),
      setSelectedDeveloperId: (selectedDeveloperId) => set({ selectedDeveloperId, selectedKitId: null }),
      setSelectedKitId: (selectedKitId) => set({ selectedKitId, selectedDeveloperId: null }),
      setSelectedTemp: (selectedTemp) => set({ selectedTemp }),
      
      setActiveTab: (activeTab) => set({ activeTab }),
      setMixingFilter: (mixingFilter) => set({ mixingFilter }),
      setInventoryFilter: (inventoryFilter) => set({ inventoryFilter }),
      setActiveMixingSession: (activeMixingSession) => set({ activeMixingSession }),
      setActivePreset: (activePreset) => set({ activePreset }),
      setCurrentStepIndex: (currentStepIndex) => set({ currentStepIndex }),
      setTimeLeft: (timeLeft) => set((state) => ({ 
        timeLeft: typeof timeLeft === 'function' ? timeLeft(state.timeLeft) : timeLeft 
      })),
      setIsRunning: (isRunning) => set((state) => ({ 
        isRunning: typeof isRunning === 'function' ? isRunning(state.isRunning) : isRunning 
      })),
      setIsFinished: (isFinished) => set({ isFinished }),

      tick: () => {
        const { timeLeft, isRunning, activePreset, currentStepIndex, selectedTemp, pushPull, agitationMethod, inventory, selectedDeveloperId, selectedKitId, kits } = get();
        if (!isRunning) return;

        if (timeLeft > 0) {
          set({ timeLeft: timeLeft - 1 });
        } else {
          if (activePreset && currentStepIndex < activePreset.steps.length - 1) {
            const nextIndex = currentStepIndex + 1;
            
            let devItem;
            if (selectedKitId) {
              const kit = kits.find(k => k.id === selectedKitId);
              devItem = inventory.find(i => i.id === kit?.developerId);
            } else if (selectedDeveloperId) {
              devItem = inventory.find(i => i.id === selectedDeveloperId);
            }

            const nextTime = getAdjustedTime(activePreset, activePreset.steps[nextIndex], selectedTemp, pushPull, agitationMethod, devItem);
            set({ 
              currentStepIndex: nextIndex,
              timeLeft: nextTime
            });
          } else {
            set({ isRunning: false, isFinished: true });
          }
        }
      },

      startTimer: (preset, temp, push, agitation, devItem) => {
        const initialTime = getAdjustedTime(preset, preset.steps[0], temp, push, agitation, devItem);
        set({
          activePreset: preset,
          currentStepIndex: 0,
          timeLeft: initialTime,
          isRunning: true,
          isFinished: false
        });
      },

      resetTimer: () => {
        const { activePreset, selectedTemp, pushPull, agitationMethod, inventory, selectedDeveloperId, selectedKitId, kits } = get();
        if (activePreset) {
          let devItem;
          if (selectedKitId) {
            const kit = kits.find(k => k.id === selectedKitId);
            devItem = inventory.find(i => i.id === kit?.developerId);
          } else if (selectedDeveloperId) {
            devItem = inventory.find(i => i.id === selectedDeveloperId);
          }

          const initialTime = getAdjustedTime(activePreset, activePreset.steps[0], selectedTemp, pushPull, agitationMethod, devItem);
          set({
            currentStepIndex: 0,
            timeLeft: initialTime,
            isRunning: false,
            isFinished: false
          });
        }
      },

      completeDevelopment: () => {
        const { selectedDeveloperId, selectedKitId, kits, inventory, tankType, rollCount } = get();
        
        // Calculate volume to subtract (approx 250ml per roll for 35mm)
        // We can use the calculateRequiredVolume helper if we had it here, 
        // but for simplicity in store let's assume 250ml per roll or use rollCount.
        const volumeToUse = 250 * rollCount; 

        const itemIdsToUpdate: string[] = [];
        if (selectedKitId) {
          const kit = kits.find(k => k.id === selectedKitId);
          if (kit?.developerId) itemIdsToUpdate.push(kit.developerId);
          if (kit?.stopId) itemIdsToUpdate.push(kit.stopId);
          if (kit?.fixerId) itemIdsToUpdate.push(kit.fixerId);
        } else if (selectedDeveloperId) {
          itemIdsToUpdate.push(selectedDeveloperId);
        }

        if (itemIdsToUpdate.length === 0) return;

        set((state) => ({
          inventory: state.inventory.map(item => {
            if (itemIdsToUpdate.includes(item.id)) {
              return {
                ...item,
                remainingVolume: Math.max(0, item.remainingVolume - volumeToUse),
                usageCount: item.usageCount + 1
              };
            }
            return item;
          })
        }));
      }
    }),
    {
      name: 'silvergrain-storage',
      partialize: (state) => ({
        inventory: state.inventory,
        kits: state.kits,
        tankType: state.tankType,
        agitationMethod: state.agitationMethod,
        pushPull: state.pushPull,
        rollCount: state.rollCount,
        selectedDeveloperId: state.selectedDeveloperId,
        selectedKitId: state.selectedKitId,
        selectedTemp: state.selectedTemp,
      }),
    }
  )
);

// Helper function (internal to store or imported)
function getAdjustedTime(
  preset: any, 
  step: any, 
  temp: number, 
  push: number = 0, 
  agitation: string = 'inversion', 
  devItem?: any
) {
  if (step.name.toLowerCase().includes('developer') || step.name.toLowerCase().includes('bath a')) {
    let duration = step.duration;
    if (preset.tempTable && preset.tempTable[temp]) {
      duration = preset.tempTable[temp];
    } else {
      const factor = Math.exp(-0.08 * (temp - preset.baseTemperature));
      duration = Math.round(duration * factor);
    }
    if (push > 0) {
      duration = Math.round(duration * Math.pow(1.28, push));
    } else if (push < 0) {
      duration = Math.round(duration * Math.pow(0.78, Math.abs(push)));
    }
    if (agitation === 'rotary' || agitation === 'continuous') {
      duration = Math.round(duration * 0.85);
    }
    if (devItem?.isReusable && devItem.usageCount > 0) {
      duration = Math.round(duration * (1 + (devItem.usageCount * 0.02)));
    }
    return duration;
  }
  return step.duration;
}
