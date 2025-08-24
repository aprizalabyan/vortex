"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service'
import { Card } from 'primereact/card'
import ComponentInputText from '@/components/base/form/InputText'
import { Button } from 'primereact/button'
import GoogleIcon from '@/assets/icons/google.svg'

const LoginPage = () => {
  const router = useRouter()
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await authService.login(credentials)
      router.push('/dashboard')
    } catch (err) {
      setError('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center gap-6 mt-12'>
      <div className="flex items-center flex-col gap-1">
        <span className='text-xl font-semibold text-black'>Selamat Datang</span>
        <span className='text-sm text-gray-500'>Silahkan Sign In untuk melanjutkan</span>
      </div>
      <Card className='p-7 shadow-none border border-gray-200 w-[360]'>
        <form onSubmit={handleLogin} className='flex flex-col gap-4'>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <ComponentInputText
            label='Username'
            placeholder='Username'
            value={credentials.username}
            onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
          />
          <ComponentInputText
            label='Password'
            placeholder='Password'
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
          />
          <div className="flex justify-end">
            <Button className='text-[#5575A5]' label='Forgot Password' link pt={{ label: { className: 'text-sm' } }} />
          </div>
          <Button
            type="submit"
            className='bg-[#5575A5] text-white py-1.5 rounded-md'
            label='Sign In'
            loading={loading}
            pt={{ label: { className: 'text-sm' } }}
          />
          <span className='text-center text-sm'>Or</span>
          <Button className='flex justify-center py-1.5 rounded-md border border-gray-200'>
            <GoogleIcon className="w-5 h-5 fill-current mr-1.5" />
            <span className='text-sm text-black font-semibold'>Masuk dengan Google</span>
          </Button>

        </form>
      </Card>
    </div>
  )
}

export default LoginPage