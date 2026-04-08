import { DevPreset, MixingRecipe } from './types';

export const DEFAULT_RECIPES: MixingRecipe[] = [
  {
    id: 'd76-stock',
    name: 'Kodak D-76 (Stock)',
    type: 'developer',
    form: 'powder',
    description: 'Classic versatile black and white developer.',
    baseVolume: 1000,
    expiryDays: 180,
    chemicals: [
      { id: 'd76-c1', name: 'Water (50°C)', quantity: 750, unit: 'ml' },
      { id: 'd76-c2', name: 'Metol', quantity: 2, unit: 'g' },
      { id: 'd76-c3', name: 'Sodium Sulfite (Anhydrous)', quantity: 100, unit: 'g' },
      { id: 'd76-c4', name: 'Hydroquinone', quantity: 5, unit: 'g' },
      { id: 'd76-c5', name: 'Borax (Decahydrated)', quantity: 2, unit: 'g' },
      { id: 'd76-c6', name: 'Cold Water to make', quantity: 1000, unit: 'ml' },
    ],
    steps: [
      'Heat 750ml water to 50°C.',
      'Dissolve Metol in water.',
      'Dissolve Sodium Sulfite.',
      'Dissolve Hydroquinone.',
      'Dissolve Borax.',
      'Add cold water to bring total volume to final volume.',
      'Let cool to 20°C before use.'
    ]
  },
  {
    id: 'dk-15-tropical',
    name: 'Kodak DK-15 (Tropical)',
    type: 'developer',
    form: 'powder',
    description: 'High-temperature developer for 26-32°C processing.',
    baseVolume: 1000,
    expiryDays: 90,
    chemicals: [
      { id: 'dk15-c1', name: 'Water (50°C)', quantity: 750, unit: 'ml' },
      { id: 'dk15-c2', name: 'Metol', quantity: 5.7, unit: 'g' },
      { id: 'dk15-c3', name: 'Sodium Sulfite (Anhydrous)', quantity: 90, unit: 'g' },
      { id: 'dk15-c4', name: 'Kodalk (Sodium Metaborate)', quantity: 2, unit: 'g' },
      { id: 'dk15-c5', name: 'Potassium Bromide', quantity: 1.9, unit: 'g' },
      { id: 'dk15-c6', name: 'Sodium Sulfate (Anhydrous)', quantity: 45, unit: 'g' },
      { id: 'dk15-c7', name: 'Cold Water to make', quantity: 1000, unit: 'ml' },
    ],
    steps: [
      'Dissolve chemicals in order in 750ml water at 50°C.',
      'The Sodium Sulfate prevents excessive swelling of the emulsion at high temperatures.',
      'Add cold water to reach final volume.'
    ]
  },
  {
    id: 'indicator-stop',
    name: 'Indicator Stop Bath',
    type: 'stop',
    form: 'concentrate',
    description: 'Acetic acid based stop bath with color indicator.',
    baseVolume: 1000,
    expiryDays: 365,
    dilutionRatio: '1+19',
    chemicals: [
      { id: 'stop-c1', name: 'Water', quantity: 950, unit: 'ml' },
      { id: 'stop-c2', name: 'Stop Bath Concentrate', quantity: 50, unit: 'ml' },
    ],
    steps: [
      'Add concentrate to water.',
      'Solution turns from yellow to purple when exhausted.'
    ]
  },
  {
    id: 'rapid-fixer',
    name: 'Rapid Fixer',
    type: 'fixer',
    form: 'concentrate',
    description: 'Fast acting ammonium thiosulfate fixer.',
    baseVolume: 1000,
    expiryDays: 180,
    dilutionRatio: '1+4',
    chemicals: [
      { id: 'fix-c1', name: 'Water', quantity: 800, unit: 'ml' },
      { id: 'fix-c2', name: 'Fixer Concentrate', quantity: 200, unit: 'ml' },
    ],
    steps: [
      'Add concentrate to water.',
      'Mix thoroughly.'
    ]
  },
  {
    id: 'photo-flo',
    name: 'Photo-Flo 200',
    type: 'wetting',
    form: 'concentrate',
    description: 'Wetting agent to prevent water spots.',
    baseVolume: 1000,
    expiryDays: 730,
    dilutionRatio: '1+200',
    chemicals: [
      { id: 'pf-c1', name: 'Water', quantity: 995, unit: 'ml' },
      { id: 'pf-c2', name: 'Photo-Flo Concentrate', quantity: 5, unit: 'ml' },
    ],
    steps: [
      'Add concentrate to water.',
      'Agitate gently to avoid excessive foam.'
    ]
  },
  {
    id: 'diafine-bath-a',
    name: 'Diafine (Bath A)',
    type: 'developer',
    form: 'powder',
    description: 'Part A of the legendary two-bath developer.',
    baseVolume: 1000,
    expiryDays: 365,
    chemicals: [
      { id: 'dia-a-c1', name: 'Water (24-30°C)', quantity: 750, unit: 'ml' },
      { id: 'dia-a-c2', name: 'Sodium Sulfite', quantity: 35, unit: 'g' },
      { id: 'dia-a-c3', name: 'Hydroquinone', quantity: 6, unit: 'g' },
      { id: 'dia-a-c4', name: 'Sodium Bisulfite', quantity: 10, unit: 'g' },
      { id: 'dia-a-c5', name: 'Phenidone', quantity: 0.5, unit: 'g' },
      { id: 'dia-a-c6', name: 'Water to make', quantity: 1000, unit: 'ml' },
    ],
    steps: [
      'Dissolve chemicals in order in 750ml water.',
      'Add water to reach final volume.',
      'Diafine is very stable and can be reused many times.'
    ],
    isTwoBath: true
  },
  {
    id: 'diafine-bath-b',
    name: 'Diafine (Bath B)',
    type: 'developer',
    form: 'powder',
    description: 'Part B of the legendary two-bath developer.',
    baseVolume: 1000,
    expiryDays: 365,
    chemicals: [
      { id: 'dia-b-c1', name: 'Water (24-30°C)', quantity: 750, unit: 'ml' },
      { id: 'dia-b-c2', name: 'Sodium Sulfite', quantity: 65, unit: 'g' },
      { id: 'dia-b-c3', name: 'Sodium Metaborate', quantity: 20, unit: 'g' },
      { id: 'dia-b-c4', name: 'Water to make', quantity: 1000, unit: 'ml' },
    ],
    steps: [
      'Dissolve chemicals in order in 750ml water.',
      'Add water to reach final volume.'
    ],
    isTwoBath: true
  },
  {
    id: 'divided-d23-a',
    name: 'Divided D-23 (Bath A)',
    type: 'developer',
    form: 'powder',
    description: 'Modified Two-Bath developer for extreme highlight control.',
    baseVolume: 1000,
    expiryDays: 180,
    chemicals: [
      { id: 'd23a-c1', name: 'Water (50°C)', quantity: 750, unit: 'ml' },
      { id: 'd23a-c2', name: 'Metol', quantity: 6.25, unit: 'g' },
      { id: 'd23a-c3', name: 'Sodium Sulfite (Anhydrous)', quantity: 85, unit: 'g' },
      { id: 'd23a-c4', name: 'Cold Water to make', quantity: 1000, unit: 'ml' },
    ],
    steps: [
      'Dissolve Metol in 750ml water at 50°C.',
      'Dissolve Sodium Sulfite.',
      'Add cold water to reach final volume.'
    ],
    isTwoBath: true
  },
  {
    id: 'divided-d23-b',
    name: 'Divided D-23 (Bath B)',
    type: 'developer',
    form: 'powder',
    description: 'Accelerator bath for Divided D-23.',
    baseVolume: 1000,
    expiryDays: 365,
    chemicals: [
      { id: 'd23b-c1', name: 'Water', quantity: 900, unit: 'ml' },
      { id: 'd23b-c2', name: 'Sodium Metaborate (Kodalk)', quantity: 12, unit: 'g' },
      { id: 'd23b-c3', name: 'Water to make', quantity: 1000, unit: 'ml' },
    ],
    steps: [
      'Dissolve Sodium Metaborate in water.',
      'For N+1 development, increase to 20g.',
      'For N-1 development, decrease to 7g.'
    ],
    isTwoBath: true
  },
  {
    id: 'ansco-130',
    name: 'Ansco 130 (Paper Developer)',
    type: 'developer',
    form: 'powder',
    description: 'Legendary universal paper developer for rich blacks.',
    baseVolume: 1000,
    expiryDays: 60,
    chemicals: [
      { id: 'a130-c1', name: 'Water (52°C)', quantity: 750, unit: 'ml' },
      { id: 'a130-c2', name: 'Metol', quantity: 2.2, unit: 'g' },
      { id: 'a130-c3', name: 'Sodium Sulfite (Anhydrous)', quantity: 50, unit: 'g' },
      { id: 'a130-c4', name: 'Hydroquinone', quantity: 11, unit: 'g' },
      { id: 'a130-c5', name: 'Sodium Carbonate (Monohydrated)', quantity: 78, unit: 'g' },
      { id: 'a130-c6', name: 'Potassium Bromide', quantity: 5.5, unit: 'g' },
      { id: 'a130-c7', name: 'Glycin', quantity: 11, unit: 'g' },
      { id: 'a130-c8', name: 'Water to make', quantity: 1000, unit: 'ml' },
    ],
    steps: [
      'Dissolve chemicals in order in water at 52°C.',
      'Glycin dissolves slowly; ensure previous chemicals are fully dissolved.',
      'Dilute 1+1 for normal use, or 1+2 for softer results.'
    ]
  },
  {
    id: 'acid-rapid-fixer',
    name: 'Acid Rapid Fixer',
    type: 'fixer',
    form: 'powder',
    description: 'Rapid non-hardening fixer from scratch.',
    baseVolume: 1000,
    expiryDays: 180,
    chemicals: [
      { id: 'arf-c1', name: 'Water (50°C)', quantity: 700, unit: 'ml' },
      { id: 'arf-c2', name: 'Sodium Thiosulphate (Hypo)', quantity: 200, unit: 'g' },
      { id: 'arf-c3', name: 'Ammonium Chloride', quantity: 50, unit: 'g' },
      { id: 'arf-c4', name: 'Potassium Metabisulfite', quantity: 20, unit: 'g' },
      { id: 'arf-c5', name: 'Water to make', quantity: 1000, unit: 'ml' },
    ],
    steps: [
      'Dissolve Sodium Thiosulphate in warm water.',
      'Add Ammonium Chloride (this creates Ammonium Thiosulphate).',
      'Add Potassium Metabisulfite as an acidifier/preservative.',
      'Add water to reach final volume.'
    ]
  },
  {
    id: 'c41-dev-scratch',
    name: 'C-41 Developer (From Scratch)',
    type: 'developer',
    form: 'powder',
    description: 'Stefan Heymann / Ron Mowrey homebrew C-41 formula.',
    baseVolume: 1000,
    expiryDays: 30,
    chemicals: [
      { id: 'c41s-c1', name: 'Distilled Water', quantity: 800, unit: 'ml' },
      { id: 'c41s-c2', name: 'Calgon (Sodium Hexametaphosphate)', quantity: 2, unit: 'g' },
      { id: 'c41s-c3', name: 'Potassium Carbonate (Anhydrous)', quantity: 34, unit: 'g' },
      { id: 'c41s-c4', name: 'Sodium Bicarbonate', quantity: 1.9, unit: 'g' },
      { id: 'c41s-c5', name: 'Sodium Sulphite (Anhydrous)', quantity: 3.5, unit: 'g' },
      { id: 'c41s-c6', name: 'Potassium Bromide', quantity: 1.4, unit: 'g' },
      { id: 'c41s-c7', name: 'Potassium Iodide (0.1% soln)', quantity: 1.4, unit: 'ml' },
      { id: 'c41s-c8', name: 'Hydroxylamine Sulfate (HAS)', quantity: 2, unit: 'g' },
      { id: 'c41s-c9', name: 'CD-4', quantity: 5.3, unit: 'g' },
      { id: 'c41s-c10', name: 'Distilled Water to make', quantity: 1000, unit: 'ml' },
    ],
    steps: [
      'Dissolve chemicals in order in distilled water.',
      'CD-4 must be added last.',
      'Target pH: 10.16 at 25°C.',
      'Process at 37.8°C (100°F) for 3:15.'
    ]
  }
];

export const TANK_VOLUMES = {
  paterson: {
    '35mm': 290,
    '120': 500,
    '4x5': 1000
  },
  jobo: {
    '35mm': 140,
    '120': 240,
    '4x5': 270
  },
  stainless: {
    '35mm': 250,
    '120': 450,
    '4x5': 900
  },
  custom: {
    '35mm': 300,
    '120': 500,
    '4x5': 1000
  }
};

export const AGITATION_FACTORS = {
  inversion: 1.0,
  rotary: 0.85,
  continuous: 0.85,
  stand: 1.0
};

export const DEFAULT_PRESETS: DevPreset[] = [
  {
    id: 'hp5-d76',
    name: 'Ilford HP5+ in D-76',
    filmType: 'HP5 Plus',
    developerName: 'D-76',
    dilution: 'Stock',
    baseTemperature: 20,
    tempTable: {
      18: 570, // 9.5 min
      19: 510, // 8.5 min
      20: 450, // 7.5 min
      21: 405, // 6.75 min
      22: 360, // 6 min
      24: 300  // 5 min
    },
    steps: [
      { id: 'hp5-s1', name: 'Developer', duration: 450, agitationInterval: 60, agitationDuration: 10 },
      { id: 'hp5-s2', name: 'Stop Bath', duration: 30, agitationInterval: 0 },
      { id: 'hp5-s3', name: 'Fixer', duration: 300, agitationInterval: 60, agitationDuration: 10 },
      { id: 'hp5-s4', name: 'Wash', duration: 600, instructions: 'Ilford Method or running water' },
      { id: 'hp5-s5', name: 'Wetting Agent', duration: 60, instructions: 'Final rinse' }
    ]
  },
  {
    id: 'tri-x-diafine',
    name: 'Kodak Tri-X in Diafine',
    filmType: 'Tri-X 400',
    developerName: 'Diafine',
    dilution: 'Two-Bath',
    baseTemperature: 20,
    steps: [
      { id: 'tri-x-s1', name: 'Bath A', duration: 180, agitationInterval: 60, agitationDuration: 5, instructions: 'Do NOT rinse after this step' },
      { id: 'tri-x-s2', name: 'Bath B', duration: 180, agitationInterval: 60, agitationDuration: 5 },
      { id: 'tri-x-s3', name: 'Water Rinse', duration: 30 },
      { id: 'tri-x-s4', name: 'Fixer', duration: 300, agitationInterval: 60, agitationDuration: 10 },
      { id: 'tri-x-s5', name: 'Wash', duration: 600 },
      { id: 'tri-x-s6', name: 'Wetting Agent', duration: 30 }
    ]
  },
  {
    id: 'hp5-tropical',
    name: 'Ilford HP5+ (Tropical)',
    filmType: 'HP5 Plus',
    developerName: 'DK-15',
    dilution: 'Stock',
    baseTemperature: 27,
    tempTable: {
      26: 600,
      27: 540,
      28: 480,
      30: 360
    },
    steps: [
      { id: 'hp5-t-s1', name: 'Developer (DK-15)', duration: 540, agitationInterval: 60, agitationDuration: 10 },
      { id: 'hp5-t-s2', name: 'Tropical Stop Bath', duration: 60, instructions: 'Use 2% Chrome Alum if possible' },
      { id: 'hp5-t-s3', name: 'Fixer', duration: 300 },
      { id: 'hp5-t-s4', name: 'Wash', duration: 600 },
      { id: 'hp5-t-s5', name: 'Wetting Agent', duration: 30 }
    ]
  },
  {
    id: 'tri-x-d23-divided',
    name: 'Kodak Tri-X in Divided D-23',
    filmType: 'Tri-X 400',
    developerName: 'Divided D-23',
    dilution: 'Two-Bath',
    baseTemperature: 20,
    steps: [
      { id: 'd23-s1', name: 'Bath A', duration: 180, agitationInterval: 60, agitationDuration: 5, instructions: 'Do NOT rinse after this step' },
      { id: 'd23-s2', name: 'Bath B', duration: 180, agitationInterval: 60, agitationDuration: 5 },
      { id: 'd23-s3', name: 'Water Rinse', duration: 30 },
      { id: 'd23-s4', name: 'Fixer', duration: 300, agitationInterval: 60, agitationDuration: 10 },
      { id: 'd23-s5', name: 'Wash', duration: 600 },
      { id: 'd23-s6', name: 'Wetting Agent', duration: 30 }
    ]
  }
];
