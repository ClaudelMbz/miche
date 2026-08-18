import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { SecretNote } from '../types';
import { Mail, MailOpen, X, Sparkles, Heart, Coffee, Compass, Star, Smile, Gift, LucideIcon } from 'lucide-react';
import { audio } from '../utils/audio';

interface SecretLettersCapsuleProps {
  notes: SecretNote[];
  recipientName: string;
  senderName: string;
}

const iconDict: Record<string, LucideIcon> = {
  Coffee,
  Compass,
  Star,
  Smile,
  Gift,
};

export const SecretLettersCapsule: React.FC<SecretLettersCapsuleProps> = ({
  notes,
  recipientName,
  senderName,
}) => {
  const [selectedNote, setSelectedNote] = useState<SecretNote | null>(null);

  const handleOpenNote = (note: SecretNote) => {
    audio.playEnvelopeOpen();
    setSelectedNote(note);
  };

  const handleClose = () => {
    audio.playNote(350, 0.3, 0.03);
    setSelectedNote(null);
  };

  return (
    <section className="py-16 px-6 max-w-4xl mx-auto relative">
      <div className="text-center mb-12">
        <span className="text-sm font-hand text-purple-700 tracking-wider inline-block mb-1">
          capsule de réconfort
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 tracking-tight">
          La Boîte à Petits Mots Doux
        </h2>
        <p className="text-stone-600 text-sm max-w-md mx-auto mt-2">
          Des enveloppes scellées à ouvrir selon ton humeur, aujourd'hui ou dans les jours à venir.
        </p>
      </div>

      {/* Envelopes Grid - 2x2 balanced layout with larger cards and icons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {notes.map((note, index) => {
          const IconComponent = iconDict[note.icon] || Mail;
          return (
            <button
              key={note.id || index}
              onClick={() => handleOpenNote(note)}
              className="text-left group relative bg-white/95 rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-purple-100 hover:border-rose-300 paper-shadow transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg cursor-pointer flex flex-col justify-between min-h-[165px]"
            >
              {/* Envelope flap aesthetic header */}
              <div className="flex items-center justify-between w-full mb-3.5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-rose-50 text-rose-700 border border-rose-200/70 shadow-xs">
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
                  <span>{note.tag}</span>
                </span>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 group-hover:bg-rose-100 group-hover:text-rose-600 transition-colors shadow-xs">
                  <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
              </div>

              <h3 className="font-serif text-stone-800 text-base sm:text-lg font-bold leading-snug group-hover:text-rose-700 transition-colors my-1">
                {note.title}
              </h3>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs sm:text-sm text-stone-500 font-sans">
                <span className="group-hover:text-rose-600 transition-colors font-medium">
                  Cliquer pour décacheter
                </span>
                <span className="text-rose-500 text-sm font-bold group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Modal Letter Envelope View */}
      {selectedNote && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-lg bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 paper-shadow border border-amber-200/80 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Stationery Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-300 via-rose-400 to-amber-300" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-rose-100 text-stone-500 hover:text-rose-700 flex items-center justify-center transition-colors"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Letter Header */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-purple-800/70 mb-2">
              <MailOpen className="w-4 h-4 text-rose-500" />
              <span>Pour {recipientName} • {selectedNote.tag}</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-800 mb-4 pb-3 border-b border-rose-100">
              {selectedNote.title}
            </h3>

            {/* Letter Body */}
            <div className="py-2">
              <p className="font-serif text-stone-700 text-base sm:text-lg leading-relaxed whitespace-pre-line italic">
                « {selectedNote.content} »
              </p>
            </div>

            {/* Letter Footer */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-stone-400 font-hand text-lg">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{selectedNote.signature || `De la part de ${senderName}`}</span>
              </div>

              <button
                onClick={handleClose}
                className="px-4 py-1.5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-semibold transition-colors"
              >
                Replier la lettre
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
