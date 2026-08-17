import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { Sparkles, CheckCircle2, RefreshCw, Trophy, Heart } from 'lucide-react';
import { audio } from '../utils/audio';
import confetti from 'canvas-confetti';

interface QuizSectionProps {
  questions: QuizQuestion[];
  recipientName: string;
  senderName: string;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  questions,
  recipientName,
  senderName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    if (isAnswered) return;

    setSelectedOptionId(optionId);
    setIsAnswered(true);

    if (isCorrect) {
      audio.playChime();
      setScore((s) => s + 1);
    } else {
      audio.playNote(300, 0.4, 0.04);
    }
  };

  const handleNext = () => {
    audio.playNote(440, 0.3, 0.03);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF8FA3', '#FFC857', '#C8B6FF', '#78A978'],
      });
    }
  };

  const handleRestart = () => {
    audio.playChime();
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <section className="py-16 px-6 max-w-2xl mx-auto relative">
      <div className="text-center mb-10">
        <span className="text-sm font-hand text-purple-700 tracking-wider inline-block mb-1">
          petit jeu complice
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-800 tracking-tight">
          Est-ce qu'on se connaît bien ?
        </h2>
        <p className="text-stone-600 text-sm max-w-md mx-auto mt-2">
          Un mini-quiz sans pression pour tester nos petites habitudes et clins d'œil.
        </p>
      </div>

      <div className="bg-white/95 rounded-3xl p-6 sm:p-8 paper-shadow border border-purple-100 relative overflow-hidden">
        {!isCompleted ? (
          <div>
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs text-stone-400 font-medium mb-3">
              <span>Question {currentIndex + 1} sur {questions.length}</span>
              <span>Score : {score}/{questions.length}</span>
            </div>
            <div className="w-full h-1.5 bg-stone-100 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-rose-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-stone-800 mb-6">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let btnStyle = 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-rose-50/60 hover:border-rose-300';

                if (isAnswered) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-medium shadow-xs';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'bg-rose-50 border-rose-300 text-rose-800 opacity-80';
                  } else {
                    btnStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-50';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-2xl border text-sm sm:text-base transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt.text}</span>
                    {isAnswered && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Next Button */}
            {isAnswered && (
              <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-300">
                <p className="font-hand text-lg text-purple-900 italic text-center sm:text-left">
                  {selectedOptionId && currentQ.options.find((o) => o.id === selectedOptionId)?.isCorrect
                    ? currentQ.correctFeedback
                    : currentQ.wrongFeedback}
                </p>

                <button
                  onClick={handleNext}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-semibold hover:shadow-md transition-all active:scale-95 shrink-0"
                >
                  {currentIndex + 1 < questions.length ? 'Question suivante →' : 'Voir le verdict 🎉'}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Completed View */
          <div className="text-center py-6 animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-800 mb-2">
              Verdict : {score === questions.length ? '100% complices ! 🌸' : 'Presque un sans-faute ! 🌷'}
            </h3>

            <p className="text-stone-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
              Score final : <span className="font-semibold text-rose-600">{score}/{questions.length}</span>. 
              {score === questions.length
                ? ' On se connaît déjà drôlement bien, mais j\'ai encore tellement hâte de découvrir toutes les facettes de ton univers.'
                : ' Même à distance, chaque échange nous rapproche un peu plus. Promis, je continue d\'apprendre par cœur !'}
            </p>

            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Rejouer le quiz</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
