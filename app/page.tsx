import Image from "next/image";
import { GameArea } from "@/components/game-area";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-black artcade-main">
      {/* Information Sidebar */}
      <aside 
        className="hidden md:flex md:w-1/2 flex-col items-center justify-center space-y-8 p-8 artcade-sidebar"
        data-testid="app-information"
      >
        <Image
          src="/0xartcade_logo_type.png"
          alt="0xartcade logo"
          width={600}
          height={200}
          priority
          className="w-auto h-auto artcade-logo"
        />
        <div className="space-y-4 text-center artcade-info">
          <h1 className="text-white text-2xl font-semibold artcade-title">
            Welcome to the 0xArtcade Game Sandbox
          </h1>
          <p className="text-white/80 text-base max-w-md leading-relaxed artcade-description">
            You can use this sandbox to prototype and preview your game in mobile environment. 
            This screen will disappear and your app will become full-screen when adding to the 
            home screen on iOS and Android.
          </p>
        </div>
      </aside>

      {/* Game Preview Section */}
      <section 
        className="w-full md:w-1/2 flex items-center justify-center artcade-preview-section"
        data-testid="app-preview"
      >
        <div className="relative h-full w-full flex items-center justify-center">
          {/* Desktop preview with iPhone frame */}
          <div className="hidden md:block">
            <GameArea />
          </div>

          {/* Mobile view (full screen) */}
          <div className="md:hidden h-full w-full bg-gray-950">
            <GameArea />
          </div>
        </div>
      </section>
    </main>
  );
}
