import { GameData, NFTMetadata, Tag, Criteria } from '@/types/game-types'

export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export function generateGameData(gameData: GameData): { nft: NFTMetadata; tags: Tag[] } {
  const correctNFT = getRandomItem(gameData.raw_data)
  
  console.log('Correct NFT:', correctNFT)
  console.log('Available Titles:', gameData.titles)
  console.log('Available Artists:', gameData.artists)
  console.log('Available Supplies:', gameData.supplies)
  console.log('Available Seasons:', gameData.seasons)

  function getIncorrectOptions(correct: string | number, pool: (string | number)[]): (string | number)[] {
    return Array.from(new Set(
      pool.filter(item => item !== correct)
    ))
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
    { id: 'title-1', criteria: 'ART NAME' as Criteria, value: correctNFT.questions.title, isCorrect: true },
    ...titleOptions.map((value, i) => ({
      id: `title-${i + 2}`,
      criteria: 'ART NAME' as Criteria,
      value: String(value),
      isCorrect: false
    })),
    { id: 'artist-1', criteria: 'ARTIST NAME' as Criteria, value: correctNFT.questions.artist, isCorrect: true },
    ...artistOptions.map((value, i) => ({
      id: `artist-${i + 2}`,
      criteria: 'ARTIST NAME' as Criteria,
      value: String(value),
      isCorrect: false
    })),
    { id: 'supply-1', criteria: 'TOTAL SUPPLY' as Criteria, value: String(correctNFT.questions.supply), isCorrect: true },
    ...supplyOptions.map((value, i) => ({
      id: `supply-${i + 2}`,
      criteria: 'TOTAL SUPPLY' as Criteria,
      value: String(value),
      isCorrect: false
    })),
    { id: 'season-1', criteria: 'SEASON' as Criteria, value: formatSeason(correctNFT.questions.season), isCorrect: true },
    ...seasonOptions.map((value, i) => ({
      id: `season-${i + 2}`,
      criteria: 'SEASON' as Criteria,
      value: formatSeason(value),
      isCorrect: false
    }))
  ].sort(() => Math.random() - 0.5)

  return { nft: correctNFT, tags }
}