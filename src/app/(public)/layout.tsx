import React from 'react'

const PublicLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="login-layout">
      PublicLayout
      {children}
    </div>
  )
}

export default PublicLayout
