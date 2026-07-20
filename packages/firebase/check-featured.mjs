import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-Q8m_BmIe9CkMl3IsuCn3jbOPKF0GG8A",
  authDomain: "wafflella.firebaseapp.com",
  projectId: "wafflella",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  const q = query(collection(db, "products"), where("featured", "==", true), where("available", "==", true));
  const snapshot = await getDocs(q);
  console.log("Featured available products:", snapshot.size);
  snapshot.forEach(doc => console.log(doc.id, doc.data().name));
}
check().catch(console.error);
