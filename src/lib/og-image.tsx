// Shared visual for every opengraph-image.tsx / twitter-image.tsx in the app.
// Kept font-agnostic (no custom font loading) since these are generated
// statically at build time via satori, which only ships a default sans fallback.
export function OGImageContent({
  eyebrow,
  heading,
  subtitle,
}: {
  eyebrow?: string;
  heading: string;
  subtitle?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "80px",
        backgroundColor: "#0a0a0a",
        color: "#f2f2f2",
      }}
    >
      <div style={{ display: "flex", fontSize: 32, letterSpacing: 6 }}>
        BF
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {eyebrow && (
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#8c8c8c",
            }}
          >
            {eyebrow}
          </div>
        )}
        <div
          style={{
            display: "flex",
            fontSize: 66,
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: "uppercase",
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          {heading}
        </div>
        <div style={{ display: "flex", gap: 20, fontSize: 30 }}>
          {subtitle ?? (
            <>
              <span style={{ display: "flex", color: "#8c8c8c" }}>
                Bruno Fevereiro
              </span>
              <span style={{ display: "flex", color: "#ff2e2e" }}>
                Software Engineer
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
