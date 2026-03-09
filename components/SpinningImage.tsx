"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue } from "motion/react";

export interface SpinningImageProps {
  children: ReactNode;
  spinDuration?: number;
  onHover?: "speedUp" | "slowDown";
  className?: string;
}

export default function SpinningImage({
  children,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
}: SpinningImageProps) {
  const rotation = useMotionValue(0);
  const speedRef = useRef(360 / spinDuration);
  const rafRef = useRef<number>(0);
  const lastRef = useRef(0);

  useEffect(() => {
    speedRef.current = 360 / spinDuration;
  }, [spinDuration]);

  useEffect(() => {
    let running = true;

    const tick = (time: number) => {
      if (!running) return;
      const delta = (time - lastRef.current) / 1000;
      lastRef.current = time;
      rotation.set(rotation.get() + speedRef.current * delta);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame((time) => {
      lastRef.current = time;
      return tick(time);
    });

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [rotation]);

  const handleMouseEnter = () => {
    if (!onHover) return;
    if (onHover === "speedUp") speedRef.current = 360 / (spinDuration / 4);
    if (onHover === "slowDown") speedRef.current = 360 / (spinDuration * 2);
  };

  const handleMouseLeave = () => {
    speedRef.current = 360 / spinDuration;
  };

  return (
    <motion.div
      className={className}
      style={{ rotate: rotation }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
