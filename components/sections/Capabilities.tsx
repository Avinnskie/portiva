"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, prefersReducedMotion } from "@/lib/gsap/client";

interface Capability {
  number: string;
  title: string;
  description: string;
  tags: string[];
}

const CAPABILITIES: Capability[] = [
  {
    number: "01.",
    title: "Ocean Freight Forwarding",
    description:
      "Full Container Load (FCL) and Less than Container Load (LCL) services with priority routing and customs brokerage integration.",
    tags: ["FCL / LCL", "CUSTOMS"],
  },
  {
    number: "02.",
    title: "Contract Warehousing",
    description:
      "Dedicated and shared facility management utilizing advanced WMS for real-time inventory optimization and cross-docking.",
    tags: ["WMS INTEGRATION", "CROSS-DOCKING"],
  },
  {
    number: "03.",
    title: "Overland Transport",
    description:
      "FTL and LTL domestic distribution networks optimized for tight SLA requirements and specialized equipment needs.",
    tags: ["FTL / LTL", "FINAL MILE"],
  },
  {
    number: "04.",
    title: "Air Cargo Solutions",
    description:
      "Expedited global air freight for time-critical components, featuring charter options and direct-to-consignee delivery.",
    tags: ["EXPEDITED", "CHARTERS"],
  },
];

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const root = sectionRef.current!;

      gsap.fromTo(
        root.querySelectorAll(".cap-headline"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            once: true,
          },
        },
      );

      const cards = root.querySelectorAll<HTMLElement>(".capability-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 56 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.06,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-paper-soft px-6 md:px-20 py-[120px]"
    >
      <div className="grid lg:grid-cols-[40%_60%] gap-12 lg:gap-0">
        <div className="lg:sticky lg:top-32 lg:self-start lg:pr-12">
          <h2 className="cap-headline font-normal text-[clamp(36px,4.5vw,48px)] leading-[1.12] tracking-[-0.02em] text-ink">
            Comprehensive
            <br />
            Logistics
            <br />
            Infrastructure.
          </h2>

          <p className="cap-headline mt-12 max-w-[448px] text-base md:text-lg leading-[1.6] text-ink-muted">
            We provide end-to-end modular solutions designed to scale with your
            operational demands, ensuring absolute visibility and control.
          </p>

          <Link
            href="/capabilities"
            className="cap-headline mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent transition-colors group"
          >
            <span>View All Capabilities</span>
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        <div className="space-y-5">
          {CAPABILITIES.map((cap, i) => (
            <article
              key={cap.number}
              className={`capability-card group relative bg-paper rounded p-8 transition-colors duration-300 border border-rule hover:border-ink`}
            >
              <p className="text-2xl font-medium leading-[1.3] tracking-[-0.01em] text-accent">
                {cap.number}
              </p>

              <h3 className="mt-4 text-2xl font-medium leading-[1.3] tracking-[-0.01em] text-ink">
                {cap.title}
              </h3>

              <p className="mt-4 max-w-[580px] text-base leading-[1.6] text-ink-muted">
                {cap.description}
              </p>

              <div className="mt-6 pt-4 border-t border-rule flex flex-wrap items-center gap-3">
                {cap.tags.map((tag, idx) => (
                  <span key={tag} className="flex items-center gap-3">
                    {idx > 0 && (
                      <span className="text-xs text-ink-muted/60">•</span>
                    )}
                    <span className="text-xs font-medium tracking-[0.1em] text-ink-muted/60">
                      {tag}
                    </span>
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
