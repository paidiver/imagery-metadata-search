import { Spinner as LibSpinner, SpinnerProps } from '@heroui/spinner';
import React from 'react';

export const Spinner = (props: SpinnerProps) => {
  return <LibSpinner data-testid="loading-spinner" {...props} />;
};
