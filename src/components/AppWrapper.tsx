'use client'
import { ReactNode } from 'react'
import { HeroUIProvider } from "@heroui/system"

import { BodcNavbar } from '@bodc/navbar'

export const AppWrapper = ({ children }: {children: ReactNode}) => {
  return (
    <HeroUIProvider>
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
