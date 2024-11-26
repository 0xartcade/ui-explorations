import Image from "next/image";
import { GameArea } from "@/components/game-area";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-black">
      <aside 
        className="hidden md:flex md:w-1/2 items-center justify-center flex-col gap-8 p-8"
        data-testid="app-information"
      >
        <Image
          src="/0xartcade_logo_type.png"
          alt="0xartcade logo"
          width={600}
          height={200}
          priority
        />
        <p className="text-white text-center max-w-md">
          Welcome to the 0xArtcade Game Sandbox. You can use this sandbox to prototype and preview your game in mobile environment. This screen will disapear and your app will become full-screen when adding to the home screen on iOS and Android
        </p>
      </aside>
      <section 
        className="w-full md:w-1/2 flex items-center justify-center"
        data-testid="app-preview"
      >
        <div className="relative h-full w-full flex items-center justify-center">
          {/* Desktop preview with iPhone frame */}
          <div className="hidden md:block">
            <GameArea>
              <div className="flex items-center justify-center h-full">
                <p className="text-white">0xArtcade Game Sandbox - Desktop Emulator</p>
              </div>
            </GameArea>
          </div>
          {/* Mobile view (full screen) */}
          <div className="md:hidden h-full w-full bg-gray-800 flex items-center justify-center">
            <p className="text-white">0xArtcade Game Sandbox - Mobile Emulator</p>
          </div>
        </div>
      </section>
    </main>
  );
}
