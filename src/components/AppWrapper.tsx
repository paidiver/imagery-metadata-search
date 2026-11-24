'use client'
import { BodcNavbar } from '@bodc/navbar'
import { HeroUIProvider } from "@heroui/system"
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

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
        links={[
          {
            href: '/image-sets',
            label: 'Image sets'
          },
          {
            href: '/annotation-sets',
            label: 'Annotation sets'
          },
          {
            href: '/label-sets',
            label: 'Label sets'
          }
        ]}
      />
      <main className='container mt-6' id='app-container'>
        {children}
      </main>
    </HeroUIProvider>
  )
}
