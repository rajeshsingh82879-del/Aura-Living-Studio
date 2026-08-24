import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onBookConsultation: () => void;
  onLaunchAR: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onBookConsultation,
  onLaunchAR
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'AR Spatial Studio', id: 'ar-studio', isNew: true },
    { label: 'Services & Tiers', id: 'services' },
    { label: 'Studio Philosophy', id: 'about' },
    { label: 'Journal', id: 'journal' },
    { label: 'Ateliers & Inquire', id: 'inquiry-section' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 text-[#1F2421] backdrop-blur-md shadow-md border-b border-[#E5DEC9] py-3.5'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Editorial Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col group cursor-pointer"
          >
            <span className="font-serif tracking-[0.2em] text-xl sm:text-2xl uppercase font-normal leading-tight group-hover:text-[#C36B4E] transition-colors">
              Aura Living Studio
            </span>
            <span
              className={`text-[9px] uppercase tracking-[0.3em] font-light transition-colors ${
                isScrolled ? 'text-[#8C7A6B]' : 'text-[#D8C7B3]'
              }`}
            >
              Interior Architecture & AR Spatial Design
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs tracking-wider uppercase font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative py-1 transition-colors hover:text-[#C36B4E] flex items-center gap-1.5 ${
                  link.isNew
                    ? 'text-[#C36B4E] font-semibold'
                    : isScrolled
                    ? 'text-[#4A4F4C]'
                    : 'text-white/90'
                }`}
              >
                <span>{link.label}</span>
                {link.isNew && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#C36B4E] text-white font-mono lowercase">
                    3d
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onLaunchAR}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 border ${
                isScrolled
                  ? 'border-[#C36B4E] text-[#C36B4E] hover:bg-[#C36B4E]/10'
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C36B4E]" />
              <span>AR Studio</span>
            </button>

            <button
              onClick={onBookConsultation}
              className="px-5 py-2 rounded-xl bg-[#C36B4E] hover:bg-[#A45236] text-white text-xs font-semibold tracking-wider uppercase shadow-md hover:shadow-xl transition-all flex items-center gap-1.5"
            >
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-current"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] text-[#1F2421] border-b border-[#E5DEC9] px-6 py-6 space-y-4 animate-fade-in shadow-2xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left text-sm uppercase tracking-wider py-2 font-medium border-b border-[#EAE4D5] flex items-center justify-between text-[#1F2421] hover:text-[#C36B4E]"
              >
                <span>{link.label}</span>
                {link.isNew && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C36B4E] text-white">
                    AR Active
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onLaunchAR();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl border border-[#C36B4E] text-[#C36B4E] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C36B4E]" />
              Launch AR Spatial Studio
            </button>

            <button
              onClick={() => {
                onBookConsultation();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-[#C36B4E] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
