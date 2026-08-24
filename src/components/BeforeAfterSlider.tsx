import React, { useState, useRef, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  subtitle?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Original Structure (Before)',
  afterLabel = 'Aura Architectural Transformation (After)',
  title,
  subtitle
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(position);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <div className="mb-4 text-center md:text-left">
          {title && <h4 className="text-xl font-serif font-medium text-[#1F2421]">{title}</h4>}
          {subtitle && <p className="text-xs tracking-wider uppercase text-[#8C7A6B] mt-1">{subtitle}</p>}
        </div>
      )}

      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden select-none cursor-ew-resize rounded-sm shadow-2xl border border-[#E5DEC9]"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Full background) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover filter brightness-90 saturate-75 max-w-none"
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              height: '100%'
            }}
          />
        </div>

        {/* Divider line & handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none shadow-[0_0_12px_rgba(0,0,0,0.5)] z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FAF7F2] text-[#1F2421] shadow-xl border-2 border-[#C36B4E] flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-105 transition-transform">
            <div className="flex items-center space-x-0.5 text-xs font-bold text-[#C36B4E]">
              <span>‹</span>
              <span>›</span>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-sm bg-[#1F2421]/80 backdrop-blur-md text-white text-[11px] font-sans tracking-wider uppercase border border-white/10">
          {beforeLabel}
        </div>
        <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-sm bg-[#C36B4E]/90 backdrop-blur-md text-white text-[11px] font-sans tracking-wider uppercase border border-white/20 flex items-center gap-1.5 shadow-lg">
          <Sparkles className="w-3 h-3 text-[#FAF7F2]" />
          {afterLabel}
        </div>

        {/* Bottom hint pill */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/80 text-[10px] tracking-widest uppercase pointer-events-none">
          Drag slider to reveal transformation
        </div>
      </div>
    </div>
  );
};
