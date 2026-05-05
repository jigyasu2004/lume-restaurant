import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Button } from './components/Button';
import { DishCard } from './components/DishCard';
import { MenuItem } from './components/MenuItem';
import { TestimonialCard } from './components/TestimonialCard';
import { EventCard } from './components/EventCard';
import { Chatbot } from './components/Chatbot';
import { Map } from './components/Map';
import {
  Star,
  Clock,
  Users,
  Phone,
  MapPin,
  Mail,
  ChevronRight,
  Utensils,
  Wine,
  Calendar,
  Award,
  Leaf,
  ChefHat,
  Sparkles,
  Briefcase,
  PartyPopper,
  UtensilsCrossed,
  Check,
  X,
  Minus,
  Plus
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('starters');
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [cart, setCart] = useState<Array<{ id: string; name: string; price: number; quantity: number }>>([]);
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');

  const addToCart = (id: string, name: string, price: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id, name, price, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      const updated = prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      ).filter(item => item.quantity > 0);
      return updated;
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const menuItems = {
    starters: [
      {
        name: 'Burrata & Heirloom Tomato',
        description: 'Creamy burrata, basil oil, aged balsamic, toasted sourdough',
        price: '$14',
        tags: ['Vegetarian'],
        image: 'https://images.unsplash.com/photo-1598309141235-06d295271f81?w=400'
      },
      {
        name: 'Seared Tuna Tataki',
        description: 'Sesame crust, citrus soy, pickled cucumber',
        price: '$18',
        tags: ['Chef\'s Pick'],
        image: 'https://images.unsplash.com/photo-1541963020-4f9732b3ee29?w=400'
      },
      {
        name: 'Mediterranean Mezze Board',
        description: 'Hummus, baba ganoush, olives, grilled pita',
        price: '$16',
        tags: ['Vegan', 'New'],
        image: 'https://images.unsplash.com/photo-1689672235271-727de51355e6?w=400'
      },
      {
        name: 'Crispy Calamari',
        description: 'Lightly fried squid, spicy aioli, lemon wedge',
        price: '$15',
        tags: ['Gluten-Free'],
        image: 'https://images.unsplash.com/photo-1558679582-4d81ce75993a?w=400'
      },
      {
        name: 'Bruschetta Trio',
        description: 'Tomato basil, mushroom truffle, roasted pepper tapenade',
        price: '$12',
        tags: ['Vegetarian'],
        image: 'https://images.unsplash.com/photo-1761315412580-08dd503b8d89?w=400'
      },
      {
        name: 'Beef Carpaccio',
        description: 'Thinly sliced beef, arugula, parmesan, capers',
        price: '$19',
        tags: ['Chef\'s Pick'],
        image: 'https://images.unsplash.com/photo-1536739782508-c2388552aad3?w=400'
      }
    ],
    mains: [
      {
        name: 'Wild Mushroom Risotto',
        description: 'Parmesan, truffle oil, herb gremolata',
        price: '$24',
        tags: ['Vegetarian', 'Chef\'s Pick'],
        image: 'https://images.unsplash.com/photo-1718939043990-83078968ae7e?w=400'
      },
      {
        name: 'Charred Citrus Salmon',
        description: 'Fennel salad, lemon butter, seasonal greens',
        price: '$29',
        tags: ['Gluten-Free'],
        image: 'https://images.unsplash.com/photo-1771995356656-3a5e975318e9?w=400'
      },
      {
        name: 'Braised Short Rib',
        description: 'Red wine reduction, creamy polenta, roasted vegetables',
        price: '$32',
        tags: ['Chef\'s Pick'],
        image: 'https://images.unsplash.com/photo-1763186711083-406cf3ea5665?w=400'
      },
      {
        name: 'Grilled Ribeye Steak',
        description: '12oz USDA Prime, herb butter, truffle fries, seasonal vegetables',
        price: '$42',
        tags: ['Chef\'s Pick'],
        image: 'https://images.unsplash.com/photo-1774806288060-70caeeadc80b?w=400'
      },
      {
        name: 'Seafood Linguine',
        description: 'Prawns, mussels, clams, white wine garlic sauce',
        price: '$28',
        tags: [],
        image: 'https://images.unsplash.com/photo-1676471926534-d5c9771909fa?w=400'
      },
      {
        name: 'Duck Confit',
        description: 'Crispy duck leg, orange glaze, roasted root vegetables',
        price: '$34',
        tags: ['Chef\'s Pick'],
        image: 'https://images.unsplash.com/photo-1718939044138-5b76d9dd938b?w=400'
      },
      {
        name: 'Truffle Pasta Carbonara',
        description: 'Fresh pasta, crispy pancetta, parmesan, black truffle',
        price: '$26',
        tags: ['New'],
        image: 'https://images.unsplash.com/photo-1764586119076-61711e8ed25a?w=400'
      },
      {
        name: 'Pan-Seared Sea Bass',
        description: 'Mediterranean vegetables, saffron cream, basil oil',
        price: '$35',
        tags: ['Gluten-Free'],
        image: 'https://images.unsplash.com/photo-1598298106341-8dab0f84a4d9?w=400'
      }
    ],
    desserts: [
      {
        name: 'Dark Chocolate Fondant',
        description: 'Hazelnut cream, vanilla gelato',
        price: '$12',
        tags: ['Chef\'s Pick'],
        image: 'https://images.unsplash.com/photo-1762631176828-0df84208e91b?w=400'
      },
      {
        name: 'Lemon Tart',
        description: 'Toasted meringue, fresh berries, mint',
        price: '$10',
        tags: [],
        image: 'https://images.unsplash.com/photo-1768341857441-9084cfd8676e?w=400'
      },
      {
        name: 'Tiramisu',
        description: 'Espresso-soaked ladyfingers, mascarpone, cocoa',
        price: '$11',
        tags: [],
        image: 'https://images.unsplash.com/photo-1681564334698-8c85a9b4b1f8?w=400'
      },
      {
        name: 'Crème Brûlée',
        description: 'Classic vanilla custard, caramelized sugar',
        price: '$10',
        tags: ['Gluten-Free'],
        image: 'https://images.unsplash.com/photo-1587322740944-9bc2776404e8?w=400'
      },
      {
        name: 'Cheesecake',
        description: 'New York style, berry compote, whipped cream',
        price: '$11',
        tags: [],
        image: 'https://images.unsplash.com/photo-1740594967618-23cd757b9291?w=400'
      },
      {
        name: 'Seasonal Fruit Tart',
        description: 'Vanilla pastry cream, fresh seasonal fruits, honey glaze',
        price: '$12',
        tags: ['Vegetarian'],
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400'
      }
    ],
    drinks: [
      {
        name: 'Signature Citrus Spritz',
        description: 'Botanical aperitif, orange, sparkling wine',
        price: '$11',
        tags: ['New'],
        image: 'https://images.unsplash.com/photo-1767745455688-49391131f751?w=400'
      },
      {
        name: 'Lavender Martini',
        description: 'Premium vodka, lavender syrup, fresh lemon',
        price: '$13',
        tags: [],
        image: 'https://images.unsplash.com/photo-1768508948990-f5866f800fad?w=400'
      },
      {
        name: 'Old Fashioned',
        description: 'Bourbon, bitters, orange peel, cherry',
        price: '$14',
        tags: ['Classic'],
        image: 'https://images.unsplash.com/photo-1759646827243-9ec6cb0a1171?w=400'
      },
      {
        name: 'Champagne',
        description: 'Premium French champagne, chilled',
        price: '$16',
        tags: [],
        image: 'https://images.unsplash.com/photo-1768508947605-8c7a50aed683?w=400'
      },
      {
        name: 'Espresso Martini',
        description: 'Vodka, coffee liqueur, fresh espresso',
        price: '$13',
        tags: [],
        image: 'https://images.unsplash.com/photo-1591603319407-756301df8815?w=400'
      },
      {
        name: 'Mojito',
        description: 'White rum, mint, lime, soda',
        price: '$12',
        tags: [],
        image: 'https://images.unsplash.com/photo-1777791375148-5d568498cec2?w=400'
      }
    ],
    brunch: [
      {
        name: 'Truffle Eggs Benedict',
        description: 'Poached eggs, crispy prosciutto, hollandaise, truffle oil',
        price: '$18',
        tags: ['Chef\'s Pick'],
        image: 'https://images.unsplash.com/photo-1627733810457-3c027bbb4dbb?w=400'
      },
      {
        name: 'Avocado Toast Deluxe',
        description: 'Sourdough, smashed avocado, poached egg, cherry tomatoes, feta',
        price: '$15',
        tags: ['Vegetarian'],
        image: 'https://images.unsplash.com/photo-1674649203068-e9fd9c4a5620?w=400'
      },
      {
        name: 'Buttermilk Pancakes',
        description: 'Fluffy pancakes, maple syrup, fresh berries, whipped butter',
        price: '$14',
        tags: ['Vegetarian'],
        image: 'https://images.unsplash.com/photo-1610898763980-367f03bd7edc?w=400'
      },
      {
        name: 'French Toast',
        description: 'Brioche bread, cinnamon, vanilla, berry compote',
        price: '$14',
        tags: [],
        image: 'https://images.unsplash.com/photo-1670710029032-02771d92444d?w=400'
      },
      {
        name: 'Smoked Salmon Bagel',
        description: 'Toasted bagel, cream cheese, capers, red onion, cucumber',
        price: '$16',
        tags: [],
        image: 'https://images.unsplash.com/photo-1603073162475-cbebff32204e?w=400'
      },
      {
        name: 'Full English Breakfast',
        description: 'Eggs, bacon, sausage, mushrooms, tomato, beans, toast',
        price: '$19',
        tags: [],
        image: 'https://images.unsplash.com/photo-1561865259-174cbd7e0fd3?w=400'
      }
    ]
  };

  const signatureDishes = [
    {
      image: 'https://images.unsplash.com/photo-1718939043990-83078968ae7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      name: 'Truffle Mushroom Risotto',
      description: 'Creamy arborio rice with wild mushrooms, parmesan, and truffle oil',
      price: '$24',
      tags: ['Vegetarian', 'Chef\'s Pick']
    },
    {
      image: 'https://images.unsplash.com/photo-1771995356656-3a5e975318e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      name: 'Charred Citrus Salmon',
      description: 'Pan-seared salmon with fennel salad and lemon butter sauce',
      price: '$29',
      tags: ['Gluten-Free']
    },
    {
      image: 'https://images.unsplash.com/photo-1689672235271-727de51355e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      name: 'Mediterranean Mezze Board',
      description: 'Selection of dips, olives, grilled vegetables, and fresh pita',
      price: '$16',
      tags: ['Vegan', 'New']
    },
    {
      image: 'https://images.unsplash.com/photo-1762631176828-0df84208e91b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
      name: 'Chocolate Hazelnut Fondant',
      description: 'Molten chocolate cake with hazelnut cream and vanilla gelato',
      price: '$12',
      tags: ['Chef\'s Pick']
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--charcoal)]">
      <Header />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1776993298456-98c71c0e177e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1600')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[var(--charcoal)]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl text-[var(--ivory)] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
            Global flavors, beautifully served.
          </h1>
          <p className="text-xl md:text-2xl text-[var(--gray)] mb-8 max-w-2xl mx-auto">
            Experience chef-crafted dishes, elegant interiors, and effortless reservations in the heart of the city.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="primary" onClick={() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })}>
              Reserve a Table
            </Button>
            <Button variant="outline" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>
              View Menu
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-[var(--ivory)]">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-[var(--gold)]" />
              <span className="text-sm">Open today: 11:00 AM – 11:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={20} className="text-[var(--gold)]" fill="var(--gold)" />
              <span className="text-sm">4.8 guest rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={20} className="text-[var(--gold)]" />
              <span className="text-sm">Private dining available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-[var(--charcoal)] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-[var(--ivory)] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Signature dishes
            </h2>
            <p className="text-xl text-[var(--gray)] max-w-2xl mx-auto">
              Seasonal ingredients, global inspiration, and refined presentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {signatureDishes.map((dish, index) => (
              <DishCard key={index} {...dish} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="https://images.unsplash.com/photo-1776993298429-9e68237f433a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                alt="Elegant dining"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl text-[var(--ivory)] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                Designed for memorable dining.
              </h2>
              <p className="text-lg text-[var(--gray)] mb-8 leading-relaxed">
                LUMÉ Dining brings together seasonal ingredients, global techniques, and warm hospitality in a space designed for everyday meals, celebrations, and private gatherings.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-[var(--card)] rounded-lg border border-[var(--border)]">
                  <Leaf size={32} className="text-[var(--gold)] mx-auto mb-3" />
                  <h4 className="text-[var(--ivory)] mb-2">Seasonal Ingredients</h4>
                </div>
                <div className="text-center p-6 bg-[var(--card)] rounded-lg border border-[var(--border)]">
                  <ChefHat size={32} className="text-[var(--gold)] mx-auto mb-3" />
                  <h4 className="text-[var(--ivory)] mb-2">Chef-Led Menu</h4>
                </div>
                <div className="text-center p-6 bg-[var(--card)] rounded-lg border border-[var(--border)]">
                  <Sparkles size={32} className="text-[var(--gold)] mx-auto mb-3" />
                  <h4 className="text-[var(--ivory)] mb-2">Elegant Atmosphere</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Menu Preview */}
      <section id="menu" className="py-24 px-4 bg-gradient-to-b from-[#0a0a0a] to-[var(--charcoal)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-[var(--ivory)] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Explore our menu
            </h2>
            <p className="text-xl text-[var(--gray)]">
              Carefully crafted dishes for every occasion
            </p>
          </div>

          {/* Menu Tabs */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {['starters', 'mains', 'desserts', 'drinks', 'brunch'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg transition-all capitalize relative ${
                  activeTab === tab
                    ? 'bg-[var(--gold)] text-[var(--charcoal)]'
                    : 'bg-[var(--card)] text-[var(--ivory)] border border-[var(--border)] hover:border-[var(--gold)]'
                }`}
              >
                {tab}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab ? 'bg-[var(--charcoal)] text-[var(--gold)]' : 'bg-[var(--muted)] text-[var(--gray)]'
                }`}>
                  {menuItems[tab as keyof typeof menuItems].length}
                </span>
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="mb-6">
            <p className="text-[var(--gray)] text-sm">
              Showing {menuItems[activeTab as keyof typeof menuItems].length} {activeTab}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {menuItems[activeTab as keyof typeof menuItems].map((item, index) => (
              <MenuItem key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservation" className="py-24 px-4 bg-[var(--charcoal)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-[var(--ivory)] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Reserve your table
            </h2>
            <p className="text-xl text-[var(--gray)]">
              Book your dining experience with us
            </p>
          </div>

          {!reservationSubmitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setReservationSubmitted(true);
              }}
              className="bg-[var(--card)] p-8 rounded-2xl border border-[var(--border)]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[var(--ivory)] mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[var(--input-background)] text-[var(--ivory)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-[var(--ivory)] mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[var(--input-background)] text-[var(--ivory)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[var(--ivory)] mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[var(--input-background)] text-[var(--ivory)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-[var(--ivory)] mb-2">Number of Guests</label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[var(--input-background)] text-[var(--ivory)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none"
                  >
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4 guests</option>
                    <option>5+ guests</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[var(--ivory)] mb-2">Date</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[var(--input-background)] text-[var(--ivory)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[var(--ivory)] mb-2">Time</label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[var(--input-background)] text-[var(--ivory)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none"
                  >
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>1:00 PM</option>
                    <option>6:00 PM</option>
                    <option>7:00 PM</option>
                    <option>8:00 PM</option>
                    <option>9:00 PM</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[var(--ivory)] mb-2">Occasion</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-[var(--input-background)] text-[var(--ivory)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none">
                    <option>General dining</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                    <option>Business meal</option>
                    <option>Special celebration</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[var(--ivory)] mb-2">Special Requests</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--input-background)] text-[var(--ivory)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none"
                    placeholder="Dietary restrictions, seating preferences, etc."
                  ></textarea>
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Confirm Reservation
              </Button>
            </form>
          ) : (
            <div className="bg-[var(--card)] p-12 rounded-2xl border border-[var(--gold)] text-center">
              <div className="w-16 h-16 bg-[var(--gold)] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-[var(--charcoal)]" />
              </div>
              <h3 className="text-2xl text-[var(--ivory)] mb-4">Thank you!</h3>
              <p className="text-[var(--gray)] mb-6">
                Your reservation request has been received. We'll contact you shortly to confirm.
              </p>
              <Button variant="outline" onClick={() => setReservationSubmitted(false)}>
                Make Another Reservation
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Online Ordering Section */}
      <section id="order" className="py-24 px-4 bg-gradient-to-b from-[var(--charcoal)] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-[var(--ivory)] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Order online
            </h2>
            <p className="text-xl text-[var(--gray)]">
              Enjoy LUMÉ at home
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Menu Items for Ordering */}
            <div className="lg:col-span-2">
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setOrderType('pickup')}
                  className={`flex-1 py-3 rounded-lg transition-all ${
                    orderType === 'pickup'
                      ? 'bg-[var(--gold)] text-[var(--charcoal)]'
                      : 'bg-[var(--card)] text-[var(--ivory)] border border-[var(--border)]'
                  }`}
                >
                  Pickup
                </button>
                <button
                  onClick={() => setOrderType('delivery')}
                  className={`flex-1 py-3 rounded-lg transition-all ${
                    orderType === 'delivery'
                      ? 'bg-[var(--gold)] text-[var(--charcoal)]'
                      : 'bg-[var(--card)] text-[var(--ivory)] border border-[var(--border)]'
                  }`}
                >
                  Delivery
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {signatureDishes.map((dish, index) => (
                  <div key={index} className="bg-[var(--card)] rounded-lg overflow-hidden border border-[var(--border)]">
                    <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h4 className="text-[var(--ivory)] mb-2">{dish.name}</h4>
                      <p className="text-[var(--gray)] text-sm mb-3">{dish.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[var(--gold)]">{dish.price}</span>
                        <Button
                          variant="primary"
                          className="py-2 px-4"
                          onClick={() => addToCart(dish.name, dish.name, parseInt(dish.price.replace('$', '')))}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[var(--card)] p-6 rounded-2xl border border-[var(--border)] sticky top-24">
                <h3 className="text-2xl text-[var(--ivory)] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                  Your Order
                </h3>

                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <Utensils size={48} className="text-[var(--gray)] mx-auto mb-4 opacity-50" />
                    <p className="text-[var(--gray)]">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                          <div className="flex-1">
                            <h4 className="text-[var(--ivory)] text-sm">{item.name}</h4>
                            <p className="text-[var(--gold)] text-sm">${item.price}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded bg-[var(--muted)] text-[var(--ivory)] hover:bg-[var(--gold)] hover:text-[var(--charcoal)] transition-colors"
                            >
                              <Minus size={16} className="mx-auto" />
                            </button>
                            <span className="text-[var(--ivory)] w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 rounded bg-[var(--muted)] text-[var(--ivory)] hover:bg-[var(--gold)] hover:text-[var(--charcoal)] transition-colors"
                            >
                              <Plus size={16} className="mx-auto" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-[var(--border)] pt-4 mb-6">
                      <div className="flex justify-between text-[var(--ivory)] mb-4">
                        <span>Subtotal</span>
                        <span className="text-[var(--gold)]">${cartTotal}</span>
                      </div>
                    </div>

                    <Button variant="primary" className="w-full">
                      Proceed to Checkout
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Private Events Section */}
      <section id="events" className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-[var(--ivory)] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Private dining & events
            </h2>
            <p className="text-xl text-[var(--gray)] max-w-2xl mx-auto">
              Host intimate dinners, corporate gatherings, celebrations, and chef's table experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <EventCard
              icon={<Briefcase size={40} />}
              title="Corporate Dinners"
              description="Professional setting for business meetings and client entertainment with personalized menus."
            />
            <EventCard
              icon={<PartyPopper size={40} />}
              title="Celebrations"
              description="Birthdays, anniversaries, and special occasions in a private, elegant atmosphere."
            />
            <EventCard
              icon={<UtensilsCrossed size={40} />}
              title="Chef's Table"
              description="Exclusive culinary experience with the chef preparing a custom tasting menu."
            />
          </div>

          <div className="max-w-2xl mx-auto bg-[var(--card)] p-8 rounded-2xl border border-[var(--border)]">
            <h3 className="text-2xl text-[var(--ivory)] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              Event Inquiry
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[var(--ivory)] mb-2">Event Type</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-[var(--input-background)] text-[var(--ivory)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none">
                    <option>Corporate Dinner</option>
                    <option>Celebration</option>
                    <option>Chef's Table</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[var(--ivory)] mb-2">Guest Count</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--input-background)] text-[var(--ivory)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none"
                    placeholder="10"
                  />
                </div>
                <div>
                  <label className="block text-[var(--ivory)] mb-2">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--input-background)] text-[var(--ivory)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[var(--ivory)] mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--input-background)] text-[var(--ivory)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none"
                    placeholder="events@company.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[var(--ivory)] mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--input-background)] text-[var(--ivory)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none"
                    placeholder="Tell us about your event..."
                  ></textarea>
                </div>
              </div>
              <Button variant="primary" className="w-full">
                Submit Inquiry
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-4 bg-gradient-to-b from-[#0a0a0a] to-[var(--charcoal)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-[var(--ivory)] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Gallery
            </h2>
            <p className="text-xl text-[var(--gray)]">
              A glimpse into the LUMÉ experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1776993298422-3e8c397d0235?w=600',
              'https://images.unsplash.com/photo-1718939044138-5b76d9dd938b?w=600',
              'https://images.unsplash.com/photo-1767745455688-49391131f751?w=600',
              'https://images.unsplash.com/photo-1776993298429-9e68237f433a?w=600',
              'https://images.unsplash.com/photo-1762631176828-0df84208e91b?w=600',
              'https://images.unsplash.com/photo-1768508948990-f5866f800fad?w=600',
              'https://images.unsplash.com/photo-1676471926534-d5c9771909fa?w=600',
              'https://images.unsplash.com/photo-1768697358705-c1b60333da35?w=600'
            ].map((img, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg group cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 px-4 bg-[var(--charcoal)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-[var(--ivory)] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Loved by our guests
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              review="Beautiful atmosphere, excellent service, and a menu that felt truly global."
              name="Sarah Mitchell"
              rating={5}
            />
            <TestimonialCard
              review="Perfect for business dinners, date nights, and weekend brunch."
              name="James Chen"
              rating={5}
            />
            <TestimonialCard
              review="The reservation experience was smooth and the dining experience was unforgettable."
              name="Emily Rodriguez"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-gradient-to-b from-[var(--charcoal)] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-[var(--ivory)] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Visit us
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-[var(--card)] p-8 rounded-2xl border border-[var(--border)]">
                <h3 className="text-2xl text-[var(--ivory)] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                  LUMÉ Dining
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin size={24} className="text-[var(--gold)] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-[var(--ivory)]">28 Aurora Avenue</p>
                      <p className="text-[var(--gray)]">Downtown District</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Phone size={24} className="text-[var(--gold)] flex-shrink-0" />
                    <a href="tel:+15552849081" className="text-[var(--ivory)] hover:text-[var(--gold)] transition-colors">
                      +1 (555) 284-9081
                    </a>
                  </div>

                  <div className="flex items-center gap-4">
                    <Mail size={24} className="text-[var(--gold)] flex-shrink-0" />
                    <a href="mailto:hello@lumedining.com" className="text-[var(--ivory)] hover:text-[var(--gold)] transition-colors">
                      hello@lumedining.com
                    </a>
                  </div>

                  <div className="flex items-start gap-4 pt-4 border-t border-[var(--border)]">
                    <Clock size={24} className="text-[var(--gold)] flex-shrink-0 mt-1" />
                    <div className="text-[var(--gray)]">
                      <p>Monday–Thursday: 11:00 AM – 10:00 PM</p>
                      <p>Friday–Saturday: 11:00 AM – 11:30 PM</p>
                      <p>Sunday: 10:00 AM – 9:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <Button variant="primary">Get Directions</Button>
                  <Button variant="outline">Call Now</Button>
                </div>
              </div>
            </div>

            <div className="h-96">
              <Map />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl text-[var(--ivory)] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Join the LUMÉ list
          </h2>
          <p className="text-xl text-[var(--gray)] mb-8">
            Receive seasonal menu updates, private event invitations, and exclusive dining offers.
          </p>

          {!newsletterSubmitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setNewsletterSubmitted(true);
              }}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                className="flex-1 px-6 py-4 rounded-lg bg-[var(--input-background)] text-[var(--ivory)] border border-[var(--border)] focus:border-[var(--gold)] focus:outline-none"
              />
              <Button type="submit" variant="primary">
                Subscribe
              </Button>
            </form>
          ) : (
            <div className="bg-[var(--card)] p-8 rounded-2xl border border-[var(--gold)]">
              <Check size={32} className="text-[var(--gold)] mx-auto mb-4" />
              <p className="text-[var(--ivory)]">Thank you for subscribing!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Mobile Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[var(--charcoal)]/95 backdrop-blur-md border-t border-[var(--border)] md:hidden z-40">
        <div className="grid grid-cols-4 gap-2 p-3">
          <button
            onClick={() => window.location.href = 'tel:+15552849081'}
            className="flex flex-col items-center gap-1 text-[var(--ivory)] hover:text-[var(--gold)] transition-colors"
          >
            <Phone size={20} />
            <span className="text-xs">Call</span>
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-1 text-[var(--ivory)] hover:text-[var(--gold)] transition-colors"
          >
            <MapPin size={20} />
            <span className="text-xs">Directions</span>
          </button>
          <button
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-1 text-[var(--ivory)] hover:text-[var(--gold)] transition-colors"
          >
            <Utensils size={20} />
            <span className="text-xs">Menu</span>
          </button>
          <button
            onClick={() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-1 text-[var(--gold)]"
          >
            <Calendar size={20} />
            <span className="text-xs">Reserve</span>
          </button>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}

export default App;