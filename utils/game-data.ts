import { GameModeId, GAME_MODES } from '@/config/game-registry'
import { GameData } from '../components/games/game-template/game-types'
import { ACTIVE_GAME } from '@/config/active-game'

export async function fetchGameData(mode: GameModeId): Promise<GameData> {
  // For template game, return empty data structure
  if (ACTIVE_GAME.type === 'template') {
    return { raw_data: [] }
  }
  
  const response = await fetch(GAME_MODES[mode].dataUrl)
  return response.json()
}