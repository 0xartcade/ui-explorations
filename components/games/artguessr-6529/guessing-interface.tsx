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

export function GuessingInterface({
  tags,
  selectedTags,
  gameState,
  onTagClick,
  onReset,
  onCriteriaClick,
}: GuessingInterfaceProps) {
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
    <div className="guessing-layout flex-grow flex flex-col relative py-0.5" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
      <div className="tags-container flex-1 flex flex-wrap content-center gap-1.5 justify-center overflow-y-auto mb-0.5 px-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
        {gameState === 'submitted' ? (
          <div className="text-center text-white">
            <p className="text-xl font-bold mb-2">Your Score</p>
            <p className="text-3xl font-bold">
              {Object.values(selectedTags).filter((tag) => tag?.isCorrect).length} / {GAME_CONFIG.questions.length}
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {visibleTags.map((tag) => (
              (!selectedTags[tag.criteria]) && (
                <motion.button
                  key={tag.id}
                  className="px-2 py-1 rounded-full text-xs font-semibold relative overflow-hidden tag-button hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    color: getQuestionColor(tag.criteria),
                    borderColor: getQuestionColor(tag.criteria),
                    borderWidth: 1,
                    transition: 'all 0.2s ease',
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
                  {tag.value}
                </motion.button>
              )
            ))}
          </AnimatePresence>
        )}
      </div>
      <div className="answer-grid grid grid-cols-2 gap-1 mt-auto">
        {GAME_CONFIG.questions.map((question) => (
          <div
            key={question.id}
            className="answer-cell h-8 rounded-full border flex items-center justify-center overflow-hidden transition-colors duration-200 relative"
            style={{
              borderColor: question.color,
              backgroundColor: selectedTags[question.id]
                ? question.color
                : 'rgba(0, 0, 0, 0.9)',
              borderWidth: gameState === 'submitted' ? 2 : 1,
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
                  className="w-full h-full flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold uppercase relative"
                  style={{
                    backgroundColor: gameState === 'submitted'
                      ? selectedTags[question.id]?.isCorrect
                        ? `${question.color}BF`
                        : '#FF0000BF'
                      : question.color,
                    color: 'white',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  {selectedTags[question.id]?.value}
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
                  className="w-full h-full flex items-center justify-center"
                >
                  <span
                    className="text-xs font-semibold opacity-70 text-center px-1 uppercase"
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
  )
}

