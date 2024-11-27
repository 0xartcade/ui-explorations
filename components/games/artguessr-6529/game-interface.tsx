"use client"

import { useState, useEffect } from 'react'
import { GuessingInterface } from './guessing-interface'
import { NFTImage } from './nft-image'
import { generateGameData } from '@/utils/game-utils'
import { GameData, NFTMetadata, Tag, Criteria, GameState } from '@/types/game-types'

export default function GameInterface() {
  const [gameData, setGameData] = useState<{nft: NFTMetadata, tags: Tag[]} | null>(null)
  const [gameState, setGameState] = useState<GameState>('playing')
  const [selectedTags, setSelectedTags] = useState<Record<Criteria, Tag | null>>({
    'TOTAL SUPPLY': null,
    'SEASON': null,
    'ARTIST NAME': null,
    'ART NAME': null,
  })

  useEffect(() => {
    fetch('https://noaskfrnx3lefz7r.public.blob.vercel-storage.com/6529-memes-1-302-ICCX18MmBs6NxwL2wMEwJr5xQfH5Bx.json')
      .then(res => res.json())
      .then((data: GameData) => {
        setGameData(generateGameData(data))
      })
  }, [])

  const handleTagClick = (tag: Tag) => {
    setSelectedTags((prev) => ({
      ...prev,
      [tag.criteria]: tag,
    }))
  }

  const handleSubmit = () => {
    if (gameState === 'playing') {
      setGameState('submitted')
    } else if (gameState === 'submitted') {
      setSelectedTags({
        'TOTAL SUPPLY': null,
        'SEASON': null,
        'ARTIST NAME': null,
        'ART NAME': null,
      })
      setGameData(null)
      setGameState('playing')
    }
  }

  const handleReset = (criteria: Criteria) => {
    if (!gameData) return;
    
    const tagToReset = selectedTags[criteria];
    if (tagToReset) {
      setSelectedTags((prev) => ({ ...prev, [criteria]: null }));
      setGameData({
        ...gameData,
        tags: [
          ...gameData.tags,
          tagToReset,
          ...gameData.tags.filter((tag) => tag.criteria === criteria && tag.id !== tagToReset.id)
        ]
      })
    }
  }

  const handleCriteriaClick = (criteria: Criteria) => {
    if (gameState === 'playing') {
      setSelectedTags((prev) => ({ ...prev, [criteria]: null }))
    }
  }

  return gameData ? (
    <>
      <NFTImage
        src={gameData.nft.image_url}
        alt={gameData.nft.questions.title}
      />
      <GuessingInterface
        tags={gameData.tags}
        selectedTags={selectedTags}
        gameState={gameState}
        onTagClick={handleTagClick}
        onReset={handleReset}
        onCriteriaClick={handleCriteriaClick}
        onSubmit={handleSubmit}
      />
    </>
  ) : (
    <div>Loading...</div>
  )
}
