"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-background/80 glass border-t border-glass-border mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-foreground">
        {/* Hotel Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Palm Garden Hotel</h2>
          <p className="text-sm text-foreground/90">
            Relax in Nature, Comfort in Kumasi
          </p>
          <span className="mt-2 inline-block text-xs font-medium px-2 py-1 bg-primary text-black rounded-full">
            Claimed Business
          </span>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="flex flex-col gap-1">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition-colors text-sm"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact Info</h3>
          <p className="text-sm">📍 Kaase (BOST), Kumasi</p>
          <p className="text-sm">📞 053 979 5100</p>
          <p className="text-sm">✉️ info@palmgardenhotel.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-3">
            <a href="#" className="hover:text-primary transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-glass-border py-4 text-center text-sm text-foreground/80">
        © {new Date().getFullYear()} Palm Garden Hotel. All rights reserved.
      </div>
    </footer>
  );
}
