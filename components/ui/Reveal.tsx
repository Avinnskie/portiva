"use client";

import { Children, useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap/client";

interface RevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  threshold?: number;
  stagger?: number;
}

const DISTANCE = 60;

export function Reveal({
  children,
  direction = "up",
  threshold = 0.85,
  stagger = 0.1,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;

    const ctx = gsap.context(() => {
      const elements =
        ref.current?.querySelectorAll<HTMLElement>(".reveal-item") ?? [];

      const axis: "x" | "y" =
        direction === "left" || direction === "right" ? "x" : "y";
      const offset =
        direction === "up" || direction === "left" ? DISTANCE : -DISTANCE;

      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, [axis]: offset },
          {
            opacity: 1,
            [axis]: 0,
            duration: 0.85,
            ease: "power3.out",
            delay: stagger * i,
            scrollTrigger: {
              trigger: el,
              start: `top ${threshold * 100}%`,
              once: true,
            },
          },
        );
      });
    }, ref);

    return () => ctx.revert();
  }, [direction, threshold, stagger]);

  return (
    <div ref={ref} className="reveal-mask">
      {items.map((child, i) => (
        <div key={i} className="reveal-item">
          {child}
        </div>
      ))}
    </div>
  );
}
