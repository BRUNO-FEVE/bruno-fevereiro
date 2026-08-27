// Edit this file to update your education.

import type { Localized } from "@/lib/dict";

export type Education = {
  school: string;
  degree: Localized;
  period: Localized;
  link?: string;
};

export const education: Education[] = [
  {
    school: "Instituto Mauá de Tecnologia",
    degree: { en: "Computer Engineering", pt: "Engenharia de Computação" },
    period: { en: "Jan 2020 — Dec 2025", pt: "Jan 2020 — Dez 2025" },
    link: "https://www.maua.br",
  },
];
