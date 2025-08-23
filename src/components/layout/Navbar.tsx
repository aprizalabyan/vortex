"use client"

import React from 'react'
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter()

  const items: MenuItem[] = [
    {
      label: 'Home',
      url: '/home'
    },
    {
      label: 'Talenta',
      url: '/talenta'
    },
    {
      label: 'Klien',
      url: '/klien'
    },
    {
      label: 'Mentor',
      url: '/mentor'
    },
    {
      label: 'Kontak',
      url: '/kontak'
    },
    {
      label: 'Blog',
      url: '/blog'
    },
  ];

  const start = (
    <div className='flex gap-1'>
      <Image alt='logo' src='/logo.svg' height='20' className='mr-1' />
      <span className='text-xl font-black text-black'>Vortex</span>
    </div>
  )
  const end = (
    <Button className='bg-[#5575A5] text-white px-4 py-2 rounded-full' label='Sign Up' rounded size='small' onClick={() => router.push('/login')} />
  );

  return (
    <div className='card'>
      <Menubar
        model={items}
        start={start}
        end={end}
        className='flex justify-between py-4 px-12 rounded-none bg-white'
        pt={{
          menu: { className: 'flex gap-4' },
          content: { className: 'px-4 py-2' },
          label: { className: 'text-black font-semibold' }
        }}
      />
    </div>
  )
}

export default Navbar