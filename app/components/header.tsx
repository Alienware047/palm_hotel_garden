"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { ThemeToggle } from "./themetoogle";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-glass-border"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="text-xl font-semibold tracking-wide text-yellow-400"
            >
              Palm Garden Hotel
            </Link>
          </motion.div>

          {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {["Home", "Rooms", "About Us", "Contact"].map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={
                  item === "Home"
                    ? "/"
                    : item === "About Us"
                    ? "/about-us"
                    : `/${item.toLowerCase()}`
                }
                className="px-4 py-2 rounded-full transition-colors duration-300
                          hover:bg-yellow-400 hover:text-white"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>


          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="tel:0539795100"
              whileHover={{
                y: -3,
                scale: 1.05,
                boxShadow: "0px 12px 30px rgba(234,179,8,0.45)",
              }}
              whileTap={{ scale: 0.94 }}
              className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-sm
                         text-yellow-400 hover:bg-yellow-400 hover:text-white
                         transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </motion.a>

            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="md:hidden"
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6 text-foreground" />
          </motion.button>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 bg-background/90 backdrop-blur-xl z-50"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-glass-border">
              <span className="font-semibold text-lg text-yellow-400">
                Palm Garden Hotel
              </span>

              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(false)}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm">
              {["Home", "Rooms", "About Us", "Contact"].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={
                      item === "Home"
                        ? "/"
                        : item === "About Us"
                        ? "/about-us"
                        : `/${item.toLowerCase()}`
                    }
                    className="px-4 py-2 rounded-full transition-colors duration-300
                              hover:bg-yellow-400 hover:text-white"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
