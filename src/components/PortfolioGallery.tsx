import React, { useState } from 'react';
import { Sparkles, ArrowRight, Maximize2, MapPin, SlidersHorizontal, Eye } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { ProjectCaseStudy, ProjectCategory } from '../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface PortfolioGalleryProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeBeforeAfterProject, setActiveBeforeAfterProject] = useState<ProjectCaseStudy>(PORTFOLIO_PROJECTS[0]);

  const filteredProjects =
    selectedCategory === 'all'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);

  const categories: { key: ProjectCategory; label: string; count: number }[] = [
    { key: 'all', label: 'All Works', count: PORTFOLIO_PROJECTS.length },
    {
      key: 'residential',
      label: 'Residential Architecture',
      count: PORTFOLIO_PROJECTS.filter((p) => p.category === 'residential').length
    },
    {
      key: 'commercial',
      label: 'Commercial & Hospitality',
      count: PORTFOLIO_PROJECTS.filter((p) => p.category === 'commercial').length
    },
    {
      key: 'e-design',
      label: 'E-Design & AR Curation',
      count: PORTFOLIO_PROJECTS.filter((p) => p.category === 'e-design').length
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-[#FAF7F2] text-[#1F2421] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C36B4E] font-semibold flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Portfolio & Architectural Archives</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1F2421]">
              Curated Spatial Transformations
            </h2>
            <p className="text-sm text-[#6E675F] max-w-2xl mt-2 font-light">
              Explore bespoke residential sanctuaries, commercial flagships, and virtual e-design projects sculpted with tactile materiality.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-[#F2ECE1] p-1.5 rounded-full border border-[#E5DEC9]">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-[#1F2421] text-white shadow-md'
                    : 'text-[#6E675F] hover:text-[#1F2421]'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Featured Interactive Before/After Showcase Section */}
        <div className="mb-20 p-6 md:p-10 rounded-3xl bg-[#F2ECE1] border border-[#E0D7C5] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info & Selector (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C36B4E] font-semibold">
                  Interactive Showcase
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#1F2421] mt-1">
                  Before & After Transformations
                </h3>
                <p className="text-xs sm:text-sm text-[#6E675F] mt-2 leading-relaxed font-light">
                  Slide across to reveal how structural demolition, lime plaster, monolithic stone, and architectural lighting rewrite spatial energy.
                </p>
              </div>

              {/* Selector Tabs for Before/After */}
              <div className="space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-[#8C7A6B]">Select Case Study:</div>
                <div className="flex flex-col gap-2">
                  {PORTFOLIO_PROJECTS.slice(0, 3).map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => setActiveBeforeAfterProject(proj)}
                      className={`text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                        activeBeforeAfterProject.id === proj.id
                          ? 'bg-[#FAF7F2] border-[#C36B4E] text-[#1F2421] shadow-md ring-1 ring-[#C36B4E]'
                          : 'bg-[#EAE4D5]/60 border-transparent text-[#6E675F] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div>
                        <div className="font-serif font-medium text-sm text-[#1F2421]">{proj.title}</div>
                        <div className="text-[10px] text-[#8C7A6B]">{proj.location} • {proj.roomType}</div>
                      </div>
                      <ArrowRight className={`w-3.5 h-3.5 ${activeBeforeAfterProject.id === proj.id ? 'text-[#C36B4E]' : 'opacity-0'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectProject(activeBeforeAfterProject)}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C36B4E] hover:text-[#A45236] transition-colors"
              >
                <span>Read Full Case Study Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Interactive Slider (7 Cols) */}
            <div className="lg:col-span-7">
              <BeforeAfterSlider
                beforeImage={activeBeforeAfterProject.beforeImage}
                afterImage={activeBeforeAfterProject.afterImage}
                beforeLabel="Original Blueprint"
                afterLabel="Aura Living Architecture"
              />
            </div>
          </div>
        </div>

        {/* Masonry Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E5DEC9] hover:border-[#C36B4E]/60 transition-all duration-300 shadow-sm hover:shadow-2xl flex flex-col"
            >
              {/* Image Container with Hover Zoom & Metadata Badge */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE4D5]">
                <img
                  src={project.thumbnailImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Category Pill Tag */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1F2421]/80 backdrop-blur-md text-white text-[10px] tracking-wider uppercase font-medium border border-white/10">
                  {project.categoryLabel}
                </div>

                {/* Quick View Button Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-white text-[#1F2421] text-xs font-medium flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-3.5 h-3.5 text-[#C36B4E]" />
                    Explore Case Study
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8C7A6B] mb-1.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#C36B4E]" />
                      {project.location}
                    </span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="text-xl font-serif font-normal text-[#1F2421] group-hover:text-[#C36B4E] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#6E675F] mt-2 line-clamp-2 leading-relaxed font-light">
                    {project.summary}
                  </p>
                </div>

                {/* Footer Details */}
                <div className="pt-4 border-t border-[#EAE4D5] flex items-center justify-between text-xs text-[#8C7A6B]">
                  <span className="font-serif italic">{project.roomType}</span>
                  <span className="font-medium text-[#1F2421]">{project.sqft.toLocaleString()} sq ft</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
