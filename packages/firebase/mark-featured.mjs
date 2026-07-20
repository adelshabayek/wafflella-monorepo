import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

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

// These are our star products that should be featured
const featuredNames = [
  "Waffle Nutella",
  "Waffle Mix",
  "Waffle Lotus",
  "Bun Cake Pistachio",
  "Bun Cake Nutella",
  "Bun Cake Lotus",
];

async function markFeatured() {
  console.log("Fetching all products...");
  const snapshot = await getDocs(collection(db, "products"));
  
  let updated = 0;
  let cleared = 0;

  for (const d of snapshot.docs) {
    const data = d.data();
    const shouldBeFeatured = featuredNames.includes(data.name);
    
    if (shouldBeFeatured && !data.featured) {
      await updateDoc(doc(db, "products", d.id), { featured: true });
      console.log(`✅ Marked as featured: ${data.name}`);
      updated++;
    } else if (!shouldBeFeatured && data.featured) {
      await updateDoc(doc(db, "products", d.id), { featured: false });
      console.log(`⬇️  Cleared featured: ${data.name}`);
      cleared++;
    } else {
      console.log(`  - No change: ${data.name} (featured: ${data.featured})`);
    }
  }

  console.log(`\nDone! ${updated} products marked as featured, ${cleared} cleared.`);
  process.exit(0);
}

markFeatured().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
