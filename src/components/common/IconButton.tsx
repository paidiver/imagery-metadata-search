import { Button, ButtonProps } from '@heroui/button'
import classNames from 'classnames'

export const IconButton = (props: ButtonProps) => (
  <Button
    size='sm'
    {...props}
    className={classNames(
      'min-w-0',
      props.className
    )}
    color={props.color || 'primary'}
  >
    {props.children}
  </Button>
)
