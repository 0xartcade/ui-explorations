"use client"

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface ActionWrapperProps {
  children: React.ReactNode
  selectedColor: string | null
  isPulsing: boolean
  blurhash?: string
  imageUrl?: string
  gameState: 'playing' | 'submitted' | 'nextRound'
  score?: {
    correct: number
    total: number
    answers: boolean[]
  }
}

// Enhanced Sparkle component
const Sparkle = ({ delay = 0, scale = 1, color = 'white' }) => (
  <motion.div
    className="absolute w-2 h-2"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, scale, 0],
      y: [0, -50, -100],
      x: [0, Math.random() * 30 - 15, Math.random() * 60 - 30],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      ease: "easeOut"
    }}
  >
    <div className="w-full h-full relative">
      <div className={`absolute inset-0 bg-${color} rounded-full animate-rainbow shadow-[0_0_10px_${color}]`} />
      <div className="absolute inset-0 rotate-45">
        <div className={`absolute w-full h-0.5 bg-${color} top-1/2 left-0 -translate-y-1/2 animate-rainbow`} />
        <div className={`absolute h-full w-0.5 bg-${color} left-1/2 top-0 -translate-x-1/2 animate-rainbow`} />
      </div>
    </div>
  </motion.div>
);

// Epic Victory Animation Component
const EpicVictoryAnimation = () => (
  <motion.div 
    className="fixed inset-0 pointer-events-none z-[9999]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {/* Spiral Confetti */}
    {[...Array(24)].map((_, i) => (
      <motion.div
        key={`spiral-${i}`}
        className="absolute left-1/2 top-1/2"
        initial={{ 
          scale: 0,
          rotate: i * 15
        }}
        animate={{
          scale: [0, 1, 0],
          rotate: [i * 15, i * 15 + 720],
          x: [0, Math.cos(i * 15 * Math.PI / 180) * 300],
          y: [0, Math.sin(i * 15 * Math.PI / 180) * 300],
        }}
        transition={{
          duration: 2.5,
          delay: i * 0.05,
          ease: "easeOut"
        }}
      >
        <div className="w-3 h-3 bg-unicorn-gradient rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-rainbow" />
      </motion.div>
    ))}

    {/* Raining Sparkles */}
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={`rain-${i}`}
        className="absolute"
        initial={{ 
          x: Math.random() * window.innerWidth,
          y: -20,
          opacity: 0
        }}
        animate={{
          y: [null, window.innerHeight + 20],
          opacity: [0, 1, 1, 0],
          scale: [0.5, 1, 1, 0.5]
        }}
        transition={{
          duration: 2 + Math.random() * 2,
          delay: Math.random() * 3,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Sparkle 
          scale={1 + Math.random()}
          color={['unicorn-pink', 'unicorn-purple', 'unicorn-blue', 'unicorn-yellow', 'unicorn-mint'][Math.floor(Math.random() * 5)]}
        />
      </motion.div>
    ))}

    {/* Central Burst */}
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 4, 0],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 1
      }}
    >
      <div className="w-20 h-20 bg-unicorn-gradient rounded-full blur-xl animate-rainbow" />
    </motion.div>

    {/* Unicorn Emoji Rain */}
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={`emoji-${i}`}
        className="absolute text-4xl"
        initial={{ 
          x: Math.random() * window.innerWidth,
          y: -50,
          rotate: 0
        }}
        animate={{
          y: [null, window.innerHeight + 50],
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          delay: Math.random() * 2,
          repeat: Infinity,
          scale: {
            repeat: Infinity,
            duration: 1
          }
        }}
      >
        {['🦄', '✨', '🌈', '💫', '⭐'][Math.floor(Math.random() * 5)]}
      </motion.div>
    ))}
  </motion.div>
);

export function ActionWrapper({
  children,
  selectedColor = null,
  isPulsing = false,
  blurhash,
  imageUrl,
  gameState,
  score
}: ActionWrapperProps): JSX.Element {
  // Replace the existing renderSparkles function with this enhanced version
  const renderSparkles = () => {
    if (!isPulsing && gameState !== 'submitted') return null;

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Fixed position sparkles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`fixed-${i}`}
            className="absolute"
            style={{
              left: `${(i % 4) * 33}%`,
              top: `${Math.floor(i / 4) * 33}%`,
            }}
          >
            <Sparkle 
              delay={i * 0.2} 
              scale={1 + Math.random() * 0.5}
            />
          </div>
        ))}

        {/* Random position sparkles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`random-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Sparkle 
              delay={i * 0.3} 
              scale={0.8 + Math.random() * 0.4}
            />
          </div>
        ))}

        {/* Success sparkle burst - only shows on correct answers */}
        {gameState === 'submitted' && score?.correct && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`burst-${i}`}
                className="absolute w-2 h-2 bg-unicorn-yellow rounded-full"
                initial={{ scale: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: [0, Math.cos(i * 30 * Math.PI / 180) * 100],
                  y: [0, Math.sin(i * 30 * Math.PI / 180) * 100],
                }}
                transition={{
                  duration: 1.5,
                  delay: 1 + (i * 0.05),
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    );
  };

  // Enhanced submit flash animation
  const getSubmitOverlay = () => {
    if (gameState !== 'submitted') return null;
    
    return (
      <>
        {/* Magical unicorn submit pulse */}
        <motion.div 
          className="absolute inset-0 pointer-events-none bg-unicorn-gradient"
          initial={{ opacity: 0, y: "100%" }}
          animate={{
            opacity: [0, 0.8, 0.8, 0],
            y: ["100%", "0%", "0%", "0%"],
            filter: [
              'hue-rotate(0deg)',
              'hue-rotate(180deg)',
              'hue-rotate(360deg)',
              'hue-rotate(0deg)'
            ]
          }}
          transition={{
            duration: 2.5,
            ease: [0.22, 1, 0.36, 1],
            times: [0, 0.2, 0.5, 1]
          }}
        />

        {/* Rainbow score grid */}
        <motion.div 
          className="absolute inset-0 pointer-events-none grid grid-cols-2 grid-rows-2 gap-2 p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.3 }}
        >
          {Object.values(score?.answers || {}).map((isCorrect: boolean, index: number) => (
            <motion.div
              key={index}
              className={`rounded-xl backdrop-blur-md ${
                isCorrect 
                  ? 'bg-unicorn-mint/30 border-2 border-unicorn-mint animate-rainbow' 
                  : 'bg-unicorn-pink/30 border-2 border-unicorn-pink'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                boxShadow: isCorrect 
                  ? ['0 0 10px var(--unicorn-mint)', '0 0 20px var(--unicorn-mint)']
                  : ['0 0 10px var(--unicorn-pink)', '0 0 20px var(--unicorn-pink)']
              }}
              transition={{ 
                delay: 2.0 + (index * 0.1),
                boxShadow: {
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            />
          ))}
        </motion.div>
      </>
    );
  };

  // Add this check for perfect score
  const isPerfectScore = score?.correct === 4;

  return (
    <>
      <div className="relative flex flex-col h-full px-1.5 pt-6 pb-4 action-wrapper">
        <div className="absolute inset-0 md:inset-0 md:top-0 -top-[env(safe-area-inset-top)] overflow-hidden">
          {/* Magical background */}
          <div className="absolute inset-0 scale-110">
            <Image
              src={imageUrl || ''}
              alt="Background"
              fill
              className="object-cover blur-lg opacity-50"
              quality={1}
              priority={false}
              unoptimized={imageUrl?.includes('googleusercontent.com')}
              placeholder={blurhash ? "blur" : undefined}
              blurDataURL={blurhash}
            />
            <motion.div 
              className="absolute inset-0 bg-unicorn-gradient mix-blend-soft-light"
              animate={{
                opacity: [0.3, 0.5, 0.3],
                filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)']
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Add sparkles above other elements */}
          {renderSparkles()}

          {/* Color selection effect */}
          <motion.div 
            className="absolute inset-0 pointer-events-none mix-blend-hard-light"
            animate={{
              backgroundColor: selectedColor ? selectedColor : 'transparent',
              opacity: selectedColor ? [0, 0.75, 0.75, 0] : 0,
              boxShadow: selectedColor ? [
                'none',
                `0 0 50px ${selectedColor}`,
                `0 0 50px ${selectedColor}`,
                'none'
              ] : 'none'
            }}
            transition={{
              duration: selectedColor ? 2.5 : 0.8,
              ease: [0.22, 1, 0.36, 1],
              times: selectedColor ? [0, 0.2, 0.5, 1] : undefined
            }}
          />

          {/* Unicorn glass effect */}
          <motion.div 
            className="absolute inset-0 pointer-events-none bg-gradient-to-b from-unicorn-pink/10 to-unicorn-purple/10 backdrop-blur-sm"
            animate={{
              opacity: isPulsing ? [0.5, 0.7] : 0.5
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            style={{
              borderRadius: '24px',
            }}
          />

          {/* Submit and score overlays */}
          {getSubmitOverlay()}
        </div>
        {children}
      </div>
      
      {/* Epic Victory Animation */}
      <AnimatePresence>
        {gameState === 'submitted' && isPerfectScore && (
          <EpicVictoryAnimation />
        )}
      </AnimatePresence>
    </>
  );
}