import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, HelpCircle, Layers, Calendar, ChevronRight } from 'lucide-react';
import { SERVICE_TIERS, DESIGN_PROCESS_STEPS } from '../data/servicesData';
import { ServiceTier } from '../types';

interface ServicesSectionProps {
  onSelectTier: (tier: ServiceTier) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectTier }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="services" className="py-24 bg-[#FAF7F2] text-[#1F2421] relative border-t border-[#EAE4D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C36B4E] font-semibold flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Service Architecture</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1F2421]">
            Curated Service Tiers
          </h2>
          <p className="text-sm text-[#6E675F] mt-3 font-light leading-relaxed">
            From comprehensive turnkey estate renovations to bespoke virtual e-design spatial planning with AR previews.
          </p>
        </div>

        {/* 3-Tier Clean Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {SERVICE_TIERS.map((tier) => {
            const isFeatured = tier.featured;
            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'bg-[#222524] text-white shadow-2xl scale-100 lg:-translate-y-2 border-2 border-[#C36B4E]'
                    : 'bg-[#F2ECE1] text-[#1F2421] border border-[#E0D7C5] shadow-lg hover:shadow-xl'
                }`}
              >
                {/* Featured Badge */}
                {tier.badge && (
                  <div
                    className={`absolute -top-3.5 left-8 px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase shadow-md ${
                      isFeatured
                        ? 'bg-[#C36B4E] text-white'
                        : 'bg-[#1F2421] text-white'
                    }`}
                  >
                    {tier.badge}
                  </div>
                )}

                {/* Card Header */}
                <div>
                  <h3 className={`text-2xl font-serif font-normal ${isFeatured ? 'text-white' : 'text-[#1F2421]'}`}>
                    {tier.name}
                  </h3>

                  <p className={`text-xs mt-2 font-light leading-relaxed ${isFeatured ? 'text-[#C5BDB2]' : 'text-[#6E675F]'}`}>
                    {tier.tagline}
                  </p>

                  {/* Pricing Box */}
                  <div className={`mt-6 p-4 rounded-2xl ${isFeatured ? 'bg-white/5 border border-white/10' : 'bg-[#FAF7F2] border border-[#E5DEC9]'}`}>
                    <div className="text-[11px] uppercase tracking-wider text-[#8C7A6B]">Transparent Investment</div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className={`text-3xl font-serif font-normal ${isFeatured ? 'text-white' : 'text-[#1F2421]'}`}>
                        {tier.startingPrice}
                      </span>
                      <span className={`text-xs ${isFeatured ? 'text-[#A8A49D]' : 'text-[#8C7A6B]'}`}>
                        {tier.priceNote}
                      </span>
                    </div>
                    <div className={`text-[11px] mt-2 flex items-center gap-1.5 ${isFeatured ? 'text-[#C36B4E]' : 'text-[#C36B4E]'}`}>
                      <span>Typical Duration: {tier.turnaround}</span>
                    </div>
                  </div>

                  {/* Deliverables List */}
                  <div className="mt-8 space-y-3">
                    <div className={`text-xs font-semibold uppercase tracking-wider ${isFeatured ? 'text-[#D8C7B3]' : 'text-[#8C7A6B]'}`}>
                      Included Deliverables:
                    </div>
                    <ul className="space-y-2.5 text-xs leading-relaxed">
                      {tier.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#C36B4E] flex-shrink-0 mt-0.5" />
                          <span className={isFeatured ? 'text-[#EAE5DC]' : 'text-[#4A4F4C]'}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Footer */}
                <div className="mt-10 pt-6 border-t border-black/10 dark:border-white/10 space-y-3">
                  <div className={`text-[11px] ${isFeatured ? 'text-[#A8A49D]' : 'text-[#8C7A6B]'}`}>
                    <strong>Best Suited For:</strong> {tier.idealFor}
                  </div>

                  <button
                    onClick={() => onSelectTier(tier)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 ${
                      isFeatured
                        ? 'bg-[#C36B4E] hover:bg-[#A45236] text-white shadow-xl hover:shadow-2xl'
                        : 'bg-[#1F2421] hover:bg-[#343A37] text-white'
                    }`}
                  >
                    <span>Inquire About This Tier</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step-by-Step Visual Process Roadmap (Discovery -> Concept -> Execution) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F2ECE1] border border-[#E0D7C5] shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#C36B4E] font-semibold">
              Methodology & Precision
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#1F2421] mt-1">
              Step-by-Step Architectural Roadmap
            </h3>
            <p className="text-xs sm:text-sm text-[#6E675F] mt-2 font-light">
              How our design ateliers transition from raw spatial acoustics to 3D augmented visualization and turnkey champagne reveal.
            </p>
          </div>

          {/* Process Navigation Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DESIGN_PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  activeStep === idx
                    ? 'bg-[#FAF7F2] border-[#C36B4E] shadow-lg ring-1 ring-[#C36B4E]'
                    : 'bg-[#EAE4D5]/60 border-transparent hover:bg-[#FAF7F2]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-2xl font-bold text-[#C36B4E]">{step.number}</span>
                    <span className="text-[11px] uppercase tracking-wider text-[#8C7A6B] bg-[#F2ECE1] px-2.5 py-1 rounded-full">
                      {step.duration}
                    </span>
                  </div>

                  <h4 className="text-lg font-serif font-normal text-[#1F2421]">
                    {step.phase}
                  </h4>
                  <div className="text-xs font-serif italic text-[#C36B4E] mt-0.5">
                    {step.subtitle}
                  </div>

                  <p className="text-xs text-[#5C554E] mt-3 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E0D7C5] text-[11px] text-[#8C7A6B]">
                  <strong className="text-[#1F2421]">Key Deliverable:</strong> {step.deliverable}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
