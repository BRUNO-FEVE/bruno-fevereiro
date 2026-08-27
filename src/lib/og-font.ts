// Fetches the real Newsreader italic font for use in generated icons/OG
// images (next/og's ImageResponse doesn't pick up next/font automatically).
// An older Chrome UA makes Google Fonts serve a plain TTF instead of WOFF2,
// which satori (the renderer behind ImageResponse) can parse.
let cached: ArrayBuffer | null = null;

export async function getNewsreaderItalicFont(): Promise<ArrayBuffer> {
  if (cached) return cached;

  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@1,400&display=swap",
    {
      headers: {
        // Old enough that Google Fonts skips WOFF/WOFF2 and unicode-range
        // subsetting entirely, serving one plain .ttf @font-face block.
        "User-Agent":
          "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
      },
    },
  ).then((res) => res.text());

  const fontUrl = css.match(/src: url\(([^)]+)\)/)?.[1];
  if (!fontUrl) throw new Error("Could not resolve Newsreader font URL");

  const font = await fetch(fontUrl).then((res) => res.arrayBuffer());
  cached = font;
  return font;
}
