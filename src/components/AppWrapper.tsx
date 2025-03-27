'use client'
import { ReactNode } from 'react'

import { HeroUIProvider } from '@heroui/react'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { Toaster } from 'sonner'

export const AppWrapper = ({ children }: {children: ReactNode}) => {
  const router = useRouter()

  return (
    <HeroUIProvider navigate={router.push}>
      <a
        href='#app-container'
        className={
          classNames(
            'absolute top-auto w-0 h-0 overflow-hidden',
            'focus:static focus:w-auto focus:h-auto'
          )
        }
      >
        Skip to content
      </a>
      <main className='container mt-6' id='app-container'>
        <>
          {children}
        </>
      </main>
      <Toaster position='top-right' closeButton richColors duration={2000} />
    </HeroUIProvider>
  )
}
