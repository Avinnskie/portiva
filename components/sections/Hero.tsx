"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  gsap,
  SplitText as GSAPSplitText,
  prefersReducedMotion,
} from "@/lib/gsap/client";

const META_ITEMS: string[] = [
  "EST. 2008",
  "ISO 9001:2015 CERTIFIED",
  "GLOBAL NETWORK",
  "PRT—HQ",
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ledeRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const split = new GSAPSplitText(headlineRef.current!, {
        type: "lines",
        linesClass: "split-line",
      });
      gsap.set(split.lines, { yPercent: 110 });
      gsap.to(split.lines, {
        yPercent: 0,
        duration: 1.05,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.2,
      });

      gsap.fromTo(
        ledeRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          delay: 0.65,
        },
      );

      gsap.fromTo(
        ".hero-meta-item",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.85,
        },
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative bg-ink text-paper overflow-hidden"
      style={{ minHeight: "min(887px, 100vh)" }}
    >
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/cargo01.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/85" />
      </div>

      <div className="relative flex flex-col" style={{ minHeight: "min(887px, 100vh)" }}>
        <div className="flex-1 flex items-center pt-[var(--header-h)]">
          <div className="w-full px-6 md:px-20 pb-20 md:pb-32">
            <h1
              ref={headlineRef}
              className="font-light text-[clamp(48px,7.5vw,88px)] leading-[1.05] tracking-[-0.02em] text-paper max-w-[1120px]"
            >
              Moving business
              <br className="hidden md:block" />
              <span className="md:hidden"> </span>forward through
              <br className="hidden md:block" />
              <span className="md:hidden"> </span>smarter logistics.
            </h1>

            <p
              ref={ledeRef}
              className="mt-10 max-w-2xl text-base md:text-lg leading-[1.6] text-paper/80 font-normal"
            >
              Architecting robust supply chains for global enterprises. We
              integrate warehousing, freight forwarding, and final-mile delivery
              with uncompromised precision.
            </p>
          </div>
        </div>

        <div
          ref={metaRef}
          className="border-t border-paper/10 px-6 md:px-20 py-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-[11px] tracking-[0.1em] uppercase text-paper font-normal">
            {META_ITEMS.map((item) => (
              <span key={item} className="hero-meta-item">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
