"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import ThemesToggleButton from "./themetoogle";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Rooms & Suites", href: "/rooms" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-50
                   bg-background/70 backdrop-blur-xl
                   border-b border-glass-border"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* LOGO */}
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="motion-btn"
          >
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              {/* Logo container */}
              <div className="glass no-hover rounded-xl p-1 border border-glass-border">
                {/* Light mode logo */}
                <img
                  src="/logo-light.png"
                  alt="Palm Garden Hotel Logo"
                  width={40}
                  height={40}
                  className="block dark:hidden rounded-lg"
                />

                {/* Dark mode logo */}
                <img
                  src="/logo-dark.png"
                  alt="Palm Garden Hotel Logo"
                  width={40}
                  height={40}
                  className="hidden dark:block rounded-lg"
                />
              </div>

              {/* Brand text */}
              <span className="text-xl font-semibold tracking-wide text-primary drop-shadow-sm">
                Palm Garden Hotel
              </span>
            </Link>
          </motion.div>

          {/* DESKTOP NAV (Large screens only) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className="
                    px-4 py-2
                    rounded-full
                    text-foreground
                    transition-all duration-300
                    hover:bg-secondary hover:text-white

                    flex items-center justify-center
                    text-center
                    leading-snug
                    min-h-[2.75rem]
                    max-w-[9rem]
                  "
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>


          {/* ACTIONS (Large screens only) */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemesToggleButton />

            <motion.a
              href="tel:0539795100"
              whileHover={{
                y: -2,
                boxShadow: "0 12px 30px rgba(234,179,8,0.45)",
              }}
              whileTap={{ scale: 0.95 }}
              className="glass px-4 py-2 rounded-xl items-center gap-2 text-sm text-primary hover:text-white transition-all flex"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </motion.a>

            <motion.a
              href="https://wa.me/233539795100"
              target="_blank"
              whileHover={{
                y: -2,
                boxShadow: "0 12px 30px rgba(34,197,94,0.45)",
              }}
              whileTap={{ scale: 0.95 }}
              className="glass px-3 py-2 rounded-xl text-green-500 transition-all flex"
            >
              <MessageCircle className="w-4 h-4" />
            </motion.a>
          </div>

          {/* MOBILE MENU BUTTON (Tablet & below) */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="lg:hidden flex items-center"
          >
            <Menu className="w-6 h-6 text-foreground" />
          </motion.button>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl overflow-hidden will-change-transform"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-glass-border">
              <motion.div whileHover={{ scale: 1.05 }} className="motion-btn">
                <Link href="/" className="flex items-center gap-3">
                  <div className="glass no-hover rounded-xl p-1 border border-glass-border">
                    <img
                      src="/logo-light.png"
                      alt="Palm Garden Hotel Logo"
                      width={40}
                      height={40}
                      className="block dark:hidden rounded-lg"
                    />
                    <img
                      src="/logo-dark.png"
                      alt="Palm Garden Hotel Logo"
                      width={40}
                      height={40}
                      className="hidden dark:block rounded-lg"
                    />
                  </div>
                  <span className="text-xl font-semibold tracking-wide text-primary drop-shadow-sm">
                    Palm Garden Hotel
                  </span>
                </Link>
              </motion.div>

              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-secondary/30 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* NAV LINKS + ACTIONS */}
            <div className="flex flex-col h-[calc(100%-64px)] overflow-y-auto px-6 py-8 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="glass px-5 py-3 rounded-xl text-sm text-foreground hover:bg-primary hover:text-black transition-all"
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Call Button */}
              <motion.a
                href="tel:0539795100"
                whileHover={{ y: -2, boxShadow: "0 12px 30px rgba(234,179,8,0.45)" }}
                whileTap={{ scale: 0.95 }}
                className="glass px-5 py-3 rounded-xl flex items-center gap-2 text-sm text-primary hover:text-white transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </motion.a>

              {/* WhatsApp + Theme toggle */}
              <div className="flex justify-between items-center gap-4">
                <a
                  href="https://wa.me/233539795100"
                  target="_blank"
                  className="glass px-5 py-3 rounded-xl flex items-center gap-2 text-green-500 hover:bg-green-500 hover:text-white transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <ThemesToggleButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
