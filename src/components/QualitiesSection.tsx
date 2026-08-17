import React from 'react';
import { QualityItem } from '../types';
import { Sparkles, Sun, Moon, Heart, Star, LucideIcon } from 'lucide-react';
import { audio } from '../utils/audio';

interface QualitiesSectionProps {
  qualities: QualityItem[];
}

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Sun,
  Moon,
  Heart,
  Star,
};

export const QualitiesSection: React.FC<QualitiesSectionProps> = ({ qualities }) => {
  return (
    <section className="py-16 px-6 max-w-4xl mx-auto relative">
      <div className="text-center mb-12">
        <span className="text-sm font-hand text-purple-700 tracking-wider inline-block mb-1">
          ce qui te rend unique
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 tracking-tight">
          Un peu discrète, mais tellement lumineuse
        </h2>
        <p className="text-stone-600 text-sm max-w-md mx-auto mt-2">
          Ces petites choses qui font tout ton charme et que j'admire chez toi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {qualities.map((item, index) => {
          const IconComp = iconMap[item.iconName] || Sparkles;
          return (
            <div
              key={item.id || index}
              onMouseEnter={() => audio.playNote(400 + index * 60, 0.4, 0.02)}
              className="group bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-7 border border-purple-100/70 hover:border-rose-300 paper-shadow transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg relative overflow-hidden"
            >
              {/* Subtle top color highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-200 via-rose-300 to-amber-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-start justify-between mb-4">
                <span className="font-serif italic font-medium text-rose-500 text-lg">
                  {item.roman}
                </span>
                <div className="w-9 h-9 rounded-2xl bg-rose-50 border border-rose-100/80 flex items-center justify-center text-rose-500 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
                  <IconComp className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-lg font-serif font-semibold text-stone-800 mb-2 group-hover:text-rose-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
