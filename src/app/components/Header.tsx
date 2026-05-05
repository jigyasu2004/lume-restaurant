import React, { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Button } from './Button';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[var(--charcoal)]/95 backdrop-blur-md z-50 border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="text-3xl tracking-wider text-[var(--gold)]" style={{ fontFamily: 'var(--font-serif)' }}>
            LUMÉ
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="text-[var(--ivory)] hover:text-[var(--gold)] transition-colors">Home</button>
            <button onClick={() => scrollToSection('menu')} className="text-[var(--ivory)] hover:text-[var(--gold)] transition-colors">Menu</button>
            <button onClick={() => scrollToSection('reservation')} className="text-[var(--ivory)] hover:text-[var(--gold)] transition-colors">Reservations</button>
            <button onClick={() => scrollToSection('events')} className="text-[var(--ivory)] hover:text-[var(--gold)] transition-colors">Private Events</button>
            <button onClick={() => scrollToSection('gallery')} className="text-[var(--ivory)] hover:text-[var(--gold)] transition-colors">Gallery</button>
            <button onClick={() => scrollToSection('contact')} className="text-[var(--ivory)] hover:text-[var(--gold)] transition-colors">Contact</button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => scrollToSection('order')} className="text-[var(--ivory)] hover:text-[var(--gold)] transition-colors flex items-center gap-2">
              <ShoppingBag size={20} />
              Order Online
            </button>
            <Button variant="primary" onClick={() => scrollToSection('reservation')}>
              Reserve a Table
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[var(--ivory)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-6 flex flex-col gap-4">
            <button onClick={() => scrollToSection('home')} className="text-[var(--ivory)] hover:text-[var(--gold)] transition-colors text-left">Home</button>
            <button onClick={() => scrollToSection('menu')} className="text-[var(--ivory)] hover:text-[var(--gold)] transition-colors text-left">Menu</button>
            <button onClick={() => scrollToSection('reservation')} className="text-[var(--ivory)] hover:text-[var(--gold)] transition-colors text-left">Reservations</button>
            <button onClick={() => scrollToSection('events')} className="text-[var(--ivory)] hover:text-[var(--gold)] transition-colors text-left">Private Events</button>
            <button onClick={() => scrollToSection('gallery')} className="text-[var(--ivory)] hover:text-[var(--gold)] transition-colors text-left">Gallery</button>
            <button onClick={() => scrollToSection('contact')} className="text-[var(--ivory)] hover:text-[var(--gold)] transition-colors text-left">Contact</button>
            <button onClick={() => scrollToSection('order')} className="text-[var(--ivory)] hover:text-[var(--gold)] transition-colors text-left flex items-center gap-2">
              <ShoppingBag size={20} />
              Order Online
            </button>
            <Button variant="primary" onClick={() => scrollToSection('reservation')}>
              Reserve a Table
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};
