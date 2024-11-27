import { Button } from "@/components/ui/button"

interface ActionButtonProps {
  gameState: 'playing' | 'submitted' | 'nextRound'
  onClick: () => void
  disabled: boolean
}

export function ActionButton({ gameState, onClick, disabled }: ActionButtonProps) {
  return (
    <>
      <Button
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-2 border-white/20 shadow-lg font-['Orbitron'] font-bold text-sm py-6 retro-button"
        style={{ borderRadius: '8px 8px 26px 26px' }}
        onClick={onClick}
        disabled={disabled}
      >
        {gameState === 'playing' ? 'Submit Guess' : 'Next Round'}
      </Button>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');

        .retro-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .retro-button::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to bottom right,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 50%,
            transparent 100%
          );
          transform: rotate(-45deg);
          transition: all 0.3s ease;
        }

        .retro-button:hover::before {
          top: -100%;
          left: -100%;
        }
      `}</style>
    </>
  )
}

