"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { subscribeToSettings, updateSettings } from "@wafflella/firebase";
import type { ShopSettings } from "@wafflella/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Save, Loader2, Store, Phone, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const settingsSchema = z.object({
  shopName: z.string().min(2, "Shop name is required"),
  phone: z.string().min(8, "Valid phone number required"),
  whatsapp: z.string().min(8, "Valid WhatsApp number required"),
  facebook: z.string().url("Must be a valid URL").or(z.literal("")),
  instagram: z.string().url("Must be a valid URL").or(z.literal("")),
  address: z.string().min(5, "Address is required"),
  openingHours: z.string().min(3, "Opening hours required"),
  logo: z.string().optional(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

const fieldGroups = [
  {
    title: "Shop Information",
    icon: Store,
    fields: [
      { name: "shopName" as const, label: "Shop Name", placeholder: "WAFFLELLA", type: "text" },
      { name: "address" as const, label: "Address", placeholder: "Cairo, Egypt", type: "text" },
      { name: "openingHours" as const, label: "Opening Hours", placeholder: "Daily 10:00 AM – 11:00 PM", type: "text" },
    ],
  },
  {
    title: "Contact Details",
    icon: Phone,
    fields: [
      { name: "phone" as const, label: "Phone Number", placeholder: "01003439023", type: "tel" },
      { name: "whatsapp" as const, label: "WhatsApp Number", placeholder: "01003439023", type: "tel" },
    ],
  },
  {
    title: "Social Media",
    icon: MapPin,
    fields: [
      { name: "facebook" as const, label: "Facebook URL", placeholder: "https://facebook.com/...", type: "url" },
      { name: "instagram" as const, label: "Instagram URL", placeholder: "https://instagram.com/...", type: "url" },
    ],
  },
];

export function SettingsForm() {
  const queryClient = useQueryClient();

  // Realtime settings subscription
  useEffect(() => {
    const unsubscribe = subscribeToSettings((settings) => {
      queryClient.setQueryData<ShopSettings | null>(["settings"], settings);
    });
    return unsubscribe;
  }, [queryClient]);

  const { data: settings, isLoading } = useQuery<ShopSettings | null>({
    queryKey: ["settings"],
    queryFn: () => null,
    staleTime: Infinity,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    values: settings ?? {
      shopName: "",
      phone: "",
      whatsapp: "",
      facebook: "",
      instagram: "",
      address: "",
      openingHours: "",
      logo: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: SettingsFormData) => updateSettings(data),
    onSuccess: () => {
      toast.success("Settings saved! Public website updated.");
      reset(undefined, { keepValues: true });
    },
    onError: () => toast.error("Failed to save settings"),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-8" noValidate aria-label="Shop settings form">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 text-sm mt-0.5">Changes are reflected on the public website instantly.</p>
        </div>
        <button
          type="submit"
          id="save-settings"
          disabled={mutation.isPending || !isDirty}
          className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-primary-hover transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          aria-busy={mutation.isPending}
        >
          {mutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          Save Changes
        </button>
      </div>

      {fieldGroups.map(({ title, icon: Icon, fields }, gi) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: gi * 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-card p-6"
        >
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-lg bg-brand-primary-light flex items-center justify-center">
              <Icon size={15} className="text-brand-primary" />
            </div>
            <h2 className="font-bold text-gray-900">{title}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {fields.map(({ name, label, placeholder, type }) => (
              <div key={name} className={name === "address" || name === "openingHours" ? "sm:col-span-2" : ""}>
                <label htmlFor={`setting-${name}`} className="block text-sm font-medium text-gray-700 mb-1.5">
                  {label}
                </label>
                <input
                  id={`setting-${name}`}
                  type={type}
                  {...register(name)}
                  placeholder={placeholder}
                  className={cn(
                    "w-full px-4 py-2.5 border rounded-xl text-sm outline-none transition-all duration-200",
                    "focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary",
                    errors[name] ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"
                  )}
                  aria-invalid={!!errors[name]}
                  aria-describedby={errors[name] ? `${name}-error` : undefined}
                />
                {errors[name] && (
                  <p id={`${name}-error`} className="mt-1 text-xs text-red-600" role="alert">
                    {errors[name]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Save note */}
      <p className="text-xs text-gray-400 text-center">
        💡 All changes automatically update the public-facing WAFFLELLA website in real time via Firestore.
      </p>
    </form>
  );
}
