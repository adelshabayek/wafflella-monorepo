import type { Metadata } from "next";
import { ProductTable } from "@/components/dashboard/ProductTable";

export const metadata: Metadata = { title: "Products" };

export default function DashboardPage() {
  return <ProductTable />;
}
