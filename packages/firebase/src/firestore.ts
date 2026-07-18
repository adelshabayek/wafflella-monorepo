import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  type Unsubscribe,
  type Firestore,
} from "firebase/firestore";
import { getApp } from "./config";
import type {
  Product,
  Category,
  ShopSettings,
  ProductCreatePayload,
  ProductUpdatePayload,
  SettingsUpdatePayload,
} from "@wafflella/types";

// Lazily initialized — not evaluated at module load time (safe for SSG/prerender)
let _db: Firestore | undefined;
function getDb(): Firestore {
  if (!_db) _db = getFirestore(getApp());
  return _db;
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export function subscribeToSettings(
  callback: (settings: ShopSettings | null) => void
): Unsubscribe {
  const docRef = doc(getDb(), "settings", "general");
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data() as ShopSettings);
    } else {
      callback(null);
    }
  });
}

export async function updateSettings(
  payload: SettingsUpdatePayload
): Promise<void> {
  const docRef = doc(getDb(), "settings", "general");
  // Use setDoc with merge:true so it works even if the document doesn't exist yet
  await setDoc(docRef, { ...payload }, { merge: true });
}

// ─── Categories ───────────────────────────────────────────────────────────────

export function subscribeToCategories(
  callback: (categories: Category[]) => void
): Unsubscribe {
  const q = query(collection(getDb(), "categories"), orderBy("order", "asc"));
  return onSnapshot(q, (snapshot) => {
    const categories: Category[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Category, "id">),
    }));
    callback(categories);
  });
}

// ─── Products ─────────────────────────────────────────────────────────────────

export function subscribeToProducts(
  callback: (products: Product[]) => void,
  categoryId?: string
): Unsubscribe {
  const constraints = categoryId
    ? [where("categoryId", "==", categoryId)]
    : [];
  const q = query(collection(getDb(), "products"), ...constraints);
  return onSnapshot(q, (snapshot) => {
    const products: Product[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Product, "id">),
    }));
    callback(products);
  });
}

export function subscribeToFeaturedProducts(
  callback: (products: Product[]) => void
): Unsubscribe {
  const q = query(
    collection(getDb(), "products"),
    where("featured", "==", true),
    where("available", "==", true)
  );
  return onSnapshot(q, (snapshot) => {
    const products: Product[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Product, "id">),
    }));
    callback(products);
  });
}

export async function createProduct(payload: ProductCreatePayload): Promise<string> {
  const docRef = await addDoc(collection(getDb(), "products"), {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProduct(
  id: string,
  payload: ProductUpdatePayload
): Promise<void> {
  const docRef = doc(getDb(), "products", id);
  await updateDoc(docRef, {
    ...payload,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(getDb(), "products", id));
}

export { getDb as db };
