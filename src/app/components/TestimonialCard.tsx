import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  review: string;
  name: string;
  rating: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  review,
  name,
  rating
}) => {
  return (
    <div className="bg-[var(--card)] p-8 rounded-xl border border-[var(--border)]">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={20} fill="var(--gold)" stroke="var(--gold)" />
        ))}
      </div>
      <p className="text-[var(--ivory)] mb-6 leading-relaxed italic">
        "{review}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[var(--gold)] flex items-center justify-center text-[var(--charcoal)]">
          {name.charAt(0)}
        </div>
        <span className="text-[var(--gray)]">{name}</span>
      </div>
    </div>
  );
};
