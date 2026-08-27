import { ImageResponse } from "next/og";
import { OGImageContent } from "@/lib/og-image";

export const dynamic = "force-static";
export const alt = "Projects — Bruno Fevereiro";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OGImageContent eyebrow="Things I've built" heading="Projects" />,
    size,
  );
}
