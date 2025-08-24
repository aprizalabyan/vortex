"use client"

import React from 'react';
import { usePathname } from "next/navigation";
import { PanelMenu } from "primereact/panelmenu";
import { Image } from 'primereact/image';
import CubesVariantIcon from '@/assets/icons/cubes-variant.svg'
import LayersIcon from '@/assets/icons/layers.svg'
import DataLineIcon from '@/assets/icons/data-line.svg'
import ScrollIcon from '@/assets/icons/scroll-outline.svg'
import ElectricityIcon from '@/assets/icons/electricity-outline.svg'
import HierarchyIcon from '@/assets/icons/hierarchy.svg'
import CodeIcon from '@/assets/icons/code.svg'
import ProfileIcon from '@/assets/icons/profile-outline.svg'
import SecurityIcon from '@/assets/icons/security.svg'
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
const dataModel: NavItem[] = [
  { label: "Category", icon: <DataLineIcon />, to: "/category" },
  { label: "Source", icon: <ScrollIcon />, to: "/source" },
  { label: "Gateway", icon: <ElectricityIcon />, to: "/gateway" },
  { label: "Mapper", icon: <HierarchyIcon />, to: "/mapper" },
];
const gorillaModel: NavItem[] = [
  { label: "Module Prompt", icon: <CodeIcon />, to: "/module-prompt" },
];
const settingModel: NavItem[] = [
  { label: "User Management", icon: <ProfileIcon />, to: "/user-management" },
  { label: "Role", icon: <SecurityIcon />, to: "/role" },
];

const ProtectedSidebar = () => {
  const router = useRouter()
  const pathname = usePathname();

  const asTemplate = (item: any) => (
    <a
      className={`flex items-center gap-3 p-4 py-2.5 rounded-lg cursor-pointer
        ${pathname === item.to ? "bg-[#5575A5] text-white" : "bg-white text-gray-800 hover:bg-gray-100"}`}
      onClick={() => (window.location.href = item.to)}
    >
      {item.icon}
      <span>{item.label}</span>
    </a>
  );

  const defaultMapped = defaultModel.map((m) => ({
    label: m.label,
    icon: m.icon,
    command: () => m.to && (window.location.href = m.to),
    template: () => asTemplate(m)
  }));

  const dataMapped = dataModel.map((m) => ({
    label: m.label,
    icon: m.icon,
    command: () => m.to && (window.location.href = m.to),
    template: () => asTemplate(m)
  }));

  const gorillaMapped = gorillaModel.map((m) => ({
    label: m.label,
    icon: m.icon,
    command: () => m.to && (window.location.href = m.to),
    template: () => asTemplate(m)
  }));

  const settingMapped = settingModel.map((m) => ({
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
        model={defaultMapped}
        className="w-full"
      />
      <span className='text-gray-300 text-sm my-4'>DATA</span>
      <PanelMenu
        model={dataMapped}
        className="w-full"
      />
      <span className='text-gray-300 text-sm my-4'>Gorilla</span>
      <PanelMenu
        model={gorillaMapped}
        className="w-full"
      />
      <span className='text-gray-300 text-sm my-4'>SETTING</span>
      <PanelMenu
        model={settingMapped}
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