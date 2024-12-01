import { Button } from "./button"
import { cn } from "@/lib/utils"

interface UnicornButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function UnicornButton({ children, className, ...props }: UnicornButtonProps) {
  return (
    <Button
      className={cn(
        "relative overflow-hidden bg-unicorn-gradient",
        "text-white font-['Orbitron'] font-bold",
        "border-2 border-white/30",
        "shadow-[0_0_15px_rgba(255,105,180,0.5)]",
        "transition-all duration-300",
        "hover:scale-105 hover:shadow-[0_0_25px_rgba(255,105,180,0.7)]",
        "before:content-[''] before:absolute before:inset-0",
        "before:bg-unicorn-shimmer before:animate-shimmer",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
} 