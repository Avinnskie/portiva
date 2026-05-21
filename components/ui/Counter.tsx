"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap/client";

interface CounterProps {
  end: number;
  duration?: number;
  format?: (val: number) => string;
  className?: string;
}

export function Counter({
  end,
  duration = 1.6,
  format,
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;

    if (prefersReducedMotion()) {
      node.textContent = format ? format(end) : String(end);
      return;
    }

    const obj = { val: 0 };
    const trigger = ScrollTrigger.create({
      trigger: node,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: end,
          duration,
          ease: "power2.out",
          snap: { val: 1 },
          onUpdate: () => {
            node.textContent = format
              ? format(Math.floor(obj.val))
              : String(Math.floor(obj.val));
          },
        });
      },
    });

    return () => trigger.kill();
  }, [end, duration, format]);

  return (
    <span ref={ref} className={className}>
      {format ? format(0) : "0"}
    </span>
  );
}
