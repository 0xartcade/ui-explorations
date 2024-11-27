"use client"

import { motion } from 'framer-motion'
import { useEffect } from 'react'

interface ActionWrapperProps {
  children: React.ReactNode
  color: string
  selectedColor: string | null
  isPulsing: boolean
}

export function ActionWrapper({
  children,
  color = '#00FF00',
  selectedColor = null,
  isPulsing = false,
}: ActionWrapperProps) {
  const getRgba = (alpha: number) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const getBottomRgba = (alpha: number) => {
    if (!selectedColor) return getRgba(alpha);
    const r = parseInt(selectedColor.slice(1, 3), 16);
    const g = parseInt(selectedColor.slice(3, 5), 16);
    const b = parseInt(selectedColor.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  useEffect(() => {
    const themeColor = getRgba(0.63);
    console.log('Status bar color:', themeColor);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor);
    document.documentElement.style.setProperty('--status-bar-background', themeColor);
  }, [color, selectedColor, getRgba]);

  const baseGradient = `
    linear-gradient(
      to bottom,
      ${getRgba(0.55)} 0%,
      ${getRgba(0.55)} 25%,
      ${getBottomRgba(0.4)} 35%,
      ${getBottomRgba(0.2)} 100%
    )
  `;

  const glowStyles = {
    border: 'none',
    background: baseGradient,
    transition: 'background 0.2s ease-in, background 0.8s ease-out',
  };

  const getMobileGlowStyles = () => ({
    ...glowStyles,
    borderRadius: '0 0 32px 32px',
  });

  return (
    <div className="relative flex flex-col h-full p-2 action-wrapper">
      <div className="absolute inset-0 overflow-hidden">
        {/* Mobile version */}
        <motion.div 
          className="absolute inset-0 pointer-events-none md:hidden"
          animate={{
            opacity: isPulsing ? [1, 0.7] : 1
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={getMobileGlowStyles()}
        />
        
        {/* Desktop version */}
        <motion.div 
          className="absolute inset-0 pointer-events-none hidden md:block"
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
            ...glowStyles,
            borderRadius: '24px',
          }} 
        />
      </div>
      {children}
    </div>
  );
}