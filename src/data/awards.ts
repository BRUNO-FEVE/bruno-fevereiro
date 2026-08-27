// Edit this file to update your awards.

import type { Localized } from "@/lib/dict";

export type Award = {
  name: Localized;
  org: string;
  year: string;
  /** Rendered as a Polaroid (full photo, no cropping) — width/height are the
      photo's real pixel dimensions, so it doesn't stretch or distort. */
  photo?: { src: string; alt: string; width: number; height: number };
  link?: string;
};

export const awards: Award[] = [
  {
    name: { en: "Outstanding Member", pt: "Membro Destaque" },
    org: "Dev Community Mauá",
    year: "2024",
    photo: {
      src: "/award-dev-community.jpg",
      alt: "Dev Community Mauá certificate for exceptional performance as a front-end developer in 2024",
      width: 2000,
      height: 1419,
    },
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7275918899072655361/",
  },
  {
    name: { en: "Best Rugby Player", pt: "Melhor Jogador de Rugby" },
    org: "Rugby Mauá",
    year: "2024",
    photo: {
      src: "/rugby-9.jpg",
      alt: "Gaspar Awards 2024 trophy for best rugby athlete",
      width: 1371,
      height: 2642,
    },
  },
];
