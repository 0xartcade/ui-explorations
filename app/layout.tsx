import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "0xArtcade",
  description: "0xArtcade Game Sandbox",
  manifest: "/manifest.json" as string | undefined,
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'viewport-fit': 'cover',
    'mobile-web-app-capable': 'yes'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const appName = process.env.NODE_ENV === 'development'
    ? '0xArtcade (Local)'
    : process.env.VERCEL_ENV === 'production'
    ? '0xArtcade'
    : `0xArtcade (${process.env.VERCEL_GIT_COMMIT_REF || 'Preview'})`

  return (
    <html lang="en" className={`bg-black ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <title>{appName}</title>
      </head>
      <body className="font-sans bg-black text-white min-h-[-webkit-fill-available] overflow-y-auto">
        <div className="game-layout pwa-safe-area overflow-y-auto">
          {children}
        </div>
      </body>
    </html>
  )
}
