import React from 'react';
import { Volume2, VolumeX, Sparkles, Sliders, Eye } from 'lucide-react';

interface HeaderNavProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  isCustomizerOpen: boolean;
  onToggleCustomizer: () => void;
  isGiftMode: boolean;
  onToggleGiftMode: () => void;
  isBloomed: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  isMusicPlaying,
  onToggleMusic,
  onToggleCustomizer,
  isGiftMode,
  onToggleGiftMode,
  isBloomed,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between backdrop-blur-md bg-white/40 border-b border-rose-100/40 transition-all duration-700">
      <div className="flex items-center gap-2">
        <span className="text-xs tracking-widest uppercase font-medium text-purple-900/60 font-sans flex items-center gap-1.5">
          <span className={`inline-block w-2 h-2 rounded-full transition-colors duration-700 ${isBloomed ? 'bg-rose-400 animate-pulse' : 'bg-purple-300'}`} />
          {isBloomed ? 'Éclosion 🌸' : 'En attente...'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* Audio Toggle */}
        <button
          id="music-toggle-btn"
          onClick={onToggleMusic}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
            isMusicPlaying
              ? 'bg-rose-100/90 text-rose-800 border border-rose-300 shadow-sm'
              : 'bg-white/80 text-stone-600 hover:bg-rose-50 border border-stone-200/70'
          }`}
          title={isMusicPlaying ? 'Couper la douce mélodie' : 'Activer la boîte à musique'}
        >
          {isMusicPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              <span className="hidden sm:inline">Mélodie active</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              <span className="hidden sm:inline">Mélodie</span>
            </>
          )}
        </button>

        {/* Gift mode preview toggle */}
        <button
          id="gift-mode-toggle-btn"
          onClick={onToggleGiftMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
            isGiftMode
              ? 'bg-stone-900 text-stone-100 hover:bg-stone-800 shadow-sm'
              : 'bg-amber-100/80 text-amber-900 hover:bg-amber-200/80 border border-amber-300/60'
          }`}
          title={isGiftMode ? 'Revenir au mode avec réglages' : 'Voir comme elle le verra (sans boutons d\'édition)'}
        >
          {isGiftMode ? (
            <>
              <Sliders className="w-3.5 h-3.5 text-amber-300" />
              <span>Afficher éditeur</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">Aperçu Cadeau</span>
            </>
          )}
        </button>

        {/* Customizer Drawer Trigger (Hidden in pure gift mode) */}
        {!isGiftMode && (
          <button
            id="customizer-open-btn"
            onClick={onToggleCustomizer}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personnaliser</span>
          </button>
        )}
      </div>
    </header>
  );
};
