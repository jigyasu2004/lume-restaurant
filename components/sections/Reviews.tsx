import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";

export function Reviews() {
  return (
    <section className="bg-[#0b0b0b] py-20 sm:py-24">
      <div className="section-shell">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Guest notes</p>
          <h2 className="section-title mt-4 font-serif text-ivory">Loved by our guests</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.id} className="rounded-lg border border-gold/25 bg-surface p-6">
              <div className="mb-5 flex gap-1 text-gold" aria-label={`${review.rating} stars`}>
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" />
                ))}
              </div>
              <p className="text-lg leading-8 text-ivory">{review.review}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-full border border-gold/35 bg-[#202020] text-sm text-gold">
                  {review.initials}
                </div>
                <p className="text-sm text-mutedText">{review.name}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
