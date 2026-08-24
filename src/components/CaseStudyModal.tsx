import React, { useEffect } from 'react';
import { X, MapPin, Maximize, Clock, Sparkles, ArrowRight, Quote, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';
import { ProjectCaseStudy } from '../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onInquireSimilar: (project: ProjectCaseStudy) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onInquireSimilar
}) => {
  // Prevent background scroll when modal open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#FAF7F2] text-[#1F2421] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-[#E5DEC9]">
        
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E5DEC9]">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#C36B4E] font-semibold">
              {project.categoryLabel}
            </span>
            <span className="text-[#A89F91]">/</span>
            <span className="text-xs text-[#6E675F] font-serif italic">{project.title}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EAE4D5] text-[#1F2421] transition-colors"
            title="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 md:p-10 space-y-12">
          
          {/* 1. Full-Width Hero Section with Project Metadata */}
          <div className="space-y-6">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden shadow-xl border border-[#E5DEC9]">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10 text-white">
                <span className="text-xs uppercase tracking-widest text-[#C36B4E] font-semibold mb-2">
                  {project.categoryLabel} • {project.year}
                </span>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-normal leading-tight">
                  {project.title}
                </h1>
                <p className="text-sm md:text-base text-white/90 max-w-3xl mt-2 font-light">
                  {project.headline}
                </p>
              </div>
            </div>

            {/* Project Metadata Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl bg-[#F2ECE1] border border-[#E0D7C5]">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#8C7A6B]">Location</div>
                <div className="text-sm font-medium text-[#1F2421] flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C36B4E]" />
                  {project.location}
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#8C7A6B]">Spatial Area</div>
                <div className="text-sm font-medium text-[#1F2421] flex items-center gap-1 mt-1">
                  <Maximize className="w-3.5 h-3.5 text-[#C36B4E]" />
                  {project.sqft.toLocaleString()} sq ft
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#8C7A6B]">Architectural Style</div>
                <div className="text-sm font-medium text-[#1F2421] mt-1 font-serif">
                  {project.style}
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#8C7A6B]">Execution Duration</div>
                <div className="text-sm font-medium text-[#1F2421] flex items-center gap-1 mt-1">
                  <Clock className="w-3.5 h-3.5 text-[#C36B4E]" />
                  {project.duration}
                </div>
              </div>
            </div>
          </div>

          {/* Main Storytelling Layout (Content + Sticky Sidebar) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Storytelling Main Body (8 Cols) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Interactive Before & After Slider */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C36B4E] font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>The Architectural Transformation</span>
                </div>
                <h3 className="text-2xl font-serif font-normal text-[#1F2421]">
                  Before & After Spatial Comparison
                </h3>
                <BeforeAfterSlider
                  beforeImage={project.beforeImage}
                  afterImage={project.afterImage}
                  beforeLabel="Original Space"
                  afterLabel="Completed Architectural Finish"
                />
              </section>

              {/* Section 1: Design Brief & Client Objectives */}
              <section className="space-y-4 border-t border-[#E5DEC9] pt-8">
                <div className="text-xs uppercase tracking-widest text-[#8C7A6B] font-mono">01 // THE INTAKE</div>
                <h3 className="text-2xl font-serif font-normal text-[#1F2421]">Design Brief & Objectives</h3>
                <p className="text-sm leading-relaxed text-[#4A4F4C]">
                  {project.designBrief.overview}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-lg bg-[#FAF4EA] border border-[#E8DFC8]">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-[#1F2421] mb-2">
                      Key Client Demands
                    </h5>
                    <ul className="space-y-1.5 text-xs text-[#525754]">
                      {project.designBrief.clientRequirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C36B4E] flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-[#FAF4EA] border border-[#E8DFC8]">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-[#1F2421] mb-2">
                      Spatial & Heritage Hurdles
                    </h5>
                    <ul className="space-y-1.5 text-xs text-[#525754]">
                      {project.designBrief.challenges.map((ch, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C36B4E] flex-shrink-0 mt-1.5" />
                          <span>{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 2: Concept & Curated Mood Board */}
              <section className="space-y-6 border-t border-[#E5DEC9] pt-8">
                <div className="text-xs uppercase tracking-widest text-[#8C7A6B] font-mono">02 // THE PALETTE</div>
                <h3 className="text-2xl font-serif font-normal text-[#1F2421]">Concept & Material Language</h3>
                <p className="text-sm leading-relaxed text-[#4A4F4C]">
                  {project.conceptAndMoodBoard.philosophy}
                </p>

                {/* Color Palette Swatches */}
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-wider text-[#8C7A6B]">Curated Tonal Palette</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {project.conceptAndMoodBoard.palette.map((p, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-[#F2ECE1] border border-[#E0D7C5] flex flex-col gap-2">
                        <div
                          className="w-full h-8 rounded shadow-inner border border-black/10"
                          style={{ backgroundColor: p.hex }}
                        />
                        <div>
                          <div className="text-xs font-semibold text-[#1F2421]">{p.name}</div>
                          <div className="text-[10px] text-[#8C7A6B] font-mono">{p.hex}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Materials & Lighting */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-[#F2ECE1] border border-[#E0D7C5]">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-[#1F2421] mb-2">
                      Tactile Materials Specified
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {project.conceptAndMoodBoard.materials.map((m, i) => (
                        <span key={i} className="px-2.5 py-1 rounded bg-[#FAF7F2] text-[11px] text-[#4A4F4C] border border-[#DCD3C0]">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-[#F2ECE1] border border-[#E0D7C5]">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-[#1F2421] mb-2">
                      Architectural Lighting Scheme
                    </h5>
                    <p className="text-xs text-[#525754] leading-relaxed">
                      {project.conceptAndMoodBoard.lightingConcept}
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3: Execution & Custom Joinery */}
              <section className="space-y-4 border-t border-[#E5DEC9] pt-8">
                <div className="text-xs uppercase tracking-widest text-[#8C7A6B] font-mono">03 // THE BUILD</div>
                <h3 className="text-2xl font-serif font-normal text-[#1F2421]">Execution & Bespoke Millwork</h3>
                <p className="text-sm text-[#4A4F4C] leading-relaxed">
                  {project.execution.structuralModifications}
                </p>

                <div className="p-4 rounded-lg bg-[#F2ECE1] border border-[#E0D7C5] space-y-2">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-[#1F2421]">
                    Custom Architectural Highlights
                  </h5>
                  <ul className="space-y-1.5 text-xs text-[#525754]">
                    {project.execution.customElements.map((elem, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#C36B4E] flex-shrink-0 mt-0.5" />
                        <span>{elem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Additional Gallery images */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {project.execution.galleryImages.map((img, i) => (
                    <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden border border-[#E0D7C5] shadow-md">
                      <img src={img} alt="Detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 4: Client Review & Verdict */}
              <section className="border-t border-[#E5DEC9] pt-8">
                <div className="p-6 rounded-xl bg-[#222524] text-white space-y-4 shadow-xl">
                  <Quote className="w-8 h-8 text-[#C36B4E] opacity-80" />
                  <p className="text-base sm:text-lg font-serif italic leading-relaxed text-[#FAF7F2]">
                    "{project.clientReview.quote}"
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div>
                      <div className="text-sm font-medium text-white">{project.clientReview.author}</div>
                      <div className="text-xs text-[#A8A49D]">{project.clientReview.role}</div>
                    </div>
                    <div className="flex text-[#C36B4E]">
                      {'★'.repeat(project.clientReview.rating)}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sticky Sidebar CTA Block (4 Cols) */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 p-6 rounded-2xl bg-[#F2ECE1] border border-[#E0D7C5] shadow-xl space-y-6">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#C36B4E] font-semibold">
                    Inquire About This Style
                  </span>
                  <h4 className="text-xl font-serif font-normal text-[#1F2421] mt-1">
                    Envisioning a similar transformation?
                  </h4>
                  <p className="text-xs text-[#6B6358] mt-2 leading-relaxed">
                    Our principal interior architects can craft a tailored spatial concept, 3D AR visualizer model, and bespoke procurement plan for your residence or commercial asset.
                  </p>
                </div>

                <div className="space-y-2 py-3 border-y border-[#DCD3C0] text-xs text-[#4A4F4C]">
                  <div className="flex justify-between">
                    <span className="text-[#8C7A6B]">Target Style:</span>
                    <span className="font-serif font-medium text-[#1F2421]">{project.style}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C7A6B]">Historical Duration:</span>
                    <span className="font-medium text-[#1F2421]">{project.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C7A6B]">Budget Tier:</span>
                    <span className="font-mono text-[#C36B4E] font-medium">{project.budgetTier}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onInquireSimilar(project);
                    onClose();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#C36B4E] hover:bg-[#A45236] text-white font-medium text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group"
                >
                  <span>Inquire About A Similar Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-2 justify-center text-[11px] text-[#8C7A6B]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Strict Non-Disclosure & Privacy Standard</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
