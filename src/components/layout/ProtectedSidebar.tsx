"use client"

import React from 'react';
import { usePathname } from "next/navigation";
import { PanelMenu } from "primereact/panelmenu";
import { Image } from 'primereact/image';
import CubesVariantIcon from '@/assets/icons/cubes-variant.svg'
import LayersIcon from '@/assets/icons/layers.svg'
import { Button } from 'primereact/button';
import { authService } from '@/services/auth.service'
import { useRouter } from 'next/navigation'

export type NavItem = {
  label: string;
  icon?: any;
  to?: string;
};

const defaultModel: NavItem[] = [
  { label: "Dashboard", icon: <CubesVariantIcon />, to: "/dashboard" },
  { label: "Token", icon: <LayersIcon />, to: "/token" },
];

const ProtectedSidebar: React.FC<{ model?: NavItem[] }> = ({ model = defaultModel }) => {
  const router = useRouter()
  const pathname = usePathname();

  const asTemplate = (item: any) => (
    <a
      className={`flex items-center gap-3 p-4 py-2.5 rounded-lg cursor-pointer
        ${pathname === item.to ? "bg-[#5575A5] text-white" : "text-gray-800 hover:bg-gray-100"}`}
      onClick={() => (window.location.href = item.to)}
    >
      {item.icon}
      <span>{item.label}</span>
    </a>
  );

  const mapped = model.map((m) => ({
    label: m.label,
    icon: m.icon,
    command: () => m.to && (window.location.href = m.to),
    template: () => asTemplate(m)
  }));

  const handleLogout = async (e: React.FormEvent) => {
    try {
      await authService.logout()
      router.push('/login')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="h-full flex flex-col overflow-y-auto p-4">
      <div className='flex gap-1 mt-1 mb-6'>
        <Image alt='logo' src='/logo.svg' height='20' className='mr-1' />
        <span className='text-xl font-bold text-black'>Vortex</span>
      </div>
      <PanelMenu
        model={mapped}
        className="w-full"
      />
      <div className="flex flex-col justify-end mt-auto">
        <Button
          label='Logout'
          rounded
          className='text-red-600'
          onClick={handleLogout}
        />
      </div>
    </div>
  )
}

export default ProtectedSidebar