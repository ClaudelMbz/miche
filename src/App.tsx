import { useState, useEffect } from 'react';
import { initialGiftConfig } from './data/defaultContent';
import { GiftConfig } from './types';
import { audio } from './utils/audio';
import { FloatingPetals } from './components/FloatingPetals';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { DistanceBridgeSection } from './components/DistanceBridgeSection';
import { QualitiesSection } from './components/QualitiesSection';
import { MemoriesPolaroidSection } from './components/MemoriesPolaroidSection';
import { SecretLettersCapsule } from './components/SecretLettersCapsule';
import { LetterSection } from './components/LetterSection';
import { BirthdayCandleWishSection } from './components/BirthdayCandleWishSection';
import { CustomizerDrawer } from './components/CustomizerDrawer';

const STORAGE_KEY = 'birthday_crush_gift_config';

export default function App() {
  const [config, setConfig] = useState<GiftConfig>(() => {
    // Try URL params first
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const giftDataParam = urlParams.get('gift_data');
      if (giftDataParam) {
        const decoded = decodeURIComponent(escape(atob(decodeURIComponent(giftDataParam))));
        const parsed = JSON.parse(decoded);
        return { ...initialGiftConfig, ...parsed };
      }
    } catch {
      // fallback
    }

    // Try localStorage
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.recipientName === 'Léa') {
          parsed.recipientName = 'Michelange';
        }
        if (parsed.senderName === 'Alex' || !parsed.senderName) {
          parsed.senderName = 'Celui qui pense à toi';
        }
        if (parsed.cityHer === 'Lyon' || parsed.cityHer === 'Kinshasa' || !parsed.cityHer) {
          parsed.cityHer = 'De chez toi';
        }
        if (parsed.cityHim === 'Paris' || !parsed.cityHim) {
          parsed.cityHim = 'À chez moi';
        }
        if (!parsed.letterParagraphs || parsed.letterParagraphs.length <= 4 || !parsed.letterParagraphs.some((p: string) => p.includes('Révèle-toi') || p.includes('montrer ce dont tu es capable'))) {
          parsed.letterParagraphs = initialGiftConfig.letterParagraphs;
        }
        if (Array.isArray(parsed.secretNotes)) {
          parsed.secretNotes = parsed.secretNotes.filter(
            (n: any) => n.id !== 'sn2' && n.tag !== 'La Distance' && !n.title?.includes('distance')
          );
          if (parsed.secretNotes.length === 0) {
            parsed.secretNotes = initialGiftConfig.secretNotes;
          }
        }
        return { ...initialGiftConfig, ...parsed };
      }
    } catch {
      // fallback
    }

    return initialGiftConfig;
  });

  const [isBloomed, setIsBloomed] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isGiftMode, setIsGiftMode] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('gift') === '1' || urlParams.has('gift_data');
  });

  // Save to localStorage
  const handleSaveConfig = (newConfig: GiftConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    } catch {
      // fallback
    }
  };

  const handleResetDefault = () => {
    setConfig(initialGiftConfig);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // fallback
    }
  };

  const handleToggleMusic = () => {
    const playing = audio.toggleMute();
    setIsMusicPlaying(playing);
  };

  const handleBloom = () => {
    setIsBloomed(true);
  };

  useEffect(() => {
    document.title = `Pour toi, ${config.recipientName} 🌸 — Joyeux Anniversaire`;
  }, [config.recipientName]);

  return (
    <div
      className={`min-h-screen transition-colors duration-1000 font-sans selection:bg-rose-200 selection:text-rose-900 ${
        isBloomed ? 'bg-[#FDF6F0] text-stone-800' : 'bg-[#EDEAF2] text-stone-800'
      }`}
    >
      {/* Background Petals Canvas */}
      <FloatingPetals isBloomed={isBloomed} />

      {/* Top Header Navigation */}
      <HeaderNav
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        isCustomizerOpen={isCustomizerOpen}
        onToggleCustomizer={() => setIsCustomizerOpen(true)}
        isGiftMode={isGiftMode}
        onToggleGiftMode={() => setIsGiftMode(!isGiftMode)}
        isBloomed={isBloomed}
      />

      {/* Main Content Area */}
      <main className="relative z-20 transition-all duration-700">
        {/* 1. Hero Section with Interactive Blossom */}
        <HeroSection
          recipientName={config.recipientName}
          subtitleIntro={config.subtitleIntro}
          isBloomed={isBloomed}
          onBloom={handleBloom}
        />

        {/* Subsequent Sections reveal smoothly */}
        <div
          className={`transition-all duration-1000 ${
            isBloomed
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-40 filter grayscale contrast-90 pointer-events-none'
          }`}
        >
          {/* 2. Distance & Connection */}
          <DistanceBridgeSection
            cityHer={config.cityHer}
            cityHim={config.cityHim}
            distanceKm={config.distanceKm}
            recipientName={config.recipientName}
            senderName={config.senderName}
          />

          {/* 3. Qualities (Ce que j'aime chez toi) */}
          <QualitiesSection qualities={config.qualities} />

          {/* 4. Memories Polaroid Gallery */}
          <MemoriesPolaroidSection memories={config.memories} />

          {/* 5. Secret Notes Envelopes Capsule */}
          <SecretLettersCapsule
            notes={config.secretNotes}
            recipientName={config.recipientName}
            senderName={config.senderName}
          />

          {/* 6. The Personal Birthday Letter with Wax Seal */}
          <LetterSection
            title={config.letterTitle}
            paragraphs={config.letterParagraphs}
            recipientName={config.recipientName}
            senderName={config.senderName}
          />

          {/* 7. Interactive Birthday Candle Wish */}
          <BirthdayCandleWishSection
            recipientName={config.recipientName}
            senderName={config.senderName}
            birthdayDate={config.birthdayDate}
            finalWishes={config.finalWishes}
          />
        </div>
      </main>

      {/* Live Customizer Drawer */}
      <CustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        onResetDefault={handleResetDefault}
        onSwitchToGiftMode={() => setIsGiftMode(true)}
      />
    </div>
  );
}
