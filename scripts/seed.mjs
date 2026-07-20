/**
 * Seed script — populates Wafflella products & categories into Firestore
 * Run with: node scripts/seed.mjs
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

// ─── Categories ───────────────────────────────────────────────────────────────

const categories = [
  { id: "waffle", name: "🧇 Waffle", nameAr: "وافل", order: 1 },
  { id: "bun-cake", name: "🎂 Bun Cake", nameAr: "بان كيك", order: 2 },
];

// ─── Products ─────────────────────────────────────────────────────────────────

const products = [
  // ── Waffles ──
  {
    name: "Waffle Nutella",
    nameAr: "وافل توتيلا",
    categoryId: "waffle",
    description: "Crispy golden waffle loaded with rich Nutella",
    descriptionAr: "وافل ذهبي مقرمش مع نوتيلا",
    price: 80,
    available: true,
    featured: true,
    image: "",
  },
  {
    name: "Waffle Chocolate",
    nameAr: "وافل شوكليت",
    categoryId: "waffle",
    description: "Warm waffle topped with smooth chocolate sauce",
    descriptionAr: "وافل دافئ مع صوص شوكولاتة ناعم",
    price: 80,
    available: true,
    featured: false,
    image: "/images/products/waffle_choco.webp",
  },
  {
    name: "Waffle Lotus",
    nameAr: "وافل لوتس",
    categoryId: "waffle",
    description: "Waffle with irresistible caramelised Lotus Biscoff spread",
    descriptionAr: "وافل مع كريمة لوتس بيسكوف",
    price: 80,
    available: true,
    featured: true,
    image: "",
  },
  {
    name: "Waffle Oreo",
    nameAr: "وافل اوريو",
    categoryId: "waffle",
    description: "Classic waffle with crushed Oreo cookies and cream",
    descriptionAr: "وافل كلاسيك مع أوريو مجروش وكريمة",
    price: 80,
    available: true,
    featured: false,
    image: "",
  },
  {
    name: "Waffle Mix",
    nameAr: "وافل ميكس",
    categoryId: "waffle",
    description: "The ultimate mix — Nutella, Lotus, and Oreo all in one",
    descriptionAr: "الخليط المثالي من نوتيلا ولوتس وأوريو",
    price: 110,
    available: true,
    featured: true,
    image: "",
  },
  {
    name: "Waffle Platter",
    nameAr: "وافلبارية",
    categoryId: "waffle",
    description: "Full platter: waffle + crepe + biscuit — the complete experience",
    descriptionAr: "طبق كامل: وافل + كريب + بسكوت",
    price: 110,
    available: true,
    featured: false,
    image: "",
  },

  // ── Bun Cake (24 pieces) ──
  {
    name: "Bun Cake Nutella (24 pcs)",
    nameAr: "بان كيك توتيلا 24",
    categoryId: "bun-cake",
    description: "24 bite-sized bun cakes filled with Nutella",
    descriptionAr: "24 قطعة بان كيك بحشو نوتيلا",
    price: 70,
    available: true,
    featured: false,
    image: "",
  },
  {
    name: "Bun Cake Nutella (12 pcs)",
    nameAr: "بان كيك توتيلا 12",
    categoryId: "bun-cake",
    description: "12 bite-sized bun cakes filled with Nutella",
    descriptionAr: "12 قطعة بان كيك بحشو نوتيلا",
    price: 35,
    available: true,
    featured: false,
    image: "",
  },
  {
    name: "Bun Cake Chocolate (24 pcs)",
    nameAr: "بان كيك شوكليت 24",
    categoryId: "bun-cake",
    description: "24 bite-sized bun cakes filled with chocolate",
    descriptionAr: "24 قطعة بان كيك بحشو شوكولاتة",
    price: 70,
    available: true,
    featured: false,
    image: "/images/products/bun_cake_choco.webp",
  },
  {
    name: "Bun Cake Chocolate (12 pcs)",
    nameAr: "بان كيك شوكليت 12",
    categoryId: "bun-cake",
    description: "12 bite-sized bun cakes filled with chocolate",
    descriptionAr: "12 قطعة بان كيك بحشو شوكولاتة",
    price: 35,
    available: true,
    featured: false,
    image: "/images/products/bun_cake_choco.webp",
  },
  {
    name: "Bun Cake Lotus (24 pcs)",
    nameAr: "بان كيك لوتس 24",
    categoryId: "bun-cake",
    description: "24 bite-sized bun cakes filled with Lotus Biscoff",
    descriptionAr: "24 قطعة بان كيك بحشو لوتس",
    price: 80,
    available: true,
    featured: false,
    image: "",
  },
  {
    name: "Bun Cake Lotus (12 pcs)",
    nameAr: "بان كيك لوتس 12",
    categoryId: "bun-cake",
    description: "12 bite-sized bun cakes filled with Lotus Biscoff",
    descriptionAr: "12 قطعة بان كيك بحشو لوتس",
    price: 40,
    available: true,
    featured: false,
    image: "",
  },
  {
    name: "Bun Cake Oreo (24 pcs)",
    nameAr: "بان كيك اوريو 24",
    categoryId: "bun-cake",
    description: "24 bite-sized bun cakes filled with Oreo cream",
    descriptionAr: "24 قطعة بان كيك بحشو أوريو",
    price: 80,
    available: true,
    featured: false,
    image: "",
  },
  {
    name: "Bun Cake Oreo (12 pcs)",
    nameAr: "بان كيك اوريو 12",
    categoryId: "bun-cake",
    description: "12 bite-sized bun cakes filled with Oreo cream",
    descriptionAr: "12 قطعة بان كيك بحشو أوريو",
    price: 40,
    available: true,
    featured: false,
    image: "",
  },
  {
    name: "Bun Cake Pistachio (24 pcs)",
    nameAr: "بان كيك فستق 24",
    categoryId: "bun-cake",
    description: "24 bite-sized bun cakes filled with pistachio cream",
    descriptionAr: "24 قطعة بان كيك بحشو فستق",
    price: 90,
    available: true,
    featured: true,
    image: "/images/products/bun_cake_pistachio.webp",
  },
  {
    name: "Bun Cake Pistachio (12 pcs)",
    nameAr: "بان كيك فستق 12",
    categoryId: "bun-cake",
    description: "12 bite-sized bun cakes filled with pistachio cream",
    descriptionAr: "12 قطعة بان كيك بحشو فستق",
    price: 45,
    available: true,
    featured: false,
    image: "/images/products/bun_cake_pistachio.webp",
  },
  {
    name: "Bun Cake Mix (24 pcs)",
    nameAr: "بان كيك ميكس 24",
    categoryId: "bun-cake",
    description: "24 bun cakes with a variety of fillings",
    descriptionAr: "24 قطعة بان كيك متنوعة الحشو",
    price: 100,
    available: true,
    featured: true,
    image: "",
  },
  {
    name: "Bun Cake Mix (12 pcs)",
    nameAr: "بان كيك ميكس 12",
    categoryId: "bun-cake",
    description: "12 bun cakes with a variety of fillings",
    descriptionAr: "12 قطعة بان كيك متنوعة الحشو",
    price: 55,
    available: true,
    featured: false,
    image: "",
  },
];

// ─── Seed function ─────────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Starting seed...\n");

  // Seed categories
  console.log("📂 Seeding categories...");
  for (const cat of categories) {
    const { id, ...data } = cat;
    await setDoc(doc(db, "categories", id), data);
    console.log(`  ✓ ${cat.name}`);
  }

  // Seed products
  console.log("\n🧇 Seeding products...");
  for (const product of products) {
    await addDoc(collection(db, "products"), {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log(`  ✓ ${product.name} — ${product.price} EGP`);
  }

  // Seed default settings
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

  console.log("\n✅ Seed complete! Your Firebase database is ready.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
