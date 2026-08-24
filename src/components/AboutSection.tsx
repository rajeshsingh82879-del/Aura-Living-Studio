import React from 'react';
import { Compass, Sparkles, Award, MapPin, Feather, Layers, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const PILLARS = [
    {
      title: 'Monolithic Material Honesty',
      desc: 'We eschew faux finishes and composite veneers in favor of un-filled Roman travertine, solid European oak, hand-applied lime plasters, and solid unlacquered brass that ages gracefully over generations.'
    },
    {
      title: 'Negative Space & Spatial Restraint',
      desc: 'True luxury lies in the serenity of subtraction. We choreograph minimum 42-inch circulation corridors and generous radial sightlines so architecture can breathe.'
    },
    {
      title: 'Immersive Spatial Technology',
      desc: 'By integrating WebGL photorealism and augmented reality layout mapping, we bridge the gap between abstract architectural drawings and human emotional connection.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#FAF7F2] text-[#1F2421] relative overflow-hidden border-t border-[#EAE4D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Imagery (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-[#E0D7C5]">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
                alt="Aura Atelier"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 text-white">
                <div>
                  <div className="font-serif text-lg">Seraphina Vance & David K. Aris</div>
                  <div className="text-xs text-[#E5DEC9] uppercase tracking-wider">Founding Partners & Principal Architects</div>
                </div>
              </div>
            </div>

            {/* Overlapping Detail Badge */}
            <div className="absolute -bottom-6 -right-6 p-4 rounded-2xl bg-[#222524] text-white shadow-2xl border border-white/10 hidden sm:block max-w-xs">
              <div className="text-xs font-serif italic text-[#D8C7B3]">
                "Architecture is the art of sculpting light, silence, and human memory."
              </div>
            </div>
          </div>

          {/* Right Editorial Text (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#C36B4E] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Philosophy & Lineage</span>
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1F2421] leading-tight">
              An Authoritative Voice in High-End Interior Architecture
            </h2>

            <p className="text-sm text-[#5C554E] leading-relaxed font-light">
              Founded on the belief that spaces exert a profound psychological influence on human well-being, Aura Living Studio blends rigorous classical proportions with tactile warm-minimalism.
            </p>

            <p className="text-sm text-[#5C554E] leading-relaxed font-light">
              With ateliers in New York, London, Paris, and Tokyo, our studio serves high-net-worth individuals, boutique hospitality visionaries, and global design enthusiasts seeking bespoke spatial transformation.
            </p>

            {/* 3 Core Pillars */}
            <div className="space-y-4 pt-4">
              {PILLARS.map((p, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#F2ECE1] border border-[#E0D7C5] space-y-1">
                  <h4 className="font-serif text-base font-medium text-[#1F2421] flex items-center gap-2">
                    <span className="font-mono text-xs text-[#C36B4E]">0{i + 1}.</span>
                    {p.title}
                  </h4>
                  <p className="text-xs text-[#6E675F] leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
