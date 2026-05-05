"use client";

import { Check, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useCart } from "@/components/cart/CartProvider";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    orderType,
    setOrderType,
    subtotal,
    tax,
    total,
    increaseItem,
    decreaseItem,
    removeItem,
    clearCart,
    checkout,
    confirmationOpen,
    closeConfirmation
  } = useCart();

  return (
    <>
      <aside
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-gold/25 bg-[#121212] shadow-2xl transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isCartOpen}
        aria-label="Order cart"
      >
        <div className="flex items-center justify-between border-b border-gold/20 px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-gold">Online order</p>
            <h2 className="font-serif text-2xl text-ivory">Your Cart</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={closeCart} aria-label="Close cart">
            <X className="size-5" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2 px-5 py-4">
          {(["pickup", "delivery"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setOrderType(type)}
              className={`rounded-lg border px-4 py-3 text-sm font-medium capitalize transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${
                orderType === type
                  ? "border-gold bg-gold text-charcoal"
                  : "border-gold/25 bg-surface text-ivory hover:border-gold"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-5">
          {items.length === 0 ? (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-lg border border-dashed border-gold/25 p-8 text-center">
              <ShoppingBag className="mb-4 size-12 text-gold/70" />
              <p className="font-serif text-xl text-ivory">Your cart is empty</p>
              <p className="mt-2 text-sm text-mutedText">
                Add a dish from the menu to begin a pickup or delivery order.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="rounded-lg border border-gold/20 bg-surface p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-medium text-ivory">{item.name}</h3>
                      <p className="mt-1 text-sm text-gold">{formatCurrency(item.price)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="rounded-md p-2 text-mutedText transition hover:bg-[#202020] hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-gold/20">
                      <button
                        type="button"
                        onClick={() => decreaseItem(item.id)}
                        className="grid size-10 place-items-center text-ivory transition hover:bg-gold hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                        aria-label={`Decrease ${item.name}`}
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="w-10 text-center text-sm text-ivory">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => increaseItem(item.id)}
                        className="grid size-10 place-items-center text-ivory transition hover:bg-gold hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                        aria-label={`Increase ${item.name}`}
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                    <span className="text-sm text-ivory">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gold/20 bg-[#101010] p-5">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-mutedText">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-mutedText">
              <span>Estimated tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between border-t border-gold/20 pt-3 text-base font-semibold text-ivory">
              <span>Total</span>
              <span className="text-gold">{formatCurrency(total)}</span>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-[1fr_auto] gap-3">
            <Button onClick={checkout} disabled={items.length === 0} className="w-full">
              Mock Checkout
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearCart}
              disabled={items.length === 0}
              aria-label="Clear cart"
            >
              <Trash2 className="size-5" />
            </Button>
          </div>
        </div>
      </aside>

      {isCartOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          aria-label="Close cart overlay"
          onClick={closeCart}
        />
      ) : null}

      <Modal
        open={confirmationOpen}
        onClose={closeConfirmation}
        title="Order request received"
        description="This is a polished mock checkout flow for the demo."
      >
        <div className="rounded-lg border border-gold/25 bg-[#151515] p-6 text-center">
          <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-gold text-charcoal">
            <Check className="size-7" />
          </div>
          <p className="text-ivory">
            Thank you. Your {orderType} order has been received for demo checkout.
          </p>
          <Button className="mt-6 w-full" onClick={closeConfirmation}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}
