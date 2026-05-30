'use client';
import { InstagramLogo, YoutubeLogo, TiktokLogo } from 'phosphor-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer
      className="shinkai-panel text-[var(--mode-text-primary)] text-sm px-6 md:px-16 py-12 text-[13px]"
      style={{ fontFamily: 'var(--font-euclid)' }}
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Info Line */}
        <p className="text-center tracking-wider">
          Sustainability and regenerative design are at the heart of everything we create at The
          Move.
        </p>

        <hr className="border-[var(--mode-border)]" />

        {/* Contact & Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left justify-items-center">
          <div>
            <p className="tracking-wider">+95 256 358 744</p>
          </div>
          <div>
            <p className="tracking-wider">careers@themove.com</p>
          </div>
          <div>
            <p className="tracking-wider">
              <Link href="/contact">contact</Link>
            </p>
          </div>
        </div>

        {/* Icon */}
        <div className="flex justify-center gap-4">
          <a
            href="https://instagram.com/themovearchids"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-7 h-7 flex items-center justify-center border border-deep-gray rounded-full transition-all duration-300 hover:border-black hover:bg-black"
          >
            <InstagramLogo className="w-5 h-5 text-[var(--mode-text-secondary)] transition-colors duration-300 group-hover:text-ivory" />
          </a>

          <a
            href="https://www.youtube.com/@THEMOVEARCHIDS"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-7 h-7 flex items-center justify-center border border-deep-gray rounded-full transition-all duration-300 hover:border-black hover:bg-black"
          >
            <YoutubeLogo className="w-5 h-5 text-[var(--mode-text-secondary)] transition-colors duration-300 group-hover:text-ivory" />
          </a>

          <a
            href="https://www.tiktok.com/@themovearchids"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-7 h-7 flex items-center justify-center border border-deep-gray rounded-full transition-all duration-300 hover:border-black hover:bg-black"
          >
            <TiktokLogo className="w-5 h-5 text-[var(--mode-text-secondary)] transition-colors duration-300 group-hover:text-ivory" />
          </a>
        </div>

        {/* Copyright & Policies */}
        <div className="text-xs text-center sm:text-left flex flex-col sm:flex-row justify-center sm:justify-between gap-2 sm:gap-4">
          <p> © 2026 The Move, All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-2">
            <Link href="/contact" className="hover:underline">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/contact" className="hover:underline">
              Terms & Conditions
            </Link>
            <span>|</span>
            <Link href="/admin/login" className="hover:underline">
              Studio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
