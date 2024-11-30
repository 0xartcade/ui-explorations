"use client"

import { useState, useEffect } from 'react'
import { GuessingInterface } from './guessing-interface'
import { NFTImage } from './nft-image'
import { ActionButton } from './action-button'
import { generateGameData } from './game-utils'
import { fetchGameData } from '@/utils/game-data'
import { ACTIVE_GAME } from '@/config/active-game'
import { GameData as TemplateGameData } from '../game-template/game-types'
import { GameData, NFTMetadata, Tag, Criteria, GameState } from '@/types/game-types'
import { GAME_CONFIG } from './game-config'
import { ActionWrapper } from './action-wrapper'
import Head from 'next/head'

function transformToFullGameData(data: TemplateGameData): GameData {
  const titles = [...new Set(data.raw_data.map(nft => nft.questions.title))]
  const supplies = [...new Set(data.raw_data.map(nft => nft.questions.supply))]
  const artists = [...new Set(data.raw_data.map(nft => nft.questions.artist))]
  const seasons = [...new Set(data.raw_data.map(nft => nft.questions.season))]

  return {
    raw_data: data.raw_data,
    titles,
    supplies,
    artists,
    seasons
  }
}

export default function GameInterface() {
  const [gameData, setGameData] = useState<GameData | null>(null)
  const [gameState, setGameState] = useState<GameState>('playing')
  const [selectedTags, setSelectedTags] = useState<Record<Criteria, Tag | null>>({
    'TOTAL SUPPLY': null,
    'SEASON': null,
    'ARTIST NAME': null,
    'ART NAME': null
  })
  const [dominantColor, setDominantColor] = useState<string>('#00FF00');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    fetchGameData(ACTIVE_GAME.mode)
      .then((data: TemplateGameData) => {
        const fullData = transformToFullGameData(data)
        setGameData(generateGameData(fullData))
      })
      .catch((error: Error) => {
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
        .then((data: TemplateGameData) => {
          const fullData = transformToFullGameData(data)
          setGameData(generateGameData(fullData))
          setGameState('playing');
        })
        .catch((error: Error) => {
          console.error('Failed to fetch game data:', error)
        })
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
    <>
      <Head>
        <meta 
          name="theme-color" 
          content="transparent" 
        />
        <meta 
          name="apple-mobile-web-app-status-bar-style" 
          content="transparent" 
        />
      </Head>
      <ActionWrapper 
        color={dominantColor}
        selectedColor={selectedColor}
        isPulsing={true}
        blurhash={gameData.nft.blurhash}
        imageUrl={gameData.nft.image_url}
        gameState={gameState}
        score={
          gameState === 'submitted' 
            ? {
                correct: Object.values(selectedTags).filter((tag) => tag?.isCorrect).length,
                total: GAME_CONFIG.questions.length,
                answers: GAME_CONFIG.questions.map(question => 
                  selectedTags[question.id]?.isCorrect ?? false
                )
              }
            : undefined
        }
      >
        <div className="game-layout flex flex-col h-full">
          {/* IMAGE CONTAINER */}
          <div className="image-area glass-panel relative w-full h-[45%] overflow-hiddenmt-2 md:mt-0">
            <div className="absolute inset-1 md:rounded-2xl overflow-hidden">
              <NFTImage
                src={gameData.nft.image_url}
                alt={gameData.nft.questions.title}
              />
            </div>
          </div>

          {/* GUESS CONTAINER */}
          <div className="guess-container flex-1 flex flex-col pt-2 min-h-0 overflow-hidden"> 
            <GuessingInterface
              tags={gameData.tags}
              selectedTags={selectedTags}
              gameState={gameState}
              onTagClick={handleTagClick}
              onReset={handleReset}
              onCriteriaClick={handleCriteriaClick}
            />
          </div>

          {/* ACTION CONTAINER - adjusted margins and background */}
          <div className="action-container bg-transparent px-2 py-2 backdrop-blur-sm">
            <ActionButton
              gameState={gameState}
              onClick={handleSubmit}
              disabled={gameState === 'playing' && Object.values(selectedTags).some((value) => value === null)}
            />
          </div>
        </div>
      </ActionWrapper>
    </>
  ) : null;
}

