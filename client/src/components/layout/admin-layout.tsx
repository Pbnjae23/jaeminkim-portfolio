import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Admin } from "@shared/schema";
import { motion } from "framer-motion";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [, setLocation] = useLocation();

  const { data: admin, isLoading } = useQuery<Admin | null>({
    queryKey: ["/api/auth/me"],
    queryFn: async ({ signal }) => {
      const res = await fetch("/api/auth/me", { 
        credentials: "include",
        signal 
      });
      if (res.status === 401) return null;
      if (!res.ok) throw new Error("Failed to fetch admin");
      return res.json();
    }
  });

  useEffect(() => {
    if (!isLoading && !admin) {
      setLocation("/admin/login");
    }
  }, [admin, isLoading, setLocation]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!admin) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="bg-white border-b">
        <div className="px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16">
            <span className="font-semibold">Admin Dashboard</span>
            <button
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                setLocation("/admin/login");
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 md:px-8 lg:px-16">
        {children}
      </div>
    </motion.div>
  );
}