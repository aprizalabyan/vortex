import React from 'react'
import Navbar from '@/components/layout/Navbar'

const PublicLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="public-layout  h-svh">
      <Navbar />
      {children}
    </div>
  )
}

export default PublicLayout
