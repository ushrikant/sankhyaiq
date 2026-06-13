"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { sections } from "@/lib/sections";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/logo/sankhyaiq-logo.png"
              alt="SankhyaIQ"
              width={44}
              height={44}
              className="rounded-full"
              priority
            />
            <span className="font-playfair text-xl font-bold text-navy hidden sm:block">
              SankhyaIQ
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {sections.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="px-3 py-1.5 text-sm font-plex text-muted hover:text-navy hover:bg-surface rounded-md transition-colors whitespace-nowrap"
              >
                {s.label}
              </Link>
            ))}
            <Link
              href="/newsletter"
              className="ml-3 px-4 py-1.5 bg-cobalt text-white text-sm font-plex font-medium rounded-full hover:bg-navy transition-colors"
            >
              Newsletter
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-muted hover:text-navy hover:bg-surface"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4">
          <div className="grid grid-cols-2 gap-2">
            {sections.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 text-sm font-plex text-navy bg-surface rounded-md hover:bg-blue-50 transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
          <Link
            href="/newsletter"
            onClick={() => setMenuOpen(false)}
            className="mt-4 block text-center px-4 py-2 bg-cobalt text-white text-sm font-plex font-medium rounded-full"
          >
            Newsletter
          </Link>
        </div>
      )}
    </nav>
  );
}
