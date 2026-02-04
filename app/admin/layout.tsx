// app/admin/layout.tsx
"use client";

import { ReactNode, useState } from "react";
import AdminHeader from "./components/adminheader";
import AdminSidebar from "./components/adminsidebar";
import { useEffect } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const [admin, setAdmin] = useState<{id: number, name: string, email: string} | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(json => setAdmin(json.admin))
      .catch(() => setAdmin(null));
  }, []);
  return (
    <div className="flex h-screen bg-[rgb(var(--background))] text-[rgb(var(--foreground))] transition-colors duration-300 overflow-hidden">
          
          {/* Sidebar */}
          <AdminSidebar 
            open={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
    
          {/* Overlay for mobile sidebar */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/30 z-20 sm:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
    
          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Header */}
        <AdminHeader
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
           admin={admin || undefined}// if you want the avatar & modal to work
        />

    
            {/* Page content */}
            <div className="flex-1 overflow-auto p-4 sm:p-6">
              {children}
            </div>
          </div>
        </div>
  );
}
