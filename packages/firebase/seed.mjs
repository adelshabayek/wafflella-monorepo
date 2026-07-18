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
  { id: "waffle",    name: "🧇 Waffle",     nameAr: "واقل",        order: 1 },
  { id: "bun-cake", name: "🎂 Bun Cake",   nameAr: "بان كيك",     order: 2 },
  { id: "crepe",    name: "🥞 Crepe",      nameAr: "كريب",        order: 3 },
  { id: "drinks",   name: "☕ Drinks",     nameAr: "مشروبات",     order: 4 },
  { id: "deals",    name: "🎁 Deals",      nameAr: "عروض",        order: 5 },
];

// ─── Products ─────────────────────────────────────────────────────────────────

const products = [
  // ── Waffles ──
  {
    name: "Waffle Nutella",
    nameAr: "واقل توتيلا",
    categoryId: "waffle",
    description: "Crispy golden waffle loaded with rich Nutella",
    descriptionAr: "واقل ذهبي مقرمش مع نوتيلا",
    price: 80,
    available: true,
    featured: true,
    image: "",
  },
  {
    name: "Waffle Chocolate",
    nameAr: "واقل شوكليت",
    categoryId: "waffle",
    description: "Warm waffle topped with smooth chocolate sauce",
    descriptionAr: "واقل دافئ مع صوص شوكولاتة ناعم",
    price: 80,
    available: true,
    featured: false,
    image: "/images/products/waffle_choco.png",
  },
  {
    name: "Waffle Lotus",
    nameAr: "واقل لوتس",
    categoryId: "waffle",
    description: "Waffle with irresistible caramelised Lotus Biscoff spread",
    descriptionAr: "واقل مع كريمة لوتس بيسكوف",
    price: 80,
    available: true,
    featured: true,
    image: "",
  },
  {
    name: "Waffle Oreo",
    nameAr: "واقل اوريو",
    categoryId: "waffle",
    description: "Classic waffle with crushed Oreo cookies and cream",
    descriptionAr: "واقل كلاسيك مع أوريو مجروش وكريمة",
    price: 80,
    available: true,
    featured: false,
    image: "",
  },
  {
    name: "Waffle Mix",
    nameAr: "واقل ميكس",
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
    nameAr: "واقلبارية",
    categoryId: "waffle",
    description: "Full platter: waffle + crepe + biscuit — the complete experience",
    descriptionAr: "طبق كامل: واقل + كريب + بسكوت",
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
    image: "/images/products/bun_cake_choco.png",
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
    image: "/images/products/bun_cake_choco.png",
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
    image: "/images/products/bun_cake_pistachio.png",
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
    image: "/images/products/bun_cake_pistachio.png",
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
  // ── Crepes ──
  {
    name: "Crepe Nutella",
    nameAr: "كريب نوتيلا",
    categoryId: "crepe",
    description: "Thin golden crepe filled with smooth Nutella and banana slices",
    descriptionAr: "كريب ذهبي رفيع بحشو نوتيلا وشرائح الموز",
    price: 65,
    available: true,
    featured: true,
    image: "",
  },
  {
    name: "Crepe Lotus",
    nameAr: "كريب لوتس",
    categoryId: "crepe",
    description: "Soft crepe generously filled with caramelised Lotus Biscoff cream",
    descriptionAr: "كريب ناعم بكريمة لوتس بيسكوف المكرملة",
    price: 70,
    available: true,
    featured: false,
    image: "",
  },
  {
    name: "Crepe Oreo",
    nameAr: "كريب أوريو",
    categoryId: "crepe",
    description: "Light crepe packed with crushed Oreo cookies and cream cheese",
    descriptionAr: "كريب خفيف بحشو أوريو مجروش وكريمة جبن",
    price: 65,
    available: true,
    featured: false,
    image: "",
  },
  {
    name: "Crepe Mix",
    nameAr: "كريب ميكس",
    categoryId: "crepe",
    description: "Best of all worlds — Nutella, Lotus, and Oreo in a single crepe",
    descriptionAr: "الأفضل من الجميع — نوتيلا ولوتس وأوريو في كريب واحد",
    price: 85,
    available: true,
    featured: true,
    image: "",
  },
  {
    name: "Crepe Pistachio",
    nameAr: "كريب فستق",
    categoryId: "crepe",
    description: "Rich crepe loaded with premium pistachio cream and crushed nuts",
    descriptionAr: "كريب غني بكريمة الفستق الفاخرة والمكسرات",
    price: 80,
    available: true,
    featured: false,
    image: "",
  },

  // ── Drinks ──
  {
    name: "Hot Chocolate",
    nameAr: "شوكولاتة ساخنة",
    categoryId: "drinks",
    description: "Velvety rich hot chocolate made with premium dark cocoa",
    descriptionAr: "شوكولاتة ساخنة كثيفة بالكاكاو الداكن الفاخر",
    price: 45,
    available: true,
    featured: false,
    image: "",
  },
  {
    name: "Lotus Latte",
    nameAr: "لاتيه لوتس",
    categoryId: "drinks",
    description: "Creamy espresso latte with a swirl of Lotus Biscoff syrup",
    descriptionAr: "لاتيه إسبريسو كريمي بشراب لوتس بيسكوف",
    price: 55,
    available: true,
    featured: true,
    image: "",
  },
  {
    name: "Nutella Milkshake",
    nameAr: "ميلك شيك نوتيلا",
    categoryId: "drinks",
    description: "Thick and indulgent milkshake blended with real Nutella",
    descriptionAr: "ميلك شيك سميك ومنعش بالنوتيلا الحقيقية",
    price: 60,
    available: true,
    featured: true,
    image: "",
  },
  {
    name: "Iced Pistachio Latte",
    nameAr: "لاتيه فستق مثلج",
    categoryId: "drinks",
    description: "Chilled espresso with pistachio syrup and cold milk over ice",
    descriptionAr: "إسبريسو مثلج بشراب الفستق والحليب البارد",
    price: 60,
    available: true,
    featured: false,
    image: "",
  },
  {
    name: "Fresh Orange Juice",
    nameAr: "عصير برتقال طازج",
    categoryId: "drinks",
    description: "Freshly squeezed pure orange juice, chilled and served immediately",
    descriptionAr: "عصير برتقال طازج خالص، مثلج ويُقدم فوراً",
    price: 35,
    available: true,
    featured: false,
    image: "",
  },

  // ── Deals ──
  {
    name: "Couple Deal",
    nameAr: "عرض الكابل",
    categoryId: "deals",
    description: "2 waffles + 2 drinks — the perfect date-night combo",
    descriptionAr: "2 واقل + 2 مشروب — المزيج المثالي لليلة رومانسية",
    price: 180,
    available: true,
    featured: true,
    image: "",
  },
  {
    name: "Family Platter",
    nameAr: "طبق العائلة",
    categoryId: "deals",
    description: "1 waffle platter + 24 bun cakes + 4 drinks for the whole family",
    descriptionAr: "1 طبق واقل + 24 بان كيك + 4 مشروبات للعائلة",
    price: 350,
    available: true,
    featured: true,
    image: "",
  },
  {
    name: "Dessert Box",
    nameAr: "صندوق الحلويات",
    categoryId: "deals",
    description: "A curated box with 1 crepe, 12 bun cakes, and a hot drink",
    descriptionAr: "صندوق مختار من كريب + 12 بان كيك + مشروب ساخن",
    price: 150,
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
