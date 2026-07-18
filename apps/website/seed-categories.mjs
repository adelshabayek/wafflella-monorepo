import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

async function seed() {
  console.log("📂 Seeding categories...");
  for (const cat of categories) {
    const { id, ...data } = cat;
    await setDoc(doc(db, "categories", id), data);
    console.log(`  ✓ ${cat.name}`);
  }
  console.log("\n✅ Categories restored!");
  process.exit(0);
}

seed().catch(console.error);
