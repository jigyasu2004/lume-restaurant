import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-3xl text-[var(--gold)] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              LUMÉ
            </h3>
            <p className="text-[var(--gray)] mb-6">
              Global flavors, beautifully served. Experience chef-crafted dishes in an elegant atmosphere.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[var(--gray)] hover:text-[var(--gold)] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-[var(--gray)] hover:text-[var(--gold)] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-[var(--gray)] hover:text-[var(--gold)] transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[var(--ivory)] mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#menu" className="text-[var(--gray)] hover:text-[var(--gold)] transition-colors">Menu</a></li>
              <li><a href="#reservation" className="text-[var(--gray)] hover:text-[var(--gold)] transition-colors">Reservations</a></li>
              <li><a href="#events" className="text-[var(--gray)] hover:text-[var(--gold)] transition-colors">Private Events</a></li>
              <li><a href="#gallery" className="text-[var(--gray)] hover:text-[var(--gold)] transition-colors">Gallery</a></li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-[var(--ivory)] mb-4">Opening Hours</h4>
            <ul className="space-y-2 text-[var(--gray)] text-sm">
              <li>Monday–Thursday<br />11:00 AM – 10:00 PM</li>
              <li>Friday–Saturday<br />11:00 AM – 11:30 PM</li>
              <li>Sunday<br />10:00 AM – 9:00 PM</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[var(--ivory)] mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-[var(--gray)]">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>28 Aurora Avenue,<br />Downtown District</span>
              </li>
              <li className="flex items-center gap-3 text-[var(--gray)]">
                <Phone size={18} />
                <span>+1 (555) 284-9081</span>
              </li>
              <li className="flex items-center gap-3 text-[var(--gray)]">
                <Mail size={18} />
                <span>hello@lumedining.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--gray)] text-sm">
            © 2026 LUMÉ Dining. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-[var(--gray)] hover:text-[var(--gold)] transition-colors">Privacy Policy</a>
            <a href="#" className="text-[var(--gray)] hover:text-[var(--gold)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
