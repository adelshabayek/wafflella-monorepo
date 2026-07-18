import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthProvider } from "@/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
        {/* Background orb */}
        <div
          className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #E91E63, transparent)" }}
          aria-hidden="true"
        />

        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-primary to-pink-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-xl font-bold">W</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 font-sans">
                Admin Dashboard
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Sign in to manage WAFFLELLA
              </p>
            </div>

            <LoginForm />

            {/* Footer note */}
            <p className="text-center text-xs text-gray-400 mt-6">
              Admin access only. Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
