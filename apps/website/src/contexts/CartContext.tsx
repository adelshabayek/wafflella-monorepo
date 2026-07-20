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
  variantId?: string;
  variantName?: string;
  priceAtAddition: number; // To lock the price of the specific variant
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD"; product: Product; quantity?: number; variant?: import("@wafflella/types").ProductVariant }
  | { type: "REMOVE"; productId: string; variantId?: string }
  | { type: "INCREMENT"; productId: string; variantId?: string }
  | { type: "DECREMENT"; productId: string; variantId?: string }
  | { type: "CLEAR" }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "HYDRATE"; items: CartItem[] };

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  add: (product: Product, quantity?: number, variant?: import("@wafflella/types").ProductVariant) => void;
  remove: (productId: string, variantId?: string) => void;
  increment: (productId: string, variantId?: string) => void;
  decrement: (productId: string, variantId?: string) => void;
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
      const variant = action.variant;
      const existing = state.items.find(
        (i) => i.product.id === action.product.id && i.variantId === variant?.id
      );
      
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id && i.variantId === variant?.id
              ? { ...i, quantity: i.quantity + addQty }
              : i
          ),
        };
      }
      const newItem: CartItem = { 
        product: action.product, 
        quantity: addQty,
        priceAtAddition: variant?.price ?? action.product.price
      };
      if (variant?.id) newItem.variantId = variant.id;
      if (variant?.name) newItem.variantName = variant.name;

      return {
        ...state,
        items: [...state.items, newItem],
      };
    }

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((i) => !(i.product.id === action.productId && i.variantId === action.variantId)),
      };

    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId && i.variantId === action.variantId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.product.id === action.productId && i.variantId === action.variantId
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

  const add = useCallback((product: Product, quantity?: number, variant?: import("@wafflella/types").ProductVariant) => {
    const action: any = { type: "ADD", product };
    if (quantity !== undefined) action.quantity = quantity;
    if (variant !== undefined) action.variant = variant;
    dispatch(action);
  }, []);
  const remove = useCallback((productId: string, variantId?: string) => {
    const action: any = { type: "REMOVE", productId };
    if (variantId !== undefined) action.variantId = variantId;
    dispatch(action);
  }, []);
  const increment = useCallback((productId: string, variantId?: string) => {
    const action: any = { type: "INCREMENT", productId };
    if (variantId !== undefined) action.variantId = variantId;
    dispatch(action);
  }, []);
  const decrement = useCallback((productId: string, variantId?: string) => {
    const action: any = { type: "DECREMENT", productId };
    if (variantId !== undefined) action.variantId = variantId;
    dispatch(action);
  }, []);
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const open = useCallback(() => dispatch({ type: "OPEN" }), []);
  const close = useCallback(() => dispatch({ type: "CLOSE" }), []);

  const totalItems = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items]
  );
  const totalPrice = useMemo(
    () => state.items.reduce((sum, i) => sum + (i.priceAtAddition || i.product.price) * i.quantity, 0),
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
