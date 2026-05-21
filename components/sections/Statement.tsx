"use client";

import { useEffect, useRef } from "react";
import {
  gsap,
  SplitText as GSAPSplitText,
  prefersReducedMotion,
} from "@/lib/gsap/client";

export function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const split = new GSAPSplitText(quoteRef.current!, { type: "words" });
      gsap.set(split.words, { opacity: 0.18 });
      gsap.to(split.words, {
        opacity: 1,
        duration: 0.6,
        stagger: 0.03,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 1,
        },
      });

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 90%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        authorRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: authorRef.current,
            start: "top 92%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-paper px-6 md:px-20 py-[120px]"
    >
      <div className="mx-auto max-w-[740px] text-center">
        <p
          ref={quoteRef}
          className="font-normal text-[clamp(28px,4.5vw,48px)] leading-[1.15] tracking-[-0.02em] text-ink"
        >
          We do not merely transport cargo; we engineer flow. Our mandate is to
          remove friction from complex international supply chains, operating
          silently and reliably at industrial scale.
        </p>

        <div
          ref={lineRef}
          className="mt-10 mx-auto h-px w-8 bg-rule origin-center"
          style={{ transform: "scaleX(0)" }}
        />

        <div ref={authorRef} className="mt-4 space-y-2">
          <p className="text-sm italic font-normal text-ink-muted">
            Office of the CEO
          </p>
          <p className="text-[10px] tracking-[0.1em] uppercase font-normal text-ink-muted/60">
            Portiva Logistics Board
          </p>
        </div>
      </div>
    </section>
  );
}
