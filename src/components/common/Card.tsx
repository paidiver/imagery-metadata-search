import { Card, CardBody, CardHeader as LibCardHeader, CardFooter, HTMLHeroUIProps } from '@heroui/react'

const CardHeader = (props: HTMLHeroUIProps) => (
  <LibCardHeader className='z-0' {...props} />
)

export { Card, CardBody, CardHeader, CardFooter }
