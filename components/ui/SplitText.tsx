"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText as GSAPSplitText, prefersReducedMotion } from "@/lib/gsap/client";

type SplitMode = "lines" | "words" | "chars";

interface SplitTextProps {
  children: string;
  by?: "line" | "word" | "char";
  className?: string;
  stagger?: number;
  fromY?: number;
}

export function SplitText({
  children,
  by = "word",
  className = "",
  stagger = 0.05,
  fromY = 20,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;

    const split = new GSAPSplitText(ref.current, { type: by });
    const target: SplitMode =
      by === "line" ? "lines" : by === "word" ? "words" : "chars";

    const tween = gsap.fromTo(
      split[target],
      { opacity: 0, y: fromY },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger,
      },
    );

    return () => {
      tween.kill();
      split.revert();
    };
  }, [by, stagger, fromY]);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
