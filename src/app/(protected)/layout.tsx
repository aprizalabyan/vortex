"use client"

import React from "react";
import ProtectedNavbar from "@/components/layout/ProtectedNavbar";
import ProtectedSidebar from "@/components/layout/ProtectedSidebar";

const ProtectedLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <aside className="w-60 border-r border-gray-200 bg-white hidden md:block">
        <ProtectedSidebar />
      </aside>

      {/* Main area */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <ProtectedNavbar />

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default ProtectedLayout
