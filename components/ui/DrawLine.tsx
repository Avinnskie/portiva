"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap/client";

interface DrawLineProps {
  className?: string;
  duration?: number;
  delay?: number;
  ease?: string;
  triggerStart?: string;
}

export function DrawLine({
  className = "",
  duration = 1.1,
  delay = 0,
  ease = "power3.inOut",
  triggerStart = "top 85%",
}: DrawLineProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: triggerStart,
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ref.current,
          { scaleX: 0 },
          { scaleX: 1, duration, ease, delay },
        );
      },
    });

    return () => trigger.kill();
  }, [duration, delay, ease, triggerStart]);

  return (
    <div
      ref={ref}
      className={`rule-line ${className}`}
      style={{ transform: "scaleX(0)" }}
    />
  );
}
