import Image from "next/image";

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
          Welcome to the 0xArtcade App Preview. You can use this template to prototype and preview your game in mobile environment. This screen will disapear and your app will become full-screen when adding to the home screen on iOS and Android
        </p>
      </aside>
      <section 
        className="w-full md:w-1/2 flex items-center justify-center"
        data-testid="app-preview"
      >
        <div className="relative h-full w-full flex items-center justify-center">
          <div className="hidden md:flex w-[440px] h-[956px] bg-gray-800 rounded-lg shadow-lg items-center justify-center">
            <p className="text-white">Mobile App Preview</p>
          </div>
          <div className="md:hidden h-full w-full bg-gray-800 flex items-center justify-center">
            <p className="text-white">Mobile App Preview</p>
          </div>
        </div>
      </section>
    </main>
  );
}
