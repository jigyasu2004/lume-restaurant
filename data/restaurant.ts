export const restaurant = {
  name: "LUMÉ Dining",
  wordmark: "LUMÉ",
  tagline: "Global flavors, beautifully served.",
  description:
    "Experience chef-crafted dishes, elegant interiors, and effortless reservations in the heart of the city.",
  address: {
    street: "28 Aurora Avenue",
    district: "Downtown District",
    full: "28 Aurora Avenue, Downtown District"
  },
  phone: "+1 (555) 284-9081",
  phoneHref: "tel:+15552849081",
  email: "hello@lumedining.com",
  emailHref: "mailto:hello@lumedining.com",
  map: {
    latitude: 40.7484,
    longitude: -73.9857,
    zoom: 16
  },
  directionsUrl:
    "https://www.openstreetmap.org/directions?to=40.7484%2C-73.9857#map=16/40.7484/-73.9857",
  mapUrl: "https://www.openstreetmap.org/?mlat=40.7484&mlon=-73.9857#map=16/40.7484/-73.9857",
  openingHours: [
    { days: "Monday-Thursday", hours: "11:00 AM - 10:00 PM" },
    { days: "Friday-Saturday", hours: "11:00 AM - 11:30 PM" },
    { days: "Sunday", hours: "10:00 AM - 9:00 PM" }
  ],
  openingHoursSchema: ["Mo-Th 11:00-22:00", "Fr-Sa 11:00-23:30", "Su 10:00-21:00"],
  reservationPolicy:
    "Reservation requests are reviewed by the LUMÉ host team. Online submission is not a guaranteed booking until the restaurant confirms directly.",
  orderingFlow:
    "Guests can choose pickup or delivery, add menu items to the cart, adjust quantities, review subtotal, tax, and total, then complete a mock checkout.",
  coordinatesFallback: "Demo downtown map coordinates near the Empire State Building",
  servesCuisine: "Global",
  priceRange: "$$$"
} as const;

export const restaurantJsonLd = (siteUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: restaurant.name,
  address: {
    "@type": "PostalAddress",
    streetAddress: restaurant.address.street,
    addressLocality: restaurant.address.district
  },
  telephone: restaurant.phone,
  email: restaurant.email,
  openingHours: restaurant.openingHoursSchema,
  servesCuisine: restaurant.servesCuisine,
  priceRange: restaurant.priceRange,
  url: siteUrl
});
