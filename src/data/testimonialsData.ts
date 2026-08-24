import { Testimonial } from '../types';

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    author: 'Elena & Julian Rothschild',
    title: 'Tribeca Cast-Iron Loft',
    location: 'Tribeca, New York',
    propertyType: '4,800 sq ft Historic Penthouse',
    quote: 'Aura Living Studio orchestrated a breathtaking transformation. Their ability to fuse raw architectural bones with sculptural warmth and museum lighting exceeded anything we could have envisioned. Truly world-class.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    projectImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    date: 'February 2025',
    verified: true
  },
  {
    id: '2',
    author: 'Alistair Montgomery',
    title: 'Managing Director, Apex Properties UK',
    location: 'Mayfair, London',
    propertyType: 'Luxury Boutique Commercial & Residential Assets',
    quote: 'From the initial 3D AR spatial study to turnkey execution, Aura’s rigor and material mastery are unmatched. They delivered $12M worth of property value appreciation through their spatial reconfiguration.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    projectImg: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    date: 'January 2025',
    verified: true
  },
  {
    id: '3',
    author: 'Dr. Soraya & Marc Chen',
    title: 'Modern Organic Residence',
    location: 'Pacific Palisades, California',
    propertyType: '6,400 sq ft Modernist Sanctuary',
    quote: 'The AR Spatial Visualizer was a game changer for us. We were able to visualize every monolithic travertine table and curved sofa directly in our living room with our family before commissioning. Flawless execution.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    projectImg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
    date: 'November 2024',
    verified: true
  },
  {
    id: '4',
    author: 'Kenji Takahashi',
    title: 'Managing Partner, Horizon Capital Tokyo',
    location: 'Roppongi, Tokyo',
    propertyType: 'Executive Hospitality Suite',
    quote: 'The Hinoki woodwork and acoustic serene zoning achieved by Aura is revered by all our international visiting delegations. Their team honors architectural heritage with visionary modern elegance.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    projectImg: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80',
    date: 'December 2024',
    verified: true
  }
];

export const PRESS_MENTIONS = [
  { name: 'Architectural Digest', quote: 'Aura Living Studio redefines modern architectural serenity with tactile monolithic stone and poetic restraint.' },
  { name: 'Elle Decor', quote: 'Selected in the A-List 100: Masters of warm minimalism and custom spatial engineering.' },
  { name: 'Vogue Living', quote: 'Where high-end interior architecture meets immersive spatial technology.' },
  { name: 'Dezeen Awards', quote: 'Winner — Best Residential Interior Architecture & Sustainable Craftsmanship.' },
  { name: 'Dwell Magazine', quote: 'An effortless dialogue between historic structure and contemporary sculptural forms.' }
];

export const GOOGLE_REVIEWS_SUMMARY = {
  averageRating: 5.0,
  reviewCount: 48,
  breakdown: [
    { stars: 5, count: 47, percentage: 98 },
    { stars: 4, count: 1, percentage: 2 },
    { stars: 3, count: 0, percentage: 0 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 }
  ]
};
