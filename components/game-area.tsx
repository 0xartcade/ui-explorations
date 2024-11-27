import { Card, CardContent } from "@/components/ui/card"
import { GAME_TYPES } from '@/config/game-registry'
import { ACTIVE_GAME } from '@/config/active-game'
import dynamic from 'next/dynamic'

export function GameArea() {
  const GameComponent = dynamic(() => import(`@/components/${GAME_TYPES[ACTIVE_GAME.type].path}`))

  return (
    <Card className="w-[375px] h-[812px] bg-black rounded-[60px] shadow-xl overflow-hidden border-2 border-gray-700 relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-gray-700 rounded-b-3xl"></div>
      <CardContent className="w-full h-full pt-8 pb-4 px-3 flex flex-col">
        <GameComponent />
      </CardContent>
    </Card>
  )
}

