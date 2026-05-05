# LUMÉ Dining

Production-quality Next.js App Router restaurant website/app built from the connected Figma concept and local Figma export.

Live site: https://lume-restaurant.shop

## Features

- Dark luxury restaurant homepage with sticky header, hero, menu preview, reservations, ordering, private events, gallery, reviews, contact/map, newsletter, mobile action bar, and footer
- Routes for `/`, `/menu`, `/order`, `/reservations`, `/private-events`, `/gallery`, and `/contact`
- Typed local data files for menu, gallery, reviews, events, and restaurant details
- Global cart state with pickup/delivery toggle, quantity controls, subtotal, tax, total, clear cart, and mock checkout confirmation
- Reservation, private event, contact, and newsletter forms with React Hook Form and Zod validation
- Floating LUMÉ Concierge chatbot with server-side OpenAI Responses API route
- Free OpenStreetMap embed with external map and directions links, no Google Maps API key required
- SEO metadata, Open Graph/Twitter metadata, robots, canonicals, and Restaurant JSON-LD
- Basic tests for reservation validation, chat request validation, and cart behavior

## Tech Stack

Next.js App Router, TypeScript, Tailwind CSS, React, Framer Motion, React Hook Form, Zod, Lucide React, and the official OpenAI JavaScript SDK.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

```bash
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5-nano
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, set `NEXT_PUBLIC_SITE_URL=https://lume-restaurant.shop`.

If your intended OpenAI model is different, set `OPENAI_MODEL` to that model value.

## OpenAI

The chatbot calls `app/api/chat/route.ts`, which uses `OPENAI_API_KEY` only on the server. The key is never exposed to the browser. If no key is configured, the chatbot returns a safe local fallback response so the UI remains demo-ready.

## Map And Directions

The contact section uses an OpenStreetMap iframe, so no Google Maps API key or Google Cloud billing is required. The displayed restaurant address is fictional, so demo map coordinates are stored in `data/restaurant.ts`. Replace those coordinates and direction URLs with the real restaurant location before launch.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run test
```

## Deploying on Vercel

1. Push the project to a Git repository.
2. Import the repository in Vercel.
3. Add the environment variables above in Project Settings.
4. Deploy with the default Next.js settings.

Production deployment: https://lume-restaurant.shop

## Client Handoff Notes

Demo images are remote Unsplash URLs and the `public/images/` folders are prepared for real client assets. Replace menu, gallery, reviews, and event content in `data/` as the restaurant finalizes brand photography and copy.
