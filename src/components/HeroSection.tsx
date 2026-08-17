import React from 'react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';
import { Sparkles, Heart } from 'lucide-react';

interface HeroSectionProps {
  recipientName: string;
  subtitleIntro: string;
  isBloomed: boolean;
  onBloom: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  recipientName,
  subtitleIntro,
  isBloomed,
  onBloom,
}) => {
  const handleFlowerClick = () => {
    if (!isBloomed) {
      onBloom();
      audio.playBloomArpeggio();

      // Trigger delicate pastel confetti
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.55 },
        colors: ['#FFB7C5', '#FFD1DC', '#FFC857', '#C8B6FF', '#FFAAA6'],
        shapes: ['circle'],
        scalar: 1.1,
      });
    } else {
      audio.playChime();
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.55 },
        colors: ['#FFB7C5', '#FFD1DC', '#FFC857'],
      });
    }
  };

  const scrollToFirstSection = () => {
    audio.playChime();
    const el = document.getElementById('distance-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-[92vh] flex flex-col items-center justify-center text-center px-6 pt-16 pb-12 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div
        className={`absolute w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none transition-all duration-1000 -z-10 ${
          isBloomed
            ? 'bg-gradient-to-tr from-rose-200/60 via-amber-100/70 to-purple-200/50 scale-125'
            : 'bg-purple-200/30 scale-90'
        }`}
      />

      {/* Intro Subtitle */}
      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/60 border border-purple-100 text-purple-900/70 text-sm font-hand tracking-wide mb-4 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>{subtitleIntro}</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-stone-800 tracking-tight leading-[1.15] max-w-2xl mb-8">
        Joyeux anniversaire, <br />
        <span className="font-serif italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500">
          {recipientName}
        </span>{' '}
        <span className="inline-block transition-transform hover:scale-125 duration-300">🌸</span>
      </h1>

      {/* Interactive Blossom Flower */}
      <div className="relative my-4 flex flex-col items-center">
        <button
          id="hero-bloom-button"
          onClick={handleFlowerClick}
          className="group relative p-4 rounded-full focus:outline-none transition-transform duration-500 hover:scale-105 active:scale-95"
          aria-label="Faire éclore la fleur"
        >
          {/* Outer Pulsing Aura when not bloomed */}
          {!isBloomed && (
            <div className="absolute inset-2 rounded-full bg-purple-300/40 animate-ping opacity-75 pointer-events-none" />
          )}

          <svg
            className="w-36 h-36 sm:w-44 sm:h-44 filter drop-shadow-md transition-all duration-1000"
            viewBox="0 0 160 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Stem & Leaves */}
            <path
              d="M80 115 C 80 145, 82 165, 80 175"
              stroke={isBloomed ? '#78A978' : '#9EAF9E'}
              strokeWidth="4"
              strokeLinecap="round"
              className="transition-colors duration-1000"
            />
            {/* Left Leaf */}
            <path
              d="M78 140 C 60 135, 52 145, 48 152 C 60 156, 74 150, 79 143"
              fill={isBloomed ? '#8EB88E' : '#B5C4B5'}
              className="transition-all duration-1000 origin-[80px_140px]"
              style={{
                transform: isBloomed ? 'scale(1) rotate(0deg)' : 'scale(0.6) rotate(-10deg)',
              }}
            />
            {/* Right Leaf */}
            <path
              d="M82 130 C 100 125, 108 135, 112 142 C 100 146, 86 140, 81 133"
              fill={isBloomed ? '#8EB88E' : '#B5C4B5'}
              className="transition-all duration-1000 origin-[80px_130px]"
              style={{
                transform: isBloomed ? 'scale(1) rotate(0deg)' : 'scale(0.6) rotate(10deg)',
              }}
            />

            {/* Petals */}
            {/* Petal 1 - Top Center */}
            <ellipse
              cx="80"
              cy="70"
              rx="18"
              ry="32"
              fill={isBloomed ? '#FF8FA3' : '#B8A9D9'}
              className="transition-all duration-1000 origin-[80px_100px]"
              style={{
                transform: isBloomed
                  ? 'scale(1) translateY(-14px) rotate(0deg)'
                  : 'scale(0.4) translateY(12px) rotate(0deg)',
                opacity: isBloomed ? 0.95 : 0.6,
              }}
            />

            {/* Petal 2 - Top Right */}
            <ellipse
              cx="80"
              cy="70"
              rx="18"
              ry="32"
              fill={isBloomed ? '#FFAAA6' : '#A796CE'}
              className="transition-all duration-1000 origin-[80px_100px]"
              style={{
                transform: isBloomed
                  ? 'scale(1) rotate(50deg) translateY(-12px)'
                  : 'scale(0.35) rotate(15deg) translateY(10px)',
                opacity: isBloomed ? 0.92 : 0.55,
              }}
            />

            {/* Petal 3 - Bottom Right */}
            <ellipse
              cx="80"
              cy="70"
              rx="18"
              ry="32"
              fill={isBloomed ? '#FFD3B6' : '#C8B6FF'}
              className="transition-all duration-1000 origin-[80px_100px]"
              style={{
                transform: isBloomed
                  ? 'scale(0.95) rotate(105deg) translateY(-10px)'
                  : 'scale(0.35) rotate(30deg) translateY(8px)',
                opacity: isBloomed ? 0.9 : 0.5,
              }}
            />

            {/* Petal 4 - Bottom Left */}
            <ellipse
              cx="80"
              cy="70"
              rx="18"
              ry="32"
              fill={isBloomed ? '#FFD3B6' : '#C8B6FF'}
              className="transition-all duration-1000 origin-[80px_100px]"
              style={{
                transform: isBloomed
                  ? 'scale(0.95) rotate(-105deg) translateY(-10px)'
                  : 'scale(0.35) rotate(-30deg) translateY(8px)',
                opacity: isBloomed ? 0.9 : 0.5,
              }}
            />

            {/* Petal 5 - Top Left */}
            <ellipse
              cx="80"
              cy="70"
              rx="18"
              ry="32"
              fill={isBloomed ? '#FFAAA6' : '#A796CE'}
              className="transition-all duration-1000 origin-[80px_100px]"
              style={{
                transform: isBloomed
                  ? 'scale(1) rotate(-50deg) translateY(-12px)'
                  : 'scale(0.35) rotate(-15deg) translateY(10px)',
                opacity: isBloomed ? 0.92 : 0.55,
              }}
            />

            {/* Flower Center Core */}
            <circle
              cx="80"
              cy="98"
              r={isBloomed ? '14' : '10'}
              fill={isBloomed ? '#FFC857' : '#6B5B95'}
              className="transition-all duration-1000 filter drop-shadow-sm"
            />
            {isBloomed && (
              <circle
                cx="80"
                cy="98"
                r="7"
                fill="#FF9F1C"
                className="animate-pulse"
              />
            )}
          </svg>
        </button>

        {/* Hint text */}
        <p
          className={`text-sm tracking-wide transition-all duration-700 font-sans ${
            isBloomed
              ? 'text-stone-600 opacity-90'
              : 'text-purple-700 font-medium animate-pulse'
          }`}
        >
          {isBloomed ? (
            <span className="inline-flex items-center gap-1 text-rose-600 font-hand text-lg">
              <Heart className="w-4 h-4 fill-rose-400 text-rose-500 inline" />
              La fleur est éclose... tout commence ici.
            </span>
          ) : (
            '✦ Clique sur la fleur pour faire éclore la magie ✦'
          )}
        </p>
      </div>

      {/* Down arrow / discover button if bloomed */}
      {isBloomed && (
        <button
          onClick={scrollToFirstSection}
          className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 hover:bg-white text-stone-700 text-sm font-medium shadow-sm hover:shadow transition-all duration-300 hover:translate-y-0.5 border border-stone-200/80 animate-bounce"
        >
          <span>Découvrir la suite</span>
          <span className="text-rose-500">↓</span>
        </button>
      )}
    </section>
  );
};
