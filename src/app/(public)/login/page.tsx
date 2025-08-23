"use client"

import React from 'react'
import { Card } from 'primereact/card'
import ComponentInputText from '@/components/base/form/InputText'
import { Button } from 'primereact/button'
import GoogleIcon from '@/assets/icons/google.svg'

const LoginPage = () => {
  return (
    <div className='flex flex-col items-center gap-6 mt-12'>
      <div className="flex items-center flex-col gap-1">
        <span className='text-xl font-semibold text-black'>Selamat Datang</span>
        <span className='text-sm text-gray-500'>Silahkan Sign In untuk melanjutkan</span>
      </div>
      <Card className='p-7 shadow-none w-[360]'>
        <div className='flex flex-col gap-4'>
          <ComponentInputText label='Email' placeholder='Alamat Email' />
          <ComponentInputText label='Password' placeholder='Password' />
          <div className="flex justify-end">
            <Button className='text-[#5575A5]' label='Forgot Password' link pt={{ label: { className: 'text-sm' } }} />
          </div>
          <Button className='bg-[#5575A5] text-white py-1.5 rounded-md' label='Sign In' pt={{ label: { className: 'text-sm' } }} />
          <span className='text-center text-sm'>Or</span>
          <Button className='flex justify-center py-1.5 rounded-md border border-gray-200'>
            <GoogleIcon className="w-5 h-5 fill-current mr-1.5" />
            <span className='text-sm text-black font-semibold'>Masuk dengan Google</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default LoginPage