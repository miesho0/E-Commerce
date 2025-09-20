"use client"
import CartContextProvider from '@/Context/CartContext'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <SessionProvider>
      <CartContextProvider>
      {children}
      </CartContextProvider>
    </SessionProvider>
  )
}
