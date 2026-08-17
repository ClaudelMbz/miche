import React, { useState, useEffect } from 'react';
import { audio } from '../utils/audio';
import { Heart, Send, Sparkles, MapPin, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DistanceBridgeSectionProps {
  cityHer: string;
  cityHim: string;
  distanceKm: number;
  recipientName: string;
  senderName: string;
}

export const DistanceBridgeSection: React.FC<DistanceBridgeSectionProps> = ({
  cityHer,
  cityHim,
  distanceKm,
  recipientName,
  senderName,
}) => {
  const [timeHer, setTimeHer] = useState<string>('');
  const [timeHim, setTimeHim] = useState<string>('');
  const [isSending, setIsSending] = useState(false);
  const [sentCount, setSentCount] = useState(0);

  const getTimeForCity = (cityName: string): string => {
    const lower = cityName.toLowerCase().trim();
    let timeZone = 'Europe/Paris';

    if (lower.includes('kinshasa') || lower.includes('congo') || lower.includes('brazzaville')) {
      timeZone = 'Africa/Kinshasa';
    } else if (lower.includes('paris') || lower.includes('lyon') || lower.includes('marseille') || lower.includes('france') || lower.includes('bordeaux')) {
      timeZone = 'Europe/Paris';
    } else if (lower.includes('new york') || lower.includes('montreal') || lower.includes('quebec')) {
      timeZone = 'America/New_York';
    } else if (lower.includes('dakar') || lower.includes('abidjan') || lower.includes('lome')) {
      timeZone = 'Africa/Abidjan';
    } else if (lower.includes('bruxelles') || lower.includes('brussels')) {
      timeZone = 'Europe/Brussels';
    } else if (lower.includes('londres') || lower.includes('london')) {
      timeZone = 'Europe/London';
    }

    try {
      return new Date().toLocaleTimeString('fr-FR', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  useEffect(() => {
    const update = () => {
      setTimeHer(getTimeForCity(cityHer || 'Kinshasa'));
      setTimeHim(getTimeForCity(cityHim || 'Paris'));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [cityHer, cityHim]);

  const handleSendThought = () => {
    audio.playChime();
    setIsSending(true);
    setSentCount((c) => c + 1);

    confetti({
      particleCount: 20,
      spread: 45,
      origin: { y: 0.7 },
      colors: ['#FF8FA3', '#FFC857', '#C8B6FF'],
    });

    setTimeout(() => {
      setIsSending(false);
    }, 1800);
  };

  return (
    <section
      id="distance-section"
      className="py-16 px-6 max-w-3xl mx-auto relative scroll-mt-14"
    >
      <div className="text-center mb-10">
        <span className="text-sm font-hand text-purple-700 tracking-wider inline-block mb-1">
          le fil invisible
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 tracking-tight">
          De chez toi à chez moi
        </h2>
        <p className="text-stone-600 text-sm max-w-md mx-auto mt-2">
          Peu importent les kilomètres qui nous séparent, nos pensées n'ont pas besoin de billets de train.
        </p>
      </div>

      {/* Bridge Card */}
      <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-6 sm:p-8 paper-shadow border border-rose-100/70 relative overflow-hidden">
        {/* Decorative corner background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-100/40 to-transparent rounded-bl-full pointer-events-none" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          {/* City Her */}
          <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-rose-50/50 border border-rose-100/60 transition-transform hover:scale-[1.02]">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-2">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-xs uppercase tracking-wider text-rose-800/70 font-semibold">
              Chez {recipientName}
            </span>
            <span className="text-xl font-serif font-medium text-stone-800 mt-0.5">
              {cityHer || 'Ta ville'}
            </span>
            <div className="flex items-center gap-1 text-xs text-stone-500 mt-2 font-mono">
              <Clock className="w-3.5 h-3.5 text-rose-400" />
              <span>{timeHer || '--:--'}</span>
            </div>
          </div>

          {/* Central Connecting Distance Line */}
          <div className="flex flex-col items-center text-center px-2">
            <div className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-1">
              Distance
            </div>
            <div className="text-2xl font-serif font-semibold text-rose-600">
              ~{distanceKm.toLocaleString('fr-FR')} km
            </div>
            
            {/* Animated dotted connecting line */}
            <div className="w-full my-3 relative flex items-center justify-center">
              <div className="w-full h-0.5 border-t-2 border-dashed border-rose-200" />
              <div className={`absolute p-1.5 rounded-full bg-white border border-rose-200 text-rose-500 shadow-xs transition-transform duration-700 ${isSending ? 'scale-125 rotate-180 text-rose-600' : ''}`}>
                <Heart className={`w-4 h-4 ${isSending ? 'fill-rose-500 animate-ping' : 'fill-rose-200'}`} />
              </div>
            </div>

            <span className="text-xs text-stone-500 italic font-hand text-base">
              « 0 cm dans nos têtes »
            </span>
          </div>

          {/* City Him */}
          <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-purple-50/50 border border-purple-100/60 transition-transform hover:scale-[1.02]">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-2">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-xs uppercase tracking-wider text-purple-800/70 font-semibold">
              Chez {senderName}
            </span>
            <span className="text-xl font-serif font-medium text-stone-800 mt-0.5">
              {cityHim || 'Ma ville'}
            </span>
            <div className="flex items-center gap-1 text-xs text-stone-500 mt-2 font-mono">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>{timeHim || '--:--'}</span>
            </div>
          </div>
        </div>

        {/* Interactive Send a Thought Button */}
        <div className="mt-8 pt-6 border-t border-rose-100/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-stone-600 text-center sm:text-left">
            {sentCount > 0 ? (
              <span className="text-rose-700 font-medium">
                {sentCount} pensée{sentCount > 1 ? 's' : ''} chaleureuse{sentCount > 1 ? 's' : ''} envoyée{sentCount > 1 ? 's' : ''} aujourd'hui 💌
              </span>
            ) : (
              <span>Envoyer un petit signal à travers les kilomètres :</span>
            )}
          </p>

          <button
            onClick={handleSendThought}
            disabled={isSending}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-semibold tracking-wide hover:shadow-md hover:scale-105 active:scale-95 transition-all disabled:opacity-75"
          >
            {isSending ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Envoyer une douce pensée</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
