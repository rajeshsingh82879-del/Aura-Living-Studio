import React from 'react';
import { Layers, Sparkles, Briefcase, Send, Home } from 'lucide-react';

interface MobileBottomNavProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onNavigate }) => {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E5DEC9] px-4 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-4 gap-1">
        {/* Work (Portfolio) */}
        <button
          onClick={() => onNavigate('portfolio')}
          className="flex flex-col items-center justify-center py-1 text-[#6E675F] hover:text-[#C36B4E] transition-colors"
        >
          <Briefcase className="w-4 h-4" />
          <span className="text-[10px] tracking-wider uppercase font-medium mt-1">Work</span>
        </button>

        {/* Services */}
        <button
          onClick={() => onNavigate('services')}
          className="flex flex-col items-center justify-center py-1 text-[#6E675F] hover:text-[#C36B4E] transition-colors"
        >
          <Layers className="w-4 h-4" />
          <span className="text-[10px] tracking-wider uppercase font-medium mt-1">Services</span>
        </button>

        {/* AR Studio */}
        <button
          onClick={() => onNavigate('ar-studio')}
          className="flex flex-col items-center justify-center py-1 text-[#C36B4E] font-semibold transition-colors relative"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#C36B4E] animate-ping" />
          </div>
          <span className="text-[10px] tracking-wider uppercase font-medium mt-1 text-[#C36B4E]">AR Studio</span>
        </button>

        {/* Inquire */}
        <button
          onClick={() => onNavigate('inquiry-section')}
          className="flex flex-col items-center justify-center py-1 text-[#1F2421] font-semibold transition-colors"
        >
          <Send className="w-4 h-4 text-[#1F2421]" />
          <span className="text-[10px] tracking-wider uppercase font-medium mt-1">Inquire</span>
        </button>
      </div>
    </div>
  );
};
