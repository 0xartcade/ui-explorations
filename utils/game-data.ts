// Utility function for fetching game data based on the active game mode.
// Handles data retrieval from remote endpoints and provides type-safe responses.
// Returns empty data for template mode to support development and testing.
import { GameModeId, GAME_MODES } from '@/config/game-registry'
import { GameData } from '../components/games/game-template/game-types'
import { ACTIVE_GAME } from '@/config/active-game'

export async function fetchGameData(mode: GameModeId): Promise<GameData> {
  // Return empty data structure for template/development mode
  if (ACTIVE_GAME.type === 'template') {
    return { raw_data: [] }
  }
  
  // Fetch real game data from the configured endpoint
  const response = await fetch(GAME_MODES[mode].dataUrl)
  return response.json()
}