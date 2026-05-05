import React from 'react';

interface EventCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  icon
}) => {
  return (
    <div className="bg-[var(--card)] p-8 rounded-xl border border-[var(--border)] hover:border-[var(--gold)] transition-all duration-300">
      <div className="text-[var(--gold)] mb-4">
        {icon}
      </div>
      <h4 className="text-xl text-[var(--ivory)] mb-3">{title}</h4>
      <p className="text-[var(--gray)] leading-relaxed">{description}</p>
    </div>
  );
};
