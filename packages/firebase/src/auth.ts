import {
  getAuth as firebaseGetAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  type User,
  type Auth,
} from "firebase/auth";
import { getApp } from "./config";
import type { AdminUser } from "@wafflella/types";

// Lazily initialized — not evaluated at module load time (safe for SSG/prerender)
let _auth: Auth | undefined;
function getAuthInstance(): Auth {
  if (!_auth) _auth = firebaseGetAuth(getApp());
  return _auth;
}

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(getAuthInstance(), email, password);
}

export function signOut() {
  return firebaseSignOut(getAuthInstance());
}

export function onAuthStateChanged(callback: (user: AdminUser | null) => void) {
  return firebaseOnAuthStateChanged(getAuthInstance(), (firebaseUser: User | null) => {
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

export { getAuthInstance as auth };

