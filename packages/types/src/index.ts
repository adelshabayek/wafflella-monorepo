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

// ─── Product ──────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  categoryId: string;
  description: string;
  descriptionAr?: string;
  price: number;
  image: string;
  available: boolean;
  featured: boolean;
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
