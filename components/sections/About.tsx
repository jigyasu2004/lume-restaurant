import { ChefHat, Leaf, Sparkles } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Leaf,
    title: "Seasonal Ingredients",
    text: "A menu shaped by peak produce, thoughtful sourcing, and global pantry notes."
  },
  {
    icon: ChefHat,
    title: "Chef-Led Menu",
    text: "Refined dishes with enough warmth and ease for celebrations or everyday meals."
  },
  {
    icon: Sparkles,
    title: "Elegant Atmosphere",
    text: "A dark, warm dining room with gold details, intimate lighting, and attentive service."
  }
];

export function About() {
  return (
    <section className="bg-[#0b0b0b] py-20 sm:py-24">
      <div className="section-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div className="relative aspect-[5/4] overflow-hidden rounded-lg border border-gold/25 image-treatment">
            <Image
              src="https://images.unsplash.com/photo-1776993298429-9e68237f433a?auto=format&fit=crop&w=1400&q=85"
              alt="LUMÉ Dining interior prepared for dinner service"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 to-transparent" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">The dining room</p>
            <h2 className="section-title mt-4 font-serif text-ivory">
              Designed for memorable dining.
            </h2>
            <p className="mt-6 text-base leading-8 text-mutedText">
              LUMÉ Dining brings together seasonal ingredients, global techniques, and warm
              hospitality in a space designed for everyday meals, celebrations, and private
              gatherings.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="rounded-lg border border-gold/20 bg-surface p-5"
                  >
                    <Icon className="mb-3 size-7 text-gold" />
                    <h3 className="text-lg text-ivory">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-mutedText">{feature.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
