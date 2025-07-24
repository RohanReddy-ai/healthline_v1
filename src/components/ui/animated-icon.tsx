"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedIconProps {
  children: React.ReactNode;
  animation?: 'pulse' | 'float' | 'glow' | 'spin' | 'bounce' | 'none';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'default' | 'success' | 'warning' | 'secondary' | 'accent' | 'professional';
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8'
};

const colorClasses = {
  default: 'text-blue-600',
  success: 'text-emerald-600',
  warning: 'text-orange-600',
  secondary: 'text-slate-600',
  accent: 'text-sky-600',
  professional: 'bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent'
};

const animationVariants = {
  pulse: {
    scale: [1, 1.15, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  },
  float: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  },
  glow: {
    filter: [
      "drop-shadow(0 0 8px currentColor)",
      "drop-shadow(0 0 20px currentColor)",
      "drop-shadow(0 0 8px currentColor)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  },
  spin: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear" as const
    }
  },
  bounce: {
    y: [0, -12, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeOut" as const
    }
  },
  none: {}
};

export const AnimatedIcon = memo(({
  children,
  animation = 'float',
  size = 'md',
  color = 'default',
  className
}: AnimatedIconProps) => {
  return (
    <motion.div
      className={cn(
        "inline-flex items-center justify-center transition-all duration-300",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      animate={animationVariants[animation]}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.div>
  );
});

AnimatedIcon.displayName = "AnimatedIcon";