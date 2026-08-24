import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "./products";

export type CartLine = {
  id: string;
  name: Record<"nl" | "ar" | "en", string>;
  price: number;
  unit: Product["unit"];
  image: string;
  qty: number;
};

type Ctx = {
  lines: CartLine[];
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<Ctx | null>(null);
const KEY = "almalek-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore corrupted storage */
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines]);

  const add = useCallback((p: Product, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === p.id);
      if (existing) {
        return prev.map((l) => (l.id === p.id ? { ...l, qty: l.qty + qty } : l));
      }
      return [
        ...prev,
        { id: p.id, name: p.name, price: p.price, unit: p.unit, image: p.image, qty },
      ];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<Ctx>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0);
    return { lines, add, remove, setQty, clear, count, subtotal, open, setOpen };
  }, [lines, add, remove, setQty, clear, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
