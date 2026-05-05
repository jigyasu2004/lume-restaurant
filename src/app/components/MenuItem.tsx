import React from 'react';
import { Plus } from 'lucide-react';

interface MenuItemProps {
  name: string;
  description: string;
  price: string;
  tags?: string[];
  image?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  name,
  description,
  price,
  tags = [],
  image
}) => {
  return (
    <div className="bg-[var(--card)] rounded-lg hover:bg-[#222] transition-all duration-300 border border-[var(--border)] overflow-hidden group">
      <div className="flex gap-4">
        {image && (
          <div className="w-32 h-32 flex-shrink-0 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}
        <div className="flex-1 p-4 flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-lg text-[var(--ivory)] mb-1">{name}</h4>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-[var(--muted)] text-[var(--gold)] rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-[var(--gray)] text-sm">{description}</p>
          </div>
          <div className="flex flex-col items-end gap-2 ml-4">
            <span className="text-[var(--gold)] font-medium">{price}</span>
            <button className="p-2 rounded-full bg-[var(--gold)] text-[var(--charcoal)] hover:bg-[#D4B87A] transition-colors">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
