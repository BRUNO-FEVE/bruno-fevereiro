import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { Reveal } from "@/components/Reveal";
import { BackLink } from "@/components/BackLink";
import { PhotoGallery } from "@/components/PhotoGallery";
import { projects, projectSlug } from "@/data/projects";
import { experienceSlug } from "@/data/experience";
import {
  getArticle,
  getArticles,
  resolveArticleLinks,
  formatDate,
} from "@/lib/writing";
import { mdxOptions, mdxComponents } from "@/lib/mdx";
import {
  MainframeAgentsDiagram,
  MainframeAgentsMemoryDiagram,
} from "@/components/diagrams/MainframeAgentsDiagram";
import {
  ArmondEditorialWorkflowDiagram,
  ArmondCoAfterSections,
  ArmondTopScreenshot,
} from "@/components/diagrams/ArmondCoDiagram";
import { AiCodeReviewAgentSections } from "@/components/diagrams/AiCodeReviewAgentDiagram";
import {
  MicroFrontendPlatformDiagram,
  MicroFrontendPlatformAfterSections,
} from "@/components/diagrams/MicroFrontendPlatformDiagram";
import { T } from "@/lib/i18n";
import { ui } from "@/lib/dict";
import type { Project } from "@/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

// Optional per-project diagram, keyed by slug. Most projects don't need one.
const diagrams: Record<string, React.ComponentType> = {
  "mainframe-modernization-agents": MainframeAgentsDiagram,
  "armond-co": ArmondEditorialWorkflowDiagram,
  "micro-frontend-platform": MicroFrontendPlatformDiagram,
};
// Optional second diagram block, rendered after `afterDiagramParagraphs`
// (the closing detail paragraphs, for projects that have a diagram).
const diagramsAfter: Record<string, React.ComponentType> = {
  "mainframe-modernization-agents": MainframeAgentsMemoryDiagram,
  "armond-co": ArmondCoAfterSections,
  "ai-code-review-agent": AiCodeReviewAgentSections,
  "micro-frontend-platform": MicroFrontendPlatformAfterSections,
};
// Optional image/component rendered right below the title/role block, before
// any prose — for a project whose own screenshot works better as an opening
// visual than the generic film-roll `PhotoGallery` gives.
const topContent: Record<string, React.ComponentType> = {
  "armond-co": ArmondTopScreenshot,
};

function CreditMention({
  credit,
  trailingSpace,
}: {
  credit: NonNullable<Project["credits"]>[number];
  trailingSpace?: boolean;
}) {
  return (
    <>
      {credit.link ? (
        <a href={credit.link} target="_blank" rel="noopener noreferrer">
          {credit.name}
        </a>
      ) : (
        credit.name
      )}{" "}
      <T text={credit.note} />
      {trailingSpace && " "}
    </>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: projectSlug(project.title) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => projectSlug(p.title) === slug);
  if (!project) return {};
  return { title: project.title, description: project.description.en };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => projectSlug(p.title) === slug);
  if (!project) notFound();
  const articleLinks = resolveArticleLinks(project.articles, getArticles());
  const singleArticle =
    articleLinks.length === 1 ? getArticle(articleLinks[0].slug) : undefined;
  const Diagram = diagrams[slug];
  const DiagramAfter = diagramsAfter[slug];
  const TopContent = topContent[slug];
  const detailParagraphs = project.details ?? [project.description];
  // When a project has a diagram, the paragraphs up to `diagramAfterDetailIndex`
  // (default: everything but the last) render before it, the rest after —
  // so the visual can land wherever it reads best in the narrative, not just
  // right before the closing paragraph.
  const diagramSplit =
    project.diagramAfterDetailIndex ?? detailParagraphs.length - 1;
  const mainParagraphs = Diagram
    ? detailParagraphs.slice(0, diagramSplit)
    : detailParagraphs;
  const afterDiagramParagraphs = Diagram
    ? detailParagraphs.slice(diagramSplit)
    : [];

  return (
    <article className="mx-auto w-full max-w-2xl px-6 pb-12">
      <Reveal>
        <BackLink
          href="/projects"
          className="link-slide text-sm text-muted hover:text-ink"
        >
          <T text={ui.backToProjects} />
        </BackLink>
        <div className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm tracking-widest text-muted uppercase">
          <span>{project.year}</span>
          {project.company && (
            <>
              <span aria-hidden>·</span>
              <Link
                href={`/#${experienceSlug(project.company)}`}
                className="link-slide hover:text-ink"
              >
                <T text={ui.partOfMyTimeAt} /> {project.company} →
              </Link>
            </>
          )}
        </div>
        <h1 className="mt-4 font-serif text-4xl leading-[1.15] font-medium tracking-tight text-ink sm:text-[2.75rem]">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2 transition-colors hover:text-accent"
            >
              {project.title}
              <span
                aria-hidden
                className="text-2xl text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:text-3xl"
              >
                ↗
              </span>
            </a>
          ) : (
            project.title
          )}
        </h1>
        {project.highlight && (
          <p className="mt-3 text-xs font-medium tracking-[0.2em] text-accent uppercase">
            <T text={project.highlight} />
          </p>
        )}
        <p className="mt-5 text-sm tracking-wide text-muted uppercase">
          <T text={project.role} />
        </p>
      </Reveal>

      {TopContent && (
        <Reveal delay={0.1}>
          <TopContent />
        </Reveal>
      )}

      {project.photos && project.photos.length > 0 && (
        <Reveal delay={0.1}>
          <div className="mt-10">
            <PhotoGallery photos={project.photos} />
          </div>
        </Reveal>
      )}

      <Reveal delay={0.15}>
        <div className="prose mt-10">
          {project.credits
            ?.filter((credit) => credit.afterDetailIndex === undefined)
            .map((credit) => (
              <p key={credit.name}>
                <CreditMention credit={credit} />
              </p>
            ))}
          {mainParagraphs.map((paragraph, i) => {
            const before = project.credits?.filter(
              (c) => c.afterDetailIndex === i && c.position === "before",
            );
            const after = project.credits?.filter(
              (c) => c.afterDetailIndex === i && c.position !== "before",
            );
            const emphasis = project.emphases?.filter(
              (e) => e.afterDetailIndex === i,
            );
            return (
              <p key={i}>
                {before?.map((credit) => (
                  <CreditMention key={credit.name} credit={credit} trailingSpace />
                ))}
                <T text={paragraph} />
                {after?.map((credit) => (
                  <span key={credit.name}>
                    {" "}
                    <CreditMention credit={credit} />
                  </span>
                ))}
                {emphasis?.map((e) => (
                  <span key={e.phrase} className="text-accent">
                    {" "}
                    {e.phrase}
                  </span>
                ))}
              </p>
            );
          })}
        </div>

        {Diagram && <Diagram />}

        {afterDiagramParagraphs.length > 0 && (
          <div className="prose mt-10">
            {afterDiagramParagraphs.map((paragraph, i) => {
              const originalIndex =
                detailParagraphs.length - afterDiagramParagraphs.length + i;
              const emphasis = project.emphases?.filter(
                (e) => e.afterDetailIndex === originalIndex,
              );
              return (
                <p key={i}>
                  <T text={paragraph} />
                  {emphasis?.map((e) => (
                    <span key={e.phrase} className="text-accent">
                      {" "}
                      {e.phrase}
                    </span>
                  ))}
                </p>
              );
            })}
          </div>
        )}

        {DiagramAfter && <DiagramAfter />}

        {singleArticle && (
          <div className="mt-8">
            <p className="text-xs tracking-[0.2em] text-muted uppercase">
              <span className="text-accent">→</span>{" "}
              <T text={ui.readTheStory} />
            </p>
            <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <Link
                href={`/writing/${singleArticle.slug}`}
                className="font-serif text-2xl text-ink transition-colors hover:text-accent"
              >
                {singleArticle.title}
              </Link>
              <time className="text-sm text-muted">
                {formatDate(singleArticle.date)}
              </time>
            </div>
            <div className="prose mt-6">
              <MDXRemote
                source={singleArticle.content}
                options={mdxOptions}
                components={mdxComponents}
              />
            </div>
          </div>
        )}

        {articleLinks.length > 1 && (
          <div className="mt-8">
            <p className="text-xs tracking-[0.2em] text-muted uppercase">
              <span className="text-accent">→</span>{" "}
              <T text={ui.readTheStory} />
            </p>
            <div className="mt-3 flex flex-col">
              {articleLinks.map(({ slug: articleSlug, title, date, summary }, i) => (
                <Link
                  key={articleSlug}
                  href={`/writing/${articleSlug}`}
                  className={`group block py-4 ${i > 0 ? "border-t border-faint" : ""}`}
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-serif text-xl text-ink transition-colors group-hover:text-accent">
                      {title}
                    </h3>
                    <time className="shrink-0 text-sm text-muted">
                      {formatDate(date)}
                    </time>
                  </div>
                  {summary && (
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                      {summary}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {project.resources && project.resources.length > 0 && (
          <div className="mt-16">
            <p className="text-xs tracking-[0.2em] text-muted uppercase">
              <span className="text-accent">→</span>{" "}
              <T text={ui.resourcesUsed} />
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {project.resources.map((resource) => (
                <div
                  key={resource.title}
                  className="flex flex-wrap items-baseline gap-x-2"
                >
                  {resource.link ? (
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-lg text-ink italic transition-colors hover:text-accent"
                    >
                      {resource.title}
                      <span className="ml-1 text-sm text-muted not-italic">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="font-serif text-lg text-ink italic">
                      {resource.title}
                    </span>
                  )}
                  {resource.author && (
                    <span className="text-sm text-muted">
                      {resource.author}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Reveal>
    </article>
  );
}
