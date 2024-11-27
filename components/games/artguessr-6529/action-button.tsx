"use client"

import { Button } from "@/components/ui/button"

interface ActionButtonProps {
  gameState: 'playing' | 'submitted' | 'nextRound'
  onClick: () => void
  disabled: boolean
}

export function ActionButton({ gameState, onClick, disabled }: ActionButtonProps) {
  return (
    <Button
      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-2 border-white/20 shadow-lg font-['Orbitron'] font-bold text-sm py-6 retro-button"
      style={{ borderRadius: '8px 8px 26px 26px' }}
      onClick={onClick}
      disabled={disabled}
    >
      {gameState === 'playing' ? 'Submit Guess' : 'Next Round'}
    </Button>
  )
}

