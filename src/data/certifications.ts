// Edit this file to update your certifications.
// `link`: the LinkedIn certifications page by default — swap for the
// individual credential URL when you have it.

import type { Localized } from "@/lib/dict";

const LINKEDIN_CERTIFICATIONS =
  "https://www.linkedin.com/in/bruno-fevereiro/details/certifications/";

export type Certification = {
  name: string;
  code?: string;
  issuer: string;
  date: Localized; // "Jan 2026" or "In progress"
  inProgress?: boolean;
  link?: string;
};

export const certifications: Certification[] = [
  {
    name: "AWS Developer - Associate",
    code: "DVA-C02",
    issuer: "AWS",
    date: { en: "In progress", pt: "Em andamento" },
    inProgress: true,
  },
  {
    name: "AWS Cloud Practitioner",
    code: "CLF-C02",
    issuer: "AWS",
    date: { en: "Jan 2026", pt: "Jan 2026" },
    link: LINKEDIN_CERTIFICATIONS,
  },
  {
    name: "Azure Fundamentals",
    code: "AZ-900",
    issuer: "Microsoft",
    date: { en: "Jul 2025", pt: "Jul 2025" },
    link: LINKEDIN_CERTIFICATIONS,
  },
  {
    name: "Web Application Development Bootcamp",
    issuer: "Inteli & BTG Pactual",
    date: { en: "Jul 2023", pt: "Jul 2023" },
    link: LINKEDIN_CERTIFICATIONS,
  },
];
