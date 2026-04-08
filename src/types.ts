export type Unit = 'ml' | 'g' | 'drops' | 'part';
export type ChemicalType = 'developer' | 'stop' | 'fixer' | 'wetting' | 'other';
export type MixingForm = 'powder' | 'concentrate' | 'ready';
export type TankType = 'paterson' | 'jobo' | 'stainless' | 'custom';
export type AgitationMethod = 'inversion' | 'rotary' | 'stand' | 'continuous';

export interface Chemical {
  id: string;
  name: string;
  quantity: number;
  unit: Unit;
}

export interface MixingRecipe {
  id: string;
  name: string;
  type: ChemicalType;
  form: MixingForm;
  description: string;
  chemicals: Chemical[];
  steps: string[];
  baseVolume: number; // The volume the original recipe is based on (usually 1000ml)
  expiryDays?: number;
  dilutionRatio?: string; // For concentrates, e.g., "1+9"
  isTwoBath?: boolean; // Special handling for two-bath developers
  isPyro?: boolean; // Requires alkaline fixer
}

export interface InventoryItem {
  id: string;
  recipeId: string;
  name: string;
  type: ChemicalType;
  form: MixingForm;
  dateMixed: string;
  expiryDate?: string;
  totalVolume: number;
  remainingVolume: number;
  usageCount: number;
  isReusable?: boolean;
}

export interface MixingKit {
  id: string;
  name: string;
  developerId?: string; // InventoryItem ID
  stopId?: string;
  fixerId?: string;
}

export interface DevStep {
  id: string;
  name: string;
  duration: number; // seconds
  agitationInterval?: number; // seconds
  agitationDuration?: number; // seconds
  instructions?: string;
}

export interface DevPreset {
  id: string;
  name: string;
  filmType: string;
  developerName: string;
  dilution: string;
  baseTemperature: number;
  tempTable?: Record<number, number>; // Temperature -> Time in seconds
  steps: DevStep[];
  isTwoBath?: boolean;
}

export interface MixingSession {
  recipe: MixingRecipe;
  targetVolume: number;
  prepChecks: Record<string, boolean>; // chemicalId -> checked
  stepChecks: boolean[]; // step index -> checked
  tankType?: TankType;
  rollCount?: number;
}

export interface DevelopmentSession {
  preset: DevPreset;
  temp: number;
  pushPull: number; // -1, 0, +1, +2, etc.
  agitationMethod: AgitationMethod;
  tankType: TankType;
  developerItem?: InventoryItem; // For exhaustion calculation
}
