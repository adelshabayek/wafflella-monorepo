import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  type User,
} from "firebase/auth";
import { app } from "./config";
import type { AdminUser } from "@wafflella/types";

const auth = getAuth(app);

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOut() {
  return firebaseSignOut(auth);
}

export function onAuthStateChanged(callback: (user: AdminUser | null) => void) {
  return firebaseOnAuthStateChanged(auth, (firebaseUser: User | null) => {
    if (firebaseUser) {
      callback({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
      });
    } else {
      callback(null);
    }
  });
}

export { auth };
