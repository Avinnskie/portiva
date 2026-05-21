"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, prefersReducedMotion } from "@/lib/gsap/client";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Statistics", href: "/statistics" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || !headerRef.current) return;

    gsap.fromTo(
      headerRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 },
    );

    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onLight = scrolled;

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,border,backdrop-filter] duration-300 ${
        onLight
          ? "bg-paper/90 backdrop-blur-md border-b border-rule"
          : "bg-transparent border-b border-transparent"
      }`}
      style={{ height: "var(--header-h)" }}
    >
      <div className={`${
            onLight ? "text-ink font-light" : "text-white"
          } h-full px-6 md:px-20 flex items-center justify-between`}>
        <Link
          href="/"
          aria-label="Portiva home"
          className={`text-2xl leading-8 tracking-[-0.02em] transition-colors `}
        >
          PORTIVA
        </Link>

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-8"
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-base leading-[1.6] tracking-[-0.025em] transition-colors ${
                onLight
                  ? "text-ink-muted hover:text-ink font-light"
                  : "text-white/95 hover:text-white font-normal"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            className={`text-[10px] tracking-[0.1em] font-normal uppercase transition-colors ${
              onLight ? "text-ink-muted" : "text-white/90 hover:text-white"
            }`}
            aria-label="Toggle language"
          >
            EN <span className="opacity-60">/</span> ID
          </button>

            <div className={`${onLight ? "bg-ink text-white hover:bg-ink-deep" : "bg-paper text-ink hover:bg-paper-soft"}`}>
          <Link
            href="/quote"
            className={`inline-flex items-center justify-center rounded h-9 px-6 text-sm font-normal transition-colors`}
          >
            Get a Quote
          </Link>
            </div>
        </div>

        <button
          type="button"
          className={`md:hidden ${onLight ? "text-ink" : "text-paper"}`}
          aria-label="Open menu"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M2 6h18M2 11h18M2 16h18" strokeLinecap="square" />
          </svg>
        </button>
      </div>
    </header>
  );
}
