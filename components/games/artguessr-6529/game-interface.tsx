"use client"

import { useState, useEffect } from 'react'
import { GuessingInterface } from './guessing-interface'
import { NFTImage } from './nft-image'
import { generateGameData } from '@/utils/game-utils'
import { fetchGameData } from '@/utils/game-data'
import { ACTIVE_GAME } from '@/config/active-game'
import { GameData, NFTMetadata, Tag, Criteria, GameState } from '@/types/game-types'
import { GAME_CONFIG } from './game-config'

export default function GameInterface() {
  const [gameData, setGameData] = useState<{nft: NFTMetadata, tags: Tag[]} | null>(null)
  const [gameState, setGameState] = useState<GameState>('playing')
  const [selectedTags, setSelectedTags] = useState<Record<Criteria, Tag | null>>(
    Object.fromEntries(
      GAME_CONFIG.questions.map(q => [q.id, null])
    ) as Record<Criteria, Tag | null>
  )

  useEffect(() => {
    fetchGameData(ACTIVE_GAME.mode)
      .then((data: GameData) => {
        setGameData(generateGameData(data))
      })
      .catch(error => {
        console.error('Failed to fetch game data:', error)
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
      setGameState('submitted');
    } else {
      setSelectedTags(
        Object.fromEntries(
          GAME_CONFIG.questions.map(q => [q.id, null])
        ) as Record<Criteria, Tag | null>
      );
      
      fetchGameData(ACTIVE_GAME.mode)
        .then((data: GameData) => {
          setGameData(generateGameData(data));
          setGameState('playing');
        });
    }
  };

  const handleReset = (criteria: Criteria) => {
    if (!gameData) return;
    
    const tagToReset = selectedTags[criteria];
    if (tagToReset) {
      setSelectedTags((prev) => ({ ...prev, [criteria]: null }));
      
      setGameData((prevGameData) => {
        if (!prevGameData) return null;
        return {
          ...prevGameData,
          tags: prevGameData.tags
        };
      });
    }
  };

  const handleCriteriaClick = (criteria: Criteria) => {
    if (gameState === 'playing') {
      setSelectedTags((prev) => ({ ...prev, [criteria]: null }))
    }
  }

  return gameData ? (
    <div className="flex flex-col h-full">
      <div className="w-full h-[50%]">
        <NFTImage
          src={gameData.nft.image_url}
          alt={gameData.nft.questions.title}
        />
      </div>
      <div className="flex-1 px-2 md:px-3 flex flex-col">
        <GuessingInterface
          tags={gameData.tags}
          selectedTags={selectedTags}
          gameState={gameState}
          onTagClick={handleTagClick}
          onReset={handleReset}
          onCriteriaClick={handleCriteriaClick}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-full text-white/70">Loading...</div>
  )
}

