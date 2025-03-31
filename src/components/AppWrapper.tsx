'use client'
import { ReactNode } from 'react'
import { HeroUIProvider } from "@heroui/system"
import { useRouter } from 'next/navigation'

import { BodcNavbar } from '@bodc/navbar'

export const AppWrapper = ({ children }: {children: ReactNode}) => {
  const router = useRouter()

  return (
    <HeroUIProvider navigate={router.push}>
      <BodcNavbar
        content={
          <div
            style={{
              display: 'flex',
              marginTop: 'auto',
              marginBottom: 'auto',
              paddingRight: '15px',
              gap: '10px'
            }}
          >
          </div>
        }
      />
      <main className='container mt-6' id='app-container'>
        {children}
      </main>
    </HeroUIProvider>
  )
}
