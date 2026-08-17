import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Flame, RefreshCw } from 'lucide-react';
import { audio } from '../utils/audio';
import confetti from 'canvas-confetti';

interface BirthdayCandleWishSectionProps {
  recipientName: string;
  senderName: string;
  birthdayDate: string;
  finalWishes: string;
}

export const BirthdayCandleWishSection: React.FC<BirthdayCandleWishSectionProps> = ({
  recipientName,
  senderName,
  birthdayDate,
  finalWishes,
}) => {
  const [isBlown, setIsBlown] = useState(false);
  const [countdownText, setCountdownText] = useState<string>('');

  useEffect(() => {
    if (!birthdayDate) {
      setCountdownText("Aujourd'hui, c'est ta journée spéciale ✨");
      return;
    }

    const updateCountdown = () => {
      const target = new Date(birthdayDate).getTime();
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setCountdownText("C'est le grand jour aujourd'hui ! 🎉");
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setCountdownText(`Encore ${days}j ${hours}h ${minutes}m avant ton anniversaire`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [birthdayDate]);

  const handleBlowCandle = () => {
    if (!isBlown) {
      audio.playCandleBlow();
      setIsBlown(true);

      // Grand celebration confetti blast
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#FFC857', '#FF8FA3', '#FFD1DC', '#C8B6FF', '#78A978', '#FFAAA6'],
      });
    }
  };

  const handleRelight = () => {
    audio.playChime();
    setIsBlown(false);
  };

  return (
    <section className="py-20 px-6 max-w-2xl mx-auto text-center relative">
      <div className="mb-8">
        <span className="text-sm font-hand text-purple-700 tracking-wider inline-block mb-1">
          le rituel
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 tracking-tight">
          Fais un vœu, <span className="text-rose-500 font-serif italic">{recipientName}</span>
        </h2>
        <p className="text-stone-600 text-sm max-w-sm mx-auto mt-2">
          Ferme les yeux une seconde, formule ton vœu le plus cher, puis souffle la bougie.
        </p>
        {countdownText && (
          <div className="inline-block mt-3 px-4 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono">
            {countdownText}
          </div>
        )}
      </div>

      {/* Interactive Birthday Candle Visual */}
      <div className="my-8 flex flex-col items-center justify-center">
        <div
          onClick={handleBlowCandle}
          className={`relative p-6 rounded-full transition-transform duration-300 ${!isBlown ? 'cursor-pointer hover:scale-105 group' : ''}`}
        >
          {/* Flame & Candle graphic */}
          <div className="relative flex flex-col items-center">
            {/* Flickering Flame */}
            {!isBlown ? (
              <div className="relative mb-1 flex flex-col items-center">
                {/* Outer Glow */}
                <div className="absolute -inset-2 rounded-full bg-amber-400/40 blur-md animate-pulse" />
                
                {/* SVG Flame */}
                <div className="relative w-8 h-12 flex items-center justify-center animate-bounce" style={{ animationDuration: '2.5s' }}>
                  <svg viewBox="0 0 40 60" className="w-full h-full drop-shadow-sm">
                    <path
                      d="M20 0 C25 20, 38 30, 38 44 C38 54, 30 60, 20 60 C10 60, 2 54, 2 44 C2 30, 15 20, 20 0 Z"
                      fill="url(#flameGrad)"
                    />
                    <path
                      d="M20 18 C23 30, 30 36, 30 46 C30 52, 25 56, 20 56 C15 56, 10 52, 10 46 C10 36, 17 30, 20 18 Z"
                      fill="#FFF3B0"
                    />
                    <defs>
                      <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF4D4D" />
                        <stop offset="40%" stopColor="#FF9F1C" />
                        <stop offset="100%" stopColor="#FFD166" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            ) : (
              /* Smoke wisps after blowing */
              <div className="h-12 flex flex-col items-center justify-center animate-in fade-in duration-500">
                <span className="text-stone-400 text-xs font-hand text-lg animate-pulse">
                  ~ vœu envolé vers les étoiles ~ 💫
                </span>
              </div>
            )}

            {/* Candle Wick */}
            <div className="w-1 h-3 bg-stone-700 rounded-t" />

            {/* Candle Cylinder */}
            <div className="w-7 h-20 rounded-t-sm bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300 border border-rose-300/80 shadow-inner relative">
              {/* Decorative Stripes */}
              <div className="absolute top-3 left-0 right-0 h-1.5 bg-white/60" />
              <div className="absolute top-8 left-0 right-0 h-1.5 bg-white/60" />
              <div className="absolute top-13 left-0 right-0 h-1.5 bg-white/60" />
            </div>

            {/* Cupcake / Stand Plate */}
            <div className="w-24 h-4 bg-amber-200/80 rounded-full border border-amber-300 shadow-sm mt-0.5" />
          </div>
        </div>

        {/* Blow Button / Hint */}
        {!isBlown ? (
          <button
            onClick={handleBlowCandle}
            className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 text-stone-900 font-medium text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Flame className="w-4 h-4 text-amber-900" />
            <span>Souffler la bougie 🕯️</span>
          </button>
        ) : (
          <div className="mt-4 animate-in zoom-in-95 duration-500">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 border border-amber-200 paper-shadow max-w-lg mx-auto">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-5 h-5 fill-rose-400" />
              </div>
              <h4 className="font-serif text-xl font-bold text-stone-800 mb-2">
                Que ton vœu se réalise ✨
              </h4>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                {finalWishes}
              </p>
              <div className="font-hand text-2xl text-rose-600 font-bold">
                — {senderName} 🤍
              </div>

              <div className="mt-4 pt-3 border-t border-rose-100/60">
                <button
                  onClick={handleRelight}
                  className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Rallumer la bougie</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer sweet note */}
      <footer className="mt-16 pt-8 border-t border-stone-200/60 text-xs text-stone-400 font-sans">
        <p className="flex items-center justify-center gap-1.5">
          <span>Créé avec attention & délicatesse</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-200 inline" />
          <span>pour {recipientName}</span>
        </p>
      </footer>
    </section>
  );
};
