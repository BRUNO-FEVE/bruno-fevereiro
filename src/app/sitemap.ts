import type { MetadataRoute } from "next";
import { projects, projectSlug } from "@/data/projects";
import { getArticles } from "@/lib/writing";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/writing"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${SITE_URL}/projects/${projectSlug(project.title)}`,
    lastModified: new Date(),
  }));

  const articleRoutes = getArticles().map((article) => ({
    url: `${SITE_URL}/writing/${article.slug}`,
    lastModified: new Date(article.date),
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes];
}
