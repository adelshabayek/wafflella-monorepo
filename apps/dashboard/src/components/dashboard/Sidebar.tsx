"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Products", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/settings", label: "Settings", icon: Settings, exact: false },
];
import { useState, useEffect } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Header Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-dash-sidebar flex items-center justify-between px-6 z-40 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center shadow-lg">
            <span className="text-white text-xs font-bold">W</span>
          </div>
          <div className="text-white font-bold text-sm">WAFFLELLA</div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white/80 hover:text-white p-2"
          aria-label="Toggle Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-dash-sidebar flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        role="navigation"
        aria-label="Admin sidebar"
      >
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center shadow-lg">
            <span className="text-white text-sm font-bold">W</span>
          </div>
          <div>
            <div className="text-white font-bold text-sm">WAFFLELLA</div>
            <div className="text-white/40 text-xs">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4" aria-label="Dashboard navigation">
        <ul className="space-y-1" role="list">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const isActive = exact ? pathname === href : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  id={`sidebar-${label.toLowerCase()}`}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-brand-primary text-white"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span className="flex-1">{label}</span>
                  {isActive && (
                    <motion.div layoutId="sidebar-indicator">
                      <ChevronRight size={14} />
                    </motion.div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        {user && (
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">
                {user.email?.[0]?.toUpperCase() ?? "A"}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-white text-xs font-medium truncate">
                {user.email}
              </div>
              <div className="text-white/40 text-xs">Administrator</div>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          id="sidebar-logout"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-red-500/20 text-sm font-medium transition-all duration-200"
          aria-label="Sign out of admin dashboard"
        >
          <LogOut size={16} aria-hidden="true" />
          Sign Out
        </button>
      </div>
    </aside>
    </>
  );
}
