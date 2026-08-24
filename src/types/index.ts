export type ProjectCategory = 'all' | 'residential' | 'commercial' | 'e-design';

export interface ProjectCaseStudy {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'e-design';
  categoryLabel: string;
  location: string;
  roomType: string;
  sqft: number;
  year: number;
  duration: string;
  style: string;
  budgetTier: string;
  heroImage: string;
  thumbnailImage: string;
  beforeImage: string;
  afterImage: string;
  headline: string;
  summary: string;
  designBrief: {
    overview: string;
    clientRequirements: string[];
    challenges: string[];
  };
  conceptAndMoodBoard: {
    philosophy: string;
    palette: { name: string; hex: string; role: string }[];
    materials: string[];
    lightingConcept: string;
  };
  execution: {
    milestones: string[];
    customElements: string[];
    structuralModifications: string;
    galleryImages: string[];
  };
  clientReview: {
    quote: string;
    author: string;
    role: string;
    rating: number;
  };
}

export interface ServiceTier {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  startingPrice: string;
  priceNote: string;
  turnaround: string;
  deliverables: string[];
  idealFor: string;
  featured?: boolean;
}

export interface FurnitureItem {
  id: string;
  name: string;
  category: 'sofas' | 'tables' | 'chairs' | 'lighting' | 'storage' | 'accents';
  dimensions: { width: number; depth: number; height: number }; // in inches
  price: number;
  designer: string;
  description: string;
  materials: { name: string; hex: string; preview: string }[];
  defaultMaterialIndex: number;
  thumbnail: string;
  modelType: 'sofa_curved' | 'table_travertine' | 'chair_cane' | 'credenza_walnut' | 'lamp_alabaster' | 'rug_wool' | 'dining_marble' | 'armchair_velvet' | 'pendant_brass' | 'bookcase_fluted';
}

export interface PlacedFurniture {
  instanceId: string;
  furnitureId: string;
  name: string;
  modelType: string;
  x: number; // grid position x (-10 to 10)
  z: number; // grid position z (-10 to 10)
  rotation: number; // in degrees 0-360
  scale: number;
  selectedMaterial: string;
  price: number;
}

export interface InquiryFormData {
  scope: string;
  propertyType: string;
  budgetRange: number;
  targetTimeline: string;
  squareFootage: string;
  location: string;
  hasFloorplan: boolean;
  uploadedFileName?: string;
  uploadedFilePreview?: string;
  stylePreferences: string[];
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
  selectedDate?: string;
  selectedTime?: string;
  arLayoutIncluded?: boolean;
  arItemCount?: number;
  estimatedTotal?: number;
}

export interface Testimonial {
  id: string;
  author: string;
  title: string;
  location: string;
  propertyType: string;
  quote: string;
  rating: number;
  avatar: string;
  projectImg: string;
  date: string;
  verified: boolean;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  coverImage: string;
  excerpt: string;
  author: string;
  authorRole: string;
  content: string[];
}
