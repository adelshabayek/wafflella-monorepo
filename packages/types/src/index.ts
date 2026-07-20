import type { Timestamp } from "firebase/firestore";

// ─── Shop Settings ────────────────────────────────────────────────────────────

export interface ShopSettings {
  shopName: string;
  phone: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  address: string;
  openingHours: string;
  logo?: string;
}

// ─── Category ─────────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  nameAr?: string;
  order: number;
  icon?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  nameAr?: string;
  price: number;
}

// ─── Product ──────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  categoryId: string;
  description: string;
  descriptionAr?: string;
  price: number; // Base price, might be unused if variants exist
  variants?: ProductVariant[];
  image: string;
  available: boolean;
  featured: boolean;
  pieces?: number; // Kept for backward compatibility, though variants are preferred
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

// ─── Product Create / Update Payloads ─────────────────────────────────────────

export type ProductCreatePayload = Omit<Product, "id" | "createdAt" | "updatedAt">;

export type ProductUpdatePayload = Partial<ProductCreatePayload>;

export type SettingsUpdatePayload = Partial<ShopSettings>;

// ─── Admin User ───────────────────────────────────────────────────────────────

export interface AdminUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}
