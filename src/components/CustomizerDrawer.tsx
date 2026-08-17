import React, { useState } from 'react';
import { GiftConfig, QualityItem, MemoryPolaroid } from '../types';
import { X, Save, RotateCcw, Upload, Eye, Check, Sparkles, Camera, Video, Film, Trash2, Plus, Play } from 'lucide-react';
import { audio } from '../utils/audio';

interface CustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: GiftConfig;
  onSaveConfig: (newConfig: GiftConfig) => void;
  onResetDefault: () => void;
  onSwitchToGiftMode: () => void;
}

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onResetDefault,
  onSwitchToGiftMode,
}) => {
  const [formData, setFormData] = useState<GiftConfig>({ ...config });
  const [activeTab, setActiveTab] = useState<'general' | 'qualities' | 'memories' | 'letter'>('general');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleTextChange = (field: keyof GiftConfig, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQualityChange = (index: number, field: keyof QualityItem, value: string) => {
    const updated = [...formData.qualities];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, qualities: updated }));
  };

  const handleMemoryChange = (index: number, field: keyof MemoryPolaroid, value: unknown) => {
    const updated = [...formData.memories];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, memories: updated }));
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updated = [...formData.memories];
        updated[index] = {
          ...updated[index],
          mediaType: 'photo',
          imageUrl: reader.result as string,
        };
        setFormData((prev) => ({ ...prev, memories: updated }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updated = [...formData.memories];
        updated[index] = {
          ...updated[index],
          mediaType: 'video',
          videoUrl: reader.result as string,
        };
        setFormData((prev) => ({ ...prev, memories: updated }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMemory = () => {
    audio.playNote(520, 0.3, 0.05);
    const newMemo: MemoryPolaroid = {
      id: `m_${Date.now()}`,
      title: 'Nouveau souvenir',
      subtitle: 'Un moment précieux',
      mediaType: 'photo',
      imageUrl: '',
      videoUrl: '',
      gradientPreset: 'from-purple-200 via-rose-200 to-amber-100',
      backNote: 'Un petit mot doux à découvrir...',
      date: 'Aujourd\'hui',
      rotation: Math.floor(Math.random() * 6) - 3,
    };
    setFormData((prev) => ({
      ...prev,
      memories: [...prev.memories, newMemo],
    }));
  };

  const handleDeleteMemory = (index: number) => {
    if (formData.memories.length <= 1) return;
    const updated = formData.memories.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, memories: updated }));
  };

  const handleSave = () => {
    audio.playChime();
    onSaveConfig(formData);
    onClose();
  };

  const handleCopyConfigLink = () => {
    audio.playChime();
    try {
      const jsonStr = JSON.stringify(formData);
      const encoded = encodeURIComponent(btoa(unescape(encodeURIComponent(jsonStr))));
      const shareUrl = `${window.location.origin}${window.location.pathname}?gift_data=${encoded}`;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-stone-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-gradient-to-r from-rose-50 to-purple-50">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <h3 className="font-serif font-bold text-lg text-stone-800">
                Personnaliser le site
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Adapte chaque mot, photo et souvenir à votre histoire.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 px-4 bg-stone-50/80 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'general'
                ? 'border-rose-500 text-rose-600 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Prénoms & Date
          </button>
          <button
            onClick={() => setActiveTab('qualities')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'qualities'
                ? 'border-rose-500 text-rose-600 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Ce que j'aime (4)
          </button>
          <button
            onClick={() => setActiveTab('memories')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'memories'
                ? 'border-rose-500 text-rose-600 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Photos & Vidéos ({formData.memories.length})
          </button>
          <button
            onClick={() => setActiveTab('letter')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'letter'
                ? 'border-rose-500 text-rose-600 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            La Lettre
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-stone-700">
          {/* TAB: GENERAL */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Son prénom (Recipient) 🌸
                </label>
                <input
                  type="text"
                  value={formData.recipientName}
                  onChange={(e) => handleTextChange('recipientName', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="Ex: Michelange, Sarah, Camille..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Ton prénom ou signature ✨
                </label>
                <input
                  type="text"
                  value={formData.senderName}
                  onChange={(e) => handleTextChange('senderName', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="Ex: Celui qui pense à toi, Thomas..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Date de son anniversaire
                </label>
                <input
                  type="date"
                  value={formData.birthdayDate}
                  onChange={(e) => handleTextChange('birthdayDate', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  Affiche automatiquement le compte à rebours ou "C'est aujourd'hui !".
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Lieu / Ville (Elle)
                  </label>
                  <input
                    type="text"
                    value={formData.cityHer}
                    onChange={(e) => handleTextChange('cityHer', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="Ex: De chez toi"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                    Lieu / Ville (Toi)
                  </label>
                  <input
                    type="text"
                    value={formData.cityHim}
                    onChange={(e) => handleTextChange('cityHim', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="Ex: À chez moi"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Distance estimée (km)
                </label>
                <input
                  type="number"
                  value={formData.distanceKm}
                  onChange={(e) => handleTextChange('distanceKm', parseInt(e.target.value) || 0)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Sous-titre d'accueil
                </label>
                <input
                  type="text"
                  value={formData.subtitleIntro}
                  onChange={(e) => handleTextChange('subtitleIntro', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
            </div>
          )}

          {/* TAB: QUALITIES */}
          {activeTab === 'qualities' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-500">
                Personnalise les 4 aspects que tu trouves craquants ou admirables chez elle :
              </p>
              {formData.qualities.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <span className="text-xs font-serif italic text-rose-500 font-bold">
                    Qualité {idx + 1} ({q.roman})
                  </span>
                  <input
                    type="text"
                    value={q.title}
                    onChange={(e) => handleQualityChange(idx, 'title', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="Titre de la qualité"
                  />
                  <textarea
                    rows={2}
                    value={q.description}
                    onChange={(e) => handleQualityChange(idx, 'description', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-rose-400"
                    placeholder="Description détaillée"
                  />
                </div>
              ))}
            </div>
          )}

          {/* TAB: MEMORIES / POLAROIDS (PHOTOS OR VIDEOS) */}
          {activeTab === 'memories' && (
            <div className="space-y-5">
              <div className="bg-rose-50/70 p-3.5 rounded-2xl border border-rose-200/80">
                <p className="text-xs text-rose-900 font-medium">
                  📸 <strong>Choix Photo ou Vidéo :</strong> Tu peux choisir pour chaque cadre d'ajouter soit une <strong>photo</strong>, soit une <strong>vidéo</strong> (par exemple 3 photos et 1 vidéo, ou selon tes envies).
                </p>
              </div>

              {formData.memories.map((memo, idx) => {
                const isVideo = memo.mediaType === 'video' || (Boolean(memo.videoUrl) && !memo.imageUrl);
                return (
                  <div key={memo.id || idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-700 font-serif">
                        Polaroid #{idx + 1}
                      </span>
                      {formData.memories.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteMemory(idx)}
                          className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                          title="Supprimer ce polaroid"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Media Type Selector Toggle: Photo vs Video */}
                    <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl">
                      <button
                        type="button"
                        onClick={() => {
                          handleMemoryChange(idx, 'mediaType', 'photo');
                        }}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          !isVideo
                            ? 'bg-white text-rose-600 shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Photo</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleMemoryChange(idx, 'mediaType', 'video');
                        }}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          isVideo
                            ? 'bg-white text-rose-600 shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Vidéo</span>
                      </button>
                    </div>

                    {/* PHOTO INPUT SECTION */}
                    {!isVideo && (
                      <div className="space-y-2.5 pt-1">
                        <div className="flex items-center gap-3">
                          {memo.imageUrl ? (
                            <img
                              src={memo.imageUrl}
                              alt="Aperçu"
                              className="w-16 h-16 object-cover rounded-xl border border-stone-300 shadow-xs"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-xl bg-stone-200 border border-stone-300 flex flex-col items-center justify-center text-stone-400 text-[10px] gap-1">
                              <Camera className="w-4 h-4 text-stone-400" />
                              <span>Sans photo</span>
                            </div>
                          )}

                          <div className="flex-1 space-y-1.5">
                            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-xs font-medium text-stone-700 hover:bg-stone-100 cursor-pointer shadow-2xs">
                              <Upload className="w-3.5 h-3.5 text-rose-500" />
                              <span>Importer une photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(idx, e)}
                                className="hidden"
                              />
                            </label>
                            {memo.imageUrl && (
                              <button
                                type="button"
                                onClick={() => handleMemoryChange(idx, 'imageUrl', '')}
                                className="block text-[11px] text-rose-600 hover:underline"
                              >
                                Retirer la photo
                              </button>
                            )}
                          </div>
                        </div>

                        <div>
                          <input
                            type="text"
                            value={memo.imageUrl || ''}
                            onChange={(e) => {
                              handleMemoryChange(idx, 'imageUrl', e.target.value);
                              handleMemoryChange(idx, 'mediaType', 'photo');
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-rose-400"
                            placeholder="Ou colle une URL d'image (https://...)"
                          />
                        </div>
                      </div>
                    )}

                    {/* VIDEO INPUT SECTION */}
                    {isVideo && (
                      <div className="space-y-2.5 pt-1">
                        <div className="flex items-center gap-3">
                          {memo.videoUrl ? (
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-black border border-stone-400 relative flex items-center justify-center shadow-xs">
                              <video
                                src={memo.videoUrl}
                                className="w-full h-full object-cover"
                                muted
                                playsInline
                              />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
                                <Play className="w-3.5 h-3.5 fill-white" />
                              </div>
                            </div>
                          ) : (
                            <div className="w-16 h-16 rounded-xl bg-stone-200 border border-stone-300 flex flex-col items-center justify-center text-stone-400 text-[10px] gap-1">
                              <Video className="w-4 h-4 text-stone-400" />
                              <span>Sans vidéo</span>
                            </div>
                          )}

                          <div className="flex-1 space-y-1.5">
                            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-rose-300 text-xs font-medium text-rose-700 hover:bg-rose-50 cursor-pointer shadow-2xs">
                              <Film className="w-3.5 h-3.5 text-rose-500" />
                              <span>Importer une vidéo (MP4, MOV...)</span>
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => handleVideoUpload(idx, e)}
                                className="hidden"
                              />
                            </label>
                            {memo.videoUrl && (
                              <button
                                type="button"
                                onClick={() => handleMemoryChange(idx, 'videoUrl', '')}
                                className="block text-[11px] text-rose-600 hover:underline"
                              >
                                Retirer la vidéo
                              </button>
                            )}
                          </div>
                        </div>

                        <div>
                          <input
                            type="text"
                            value={memo.videoUrl || ''}
                            onChange={(e) => {
                              handleMemoryChange(idx, 'videoUrl', e.target.value);
                              handleMemoryChange(idx, 'mediaType', 'video');
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-rose-400"
                            placeholder="Ou colle une URL directe de vidéo (https://...mp4)"
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-500 mb-0.5">
                          Titre du Polaroid
                        </label>
                        <input
                          type="text"
                          value={memo.title}
                          onChange={(e) => handleMemoryChange(idx, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-medium"
                          placeholder="Ex: Notre premier appel"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-500 mb-0.5">
                          Date / Sous-titre
                        </label>
                        <input
                          type="text"
                          value={memo.date}
                          onChange={(e) => handleMemoryChange(idx, 'date', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs"
                          placeholder="Ex: Le début de tout"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-rose-600 mb-0.5">
                        Message secret au dos (visible au clic)
                      </label>
                      <textarea
                        rows={2}
                        value={memo.backNote}
                        onChange={(e) => handleMemoryChange(idx, 'backNote', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-rose-200 text-xs bg-rose-50/40"
                        placeholder="Le mot tendre au dos du polaroid..."
                      />
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                onClick={handleAddMemory}
                className="w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-rose-200 hover:border-rose-400 text-rose-600 hover:bg-rose-50/50 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un autre Polaroid / Souvenir</span>
              </button>
            </div>
          )}

          {/* TAB: LETTER */}
          {activeTab === 'letter' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Titre de la lettre
                </label>
                <input
                  type="text"
                  value={formData.letterTitle}
                  onChange={(e) => handleTextChange('letterTitle', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
                  Contenu de la lettre (Paragraphes)
                </label>
                <p className="text-[11px] text-stone-400 mb-2">
                  Sépare chaque paragraphe par un saut de ligne.
                </p>
                <textarea
                  rows={8}
                  value={formData.letterParagraphs.join('\n\n')}
                  onChange={(e) =>
                    handleTextChange(
                      'letterParagraphs',
                      e.target.value.split('\n\n').filter((p) => p.trim().length > 0)
                    )
                  }
                  className="w-full p-3 rounded-xl border border-stone-300 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={onResetDefault}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-stone-600 hover:bg-stone-100 text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyConfigLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-medium transition-colors"
                title="Copie un lien web contenant toute ta personnalisation"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{copied ? 'Lien copié !' : 'Copier lien cadeau'}</span>
              </button>

              <button
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-semibold shadow-sm hover:shadow transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Appliquer</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              handleSave();
              onSwitchToGiftMode();
            }}
            className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-medium transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Tester en Mode Cadeau Propre (Sans boutons d'édition)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
