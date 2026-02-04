"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <main className=" space-y-24">

      {/* ================= HERO ================= */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <img
          src="/contact/header.jpg"
          alt="Palm Garden Hotel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-white px-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold drop-shadow-xl">
            Contact Palm Garden
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/90 text-lg">
            Experience comfort, luxury, and exceptional hospitality in the heart of Kumasi.
          </p>
        </motion.div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT: INFO + IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="text-foreground/80 max-w-md">
              Whether you're booking a stay, planning an event, or have inquiries,
              our team is ready to assist you.
            </p>
          </div>

          {/* CONTACT DETAILS */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 glass p-4 rounded-xl">
              <MapPin className="text-primary" />
              <span className="text-foreground">Kaase (BOST), Kumasi</span>
            </div>
            <div className="flex items-center gap-4 glass p-4 rounded-xl">
              <Phone className="text-primary" />
              <span className="text-foreground">053 979 5100</span>
            </div>
            <div className="flex items-center gap-4 glass p-4 rounded-xl">
              <Mail className="text-primary" />
              <span className="text-foreground">info@palmgardenhotel.com</span>
            </div>
          </div>

          {/* IMAGE CARD */}
          <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/images/hotel-lobby.jpg"
              alt="Hotel Lobby"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* RIGHT: FORM */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass no-hover p-8 rounded-3xl shadow-2xl space-y-5"
        >
          <h3 className="text-2xl font-semibold text-foreground">
            Send Us a Message
          </h3>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full glass px-4 py-3 rounded-xl border border-glass-border focus:ring-2 focus:ring-primary outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full glass px-4 py-3 rounded-xl border border-glass-border focus:ring-2 focus:ring-primary outline-none"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full glass px-4 py-3 rounded-xl border border-glass-border focus:ring-2 focus:ring-primary outline-none"
          />
          <textarea
            rows={5}
            placeholder="Your Message"
            className="w-full glass px-4 py-3 rounded-xl border border-glass-border focus:ring-2 focus:ring-primary outline-none"
          />

          <button
            type="submit"
            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:scale-[1.03] transition-transform"
          >
            Send Message
          </button>
        </motion.form>
      </section>

      {/* ================= MAP ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
          <iframe
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Kaase%20BOST%20Kumasi&output=embed"
          />
        </div>
      </section>

    </main>
  );
}
