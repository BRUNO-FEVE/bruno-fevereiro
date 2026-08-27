import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, RevealList, RevealItem } from "@/components/Reveal";
import { projects, projectSlug } from "@/data/projects";
import { T } from "@/lib/i18n";
import { ui, type Localized } from "@/lib/dict";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things Bruno Fevereiro has built.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 pb-12">
      <Reveal>
        <Link
          href="/"
          className="link-slide text-sm text-muted hover:text-ink"
        >
          <T text={ui.backToHome} />
        </Link>
        <p className="mt-10 mb-4 text-xs tracking-[0.35em] text-muted uppercase">
          <span className="text-accent">—</span>{" "}
          <T text={ui.projectsOverline} />
        </p>
        <h1 className="font-serif text-5xl font-medium tracking-tight text-ink uppercase">
          <T text={ui.projectsTitle} />
        </h1>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          <T text={ui.projectsDesc} />
        </p>
      </Reveal>

      <RevealList className="mt-16">
        {projects.map((project, i) => (
          <RevealItem key={project.title}>
            <Row index={i + 1} {...project} />
          </RevealItem>
        ))}
      </RevealList>
    </div>
  );
}

function Row({
  index,
  title,
  year,
  description,
  role,
  highlight,
}: {
  index: number;
  title: string;
  year: string;
  description: Localized;
  role: Localized;
  highlight?: Localized;
}) {
  return (
    <Link
      href={`/projects/${projectSlug(title)}`}
      className="group grid grid-cols-[2.5rem_1fr] gap-y-2 border-t border-faint py-8"
    >
      <span className="font-serif text-sm text-muted italic">
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-2xl text-ink transition-colors group-hover:text-accent">
            {title}
          </h2>
          <span className="text-sm text-muted">{year}</span>
        </div>
        {highlight && (
          <p className="mt-1.5 text-xs font-medium tracking-[0.2em] text-accent uppercase">
            <T text={highlight} />
          </p>
        )}
        <p className="mt-3 line-clamp-2 max-w-lg leading-relaxed text-muted">
          <T text={description} />
        </p>
        <p className="mt-3 text-sm tracking-wide text-muted uppercase">
          <T text={role} />
        </p>
      </div>
    </Link>
  );
}
