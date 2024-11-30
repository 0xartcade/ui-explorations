"use client"

import { Button } from "@/components/ui/button"

interface ActionButtonProps {
  gameState: 'playing' | 'submitted' | 'nextRound'
  onClick: () => void
  disabled: boolean
}

export function ActionButton({ gameState, onClick, disabled }: ActionButtonProps): JSX.Element {
  return (
    <Button
      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-2 border-white/20 shadow-lg font-['Orbitron'] font-bold text-sm retro-button"
      style={{ 
        borderRadius: '15px 15px 15px 15px',
        minHeight: '2.5rem',
        padding: '.5rem'
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {gameState === 'playing' ? 'Submit Guess' : 'Next Round'}
    </Button>
  )
}
