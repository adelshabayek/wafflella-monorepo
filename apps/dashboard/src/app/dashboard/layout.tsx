import { AuthProvider } from "@/providers/AuthProvider";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-dash-bg">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0">
          <main className="flex-1 p-6 lg:p-8 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
