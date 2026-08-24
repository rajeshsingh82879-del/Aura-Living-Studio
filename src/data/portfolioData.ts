import { ProjectCaseStudy } from '../types';

export const PORTFOLIO_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'tribeca-penthouse',
    title: 'The Tribeca Cast-Iron Loft',
    category: 'residential',
    categoryLabel: 'Residential Architecture',
    location: 'Tribeca, New York City',
    roomType: 'Open Living & Atelier',
    sqft: 4800,
    year: 2025,
    duration: '14 Months',
    style: 'Warm Architectural Minimalism',
    budgetTier: '$450,000 - $600,000',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    thumbnailImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    headline: 'Restoring Historic Cast-Iron Grandeur with Monolithic Travertine & Natural Lime Plaster',
    summary: 'A turnkey gut-renovation transforming a cavernous 19th-century warehouse loft into a serene, light-sculpted residence with custom fluted walnut millwork and bespoke Italian furnishings.',
    designBrief: {
      overview: 'The clients, an art collector and tech entrepreneur, required a dual-purpose spatial sanctuary that accommodates grand-scale private art exhibitions while remaining deeply intimate for family living.',
      clientRequirements: [
        'Preserve the original cast-iron columns and 14-foot exposed ceiling beams.',
        'Create museum-grade ambient and focused architectural lighting without visual clutter.',
        'Curate monolithic stone statement pieces with acoustic dampening for high ceilings.'
      ],
      challenges: [
        'Echo and cavernous acoustics resulting from high ceilings and expansive floor spans.',
        'Integrating hidden HVAC and smart home automation behind micro-cement and lime plaster walls.'
      ]
    },
    conceptAndMoodBoard: {
      philosophy: 'Harmonizing raw industrial skeleton with tactile organic warmth: Roman travertine, raw linen, European white oak, and aged bronze.',
      palette: [
        { name: 'Warm Alabaster', hex: '#FAF7F2', role: 'Wall Base & Lime Wash' },
        { name: 'Roman Travertine', hex: '#D7C7B3', role: 'Monolith Islands & Fireplace' },
        { name: 'Charcoal Patina', hex: '#26292B', role: 'Architectural Hardware' },
        { name: 'Cognac Saddle', hex: '#8F4E2E', role: 'Upholstery Accents' }
      ],
      materials: ['Navona Travertine', 'Fumed White Oak Chevron', 'St. Leo Marmorino Plaster', 'Fluted Cast Bronze'],
      lightingConcept: 'Concealed 2700K perimeter cove grazing, museum-grade recessed pin-spots with 98+ CRI, and custom sculptural alabaster pendants.'
    },
    execution: {
      milestones: [
        'Phase 1: Structural demolition & historic beam restoration',
        'Phase 2: Sound dampening ceiling membrane and recessed lighting channels',
        'Phase 3: Millwork installation & monolithic 3-ton travertine fireplace placement',
        'Phase 4: Bespoke furniture staging and fine art curation'
      ],
      customElements: [
        '18-foot floating monolithic travertine island with integrated induction cooktop',
        'Floor-to-ceiling pivot bookcase in dark fumed European oak',
        'Sculptural curved bouclé sofa custom-formed to the living room radius'
      ],
      structuralModifications: 'Removed three non-loadbearing masonry partitions to unveil continuous 60-foot sightlines flooded by southern daylight.',
      galleryImages: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    clientReview: {
      quote: 'Aura Living Studio translated our ambiguous vision into an architectural masterpiece. Walking into our loft feels like stepping into a private sanctuary in the center of Manhattan.',
      author: 'Marcus & Evelyn Vance',
      role: 'Private Residence Owners',
      rating: 5
    }
  },
  {
    id: 'cotswolds-manor',
    title: 'The Cotswolds Estate Retreat',
    category: 'residential',
    categoryLabel: 'Residential Architecture',
    location: 'Gloucestershire, United Kingdom',
    roomType: 'Master Suite & Conservatory',
    sqft: 6200,
    year: 2024,
    duration: '18 Months',
    style: 'Modern Biophilic Heritage',
    budgetTier: '$650,000 - $850,000',
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85',
    thumbnailImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
    headline: 'Infusing 18th-Century Limestone Architecture with Contemporary Nordic Poetics',
    summary: 'A complete historical manor overhaul combining hand-finished Cotswold stone walls, custom fluted glass solariums, and Scandinavian low-slung custom furniture.',
    designBrief: {
      overview: 'Transform a drafty Grade-II listed manor into an ultra-luxurious, energy-efficient family retreat that honors its historical masonry while providing seamless modern comfort.',
      clientRequirements: [
        'Retain original stonework and limestone fireplaces.',
        'Design a bespoke master retreat with an open sculptural bathing area overlooking the private orchard.',
        'Curate organic, tactile fabrics resistant to countryside living.'
      ],
      challenges: [
        'Strict heritage preservation regulations preventing exterior wall alterations.',
        'Integrating underfloor geothermal radiant heating without damaging reclaimed flags.'
      ]
    },
    conceptAndMoodBoard: {
      philosophy: 'Celebrating time-worn patina through juxtaposition with crisp architectural steel, boucle textures, and brushed nickel.',
      palette: [
        { name: 'Oatmeal Linen', hex: '#EDE6DB', role: 'Upholstery & Drapery' },
        { name: 'English Limestone', hex: '#C5BAA8', role: 'Stone & Hearth' },
        { name: 'Deep Moss', hex: '#444C38', role: 'Accent Joinery' },
        { name: 'Aged Pewter', hex: '#525453', role: 'Metalwork' }
      ],
      materials: ['Hand-Chiseled Limestone', 'Brushed Natural Ash', 'Belgian Heavy Linen', 'Hand-Blown Glass'],
      lightingConcept: 'Soft low-level perimeter illumination, floor-wash step lights, and dim-to-warm architectural pendants.'
    },
    execution: {
      milestones: [
        'Phase 1: Conservation heritage approval & stone stabilization',
        'Phase 2: Geothermal underfloor integration below antique flagstones',
        'Phase 3: Custom joinery crafting in our bespoke Cotswold workshop',
        'Phase 4: Soft furnishings, antique curation, and styling'
      ],
      customElements: [
        'Free-standing monolithic granite soaking tub weighing 1.8 tons',
        'Bespoke walk-in dressing pavilion in stained sage oak with brass mesh inserts',
        'Double-sided hearth with hand-forged bronze fireback'
      ],
      structuralModifications: 'Introduced an architectural glass walkway connecting the main house to the newly converted private studio wing.',
      galleryImages: [
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    clientReview: {
      quote: 'Aura Living Studio strikes a rare balance of architectural precision and supreme warmth. The manor has soul again.',
      author: 'Lord & Lady Harrington',
      role: 'Estate Owners',
      rating: 5
    }
  },
  {
    id: 'tokyo-roppongi-suite',
    title: 'Minato Executive Sanctuary',
    category: 'commercial',
    categoryLabel: 'Commercial & Executive',
    location: 'Roppongi, Tokyo',
    roomType: 'Private Executive Boardroom & VIP Lounge',
    sqft: 3400,
    year: 2025,
    duration: '8 Months',
    style: 'Japandi Architectural Zen',
    budgetTier: '$380,000 - $520,000',
    heroImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85',
    thumbnailImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    headline: 'Elevating Corporate Hospitality with Hinoki Woodcraft, Shoji Screens & Horizon Views',
    summary: 'A high-level executive hospitality suite overlooking the Tokyo skyline, fusing Japanese traditional joinery with cutting-edge AV acoustic insulation.',
    designBrief: {
      overview: 'A global venture capital firm commissioned Aura to create an exclusive top-floor summit lounge that honors Japanese craftsmanship while facilitating confidential international negotiations.',
      clientRequirements: [
        'Acoustic rating STC 55 for absolute conversation privacy.',
        'Integration of seamless state-of-the-art teleconferencing behind acoustic slatted timber.',
        'Curated bar lounge for evening private dining.'
      ],
      challenges: [
        'Curved glass perimeter curtain wall requiring custom radius cabinetry.',
        'Strict high-rise Tokyo earthquake safety anchoring for heavy marble fixtures.'
      ]
    },
    conceptAndMoodBoard: {
      philosophy: 'The elegance of restraint: negative space (Ma), natural daylight modulation, and fragrance of natural Hinoki cypress.',
      palette: [
        { name: 'Hinoki Cypress', hex: '#DBC5A4', role: 'Slatted Panels & Tables' },
        { name: 'Kurogane Steel', hex: '#1D2120', role: 'Frames & Light Canopies' },
        { name: 'Washi Cream', hex: '#F4EFE6', role: 'Diffused Partitions' },
        { name: 'Indigo Accent', hex: '#2C3E50', role: 'Textiles' }
      ],
      materials: ['Hinoki Wood', 'Handmade Washi Paper', 'Basalt Black Stone', 'Dark Brushed Gunmetal'],
      lightingConcept: 'Paper-diffused perimeter wash with custom geometric LED backlighting mimicking natural morning sun.'
    },
    execution: {
      milestones: [
        'Phase 1: High-rise acoustic decoupling and structural seismic reinforcement',
        'Phase 2: Custom Hinoki millwork prefabricated by master artisans in Kyoto',
        'Phase 3: Hidden acoustic fabric and smart AV screen calibration',
        'Phase 4: Bonsai living installations and bespoke leather seating'
      ],
      customElements: [
        '22-seat continuous Hinoki live-edge boardroom table with flush hidden power consoles',
        'Curved sliding washi-glass acoustic partitions',
        'Backlit basalt liquor display with chilled travertine storage'
      ],
      structuralModifications: 'Created a central acoustic core allowing panoramic 270-degree skyline views from all meeting suites.',
      galleryImages: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    clientReview: {
      quote: 'Our international guests consistently praise the calming gravitas of our Roppongi suite. Aura Living delivered an unmatched architectural triumph.',
      author: 'Kenji Takahashi',
      role: 'Managing Partner, Horizon Capital Tokyo',
      rating: 5
    }
  },
  {
    id: 'paris-haussmann-e-design',
    title: 'Le Marais Salon & Library',
    category: 'e-design',
    categoryLabel: 'E-Design & Remote Curation',
    location: 'Paris, 3rd Arrondissement',
    roomType: 'Formal Living Room & Library',
    sqft: 1850,
    year: 2025,
    duration: '6 Weeks (Design & Curation)',
    style: 'Contemporary Parisian Chic',
    budgetTier: '$95,000 - $140,000',
    heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
    thumbnailImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    headline: 'Virtual Spatial Architecture for a Historic Haussmannian Apartment',
    summary: 'Delivered through our comprehensive E-Design package: complete 3D photorealistic spatial layouts, AR furniture positioning, trade-discount procurement lists, and contractor schematics.',
    designBrief: {
      overview: 'A remote client in Paris wanted to revitalize their ornate Haussmannian salon with modern sculptural furniture, respecting 19th-century ceiling crown mouldings and herringbone parquet.',
      clientRequirements: [
        'Curate furniture pieces that contrast harmoniously with historical boiserie wall mouldings.',
        'Provide exact spatial layout and 3D walkthrough for local Paris contractors.',
        'Complete procurement shopping cart with trade designer discounts.'
      ],
      challenges: [
        'Designing completely remotely across timezones with millimeter precision.',
        'Balancing heavy classical proportions with airy modern silhouettes.'
      ]
    },
    conceptAndMoodBoard: {
      philosophy: 'Poetic tension between classical European ornamental plaster and 21st-century sculptural curved furniture.',
      palette: [
        { name: 'Chalk White', hex: '#F9F8F6', role: 'Boiserie & Ceilings' },
        { name: 'Warm Terracotta', hex: '#B85D43', role: 'Sculptural Armchairs' },
        { name: 'Smoked Walnut', hex: '#3E352F', role: 'Occasional Tables' },
        { name: 'Brushed Brass', hex: '#C29F62', role: 'Chandeliers & Hardware' }
      ],
      materials: ['Original Point de Hongrie Parquet', 'Italian Bouclé', 'Rosso Levanto Marble', 'Aged Gilt Brass'],
      lightingConcept: 'Sculptural multi-tiered brass chandelier complemented by mobile floor fixtures to preserve ceiling plaster integrity.'
    },
    execution: {
      milestones: [
        'Week 1: LiDAR scan ingestion and 3D architectural digital twin modeling',
        'Week 2: Spatial zoning & AR furniture preview deployment to client',
        'Week 3: Material palette sample kit mailed to Paris address',
        'Week 4: Final 3D renders, VR walkthrough & procurement catalog handoff'
      ],
      customElements: [
        'Custom modular curved sofa configured specifically to the window bay angle',
        'Curated marble cocktail table from Milan Design Week collection',
        'Gallery art arrangement matrix with laser alignment specs'
      ],
      structuralModifications: 'Preserved all original plaster medallions and wall panelling without drilling or permanent alteration.',
      galleryImages: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    clientReview: {
      quote: 'The E-Design experience was effortless. The AR visualization tool allowed us to see every sofa dimension in our living room before placing orders. Extraordinary quality.',
      author: 'Camille & Antoine Laurent',
      role: 'Paris Apartment Owners',
      rating: 5
    }
  },
  {
    id: 'beverly-hills-villa',
    title: 'The Trousdale Architectural Villa',
    category: 'residential',
    categoryLabel: 'Residential Architecture',
    location: 'Beverly Hills, California',
    roomType: 'Indoor-Outdoor Great Room',
    sqft: 8500,
    year: 2025,
    duration: '16 Months',
    style: 'Organic Mid-Century Modernism',
    budgetTier: '$900,000 - $1,400,000',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
    thumbnailImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    headline: 'Dissolving Boundaries Between Interior Luxury and California Horizon',
    summary: 'A breathtaking mid-century estate transformation featuring 40-foot motorized glass pocket doors, terrazzo flooring, and custom walnut architectural ceiling baffles.',
    designBrief: {
      overview: 'Complete interior revamp of a 1964 Trousdale modernist villa, refocusing the entire spatial flow toward panoramic infinity pool and Los Angeles city views.',
      clientRequirements: [
        'Seamless transition between indoor lounge and covered outdoor dining pavilion.',
        'Climate-controlled glass wine cellar displaying 800 vintages as an architectural centerpiece.',
        'Low-profile seating that does not obstruct view lines.'
      ],
      challenges: [
        'UV exposure protection for museum art collections and fine fabrics.',
        'Engineering flush transition terrazzo without threshold seams.'
      ]
    },
    conceptAndMoodBoard: {
      philosophy: 'Warm California light captured through neutral travertine, custom bleached walnut, matte black metal, and sage tones.',
      palette: [
        { name: 'Desert Sand Terrazzo', hex: '#E7DFC6', role: 'Flooring' },
        { name: 'Warm Bleached Walnut', hex: '#A88D70', role: 'Ceiling Baffles' },
        { name: 'Olive Green Wool', hex: '#636B54', role: 'Lounge Seating' },
        { name: 'Matte Charcoal Steel', hex: '#2A2D2B', role: 'Curtain Walls' }
      ],
      materials: ['Custom Aggregate Terrazzo', 'Bleached Walnut Slatting', 'Silk & Mohair Rugs', 'Honed Calacatta'],
      lightingConcept: 'Subtle low-voltage linear grazers illuminating ceiling woodwork, paired with sculptural pendant orbs.'
    },
    execution: {
      milestones: [
        'Phase 1: Seismic structural retrofit and pocket door steel lintel insertion',
        'Phase 2: Continuous monolithic terrazzo pouring and diamond polishing',
        'Phase 3: Wine gallery climate cell construction and joinery install',
        'Phase 4: Custom outdoor/indoor furniture delivery and landscaping coordination'
      ],
      customElements: [
        '40-foot continuous low-profile modular sofa in performance bouclé',
        'Architectural floating fireplace clad in hand-honed Pietra Grey marble',
        'Custom terrazzo outdoor fire table matching interior flooring'
      ],
      structuralModifications: 'Replaced solid masonry exterior walls with motorized glass panels opening the entire 80-foot living facade.',
      galleryImages: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    clientReview: {
      quote: 'Aura Living Studio exceeded every expectation. The way daylight moves across the terrazzo and walnut throughout the day is pure architectural poetry.',
      author: 'David & Sophia Sterling',
      role: 'Homeowners',
      rating: 5
    }
  },
  {
    id: 'boutique-hotel-kyoto',
    title: 'The Kamo River Boutique Hotel',
    category: 'commercial',
    categoryLabel: 'Commercial & Hospitality',
    location: 'Kyoto, Japan',
    roomType: 'Tea Lounge & 18 Guest Suites',
    sqft: 14200,
    year: 2024,
    duration: '22 Months',
    style: 'Modern Ryokan Luxury',
    budgetTier: '$2,200,000+',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=85',
    thumbnailImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
    headline: 'A Modern Sanctuary of Stillness, Sugi Cedar & Water Gardens',
    summary: 'A signature 18-key boutique hotel along the historic Kamo river, translating traditional tea-house ceremonies into a bespoke luxury hospitality destination.',
    designBrief: {
      overview: 'Develop an intimate boutique hotel destination that immerses international luxury travelers in Kyoto sensory tranquility.',
      clientRequirements: [
        'Deep soaking cedar ofuro tubs in every suite overlooking private rock gardens.',
        'Acoustic silence between suites using natural multi-layer earth walls.',
        'Central tea ceremony pavilion seamlessly integrated with the reception lounge.'
      ],
      challenges: [
        'Historic preservation zoning limits within the Gion district buffer.',
        'Balancing traditional untreated wood maintenance with luxury hospitality longevity.'
      ]
    },
    conceptAndMoodBoard: {
      philosophy: 'Wabi-sabi aesthetics: finding profound beauty in organic asymmetry, natural grain, and gentle shadows.',
      palette: [
        { name: 'Sugi Cedar', hex: '#C29871', role: 'Architectural Joinery' },
        { name: 'Kyoto Clay Plaster', hex: '#BFB5A2', role: 'Walls' },
        { name: 'Charred Yakisugi', hex: '#232524', role: 'Exterior Facets' },
        { name: 'Matcha Moss', hex: '#667056', role: 'Accents & Courtyard' }
      ],
      materials: ['Aged Sugi Cedar', 'Hand-applied Juraku Earth Plaster', 'Tatami Reed Mats', 'Local Kyoto Slate'],
      lightingConcept: 'Concealed baseboard lanterns, paper-shaded sconces, and soft garden uplighting creating calm reflection.'
    },
    execution: {
      milestones: [
        'Phase 1: Traditional timber-frame joinery seismic engineering',
        'Phase 2: Master plasterer Juraku wall application across 18 suites',
        'Phase 3: Custom aromatic cedar bath installation & waterproofing',
        'Phase 4: Commissioned ceramic art and custom low furniture staging'
      ],
      customElements: [
        'Individual handmade fragrant Sugi cedar ofuro tubs for all suites',
        'Hand-chiseled slate water cascades in the main entry tea pavilion',
        'Custom low-profile platform beds with integrated charging consoles'
      ],
      structuralModifications: 'Constructed an open-air central courtyard with reflection pool reflecting ancient weeping cherry trees.',
      galleryImages: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    clientReview: {
      quote: 'Aura Living Studio created a haven of timeless peace. Our hotel has achieved a 99% occupancy rate and accolades from global design publications.',
      author: 'Yoko & Hiroshi Tanaka',
      role: 'Proprietors, Kamo Sanctuary Kyoto',
      rating: 5
    }
  }
];
