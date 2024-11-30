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
  console.log('Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL
  });

  const appName = process.env.NODE_ENV === 'development'
    ? '0xArtcade (Local)'
    : process.env.VERCEL_ENV === 'production'
    ? '0xArtcade'
    : `0xArtcade (${process.env.VERCEL_GIT_COMMIT_REF || 'Preview'})`

  return (
    <html lang="en" className={`bg-black ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <title>{appName}</title>
        <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
        <link rel="icon" href="/0xArtcade-icon-lg.png" />
        <link rel="apple-touch-icon" href="/0xArtcade-icon-lg.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-sans bg-black text-white min-h-[-webkit-fill-available] overflow-y-auto">
        <div className="game-layout pwa-safe-area overflow-y-auto">
          {children}
        </div>
      </body>
    </html>
  )
}
