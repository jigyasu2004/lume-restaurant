"use client";

import { Calendar, Clock, MapPin, Star, Users, Utensils } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { buttonStyles } from "@/components/ui/buttonStyles";
import { restaurant } from "@/data/restaurant";

export function Hero() {
  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden px-0 pb-28 pt-28 md:pb-16 md:pt-24"
      aria-label="Hero"
    >
      <Image
        src="https://images.unsplash.com/photo-1776993298456-98c71c0e177e?auto=format&fit=crop&w=2200&q=85"
        alt="Elegant LUMÉ Dining room with warm lighting"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-charcoal/70 to-charcoal/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(200,169,106,0.15),transparent_34rem)]" />

      <div className="section-shell relative z-10 py-8 text-center sm:py-12">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-md border border-gold/35 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.35em] text-gold backdrop-blur sm:mb-5"
        >
          <Utensils className="size-4" />
          {restaurant.name}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mx-auto max-w-5xl font-serif text-[clamp(2.1rem,11vw,5rem)] leading-[0.98] text-ivory"
        >
          {restaurant.tagline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-mutedText sm:mt-5 sm:text-xl sm:leading-8"
        >
          {restaurant.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="mt-6 flex flex-col justify-center gap-3 sm:mt-7 sm:flex-row sm:gap-4"
        >
          <Link
            href="/reservations"
            className={buttonStyles({ variant: "primary", size: "lg", className: "min-h-12 sm:min-h-14" })}
          >
            <Calendar className="size-5" />
            Reserve a Table
          </Link>
          <Link
            href="/menu"
            className={buttonStyles({ variant: "outline", size: "lg", className: "min-h-12 sm:min-h-14" })}
          >
            View Menu
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32 }}
          className="mx-auto mt-5 rounded-lg border border-gold/25 bg-black/25 p-2.5 text-xs text-ivory backdrop-blur sm:hidden"
        >
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-center leading-5">
            <Clock className="size-4 text-gold" />
            <span>Open today: 11:00 AM - 11:00 PM</span>
          </div>
          <div className="mt-2 flex items-center justify-center gap-4 text-gold">
            <span className="inline-flex items-center gap-1">
              <Star className="size-4 fill-current" />
              4.8 rating
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="size-4" />
              Private dining
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32 }}
          className="mx-auto mt-9 hidden max-w-4xl gap-3 sm:grid sm:grid-cols-3"
        >
          {[
            { icon: Clock, label: "Open today: 11:00 AM - 11:00 PM" },
            { icon: Star, label: "4.8 guest rating", fill: true },
            { icon: Users, label: "Private dining available" }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex min-h-16 items-center justify-center gap-2 rounded-lg border border-gold/25 bg-black/25 px-4 text-sm text-ivory backdrop-blur"
              >
                <Icon className={`size-5 text-gold ${item.fill ? "fill-current" : ""}`} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </motion.div>

        <div className="mt-7 hidden items-center justify-center gap-2 text-sm text-mutedText sm:flex">
          <MapPin className="size-4 text-gold" />
          <span>{restaurant.address.full}</span>
        </div>
      </div>
    </section>
  );
}
