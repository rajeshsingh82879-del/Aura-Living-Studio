import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Mail, Instagram, Linkedin, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#141617] text-white pt-20 pb-28 lg:pb-16 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter / Private List Signup */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#1C1E1F] border border-white/10 mb-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs uppercase tracking-widest text-[#C36B4E] font-semibold flex items-center justify-center lg:justify-start gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Private Architectural Dispatch</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white">
              Curated Spatial Intelligence & Trade Previews
            </h3>
            <p className="text-xs text-[#A8A49D] mt-2 font-light">
              Receive quarterly monographs on rare stone quarries, bespoke joinery case studies, and invitation-only atelier salons.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your private email..."
              className="px-5 py-3.5 rounded-xl bg-black/50 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C36B4E] min-w-[280px]"
            />
            <button className="px-6 py-3.5 rounded-xl bg-[#C36B4E] hover:bg-[#A45236] text-white text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shadow-lg">
              Join Dispatch
            </button>
          </div>
        </div>

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Col (2 cols wide) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="font-serif text-2xl uppercase tracking-widest text-white">
              Aura Living Studio
            </div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#C36B4E]">
              Interior Architecture & Spatial Curation
            </div>
            <p className="text-xs text-[#8C8880] max-w-sm leading-relaxed font-light">
              Architecting timeless interior experiences for high-net-worth residential estates, luxury commercial sanctuaries, and remote global clients through tactile warm-minimalism and augmented reality technology.
            </p>
            <div className="flex items-center gap-4 text-[#A8A49D] pt-2">
              <a href="#instagram" className="hover:text-white transition-colors" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#linkedin" className="hover:text-white transition-colors" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#press" className="hover:text-white transition-colors" title="Global Press">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">Exploration</h4>
            <ul className="space-y-2 text-xs text-[#8C8880]">
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-[#C36B4E] transition-colors">
                  Portfolio Archives
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ar-studio')} className="hover:text-[#C36B4E] transition-colors flex items-center gap-1.5">
                  <span>AR Spatial Studio</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-[#C36B4E] text-white">3D</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-[#C36B4E] transition-colors">
                  Service Tiers & Pricing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#C36B4E] transition-colors">
                  Studio Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-[#C36B4E] transition-colors">
                  The Aura Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Global Ateliers */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">Ateliers</h4>
            <ul className="space-y-2 text-xs text-[#8C8880]">
              <li>New York — SoHo Atelier</li>
              <li>London — Mayfair Studio</li>
              <li>Paris — Le Marais Gallery</li>
              <li>Tokyo — Minato Sanctuary</li>
            </ul>
          </div>

          {/* Legal & Standards */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">Standards</h4>
            <ul className="space-y-2 text-xs text-[#8C8880]">
              <li>Client NDA Protection</li>
              <li>AIA & RIBA Certified</li>
              <li>Sustainable Sourcing Charter</li>
              <li>Trade Partner Portal</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6C6861] gap-4">
          <div>
            © {new Date().getFullYear()} Aura Living Studio LLC. All rights reserved. Architected for timeless distinction.
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Strict Client Privacy Guarantee</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
