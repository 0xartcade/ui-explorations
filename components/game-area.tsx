import { Card, CardContent } from "@/components/ui/card"
import { GameTemplate } from "./games/game-template"

export function GameArea() {
  return (
    <Card className="w-[375px] h-[812px] bg-black rounded-[60px] shadow-xl overflow-hidden border-4 border-gray-700 relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-gray-700 rounded-b-3xl"></div>
      <CardContent className="w-full h-full pt-10 pb-4 px-4 flex flex-col">
        <GameTemplate />
      </CardContent>
    </Card>
  )
}

