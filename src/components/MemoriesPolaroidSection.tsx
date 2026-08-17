import React, { useState, useRef } from 'react';
import { MemoryPolaroid } from '../types';
import { RotateCw, Camera, Sparkles, Heart, Video, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { audio } from '../utils/audio';

interface MemoriesPolaroidSectionProps {
  memories: MemoryPolaroid[];
}

export const MemoriesPolaroidSection: React.FC<MemoriesPolaroidSectionProps> = ({
  memories,
}) => {
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>({});
  const [mutedVideos, setMutedVideos] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const toggleFlip = (id: string) => {
    audio.playNote(480, 0.4, 0.04);
    setFlippedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleVideoPlay = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[id];
    if (!vid) return;

    if (vid.paused) {
      vid.play();
      setPlayingVideos((prev) => ({ ...prev, [id]: true }));
    } else {
      vid.pause();
      setPlayingVideos((prev) => ({ ...prev, [id]: false }));
    }
  };

  const toggleVideoMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[id];
    if (!vid) return;
    vid.muted = !vid.muted;
    setMutedVideos((prev) => ({ ...prev, [id]: vid.muted }));
  };

  return (
    <section className="py-16 px-6 max-w-4xl mx-auto relative">
      <div className="text-center mb-12">
        <span className="text-sm font-hand text-purple-700 tracking-wider inline-block mb-1">
          instants partagés
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 tracking-tight">
          Quelques souvenirs & clins d'œil
        </h2>
        <p className="text-stone-600 text-sm max-w-md mx-auto mt-2">
          Chaque moment compte, qu'il soit immortalisé en photo, en vidéo ou au creux de nos pensées.
        </p>
        <div className="inline-flex items-center gap-1.5 mt-3 text-xs text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200/60 font-medium">
          <RotateCw className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Touche un Polaroid pour révéler le message secret au dos</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 pt-4">
        {memories.map((memo, idx) => {
          const isFlipped = !!flippedIds[memo.id];
          const isVideo = memo.mediaType === 'video' || !!memo.videoUrl;
          const isPlaying = !!playingVideos[memo.id];
          const isMuted = mutedVideos[memo.id] ?? false;

          return (
            <div
              key={memo.id || idx}
              className="flex justify-center"
              style={{
                perspective: '1000px',
              }}
            >
              <div
                onClick={() => toggleFlip(memo.id)}
                className="w-full max-w-[320px] cursor-pointer group transition-transform duration-300 hover:scale-105"
                style={{
                  transform: `rotate(${memo.rotation || (idx % 2 === 0 ? -2 : 2)}deg)`,
                }}
              >
                {/* Tape decoration on top */}
                <div className="w-24 h-6 mx-auto -mb-3 bg-amber-100/80 border border-amber-200/60 rotate-[-1deg] shadow-xs relative z-20 rounded-xs backdrop-blur-xs opacity-80" />

                {/* Flippable Card Container */}
                <div
                  className="relative w-full aspect-[4/5] bg-white rounded-lg p-3.5 pb-6 polaroid-shadow border border-stone-200/70 transition-transform duration-700"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* FRONT FACE */}
                  <div
                    className="absolute inset-0 p-3.5 pb-6 flex flex-col bg-white rounded-lg"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    {/* Media Area (Photo or Video) */}
                    <div className="relative w-full aspect-square rounded-sm overflow-hidden bg-stone-900 border border-stone-200/50 flex items-center justify-center">
                      {isVideo && memo.videoUrl ? (
                        <div className="relative w-full h-full group/video bg-black flex items-center justify-center">
                          <video
                            ref={(el) => {
                              videoRefs.current[memo.id] = el;
                            }}
                            src={memo.videoUrl}
                            playsInline
                            loop
                            muted={isMuted}
                            className="w-full h-full object-cover"
                            onPlay={() => setPlayingVideos((prev) => ({ ...prev, [memo.id]: true }))}
                            onPause={() => setPlayingVideos((prev) => ({ ...prev, [memo.id]: false }))}
                          />

                          {/* Video Controls Overlay */}
                          <div
                            onClick={(e) => toggleVideoPlay(memo.id, e)}
                            className={`absolute inset-0 flex items-center justify-center bg-black/25 transition-opacity ${
                              isPlaying ? 'opacity-0 group-hover/video:opacity-100' : 'opacity-100'
                            }`}
                          >
                            <div className="w-12 h-12 rounded-full bg-white/90 text-rose-600 shadow-lg flex items-center justify-center transform group-hover/video:scale-110 transition-transform">
                              {isPlaying ? (
                                <Pause className="w-5 h-5 fill-rose-600" />
                              ) : (
                                <Play className="w-5 h-5 fill-rose-600 ml-0.5" />
                              )}
                            </div>
                          </div>

                          {/* Volume Toggle */}
                          <button
                            type="button"
                            onClick={(e) => toggleVideoMute(memo.id, e)}
                            className="absolute top-2 left-2 p-1.5 rounded-full bg-black/60 text-white backdrop-blur-xs hover:bg-black/80 transition-colors z-10"
                            title={isMuted ? 'Activer le son' : 'Couper le son'}
                          >
                            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                          </button>

                          {/* Video Tag badge */}
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-rose-500/90 text-white text-[10px] font-semibold flex items-center gap-1 backdrop-blur-xs z-10">
                            <Video className="w-3 h-3" />
                            <span>Vidéo</span>
                          </div>
                        </div>
                      ) : memo.imageUrl ? (
                        <img
                          src={memo.imageUrl}
                          alt={memo.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-tr ${memo.gradientPreset || 'from-purple-200 via-rose-200 to-amber-100'} flex flex-col items-center justify-center p-4 text-center`}
                        >
                          <div className="w-12 h-12 rounded-full bg-white/70 backdrop-blur-xs flex items-center justify-center text-purple-900/70 shadow-xs mb-2">
                            {isVideo ? <Video className="w-6 h-6" /> : <Camera className="w-6 h-6" />}
                          </div>
                          <span className="text-xs font-serif italic text-stone-700/80 max-w-[200px]">
                            {memo.subtitle || (isVideo ? 'Vidéo souvenir' : 'Un souvenir précieux')}
                          </span>
                        </div>
                      )}

                      {/* Flip button badge in corner */}
                      <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-stone-900/60 backdrop-blur-xs text-white text-[10px] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                        <RotateCw className="w-3 h-3" />
                        <span>Tourner</span>
                      </div>
                    </div>

                    {/* Polaroid Bottom Caption */}
                    <div className="mt-3 text-center">
                      <p className="font-hand text-xl font-bold text-stone-800 leading-tight">
                        {memo.title}
                      </p>
                      <span className="text-[11px] text-stone-400 font-sans tracking-wide">
                        {memo.date}
                      </span>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className="absolute inset-0 p-6 flex flex-col justify-between bg-[#FFFDF8] rounded-lg border-2 border-dashed border-rose-200/80"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-rose-600/80 font-hand pb-2 border-b border-rose-100 mb-3">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3 fill-rose-300" />
                          Note secrète
                        </span>
                        <span>{memo.date}</span>
                      </div>
                      <p className="font-hand text-lg text-stone-700 leading-relaxed italic">
                        "{memo.backNote || 'Chaque instant passé à discuter avec toi est un cadeau en soi.'}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-stone-400 pt-3 border-t border-stone-100">
                      <span className="flex items-center gap-1 font-hand text-xs text-rose-500">
                        <Sparkles className="w-3 h-3" />
                        Souvenir gravé
                      </span>
                      <span className="underline decoration-dotted text-stone-500">
                        Cliquer pour retourner
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
