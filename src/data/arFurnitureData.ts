import { FurnitureItem } from '../types';

export const AR_FURNITURE_CATALOG: FurnitureItem[] = [
  {
    id: 'sofa-solstice-boucle',
    name: 'Solstice Sculptural Curved Sofa',
    category: 'sofas',
    dimensions: { width: 108, depth: 46, height: 31 }, // inches
    price: 8400,
    designer: 'Studio Aura Bespoke',
    description: 'Organic undulating silhouette crafted with high-resilience memory foam and hand-tailored luxury bouclé upholstery.',
    materials: [
      { name: 'Oatmeal French Bouclé', hex: '#EDE7DE', preview: 'boucle-cream' },
      { name: 'Cognac Saddle Leather', hex: '#8F4E2E', preview: 'leather-cognac' },
      { name: 'Olive Mohair Velvet', hex: '#4B5342', preview: 'mohair-olive' },
      { name: 'Charcoal Cashmere', hex: '#26282A', preview: 'cashmere-charcoal' }
    ],
    defaultMaterialIndex: 0,
    thumbnail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
    modelType: 'sofa_curved'
  },
  {
    id: 'table-travertine-monolith',
    name: 'Navona Monolith Travertine Table',
    category: 'tables',
    dimensions: { width: 56, depth: 34, height: 14 },
    price: 4600,
    designer: 'Tivoli Stone Guild',
    description: 'Hand-carved from a single quarry block of Roman Navona travertine, honed to a velvety matte tactile finish.',
    materials: [
      { name: 'Roman Navona Travertine', hex: '#D5C3AE', preview: 'travertine-warm' },
      { name: 'Nero Marquina Marble', hex: '#1C1E1F', preview: 'marble-black' },
      { name: 'Calacatta Viola', hex: '#E2D3DB', preview: 'calacatta-viola' }
    ],
    defaultMaterialIndex: 0,
    thumbnail: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=400&q=80',
    modelType: 'table_travertine'
  },
  {
    id: 'chair-arc-lounge',
    name: 'Kyoto Minimalist Cane Lounge Chair',
    category: 'chairs',
    dimensions: { width: 32, depth: 34, height: 29 },
    price: 2850,
    designer: 'Aura × Artisan Kyoto',
    description: 'Solid European fumed white oak frame with hand-woven natural rattan cane backrest and linen cushioned seat.',
    materials: [
      { name: 'Fumed White Oak & Cane', hex: '#8A7056', preview: 'oak-fumed' },
      { name: 'Natural Hinoki & Cream Cane', hex: '#D8C4A9', preview: 'hinoki-natural' },
      { name: 'Ebonized Ash & Black Cane', hex: '#1C1C1C', preview: 'ash-black' }
    ],
    defaultMaterialIndex: 0,
    thumbnail: 'https://images.unsplash.com/photo-1580481077195-c3a824452e7b?auto=format&fit=crop&w=400&q=80',
    modelType: 'chair_cane'
  },
  {
    id: 'credenza-walnut-fluted',
    name: 'Aethel Fluted Architectural Credenza',
    category: 'storage',
    dimensions: { width: 84, depth: 20, height: 32 },
    price: 6200,
    designer: 'Aura Living Collection',
    description: 'Precision-routed fluted solid American walnut doors with concealed push-to-open hardware and honed marble top inlay.',
    materials: [
      { name: 'American Walnut & Calacatta', hex: '#4A3B32', preview: 'walnut-calacatta' },
      { name: 'Bleached White Oak & Travertine', hex: '#BDB19C', preview: 'oak-travertine' },
      { name: 'Smoked Smudge Ash', hex: '#2B2826', preview: 'ash-smoked' }
    ],
    defaultMaterialIndex: 0,
    thumbnail: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=400&q=80',
    modelType: 'credenza_walnut'
  },
  {
    id: 'lamp-alabaster-totem',
    name: 'Aura Totem Alabaster Floor Lamp',
    category: 'lighting',
    dimensions: { width: 14, depth: 14, height: 68 },
    price: 3100,
    designer: 'Studio Flos Collaborative',
    description: 'Solid translucent Spanish alabaster cylinder emitting a warm, ethereal 2700K ambient glow with brushed brass base.',
    materials: [
      { name: 'Veined Spanish Alabaster', hex: '#F0ECE1', preview: 'alabaster-warm' },
      { name: 'Brushed Aged Brass Base', hex: '#C29F62', preview: 'brass-aged' },
      { name: 'Blackened Patinated Bronze', hex: '#262928', preview: 'bronze-patina' }
    ],
    defaultMaterialIndex: 0,
    thumbnail: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80',
    modelType: 'lamp_alabaster'
  },
  {
    id: 'rug-tibetan-wool',
    name: 'Dune Hand-Knotted Wool & Silk Area Rug',
    category: 'accents',
    dimensions: { width: 120, depth: 144, height: 1 }, // 10x12 ft
    price: 5200,
    designer: 'Tibetan Heritage Loom',
    description: 'High-low carved pile made of 70% hand-spun Tibetan highland wool and 30% unbleached mulberry silk.',
    materials: [
      { name: 'Alabaster & Oatmeal High-Low', hex: '#EBE5D8', preview: 'rug-oatmeal' },
      { name: 'Terracotta Earth Tone', hex: '#9C5843', preview: 'rug-terracotta' },
      { name: 'Sage & Slate Mist', hex: '#778278', preview: 'rug-sage' }
    ],
    defaultMaterialIndex: 0,
    thumbnail: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=400&q=80',
    modelType: 'rug_wool'
  },
  {
    id: 'table-calacatta-dining',
    name: 'Palladio Oval Calacatta Dining Table',
    category: 'tables',
    dimensions: { width: 96, depth: 44, height: 30 },
    price: 11500,
    designer: 'Carrara Bespoke Studio',
    description: 'Sculptural double pedestal oval dining table carved from Italian Calacatta Gold with champagne brushed brass trim.',
    materials: [
      { name: 'Calacatta Gold Italian Marble', hex: '#EDE8DE', preview: 'calacatta-gold' },
      { name: 'Dark Emperador Marble', hex: '#3B2F2F', preview: 'emperador' },
      { name: 'Fumed Cast Bronze', hex: '#58493B', preview: 'bronze-pedestal' }
    ],
    defaultMaterialIndex: 0,
    thumbnail: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=400&q=80',
    modelType: 'dining_marble'
  },
  {
    id: 'chair-velvet-accent',
    name: 'Siena Curvilinear Velvet Armchair',
    category: 'chairs',
    dimensions: { width: 36, depth: 36, height: 30 },
    price: 3400,
    designer: 'Milano Design Lab',
    description: 'Sculpted cloud form armchair upholstered in Italian cotton velvet with concealed 360-degree silent swivel mechanism.',
    materials: [
      { name: 'Terracotta Rust Velvet', hex: '#B85D43', preview: 'velvet-rust' },
      { name: 'Forest Moss Velvet', hex: '#3E4B37', preview: 'velvet-moss' },
      { name: 'Sand Bouclé', hex: '#EAE3D5', preview: 'velvet-sand' }
    ],
    defaultMaterialIndex: 0,
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80',
    modelType: 'armchair_velvet'
  },
  {
    id: 'pendant-brass-sculptural',
    name: 'Aura Celestial Brass Mobile Chandelier',
    category: 'lighting',
    dimensions: { width: 62, depth: 38, height: 42 },
    price: 4900,
    designer: 'Studio Aura Lighting Lab',
    description: 'Hand-balanced kinetic chandelier with brushed brass counterweights and mouth-blown opal glass luminous globes.',
    materials: [
      { name: 'Brushed Unlacquered Brass', hex: '#D2AA6D', preview: 'brass-unlacquered' },
      { name: 'Blackened Architectural Steel', hex: '#222426', preview: 'steel-blackened' },
      { name: 'Polished Nickel', hex: '#C7CBD1', preview: 'nickel-polished' }
    ],
    defaultMaterialIndex: 0,
    thumbnail: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=400&q=80',
    modelType: 'pendant_brass'
  },
  {
    id: 'bookcase-fluted-monolith',
    name: 'Arcadia Fluted Architectural Bookcase',
    category: 'storage',
    dimensions: { width: 54, depth: 16, height: 86 },
    price: 7800,
    designer: 'Aura Living Bespoke',
    description: 'Monumental architectural shelving unit featuring integrated dimmable LED edge wash and fluted side columns.',
    materials: [
      { name: 'Smoked Oak & Brass Trim', hex: '#4B3F37', preview: 'oak-smoked' },
      { name: 'Bleached Lime Ash', hex: '#C7BCAD', preview: 'ash-bleached' },
      { name: 'Charcoal Stained Walnut', hex: '#282524', preview: 'walnut-charcoal' }
    ],
    defaultMaterialIndex: 0,
    thumbnail: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=400&q=80',
    modelType: 'bookcase_fluted'
  }
];

export const PRESET_ROOM_ENVIRONMENTS = [
  {
    id: 'penthouse-living',
    name: 'Tribeca High-Ceiling Loft',
    type: 'Living Room',
    dimensions: '26 ft × 20 ft (520 sq ft)',
    floorMaterial: 'European Chevron Oak',
    wallColor: '#F5F0E8',
    daylight: 'Warm Afternoon Sun',
    bgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'executive-lounge',
    name: 'Executive Sanctuary & Boardroom',
    type: 'Commercial Office',
    dimensions: '22 ft × 16 ft (352 sq ft)',
    floorMaterial: 'Polished Basalt & Wood Inlay',
    wallColor: '#ECE6DC',
    daylight: 'Soft Northern Light',
    bgImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'cotswold-master',
    name: 'Heritage Master Suite & Hearth',
    type: 'Master Suite',
    dimensions: '24 ft × 18 ft (432 sq ft)',
    floorMaterial: 'Reclaimed Limestone Flags',
    wallColor: '#F8F4EE',
    daylight: 'Golden Hour Dusk',
    bgImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'trousdale-pavilion',
    name: 'Beverly Hills Indoor-Outdoor Pavilion',
    type: 'Great Room',
    dimensions: '32 ft × 24 ft (768 sq ft)',
    floorMaterial: 'Custom Aggregate Terrazzo',
    wallColor: '#F9F7F3',
    daylight: 'California Bright Daylight',
    bgImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'
  }
];
