import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain static export (out/) — required for S3 hosting, which has no
  // server to run Next's Image Optimization API. Vercel still serves this
  // fine; images just ship unoptimized on both targets now.
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
