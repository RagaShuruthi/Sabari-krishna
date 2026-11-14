/**
 * ====================================================================
 * SABARI — THE CHAMPION'S JOURNEY ⚽ • CONFIGURATION & MEDIA ASSETS
 * ====================================================================
 */

window.SABARI_CONFIG = {
  hero: {
    name: "Sabari Krishna",
    jerseyNumber: 10,
    teamName: "TEAM SABARI & MESSI",
    opponentName: "TEAM RONALDO",
    achievementTitle: "WorldSkills National Winner",
    achievementSub: "Represented with Passion, Skill & Unmatched Dedication"
  },

  messi: {
    avatar: null,
    fullPhoto: null
  },

  dialogues: {
    scene1: {
      messiGreeting: {
        es: "¡Hola, Sabari! ¿Cómo estás? ¿Te gusta el fútbol?",
        en: "Hey Sabari! How are you? Do you love football?"
      },
      choices: [
        { id: "love", text: "¡Sí! I love football! ⚽❤️" },
        { id: "really", text: "Wait... Is that Messi?! 😲" }
      ],
      messiResponse: {
        es: "¡Jajaja! Sí, soy yo. ¿Qué te parece si jugamos un partido?",
        en: "Haha! Yes, it's me. What do you say we play a match?"
      },
      playBtn: "LET'S PLAY WITH MESSI! ⚽🔥"
    },

    scene2: {
      messiInvite: {
        es: "¡Hoy jugamos juntos, Sabari!",
        en: "Today, we're playing together, Sabari!"
      },
      ronaldoChallenge: {
        es: "¡Vamos! Let's see what you've got!",
        en: "Let's see what you've got, Sabari & Messi!"
      },
      matchTitle: "SABARI & MESSI VS RONALDO"
    },

    scene4: {
      messiCongrats: {
        es: "¡Buen partido, Sabari! ¡Estoy orgulloso de ti! Pero espera... tengo algo especial para mostrarte.",
        en: "Great match, Sabari! I'm proud of you! But wait... I have something special to show you."
      },
      discoverBtn: "DISCOVER YOUR SQUAD & MEMORIES 📸✨"
    },

    // Personal Promise to Sabari Krishna (Spoken in Messi's Voice with Subtitles)
    promise: {
      messiStandBeside: {
        es: "Sabari... Ven aquí conmigo. Tengo una promesa que hacerte.",
        en: "Sabari... Stand beside me. I have a promise to make to you."
      },
      lines: [
        {
          es: "Sabari Krishna…",
          en: "Sabari Krishna…",
          isHero: true
        },
        {
          es: "No ganar una medalla o tropezar no es fracasar. Rendirse sí lo es.",
          en: "Failing or not getting a medal is not a thing. Giving up is."
        },
        {
          es: "Prométeme que lo vas a seguir intentando.",
          en: "You promise me that you will try."
        },
        {
          es: "Dormí temprano y comé bien. Cuidate mucho, campeón.",
          en: "Sleep early and eat well. Take care of yourself, champion."
        },
        {
          es: "Puede ser un éxito o puede ser un tropiezo. Sea lo que sea, si lo intentas con el corazón, te prometo que un día iré a visitarte en persona en tu vida.",
          en: "It may be a success or it may be a failure. Whatever it is, if you try, I promise I will be there to visit you one day in your lifetime."
        },
        {
          es: "Te lo juro de verdad.",
          en: "I really promise.",
          isHighlight: true
        },
        {
          es: "Hasta ese día, seguí luchando.",
          en: "Until then, keep trying."
        },
        {
          es: "Haceme sentir orgulloso, Sabari Krishna.",
          en: "Make me proud, Sabari Krishna.",
          isClimax: true
        }
      ],
      messiHugFarewell: {
        es: "¡Seguí adelante, campeón! ¡Nos vemos pronto, Sabari!",
        en: "Keep moving forward, champion! See you soon, Sabari!"
      },
      finalScreen: {
        title: "SABARI KRISHNA",
        subtitle: "NATIONAL WINNER. ALWAYS A CHAMPION.",
        farewell: "UNTIL WE MEET, CHAMPION. 💙"
      }
    }
  },

  // Unified Full-Page Slideshow Photos (Friends, Loved Ones & WorldSkills National Winner memories)
  slideshowPhotos: [
    {
      id: "photo-1",
      image: "images/WhatsApp Image 2026-09-18 at 3.46.55 PM.jpeg",
      title: "WorldSkills National Winner Ceremony",
      message: "National Winner! We are all so unbelievably proud of you, Sabari.",
      tag: "National Gold 🥇"
    },
    {
      id: "photo-2",
      image: "images/WhatsApp Image 2026-09-16 at 11.29.37 AM.jpeg",
      title: "Competition Journey & Dedication",
      message: "Always cheering for you. No matter what happens next, you proved your mastery.",
      tag: "True Mastery ⭐"
    },
    {
      id: "photo-3",
      image: "images/WhatsApp Image 2026-09-16 at 11.24.27 AM.jpeg",
      title: "Celebrating National Glory",
      message: "Keep going, champion. You earned every single bit of this recognition.",
      tag: "Proud of You 🏆"
    },
    {
      id: "photo-4",
      image: "images/WhatsApp Image 2026-09-16 at 11.24.27 AM (1).jpeg",
      title: "Your Unshakable Squad",
      message: "We've got your back, bro. Always in your corner through every match and milestone.",
      tag: "Brotherhood 🤝"
    },
    {
      id: "photo-5",
      image: "images/WhatsApp Image 2026-09-16 at 11.23.15 AM.jpeg",
      title: "Champion Spirit",
      message: "You made our entire squad so unbelievably proud. Head held high, legend!",
      tag: "Champion Spirit ⚡"
    },
    {
      id: "photo-6",
      image: "images/WhatsApp Image 2026-09-16 at 11.23.12 AM.jpeg",
      title: "The Unstoppable No. 10",
      message: "Keep being you. The journey continues and even bigger dreams await you.",
      tag: "Unstoppable ⚽"
    },
    {
      id: "photo-7",
      image: "images/WhatsApp Image 2026-09-16 at 11.23.12 AM (1).jpeg",
      title: "Stadium Energy",
      message: "Your whole squad is right behind you, cheering louder than 80,000 fans.",
      tag: "Forever Squad 🏟️"
    },
    {
      id: "photo-8",
      image: "images/WhatsApp Image 2026-09-16 at 11.23.10 AM.jpeg",
      title: "Certified GOAT Energy",
      message: "Certified GOAT energy. Head high always, our national champion!",
      tag: "True GOAT 🐐"
    },
    {
      id: "photo-9",
      image: "images/WhatsApp Image 2026-09-16 at 11.23.09 AM.jpeg",
      title: "World Class Talent",
      message: "National level talent, world class friend.",
      tag: "World Class 🌟"
    },
    {
      id: "photo-10",
      image: "images/WhatsApp Image 2026-09-16 at 11.23.08 AM.jpeg",
      title: "Victory & Smiles",
      message: "Celebrating you today and every single day.",
      tag: "Celebration 🎉"
    },
    {
      id: "photo-11",
      image: "images/WhatsApp Image 2026-09-16 at 11.23.09 AM (1).jpeg",
      title: "Keep That Smile",
      message: "Don't stop smiling, legend! The best goals and milestones are still ahead.",
      tag: "Keep Smiling 😊"
    },
    {
      id: "photo-12",
      image: "images/WhatsApp Image 2026-07-17 at 9.34.23 AM.jpeg",
      title: "Always In Your Corner",
      message: "In your corner for every chapter of this great adventure.",
      tag: "True Supporter 💙"
    },
    {
      id: "photo-13",
      image: "images/WhatsApp Image 2026-09-11 at 12.40.55 PM.jpeg",
      title: "Heart of a True Winner",
      message: "True champion in all of our hearts. No trophy needed to prove it.",
      tag: "Heart of Gold ❤️"
    },
    {
      id: "photo-14",
      image: "images/WhatsApp Image 2026-09-16 at 11.23.06 AM.jpeg",
      title: "Vamos Sabari!",
      message: "More football, more joy, more VAMOS! Let's conquer the world together.",
      tag: "Vamos! 🔥"
    },
    {
      id: "photo-15",
      image: "images/WhatsApp Image 2026-09-16 at 11.23.04 AM.jpeg",
      title: "Our Number 10",
      message: "Proud to have you as our No. 10! The journey has only just begun.",
      tag: "Our No. 10 ⚽"
    }
  ]
};
