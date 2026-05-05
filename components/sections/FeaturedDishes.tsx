"use client";

import { motion } from "framer-motion";
import { MenuCard } from "@/components/menu/MenuCard";
import { featuredDishes } from "@/data/menu";

export function FeaturedDishes() {
  return (
    <section className="bg-charcoal pb-20 pt-12 sm:pb-24 sm:pt-14">
      <div className="section-shell">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Chef signatures</p>
          <h2 className="mt-4 font-serif text-4xl text-ivory sm:text-5xl">Signature dishes</h2>
          <p className="mt-4 text-mutedText">
            Seasonal ingredients, global inspiration, and refined presentation.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredDishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <MenuCard item={dish} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
