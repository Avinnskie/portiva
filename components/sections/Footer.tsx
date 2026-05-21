"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, prefersReducedMotion } from "@/lib/gsap/client";

const SITEMAP = [
  "Global Network",
  "About Us",
  "Industries",
  "Sustainability",
  "Careers",
];

const CAPABILITIES = [
  "Ocean Freight",
  "Air Cargo",
  "Contract Logistics",
  "Customs Brokerage",
  "Supply Chain Tech",
];

const OFFICES: Array<{ city: string; detail: string }> = [
  { city: "Rotterdam, NL", detail: "Port City Hub, Building 4" },
  { city: "Singapore, SG", detail: "Marina Bay Financial Centre" },
  { city: "Houston, USA", detail: "Logistics Park Blvd, Suite 200" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !footerRef.current) return;

    const ctx = gsap.context(() => {
      const root = footerRef.current!;

      gsap.fromTo(
        wordmarkRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: wordmarkRef.current,
            start: "top 92%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        root.querySelectorAll<HTMLElement>(".footer-col"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-ink-deep text-paper overflow-hidden"
    >
      <div
        ref={wordmarkRef}
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 bottom-0 select-none overflow-hidden"
        style={{ clipPath: "inset(100% 0 0 0)" }}
      >
        <p
          className="font-light leading-none tracking-[-0.05em] text-paper/[0.04] whitespace-nowrap pl-6 md:pl-20"
          style={{ fontSize: "clamp(140px, 22vw, 280px)" }}
        >
          PORTIVA
        </p>
      </div>

      <div className="relative px-6 md:px-20 pt-[120px] pb-12">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          <div className="footer-col col-span-2 md:col-span-4 pr-0 md:pr-12">
            <p className="text-2xl font-light leading-8 tracking-[-0.02em] text-paper">
              PORTIVA
            </p>
            <p className="mt-6 text-sm leading-[1.4] text-ink-muted max-w-[304px]">
              Global Supply Chain Solutions. Engineering precision logistics
              for the world&apos;s most demanding enterprises.
            </p>

            <Link
              href="/contact"
              className="mt-9 inline-flex items-center gap-2 text-sm font-medium text-paper hover:text-paper/80 transition-colors group"
            >
              <span>Contact Support</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>

          <div className="footer-col col-span-1 md:col-span-2">
            <p className="text-[10px] tracking-[0.1em] uppercase font-normal text-ink-muted">
              SITEMAP
            </p>
            <ul className="mt-6 space-y-4">
              {SITEMAP.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-ink-muted hover:text-paper transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col col-span-1 md:col-span-3">
            <p className="text-[10px] tracking-[0.1em] uppercase font-normal text-ink-muted">
              CAPABILITIES
            </p>
            <ul className="mt-6 space-y-4">
              {CAPABILITIES.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-ink-muted hover:text-paper transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col col-span-2 md:col-span-3">
            <p className="text-[10px] tracking-[0.1em] uppercase font-normal text-ink-muted">
              KEY OFFICES
            </p>
            <ul className="mt-6 space-y-6">
              {OFFICES.map((office) => (
                <li key={office.city}>
                  <p className="text-sm font-normal text-paper">
                    {office.city}
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">
                    {office.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-32 pt-8 border-t border-paper/10 flex flex-wrap items-center justify-between gap-4 text-xs text-ink-muted">
          <div className="flex flex-wrap items-center gap-6">
            <span>© 2026 Portiva Logistics.</span>
            <Link href="#" className="hover:text-paper transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-paper transition-colors">
              Terms of Service
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden
              >
                <circle
                  cx="6"
                  cy="6"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M3 6h6M6 3v6"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
              ISO Certifications
            </span>
            <span className="font-mono text-[9px] tracking-[0.05em]">
              PRT-2025-EDITORIAL-V1.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
