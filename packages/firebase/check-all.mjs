import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-Q8m_BmIe9CkMl3IsuCn3jbOPKF0GG8A",
  authDomain: "wafflella.firebaseapp.com",
  projectId: "wafflella",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  const snapshot = await getDocs(collection(db, "products"));
  console.log("Total products:", snapshot.size);
  snapshot.forEach(doc => {
    const d = doc.data();
    console.log(d.name, "=> featured:", d.featured, "available:", d.available);
  });
}
check().catch(console.error);
