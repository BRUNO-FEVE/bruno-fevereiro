import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { Reveal } from "@/components/Reveal";
import { BackLink } from "@/components/BackLink";
import { getArticle, getArticleSlugParams, formatDate } from "@/lib/writing";
import { mdxOptions, mdxComponents } from "@/lib/mdx";
import { projectForArticle, projectSlug } from "@/data/projects";
import { T } from "@/lib/i18n";
import { ui } from "@/lib/dict";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getArticleSlugParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.summary };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const project = projectForArticle(slug);

  return (
    <article className="mx-auto w-full max-w-2xl px-6 pb-12">
      <Reveal>
        <BackLink
          href="/writing"
          className="link-slide text-sm text-muted hover:text-ink"
        >
          <T text={ui.backToWriting} />
        </BackLink>
        <div className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm tracking-widest text-muted uppercase">
          <time>{formatDate(article.date)}</time>
          {project && (
            <>
              <span aria-hidden>·</span>
              <Link
                href={`/projects/${projectSlug(project.title)}`}
                className="link-slide hover:text-ink"
              >
                <T text={ui.aboutThisProject} />: {project.title} →
              </Link>
            </>
          )}
        </div>
        <h1 className="mt-4 font-serif text-4xl leading-[1.15] font-medium tracking-tight text-ink sm:text-[2.75rem]">
          {article.title}
        </h1>
        {article.summary && (
          <p className="mt-5 font-serif text-xl leading-relaxed text-muted italic">
            {article.summary}
          </p>
        )}
      </Reveal>

      <Reveal delay={0.15}>
        <div className="prose mt-14">
          <MDXRemote
            source={article.content}
            options={mdxOptions}
            components={mdxComponents}
          />
        </div>
      </Reveal>
    </article>
  );
}
