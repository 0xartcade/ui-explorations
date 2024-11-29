"use client"

import { useState, useEffect } from 'react'
import { GuessingInterface } from './guessing-interface'
import { NFTImage } from './nft-image'
import { ActionButton } from './action-button'
import { generateGameData } from './game-utils'
import { fetchGameData } from '@/utils/game-data'
import { ACTIVE_GAME } from '@/config/active-game'
import { GameData, NFTMetadata, Tag, Criteria, GameState } from '../../../types/game-types'
import { GAME_CONFIG } from './game-config'
import { ActionWrapper } from './action-wrapper'

export default function GameInterface() {
  const [gameData, setGameData] = useState<{nft: NFTMetadata, tags: Tag[]} | null>(null)
  const [gameState, setGameState] = useState<GameState>('playing')
  const [selectedTags, setSelectedTags] = useState<Record<Criteria, Tag | null>>(
    Object.fromEntries(
      GAME_CONFIG.questions.map(q => [q.id, null])
    ) as Record<Criteria, Tag | null>
  )
  const [dominantColor, setDominantColor] = useState<string>('#00FF00');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    fetchGameData(ACTIVE_GAME.mode)
      .then((rawData) => {
        const data: GameData = {
          raw_data: rawData.raw_data,
          titles: [],
          supplies: [],
          artists: [],
          seasons: []
        };
        setGameData(generateGameData(data))
      })
      .catch(error => {
        console.error('Failed to fetch game data:', error)
      })
  }, [])

  useEffect(() => {
    if (gameData?.nft.predominant_color) {
      setDominantColor(gameData.nft.predominant_color);
    }
  }, [gameData]);

  const handleTagClick = (tag: Tag) => {
    setSelectedTags((prev) => ({
      ...prev,
      [tag.criteria]: tag,
    }))
    const questionColor = GAME_CONFIG.questions.find(q => q.id === tag.criteria)?.color ?? null;
    setSelectedColor(questionColor);
    
    setTimeout(() => {
      setSelectedColor(null);
    }, 1500);
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
        .then((rawData) => {
          const data: GameData = {
            raw_data: rawData.raw_data,
            titles: [],
            supplies: [],
            artists: [],
            seasons: []
          };
          setGameData(generateGameData(data))
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
    <ActionWrapper 
      color={dominantColor}
      selectedColor={selectedColor}
      isPulsing={true}
      blurhash={gameData.nft.blurhash}
      imageUrl={gameData.nft.image_url}
    >
      <div className="game-layout flex flex-col h-screen max-h-screen overflow-hidden md:rounded-3xl backdrop-blur-md mb-1"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0)',
          paddingBottom: 'env(safe-area-inset-bottom)'
        }}>
          
        {/* IMAGE CONTAINER */}
        <div className="relative w-full h-[45%] overflow-hidden">
          <div className="absolute inset-0 md:rounded-2xl overflow-hidden" style={{ top: '15px' }}>
            <NFTImage
              src={gameData.nft.image_url}
              alt={gameData.nft.questions.title}
            />
          </div>
        </div>

        {/* GUESS CONTAINER */}
        <div className="guess-container flex-1 min-h-0 px-1 py-2 flex flex-col rounded-xl" 
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0)',
          }}>
          <GuessingInterface
            tags={gameData.tags}
            selectedTags={selectedTags}
            gameState={gameState}
            onTagClick={handleTagClick}
            onReset={handleReset}
            onCriteriaClick={handleCriteriaClick}
          />
        </div>

        {/* ACTION CONTAINER */}
        <div className="action-container h-22 px-2 mt-auto pb-[1px]">
          <ActionButton
            gameState={gameState}
            onClick={handleSubmit}
            disabled={gameState === 'playing' && Object.values(selectedTags).some((value) => value === null)}
          />
        </div>
      </div>
    </ActionWrapper>
  ) : null;
}

