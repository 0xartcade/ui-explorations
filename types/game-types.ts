export interface NFTMetadata {
  collection: string
  contract_address: string
  token_id: number
  questions: {
    title: string
    artist: string
    supply: number
    season: string
  }
  image_url: string
  blurhash: string
  predominant_color: string
}

export interface GameData {
  raw_data: NFTMetadata[]
  titles: string[]
  supplies: number[]
  artists: string[]
  seasons: string[]
}

export type Criteria = 'TOTAL SUPPLY' | 'SEASON' | 'ARTIST NAME' | 'ART NAME'

export interface Tag {
  id: string
  criteria: Criteria
  value: string
  isCorrect: boolean
}

export type GameState = 'playing' | 'submitted' | 'nextRound'
