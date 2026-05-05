import type { Metadata } from "next";
import { OrderPageClient } from "@/app/order/OrderPageClient";

export const metadata: Metadata = {
  title: "Order Online",
  description:
    "Order LUMÉ Dining online for pickup or delivery with a cart, quantity controls, tax, totals, and mock checkout.",
  alternates: {
    canonical: "/order"
  }
};

export default function OrderPage() {
  return <OrderPageClient />;
}
