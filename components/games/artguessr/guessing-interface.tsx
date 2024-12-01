"use client"

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { GAME_CONFIG, getQuestionColor } from './game-config'
import { Tag, Criteria, GameState } from '../../../types/game-types'

const HOVER_GRADIENT = `
  linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 50%,
    transparent 100%
  )
`

interface GuessingInterfaceProps {
  tags: Tag[]
  selectedTags: Record<Criteria, Tag | null>
  gameState: GameState
  onTagClick: (tag: Tag) => void
  onReset: (criteria: Criteria) => void
  onCriteriaClick: (criteria: Criteria) => void
}

const truncateText = (text: string, limit: number = 22) => {
  return text.length > limit ? text.slice(0, limit) + '...' : text;
};

const getTagStyle = (criteria: Criteria) => {
  const baseStyles = "px-3 py-1 rounded-full font-semibold relative overflow-hidden tag-button hover:scale-105 backdrop-blur-2xl border text-sm md:text-xs transition-all duration-300"
  
  const colors = {
    'TOTAL SUPPLY': 'bg-unicorn-pink/20 border-unicorn-pink text-unicorn-pink hover:bg-unicorn-pink/30',
    'SEASON': 'bg-unicorn-purple/20 border-unicorn-purple text-unicorn-purple hover:bg-unicorn-purple/30',
    'ARTIST NAME': 'bg-unicorn-blue/20 border-unicorn-blue text-unicorn-blue hover:bg-unicorn-blue/30',
    'ART NAME': 'bg-unicorn-yellow/20 border-unicorn-yellow text-unicorn-yellow hover:bg-unicorn-yellow/30'
  }

  return `${baseStyles} ${colors[criteria]}`
}

export function GuessingInterface({
  tags,
  selectedTags,
  gameState,
  onTagClick,
  onReset,
  onCriteriaClick,
}: GuessingInterfaceProps): JSX.Element {
  const [focusedCriteria, setFocusedCriteria] = useState<Criteria | null>(null);
  const randomizedTags = useMemo(() => 
    [...tags].sort(() => Math.random() - 0.5)
  , [tags]);

  const handleCriteriaClick = (criteria: Criteria) => {
    if (gameState === 'playing') {
      setFocusedCriteria(prev => prev === criteria ? null : criteria);
      onCriteriaClick(criteria);
    }
  }

  const visibleTags = useMemo(() => {
    if (!focusedCriteria) return randomizedTags;
    return randomizedTags.filter(tag => tag.criteria === focusedCriteria);
  }, [randomizedTags, focusedCriteria]);

  return (
    <div className="artcade-guessing-layout flex flex-col h-full">
      <div className="options-area glass-panel flex-1 min-h-0 flex flex-wrap content-center gap-1 justify-center overflow-y-aut p-3 mb-2">
        {gameState === 'submitted' ? (
          <div className="text-center text-white">
            <p className="text-xl font-bold mb-2">Your Score</p>
            <p className="text-3xl font-bold">
              {Object.values(selectedTags).filter((tag) => tag?.isCorrect).length} / {GAME_CONFIG.questions.length}
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {visibleTags.map((tag: Tag) => (
              (!selectedTags[tag.criteria]) && (
                <motion.button
                  key={tag.id}
                  className={getTagStyle(tag.criteria)}
                  style={{
                    color: getQuestionColor(tag.criteria),
                    borderColor: getQuestionColor(tag.criteria),
                    borderWidth: 1,
                  }}
                  whileHover={{
                    background: HOVER_GRADIENT,
                  }}
                  onClick={() => {
                    onTagClick(tag);
                    setFocusedCriteria(null);
                  }}
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                    transition: { duration: 0.2 }
                  }}
                >
                  {truncateText(tag.value)}
                </motion.button>
              )
            ))}
          </AnimatePresence>
        )}
      </div>
      <div className="answers-area glass-panel p-2">
        <div className="grid grid-cols-2 gap-1">
          {GAME_CONFIG.questions.map((question) => (
            <div
              key={question.id}
              id="answer-cells"
              className="h-8 rounded-xl border flex items-center justify-center overflow-hidden bg-tint-black/80 backdrop-blur-md"
              style={{
                borderColor: gameState === 'submitted' ? 'transparent' : question.color,
                borderWidth: 1,
              }}
              onClick={() => handleCriteriaClick(question.id as Criteria)}
            >
              <AnimatePresence mode="wait">
                {selectedTags[question.id] ? (
                  <motion.div
                    key={selectedTags[question.id]?.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="answer-text w-full h-full flex items-center justify-center px-2 py-1 rounded-lg text-xs md:text-xs font-semibold uppercase relative truncate"
                    style={{
                      backgroundColor: gameState === 'submitted'
                        ? selectedTags[question.id]?.isCorrect
                          ? 'rgba(34, 197, 94, 0.4)'
                          : 'rgba(239, 68, 68, 0.4)'
                        : question.color,
                      color: 'white',
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    {truncateText(selectedTags[question.id]?.value || '')}
                    {gameState === 'playing' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onReset(question.id as Criteria);
                        }}
                        className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center z-10 bg-black bg-opacity-50 rounded-full"
                        aria-label={`Reset ${question.label} selection`}
                      >
                        <X size={8} className="text-white" />
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key={`empty-${question.id}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="answer-text w-full h-full flex items-center justify-center"
                  >
                    <span
                      className="answer-text text-lg md:text-xs font-semibold opacity-1 text-center px-1 uppercase"
                      style={{ color: question.color }}
                    >
                      {question.label}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

