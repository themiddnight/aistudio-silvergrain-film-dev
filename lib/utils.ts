import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const getExpiryStatus = (expiryDate?: string) => {
  if (!expiryDate) return 'valid';
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diff = expiry.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  if (days < 0) return 'expired';
  if (days < 7) return 'warning';
  return 'valid';
};

export const calculateRequiredVolume = (tankType: any, rollCount: number, format: '35mm' | '120' | '4x5' = '35mm') => {
  // We use any for tankType here to avoid circular dependency if we import TankType from types
  // The actual values are checked against TANK_VOLUMES
  const volumes: any = {
    paterson: { '35mm': 290, '120': 500, '4x5': 1000 },
    jobo: { '35mm': 140, '120': 240, '4x5': 270 },
    stainless: { '35mm': 250, '120': 450, '4x5': 900 },
    custom: { '35mm': 300, '120': 500, '4x5': 1000 }
  };
  
  const baseVolume = volumes[tankType]?.[format] || 300;
  return baseVolume * rollCount;
};

export const getAdjustedTime = (
  preset: any, 
  step: any, 
  temp: number, 
  push: number = 0, 
  agitation: string = 'inversion', 
  devItem?: any
) => {
  if (step.name.toLowerCase().includes('developer') || step.name.toLowerCase().includes('bath a')) {
    let duration = step.duration;
    
    // 1. Temperature Adjustment
    if (preset.tempTable && preset.tempTable[temp]) {
      duration = preset.tempTable[temp];
    } else {
      const factor = Math.exp(-0.08 * (temp - preset.baseTemperature));
      duration = Math.round(duration * factor);
    }

    // 2. Push/Pull Adjustment
    if (push > 0) {
      duration = Math.round(duration * Math.pow(1.28, push));
    } else if (push < 0) {
      duration = Math.round(duration * Math.pow(0.78, Math.abs(push)));
    }

    // 3. Agitation Method Adjustment
    if (agitation === 'rotary' || agitation === 'continuous') {
      duration = Math.round(duration * 0.85); // 15% reduction
    }

    // 4. Exhaustion Compensation
    if (devItem?.isReusable && devItem.usageCount > 0) {
      duration = Math.round(duration * (1 + (devItem.usageCount * 0.02)));
    }

    return duration;
  }
  return step.duration;
};
