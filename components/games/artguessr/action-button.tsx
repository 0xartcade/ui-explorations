"use client"

import { UnicornButton } from "@/components/ui/unicorn-button"

interface ActionButtonProps {
  gameState: 'playing' | 'submitted' | 'nextRound'
  onClick: () => void
  disabled: boolean
}

export function ActionButton({ gameState, onClick, disabled }: ActionButtonProps) {
  return (
    <UnicornButton
      onClick={onClick}
      disabled={disabled}
      className="w-full min-h-[2.5rem] text-sm md:text-base rounded-2xl"
    >
      {gameState === 'playing' ? '🦄 Submit Guess' : '✨ Next Round'}
    </UnicornButton>
  )
}

