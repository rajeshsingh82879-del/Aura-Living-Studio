import { ServiceTier } from '../types';

export const SERVICE_TIERS: ServiceTier[] = [
  {
    id: 'full-service',
    name: 'Turnkey Architectural & Interior Design',
    badge: 'Signature Experience',
    tagline: 'Comprehensive end-to-end design, construction management, and bespoke staging.',
    startingPrice: '$25,000',
    priceNote: 'or 15-20% of total project construction budget',
    turnaround: '4 to 18 Months',
    featured: true,
    idealFor: 'High-Net-Worth Homeowners, Full Gut Renovations, Luxury Commercial & Hospitality',
    deliverables: [
      'Comprehensive on-site spatial architectural survey & 3D LiDAR laser scans',
      'Full architectural construction drawing sets (CAD/BIM, MEP, lighting, joinery plans)',
      'Custom bespoke millwork & furniture design with artisan fabricators',
      'Global material sourcing & trade-only luxury furniture procurement (up to 30% trade discount)',
      'Dedicated on-site project management, contractor oversight & quality control',
      'White-glove white-linen turnkey styling, fine art curation & final move-in reveal'
    ]
  },
  {
    id: 'e-design',
    name: 'E-Design & AR Spatial Curation',
    badge: 'Global Remote',
    tagline: 'Precision layout planning, 3D photorealistic visualization, and curated procurement for remote spaces.',
    startingPrice: '$4,500',
    priceNote: 'per room / volume discounts available',
    turnaround: '3 to 6 Weeks',
    featured: false,
    idealFor: 'Design-Conscious Remote Clients, Single-Room Overhauls, Layout Optimization',
    deliverables: [
      'Digital space twin creation from client measurements or LiDAR phone scans',
      'Full 3D photorealistic spatial renders & interactive WebGL / AR room models',
      'Interactive room layout blueprint with exact clearances and traffic circulation',
      'Clickable trade-discount shopping list with furniture, lighting, rugs, and decor',
      'Custom physical materials & paint sample box delivered to your doorstep',
      'Two revision rounds with your dedicated senior interior architect via private video calls'
    ]
  },
  {
    id: 'architectural-consultation',
    name: 'Architectural & Material Consultation',
    badge: 'Advisory Intensive',
    tagline: 'High-impact spatial advisory for pre-purchase audits, builder plan reviews, or material schemes.',
    startingPrice: '$1,800',
    priceNote: 'half-day intensive or multi-session advisory',
    turnaround: '1 to 2 Weeks',
    featured: false,
    idealFor: 'Prospective Buyers, Developers, Renovation Planning, Palette Clarification',
    deliverables: [
      '3-Hour deep-dive architectural consultation (in-person at atelier or virtual)',
      'Structural feasibility analysis and wall removal / space-flow optimization review',
      'Customized mood board, lighting strategy & tactile material specification document',
      'Contractor bidding advisory and realistic budget range forecasting',
      'Comprehensive follow-up executive summary PDF with sketch diagrams & supplier contacts'
    ]
  }
];

export const DESIGN_PROCESS_STEPS = [
  {
    number: '01',
    phase: 'Discovery & Spatial Audit',
    subtitle: 'Understanding Soul & Structure',
    description: 'We initiate every partnership with an exhaustive spatial diagnostic. Through site scans, lifestyle questionnaires, and acoustic/light studies, we map the architectural essence of your space and your aesthetic ambitions.',
    deliverable: 'Spatial Audit Dossier & Master Budget Allocation',
    duration: 'Weeks 1 – 2'
  },
  {
    number: '02',
    phase: 'Concept & 3D Spatial Scheme',
    subtitle: 'Iterating in 3D & Augmented Reality',
    description: 'Our architects translate discoveries into tactile mood boards, bespoke millwork blueprints, and interactive 3D / AR spatial models. You experience furniture proportions, light grazing, and textures before a single hammer swings.',
    deliverable: '3D Photorealistic Models, Material Sample Box & AR Walkthrough',
    duration: 'Weeks 3 – 6'
  },
  {
    number: '03',
    phase: 'Procurement & Turnkey Execution',
    subtitle: 'Master Craftsmanship & White-Glove Reveal',
    description: 'We supervise custom fabrication across our global network of stonemasons, metalworkers, and upholsterers. We orchestrate all logistics, contractor alignments, and white-glove styling down to the final scent and art placement.',
    deliverable: 'Complete Turnkey Delivery, As-Built Manual & Champagne Reveal',
    duration: 'Months 2 – 12+'
  }
];
