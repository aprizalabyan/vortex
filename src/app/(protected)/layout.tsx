import React from 'react'

const ProtectedLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="protected-layout">
      ProtectedLayout
      {children}
    </div>
  )
}

export default ProtectedLayout
