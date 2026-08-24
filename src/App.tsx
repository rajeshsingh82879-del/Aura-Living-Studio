/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioGallery } from './components/PortfolioGallery';
import { ARSpatialStudio } from './components/ARSpatialStudio';
import { ServicesSection } from './components/ServicesSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { InquirySection } from './components/InquirySection';
import { SocialProof } from './components/SocialProof';
import { AboutSection } from './components/AboutSection';
import { JournalSection } from './components/JournalSection';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ProjectCaseStudy, ServiceTier, PlacedFurniture } from './types';

export default function App() {
  // Modal state
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectCaseStudy | null>(null);

  // Inquiry prefill states
  const [transferredLayout, setTransferredLayout] = useState<{
    items: PlacedFurniture[];
    roomName: string;
    totalEstimate: number;
  } | null>(null);

  const [selectedServiceTierId, setSelectedServiceTierId] = useState<string | null>(null);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string | null>(null);

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCaseStudy = (project: ProjectCaseStudy) => {
    setSelectedCaseStudy(project);
  };

  const handleInquireFromCaseStudy = (project: ProjectCaseStudy) => {
    setSelectedProjectTitle(project.title);
    scrollToSection('inquiry-section');
  };

  const handleSelectServiceTier = (tier: ServiceTier) => {
    setSelectedServiceTierId(tier.id);
    scrollToSection('inquiry-section');
  };

  const handleTransferLayoutToInquiry = (layoutData: {
    items: PlacedFurniture[];
    roomName: string;
    totalEstimate: number;
  }) => {
    setTransferredLayout(layoutData);
    scrollToSection('inquiry-section');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F2421] selection:bg-[#C36B4E] selection:text-white font-sans">
      
      {/* 1. Header Navigation */}
      <Navbar
        onNavigate={scrollToSection}
        onBookConsultation={() => scrollToSection('inquiry-section')}
        onLaunchAR={() => scrollToSection('ar-studio')}
      />

      {/* 2. Hero Section */}
      <Hero
        onExplorePortfolio={() => scrollToSection('portfolio')}
        onBookConsultation={() => scrollToSection('inquiry-section')}
        onLaunchARStudio={() => scrollToSection('ar-studio')}
      />

      {/* 3. Filterable Portfolio Gallery & Before/After Comparison */}
      <PortfolioGallery onSelectProject={handleOpenCaseStudy} />

      {/* 4. Augmented Reality & 3D Spatial Studio Visualizer */}
      <ARSpatialStudio onTransferLayoutToInquiry={handleTransferLayoutToInquiry} />

      {/* 5. Services & Step-by-Step Process Roadmap */}
      <ServicesSection onSelectTier={handleSelectServiceTier} />

      {/* 6. Social Proof: Testimonials, Google Reviews, Press Accolades */}
      <SocialProof />

      {/* 7. Studio Philosophy & Editorial About */}
      <AboutSection />

      {/* 8. The Aura Journal & Styling Insights */}
      <JournalSection />

      {/* 9. High-Converting Multi-Step Inquiry Form & Atelier Hub */}
      <InquirySection
        initialLayoutData={transferredLayout}
        initialServiceTierId={selectedServiceTierId}
        initialProjectTitle={selectedProjectTitle}
      />

      {/* 10. Studio Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* 11. Mobile Sticky Bottom Navigation (PRD requirement) */}
      <MobileBottomNav onNavigate={scrollToSection} />

      {/* 12. Full Project Case Study Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onInquireSimilar={handleInquireFromCaseStudy}
      />

    </div>
  );
}
