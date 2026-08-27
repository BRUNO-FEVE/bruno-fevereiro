import { ImageResponse } from "next/og";
import { OGImageContent } from "@/lib/og-image";
import { getArticle, getArticles, formatDate } from "@/lib/writing";

export const alt = "Bruno Fevereiro — article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getArticles().map(({ slug }) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  return new ImageResponse(
    <OGImageContent
      eyebrow={article ? formatDate(article.date) : undefined}
      heading={article?.title ?? "Bruno Fevereiro"}
    />,
    size,
  );
}
