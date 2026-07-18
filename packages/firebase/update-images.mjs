import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

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

const imageMap = {
  "Waffle Lotus": "/images/products/waffle_lotus.png",
  "Bun Cake Lotus (24)": "/images/products/waffle_lotus.png",
  "Bun Cake Lotus (12)": "/images/products/waffle_lotus.png",
  "Waffle Oreo": "/images/products/waffle_oreo.png",
  "Bun Cake Oreo (24)": "/images/products/waffle_oreo.png",
  "Bun Cake Oreo (12)": "/images/products/waffle_oreo.png",
  "Waffle Mix": "/images/products/waffle_choco.png",
  "Waffle Platter": "/images/products/waffle_choco.png",
  "Bun Cake Mix (24)": "/images/products/bun_cake_choco.png",
  "Bun Cake Mix (12)": "/images/products/bun_cake_choco.png",
};

async function run() {
  const querySnapshot = await getDocs(collection(db, "products"));
  for (const productDoc of querySnapshot.docs) {
    const data = productDoc.data();
    if (imageMap[data.name]) {
      await updateDoc(doc(db, "products", productDoc.id), {
        image: imageMap[data.name]
      });
      console.log(`Updated ${data.name}`);
    }
  }
  console.log("Done");
  process.exit(0);
}
run();
