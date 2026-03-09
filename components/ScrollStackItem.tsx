"use client";

import { type ReactNode } from "react";

export interface ScrollStackItemProps {
  children: ReactNode;
  index: number;
  scale: number;
  translateY: number;
  blur: number;
  rotation: number;
  stackTop: number;
  viewportHeight: number;
}

export default function ScrollStackItem({
  children,
  index,
  scale,
  translateY,
  blur,
  rotation,
  stackTop,
  viewportHeight,
}: ScrollStackItemProps) {
  return (
    <div
      className="sticky left-0 right-0 w-full will-change-transform"
      style={{
        top: stackTop,
        height: viewportHeight,
        zIndex: index,
      }}
    >
      <div
        className="h-full w-full flex items-center justify-center px-4"
        style={{
          transform: `translateY(${translateY}px) scale(${scale}) rotateX(${rotation}deg)`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
