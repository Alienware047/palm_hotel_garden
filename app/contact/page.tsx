"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2 drop-shadow-lg">
          Contact Us
        </h1>
        <p className="text-foreground/90 max-w-2xl mx-auto">
          Have questions or want to make a reservation? Reach out to us using the form below or our contact details.
        </p>
      </section>

      {/* Contact Info + Form */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">Get in Touch</h2>
          <p className="text-foreground/90">
            📍 Kaase (BOST), Kumasi
          </p>
          <p className="text-foreground/90">
            📞 053 979 5100
          </p>
          <p className="text-foreground/90">
            ✉️ info@palmgardenhotel.com
          </p>

          <div className="mt-4 flex gap-4">
            <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">
              Facebook
            </a>
            <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">
              Instagram
            </a>
            <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">
              Twitter
            </a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          className="flex flex-col gap-4 bg-background/80 dark:bg-background/70 p-6 rounded-2xl shadow-lg border border-glass-border"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <input
            type="text"
            placeholder="Full Name"
            className="glass px-4 py-2 rounded-xl border border-glass-border focus:outline-none focus:ring-2 focus:ring-yellow-400 text-foreground"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="glass px-4 py-2 rounded-xl border border-glass-border focus:outline-none focus:ring-2 focus:ring-yellow-400 text-foreground"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="glass px-4 py-2 rounded-xl border border-glass-border focus:outline-none focus:ring-2 focus:ring-yellow-400 text-foreground"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="glass px-4 py-2 rounded-xl border border-glass-border focus:outline-none focus:ring-2 focus:ring-yellow-400 text-foreground"
          />
          <button
            type="submit"
            className="mt-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:scale-105 transition transform"
          >
            Send Message
          </button>
        </motion.form>
      </section>

      {/* Map Placeholder */}
      <section className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-foreground/70 font-semibold">
          Google Maps Integration Here
        </div>
      </section>
    </main>
  );
}
