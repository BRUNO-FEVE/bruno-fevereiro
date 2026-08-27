import Link from "next/link";
import type { Metadata } from "next";
import { Reveal, RevealList, RevealItem } from "@/components/Reveal";
import { getArticles, formatDate } from "@/lib/writing";
import { T } from "@/lib/i18n";
import { ui } from "@/lib/dict";

export const metadata: Metadata = {
  title: "Writing",
  description: "Articles and notes by Bruno Fevereiro.",
};

export default function WritingPage() {
  const articles = getArticles();

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
          <span className="text-accent">—</span> <T text={ui.writingOverline} />
        </p>
        <h1 className="font-serif text-5xl font-medium tracking-tight text-ink uppercase">
          <T text={ui.writingTitle} />
        </h1>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          <T text={ui.writingDesc} />
        </p>
      </Reveal>

      <RevealList className="mt-16">
        {articles.map((article) => (
          <RevealItem key={article.slug}>
            <Link
              href={`/writing/${article.slug}`}
              className="group block border-t border-faint py-7"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="font-serif text-2xl text-ink transition-colors group-hover:text-accent">
                  {article.title}
                </h2>
                <time className="shrink-0 text-sm text-muted">
                  {formatDate(article.date)}
                </time>
              </div>
              {article.summary && (
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                  {article.summary}
                </p>
              )}
            </Link>
          </RevealItem>
        ))}
      </RevealList>
    </div>
  );
}
