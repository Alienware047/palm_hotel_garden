"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Rooms & Suites", href: "/rooms" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="relative ">
      {/* Top Divider Glow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Main Footer */}
      <div className="glass no-hover border-t border-glass-border">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-foreground">

          {/* BRAND */}
          <div className="space-y-4">
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
            <p className="text-sm text-muted max-w-xs">
              A serene blend of nature, comfort, and refined hospitality in the heart of Kumasi.
            </p>

            <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
              ✔ Verified & Trusted
            </span>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/85 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Contact
            </h3>

            <ul className="space-y-3 text-sm text-foreground/85">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                Kaase (BOST), Kumasi
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                053 979 5100
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                info@palmgardenhotel.com
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Connect
            </h3>

            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="glass p-3 rounded-full border border-glass-border hover:border-primary hover:text-primary transition"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-glass-border py-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} Palm Garden Hotel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
