"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap/client";

interface Stat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description: string;
}

const STATS: Stat[] = [
  {
    label: "ANNUAL VOLUME",
    value: 12,
    suffix: "M+",
    description: "TEUs processed through global gateway ports annually.",
  },
  {
    label: "GLOBAL FOOTPRINT",
    value: 48,
    description: "Strategic warehouse and distribution centers worldwide.",
  },
  {
    label: "ON-TIME DELIVERY",
    value: 99,
    suffix: "%",
    description: "SLA adherence across critical manufacturing supply lines.",
  },
];

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const root = sectionRef.current!;
      const cols = root.querySelectorAll<HTMLElement>(".stat-col");
      const counters = root.querySelectorAll<HTMLElement>("[data-counter]");

      gsap.fromTo(
        cols,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            once: true,
          },
        },
      );

      counters.forEach((node, i) => {
        const stat = STATS[i];
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 1.8,
          ease: "power2.out",
          snap: { val: 1 },
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            once: true,
          },
          onUpdate: () => {
            node.textContent = String(Math.floor(obj.val));
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-paper border-t border-rule px-6 md:px-20 py-20 md:py-[80px] md:pb-[112px]"
    >
      <div className="border-t border-rule pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`stat-col py-12 md:py-12 md:px-12 ${
                i > 0 ? "md:border-l border-rule" : ""
              }`}
            >
              <p className="text-[10px] tracking-[0.1em] uppercase font-normal text-accent">
                {stat.label}
              </p>

              <p className="mt-8 font-light text-[clamp(64px,8vw,96px)] leading-none tracking-[-0.05em] text-ink tabular-nums flex items-baseline gap-1">
                <span data-counter>0</span>
                {stat.suffix && (
                  <span className="text-[clamp(32px,4vw,48px)] font-light text-ink-muted leading-none">
                    {stat.suffix}
                  </span>
                )}
              </p>

              <p className="mt-12 text-sm leading-[1.5] text-ink-muted max-w-[200px]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
