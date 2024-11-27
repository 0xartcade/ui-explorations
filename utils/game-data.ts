import { GameModeId, GAME_MODES } from '@/config/game-registry'
import { GameData } from '@/types/game-types'

export async function fetchGameData(mode: GameModeId): Promise<GameData> {
  const response = await fetch(GAME_MODES[mode].dataUrl)
  return response.json()
}