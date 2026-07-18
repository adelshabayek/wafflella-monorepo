import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-background pt-20">
      <div className="text-center px-6">
        <div className="text-8xl mb-6" aria-hidden="true">
          🧇
        </div>
        <h1 className="font-heading text-6xl font-bold text-brand-text mb-4">404</h1>
        <p className="text-brand-muted text-xl mb-8">
          Oops! This page has gone missing — like our last waffle.
        </p>
        <Link
          href="/"
          id="not-found-home-link"
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-white font-semibold rounded-2xl hover:bg-brand-primary-hover transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
