import { ImageResponse } from "next/og";
import { OGImageContent } from "@/lib/og-image";

export const alt = "Writing — Bruno Fevereiro";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OGImageContent eyebrow="Notes & essays" heading="Writing" />,
    size,
  );
}
