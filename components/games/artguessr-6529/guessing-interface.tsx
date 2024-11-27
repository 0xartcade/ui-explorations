import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { ActionButton } from './action-button'
import { Tag, Criteria, GameState } from '@/types/game-types'

const criteriaLabels: Record<Criteria, string> = {
  'TOTAL SUPPLY': 'Total Supply',
  'SEASON': 'Season',
  'ARTIST NAME': 'Artist Name',
  'ART NAME': 'Art Name'
}

const criteriaColors: Record<Criteria, string> = {
  'TOTAL SUPPLY': '#4CAF50',  // Green
  'SEASON': '#2196F3',        // Blue
  'ARTIST NAME': '#FF9800',   // Orange
  'ART NAME': '#E91E63'       // Pink
}

const tagStyle = {
  fontFamily: 'var(--font-geist-sans)',
  letterSpacing: '0.02em'
}

interface GuessingInterfaceProps {
  tags: Tag[]
  selectedTags: Record<Criteria, Tag | null>
  gameState: GameState
  onTagClick: (tag: Tag) => void
  onReset: (criteria: Criteria) => void
  onCriteriaClick: (criteria: Criteria) => void
  onSubmit: () => void
}

export function GuessingInterface({
  tags,
  selectedTags,
  gameState,
  onTagClick,
  onReset,
  onCriteriaClick,
  onSubmit,
}: GuessingInterfaceProps) {
  const [focusedCriteria, setFocusedCriteria] = useState<Criteria | null>(null)

  console.log('Rendering GuessingInterface:', {
    tags,
    selectedTags,
    gameState,
    focusedCriteria
  })

  const handleCriteriaClick = (criteria: Criteria) => {
    if (gameState === 'playing') {
      if (focusedCriteria === criteria) {
        setFocusedCriteria(null)
      } else {
        setFocusedCriteria(criteria)
      }
      onCriteriaClick(criteria)
    }
  }

  return (
    <div className="flex-grow flex flex-col relative pt-4 pb-2">
      <div className="flex-1 flex flex-wrap content-center gap-2 justify-center overflow-hidden mb-4">
        {gameState === 'submitted' ? (
          <div className="text-center text-white">
            <p className="text-xl font-bold mb-2">Your Score</p>
            <p className="text-3xl font-bold">
              {Object.values(selectedTags).filter((tag) => tag?.isCorrect).length} / 4
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {tags.map((tag) => (
              (!selectedTags[tag.criteria] && (focusedCriteria === null || focusedCriteria === tag.criteria)) && (
                <motion.button
                  key={tag.id}
                  className="px-3 py-1.5 rounded-full text-xs font-medium relative overflow-hidden tag-button hover:scale-105"
                  style={{
                    backgroundColor: 'black',
                    color: criteriaColors[tag.criteria],
                    borderColor: criteriaColors[tag.criteria],
                    borderWidth: 1,
                    transition: 'all 0.2s ease',
                    ...tagStyle
                  }}
                  onClick={() => onTagClick(tag)}
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
      <div className="grid grid-cols-2 gap-2 mb-2">
        {(Object.keys(selectedTags) as Criteria[]).map((criteria) => (
          <div
            key={criteria}
            className="h-8 rounded-full border flex items-center justify-center overflow-hidden transition-colors duration-200 relative"
            style={{
              borderColor: criteriaColors[criteria],
              backgroundColor: selectedTags[criteria]
                ? criteriaColors[criteria]
                : 'rgba(0, 0, 0, 0.5)',
              borderWidth: gameState === 'submitted' ? 2 : 1,
            }}
            onClick={() => handleCriteriaClick(criteria)}
          >
            <AnimatePresence mode="wait">
              {selectedTags[criteria] ? (
                <motion.div
                  key={selectedTags[criteria]?.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="w-full h-full flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold uppercase relative"
                  style={{
                    backgroundColor: gameState === 'submitted'
                      ? selectedTags[criteria]?.isCorrect
                        ? `${criteriaColors[criteria]}BF`
                        : '#FF0000BF'
                      : criteriaColors[criteria],
                    color: 'white',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  {selectedTags[criteria]?.value}
                  {gameState === 'playing' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onReset(criteria);
                      }}
                      className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center z-10 bg-black bg-opacity-50 rounded-full"
                      aria-label={`Reset ${criteria} selection`}
                    >
                      <X size={8} className="text-white" />
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key={`empty-${criteria}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <span
                    className="text-xs font-semibold opacity-70 text-center px-1 uppercase"
                    style={{ color: criteriaColors[criteria] }}
                  >
                    {criteriaLabels[criteria]}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <ActionButton
          gameState={gameState}
          onClick={onSubmit}
          disabled={gameState === 'playing' && Object.values(selectedTags).some((value) => value === null)}
        />
      </div>
    </div>
  )
}

