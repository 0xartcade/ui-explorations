import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "0xArtcade",
  description: "0xArtcade Game Sandbox",
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'viewport-fit': 'cover'
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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <title>{appName}</title>
      </head>
      <body className="bg-black min-h-screen font-sans">
        <div className="ios-status-bar-background" />
        <div className="game-layout flex flex-col h-full">
          {children}
        </div>
      </body>
    </html>
  )
}
