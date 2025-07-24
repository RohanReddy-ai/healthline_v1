"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { animate } from "motion/react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          const targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient":
                variant === "white"
                  ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--black),
                  var(--black) calc(25% / var(--repeating-conic-gradient-times))
                )`
                  : `radial-gradient(circle, #3b82f6 10%, #3b82f600 20%),
                radial-gradient(circle at 40% 40%, #6366f1 5%, #6366f100 15%),
                radial-gradient(circle at 60% 60%, #8b5cf6 10%, #8b5cf600 20%), 
                radial-gradient(circle at 40% 60%, #06b6d4 10%, #06b6d400 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #3b82f6 0%,
                  #6366f1 calc(25% / var(--repeating-conic-gradient-times)),
                  #8b5cf6 calc(50% / var(--repeating-conic-gradient-times)), 
                  #06b6d4 calc(75% / var(--repeating-conic-gradient-times)),
                  #3b82f6 calc(100% / var(--repeating-conic-gradient-times))
                )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

interface GridItemProps {
  area?: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'secondary' | 'accent' | 'professional';
  animated?: boolean;
}

const itemVariants = {
  default: {
    iconBg: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
    titleGradient: 'gradient-text-primary',
    glowColor: '#2563EB'
  },
  success: {
    iconBg: 'bg-emerald-50 border-emerald-200',
    iconColor: 'text-emerald-600',
    titleGradient: 'bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent',
    glowColor: '#059669'
  },
  warning: {
    iconBg: 'bg-orange-50 border-orange-200',
    iconColor: 'text-orange-600',
    titleGradient: 'bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent',
    glowColor: '#D97706'
  },
  secondary: {
    iconBg: 'bg-slate-50 border-slate-200',
    iconColor: 'text-slate-600',
    titleGradient: 'bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent',
    glowColor: '#64748B'
  },
  accent: {
    iconBg: 'bg-sky-50 border-sky-200',
    iconColor: 'text-sky-600',
    titleGradient: 'gradient-text-accent',
    glowColor: '#0EA5E9'
  },
  professional: {
    iconBg: 'bg-gradient-to-br from-blue-50 to-sky-50 border-blue-200',
    iconColor: 'text-blue-600',
    titleGradient: 'gradient-text-professional',
    glowColor: '#2563EB'
  }
};

export const GridItem = ({ 
  area, 
  icon, 
  title, 
  description, 
  className, 
  variant = 'default',
  animated = true 
}: GridItemProps) => {
  const variantStyles = itemVariants[variant];
  
  return (
    <li className={cn("min-h-[14rem] list-none group", area, className)}>
      <div className={cn(
        "relative h-full rounded-[1.25rem] border-[0.75px] border-gray-200 p-2 md:rounded-[1.5rem] md:p-3 transition-all duration-500",
        animated && "hover-lift"
      )}>
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <div className={cn(
          "relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-white p-6 shadow-sm md:p-6 transition-all duration-300",
          animated && "group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-gray-50/50"
        )}>
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className={cn(
              "w-fit rounded-lg border-[0.75px] p-3 transition-all duration-300",
              variantStyles.iconBg,
              animated && "group-hover:scale-110 group-hover:rotate-3"
            )}>
              <div className={cn(
                "transition-all duration-300",
                variantStyles.iconColor,
                animated && "icon-float group-hover:icon-glow"
              )}>
                {icon}
              </div>
            </div>
            <div className="space-y-3">
              <h3 className={cn(
                "pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance transition-all duration-300",
                variantStyles.titleGradient,
                animated && "group-hover:scale-105"
              )}>
                {title}
              </h3>
              <div className={cn(
                "font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-gray-600 transition-all duration-300",
                animated && "group-hover:text-gray-700"
              )}>
                {description}
              </div>
            </div>
          </div>
          
          {/* Decorative gradient overlay on hover */}
          {animated && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-transparent to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          )}
        </div>
      </div>
    </li>
  );
};

export { GlowingEffect };