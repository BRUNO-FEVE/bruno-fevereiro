import { ImageResponse } from "next/og";
import { OGImageContent } from "@/lib/og-image";
import { projects, projectSlug } from "@/data/projects";

export const dynamic = "force-static";
export const alt = "Bruno Fevereiro — project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: projectSlug(project.title) }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => projectSlug(p.title) === slug);

  return new ImageResponse(
    <OGImageContent
      eyebrow={project ? `${project.year} · ${project.role.en}` : undefined}
      heading={project?.title ?? "Bruno Fevereiro"}
    />,
    size,
  );
}
