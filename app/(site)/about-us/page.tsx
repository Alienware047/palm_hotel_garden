"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HotelFacilities } from "../../../components/frontend/facilities/hotelfacilities";

export default function AboutUsPage() {
  return (
    <div className="mt-16 max-w-6xl mx-auto px-6 py-16 space-y-16 pt-24">
      {/* Page Header */}
      <section className="relative min-h-[70vh] flex items-center justify-center text-center overflow-hidden rounded-3xl">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/about/header.jpg')" }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative z-10 px-6">
          <motion.h1
            className="text-5xl font-bold text-white mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Palm Garden Hotel
          </motion.h1>

          <motion.p
            className="text-lg text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Experience luxury, comfort, and nature in the heart of Kumasi. From our
            exquisite restaurant to our dedicated staff, every detail is designed
            for your relaxation.
          </motion.p>
        </div>
      </section>


      {/* Our Restaurant */}
      <section className="flex flex-col md:flex-row items-center gap-8">
        <motion.img
          src="/restaurant.jpg"
          alt="Restaurant"
          className="w-full md:w-1/2 h-64 object-cover rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="md:w-1/2 space-y-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-foreground">Our Restaurant</h2>
          <p className="text-foreground/90">
            Our restaurant offers fine dining with both local and international cuisine.
            Enjoy a relaxed atmosphere and exquisite presentation, prepared by our
            talented chefs. From breakfast to dinner, every meal is crafted with care.
          </p>
        </motion.div>
      </section>

      {/* Our Staff */}
      <section className="space-y-8">
        <motion.h2
          className="text-3xl font-semibold text-foreground text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Dedicated Staff
        </motion.h2>
        <motion.p
          className="text-center text-foreground/90 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Our professional and friendly staff are committed to ensuring your
          stay is unforgettable. From housekeeping to reception, every team member
          is trained to provide excellence and personalized care.
        </motion.p>

          {/* Staff Section */}
      <motion.section
        className="space-y-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-foreground drop-shadow-lg">
          Meet Our Team
        </h2>
        <p className="text-foreground/90 max-w-2xl mx-auto">
          Our friendly and professional staff are dedicated to making your stay memorable.
        </p>
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg mx-auto max-w-4xl">
          <Image
            src="/about/staff-group.jpg"
            alt="Hotel Staff"
            fill
            className="object-cover"
          />
        </div>
      </motion.section>
      </section>
      

      {/* Founder */}
      <section className="flex flex-col md:flex-row items-center gap-8">
        <motion.div
          className="md:w-1/2 space-y-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-foreground">Our Founder</h2>
          <p className="text-foreground/90">
            Palm Garden Hotel was founded by <strong>Mr. Kwame Mensah</strong>, a
            visionary entrepreneur passionate about hospitality and creating
            memorable experiences. His dedication to service excellence
            continues to inspire the team and shape the hotel's ethos.
          </p>
        </motion.div>
        <motion.img
          src="/founder.jpg"
          alt="Founder"
          className="w-full md:w-1/2 h-64 object-cover rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
      </section>

      {/* Our Services */}
      <HotelFacilities/>
    </div>
  );
}
