"use client"

import React from 'react'
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import ListVariantIcon from '@/assets/icons/list-variant.svg'
import MagnifyIcon from '@/assets/icons/magnify.svg'
import ClockIcon from '@/assets/icons/clock.svg'
import BellIcon from '@/assets/icons/bell.svg'
import UserIcon from '@/assets/icons/user.svg'

type NavbarProps = {
  onMenuClick?: () => void;
  title?: string;
};

const ProtectedNavbar: React.FC<NavbarProps> = ({ onMenuClick, title = 'Dashboard' }) => {
  const start = (
    <div className="flex items-center gap-2">
      <Button
        icon={<ListVariantIcon />}
        text
        rounded
        aria-label="Menu"
        className='h-8 w-8'
        onClick={onMenuClick}
      />
      <span className="font-medium text-lg">{title}</span>
    </div>
  );

  const end = (
    <div className="flex items-center gap-2">
      <div className="flex items-center text-[12px] text-gray-400 gap-2 mr-4">
        <ClockIcon />
        <span>Selasa, 11 Juli 2023</span>
      </div>
      <Button icon={<MagnifyIcon />} className='h-8 w-8 rounded-full' />
      <Button icon={<BellIcon />} className='h-8 w-8 rounded-full' />
      <Avatar icon={<UserIcon />} shape="circle" className="ml-2 bg-[#288E4D3D] text-[#5575A5]" />
    </div>
  );

  return (
    <div className="border-b border-gray-200 bg-white px-6 py-4">
      <Menubar start={start} end={end} className="!border-0 !rounded-none flex justify-between" />

      <div className="px-4 pb-3 md:hidden">
        <span className="p-input-icon-left w-full">
          <i className="pi pi-search" />
          <InputText placeholder="Search..." className="w-full" />
        </span>
      </div>
    </div>
  )
}

export default ProtectedNavbar