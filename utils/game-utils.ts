import { GameData, NFTMetadata, Tag, Criteria } from '@/types/game-types'

export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export function generateGameData(gameData: GameData): { nft: NFTMetadata; tags: Tag[] } {
  const correctNFT = getRandomItem(gameData.raw_data)
  const timestamp = Date.now()
  
  function getIncorrectOptions(correct: string | number, pool: (string | number)[]): (string | number)[] {
    const incorrectPool = pool.filter(item => String(item) !== String(correct))
    return incorrectPool
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
  }

  function formatSeason(season: string | number): string {
    return `Season ${season}`
  }

  const titleOptions = getIncorrectOptions(correctNFT.questions.title, gameData.titles)
  const artistOptions = getIncorrectOptions(correctNFT.questions.artist, gameData.artists)
  const supplyOptions = getIncorrectOptions(correctNFT.questions.supply, gameData.supplies)
  const seasonOptions = getIncorrectOptions(correctNFT.questions.season, gameData.seasons)

  const tags: Tag[] = [
    // Correct options
    { 
      id: `art-correct-${timestamp}`, 
      criteria: 'ART NAME' as Criteria, 
      value: correctNFT.questions.title, 
      isCorrect: true 
    },
    { 
      id: `artist-correct-${timestamp}`, 
      criteria: 'ARTIST NAME' as Criteria, 
      value: correctNFT.questions.artist, 
      isCorrect: true 
    },
    { 
      id: `supply-correct-${timestamp}`, 
      criteria: 'TOTAL SUPPLY' as Criteria, 
      value: String(correctNFT.questions.supply), 
      isCorrect: true 
    },
    { 
      id: `season-correct-${timestamp}`, 
      criteria: 'SEASON' as Criteria, 
      value: formatSeason(correctNFT.questions.season), 
      isCorrect: true 
    },
    // Incorrect options
    ...titleOptions.map((value, i) => ({
      id: `art-${i}-${timestamp}`,
      criteria: 'ART NAME' as Criteria,
      value: String(value),
      isCorrect: false
    })),
    ...artistOptions.map((value, i) => ({
      id: `artist-${i}-${timestamp}`,
      criteria: 'ARTIST NAME' as Criteria,
      value: String(value),
      isCorrect: false
    })),
    ...supplyOptions.map((value, i) => ({
      id: `supply-${i}-${timestamp}`,
      criteria: 'TOTAL SUPPLY' as Criteria,
      value: String(value),
      isCorrect: false
    })),
    ...seasonOptions.map((value, i) => ({
      id: `season-${i}-${timestamp}`,
      criteria: 'SEASON' as Criteria,
      value: formatSeason(value),
      isCorrect: false
    }))
  ].sort(() => Math.random() - 0.5);

  return { nft: correctNFT, tags };
}