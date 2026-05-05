import type { MenuItem } from "@/data/menu";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type CartAction =
  | { type: "add"; item: MenuItem }
  | { type: "remove"; id: string }
  | { type: "increase"; id: string }
  | { type: "decrease"; id: string }
  | { type: "clear" };

export const TAX_RATE = 0.0825;

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "add": {
      const existing = state.find((item) => item.id === action.item.id);

      if (existing) {
        return state.map((item) =>
          item.id === action.item.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [
        ...state,
        {
          id: action.item.id,
          name: action.item.name,
          price: action.item.price,
          image: action.item.image,
          quantity: 1
        }
      ];
    }
    case "remove":
      return state.filter((item) => item.id !== action.id);
    case "increase":
      return state.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    case "decrease":
      return state
        .map((item) => (item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0);
    case "clear":
      return [];
    default:
      return state;
  }
}

export function getCartSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getCartTax(items: CartItem[]) {
  return Number((getCartSubtotal(items) * TAX_RATE).toFixed(2));
}

export function getCartTotal(items: CartItem[]) {
  return Number((getCartSubtotal(items) + getCartTax(items)).toFixed(2));
}

export function getCartCount(items: CartItem[]) {
  return items.reduce((count, item) => count + item.quantity, 0);
}
