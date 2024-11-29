import { Card, CardContent } from "@/components/ui/card"
import { GAME_TYPES } from '@/config/game-registry'
import { ACTIVE_GAME } from '@/config/active-game'
import dynamic from 'next/dynamic'

export function GameArea() {
  const GameComponent = dynamic(() => import(`@/components/${GAME_TYPES[ACTIVE_GAME.type].path}`))

  return (
    <div className="w-full h-full">
      {/* Desktop preview with iPhone frame */}
      <div className="hidden md:flex md:items-center md:justify-center">
        <Card className="w-[375px] h-[812px] bg-black rounded-[60px] shadow-xl border-2 border-gray-700 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-gray-700 rounded-b-3xl z-50"></div>
          <CardContent className="w-full h-full pt-2 pb-2 px-2 flex flex-col">
            <div className="w-full h-full overflow-hidden rounded-[50px] rounded-b-[50px]">
              <GameComponent />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile view (full screen) */}
      <div className="block md:hidden w-full h-screen">
        <GameComponent />
      </div>
    </div>
  )
}

