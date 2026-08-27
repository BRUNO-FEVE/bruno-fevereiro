import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Polaroid } from "@/components/Polaroid";
import { Hero } from "@/components/Hero";
import { Reveal, RevealList, RevealItem } from "@/components/Reveal";
import { projects, projectSlug } from "@/data/projects";
import { experience, experienceSlug, type Experience } from "@/data/experience";
import { certifications } from "@/data/certifications";
import { awards } from "@/data/awards";
import { education } from "@/data/education";
import { running, rugby, photography, books } from "@/data/hobbies";
import { getArticles, formatDate, resolveArticleLinks } from "@/lib/writing";
import { T } from "@/lib/i18n";
import { ui, type Localized } from "@/lib/dict";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const allArticles = getArticles();
  const articles = allArticles.slice(0, 3);
  // Hero motion loop at public/hero-live.mp4; without it the still is used.
  // The mtime version param busts browser media caches whenever the file
  // is replaced (same URL, new footage).
  const heroVideoPath = path.join(process.cwd(), "public", "hero-live.mp4");
  const heroVideo = fs.existsSync(heroVideoPath)
    ? `/hero-live.mp4?v=${Math.round(fs.statSync(heroVideoPath).mtimeMs)}`
    : undefined;

  return (
    <>
      <Hero videoSrc={heroVideo} />
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-24 px-6 pt-24 pb-12">
      {/* Experience */}
      <section>
        <Reveal>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-sm tracking-widest text-muted uppercase">
              <span className="text-accent">—</span>{" "}
              <T text={ui.whereIveWorked} />
            </h2>
          </div>
        </Reveal>
        <RevealList>
          {experience.map((job) => (
            <RevealItem key={job.company}>
              <ExperienceRow {...job} />
            </RevealItem>
          ))}
        </RevealList>
      </section>

      {/* Selected projects */}
      <section>
        <Reveal>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-sm tracking-widest text-muted uppercase">
              <span className="text-accent">—</span>{" "}
              <T text={ui.selectedProjects} />
            </h2>
            <Link
              href="/projects"
              className="link-slide text-sm text-muted hover:text-ink"
            >
              <T text={ui.allProjects} />
            </Link>
          </div>
        </Reveal>
        <RevealList>
          {featured.map((project, i) => (
            <RevealItem key={project.title}>
              <ProjectRow
                index={i + 1}
                {...project}
                articleLinks={resolveArticleLinks(project.articles, allArticles)}
              />
            </RevealItem>
          ))}
        </RevealList>
      </section>

      {/* Education */}
      <section>
        <Reveal>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-sm tracking-widest text-muted uppercase">
              <span className="text-accent">—</span> <T text={ui.education} />
            </h2>
          </div>
        </Reveal>
        <RevealList>
          {education.map((entry) => (
            <RevealItem key={entry.school}>
              <div className="flex flex-col gap-1 border-t border-faint py-5 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-serif text-xl text-ink">
                    {entry.link ? (
                      <a
                        href={entry.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-accent"
                      >
                        {entry.school}
                        <span className="ml-2 inline-block text-sm text-muted">
                          ↗
                        </span>
                      </a>
                    ) : (
                      entry.school
                    )}
                  </h3>
                  <span className="text-sm text-muted">
                    <T text={entry.degree} />
                  </span>
                </div>
                <p className="shrink-0 text-sm text-muted">
                  <T text={entry.period} />
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealList>
      </section>

      {/* Certifications */}
      <section>
        <Reveal>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-sm tracking-widest text-muted uppercase">
              <span className="text-accent">—</span>{" "}
              <T text={ui.certifications} />
            </h2>
          </div>
        </Reveal>
        <RevealList>
          {certifications.map((cert) => {
            const inner = (
              <div className="group flex flex-col gap-1 border-t border-faint py-5 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-serif text-xl text-ink transition-colors group-hover:text-accent">
                    {cert.name}
                    {cert.link && (
                      <span className="ml-2 inline-block text-sm text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                        ↗
                      </span>
                    )}
                  </h3>
                  {cert.code && (
                    <span className="font-mono text-xs tracking-[0.15em] text-muted uppercase">
                      {cert.code}
                    </span>
                  )}
                </div>
                <p className="shrink-0 text-sm text-muted">
                  {cert.issuer} ·{" "}
                  {cert.inProgress ? (
                    <span className="text-accent italic">
                      <T text={cert.date} />
                    </span>
                  ) : (
                    <T text={cert.date} />
                  )}
                </p>
              </div>
            );

            return (
              <RevealItem key={cert.name}>
                {cert.link ? (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </RevealItem>
            );
          })}
        </RevealList>
      </section>

      {/* Awards */}
      <section>
        <Reveal>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-sm tracking-widest text-muted uppercase">
              <span className="text-accent">—</span> <T text={ui.awards} />
            </h2>
          </div>
        </Reveal>
        <RevealList className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {awards.map((award) => (
            <RevealItem key={award.name.en} className="flex flex-col items-center gap-4">
              {award.photo && (
                <Polaroid
                  src={award.photo.src}
                  alt={award.photo.alt}
                  width={award.photo.width}
                  height={award.photo.height}
                  className="max-w-xs"
                />
              )}
              <div className="text-center">
                <h3 className="font-serif text-xl text-ink">
                  {award.link ? (
                    <a
                      href={award.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-baseline gap-1.5 transition-colors hover:text-accent"
                    >
                      <T text={award.name} />
                      <span className="text-sm text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <T text={award.name} />
                  )}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {award.org} · {award.year}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealList>
      </section>

      {/* Recent writing */}
      {allArticles.length > 0 && (
        <section>
          <Reveal>
            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="text-sm tracking-widest text-muted uppercase">
                <span className="text-accent">—</span>{" "}
                <T text={ui.recentWriting} />
              </h2>
              <Link
                href="/writing"
                className="link-slide text-sm text-muted hover:text-ink"
              >
                <T text={ui.allWriting} />
              </Link>
            </div>
          </Reveal>
          <RevealList>
            {articles.map((article) => (
              <RevealItem key={article.slug}>
                <Link
                  href={`/writing/${article.slug}`}
                  className="group flex flex-col gap-1 border-t border-faint py-5 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="font-serif text-xl text-ink transition-colors group-hover:text-accent">
                    {article.title}
                  </span>
                  <time className="shrink-0 text-sm text-muted">
                    {formatDate(article.date)}
                  </time>
                </Link>
              </RevealItem>
            ))}
          </RevealList>
        </section>
      )}

      {/* Reading */}
      <section>
        <Reveal>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-sm tracking-widest text-muted uppercase">
              <span className="text-accent">—</span> <T text={ui.reading} />
            </h2>
          </div>
        </Reveal>
        <Reveal>
          <div className="border-t border-faint py-8">
            <ul className="flex flex-col gap-3">
              {books.map((book) => (
                <li
                  key={book.title}
                  className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3"
                >
                  <span className="font-serif text-lg text-ink italic">
                    {book.link ? (
                      <a
                        href={book.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-accent"
                      >
                        {book.title}
                        <span className="ml-1.5 inline-block text-sm text-muted not-italic">
                          ↗
                        </span>
                      </a>
                    ) : (
                      book.title
                    )}
                  </span>
                  <span className="text-sm text-muted">{book.author}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Off the clock */}
      <section>
        <Reveal>
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-sm tracking-widest text-muted uppercase">
              <span className="text-accent">—</span> <T text={ui.offTheClock} />
            </h2>
          </div>
        </Reveal>

        {/* Running */}
        <Reveal>
          <div className="border-t border-faint py-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-serif text-2xl text-ink">
                  <T text={ui.running} />
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                  <T text={ui.runningBlurb} />{" "}
                  <a
                    href={running.stravaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-slide text-ink"
                  >
                    <T text={ui.stravaLink} />
                  </a>
                </p>
              </div>
              <div className="flex gap-10">
                {running.prs.map((pr) => (
                  <div key={pr.distance}>
                    <p className="text-xs tracking-[0.2em] text-muted uppercase">
                      <T text={pr.distance === "5K" ? ui.pr5k : ui.pr10k} />
                    </p>
                    <p className="mt-1 font-serif text-3xl text-ink tabular-nums">
                      {pr.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-6 w-screen ml-[calc(50%-50vw)]">
              <PhotoGallery photos={running.photos} />
            </div>
          </div>
        </Reveal>

        {/* Rugby */}
        <Reveal>
          <div className="border-t border-faint py-8">
            <h3 className="font-serif text-2xl text-ink">
              <T text={ui.rugby} />
            </h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
              <T text={ui.rugbyBlurb} />
            </p>
            <div className="relative mt-6 w-screen ml-[calc(50%-50vw)]">
              <PhotoGallery photos={rugby.photos} />
            </div>
          </div>
        </Reveal>

        {/* Photography */}
        <Reveal>
          <div className="border-t border-faint py-8">
            <h3 className="font-serif text-2xl text-ink">
              <T text={ui.photography} />
            </h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
              <T text={ui.photographyBlurb} />
            </p>
            <div className="relative mt-6 w-screen ml-[calc(50%-50vw)]">
              <PhotoGallery photos={photography.photos} />
            </div>
          </div>
        </Reveal>
      </section>
      </div>
    </>
  );
}

function ExperienceRow({ company, roles, summary, link, photos }: Experience) {
  const name = link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-colors hover:text-accent"
    >
      {company}
      <span className="ml-2 inline-block text-base text-muted">↗</span>
    </a>
  ) : (
    company
  );

  const first = roles[roles.length - 1].period;
  const last = roles[0].period;
  const range: Localized = {
    en: `${first.en.split(" — ")[0]} — ${last.en.split(" — ")[1]}`,
    pt: `${first.pt.split(" — ")[0]} — ${last.pt.split(" — ")[1]}`,
  };

  const related = projects.filter((p) => p.company === company);

  return (
    <div
      id={experienceSlug(company)}
      className="scroll-mt-24 border-t border-faint py-8"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-serif text-2xl text-ink">{name}</h3>
        <span className="shrink-0 text-sm text-muted">
          <T text={range} />
        </span>
      </div>

      {/* Roles as a vertical timeline: filled dot = current/most recent */}
      <ul className="relative mt-5 flex flex-col gap-4 pl-5">
        {roles.map((role, i) => (
          <li key={role.title.en} className="relative">
            {/* Connector to the next marker only — bleeds through the gap so it
                stops exactly at the next dot instead of trailing past the last one. */}
            {i < roles.length - 1 && (
              <span
                aria-hidden
                className="absolute top-[11px] -bottom-[20px] -left-[17px] w-px bg-faint"
              />
            )}
            {/* Square markers — the site avoids circles/border-radius */}
            <span
              aria-hidden
              className={`absolute top-1 -left-5 h-[7px] w-[7px] ${
                i === 0 ? "bg-ink" : "border border-muted bg-paper"
              }`}
            />
            <div className="flex flex-col text-xs tracking-[0.15em] text-muted uppercase sm:flex-row sm:items-baseline sm:justify-between">
              <span className={i === 0 ? "text-ink/80" : undefined}>
                <T text={role.title} />
              </span>
              <span className="normal-case tracking-normal">
                <T text={role.period} />
              </span>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted">
        <T text={summary} />
      </p>

      {/* Related projects, matched by the `company` key in projects.ts */}
      {related.length > 0 && (
        <div className="mt-6">
          <p className="text-xs tracking-[0.2em] text-muted uppercase">
            <span className="text-accent">→</span>{" "}
            <T text={ui.relatedProjects} />
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {related.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      )}

      {photos && photos.length === 1 && (
        <div className="mt-6 flex justify-center">
          <Polaroid
            src={photos[0].src}
            alt={photos[0].alt}
            className="max-w-md"
          />
        </div>
      )}

      {photos && photos.length > 1 && (
        <div className="relative mt-6 w-screen ml-[calc(50%-50vw)]">
          <PhotoGallery photos={photos} />
        </div>
      )}
    </div>
  );
}

function ProjectCard({
  title,
  year,
  description,
  highlight,
}: {
  title: string;
  year: string;
  description: Localized;
  highlight?: Localized;
}) {
  const inner = (
    <div className="group h-full border border-faint p-4 transition-colors hover:border-muted">
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="font-serif text-lg leading-snug text-ink transition-colors group-hover:text-accent">
          {title}
        </h4>
        <span className="shrink-0 text-xs text-muted">{year}</span>
      </div>
      {highlight && (
        <p className="mt-1 text-[0.65rem] font-medium tracking-[0.15em] text-accent uppercase">
          <T text={highlight} />
        </p>
      )}
      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted">
        <T text={description} />
      </p>
    </div>
  );

  return <Link href={`/projects/${projectSlug(title)}`}>{inner}</Link>;
}

function ProjectRow({
  index,
  title,
  year,
  description,
  link,
  highlight,
  articleLinks,
}: {
  index: number;
  title: string;
  year: string;
  description: Localized;
  link?: string;
  highlight?: Localized;
  articleLinks: { slug: string; title: string }[];
}) {
  const main = (
    <div className="group grid grid-cols-[2.5rem_1fr] gap-y-2 pt-6">
      <span className="font-serif text-sm text-muted italic">
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-2xl text-ink transition-colors group-hover:text-accent">
            {title}
            {link && (
              <span className="ml-2 inline-block text-base text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                ↗
              </span>
            )}
          </h3>
          <span className="text-sm text-muted">{year}</span>
        </div>
        {highlight && (
          <p className="mt-1 text-xs font-medium tracking-[0.2em] text-accent uppercase">
            <T text={highlight} />
          </p>
        )}
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          <T text={description} />
        </p>
      </div>
    </div>
  );

  return (
    // Link wraps only the main content so article links never nest inside it.
    <div className="border-t border-faint pb-6">
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {main}
        </a>
      ) : (
        <Link href={`/projects/${projectSlug(title)}`}>{main}</Link>
      )}
      {articleLinks.length > 0 && (
        <div className="mt-3 ml-10 flex flex-col gap-1.5">
          {articleLinks.map(({ slug, title: articleTitle }) => (
            <p
              key={slug}
              className="text-xs tracking-[0.15em] text-muted uppercase"
            >
              <span className="text-accent">→</span>{" "}
              <T text={ui.readTheStory} />:{" "}
              <Link
                href={`/writing/${slug}`}
                className="link-slide font-serif text-sm tracking-normal text-ink normal-case italic hover:text-accent"
              >
                {articleTitle}
              </Link>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
