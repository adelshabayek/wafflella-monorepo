"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { Product } from "@wafflella/types";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD"; product: Product; quantity?: number | undefined }
  | { type: "REMOVE"; productId: string }
  | { type: "INCREMENT"; productId: string }
  | { type: "DECREMENT"; productId: string }
  | { type: "CLEAR" }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "HYDRATE"; items: CartItem[] };

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

// ─── Reducer ───────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: action.items };

    case "ADD": {
      const addQty = action.quantity ?? 1;
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + addQty }
              : i
          ),
        };
      }
      return {
        ...state,
        isOpen: true,
        items: [...state.items, { product: action.product, quantity: addQty }],
      };
    }

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.productId),
      };

    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.product.id === action.productId
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0),
      };

    case "CLEAR":
      return { ...state, items: [] };

    case "OPEN":
      return { ...state, isOpen: true };

    case "CLOSE":
      return { ...state, isOpen: false };

    default:
      return state;
  }
}

// ─── Context ───────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "wafflella-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        dispatch({ type: "HYDRATE", items: parsed });
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist cart to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const add = useCallback((product: Product, quantity?: number) => dispatch({ type: "ADD", product, quantity }), []);
  const remove = useCallback((productId: string) => dispatch({ type: "REMOVE", productId }), []);
  const increment = useCallback((productId: string) => dispatch({ type: "INCREMENT", productId }), []);
  const decrement = useCallback((productId: string) => dispatch({ type: "DECREMENT", productId }), []);
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const open = useCallback(() => dispatch({ type: "OPEN" }), []);
  const close = useCallback(() => dispatch({ type: "CLOSE" }), []);

  const totalItems = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items]
  );
  const totalPrice = useMemo(
    () => state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [state.items]
  );

  return (
    <CartContext.Provider value={{
      items: state.items,
      isOpen: state.isOpen,
      totalItems,
      totalPrice,
      add, remove, increment, decrement, clear, open, close,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
