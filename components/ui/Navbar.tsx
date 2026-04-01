"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const LINKS = [
  { label: "Projets", href: "#projets" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-surface/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-lg font-bold text-text-primary tracking-tight hover:text-accent transition-colors duration-200"
          >
            stef<span className="text-accent">·</span>dev
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-accent-btn hover:bg-accent text-white text-sm font-semibold transition-colors duration-200"
            >
              Discuter
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-accent transition-colors duration-200"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <XMarkIcon className="w-4 h-4" />
            ) : (
              <Bars3Icon className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={closeMenu}
              aria-hidden
            />

            {/* Slide-in panel */}
            <motion.div
              id="mobile-menu"
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-surface border-l border-border flex flex-col"
            >
              {/* Panel header */}
              <div className="h-16 flex items-center justify-between px-6 border-b border-border">
                <span className="font-display text-lg font-bold text-text-primary">
                  stef<span className="text-accent">·</span>dev
                </span>
                <button
                  onClick={closeMenu}
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-accent transition-colors duration-200"
                  aria-label="Fermer le menu"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-1 p-4 flex-1">
                {LINKS.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background text-sm font-medium transition-colors duration-200"
                  >
                    {label}
                  </a>
                ))}
              </nav>

              {/* CTA */}
              <div className="p-4 border-t border-border">
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-accent-btn hover:bg-accent text-white text-sm font-semibold transition-colors duration-200"
                >
                  Discuter de mon projet
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
