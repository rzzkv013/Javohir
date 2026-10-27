import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Javohir Abdurazzoqov | Frontend React & Next.js Dasturchi",
  description: "Javohir Abdurazzoqov — Next.js 14+ App Router, React.js, TypeScript va Tailwind CSS bo'yicha professional Frontend dasturchi. Farg'ona, O'zbekiston. Innovatsion va tezkor veb platformalar.",
  keywords: [
    "Javohir Abdurazzoqov",
    "Frontend Dasturchi",
    "Next.js Dasturchi",
    "React Dasturchi O'zbekiston",
    "Farg'ona Dasturchi",
    "Web Developer Uzbekistan",
    "TypeScript",
    "Tailwind CSS",
    "rzzkv013"
  ],
  authors: [{ name: "Javohir Abdurazzoqov", url: "https://github.com/rzzkv013" }],
  creator: "Javohir Abdurazzoqov",
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: "https://javohir-portfolio.uz",
    title: "Javohir Abdurazzoqov | Frontend React & Next.js Dasturchi",
    description: "Next.js 14+ va React bo'yicha interaktiv dasturchi portfoliosi. Toza kod, ajoyib animatsiyalar va zamonaviy arxitektura.",
    siteName: "Javohir Abdurazzoqov Portfolio",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#090d16",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="dark">
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
