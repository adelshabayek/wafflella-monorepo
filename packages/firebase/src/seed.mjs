/**
 * Seed script — populates Wafflella products & categories into Firestore
 * Run from packages/firebase:  node src/seed.mjs
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
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

const categories = [
  { id: "waffle",   name: "🧇 Waffle",    nameAr: "واقل",     order: 1 },
  { id: "bun-cake", name: "🎂 Bun Cake",  nameAr: "بان كيك",  order: 2 },
];

const products = [
  // ── Waffles ──
  { name: "Waffle Nutella",        nameAr: "واقل توتيلا",        categoryId: "waffle",   description: "Crispy golden waffle loaded with rich Nutella",                    price: 80,  available: true, featured: true,  image: "" },
  { name: "Waffle Chocolate",      nameAr: "واقل شوكليت",        categoryId: "waffle",   description: "Warm waffle topped with smooth chocolate sauce",                   price: 80,  available: true, featured: false, image: "" },
  { name: "Waffle Lotus",          nameAr: "واقل لوتس",          categoryId: "waffle",   description: "Waffle with irresistible caramelised Lotus Biscoff spread",        price: 80,  available: true, featured: true,  image: "" },
  { name: "Waffle Oreo",           nameAr: "واقل اوريو",         categoryId: "waffle",   description: "Classic waffle with crushed Oreo cookies and cream",               price: 80,  available: true, featured: false, image: "" },
  { name: "Waffle Mix",            nameAr: "واقل ميكس",          categoryId: "waffle",   description: "The ultimate mix — Nutella, Lotus, and Oreo all in one",           price: 110, available: true, featured: true,  image: "" },
  { name: "Waffle Platter",        nameAr: "واقلبارية",          categoryId: "waffle",   description: "Full platter: waffle + crepe + biscuit",                           price: 110, available: true, featured: false, image: "" },
  // ── Bun Cakes 24 pcs ──
  { name: "Bun Cake Nutella (24)", nameAr: "بان كيك توتيلا 24",  categoryId: "bun-cake", description: "24 bite-sized bun cakes filled with Nutella",                      price: 70,  available: true, featured: false, image: "" },
  { name: "Bun Cake Nutella (12)", nameAr: "بان كيك توتيلا 12",  categoryId: "bun-cake", description: "12 bite-sized bun cakes filled with Nutella",                      price: 35,  available: true, featured: false, image: "" },
  { name: "Bun Cake Choco (24)",   nameAr: "بان كيك شوكليت 24",  categoryId: "bun-cake", description: "24 bite-sized bun cakes filled with chocolate",                    price: 70,  available: true, featured: false, image: "" },
  { name: "Bun Cake Choco (12)",   nameAr: "بان كيك شوكليت 12",  categoryId: "bun-cake", description: "12 bite-sized bun cakes filled with chocolate",                    price: 35,  available: true, featured: false, image: "" },
  { name: "Bun Cake Lotus (24)",   nameAr: "بان كيك لوتس 24",    categoryId: "bun-cake", description: "24 bite-sized bun cakes filled with Lotus Biscoff",                price: 80,  available: true, featured: false, image: "" },
  { name: "Bun Cake Lotus (12)",   nameAr: "بان كيك لوتس 12",    categoryId: "bun-cake", description: "12 bite-sized bun cakes filled with Lotus Biscoff",                price: 40,  available: true, featured: false, image: "" },
  { name: "Bun Cake Oreo (24)",    nameAr: "بان كيك اوريو 24",   categoryId: "bun-cake", description: "24 bite-sized bun cakes filled with Oreo cream",                   price: 80,  available: true, featured: false, image: "" },
  { name: "Bun Cake Oreo (12)",    nameAr: "بان كيك اوريو 12",   categoryId: "bun-cake", description: "12 bite-sized bun cakes filled with Oreo cream",                   price: 40,  available: true, featured: false, image: "" },
  { name: "Bun Cake Pistachio (24)",nameAr:"بان كيك فستق 24",    categoryId: "bun-cake", description: "24 bite-sized bun cakes filled with pistachio cream",               price: 90,  available: true, featured: true,  image: "" },
  { name: "Bun Cake Pistachio (12)",nameAr:"بان كيك فستق 12",    categoryId: "bun-cake", description: "12 bite-sized bun cakes filled with pistachio cream",               price: 45,  available: true, featured: false, image: "" },
  { name: "Bun Cake Mix (24)",     nameAr: "بان كيك ميكس 24",    categoryId: "bun-cake", description: "24 bun cakes with a variety of fillings",                          price: 100, available: true, featured: true,  image: "" },
  { name: "Bun Cake Mix (12)",     nameAr: "بان كيك ميكس 12",    categoryId: "bun-cake", description: "12 bun cakes with a variety of fillings",                          price: 55,  available: true, featured: false, image: "" },
];

async function seed() {
  console.log("🌱 Starting Wafflella seed...\n");

  console.log("📂 Seeding categories...");
  for (const cat of categories) {
    const { id, ...data } = cat;
    await setDoc(doc(db, "categories", id), data);
    console.log(`  ✓ ${cat.name}`);
  }

  console.log("\n🧇 Seeding products...");
  for (const product of products) {
    await addDoc(collection(db, "products"), {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log(`  ✓ ${product.name} — ${product.price} EGP`);
  }

  console.log("\n⚙️  Seeding default settings...");
  await setDoc(doc(db, "settings", "general"), {
    shopName: "WAFFLELLA",
    phone: "01003439023",
    whatsapp: "01003439023",
    facebook: "",
    instagram: "",
    address: "Cairo, Egypt",
    openingHours: "Daily 10:00 AM – 11:00 PM",
    logo: "",
  });
  console.log("  ✓ Settings saved");

  console.log("\n✅ Done! Open http://localhost:3000 to see your products.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
