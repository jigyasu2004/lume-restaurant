import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartProvider";
import { Chatbot } from "@/components/chat/Chatbot";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { restaurant } from "@/data/restaurant";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LUMÉ Dining | Modern Global Restaurant",
    template: "%s | LUMÉ Dining"
  },
  description:
    "Experience chef-crafted dishes, elegant interiors, online reservations, private dining, and modern global cuisine at LUMÉ Dining.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "LUMÉ Dining | Modern Global Restaurant",
    description:
      "Chef-crafted dishes, elegant interiors, online reservations, private dining, and modern global cuisine.",
    url: siteUrl,
    siteName: restaurant.name,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMÉ Dining | Modern Global Restaurant",
    description:
      "Experience chef-crafted dishes, elegant interiors, reservations, private dining, and online ordering."
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <MobileActionBar />
          <Chatbot />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
