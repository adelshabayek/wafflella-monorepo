import { initializeApp, getApps, type FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env["NEXT_PUBLIC_FIREBASE_API_KEY"],
  authDomain: process.env["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"],
  projectId: process.env["NEXT_PUBLIC_FIREBASE_PROJECT_ID"],
  storageBucket: process.env["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"],
  messagingSenderId: process.env["NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"],
  appId: process.env["NEXT_PUBLIC_FIREBASE_APP_ID"],
};

// Lazily initialized — never runs at module load time (safe for SSG/prerender)
let _app: FirebaseApp | undefined;

export function getApp(): FirebaseApp {
  if (_app) return _app;

  if (getApps().length > 0) {
    _app = getApps()[0]!;
    return _app;
  }

  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    throw new Error(
      "[Firebase] Missing environment variables. " +
      "Ensure all NEXT_PUBLIC_FIREBASE_* variables are set in your Vercel project settings."
    );
  }

  _app = initializeApp(firebaseConfig as Required<typeof firebaseConfig>);
  return _app;
}

// Legacy default export for any direct consumers — still lazy
export { _app as app };
