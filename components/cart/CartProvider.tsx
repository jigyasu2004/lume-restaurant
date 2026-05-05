"use client";

import * as React from "react";
import type { MenuItem } from "@/data/menu";
import {
  cartReducer,
  getCartCount,
  getCartSubtotal,
  getCartTax,
  getCartTotal,
  type CartItem
} from "@/lib/cart";

type OrderType = "pickup" | "delivery";

type CartContextValue = {
  items: CartItem[];
  orderType: OrderType;
  isCartOpen: boolean;
  confirmationOpen: boolean;
  subtotal: number;
  tax: number;
  total: number;
  count: number;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  increaseItem: (id: string) => void;
  decreaseItem: (id: string) => void;
  clearCart: () => void;
  setOrderType: (type: OrderType) => void;
  openCart: () => void;
  closeCart: () => void;
  checkout: () => void;
  closeConfirmation: () => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = React.useReducer(cartReducer, []);
  const [orderType, setOrderType] = React.useState<OrderType>("pickup");
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);

  const subtotal = getCartSubtotal(items);
  const tax = getCartTax(items);
  const total = getCartTotal(items);
  const count = getCartCount(items);

  const value = React.useMemo<CartContextValue>(
    () => ({
      items,
      orderType,
      isCartOpen,
      confirmationOpen,
      subtotal,
      tax,
      total,
      count,
      addItem: (item) => {
        dispatch({ type: "add", item });
        setIsCartOpen(true);
      },
      removeItem: (id) => dispatch({ type: "remove", id }),
      increaseItem: (id) => dispatch({ type: "increase", id }),
      decreaseItem: (id) => dispatch({ type: "decrease", id }),
      clearCart: () => dispatch({ type: "clear" }),
      setOrderType,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      checkout: () => {
        if (items.length === 0) {
          return;
        }
        setIsCartOpen(false);
        setConfirmationOpen(true);
        dispatch({ type: "clear" });
      },
      closeConfirmation: () => setConfirmationOpen(false)
    }),
    [confirmationOpen, count, isCartOpen, items, orderType, subtotal, tax, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
