import React, { useState } from 'react';
import { ArrowRight, Clock, BookOpen, Sparkles, X } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/journalData';
import { JournalArticle } from '../types';

export const JournalSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  return (
    <section id="journal" className="py-24 bg-[#FAF7F2] text-[#1F2421] relative border-t border-[#EAE4D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C36B4E] font-semibold flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Aura Journal • Styling Insights</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1F2421]">
              Essays on Materiality & Space
            </h2>
            <p className="text-sm text-[#6E675F] max-w-2xl mt-2 font-light">
              Explorations into tactile stones, circadian lighting architecture, and the philosophy of negative space.
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="cursor-pointer group rounded-2xl overflow-hidden bg-[#F2ECE1] border border-[#E0D7C5] hover:border-[#C36B4E]/60 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE4D5]">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#1F2421]/80 backdrop-blur-md text-white text-[10px] uppercase tracking-wider">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-[#8C7A6B]">
                    <Clock className="w-3 h-3 text-[#C36B4E]" />
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  <h3 className="text-xl font-serif font-normal text-[#1F2421] group-hover:text-[#C36B4E] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#6E675F] line-clamp-3 leading-relaxed font-light">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#E5DEC9] text-xs text-[#C36B4E] font-medium">
                <span>Read Full Essay</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>

        {/* Modal for Article Reading */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-2xl bg-[#FAF7F2] text-[#1F2421] rounded-2xl shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto border border-[#E5DEC9]">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#EAE4D5] text-[#1F2421] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#C36B4E] font-semibold">
                    {selectedArticle.category} • {selectedArticle.date}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-[#1F2421] mt-1 leading-snug">
                    {selectedArticle.title}
                  </h2>
                  <div className="text-xs text-[#8C7A6B] mt-2 font-light">
                    By {selectedArticle.author}, {selectedArticle.authorRole}
                  </div>
                </div>

                <div className="aspect-[16/9] rounded-xl overflow-hidden border border-[#E5DEC9]">
                  <img
                    src={selectedArticle.coverImage}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4 text-sm text-[#4A4F4C] leading-relaxed">
                  {selectedArticle.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
