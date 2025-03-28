import React from 'react'

import { Spinner as LibSpinner, SpinnerProps } from '@heroui/spinner'

export const Spinner = (props: SpinnerProps) => {
  return <LibSpinner data-testid='loading-spinner' {...props} />
}
