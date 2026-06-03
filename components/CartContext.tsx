"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = { id: string; quantity: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  add: (id: string, quantity?: number) => void;
  setQty: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "ccc-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  // persist
  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  const add: CartCtx["add"] = (id, quantity = 1) =>
    setItems((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + quantity } : i));
      return [...prev, { id, quantity }];
    });

  const setQty: CartCtx["setQty"] = (id, quantity) =>
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );

  const remove: CartCtx["remove"] = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  const count = items.reduce((n, i) => n + i.quantity, 0);

  return (
    <Ctx.Provider
      value={{ items, count, add, setQty, remove, clear, isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
