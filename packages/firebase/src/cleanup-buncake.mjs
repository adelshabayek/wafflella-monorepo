/**
 * Cleanup script — merges duplicate Bun Cake products into single products with variants
 * Run from packages/firebase:  node src/cleanup-buncake.mjs
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-Q8m_BmIe9CkMl3IsuCn3jbOPKF0GG8A",
  authDomain: "wafflella.firebaseapp.com",
  projectId: "wafflella",
  storageBucket: "wafflella.firebasestorage.app",
  messagingSenderId: "1081620313027",
  appId: "1:1081620313027:web:0a18ea0e42926519090376",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// The 6 clean Bun Cake flavors with fixed prices
const bunCakeFlavors = [
  {
    name: "Bun Cake Nutella",
    nameAr: "بان كيك نوتيلا",
    description: "Bite-sized bun cakes filled with rich Nutella",
    descriptionAr: "قطع بان كيك بحشو نوتيلا",
    price: 30,
    variants: [
      { id: "v6", name: "6 BAN", nameAr: "6 قطع", price: 30 },
      { id: "v12", name: "12 BAN", nameAr: "12 قطعة", price: 60 },
      { id: "v24", name: "24 BAN", nameAr: "24 قطعة", price: 120 },
    ],
  },
  {
    name: "Bun Cake Chocolate",
    nameAr: "بان كيك شوكليت",
    description: "Bite-sized bun cakes filled with chocolate",
    descriptionAr: "قطع بان كيك بحشو شوكولاتة",
    price: 30,
    variants: [
      { id: "v6", name: "6 BAN", nameAr: "6 قطع", price: 30 },
      { id: "v12", name: "12 BAN", nameAr: "12 قطعة", price: 60 },
      { id: "v24", name: "24 BAN", nameAr: "24 قطعة", price: 120 },
    ],
  },
  {
    name: "Bun Cake Lotus",
    nameAr: "بان كيك لوتس",
    description: "Bite-sized bun cakes filled with Lotus Biscoff",
    descriptionAr: "قطع بان كيك بحشو لوتس",
    price: 35,
    variants: [
      { id: "v6", name: "6 BAN", nameAr: "6 قطع", price: 35 },
      { id: "v12", name: "12 BAN", nameAr: "12 قطعة", price: 70 },
      { id: "v24", name: "24 BAN", nameAr: "24 قطعة", price: 130 },
    ],
  },
  {
    name: "Bun Cake Oreo",
    nameAr: "بان كيك اوريو",
    description: "Bite-sized bun cakes filled with Oreo cream",
    descriptionAr: "قطع بان كيك بحشو اوريو",
    price: 35,
    variants: [
      { id: "v6", name: "6 BAN", nameAr: "6 قطع", price: 35 },
      { id: "v12", name: "12 BAN", nameAr: "12 قطعة", price: 70 },
      { id: "v24", name: "24 BAN", nameAr: "24 قطعة", price: 130 },
    ],
  },
  {
    name: "Bun Cake Pistachio",
    nameAr: "بان كيك فستق",
    description: "Bite-sized bun cakes filled with pistachio cream",
    descriptionAr: "قطع بان كيك بحشو فستق",
    price: 40,
    variants: [
      { id: "v6", name: "6 BAN", nameAr: "6 قطع", price: 40 },
      { id: "v12", name: "12 BAN", nameAr: "12 قطعة", price: 80 },
      { id: "v24", name: "24 BAN", nameAr: "24 قطعة", price: 150 },
    ],
  },
  {
    name: "Bun Cake Mix",
    nameAr: "بان كيك ميكس",
    description: "Bun cakes with a variety of fillings",
    descriptionAr: "بان كيك بحشو متنوعة الحشو",
    price: 35,
    variants: [
      { id: "v6", name: "6 BAN", nameAr: "6 قطع", price: 35 },
      { id: "v12", name: "12 BAN", nameAr: "12 قطعة", price: 70 },
      { id: "v24", name: "24 BAN", nameAr: "24 قطعة", price: 130 },
    ],
  },
];

async function cleanup() {
  console.log("🔍 Fetching all products...");
  const snapshot = await getDocs(collection(db, "products"));
  const allProducts = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

  // Find all bun-cake products
  const bunCakeProducts = allProducts.filter((p) => p.categoryId === "bun-cake");
  console.log(`\n📦 Found ${bunCakeProducts.length} bun cake products`);

  // Delete ALL existing bun cake products
  console.log("\n🗑️  Deleting all existing bun cake products...");
  for (const p of bunCakeProducts) {
    await deleteDoc(doc(db, "products", p.id));
    console.log(`  ✗ Deleted: ${p.name}`);
  }

  // Create new clean single products with variants
  console.log("\n✨ Creating clean bun cake products with variants...");
  for (const flavor of bunCakeFlavors) {
    await addDoc(collection(db, "products"), {
      ...flavor,
      categoryId: "bun-cake",
      available: true,
      featured: false,
      image: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log(`  ✓ Created: ${flavor.name}`);
  }

  console.log("\n✅ Done! Bun Cake products are now clean with size variants.");
  process.exit(0);
}

cleanup().catch((err) => {
  console.error("❌ Cleanup failed:", err.message);
  process.exit(1);
});
