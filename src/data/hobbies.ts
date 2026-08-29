// Edit this file with your real numbers and reading list.
// `alt` is the accessible description; `caption` is the line shown in the lightbox.

import type { Localized } from "@/lib/dict";

type HobbyPhoto = { src: string; alt: string; caption: Localized };

export const running: {
  stravaUrl: string;
  prs: { distance: string; time: string }[];
  photos: HobbyPhoto[];
} = {
  stravaUrl: "https://www.strava.com/athletes/207032134",
  prs: [
    { distance: "5K", time: "21:36" },
    { distance: "10K", time: "46:02" },
  ],
  photos: [
    {
      src: "/running-1.png",
      alt: "Carrying the race shoes home",
      caption: {
        en: "The only part of me that stayed clean today.",
        pt: "A única parte de mim que ficou limpa hoje.",
      },
    },
    {
      src: "/running-2.png",
      alt: "Mid-race, bib 19975",
      caption: {
        en: "Bib 19975, hunting down 19974.",
        pt: "Número 19975, caçando o 19974.",
      },
    },
    {
      src: "/running-3.png",
      alt: "Racing under the streetlights before sunrise",
      caption: {
        en: "Foggy 10K, three strangers, one shared regret about the alarm.",
        pt: "10K na neblina, três estranhos, um arrependimento em comum sobre o despertador.",
      },
    },
    {
      src: "/running-4.png",
      alt: "Checking the watch mid-stride in the park",
      caption: {
        en: "Negotiating with my watch about what counts as 'easy pace.'",
        pt: "Tentando convencer o relógio de que esse ritmo é 'leve.'",
      },
    },
  ],
};

export const rugby: { photos: HobbyPhoto[] } = {
  photos: [
    {
      src: "/rugby-1.jpg",
      alt: "Rugby Mauá celebrating a win at sunset",
      caption: {
        en: "The only known cure for eighty minutes of rain: winning.",
        pt: "A única cura conhecida para oitenta minutos de chuva: vencer.",
      },
    },
    {
      src: "/rugby-2.png",
      alt: "Running onto the pitch after the final whistle",
      caption: {
        en: "The camera couldn't keep up. Neither could I, honestly.",
        pt: "A câmera não conseguiu acompanhar. Eu também não, para ser sincero.",
      },
    },
    {
      src: "/rugby-3.png",
      alt: "Rugby Mauá team photo under the posts",
      caption: {
        en: "Team photo, weather uncooperative as always. Nobody left early anyway.",
        pt: "Foto do time, o tempo não colaborou como sempre. Mesmo assim ninguém foi embora antes.",
      },
    },
    {
      src: "/rugby-4.png",
      alt: "Carrying into contact in the rain",
      caption: {
        en: "Rain-soaked pitch, two tacklers, ball held tight to the chest.",
        pt: "Campo encharcado de chuva, dois marcadores, bola bem presa no peito.",
      },
    },
    {
      src: "/rugby-5.png",
      alt: "Breaking through the line, support on both sides",
      caption: {
        en: "Rare sighting: a clean breakout with backup already in position.",
        pt: "Avistamento raro: um avanço limpo com reforço já posicionado.",
      },
    },
    {
      src: "/rugby-6.png",
      alt: "Fighting through a shirt-pull near the touchline",
      caption: {
        en: "Three defenders, one shirt, zero personal space.",
        pt: "Três defensores, uma camisa, zero espaço pessoal.",
      },
    },
    {
      src: "/rugby-7.png",
      alt: "Between plays on a rainy match day",
      caption: {
        en: "Catching a breath before the next collision.",
        pt: "Recuperando o fôlego antes da próxima batida.",
      },
    },
    {
      src: "/rugby-8.png",
      alt: "Open-field run against the yellow wall",
      caption: {
        en: "Open grass ahead, one defender in yellow closing from behind.",
        pt: "Grama aberta pela frente, um defensor de amarelo se aproximando por trás.",
      },
    },
    {
      src: "/rugby-9.jpg",
      alt: "Gaspar Awards 2024 trophy for best rugby athlete",
      caption: {
        en: "Best Athlete 2024. The knee tape did most of the heavy lifting.",
        pt: "Melhor Atleta 2024. A fita no joelho fez a maior parte do trabalho pesado.",
      },
    },
  ],
};

export const photography: { photos: HobbyPhoto[] } = {
  photos: [
    {
      src: "/photo-01.jpg",
      alt: "Crowd crossing Avenida Paulista in late-afternoon light",
      caption: {
        en: "Av. Paulista, golden hour. Everyone late to somewhere.",
        pt: "Av. Paulista, fim de tarde. Todo mundo atrasado para algum lugar.",
      },
    },
    {
      src: "/photo-02.jpg",
      alt: "Two towers with a slice of sky between them",
      caption: {
        en: "Two buildings, one sliver of sky. São Paulo does minimalism for free.",
        pt: "Dois prédios, uma fatia de céu. São Paulo faz minimalismo de graça.",
      },
    },
    {
      src: "/photo-03.jpg",
      alt: "Round stage at a scientific conference at PUC-SP",
      caption: {
        en: "The round auditorium at PUC-SP, panel chairs empty before the 34th Scientific Initiation meeting starts.",
        pt: "O auditório circular da PUC-SP, cadeiras da mesa ainda vazias antes do início do 34º Encontro de Iniciação Científica.",
      },
    },
    {
      src: "/photo-05.jpg",
      alt: "Golden light through reeded glass",
      caption: {
        en: "No idea what's behind the glass. Better that way.",
        pt: "Não sei o que tem atrás do vidro. Melhor assim.",
      },
    },
    {
      src: "/photo-06.jpg",
      alt: "Curved glass building between towers, black and white",
      caption: {
        en: "Every other building here is a straight line. This one had other plans.",
        pt: "Todo outro prédio aqui é uma linha reta. Esse aqui teve outros planos.",
      },
    },
    {
      src: "/photo-07.jpg",
      alt: "Desk still life with a small lamp and dinner",
      caption: {
        en: "Dinner at the desk, laptop still open, deadline still winning.",
        pt: "Jantar na mesa, notebook ainda aberto, o prazo ainda ganhando.",
      },
    },
    {
      src: "/photo-08.jpg",
      alt: "Seaside garden with a marina, pickup football and a dog",
      caption: {
        en: "Everyone chasing the ball. The dog chasing everyone.",
        pt: "Todo mundo correndo atrás da bola. O cachorro correndo atrás de todo mundo.",
      },
    },
    {
      src: "/photo-09.jpg",
      alt: "A lone cargo ship on the horizon",
      caption: {
        en: "A cargo ship minding its own business. Relatable.",
        pt: "Um cargueiro cuidando da própria vida. Eu entendo.",
      },
    },
    {
      src: "/photo-10.jpg",
      alt: "Bridge traffic disappearing into fog",
      caption: {
        en: "Visibility: none. Commute: unbothered.",
        pt: "Visibilidade: zero. Trânsito: irredutível.",
      },
    },
    {
      src: "/photo-11.jpg",
      alt: "Candlelit nightstand with wine glasses",
      caption: {
        en: "Candlelight: the original dark mode.",
        pt: "Luz de vela: o dark mode original.",
      },
    },
    {
      src: "/photo-12.jpg",
      alt: "Dome of Sacré-Cœur from below, black and white",
      caption: {
        en: "Sacré-Cœur, looking up until my neck filed a complaint.",
        pt: "Sacré-Cœur, olhando para cima até o pescoço reclamar.",
      },
    },
    {
      src: "/photo-13.jpg",
      alt: "Église Saint-Eustache from a Paris side street",
      caption: {
        en: "Grocery run with a 500-year-old backdrop, no big deal.",
        pt: "Ida ao mercado com um cenário de 500 anos, sem grandes novidades.",
      },
    },
    {
      src: "/photo-14.jpg",
      alt: "Statue of André-Marie Ampère in Lyon",
      caption: {
        en: "Ampère, sitting quietly next to an ice cream shop called Ice Monkey.",
        pt: "Ampère, sentado tranquilamente ao lado de uma sorveteria chamada Ice Monkey.",
      },
    },
    {
      src: "/photo-15.jpg",
      alt: "Figures of the Monument to the Discoveries, Lisbon",
      caption: {
        en: "Lisbon's explorers, still waiting for boarding.",
        pt: "Os navegadores de Lisboa, ainda esperando o embarque.",
      },
    },
    {
      src: "/photo-16.jpg",
      alt: "Standing at the sea wall, looking at the Atlantic",
      caption: {
        en: "Me, the Atlantic, and a strong opinion about wind.",
        pt: "Eu, o Atlântico e uma opinião forte sobre o vento.",
      },
    },
    {
      src: "/photo-17.jpg",
      alt: "Foggy morning at Praça Luís de Camões, Lisbon",
      caption: {
        en: "Lisbon fog. The tram wires do the drawing.",
        pt: "Neblina em Lisboa. Os fios do bonde fazem o desenho.",
      },
    },
    {
      src: "/photo-18.jpg",
      alt: "Mercado do Bolhão under a gray sky, Porto",
      caption: {
        en: "This much symmetry usually costs a museum ticket. Here it's just Tuesday.",
        pt: "Tanta simetria assim geralmente custa entrada de museu. Aqui é só terça-feira.",
      },
    },
    {
      src: "/photo-19.jpg",
      alt: "Twin bell towers catching the last light, Porto",
      caption: {
        en: "Same golden hour, different centuries, equally photogenic.",
        pt: "O mesmo fim de tarde dourado, séculos diferentes, igualmente fotogênicos.",
      },
    },
  ],
};

export const books: { title: string; author: string; link?: string }[] = [
  {
    title: "Building Micro-Frontends",
    author: "Luca Mezzalira",
    link: "https://www.amazon.com.br/Building-Micro-Frontends-Distributed-Systems-Frontend/dp/1098170784",
  },
  {
    title: "AI Engineering",
    author: "Chip Huyen",
    link: "https://www.amazon.com.br/AI-Engineering-Building-Applications-Foundation/dp/1098166302",
  },
];
