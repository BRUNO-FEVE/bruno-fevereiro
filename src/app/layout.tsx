import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IntroProvider } from "@/components/Intro";
import { NavigationTracker } from "@/components/NavigationTracker";
import { LanguageProvider } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { getArticles } from "@/lib/writing";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const description =
  "Personal site of Bruno Fevereiro, a full-stack software engineer building multi-agent AI systems, scalable APIs, and front-end platforms. Projects, writing, and things in between.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Portfólio",
    template: "%s · Bruno Fevereiro",
  },
  description,
  openGraph: {
    title: "Bruno Fevereiro",
    description,
    url: SITE_URL,
    siteName: "Bruno Fevereiro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bruno Fevereiro",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasArticles = getArticles().length > 0;
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NavigationTracker />
        <LanguageProvider>
          <IntroProvider>
            <Header hasArticles={hasArticles} />
            <main className="w-full flex-1">{children}</main>
            <Footer />
          </IntroProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
