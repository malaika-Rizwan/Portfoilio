"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useLenisScroll } from "./LenisProvider";
import ScrollStackItem from "./ScrollStackItem";

export interface ScrollStackSettings {
  itemDistance: number;
  itemScale: number;
  itemStackDistance: number;
  baseScale: number;
  stackPosition: string;
  scaleEndPosition: string;
  rotationAmount: number;
  blurAmount: number;
  useWindowScroll: boolean;
}

const defaultSettings: ScrollStackSettings = {
  itemDistance: 120,
  itemScale: 0.04,
  itemStackDistance: 40,
  baseScale: 0.88,
  stackPosition: "15%",
  scaleEndPosition: "8%",
  rotationAmount: 1,
  blurAmount: 1.5,
  useWindowScroll: true,
};

export interface ScrollStackProps {
  children: ReactNode;
  settings?: Partial<ScrollStackSettings>;
}

export default function ScrollStack({ children, settings = {} }: ScrollStackProps) {
  const opts = { ...defaultSettings, ...settings };
  const scrollY = useLenisScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportHeight, setViewportHeight] = useState(1000);
  const [sectionHeight, setSectionHeight] = useState(1120);
  const childrenArray = Array.isArray(children) ? children : [children];
  const count = childrenArray.length;

  useLayoutEffect(() => {
    const updateSize = () => {
      const vh = typeof window !== "undefined" ? window.innerHeight : 1000;
      setViewportHeight(vh);
      setSectionHeight(vh + opts.itemDistance);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [opts.itemDistance]);

  const totalHeight = sectionHeight * count;
  const stackTopNum = opts.stackPosition.endsWith("%")
    ? (viewportHeight * parseFloat(opts.stackPosition)) / 100
    : parseFloat(opts.stackPosition);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: totalHeight }}
    >
      {childrenArray.map((child, index) => {
        const itemTop = index * sectionHeight;
        const rawProgress = (scrollY - itemTop + viewportHeight * 0.5) / sectionHeight;
        const progress = Math.max(0, Math.min(1, rawProgress));
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const scaleEnd = parseFloat(opts.scaleEndPosition) / 100;
        const scaleProgress = Math.min(1, easeProgress / (scaleEnd || 0.5));
        const scale = 1 - (1 - opts.baseScale) * scaleProgress;
        const translateY = -easeProgress * opts.itemStackDistance;
        const rotation = -easeProgress * opts.rotationAmount;
        const blur = opts.blurAmount > 0 ? easeProgress * opts.blurAmount : 0;

        return (
          <ScrollStackItem
            key={index}
            index={index}
            scale={scale}
            translateY={translateY}
            blur={blur}
            rotation={rotation}
            stackTop={stackTopNum}
            viewportHeight={viewportHeight}
          >
            {child}
          </ScrollStackItem>
        );
      })}
    </div>
  );
}
