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
  viewportFit: "cover",
  themeColor: "#000000"
};

function ServiceWorkerRegister() {
  return (
    <>
      <script
        id="register-worker"
        dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                  console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                  console.error('Service Worker registration failed:', error);
                });
            }
          `,
        }}
      />
      <script
        id="pwa-install-prompt"
        dangerouslySetInnerHTML={{
          __html: `
            let deferredPrompt;
            window.addEventListener('beforeinstallprompt', (e) => {
              console.log('👋 Install prompt event fired');
              // Prevent Chrome 67 and earlier from automatically showing the prompt
              e.preventDefault();
              // Stash the event so it can be triggered later
              deferredPrompt = e;
              
              // For testing, trigger prompt after 3 seconds
              if (window.location.hostname === 'localhost') {
                setTimeout(() => {
                  console.log('🚀 Triggering install prompt...');
                  deferredPrompt.prompt();
                  deferredPrompt.userChoice.then((choiceResult) => {
                    console.log('👉 User choice:', choiceResult.outcome);
                    if (choiceResult.outcome === 'accepted') {
                      console.log('✅ User accepted the install prompt');
                    }
                    deferredPrompt = null;
                  });
                }, 3000);
              }
            });

            // Log when PWA is successfully installed
            window.addEventListener('appinstalled', (evt) => {
              console.log('🎉 Application installed successfully');
            });
          `,
        }}
      />
    </>
  );
}

export const metadata: Metadata = {
  title: "0xArtcade",
  description: "0xArtcade Game Sandbox",
  manifest: "/manifest.json",
  icons: {
    apple: [
      { url: "/icons/0xArtcade-icon-lg.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/0xArtcade-icon-sm.png", sizes: "512x512", type: "image/png" }
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "0xArtcade",
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
        <ServiceWorkerRegister />
      </head>
      <body className="font-sans bg-black text-white min-h-[-webkit-fill-available] overflow-y-auto">
        <div className="game-layout pwa-safe-area overflow-y-auto">
          {children}
        </div>
      </body>
    </html>
  )
}
