import React, { useState } from 'react';
import { audio } from '../utils/audio';
import { Heart, Sparkles, Feather } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LetterSectionProps {
  title: string;
  paragraphs: string[];
  recipientName: string;
  senderName: string;
}

export const LetterSection: React.FC<LetterSectionProps> = ({
  title,
  paragraphs,
  recipientName,
  senderName,
}) => {
  const [isUnsealed, setIsUnsealed] = useState(false);

  const handleUnseal = () => {
    if (!isUnsealed) {
      audio.playEnvelopeOpen();
      setIsUnsealed(true);
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FFB7C5', '#FFD1DC', '#FFC857', '#C8B6FF'],
      });
    }
  };

  return (
    <section className="py-16 px-6 max-w-3xl mx-auto relative">
      <div className="text-center mb-10">
        <span className="text-sm font-hand text-purple-700 tracking-wider inline-block mb-1">
          mots choisis
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 tracking-tight">
          La Lettre d'Anniversaire
        </h2>
        <p className="text-stone-600 text-sm max-w-md mx-auto mt-2">
          Quelques lignes sincères écrites spécialement pour toi.
        </p>
      </div>

      {/* Parchment Letter Container */}
      <div className="relative bg-[#FFFDF9] rounded-3xl p-7 sm:p-12 paper-shadow border border-amber-200/90 shadow-xl overflow-hidden">
        {/* Decorative Top Stamp Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-purple-300 via-rose-400 to-amber-300" />

        {/* Unsealed or Sealed Content */}
        {!isUnsealed ? (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500 mb-4 animate-float-slow">
              <Feather className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-semibold text-stone-800 mb-2">
              Une lettre scellée pour {recipientName}
            </h3>
            <p className="text-stone-500 text-sm max-w-sm mb-8">
              Cette lettre a été écrite avec attention pour ton jour d'anniversaire.
            </p>

            {/* Interactive Wax Seal */}
            <button
              onClick={handleUnseal}
              className="group relative flex flex-col items-center focus:outline-none"
              aria-label="Briser le sceau de cire"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-600 via-red-600 to-rose-800 text-rose-100 flex items-center justify-center shadow-lg border-2 border-rose-300 group-hover:scale-110 group-active:scale-95 transition-all duration-300">
                <Heart className="w-9 h-9 fill-rose-100/90" />
              </div>
              <span className="mt-3 text-xs font-semibold tracking-wider text-rose-700 uppercase group-hover:text-rose-800 font-sans">
                ✦ Briser le sceau pour lire ✦
              </span>
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in duration-700">
            {/* Header with date and recipient */}
            <div className="flex items-center justify-between pb-6 border-b border-amber-200/60 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                  <Feather className="w-4 h-4" />
                </div>
                <span className="font-serif italic text-rose-900 font-medium">
                  Chère {recipientName},
                </span>
              </div>

              <span className="text-xs text-stone-400 font-sans tracking-wide">
                Pour ton anniversaire 🌸
              </span>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 text-stone-700 font-sans text-base sm:text-lg leading-relaxed">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="first-letter:text-2xl first-letter:font-serif first-letter:text-rose-700">
                  {p}
                </p>
              ))}
            </div>

            {/* Signature Area */}
            <div className="mt-10 pt-6 border-t border-amber-200/60 flex flex-col items-end">
              <p className="text-xs text-stone-500 font-sans uppercase tracking-widest mb-1">
                Avec toute mon attention,
              </p>
              <p className="font-hand text-3xl sm:text-4xl text-rose-700 font-bold">
                — {senderName}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
