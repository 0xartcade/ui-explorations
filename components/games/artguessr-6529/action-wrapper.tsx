"use client"

import { motion } from 'framer-motion'
import { useEffect, useCallback } from 'react'
import Image from 'next/image'

interface ActionWrapperProps {
  children: React.ReactNode
  color: string
  selectedColor: string | null
  isPulsing: boolean
  blurhash?: string
  imageUrl?: string
}

export function ActionWrapper({
  children,
  color = '#00FF00',
  selectedColor = null,
  isPulsing = false,
  blurhash,
  imageUrl,
}: ActionWrapperProps) {
  const getRgba = useCallback((color: string, alpha: number) => {
    return `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${alpha})`;
  }, []);

  const getBottomRgba = (alpha: number) => {
    if (!selectedColor) return getRgba(color, alpha);
    const r = parseInt(selectedColor.slice(1, 3), 16);
    const g = parseInt(selectedColor.slice(3, 5), 16);
    const b = parseInt(selectedColor.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  useEffect(() => {
    const themeColor = getRgba(color, 0.63);
    console.log('Status bar color:', themeColor);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor);
    document.documentElement.style.setProperty('--status-bar-background', themeColor);
  }, [color, selectedColor, getRgba]);

  const blurStyles = {
    border: 'none',
    transition: 'all 0.2s ease-in, all 0.8s ease-out',
  };

  return (
    <div className="relative flex flex-col h-full p-2 action-wrapper">
      <div className="absolute inset-0 overflow-hidden">
        {/* Blurred background image */}
        <div className="absolute inset-0 scale-110">
          <Image
            src={imageUrl || ''}
            alt="Background"
            fill
            className="object-cover blur-2xl opacity-50"
            quality={1}
            priority={false}
            placeholder={blurhash ? "blur" : undefined}
            blurDataURL={blurhash}
          />
        </div>

        {/* Mobile version */}
        <motion.div 
          className="absolute inset-0 pointer-events-none md:hidden bg-black/30"
          animate={{
            opacity: isPulsing ? [1, 0.7] : 1
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{
            ...blurStyles,
            borderRadius: '0 0 32px 32px',
          }}
        />
        
        {/* Desktop version */}
        <motion.div 
          className="absolute inset-0 pointer-events-none hidden md:block bg-black/30"
          animate={{
            opacity: isPulsing ? [1, 0.7] : 1
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{
            ...blurStyles,
            borderRadius: '24px',
          }} 
        />
      </div>
      {children}
    </div>
  );
}