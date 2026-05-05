import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'px-6 py-3 rounded-lg transition-all duration-300 font-medium';

  const variants = {
    primary: 'bg-[var(--gold)] text-[var(--charcoal)] hover:bg-[#D4B87A] shadow-lg hover:shadow-xl',
    secondary: 'bg-[var(--terracotta)] text-white hover:bg-[#C77A60] shadow-lg hover:shadow-xl',
    outline: 'border-2 border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--charcoal)]'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
