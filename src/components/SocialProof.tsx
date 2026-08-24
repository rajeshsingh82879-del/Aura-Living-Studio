import React from 'react';
import { Star, ShieldCheck, Quote, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS_DATA, PRESS_MENTIONS, GOOGLE_REVIEWS_SUMMARY } from '../data/testimonialsData';

export const SocialProof: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAF7F2] text-[#1F2421] relative overflow-hidden border-t border-[#EAE4D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Press Badges Bar */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C7A6B] font-mono">
              Editorial Recognition & Accolades
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
            {PRESS_MENTIONS.map((press, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#F2ECE1] border border-[#E0D7C5] hover:border-[#C36B4E]/50 transition-all flex flex-col justify-between h-36 group shadow-sm hover:shadow-md"
              >
                <div className="font-serif text-lg text-[#1F2421] font-semibold group-hover:text-[#C36B4E] transition-colors">
                  {press.name}
                </div>
                <p className="text-[11px] text-[#6E675F] line-clamp-3 italic leading-relaxed">
                  "{press.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C36B4E] font-semibold flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Patron Reviews</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1F2421]">
              Trusted by Discerning Clients
            </h2>
            <p className="text-sm text-[#6E675F] max-w-2xl mt-2 font-light">
              From historic Manhattan lofts to Kyoto sanctuaries and Cotswolds estates.
            </p>
          </div>

          {/* Google Review Badge */}
          <div className="flex items-center gap-4 bg-[#F2ECE1] border border-[#E0D7C5] p-4 rounded-2xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] flex items-center justify-center font-bold text-lg text-[#1F2421] shadow-inner font-serif">
              G
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#C36B4E]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C36B4E]" />
                ))}
                <span className="text-xs font-bold text-[#1F2421] ml-1.5">{GOOGLE_REVIEWS_SUMMARY.averageRating} / 5.0</span>
              </div>
              <div className="text-[11px] text-[#8C7A6B] mt-0.5">
                Based on {GOOGLE_REVIEWS_SUMMARY.reviewCount} verified Google reviews
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-3xl bg-[#F2ECE1] border border-[#E0D7C5] flex flex-col justify-between shadow-lg hover:shadow-xl transition-all relative group"
            >
              <div>
                {/* Rating & Project Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#C36B4E]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C36B4E]" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C7A6B] bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#E5DEC9]">
                    {t.propertyType}
                  </span>
                </div>

                <Quote className="w-6 h-6 text-[#C36B4E]/60 mb-2" />

                <p className="text-sm font-serif text-[#1F2421] leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-[#E0D7C5]">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-[#1F2421] flex items-center gap-1.5">
                    {t.author}
                    {t.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" title="Verified Client" />
                    )}
                  </div>
                  <div className="text-xs text-[#8C7A6B]">
                    {t.title} • {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
