import type { Metadata } from "next";
import { ContactSection } from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with WAFFLELLA — call us, message on WhatsApp, or find us on social media.",
};

export default function ContactPage() {
  return (
    <main className="pt-20">
      {/* Page Header */}
      <section className="bg-gradient-hero py-20">
        <div className="container-narrow text-center">
          <span className="inline-block text-brand-primary text-sm font-semibold tracking-widest uppercase mb-4">
            ✦ Say Hello
          </span>
          <h1 className="font-heading text-5xl sm:text-6xl font-bold text-brand-text mb-4">
            Contact Us
          </h1>
          <p className="text-brand-muted text-xl max-w-2xl mx-auto">
            We're always happy to hear from you. Reach out via any channel below.
          </p>
        </div>
      </section>
      <ContactSection />
    </main>
  );
}
