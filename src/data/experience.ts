// Edit this file to update your work history.
// Related projects attach themselves via the `company` key in projects.ts.
// `photos`: drop files in public/, list them here, and the film-roll gallery
// appears under the job automatically (omit or leave empty = no gallery).

import type { Localized } from "@/lib/dict";
import type { GalleryPhoto } from "@/components/PhotoGallery";
import { slugify } from "@/lib/slug";

/** Anchor id for a job's row in "Where I've worked" on the home page
    (linked back to from a project's dedicated /projects/[slug] page). */
export function experienceSlug(company: string) {
  return slugify(company);
}

export type Experience = {
  company: string;
  roles: { title: Localized; period: Localized }[];
  summary: Localized;
  link?: string;
  photos?: GalleryPhoto[];
};

export const experience: Experience[] = [
  {
    company: "Bradesco Seguros",
    roles: [
      {
        title: { en: "Software Engineer", pt: "Engenheiro de Software" },
        period: { en: "Jun 2025 — Present", pt: "Jun 2025 — Presente" },
      },
      {
        title: {
          en: "Software Engineering Intern",
          pt: "Estagiário de Engenharia de Software",
        },
        period: { en: "Jun 2024 — Jun 2025", pt: "Jun 2024 — Jun 2025" },
      },
    ],
    summary: {
      en: "Multi-agent AI systems on the Claude API, Java Spring Boot microservices for the pensions division, and the micro-frontend platform used across dozens of teams. Ran an AI workshop for 300+ engineers.",
      pt: "Sistemas multi-agente de IA com a Claude API, microsserviços Java Spring Boot para a divisão de Previdência e a plataforma de micro-frontends usada por dezenas de equipes. Conduzi um workshop de IA para 300+ engenheiros.",
    },
    photos: [
      {
        src: "/bradesco-1.jpg",
        alt: "The team visiting the Amazon office in São Paulo",
        caption: {
          en: "Sixteen engineers, one Amazon logo, one serverless workshop that instantly turned into a cold-start debate.",
          pt: "Dezesseis engenheiros, um logo da Amazon, um workshop de serverless que virou debate sobre cold start na hora.",
        },
      },
      {
        src: "/bradesco-2.jpg",
        alt: "Team dinner at a restaurant after work",
        caption: {
          en: "Happy hour: the one recurring meeting nobody tries to reschedule.",
          pt: "Happy hour: a única reunião recorrente que ninguém tenta remarcar.",
        },
      },
      {
        src: "/bradesco-3.jpg",
        alt: "Festa junina celebration at the office",
        caption: {
          en: "Festa junina at the office: more snacks than any planning meeting ever had.",
          pt: "Festa junina no escritório: mais salgadinho do que qualquer reunião de planejamento já teve.",
        },
      },
    ],
  },
  {
    company: "Armond & Co",
    roles: [
      {
        title: {
          en: "Freelance Software Engineer",
          pt: "Engenheiro de Software Freelancer",
        },
        period: { en: "Jul — Aug 2025", pt: "Jul — Ago 2025" },
      },
    ],
    summary: {
      en: "High-performance website for a luxury consultancy: Next.js, TypeScript and Payload CMS, tuned for SEO and Core Web Vitals.",
      pt: "Site de alta performance para uma consultoria de luxo: Next.js, TypeScript e Payload CMS, otimizado para SEO e Core Web Vitals.",
    },
    link: "https://armondco.com",
    photos: [
      {
        src: "/armond-co-desktop.png",
        alt: "Armond & Co homepage, viewed on desktop",
      },
    ],
  },
  {
    company: "Dev Community Mauá",
    roles: [
      {
        title: {
          en: "Developer",
          pt: "Desenvolvedor",
        },
        period: { en: "Feb 2022 — Jun 2024", pt: "Fev 2022 — Jun 2024" },
      },
    ],
    summary: {
      en: "Led development of the internal portal for a community of 33 developers, recognized as the organization's most successful initiative.",
      pt: "Liderei o desenvolvimento do portal interno para uma comunidade de 33 desenvolvedores, reconhecido como a iniciativa mais bem-sucedida da organização.",
    },
    // TODO(bruno): community/event photos for the gallery.
    photos: [],
  },
  {
    company: "Rugby Mauá",
    roles: [
      {
        title: {
          en: "Player (and team engineer)",
          pt: "Jogador (e engenheiro do time)",
        },
        period: { en: "Jan 2023 — Dec 2024", pt: "Jan 2023 — Dez 2024" },
      },
    ],
    summary: {
      en: "Built an automated WhatsApp and e-mail billing system with Next.js that raised payment compliance by 80%, and was named best player in 2024.",
      pt: "Construí um sistema automatizado de cobrança por WhatsApp e e-mail com Next.js que aumentou a conformidade de pagamentos em 80% e fui eleito melhor jogador em 2024.",
    },
  },
];
