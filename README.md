# WAFFLELLA — Premium Dessert Shop Platform

A full-stack, production-ready platform consisting of a customer-facing Next.js website and an administrative Next.js dashboard, managed in a Turborepo monorepo.

## Architecture

- **Monorepo**: Turborepo + pnpm workspaces
- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS, Framer Motion
- **State/Fetching**: TanStack Query hooked to Firestore `onSnapshot` for realtime updates
- **Backend/BaaS**: Firebase (Auth, Firestore, Storage)
- **Deployment**: Vercel (recommended) or Firebase Hosting

## Apps & Packages

- `apps/website`: The main customer-facing website (Port 3000)
- `apps/dashboard`: The admin dashboard for managing products/settings (Port 3001)
- `packages/types`: Shared TypeScript interfaces
- `packages/firebase`: Shared Firebase initialization, Auth, Firestore, and Storage services
- `packages/hooks`: Shared TanStack Query + Firestore realtime hooks

## Setup Instructions

### 1. Prerequisites
- Node.js 18+
- pnpm (`npm install -g pnpm`)
- A Firebase project (Spark or Blaze plan)

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Firebase Configuration
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project or use an existing one.
3. Enable **Authentication** (Email/Password provider).
4. Create an Admin user in the Authentication tab (this is what you'll use to log into the dashboard).
5. Enable **Firestore Database** (start in production mode).
6. Enable **Storage** (start in production mode).
7. Copy your Firebase SDK config.
8. Rename `.env.example` to `.env` (at the root) and fill in your Firebase credentials.

### 4. Deploy Firebase Rules
If you have the Firebase CLI installed:
```bash
firebase login
firebase use --add  # Select your project
firebase deploy --only firestore:rules,storage
```
*Alternatively, you can manually copy `firestore.rules` and `storage.rules` into the Firebase Console.*

### 5. Local Development
Start both apps simultaneously:
```bash
pnpm dev
```
- **Website**: http://localhost:3000
- **Dashboard**: http://localhost:3001 (Log in with your Firebase Auth user)

## Initial Data Seeding
1. Log into the Dashboard.
2. Go to **Settings** and save your shop details (this populates the `settings/general` document).
3. The `categories` collection currently falls back to static categories in the UI, but you should ideally create them in Firestore (e.g. manually in the console or via a quick script) if you want to modify them dynamically later.
4. Go to **Products** and start adding your menu items!

## Deployment
This project is optimized for deployment on **Vercel**.
1. Import the repository into Vercel.
2. Vercel will automatically detect the Turborepo setup.
3. You can create two projects in Vercel from the same repo:
   - Project 1: Framework Preset = Next.js, Root Directory = `apps/website`
   - Project 2: Framework Preset = Next.js, Root Directory = `apps/dashboard`
4. Add all environment variables from `.env` to both Vercel projects.
5. Deploy!
