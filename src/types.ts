export interface QualityItem {
  id: string;
  roman: string;
  title: string;
  description: string;
  iconName: string;
}

export interface MemoryPolaroid {
  id: string;
  title: string;
  subtitle: string;
  mediaType?: 'photo' | 'video';
  imageUrl?: string;
  videoUrl?: string;
  gradientPreset: string;
  backNote: string;
  date: string;
  rotation: number;
}

export interface SecretNote {
  id: string;
  tag: string;
  icon: string;
  title: string;
  content: string;
  signature: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctFeedback: string;
  wrongFeedback: string;
}

export interface GiftConfig {
  recipientName: string;
  senderName: string;
  birthdayDate: string; // YYYY-MM-DD or empty
  subtitleIntro: string;
  cityHer: string;
  cityHim: string;
  distanceKm: number;
  qualities: QualityItem[];
  memories: MemoryPolaroid[];
  secretNotes: SecretNote[];
  letterTitle: string;
  letterParagraphs: string[];
  quizQuestions: QuizQuestion[];
  finalWishes: string;
  audioEnabledByDefault: boolean;
}
