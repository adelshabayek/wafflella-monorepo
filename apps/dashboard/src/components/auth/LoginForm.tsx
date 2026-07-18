"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Invalid credentials";
      if (message.includes("invalid-credential") || message.includes("wrong-password")) {
        setError("password", { message: "Invalid email or password" });
      } else {
        setError("email", { message: "Login failed. Please try again." });
      }
      toast.error("Login failed");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
      aria-label="Admin login form"
    >
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          Email Address
        </label>
        <div className="relative">
          <Mail
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            placeholder="admin@wafflella.com"
            className={cn(
              "w-full pl-10 pr-4 py-3 border rounded-xl text-sm transition-all duration-200 outline-none",
              "bg-white placeholder:text-gray-400 text-gray-900",
              "focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary",
              errors.email
                ? "border-red-400 bg-red-50"
                : "border-gray-200 hover:border-gray-300"
            )}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </div>
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5" role="alert">
            <AlertCircle size={12} />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          Password
        </label>
        <div className="relative">
          <Lock
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password")}
            placeholder="••••••••"
            className={cn(
              "w-full pl-10 pr-4 py-3 border rounded-xl text-sm transition-all duration-200 outline-none",
              "bg-white placeholder:text-gray-400 text-gray-900",
              "focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary",
              errors.password
                ? "border-red-400 bg-red-50"
                : "border-gray-200 hover:border-gray-300"
            )}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
        </div>
        {errors.password && (
          <p id="password-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5" role="alert">
            <AlertCircle size={12} />
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        id="login-submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-brand-primary text-white font-semibold rounded-xl hover:bg-brand-primary-hover transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </motion.form>
  );
}
