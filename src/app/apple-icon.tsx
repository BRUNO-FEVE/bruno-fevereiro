import { ImageResponse } from "next/og";
import { getNewsreaderItalicFont } from "@/lib/og-font";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const fontData = await getNewsreaderItalicFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ff2e2e",
          color: "#f2f2f2",
          fontSize: 115,
          fontFamily: "Newsreader",
        }}
      >
        BF
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Newsreader", data: fontData, style: "italic", weight: 400 }],
    },
  );
}
