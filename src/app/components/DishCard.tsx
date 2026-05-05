import React from 'react';
import { Button } from './Button';

interface DishCardProps {
  image: string;
  name: string;
  description: string;
  price: string;
  tags?: string[];
}

export const DishCard: React.FC<DishCardProps> = ({
  image,
  name,
  description,
  price,
  tags = []
}) => {
  return (
    <div className="bg-[var(--card)] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl text-[var(--ivory)]">{name}</h3>
          <span className="text-[var(--gold)] ml-3">{price}</span>
        </div>
        <p className="text-[var(--gray)] mb-4 text-sm leading-relaxed">{description}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[var(--muted)] text-[var(--gold)] rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <Button variant="primary" className="w-full">Add to Order</Button>
      </div>
    </div>
  );
};
