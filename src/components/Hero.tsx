import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Compass, ShieldCheck, Star } from 'lucide-react';

interface HeroProps {
  onExplorePortfolio: () => void;
  onBookConsultation: () => void;
  onLaunchARStudio: () => void;
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    title: 'The Tribeca Cast-Iron Loft',
    subtitle: 'New York • Residential Architecture',
    tagline: 'Monolithic Travertine & Natural Daylight'
  },
  {
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85',
    title: 'The Cotswolds Estate Retreat',
    subtitle: 'Gloucestershire • Heritage Sanctuary',
    tagline: 'Nordic Warmth & Chiseled Limestone'
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=85',
    title: 'Minato Executive Sanctuary',
    subtitle: 'Tokyo • Commercial & Hospitality',
    tagline: 'Hinoki Woodcraft & Horizon Skyline'
  },
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
    title: 'The Trousdale Architectural Villa',
    subtitle: 'Beverly Hills • Modernist Great Room',
    tagline: 'Indoor-Outdoor Terrazzo & Slatting'
  }
];

export const Hero: React.FC<HeroProps> = ({
  onExplorePortfolio,
  onBookConsultation,
  onLaunchARStudio
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance hero slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#141617] text-white">
      {/* Background Slideshow with Smooth Crossfade */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ transitionProperty: 'opacity, transform', transitionDuration: '1.2s' }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover filter brightness-[0.65] contrast-[1.05]"
          />
          {/* Subtle vignette and gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141617] via-black/30 to-black/50" />
        </div>
      ))}

      {/* Floating AR Studio Pill in Top Hero */}
      <div className="absolute top-28 sm:top-24 z-20 flex justify-center w-full px-4">
        <button
          onClick={onLaunchARStudio}
          className="group px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs flex items-center gap-2 shadow-2xl transition-all hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C36B4E] animate-pulse" />
          <span className="font-light tracking-wide">
            New: <strong className="font-medium text-white">Augmented Reality Spatial Studio</strong>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#C36B4E] text-white font-mono uppercase">
            3D & AR
          </span>
        </button>
      </div>

      {/* Center Editorial Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 flex flex-col items-center">
        
        {/* Brand Tagline */}
        <div className="inline-flex items-center gap-2 text-xs md:text-sm font-mono uppercase tracking-[0.25em] text-[#D8C7B3] mb-4">
          <span>Bespoke Interior Architecture</span>
          <span>•</span>
          <span>Spatial Curation</span>
        </div>

        {/* PRD Specified Statement Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight text-white max-w-4xl leading-[1.08] mb-6">
          Architecting Timeless <span className="italic font-light text-[#E8DFC8]">Interior Experiences</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-[#D2CBC0] font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          Crafting turnkey architectural sanctuaries for distinguished residences, high-end commercial spaces, and global remote e-design clients.
        </p>

        {/* Dual Call to Action (Primary & Secondary) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExplorePortfolio}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#C36B4E] hover:bg-[#A45236] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group"
          >
            <span>Explore Portfolio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onBookConsultation}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold tracking-wider uppercase border border-white/30 transition-all flex items-center justify-center gap-2"
          >
            <span>Book Consultation</span>
          </button>
        </div>

        {/* Slide Location Indicator */}
        <div className="mt-12 text-xs text-[#A8A49D] font-light flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
          <Compass className="w-3.5 h-3.5 text-[#C36B4E]" />
          <span>Currently Showcasing:</span>
          <span className="text-white font-medium">{HERO_SLIDES[currentSlide].title}</span>
          <span className="text-[#8C8880]">({HERO_SLIDES[currentSlide].subtitle})</span>
        </div>
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-colors"
        title="Previous Project"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-colors"
        title="Next Project"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Metrics Bar */}
      <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-[#141617] via-[#141617]/90 to-transparent pt-6 pb-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-white/10">
            <div className="px-2">
              <div className="text-xl sm:text-2xl font-serif text-white">120+</div>
              <div className="text-[11px] text-[#A8A49D] uppercase tracking-wider mt-0.5">Estates Transformed</div>
            </div>
            <div className="px-2">
              <div className="text-xl sm:text-2xl font-serif text-white">$85M+</div>
              <div className="text-[11px] text-[#A8A49D] uppercase tracking-wider mt-0.5">Spatial Assets Realized</div>
            </div>
            <div className="px-2">
              <div className="text-xl sm:text-2xl font-serif text-white flex items-center justify-center gap-1">
                <span>5.0</span>
                <Star className="w-4 h-4 fill-[#C36B4E] text-[#C36B4E]" />
              </div>
              <div className="text-[11px] text-[#A8A49D] uppercase tracking-wider mt-0.5">Verified Client Rating</div>
            </div>
            <div className="px-2">
              <div className="text-xl sm:text-2xl font-serif text-white">4 Global</div>
              <div className="text-[11px] text-[#A8A49D] uppercase tracking-wider mt-0.5">Design Ateliers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
