import { describe, expect, it } from "vitest";
import {
  cartReducer,
  getCartCount,
  getCartSubtotal,
  getCartTax,
  getCartTotal
} from "@/lib/cart";
import { menuItems } from "@/data/menu";

describe("cartReducer", () => {
  it("adds, increases, decreases, and removes items", () => {
    const salmon = menuItems.find((item) => item.id === "charred-citrus-salmon")!;
    const withOne = cartReducer([], { type: "add", item: salmon });
    const withTwo = cartReducer(withOne, { type: "increase", id: salmon.id });
    const withOneAgain = cartReducer(withTwo, { type: "decrease", id: salmon.id });
    const empty = cartReducer(withOneAgain, { type: "remove", id: salmon.id });

    expect(withOne).toHaveLength(1);
    expect(withTwo[0].quantity).toBe(2);
    expect(withOneAgain[0].quantity).toBe(1);
    expect(empty).toEqual([]);
  });

  it("calculates subtotal, tax, total, and item count", () => {
    const risotto = menuItems.find((item) => item.id === "wild-mushroom-risotto")!;
    const salmon = menuItems.find((item) => item.id === "charred-citrus-salmon")!;
    const state = [
      { id: risotto.id, name: risotto.name, price: risotto.price, image: risotto.image, quantity: 2 },
      { id: salmon.id, name: salmon.name, price: salmon.price, image: salmon.image, quantity: 1 }
    ];

    expect(getCartSubtotal(state)).toBe(77);
    expect(getCartTax(state)).toBe(6.35);
    expect(getCartTotal(state)).toBe(83.35);
    expect(getCartCount(state)).toBe(3);
  });
});
