import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "WAFFLELLA Admin",
    template: "%s | WAFFLELLA Admin",
  },
  description: "WAFFLELLA Admin Dashboard — Manage your menu, products, and settings.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: "#fff", border: "1px solid #E9ECEF", color: "#2D2D2D" },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
