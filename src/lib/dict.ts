// UI copy in both languages. Data files carry their own Localized fields.

export type Lang = "en" | "pt";
export type Localized = { en: string; pt: string };

export const ui = {
  // nav
  navWriting: { en: "Writing", pt: "Textos" },
  navProjects: { en: "Projects", pt: "Projetos" },

  // hero
  heroName: { en: "Bruno Fevereiro", pt: "Bruno Fevereiro" },
  heroRole: { en: "Software Engineer", pt: "Engenheiro de Software" },
  heroLine1: { en: "I build", pt: "Construo" },
  heroLine2: { en: "small, careful", pt: "pequenas e cuidadosas" },
  heroLine3: { en: "things.", pt: "coisas." },
  heroBio: {
    en: "Full-stack engineer at Bradesco Seguros. I architected the company's first Micro Frontend platform, now used by 8 teams and cutting project setup time by ~75%, and build multi-agent AI systems, including a code review agent that cuts review time by ~90%. I taught 300+ engineers to work with AI, and I write about how it all gets made.",
    pt: "Engenheiro full-stack no Bradesco Seguros. Arquitetei a primeira plataforma de Micro Frontends da empresa, hoje usada por 8 equipes, reduzindo o tempo de setup de projetos em ~75%, e construo sistemas multi-agente de IA, incluindo um agente de code review que reduz o tempo de revisão em ~90%. Ensinei 300+ engenheiros a trabalhar com IA e escrevo sobre como tudo isso é feito.",
  },
  scroll: { en: "Scroll ↓", pt: "Role ↓" },

  // section labels
  selectedProjects: { en: "Selected projects", pt: "Projetos selecionados" },
  relatedProjects: { en: "Related projects", pt: "Projetos relacionados" },
  readTheStory: { en: "Read the story", pt: "Leia a história" },
  resourcesUsed: { en: "Resources used", pt: "Recursos usados" },
  aboutThisProject: { en: "About this project", pt: "Sobre este projeto" },
  allProjects: { en: "All projects", pt: "Todos os projetos" },
  whereIveWorked: { en: "Where I've worked", pt: "Onde trabalhei" },
  education: { en: "Education", pt: "Formação" },
  certifications: { en: "Certifications", pt: "Certificações" },
  awards: { en: "Awards", pt: "Prêmios" },
  recentWriting: { en: "Recent writing", pt: "Textos recentes" },
  allWriting: { en: "All writing", pt: "Todos os textos" },
  offTheClock: { en: "Off the clock", pt: "Fora do expediente" },

  // hobbies
  running: { en: "Running", pt: "Corrida" },
  runningBlurb: {
    en: "Chasing lower numbers around São Paulo.",
    pt: "Caçando números menores por São Paulo.",
  },
  stravaLink: { en: "Follow along on Strava ↗", pt: "Acompanhe no Strava ↗" },
  pr5k: { en: "5K PR", pt: "PR 5K" },
  pr10k: { en: "10K PR", pt: "PR 10K" },
  rugby: { en: "Rugby", pt: "Rugby" },
  rugbyBlurb: {
    en: "Two seasons with Rugby Mauá: best player in 2024, and the guy who automated the team's billing. Rugby taught me more about teams than any sprint retro ever did.",
    pt: "Duas temporadas no Rugby Mauá: melhor jogador em 2024 e o cara que automatizou as cobranças do time. O rugby me ensinou mais sobre times do que qualquer retro de sprint.",
  },
  photography: { en: "Photography", pt: "Fotografia" },
  photographyBlurb: {
    en: "Mostly streets, buildings, and whatever the light happens to be doing, shot on the phone that was already in my pocket.",
    pt: "Principalmente ruas, prédios e o que quer que a luz esteja fazendo, no celular que já estava no meu bolso.",
  },
  reading: { en: "Reading", pt: "Leituras" },

  // gallery
  galleryHint: {
    en: "Hover to pause · drag to scrub",
    pt: "Passe o mouse para pausar · arraste para navegar",
  },
  escToClose: { en: "ESC to close", pt: "ESC para fechar" },
  swipeHint: { en: "swipe ↔", pt: "deslize ↔" },

  // writing pages
  writingTitle: { en: "Writing", pt: "Textos" },
  writingOverline: { en: "Notes & essays", pt: "Notas & ensaios" },
  writingDesc: {
    en: "Notes on building software: the decisions, the dead ends, and the occasional thing that works.",
    pt: "Notas sobre construir software: as decisões, os becos sem saída e, de vez em quando, algo que funciona.",
  },
  backToWriting: { en: "← Writing", pt: "← Textos" },
  backToHome: { en: "← Home", pt: "← Início" },

  // projects page
  projectsTitle: { en: "Projects", pt: "Projetos" },
  projectsOverline: { en: "Things I've built", pt: "Coisas que construí" },
  projectsDesc: {
    en: "Things I have built: some for clients, some for myself. All of them taught me something.",
    pt: "Coisas que construí: algumas para clientes, outras para mim. Todas me ensinaram algo.",
  },
  backToProjects: { en: "← Projects", pt: "← Projetos" },
  partOfMyTimeAt: { en: "Part of my time at", pt: "Parte da minha passagem por" },
} satisfies Record<string, Localized>;
