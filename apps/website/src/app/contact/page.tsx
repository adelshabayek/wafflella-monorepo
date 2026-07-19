import type { Metadata } from "next";
import { ContactSection } from "@/components/home/ContactSection";
import { PageHeader } from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with WAFFLELLA — call us, message on WhatsApp, or find us on social media.",
};

export default function ContactPage() {
  return (
    <main className="pt-20">
      <PageHeader namespace="contactPage" />
      <ContactSection />
    </main>
  );
}
