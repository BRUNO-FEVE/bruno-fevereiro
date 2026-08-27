import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const WRITING_DIR = path.join(process.cwd(), "content", "writing");

export type Article = {
  slug: string;
  title: string;
  date: string; // ISO date, e.g. "2026-07-10"
  summary: string;
  content: string;
};

export function getArticles(): Article[] {
  if (!fs.existsSync(WRITING_DIR)) return [];
  return fs
    .readdirSync(WRITING_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(WRITING_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        summary: data.summary ?? "",
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((article) => article.slug === slug);
}

/** Static params for /writing/[slug] and its opengraph/twitter image
    routes. `output: "export"` requires at least one generated param even
    when there are zero articles yet, so this falls back to a harmless
    placeholder slug in that case — getArticle() never matches it, so the
    page 404s and the OG images fall back to the generic card. Nothing
    ever links to it. */
export function getArticleSlugParams(): { slug: string }[] {
  const articles = getArticles();
  return articles.length > 0
    ? articles.map(({ slug }) => ({ slug }))
    : [{ slug: "_placeholder" }];
}

export type ArticleLink = {
  slug: string;
  title: string;
  date: string;
  summary: string;
};

/** Resolve a project's `articles` slugs to real article data (skips broken slugs). */
export function resolveArticleLinks(
  slugs: string[] | undefined,
  articles: Article[],
): ArticleLink[] {
  const bySlug = new Map(articles.map((a) => [a.slug, a]));
  return (slugs ?? []).flatMap((slug) => {
    const article = bySlug.get(slug);
    return article
      ? [
          {
            slug,
            title: article.title,
            date: article.date,
            summary: article.summary,
          },
        ]
      : [];
  });
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
