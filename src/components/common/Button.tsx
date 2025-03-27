'use client'
import { ButtonProps, Button as LibButton, forwardRef } from '@heroui/react'

export const Button = forwardRef(
  (props: ButtonProps, ref) => (
    <LibButton ref={ref} color='primary' {...props} />
  )
)
