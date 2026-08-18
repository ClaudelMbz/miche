import { GiftConfig } from '../types';

export const initialGiftConfig: GiftConfig = {
  recipientName: 'Michelange',
  senderName: 'Celui qui pense à toi',
  birthdayDate: '2026-08-17',
  subtitleIntro: 'Un petit coin du web rien que pour toi',
  cityHer: 'De chez toi',
  cityHim: 'À chez moi',
  distanceKm: 6050,
  qualities: [
    {
      id: 'q1',
      roman: 'i.',
      title: 'Ta timidité des débuts',
      description: 'Cette pudeur délicate qui s\'efface doucement dès que tu parles de ce qui te passionne vraiment.',
      iconName: 'Sparkles'
    },
    {
      id: 'q2',
      roman: 'ii.',
      title: 'Ton sourire si solaire',
      description: 'Celui qui arrive toujours avec une seconde de retenue, mais qui illumine et réchauffe toute la journée.',
      iconName: 'Sun'
    },
    {
      id: 'q3',
      roman: 'iii.',
      title: 'Nos conversations tardives',
      description: 'Ces fous rires à 1h du matin où la distance s\'efface complètement et où le temps semble s\'arrêter.',
      iconName: 'Moon'
    },
    {
      id: 'q4',
      roman: 'iv.',
      title: 'Ton authenticité rare',
      description: 'Le fait que tu sois toi-même, vraie, attentionnée et pétillante, sans jamais avoir besoin d\'en faire trop.',
      iconName: 'Heart'
    }
  ],
  memories: [
    {
      id: 'm1',
      title: 'Ambianceure',
      subtitle: 'La voix un peu hésitante au début...',
      mediaType: 'video',
      videoUrl: './videos/video1.mp4',
      imageUrl: '',
      gradientPreset: 'from-purple-200 via-rose-200 to-amber-100',
      backNote: 'Tu avais ce petit rire gêné les cinq premières minutes... et puis on a fini par discuter pendant des heures sans s\'en rendre compte.',
      date: 'Le début de tout',
      rotation: -3
    },
    {
      id: 'm2',
      title: '2m10',
      subtitle: 'Impossible de reprendre notre souffle',
      mediaType: 'video',
      videoUrl: './videos/video2.mp4',
      imageUrl: '',
      gradientPreset: 'from-amber-200 via-rose-200 to-purple-200',
      backNote: 'Je crois que c\'est ce soir-là que j\'ai su à quel point ton rire était communicatif et précieux.',
      date: 'Une nuit mémorable',
      rotation: 2.5
    },
    {
      id: 'm3',
      title: 'BIBINA BINA',
      subtitle: 'Depuis, elle tourne en boucle',
      mediaType: 'video',
      videoUrl: './videos/video3.mp4',
      imageUrl: '',
      gradientPreset: 'from-teal-100 via-rose-200 to-amber-200',
      backNote: 'Chaque fois que les premières notes démarrent dans mes écouteurs, c\'est comme si tu étais juste à côté.',
      date: 'Notre bande-son',
      rotation: -2
    },
    {
      id: 'm4',
      title: 'Fongola motema',
      subtitle: 'Effacer les kilomètres pour de vrai',
      mediaType: 'video',
      videoUrl: './videos/video4.mp4',
      imageUrl: '',
      gradientPreset: 'from-rose-200 via-pink-200 to-orange-100',
      backNote: 'Ce n\'est plus qu\'une question de temps avant qu\'on puisse trinquer ensemble sans écran interposé.',
      date: 'Bientôt',
      rotation: 3
    }
  ],
  secretNotes: [
    {
      id: 'sn1',
      tag: 'Coup de mou',
      icon: 'Coffee',
      title: 'À ouvrir si tu as passé une journée difficile ☕',
      content: 'Respire un bon coup. Tu as le droit d\'être fatiguée et de poser ton fardeau. Rappelle-toi que même dans les journées grises, ta gentillesse et ta force font la différence. Je suis là si tu veux parler (ou juste râler en paix).',
      signature: 'Je pense fort à toi.'
    },
    {
      id: 'sn3',
      tag: 'Confiance',
      icon: 'Star',
      title: 'À ouvrir si jamais tu doutes de toi ✨',
      content: 'Tu as cette douceur rare doublée d\'une énergie vive qui touche tous ceux qui apprennent à te connaître. Ne laisse jamais le doute te faire oublier à quel point tu es exceptionnelle.',
      signature: 'Crois en toi comme j\'y crois.'
    },
    {
      id: 'sn4',
      tag: 'Sourire',
      icon: 'Smile',
      title: 'À ouvrir juste pour avoir un petit sourire 🌸',
      content: 'Petit rappel officiel : tu as un des sourires les plus adorables et contagieux au monde. Voilà, c\'est scientifiquement prouvé.',
      signature: 'Mission accomplie ? 😊'
    },
    {
      id: 'sn5',
      tag: 'Anniversaire',
      icon: 'Gift',
      title: 'À ouvrir pour ton vœu d\'anniversaire 🎂',
      content: 'Que cette nouvelle année t\'apporte des projets qui te font vibrer, des moments de pure joie, et plein de jolies surprises méritées !',
      signature: 'Le plus beau des anniversaires.'
    }
  ],
  letterTitle: 'Pour toi, en ce jour si spécial',
  letterParagraphs: [
    'Aujourd\'hui c\'est ton anniversaire, et même si les kilomètres m\'empêchent d\'être là pour te le souhaiter de vive voix autour d\'un gâteau, je voulais t\'offrir ce petit recoin virtuel conçu spécialement pour toi.',
    'J\'admire cette délicatesse que tu portes en toi : cette discrétion chaleureuse des premiers instants, puis cette vivacité et cette spontanéité lumineuse dès que tu te sens en confiance. C\'est un privilège rare d\'apprendre à te connaître un peu plus chaque jour.',
    'Révèle-toi au monde telle que tu es : n\'aie jamais peur de montrer ce dont tu es capable. Tu as en toi une force, une grâce et une lumière précieuses qui méritent de s\'exprimer pleinement, sans la moindre retenue ni hésitation.',
    'La distance a beau imposer son rythme, elle n\'enlève rien à la complicité de nos échanges ni aux sourires que tu fais naître derrière mon écran. J\'espère que cette journée te comblera d\'attentions douces et de rires sincères.',
    'Passe un merveilleux anniversaire. Que cette nouvelle année soit à ton image : douce, vibrante et pleine de belles promesses.'
  ],
  quizQuestions: [
    {
      id: 'q1',
      question: '1. Quel est ton petit péché mignon ou dessert réconfort ?',
      options: [
        { id: 'opt1', text: 'Une gourmandise au chocolat bien fondante', isCorrect: true },
        { id: 'opt2', text: 'Un thé glacé sans sucre (trop sage !)', isCorrect: false },
        { id: 'opt3', text: 'Une salade de carottes râpées', isCorrect: false }
      ],
      correctFeedback: 'Exactement ! Je savais que le chocolat ne trompe jamais 🍫',
      wrongFeedback: 'Même si c\'est faux, j\'en prends bonne note pour la prochaine fois !'
    },
    {
      id: 'q2',
      question: '2. Ton réflexe quand tu es un peu intimidée ou timide ?',
      options: [
        { id: 'opt4', text: 'Prendre la fuite en courant', isCorrect: false },
        { id: 'opt5', text: 'Un petit sourire timide en touchant tes cheveux', isCorrect: true },
        { id: 'opt6', text: 'Faire semblant d\'être un espion secret', isCorrect: false }
      ],
      correctFeedback: 'Trop craquant, c\'est exactement ce petit charme naturel 🌸',
      wrongFeedback: 'Bien tenté, mais je connais bien ce petit regard discret !'
    },
    {
      id: 'q3',
      question: '3. Ce qui réussit à te faire sourire à coup sûr ?',
      options: [
        { id: 'opt7', text: 'Un meme nul ou une maladresse partagée', isCorrect: true },
        { id: 'opt8', text: 'Un discours solennel de deux heures', isCorrect: false },
        { id: 'opt9', text: 'Une réunion le lundi matin à 8h', isCorrect: false }
      ],
      correctFeedback: 'Nos meilleurs fous rires partent toujours de là 😄',
      wrongFeedback: 'Rien ne vaut un bon éclat de rire spontané !'
    },
    {
      id: 'q4',
      question: '4. La chose la plus importante pour cette nouvelle année ?',
      options: [
        { id: 'opt10', text: 'Croire en tes rêves et rester cette personne formidable', isCorrect: true },
        { id: 'opt11', text: 'Manger 15 pizzas par semaine', isCorrect: false },
        { id: 'opt12', text: 'Dormir 22h par jour', isCorrect: false }
      ],
      correctFeedback: 'C\'est tout ce que je te souhaite de tout cœur ✨',
      wrongFeedback: 'C\'est pas mal aussi, mais surtout prends soin de toi !'
    }
  ],
  finalWishes: 'Joyeux anniversaire depuis loin, mais avec tout ce qu\'il faut de sincère et de proche.',
  audioEnabledByDefault: false
};
